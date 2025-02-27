// グローバル変数宣言
let userCode;
let password;
let requestType;
let loadingSheet;

let bookID = "スプレッドシートのID";
let book = SpreadsheetApp.openById(bookID);

// データを送るファンクション.
function doGet(e) {
  userCode = e.parameter.userCode;
  const passwordBytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    e.parameter.password,
    Utilities.Charset.UTF_8
  );
  password = passwordBytes
    .map((byte) => (byte < 0 ? 256 + byte : byte))
    .reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
  requestType = e.parameter.requestType;
  //貸出本読み込みリクエストか判断
  if (requestType == "loadLending") {
    loadingSheet = userCode + "_lending";
  } else if (requestType == "loginChallange") {
    loadingSheet = userCode + "_profile";
  } else {
    return;
  }
  var allData = { list: getAllData() };
  var responseText;
  var textOutput = ContentService.createTextOutput();
  responseText = JSON.stringify(allData);
  textOutput.setMimeType(ContentService.MimeType.JSON);
  textOutput.setContent(responseText);
  return textOutput;
}

function doPost(e) {
  var jsonString = e.postData.getDataAsString();
  var data = JSON.parse(jsonString);
  requestType = data.requestType;
  userCode = data.userCode;
  password = data.password;

  if (requestType == "proxylogin") {
    loadingSheet = userCode + "_lending";
    password = "nopass";
    var allData = { list: getAllData() };
    var responseText;
    var textOutput = ContentService.createTextOutput();
    responseText = JSON.stringify(allData);
    textOutput.setMimeType(ContentService.MimeType.JSON);
    textOutput.setContent(responseText);
    return textOutput;
  } else if (requestType == "proxylogin_setting") {
    loadingSheet = userCode + "_profile";
    password = "nopass";
    var allData = { list: getAllData() };
    var responseText;
    var textOutput = ContentService.createTextOutput();
    responseText = JSON.stringify(allData);
    textOutput.setMimeType(ContentService.MimeType.JSON);
    textOutput.setContent(responseText);
    return textOutput;
  } else if (requestType == "lending") {
    loadingSheet = "_lending";
    password = "nopass";
    let length = data.length;
    var sheetID = userCode + loadingSheet;
    var sheet = book.getSheetByName(sheetID);

    for (let i = 0; i < length; i++) {
      var text = data.list[i]["isbn"];
      Logger.log(text);
      sheet.getRange(i + 2, 2).setValue(text);
      text = data.list[i]["branch"];
      Logger.log(text);
      sheet.getRange(i + 2, 3).setValue(text);
      text = data.list[i]["title"];
      Logger.log(text);
      sheet.getRange(i + 2, 4).setValue(text);
      text = data.list[i]["author"];
      Logger.log(text);
      sheet.getRange(i + 2, 5).setValue(text);
      text = data.list[i]["lendingDate"];
      Logger.log(text);
      sheet.getRange(i + 2, 6).setValue(text);
      text = data.list[i]["returningDate"];
      Logger.log(text);
      sheet.getRange(i + 2, 7).setValue(text);
      text = data.list[i]["librarianName"];
      Logger.log(text);
      sheet.getRange(i + 2, 8).setValue(text);
      text = data.list[i]["librarianCode"];
      Logger.log(text);
      sheet.getRange(i + 2, 9).setValue(text);
    }
    loadingSheet = sheetID;
    var allData = { list: getAllData() };
    var responseText;
    var textOutput = ContentService.createTextOutput();
    responseText = JSON.stringify(allData);
    textOutput.setMimeType(ContentService.MimeType.JSON);
    textOutput.setContent(responseText);
    return textOutput;
  } else if (requestType == "makeAccount") {
    var sheetID = "num";
    var sheet = book.getSheetByName(sheetID);

    const passwordBytes = Utilities.computeDigest(
      Utilities.DigestAlgorithm.SHA_256,
      password,
      Utilities.Charset.UTF_8
    );
    password = passwordBytes
      .map((byte) => (byte < 0 ? 256 + byte : byte))
      .reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");

    userCode = sheet.getRange(2, 1).getValue();
    sheet.getRange(2, 1).setValue(userCode + 1);

    sheetID = "sanple_profile";
    sheet = book.getSheetByName(sheetID);
    let userName = data.userName;
    let sheetname = userCode + "_profile";

    var newsheet = sheet.copyTo(book);
    newsheet.setName(sheetname);

    newsheet.getRange(2, 1).setValue(password);
    newsheet.getRange(2, 2).setValue(userName);
    newsheet.getRange(2, 3).setValue("true");
    newsheet.getRange(2, 4).setValue("false");
    newsheet.getRange(2, 5).setValue("false");

    sheetID = "sanple_lending";
    sheet = book.getSheetByName(sheetID);
    sheetname = userCode + "_lending";
    newsheet = sheet.copyTo(book);
    newsheet.setName(sheetname);
    loadingSheet = "num";
    password = "nopass";
    var allData = { list: getAllData() };
    var responseText;
    var textOutput = ContentService.createTextOutput();
    responseText = JSON.stringify(allData);
    textOutput.setMimeType(ContentService.MimeType.JSON);
    textOutput.setContent(responseText);
    return textOutput;
  } else if (requestType == "setting") {
    var sheetID = userCode + "_profile";
    var sheet = book.getSheetByName(sheetID);

    var text = data.roleUser;
    sheet.getRange(2, 3).setValue(text);
    text = data.roleLibrarian;
    sheet.getRange(2, 4).setValue(text);
    text = data.roleAdmin;
    sheet.getRange(2, 5).setValue(text);
    loadingSheet = sheetID;
    password = "nopass";
    var allData = { list: getAllData() };
    var responseText;
    var textOutput = ContentService.createTextOutput();
    responseText = JSON.stringify(allData);
    textOutput.setMimeType(ContentService.MimeType.JSON);
    textOutput.setContent(responseText);
    return textOutput;
  } else if (requestType == "resetPassword") {
    var sheetID = userCode + "_profile";
    var sheet = book.getSheetByName(sheetID);
    loadingSheet = sheetID;

    const passwordBytes = Utilities.computeDigest(
      Utilities.DigestAlgorithm.SHA_256,
      password,
      Utilities.Charset.UTF_8
    );
    password = passwordBytes
      .map((byte) => (byte < 0 ? 256 + byte : byte))
      .reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
    sheet.getRange(2, 1).setValue(password);
    var allData = { list: getAllData() };
    var responseText;
    var textOutput = ContentService.createTextOutput();
    responseText = JSON.stringify(allData);
    textOutput.setMimeType(ContentService.MimeType.JSON);
    textOutput.setContent(responseText);
    return textOutput;
  } else {
    return;
  }
}

// データを取得するファンクション
function getAllData() {
  // シートの変数
  var profile = book.getSheetByName(userCode + "_profile");
  var sheetID = loadingSheet;
  var sheet = book.getSheetByName(sheetID);
  if (password != "nopass") {
    const passcheck = profile.getRange(2, 1).getValue();
    if (password != passcheck) {
      return;
    }
  }

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
