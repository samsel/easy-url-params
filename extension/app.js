(function(window, $, undefined) {

	'use strict';

	var Store, View, URL, Chrome, App;

	Store = {

		key: "easyURLParamURL",

		save: function(value) {
			window.localStorage.setItem(this.key, value);	
		},

		fetch: function() {
			return window.localStorage.getItem(this.key);
		}

	};	


	View = {

		registerEvent: function(elementId, event, callback) {
			$('#' + elementId).on(event, callback);
		},

		table: function() {
			return $('#table');
		},

		url: {
			get: function() {
				return $('#url').val();
			},
			set: function(str) {
				$('#url').val(str).focus();
			},	
		},

		alert: {
			show: function(msg) {
				$(".alert").html(msg).show();
			},
			hide: function() {
				$(".alert").slideUp(function() {
					$(this).hide().html('');
				});
			}			
		},

		hideUseBrowserAndExpandURLInput: function() {
			this.alert.hide();
			if($('.or').is(":visible") ) {
				$('#use-browser').hide();
				$('.or').hide();
				$('#url').animate({width: '390px'}, 400);			
			}
		},	

		tablerize: function(obj) {
			var html = "",
				table = this.table();

			obj.params.forEach(function(paramObj, index) {
				html = html + "<tr><td><div contenteditable>" + paramObj.key + "</td></div>";
				html = html + "<td><div contenteditable>" + paramObj.value + "</div></td></tr>";
			});

			table.find("tbody").html(html);
			table.attr("data-host", obj.host);
			table.show();
		},		

		dataFromTable: function() {
			var obj = {},
				table = this.table();	

			obj.host = table.attr("data-host");
			obj.params = [];

			table.find("tr").each(function(row, index) {
				var divs = $(row).find('td > div');
				obj.params.push({
					key   : $(divs[0]).html(),
					value : $(divs[1]).html()
				});
			});

			return obj;
		}

	};


	URL = {
		isValid: function(str) {
			return !this.isEmpty(str) &&
					!this.hasNoParams(str);
		},

		isEmpty: function(str) {
			return str === undefined || 
					$.trim(str) === "";
		},

		hasNoParams: function(str) {
			return str.indexOf('?') === -1;
		},		

		error: function(str) {
			if(this.isEmpty(str)) {
				return "Please enter a valid URL";
			}
			else if(this.hasNoParams(str)) {
				return "There are no query Params in the URL";
			}
		},

		toObject: function(str) {
			var obj = {
				host   : str.substring(0, str.indexOf("?") + 1),
				params : []
			};

			(str.substring(str.indexOf("?") + 1, str.length)).split("&").forEach(function(element, index) {
				obj.params.push({
					key   : element.split('=')[0],
					value : decodeURIComponent(element.split('=')[1])
				});
			});

			return obj;
		},

		toString: function(obj) {
			return obj.host + $.param(obj.params);
		}
	};


	Chrome = {
		getURL: function(callback) {
			chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
				callback(tabs[0].url);
			});
		},

		setURL: function(url) {
			chrome.tabs.update({url: url});	
		}		
	};
	

	App = {

		init: function() {
			View.registerEvent('process', 'click', this.process);
			View.registerEvent('use-browser', 'click', this.useBrowserURL);
			View.registerEvent('reload', 'click', this.reload);
			View.registerEvent('url', 'focus keypress paste', 
				$.proxy(View.hideUseBrowserAndExpandURLInput, View));
			View.url.set(Store.fetch());
		},

		process: function() {
			var url;
			url = View.url.get();
			if(URL.isValid(url)) {
				View.alert.hide();
				Store.save(url);
				View.tablerize(URL.toObject(url));
			}
			else {
				View.alert.show(URL.error(url));
			}
		},

		useBrowserURL: function() {
			Chrome.getURL(function(url) {
				View.url.set(url);
			});
		},

		reload: function() {
			var url;
			url = URL.toString(View.dataFromTable());
			View.url.set(url);
			Store.save(url);
			Chrome.setURL(url);
		}

	};	

	$(function() {
		App.init();
	});

})(this, $);