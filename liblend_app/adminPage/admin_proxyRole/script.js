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

function proxylogin(request) {
  $.ajax({
    url: UserSheetAppURL,
    type: "POST",
    dataType: "json",
    data:
      '{"requestType":"proxylogin_setting","userCode":' +
      $("#userCode").val() +
      ',"password":""}',
    success: function (all) {
      var list = all.list;
      var table = document.createElement("table");
      var tr = document.createElement("tr");
      var th = document.createElement("th");
      th.textContent = "#";
      tr.appendChild(th);
      var th = document.createElement("th");
      th.textContent = "利用者";
      tr.appendChild(th);
      var th = document.createElement("th");
      th.textContent = "司書";
      tr.appendChild(th);
      var th = document.createElement("th");
      th.textContent = "管理者";
      tr.appendChild(th);
      table.appendChild(tr);
      var tr = document.createElement("tr");
      var td = document.createElement("td");
      td.textContent = 1;
      tr.appendChild(td);
      var td = document.createElement("td");
      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", "roleUser");
      input.setAttribute("placeholder", "trueかfalse");
      input.setAttribute("value", list[0].roleUser);
      td.appendChild(input);
      tr.appendChild(td);
      var td = document.createElement("td");
      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", "roleLibrarian");
      input.setAttribute("placeholder", "trueかfalse");
      input.setAttribute("value", list[0].roleLibrarian);
      td.appendChild(input);
      tr.appendChild(td);
      var td = document.createElement("td");
      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", "roleAdmin");
      input.setAttribute("placeholder", "trueかfalse");
      input.setAttribute("value", list[0].roleAdmin);
      td.appendChild(input);
      tr.appendChild(td);
      table.appendChild(tr);
      document.getElementById("list").appendChild(table);
    },
  });
}

function makeList(list) {
  var table = document.createElement("table");
  var tr = document.createElement("tr");
  var th = document.createElement("th");
  th.textContent = "#";
  tr.appendChild(th);
  var th = document.createElement("th");
  th.textContent = "利用者";
  tr.appendChild(th);
  var th = document.createElement("th");
  th.textContent = "司書";
  tr.appendChild(th);
  var th = document.createElement("th");
  th.textContent = "管理者";
  tr.appendChild(th);
  table.appendChild(tr);
  var tr = document.createElement("tr");
  var td = document.createElement("td");
  td.textContent = 1;
  tr.appendChild(td);
  var td = document.createElement("td");
  var input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("id", "roleUser");
  input.setAttribute("placeholder", "trueかfalse");
  input.setAttribute("value", list[0]["roleUser"]);
  td.appendChild(input);
  tr.appendChild(td);
  var td = document.createElement("td");
  var input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("id", "roleLibrarian");
  input.setAttribute("placeholder", "trueかfalse");
  input.setAttribute("value", list[0]["roleLibrarian"]);
  td.appendChild(input);
  tr.appendChild(td);
  var td = document.createElement("td");
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "roleAdmin");
  input.setAttribute("placeholder", "trueかfalse");
  input.setAttribute("value", list[0]["roleAdmin"]);
  td.appendChild(input);
  tr.appendChild(td);
  table.appendChild(tr);
}

function send() {
  let json = '{"requestType":"setting","userCode":';
  json += $("#userCode").val();
  json += ',"password":"';
  json += $("#password").val();
  json += '","roleUser":"';
  json += $("#roleUser").val();
  json += '","roleLibrarian":"';
  json += $("#roleLibrarian").val();
  json += '","roleAdmin":"';
  json += $("#roleAdmin").val();
  json += '"}';
  console.log(json);
  $.ajax({
    url: UserSheetAppURL,
    type: "POST",
    datatype: "json",
    data: json,
    success: function () {
      alert("送信完了");
      window.location.reload();
    },
    error: function () {
      alert("失敗しました");
    },
  });
}
