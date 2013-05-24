(function(undefined) {
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

function isValidURL(url) {
	var isValid = true;
	if ((url === undefined) || ($.trim(url) === "")) {
		$(".alert").show();
		$(".alert").html("Please enter a valid URL");
		isValid = false;
	}
	else if (url.indexOf("?") == -1) {
		$(".alert").show();
		$(".alert").html("There are no query Params in the URL");
		isValid = false;			
	}
	
	return isValid;
}
	
	
function processURL() {
	var url = $('#url').val();
	if(isValidURL(url)) {
		saveURL(url);
		constructTable(url);
	}	
}

function reloadURL() {
	var rows = $(".table tbody tr"),
		paramObj = {},
		url;

	if(rows.length) {
		rows.each(function(index, row) {
			var divs = $(row).find('td > div');
		    	// Ignore blank names but allow blank values
		    	if($(divs[0]).text().trim() != '') {
			    paramObj[$(divs[0]).text()] = $(divs[1]).text();
			}
		});
		
		url = $(".table").attr('data-host') + $.param(paramObj);
		$('#url').val(url);
		saveURL(url);
		chrome.tabs.update({
			url: url
		});
	}
}

function constructRow(paramName, paramValue) {
    	html = "";
    	paramName = paramName || '';
    	paramValue = paramValue || '';

    	html += "<tr><td><div contenteditable>" + paramName + "</div></td>";
    	html += "<td><div contenteditable>" + decodeURIComponent(paramValue) + "</div></td>";    
    	html += "<td><button type='button' class='btn btn-mini btn-danger'>&times;</button></td></tr>";

    	return html;
}

function constructTable(url) {
	var html = "",
		tmp,
		list = (url.substring(url.indexOf("?") + 1, url.length)).split("&"),
		host = url.substring(0, url.indexOf("?") + 1),
		table = $(".table");

	for(var i=0; i<list.length; i++) {
		tmp = list[i].split('=');
	    	html += constructRow(tmp[0], tmp[1]);
	}
	table.find("tbody").html(html);
	table.attr("data-host", host);

        $("#controls").show();    
}

$('#url').on('keypress paste', function() {
	clearAlert();
	realignLayout();
});
		
$('.load').on('click', function() {
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		displayURL(tabs[0].url);
	});
});

$('#process').on('click', function() {
	processURL();
});

$('#reload').on('click', function() {
	reloadURL();
});

$('#add-param').on('click', function() { 
    	$(".table").append(constructRow());
});

$('table').on('click', 'td button', function() { 
	$(this).parents('tr').remove();
});

function saveURL(url) {
	window.localStorage.setItem("easyURLParamURL", url);	
}

function loadURL() {
	if(window.localStorage.getItem("easyURLParamURL")) {
		$('#url').val(window.localStorage.getItem("easyURLParamURL"));
	}
}

$(function(){
	loadURL();
});

})();