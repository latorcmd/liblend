//URLパラメータを参照
var arg = new Object;
var pair=location.search.substring(1).split('&');
for(var i=0;pair[i];i++) {
	var kv = pair[i].split('=');
	arg[kv[0]]=kv[1];
}

//リンクたち
let ndlLink;


function openCalil() {
	window.open('https://calil.jp/book/' + arg.isbn)
}

function openNDL() {
	window.open(ndlLink);
}

function openBooks() {
	window.open('https://www.books.or.jp/book-details/' + arg.isbn);
}

function openGoogle() {
	window.open('https://www.google.co.jp/search?tbm=bks&q=isbn:' + arg.isbn)
}


//preLoad
function preLoad() {
	loadBookInfo();
}


function loadBookInfo() {
	$('#thumbnail').attr('src', 'https://ndlsearch.ndl.go.jp/thumbnail/' + arg.isbn + '.jpg')
	let url = "https://ndlsearch.ndl.go.jp/api/opensearch?dpid=iss-ndl-opac%20iss-ndl-opac-inprocess%20zassaku%20zassaku-online%20ndl-dl-open%20jpro&isbn=" + arg.isbn;
	
	$.ajax({
		type: "GET",
		url: url,
		dataType: "xml",
		success: function(data){
			$("item",data).each(function(){
				ndlLink = $("guid",this).text();
				$("#title").text($("title",this).text());
				$("#large-title").text($("title",this).text());
				$("#yomigana").text($("dcndl\\:titleTranscription",this).text());
				$("#authors").text($("dc\\:creator",this).text() + '｜読み:' + $('dcndl\\:creatorTranscription',this).text());
				$("#large-authors").text($("dc\\:creator",this).text());
				$("#ISBN13").text($('dc\\:identifier[xsi\\:type=dcndl\\:ISBN]',this).text().slice(0,17));
				if ($("dc\\:subject[xsi\\:type=dcndl\\:NDC10]",this).text() != '') {
					$("#ndc10").text($("dc\\:subject[xsi\\:type=dcndl\\:NDC10]",this).text());
				}
				else if ($("dc\\:subject[xsi\\:type=dcndl\\:NDC9]",this).text() != '') {
					$('#ndc10').text($('dc\\:subject[xsi\\:type=dcndl\\:NDC9]',this).text());
				}
				$("#publisher").text($("dc\\:publisher",this).text());
				$("#publishedDate").text($("dcterms\\:issued",this).text());
				$("#pageCount").text($("dc\\:extent",this).text().slice(0,-1) + 'ページ');
				$("#price").text($("dcndl\\:price",this).text());
				$("#description").html($("description",this).text());
			});
		}
	});
}