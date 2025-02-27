function send() {
  if ($("#password").val() != $("#password_").val()) {
    alert("パスワードが違います");
    return;
  }

  $.ajax({
    url: arg.url,
    type: "POST",
    datatype: "json",
    data:
      '{"requestType":"makeAccount","userName":"' +
      $("#userName").val() +
      '","userCode":"","password":"' +
      $("#password").val() +
      '"}',

    success: function (all) {
      var list = all.list;
      var userCode = list[0]["num"] - 1;
      alert("登録完了");
      $("#sccs").removeAttr("class");
      $("#code").text(userCode);
    },
    error: function () {
      alert("失敗しました");
    },
  });
}

//URLパラメータを参照
var arg = new Object();
var pair = location.search.substring(1).split("&");
for (var i = 0; pair[i]; i++) {
  var kv = pair[i].split("=");
  arg[kv[0]] = kv[1];
}
