s//変数たち
let test = "pi-su";


/* ---------------区切り--------------- */


/* preLoad */

function preLoad() {
  loadBarcode();
  rolecheck();
  commonPreLoad();
  $(".showOrgCodeNormal").text(orgCode);
  $(".showOrgNameNormal").text(decodeURIComponent(orgName));
  $(".showUserCodeNormal").text(userCode);
  $(".showUserNameNormal").text(decodeURIComponent(userName));
  
  if (roleUser == "true") {
    $(".showRoleUserNormal").text("権限を持っています。");
  }
  else if (roleUser == "false") {
    $(".showRoleUserNormal").text("権限を持っていません。権限が必要な場合は管理者に問い合わせてください。");
  }
  else {
    $(".showRoleUserNormal").text("?");
  }
  
  if (roleLibrarian == "true") {
    $(".showRoleLibrarianNormal").text("権限を持っています。");
  }
  else if (roleLibrarian == "false") {
    $(".showRoleLibrarianNormal").text("権限を持っていません。権限が必要な場合は管理者に問い合わせてください。");
  }
  else {
    $(".showRoleLibrarianNormal").text("?");
  }
  
  if (roleAdmin == "true") {
    $(".showRoleAdminNormal").text("権限を持っています。");
  }
  else if (roleAdmin == "false") {
    $(".showRoleAdminNormal").text("権限を持っていません。権限が必要な場合は管理者に問い合わせてください。");
  }
  else {
    $(".showRoleAdminNormal").text("?");
  }
}



function loadBarcode() {
  JsBarcode("#barcode_userCode", userCode, {
    format: "codabar"
  });
  JsBarcode("#barcode_orgCode", orgCode, {
    format: "codabar"
  });
}

function rolecheck() {
    if (roleUser != "true") {
        alert('あなたには権限がありません(ログアウト)');
        window.location.href = '/liblend_app/login/';
    }
}