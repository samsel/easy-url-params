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

		registerEvent: function(element, event, callback) {
			$(element).on(event, callback);
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

		host: {
			get: function() {
				return $('#host').val();
			},
			set: function(str) {
				$('#host').val(str).focus();
			},	
		},

		hostValChanged: function(e) {
			// hide the reload button if 
			// the host string is empty 
			console.log($(e.target).val().length);
			$(e.target).val().length ? this.reload.show() : this.reload.hide();
		},				

		reload: {
			show: function() {
				$('#reload').removeClass('invisible').addClass('visible');
			},
			hide: function() {
				$('#reload').removeClass('visible').addClass('invisible');
			}			
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

		showUseBrowser: function() {
			if(this.url.get() === "") {
				$('#url').animate({width: '195px'}, 400, function() {
					$('#use-browser').show();
					$('.or').show();
				});			
			}
		},

		tableClicked: function(e) {
			var target = $(e.target);
			if((target.is('td:last-of-type')) || (target[0].nodeName === "I")) {
				this.deleteRow(target);
			}
		},

		deleteRow: function(element) {
			$(element).closest('tr').remove();
		},		

		addRow: function(e) {
			this.table().find("tbody").append(this.rowHTML());
		},		

		rowHTML: function(key, value) {
			var html;
			html = "<tr><td><div contenteditable>" + (key || "") + "</td></div>";
			html = html + "<td><div contenteditable>" + (value || "") + "</div></td>";
			html = html + "<td><i class='icon-remove-sign'></i></td></tr>";
			return html;	
		},

		tablerize: function(obj) {
			var html = "",
				table = this.table();
			
			obj.params.forEach(function(paramObj, index) {
				html += this.rowHTML(paramObj.key, paramObj.value);
			}, this);

			table.find("tbody").html(html);
			this.postTablerize(table, obj);
		},

		postTablerize: function(table, obj) {
			this.registerEvent('tbody', 'click', this.tableClicked);
			this.reload.show();
			table.show();
			this.host.set(obj.host);
		},			

		dataFromTable: function() {
			var obj = {},
				table = this.table();	

			obj.host = this.host.get() || "";
			obj.params = [];

			table.find("tbody tr").each(function(index, row) {
				var divs = $(row).find('td > div');
				obj.params.push({
					key   : ($(divs[0]).html() || ""),
					value : ($(divs[1]).html() || "")
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
				//either the key or the value needs to be present
				if(element && element.length && element.split('=').length) {
					obj.params.push({
						key   : element.split('=')[0],
						value : decodeURIComponent(element.split('=')[1])
					});
				}
			});

			return obj;
		},

		toString: function(obj) {
			return obj.host + obj.params.reduce(function(prev, current, index, array) {
				if(current.key.length || current.value.length) {
					// atleast key or the the value should be present
					if((index !== 0) && (index !== array.length)) {
						prev = prev + "&";
					}					
					return prev + current.key + "=" + current.value;
				}
				else {
					return prev;
				}
			}, "");
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
			View.url.set(Store.fetch());
			View.registerEvent('#process', 'click', this.process);
			View.registerEvent('#use-browser', 'click', this.useBrowserURL);
			View.registerEvent('#reload', 'click', this.reload);
			View.registerEvent('#url', 'focus paste', 
				$.proxy(View.hideUseBrowserAndExpandURLInput, View));
			View.registerEvent('#url', 'blur', 
				$.proxy(View.showUseBrowser, View));	
			View.registerEvent('#add', 'click', 
				$.proxy(View.addRow, View));
			View.registerEvent('#host', 'focus keyup paste', 
				$.proxy(View.hostValChanged, View));										
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
			if(url) {
				View.url.set(url);
				Store.save(url);
				Chrome.setURL(url);
			}
		}

	};	

	$(function() {
		App.init();
	});

})(this, $);