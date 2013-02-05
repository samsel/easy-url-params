(function($){
	setTimeout(function(){
		$('#url').focus();
	}, 100);
	
	$('button.load').on('click', function() {
		chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		  console.log(tabs[0].url);
		});
	});
})(jQuery);