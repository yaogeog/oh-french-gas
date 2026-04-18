const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
const SHEET_NAME = 'Sheet1';
const EDIT_PASSWORD = '';

function _checkAuth(password) {
  if (password !== EDIT_PASSWORD) {
    throw new Error('未授權的操作：密碼錯誤。');
  }
}

function checkPassword(password) {
  return password === EDIT_PASSWORD;
}

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('OH French 學法語')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}



function _getSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Initialize headers if new
    sheet.appendRow(["Unit_ID", "Unit_Name", "Sentence_ID", "FR_Sentence", "EN_Translation", "FR_Example"]);
    sheet.getRange("A1:F1").setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getUnits() {
  try {
    const sheet = _getSheet();
    const data = sheet.getDataRange().getValues();
    
    // Check if empty (only headers or blank)
    if (data.length <= 1) {
      return [];
    }
    
    const headers = data[0];
    const rows = data.slice(1);
    
    // Grouping by Unit_ID
    const unitsMap = new Map();
    
    rows.forEach(row => {
      const unitId = row[0];
      const unitName = row[1];
      const sentId = row[2];
      const fr = row[3];
      const en = row[4];
      const frExample = row[5];
      
      if (!unitsMap.has(unitId)) {
        unitsMap.set(unitId, {
          Unit_ID: unitId,
          Unit_Name: unitName,
          sentences: []
        });
      }
      
      unitsMap.get(unitId).sentences.push({
        Sentence_ID: sentId,
        FR_Sentence: fr,
        EN_Translation: en,
        FR_Example: frExample
      });
    });
    
    // Convert map to array and return
    return Array.from(unitsMap.values());
  } catch (error) {
    console.error("Error in getUnits: ", error);
    return [];
  }
}

function saveData(unitName, dataArray, password) {
  try {
    _checkAuth(password);
    const sheet = _getSheet();
    const data = sheet.getDataRange().getValues();
    
    // Determine new Unit_ID
    let newUnitId = 1;
    if (data.length > 1) {
      const existingIds = data.slice(1).map(row => typeof row[0] === 'number' ? row[0] : parseInt(row[0], 10)).filter(id => !isNaN(id));
      if (existingIds.length > 0) {
        newUnitId = Math.max(...existingIds) + 1;
      }
    }
    
    // Prepare rows
    // [Unit_ID, Unit_Name, Sentence_ID, FR_Sentence, EN_Translation]
    const newRows = [];
    dataArray.forEach((item, index) => {
      newRows.push([
        newUnitId,
        unitName,
        index + 1,
        item.fr,
        item.en,
        item.frExample
      ]);
    });
    
    // Append rows efficiently
    if (newRows.length > 0) {
      sheet.getRange(sheet.getLastRow() + 1, 1, newRows.length, 6).setValues(newRows);
    }
    
    return { success: true, newUnitId: newUnitId, message: "單元建立成功！" };
  } catch (error) {
    console.error("Error in saveData: ", error);
    return { success: false, message: error.toString() };
  }
}

/**
 * 修改現有單元
 */
function editData(unitId, unitName, dataArray, password) {
  try {
    _checkAuth(password);
    const sheet = _getSheet();
    const range = sheet.getDataRange();
    const data = range.getValues();
    const headers = data[0]; // 保留標題 [cite: 34]

    // 1. 過濾掉舊的該 unitId 資料，只保留其他單元的資料
    // 使用 filter 比跑迴圈 deleteRow 快上百倍
    const remainingRows = data.slice(1).filter(row => row[0] != unitId);

    // 2. 準備更新後的資料列
    const updatedRows = dataArray.map((item, index) => [
      unitId,
      unitName,
      index + 1,
      item.fr,
      item.en,
      item.frExample
    ]);

    // 3. 合併結果
    const finalData = [headers, ...remainingRows, ...updatedRows];

    // 4. 清除舊內容並一次性寫入新內容
    sheet.clearContents();
    sheet.getRange(1, 1, finalData.length, 6).setValues(finalData);

    return { success: true, message: "單元更新成功！" };
  } catch (error) {
    console.error("Error in editData: ", error);
    return { success: false, message: error.toString() };
  }
}

