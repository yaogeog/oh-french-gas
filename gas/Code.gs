const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
const SHEET_NAME = 'Sheet1';

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
    sheet.appendRow(["Unit_ID", "Unit_Name", "Sentence_ID", "FR_Sentence", "EN_Translation"]);
    sheet.getRange("A1:E1").setFontWeight("bold");
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
        EN_Translation: en
      });
    });
    
    // Convert map to array and return
    return Array.from(unitsMap.values());
  } catch (error) {
    console.error("Error in getUnits: ", error);
    return [];
  }
}

function saveData(unitName, dataArray) {
  try {
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
        item.en
      ]);
    });
    
    // Append rows efficiently
    if (newRows.length > 0) {
      sheet.getRange(sheet.getLastRow() + 1, 1, newRows.length, 5).setValues(newRows);
    }
    
    return { success: true, newUnitId: newUnitId, message: "單元建立成功！" };
  } catch (error) {
    console.error("Error in saveData: ", error);
    return { success: false, message: error.toString() };
  }
}
