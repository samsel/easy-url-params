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
	if ((url == undefined) || ($.trim(url) == "")) {
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
		constructTable((url.substring(url.indexOf("?") + 1, url.length)).split("&"));
	}	
}

function constructTable(list) {
	var html = "";
	var tmp;
	for(var i=0; i<list.length; i++) {
		tmp = list[i].split('=');
		html = html + "<tr><td><div contenteditable>" + tmp[0] + "</td></div>";
		html = html + "<td><div contenteditable>" + decodeURIComponent(tmp[1]) + "</div></td></tr>";
	}
	$(".table tbody").html(html);
	$(".table").show();
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

}).apply(this);