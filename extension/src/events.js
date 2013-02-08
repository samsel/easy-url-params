$('#url').on('keypress', function() {
	$(".alert").slideUp();
});

$('#url').on('focus', function() {
	//realignLayout();
});
	
	
$('.load').on('click', function() {
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
	  visualizeURLQueryParams(tabs[0].url);
	});
});