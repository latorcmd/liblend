//変数たち
let test = "pi-su";
let list;

/* ---------------区切り--------------- */

/* preLoad */

function preLoad() {
  rolecheck();
  commonPreLoad();
  $("#link").attr(
    "href",
    "/liblend_account/userAccount/?url=" + UserSheetAppURL
  );
}

function rolecheck() {
  if (roleAdmin != "true") {
    alert("あなたには権限がありません(ログアウト)");
    window.location.href = "/liblend_app/login/";
  }
}
