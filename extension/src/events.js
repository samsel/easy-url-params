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