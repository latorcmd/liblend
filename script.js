function loadVersion() {
  $(".version").text(version);
  $(".version").attr(
    "href",
    "https://github.com/latorcmd/liblend/releases/tag/" + version
  );
}
