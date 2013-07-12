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
			return $('.table');
		},

		url: {
			get: function() {
				return $('#url').val();
			},
			set: function(str) {
				$('#url').val(str);
			},	
		},

		alert: {
			show: function(msg) {
				$(".alert").html(msg).show();
			},
			hide: function() {
				$(".alert").hide().html('');
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
			console.log(table.find("tbody"));
			table.attr("data-host", obj.host);
			table.show();
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

		}
	};


	App = {

		init: function() {
			View.registerEvent('process', 'click', this.process);
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
		}	

	};	

	$(function() {
		App.init();
	});

})(this, $);


