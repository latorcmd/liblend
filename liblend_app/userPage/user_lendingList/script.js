//変数たち
let test = "pi-su";

/* ---------------区切り--------------- */

/* preLoad */

function preLoad() {
  rolecheck();
  commonPreLoad();
  sendGetLendingRequest(onRequestLending);
}

function sendGetLendingRequest(func) {
  $.ajax({
    url:
      UserSheetAppURL +
      "?requestType=loadLending&userCode=" +
      userCode +
      "&password=" +
      password,
    type: "GET",
    dataType: "json",

    //通信に成功したときに実行
    success: function (all) {
      var list = all.list;
      func(list);
    },
    error: function () {
      alert("情報の取得に失敗しました");
    },
  });
}

function onRequestLending(list) {
  console.log(list);
  var table = document.createElement("table");
  var tr = document.createElement("tr");
  var th = document.createElement("th");
  th.textContent = "#";
  tr.appendChild(th);
  var th = document.createElement("th");
  th.textContent = "書名";
  tr.appendChild(th);
  var th = document.createElement("th");
  th.textContent = "著者";
  tr.appendChild(th);
  var th = document.createElement("th");
  th.textContent = "返却期限";
  tr.appendChild(th);
  table.appendChild(tr);
  for (var i = 0; i < list.length; i++) {
    var tr = document.createElement("tr");
    tr.setAttribute(
      "onclick",
      "openBookDescriptionPage(" + list[i]["isbn"] + ")"
    );
    var td = document.createElement("td");
    td.textContent = i + 1;
    tr.appendChild(td);
    var td = document.createElement("td");
    td.textContent = list[i]["title"];
    tr.appendChild(td);
    var td = document.createElement("td");
    td.textContent = list[i]["author"];
    tr.appendChild(td);
    var td = document.createElement("td");
    td.textContent = list[i]["returningDate"];
    tr.appendChild(td);
    table.appendChild(tr);
  }
  document.getElementById("lendingList").appendChild(table);
}

function rolecheck() {
  if (roleUser != "true") {
    alert("あなたには権限がありません(ログアウト)");
    window.location.href = "/liblend_app/login/";
  }
}
