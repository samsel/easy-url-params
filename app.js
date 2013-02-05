(function($){
	setTimeout(function(){
		$('#url').focus();
	}, 100);
	
	
	$('button.load').on('click', function() {
		chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		  urlStringToParamHash(tabs[0].url);
		});
	});
	
	
	function urlStringToParamHash(url) {
		$('#url').val(url);
		$('#url').focus();
	}
})(jQuery);