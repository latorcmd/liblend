function preload() {
  $("#1").removeAttr("class");
}

function end1() {
  $("#2").removeAttr("class");
}

function end2() {
  $("#3").removeAttr("class");
}

function end3() {
  $("#4").removeAttr("class");
}

function end4() {
  $("#5").removeAttr("class");
}

function send() {
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbyr69I6KwJTgwi_ioMhyluzqtZeV19eRvkyQpB2Yzgu0jUvh1Hbk10jHld7Rw236l65/exec",
    type: "POST",
    datatype: "json",
    data:
      '{"requestType":"makeAccount","orgName":"' +
      $("#orgName").val() +
      '","adminSheetAppURL":"' +
      $("#adminSheetAppURL").val() +
      '","userSheetAppURL":"' +
      $("#userSheetAppURL").val() +
      '"}',

    success: function (all) {
      alert("登録完了");
      $("#6").removeAttr("class");
      var list = all.list;
      $("#orgCode").text(list[0]["num"] - 1);
    },
  });
}
