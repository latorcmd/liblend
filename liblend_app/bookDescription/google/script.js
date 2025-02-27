//URLパラメータを参照
var arg = new Object;
var pair=location.search.substring(1).split('&');
for(var i=0;pair[i];i++) {
	var kv = pair[i].split('=');
	arg[kv[0]]=kv[1];
}

//リンクたち
let googleLink;


function openCalil() {
	window.open('https://calil.jp/book/' + arg.isbn)
}

function openGoogle() {
	window.open(googleLink)
}

function openBooks() {
	window.open('https://www.books.or.jp/book-details/' + arg.isbn)
}

function openNDL() {
	window.open('https://ndlsearch.ndl.go.jp/api/openurl?isbn=' + arg.isbn)
}

//preLoad
function preLoad() {
	loadBookInfo_1();
}


function loadBookInfo_1() {
	let url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + arg.isbn + "&key=" + arg.googleAPIKey;
	
	$.getJSON(url, function(data) {
		if(!data.totalItems) {
			$("#title").text("");
			$("#authors").text("");
			$("#ISBN13").text("");
			$("#ISBN10").text("");
			$("#publisher").text("");
			$("#publishedDate").text("");
			$("#height").text("");
			$("#pageCount").text("");
			$("#short-description").text("");
			$("#large-title").text("");
			$("#large-author").text("");
		}
		else {
			$("#title").text(data.items[0].volumeInfo.title);
			$("#large-title").text(data.items[0].volumeInfo.title);
			$("#authors").text(data.items[0].volumeInfo.authors[0]);
			$("#large-authors").text(data.items[0].volumeInfo.authors[0]);
			$("#ISBN10").text(data.items[0].volumeInfo.industryIdentifiers[0].identifier);
			$("#ISBN13").text(data.items[0].volumeInfo.industryIdentifiers[1].identifier);
			$("#publishedDate").text(data.items[0].volumeInfo.publishedDate);
			$("#short-description").text(data.items[0].volumeInfo.description);
			let thumbnail = data.items[0].volumeInfo.imageLinks.thumbnail;
			$("#thumbnail").attr("src", thumbnail);
			googleLink = data.items[0].volumeInfo.previewLink;
			loadBookInfo_2(data.items[0].selfLink + "?key=" + arg.googleAPIKey);
		}
	});
}

function loadBookInfo_2(link) {
	$.getJSON(link, function(data) {
		$("#publisher").text(data.volumeInfo.publisher);
		$("#height").text(data.volumeInfo.dimensions.height);
		$("#pageCount").text(data.volumeInfo.pageCount + "ページ");
		$("#description").html(data.volumeInfo.description)
	});
}