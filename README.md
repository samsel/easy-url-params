Easy URL Params
===============

Easy URL Params is an extension for Chrome to manipulate and visualize the query parameters in URL

Features
--------
* Easily View Parameters in a URL Query string in a tabular form
* URL can be loaded from active chrome tab
* Modify individual Params and reload the new url in the current tab
* Preserve state - save & load the last viewed URL using local storage

To Dos
------
* Make Preserve state configurable (URL expires after x minutes)
* Size of URL params
* Support # in URLs 
	(http://stackoverflow.com/questions/1122523/google-using-instead-of-search-in-url-why)
* Listen for changes in any attr and then do query split act on that.
	ex: img beacon being fired out


Dev Setup Process
------------------
* git clone git@github.com:samsel/easy-url-params.git
* cd easy-url-params
* npm install
* grunt develop _(to initialize the files in the build directory)_
* grunt watch _(as the files are changed in the src/app folder, the build files get generated with develop config)_

Release Process
----------------
* setup the deveopment environment as above
* make the desired changes
* run command: grunt package
* release the generated easy-url-params.zip file(found at project root) to the chrome app store