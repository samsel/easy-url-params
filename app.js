(function($){
	setTimeout(function(){
		$('#url').focus();
	}, 100);
	
	
	$('#url').on('keypress', function() {
		$(".alert").slideUp();
	});
		
		
	$('button.load').on('click', function() {
		chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		  visualizeURLQueryParams(tabs[0].url);
		});
	});
	
	
	function visualizeURLQueryParams(url) {
		$('#url').val(url);
		$('#url').focus();
		var hash = urlStringToParamHash(url);
	}
	
	function urlStringToParamHash(url) {
		if ((url == undefined) || ($.trim(url) == "")) {
			$(".alert").show();
			$(".alert").html("Please enter a valid URL");
		}
		else if (url.indexOf("?") == -1) {
			$(".alert").show();
			$(".alert").html("There are no query Params in the URL");			
		}
		else {
			
		}
	}
	
	
})(jQuery);