//変数たち
let test = "pi-su";
let list;

/* ---------------区切り--------------- */

/* preLoad */

function preLoad() {
  rolecheck();
  commonPreLoad();
  $("#userCode").val("");
}

function rolecheck() {
  if (roleAdmin != "true") {
    alert("あなたには権限がありません(ログアウト)");
    window.location.href = "/liblend_app/login/";
  }
}

/* ---------------区切り--------------- */

function send() {
  if ($("#password").val() != $("#password_").val()) {
    alert("パスワードが間違っています");
    return;
  }
  $.ajax({
    url: UserSheetAppURL,
    type: "POST",
    datatype: "json",
    data:
      '{"requestType":"resetPassword","userCode":' +
      $("#userCode").val() +
      ',"password":"' +
      $("#password").val() +
      '"}',
    success: function () {
      alert("完了しました");
      $("#userCode").val("");
      $("#password").val("");
      $("#password_").val("");
    },
    error: function () {
      alert("失敗しました");
    },
  });
}
