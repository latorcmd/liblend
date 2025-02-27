// グローバル変数宣言
let orgCode;
let sheetID;
var bookID = "1GosGubNyPqTo2dRJaTOFdaDAy0iH_l590NcHSmYtsKY";
var book = SpreadsheetApp.openById(bookID);

// データを送るファンクション.
function doGet(e) {
  let requestType = e.parameter.requestType;
  if (requestType == "login") {
    orgCode = e.parameter.orgCode;
    sheetID = orgCode;
    var allData = { list: getAllData() };
    var responseText;
    var textOutput = ContentService.createTextOutput();
    responseText = JSON.stringify(allData);
    textOutput.setMimeType(ContentService.MimeType.JSON);
    textOutput.setContent(responseText);
    return textOutput;
  }
}

function doPost(e) {
  var jsonString = e.postData.getDataAsString();
  var data = JSON.parse(jsonString);
  let requestType = data.requestType;
  let orgCode;
  let orgName = data.orgName;
  let userSheetAppURL = data.userSheetAppURL;
  let adminSheetAppURL = data.adminSheetAppURL;
  if (requestType == "makeAccount") {
    sheetID = "num";
    var sheet = book.getSheetByName(sheetID);
    orgCode = sheet.getRange(2, 1).getValue();
    const nextOrgCode = orgCode + 1;
    sheet.getRange(2, 1).setValue(nextOrgCode);
    var allData = { list: getAllData() };
    var responseText;
    var textOutput = ContentService.createTextOutput();
    responseText = JSON.stringify(allData);
    textOutput.setMimeType(ContentService.MimeType.JSON);
    textOutput.setContent(responseText);

    sheetID = "sanple";
    sheet = book.getSheetByName(sheetID);
    let newsheet = sheet.copyTo(book);
    newsheet.setName(orgCode);

    newsheet.getRange(2, 1).setValue(orgCode);
    newsheet.getRange(2, 2).setValue(orgName);
    newsheet.getRange(2, 3).setValue(userSheetAppURL);
    newsheet.getRange(2, 4).setValue(adminSheetAppURL);

    return textOutput;
  }
}

// データを取得するファンクション
function getAllData() {
  // シートの変数
  var sheet = book.getSheetByName(sheetID);

  // 行の変数
  var lastRow = sheet.getLastRow();
  // 列の変数
  var lastColumn = sheet.getLastColumn();

  // 項目名とデータの配列
  var keys = [];
  var data = [];

  // 項目名の取得
  for (var x = 1; x <= lastColumn; x++) {
    keys.push(sheet.getRange(1, x).getValue());
  }
  Logger.log(keys);

  // 値の取得
  for (var y = 2; y <= lastRow; y++) {
    var json = {};

    for (var x = 1; x <= lastColumn; x++) {
      json[keys[x - 1]] = sheet.getRange(y, x).getValue();
    }
    //データ格納
    data.push(json);
  }
  Logger.log(data);
  //整形してテキストにします
  return data;
}
