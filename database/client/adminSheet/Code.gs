let bookID = "スプレッドシートのID";
let book = SpreadsheetApp.openById(bookID);

// データを送るファンクション.
function doGet(e) {
  var allData = { list: getAllData() };
  var responseText;
  var textOutput = ContentService.createTextOutput();
  responseText = JSON.stringify(allData);
  textOutput.setMimeType(ContentService.MimeType.JSON);
  textOutput.setContent(responseText);
  return textOutput;
}

// データを取得するファンクション
function getAllData() {
  // シートの変数
  var sheetID = "setting";
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
