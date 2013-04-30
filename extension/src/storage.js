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