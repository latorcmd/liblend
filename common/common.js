let commontest = "ie-i!";
let version = "v1.0.1";

//変数たち
//遷移先ページのURL
let transitionPageURL;

//--組織の情報
let orgCode = sessionStorage.getItem("orgCode");
let orgName = sessionStorage.getItem("orgName");
let defaultAPIEngine = sessionStorage.getItem("defaultAPIEngine");
let googleAPIKey = sessionStorage.getItem("googleAPIKey");

//--組織のアプリ
//----AdminSheet
let AdminSheetAppURL = sessionStorage.getItem("AdminSheetAppURL");

//----UserSheet
let UserSheetAppURL = sessionStorage.getItem("UserSheetAppURL");

//--個人の情報
let userCode = sessionStorage.getItem("userCode");
let userName = sessionStorage.getItem("userName");
let password = sessionStorage.getItem("password");
let roleUser = sessionStorage.getItem("roleUser");
let roleLibrarian = sessionStorage.getItem("roleLibrarian");
let roleAdmin = sessionStorage.getItem("roleAdmin");

//遷移先ページにデータを送る
function pageTransitionSendVariable(link) {
  window.location.href = link;
}

//遷移先ページにデータを送る+権限チェック(User)
function pageTransitionSendVariable_checkUserContent(link) {
  if (roleUser == "true") {
    pageTransitionSendVariable(link);
  } else {
    alert("あなたにはこのページに接続する権限がありません");
  }
}

//遷移先ページにデータを送る+権限チェック(Librarian)
function pageTransitionSendVariable_checkLibrarianContent(link) {
  if (roleLibrarian == "true") {
    pageTransitionSendVariable(link);
  } else {
    alert("あなたにはこのページに接続する権限がありません");
  }
}

//遷移先ページにデータを送る+権限チェック(Admin)
function pageTransitionSendVariable_checkAdminContent(link) {
  if (roleAdmin == "true") {
    pageTransitionSendVariable(link);
  } else {
    alert("あなたにはこのページに接続する権限がありません");
  }
}

//本の詳細ページ
function openBookDescriptionPage(isbn) {
  if (defaultAPIEngine == "google") {
    if (googleAPIKey == "undefined") {
      transitionPageURL = "/liblend_app/bookDescription/google/?isbn=" + isbn;
    } else {
      transitionPageURL =
        "/liblend_app/bookDescription/google/?isbn=" +
        isbn +
        "&googleAPIKey=" +
        googleAPIKey;
    }
  } else if (defaultAPIEngine == "ndl") {
    transitionPageURL = "/liblend_app/bookDescription/ndl/?isbn=" + isbn;
  } else {
    alert("このページを開くことが出来ません");
  }
  window.open(transitionPageURL, "subwin");
}

function commonPreLoad() {
  $(".showOrgCode").text("組織コード:" + orgCode);
  $(".showOrgName").text("組織名:" + orgName);
  $(".showUserCode").text("利用者番号:" + userCode);
  $(".showUserName").text(userName + "さん");
}

function logout() {
  sessionStorage.clear();
  window.location.href = "/liblend_app/login/";
}
