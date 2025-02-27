//保存する情報
//--組織の情報
let orgCode; //
let orgName; //
let defaultAPIEngine; //
let googleAPIKey; //

//--組織のアプリ
//----AdminSheet
let AdminSheetAppURL; //

//----UserSheet
let UserSheetAppURL; //

//--個人の情報
let userCode; //
let userName; //
let password; //
let roleUser; //
let roleLibrarian; //
let roleAdmin; //

//使い捨ての情報
//--AdminのアプリURL
let orgAccessURL;

//--ログインを試行するURL
let loginChallangeURL;

let transitionPageURL;

function preload() {
  sessionStorage.clear();
  getlocal();
}

// 組織アクセスボタン
function challangeOrgAccess() {
  orgCode = inputOrgCode();
  sessionStorage.setItem("orgCode", orgCode);
  orgAccessURL =
    "https://script.google.com/macros/s/AKfycbyr69I6KwJTgwi_ioMhyluzqtZeV19eRvkyQpB2Yzgu0jUvh1Hbk10jHld7Rw236l65/exec?requestType=login&orgCode=" /*デフォルトのログインデータベース https~exec まで変更してください*/ +
    orgCode;
  // サーバーと通信する
  sendOrgRequest(onRequest_org);
}

// サーバーと通信する関数
function sendOrgRequest(func) {
  $.ajax({
    url: orgAccessURL,
    type: "GET",
    dataType: "json",

    // 通信に成功した時に実行
    success: function (all) {
      var list = all.list;
      func(list);
    },
  });
}

// サーバーと通信できたときに動く関数
function onRequest_org(list) {
  // もし、入力した文字とリスト上の組織コードが一致したら
  if (inputOrgCode() == list[0]["orgCode"]) {
    // 1行目に状況を表示する
    showText1("接続成功");

    // 2行目に組織名を表示する
    showText2(list[0]["orgName"]);

    // 3行目に状況を表示する
    showText3("接続可能");

    //組織の情報を変数へ代入
    orgName = list[0]["orgName"];
    sessionStorage.setItem("orgName", orgName);
    UserSheetAppURL = list[0]["UserSheetAppURL"];
    sessionStorage.setItem("UserSheetAppURL", UserSheetAppURL);
    AdminSheetAppURL = list[0]["AdminSheetAppURL"];
    sessionStorage.setItem("AdminSheetAppURL", AdminSheetAppURL);
    getOrgSetting();
  }

  // それ以外の場合
  else {
    // 1行目に表示する
    showText1("接続失敗 組織コードを確認してください");

    // 2行目に表示する
    showText2("?");
  }
}

// 入力された文字を取得する関数
function inputOrgCode() {
  return $(".orgCode-login").val();
}

// 1行目に文字を表示する関数
function showText1(message) {
  $(".showText1").text(message);
}

// 2行目に文字を表示する関数
function showText2(message) {
  $(".showText2").text(message);
}

//---------------区切り---------------//
function getOrgSetting() {
  sendOrgSettingRequest(onRequest_setting);
}

function sendOrgSettingRequest(func) {
  $.ajax({
    url: AdminSheetAppURL,
    type: "GET",
    dataType: "json",

    // 通信に成功した時に実行
    success: function (all) {
      var list = all.list;
      func(list);
    },
  });
}

function onRequest_setting(list) {
  defaultAPIEngine = list[0]["defaultAPIEngine"];
  sessionStorage.setItem("defaultAPIEngine", defaultAPIEngine);
  googleAPIKey = list[0]["googleAPIKey"];
  sessionStorage.setItem("googleAPIKey", googleAPIKey);
  if (defaultAPIEngine == "google") {
    if (googleAPIKey == undefined) {
      googleAPIKey =
        "AIzaSyDd8uG2oo2ZLFx-z-mI1YBrOHCMEHM-R5o"; /*デフォルトのGoogle API Key 変更してください*/
      sessionStorage.setItem("googleAPIKey", googleAPIKey);
    }
  }
  showText1("情報取得完了");
}

//---------------区切り---------------//

//ログインアクセスボタン
function challangeLoginAccess() {
  userCode = inputUserCode();
  sessionStorage.setItem("userCode", userCode);
  password = inputPassword();
  sessionStorage.setItem("password", password);
  loginChallangeURL =
    UserSheetAppURL +
    "?requestType=loginChallange&userCode=" +
    userCode +
    "&password=" +
    password;
  // サーバーと通信する
  sendLoginRequest(onRequest_login);
}

//userCodeを取得
function inputUserCode() {
  return $(".userCode-login").val();
}

//passwordを取得
function inputPassword() {
  return $(".password-login").val();
}

// サーバーと通信する関数
function sendLoginRequest(func) {
  $.ajax({
    url: loginChallangeURL,
    type: "GET",
    dataType: "json",

    // 通信に成功した時に実行
    success: function (all) {
      var list = all.list;
      func(list);
    },
  });
}

// サーバーと通信できたときに動く関数
function onRequest_login(list) {
  // 1行目に状況を表示する
  showText3("接続成功");

  // 2行目にユーザネームを表示する
  showText4(list[0]["userName"]);

  //ユーザの情報を変数に代入
  userName = list[0]["userName"];
  sessionStorage.setItem("userName", userName);
  roleUser = list[0]["roleUser"];
  sessionStorage.setItem("roleUser", roleUser);
  roleLibrarian = list[0]["roleLibrarian"];
  sessionStorage.setItem("roleLibrarian", roleLibrarian);
  roleAdmin = list[0]["roleAdmin"];
  sessionStorage.setItem("roleAdmin", roleAdmin);
}

// 1行目に文字を表示する関数
function showText3(message) {
  $(".showText3").text(message);
}

// 2行目に文字を表示する関数
function showText4(message) {
  $(".showText4").text(message);
}

//---------------区切り---------------//

//遷移先ページにデータを送る
function login() {
  if ($("#keep").prop("checked")) {
    localStorage.setItem("keep", "true");
    localStorage.setItem("AdminSheetAppURL", AdminSheetAppURL);
    localStorage.setItem("defaultAPIEngine", defaultAPIEngine);
    localStorage.setItem("googleAPIKey", googleAPIKey);
    localStorage.setItem("orgCode", orgCode);
    localStorage.setItem("orgName", orgName);
    localStorage.setItem("userCode", userCode);
    localStorage.setItem("userName", userName);
    localStorage.setItem("UserSheetAppURL", UserSheetAppURL);
  } else {
    localStorage.clear();
  }

  if (userName != "") {
    if (defaultAPIEngine != "") {
      window.location.href = "/liblend_app/userPage/user_home/";
    }
  } else {
    alert("失敗しました");
  }
}

function getlocal() {
  if (localStorage.getItem("keep") == "true") {
    AdminSheetAppURL = localStorage.getItem("AdminSheetAppURL");
    defaultAPIEngine = localStorage.getItem("defaultAPIEngine");
    googleAPIKey = localStorage.getItem("googleAPIKey");
    orgCode = localStorage.getItem("orgCode");
    orgName = localStorage.getItem("orgName");
    userCode = localStorage.getItem("userCode");
    UserSheetAppURL = localStorage.getItem("UserSheetAppURL");
    sessionStorage.setItem("AdminSheetAppURL", AdminSheetAppURL);
    sessionStorage.setItem("defaultAPIEngine", defaultAPIEngine);
    sessionStorage.setItem("googleAPIKey", googleAPIKey);
    sessionStorage.setItem("orgCode", orgCode);
    sessionStorage.setItem("orgName", orgName);
    sessionStorage.setItem("userCode", userCode);
    sessionStorage.setItem("UserSheetAppURL", UserSheetAppURL);
    showText1("ローカルに保存中");
    showText2(orgName);
    showText3("接続可能");
    $("#orgCode").val(orgCode);
    $("#userCode").val(userCode);
    $("#keep").prop("checked", "true");
  }
}
