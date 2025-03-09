//変数たち
let test = "pi-su";
let list;
let length;

/* ---------------区切り--------------- */

/* preLoad */

function preLoad() {
  loadVersion();
  rolecheck();
  commonPreLoad();
  var weekDayList = ["日", "月", "火", "水", "木", "金", "土"];
  var dt = new Date();
  var year = dt.getFullYear();
  var month = dt.getMonth() + 1;
  var day = dt.getDate();
  var weekDay = weekDayList[dt.getDay()];
  if ($("#today").val() == "") {
    $("#today").val(year + "/" + month + "/" + day + "(" + weekDay + ")");
    $("#period").val(year + "/" + month + "/" + day + "(" + weekDay + ")");
  }
}

function rolecheck() {
  if (roleLibrarian != "true") {
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
      '{"requestType":"proxylogin","userCode":' +
      $("#userCode").val() +
      ',"password":""}',
    success: function (all) {
      var list = all.list;
      makeList(list);
    },
    error: function () {
      alert("情報の取得に失敗しました");
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
  th.textContent = "ISBN";
  tr.appendChild(th);
  var th = document.createElement("th");
  th.textContent = "枝番";
  tr.appendChild(th);
  var th = document.createElement("th");
  th.textContent = "検索";
  tr.appendChild(th);
  var th = document.createElement("th");
  th.textContent = "書名";
  tr.appendChild(th);
  var th = document.createElement("th");
  th.textContent = "著者";
  tr.appendChild(th);
  var th = document.createElement("th");
  th.textContent = "貸出日";
  tr.appendChild(th);
  var th = document.createElement("th");
  th.textContent = "返却期限";
  tr.appendChild(th);
  var th = document.createElement("th");
  th.textContent = "担当者";
  th.setAttribute("class", "hidden");
  th.setAttribute("id", "headLibname");
  tr.appendChild(th);
  var th = document.createElement("th");
  th.textContent = "担当者番号";
  th.setAttribute("class", "hidden");
  th.setAttribute("id", "headLibcode");
  tr.appendChild(th);
  var th = document.createElement("th");
  th.textContent = "返却";
  tr.appendChild(th);
  table.appendChild(tr);
  for (var i = 0; i < list.length; i++) {
    if (list[i]["isbn"] != null) {
      var tr = document.createElement("tr");
      var td = document.createElement("td");
      td.textContent = i + 1;
      tr.appendChild(td);
      var td = document.createElement("td");
      var input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("id", "isbn_" + i);
      input.setAttribute("placeholder", "ISBNを入力");
      input.setAttribute("value", list[i]["isbn"]);
      td.appendChild(input);
      tr.appendChild(td);
      var td = document.createElement("td");
      var input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("id", "branch_" + i);
      input.setAttribute("placeholder", "枝番を入力");
      input.setAttribute("value", list[i]["branch"]);
      td.appendChild(input);
      tr.appendChild(td);
      var td = document.createElement("td");
      var button = document.createElement("button");
      button.textContent = "検索";
      button.setAttribute("onclick", "searchBook(" + i + ")");
      td.appendChild(button);
      tr.appendChild(td);
      var td = document.createElement("td");
      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", "title_" + i);
      input.setAttribute("placeholder", "書名を入力");
      input.setAttribute("value", list[i]["title"]);
      td.appendChild(input);
      tr.appendChild(td);
      var td = document.createElement("td");
      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", "author_" + i);
      input.setAttribute("placeholder", "著者を入力");
      input.setAttribute("value", list[i]["author"]);
      td.appendChild(input);
      tr.appendChild(td);
      var td = document.createElement("td");
      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", "lendingDate_" + i);
      input.setAttribute("placeholder", "貸出日を入力(年/月/日(曜日))");
      input.setAttribute("value", list[i]["lendingDate"]);
      td.appendChild(input);
      tr.appendChild(td);
      var td = document.createElement("td");
      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", "returningDate_" + i);
      input.setAttribute("placeholder", "返却期限を入力(年/月/日(曜日))");
      input.setAttribute("value", list[i]["returningDate"]);
      td.appendChild(input);
      tr.appendChild(td);
      var td = document.createElement("td");
      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", "librarianName_" + i);
      input.setAttribute("class", "hidden");
      input.setAttribute("value", list[i]["librarianName"]);
      td.appendChild(input);
      tr.appendChild(td);
      var td = document.createElement("td");
      var input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("id", "librarianCode_" + i);
      input.setAttribute("class", "hidden");
      input.setAttribute("value", list[i]["librarianCode"]);
      td.appendChild(input);
      tr.appendChild(td);
      var td = document.createElement("td");
      var button = document.createElement("button");
      button.textContent = "返却";
      button.setAttribute("onclick", "returnBook(" + i + ")");
      td.appendChild(button);
      tr.appendChild(td);
      table.appendChild(tr);
    } else if (list[i]["isbn"] == null) {
      var tr = document.createElement("tr");
      var td = document.createElement("td");
      td.textContent = i + 1;
      tr.appendChild(td);
      var td = document.createElement("td");
      var input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("id", "isbn_" + i);
      input.setAttribute("placeholder", "ISBNを入力");
      td.appendChild(input);
      tr.appendChild(td);
      var td = document.createElement("td");
      var input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("id", "branch_" + i);
      input.setAttribute("placeholder", "枝番を入力");
      td.appendChild(input);
      tr.appendChild(td);
      var td = document.createElement("td");
      var button = document.createElement("button");
      button.textContent = "検索";
      button.setAttribute("onclick", "searchBook(" + i + ")");
      td.appendChild(button);
      tr.appendChild(td);
      var td = document.createElement("td");
      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", "title_" + i);
      input.setAttribute("placeholder", "書名を入力");
      td.appendChild(input);
      tr.appendChild(td);
      var td = document.createElement("td");
      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", "author_" + i);
      input.setAttribute("placeholder", "著者を入力");
      td.appendChild(input);
      tr.appendChild(td);
      var td = document.createElement("td");
      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", "lendingDate_" + i);
      input.setAttribute("placeholder", "貸出日を入力(年/月/日(曜日))");
      td.appendChild(input);
      tr.appendChild(td);
      var td = document.createElement("td");
      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", "returningDate_" + i);
      input.setAttribute("placeholder", "返却期限を入力(年/月/日(曜日))");
      td.appendChild(input);
      tr.appendChild(td);
      var td = document.createElement("td");
      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", "librarianName_" + i);
      input.setAttribute("class", "hidden");
      td.appendChild(input);
      tr.appendChild(td);
      var td = document.createElement("td");
      var input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("id", "librarianCode_" + i);
      input.setAttribute("class", "hidden");
      td.appendChild(input);
      tr.appendChild(td);
      var td = document.createElement("td");
      var button = document.createElement("button");
      button.textContent = "返却";
      button.setAttribute("onclick", "returnBook(" + i + ")");
      td.appendChild(button);
      tr.appendChild(td);
      table.appendChild(tr);
    }
    document.getElementById("lendingList").appendChild(table);
    length = list.length;
  }
}

function searchBook(num) {
  var isbn = $("#isbn_" + num).val();
  if (isbn == "") {
    $("#isbn_" + num).val("0000000000000");
    isbn = $("#isbn_" + num).val();
  }
  if (defaultAPIEngine == "google") {
    var url =
      "https://www.googleapis.com/books/v1/volumes?q=isbn:" +
      isbn +
      "&key=" +
      googleAPIKey;

    $.getJSON(url, function (data) {
      if (!data.totalItems) {
        alert("データを取得できませんでした");
        $("#librarianName_" + num).removeAttr("class");
        $("#librarianCode_" + num).removeAttr("class");
        $("#headLibname").removeAttr("class");
        $("#headLibcode").removeAttr("class");
      } else {
        $("#title_" + num).val(data.items[0].volumeInfo.title);
        console.log(data.items[0].volumeInfo.title);
        $("#author_" + num).val(data.items[0].volumeInfo.authors[0]);
        $("#lendingDate_" + num).val($("#today").val());
        $("#returningDate_" + num).val($("#period").val());
        $("#returningDate_" + num).val(
          year + "/" + month + "/" + day + "(" + weekDay + ")"
        );
        $("#librarianName_" + num).val(decodeURI(userName));
        $("#librarianCode_" + num).val(userCode);
      }
    });
  } else if (defaultAPIEngine == "ndl") {
    var url =
      "https://ndlsearch.ndl.go.jp/api/opensearch?dpid=iss-ndl-opac%20iss-ndl-opac-inprocess%20zassaku%20zassaku-online%20ndl-dl-open%20jpro&isbn=" +
      isbn;

    $.ajax({
      type: "GET",
      url: url,
      dataType: "xml",
      success: function (data) {
        $("item", data).each(function () {
          $("#title_" + num).val($("title", this).text());
          $("#author_" + num).val($("dc\\:creator", this).text());
          $("#lendingDate_" + num).val($("#today").val());
          $("#returningDate_" + num).val($("#period").val());
          $("#librarianName_" + num).val(decodeURI(userName));
          $("#librarianCode_" + num).val(userCode);
        });
      },
    });
  }
}

function returnBook(num) {
  $("#isbn_" + num).val("");
  $("#branch_" + num).val("");
  $("#title_" + num).val("");
  $("#author_" + num).val("");
  $("#isbn_" + num).val("");
  $("#lendingDate_" + num).val("");
  $("#returningDate_" + num).val("");
  $("#isbn_" + num).val("");
  $("#librarianName_" + num).val("");
  $("#librarianCode_" + num).val("");
}

function send() {
  let json = '{"requestType":"lending","userCode":';
  json += $("#userCode").val();
  json += ',"password":"';
  json += $("#password").val();
  json += '","length":';
  json += length;
  json += ',"list":[';
  for (let i = 0; i < length; i++) {
    json += '{"isbn":';
    if ($("#isbn_" + i).val() == "") {
      json += '""';
    } else {
      json += $("#isbn_" + i).val();
    }
    json += ',"branch":';
    if ($("#branch_" + i).val() == "") {
      json += '""';
    } else {
      json += $("#branch_" + i).val();
    }
    json += ',"title":"';
    json += $("#title_" + i).val();
    json += '","author":"';
    json += $("#author_" + i).val();
    json += '","lendingDate":"';
    json += $("#lendingDate_" + i).val();
    json += '","returningDate":"';
    json += $("#returningDate_" + i).val();
    json += '","librarianName":"';
    json += $("#librarianName_" + i).val();
    json += '","librarianCode":';
    if ($("#librarianCode_" + i).val() == "") {
      json += '""';
    } else {
      json += $("#librarianCode_" + i).val();
    }
    json += "},";
  }
  json = json.slice(0, -1);
  json += "]}";
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
