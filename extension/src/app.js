	

	
	
	function visualizeURLQueryParams(url) {
		$('#url').val(url);
		$('#url').focus();
		realignLayout();
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
	
	function realignLayout() {
		$('button.load').hide();
		$('.or').hide();
		$('#url').animate({width: '390px'}, 400);
	}
	
	