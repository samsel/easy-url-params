$('#url').on('keypress paste', function() {
	clearAlert();
	realignLayout();
});
		
$('.load').on('click', function() {
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		displayURL(tabs[0].url);
	});
});

// $('#process').on('click', function() {
// 	processURL();
// });

$('#reload').on('click', function() {
	reloadURL();
});


// function saveURL(url) {
// 	window.localStorage.setItem("easyURLParamURL", url);	
// }

// function loadURL() {
// 	if(window.localStorage.getItem("easyURLParamURL")) {
// 		$('#url').val(window.localStorage.getItem("easyURLParamURL"));
// 	}
// }

$(function(){
	loadURL();
});

function displayURL(url) {
	$('#url').val(url);
	$('#url').focus();
	realignLayout();
}

function realignLayout() {
	if($('.or').is(":visible") ) {
		$('button.load').hide();
		$('.or').hide();
		$('#url').animate({width: '390px'}, 400);			
	}
}

function clearAlert() {
	$(".alert").slideUp(function(){
		$(".alert").html('');
	});	
}

// function isValidURL(url) {
// 	var isValid = true;
// 	if ((url === undefined) || ($.trim(url) === "")) {
// 		$(".alert").show();
// 		$(".alert").html("Please enter a valid URL");
// 		isValid = false;
// 	}
// 	else if (url.indexOf("?") == -1) {
// 		$(".alert").show();
// 		$(".alert").html("There are no query Params in the URL");
// 		isValid = false;			
// 	}
	
// 	return isValid;
// }
	
	
// function processURL() {
// 	var url = $('#url').val();
// 	if(isValidURL(url)) {
// 		saveURL(url);
// 		constructTable(url);
// 	}	
// }

function reloadURL() {
	var rows = $(".table tbody tr"),
		paramObj = {},
		url;

	if(rows.length) {
		rows.each(function(index, row) {
			var divs = $(row).find('td > div');
			paramObj[$(divs[0]).html()] = $(divs[1]).html();
		});
		
		url = $(".table").attr('data-host') + $.param(paramObj);
		$('#url').val(url);
		saveURL(url);
		chrome.tabs.update({
			url: url
		});
	}
}

// function constructTable(url) {
// 	var html = "",
// 		tmp,
// 		list = (url.substring(url.indexOf("?") + 1, url.length)).split("&"),
// 		host = url.substring(0, url.indexOf("?") + 1),
// 		table = $(".table");

// 	for(var i=0; i<list.length; i++) {
// 		tmp = list[i].split('=');
// 		html = html + "<tr><td><div contenteditable>" + tmp[0] + "</td></div>";
// 		html = html + "<td><div contenteditable>" + decodeURIComponent(tmp[1]) + "</div></td></tr>";
// 	}
// 	table.find("tbody").html(html);
// 	table.attr("data-host", host);
// 	table.show();
// }