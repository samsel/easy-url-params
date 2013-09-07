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
* grunt develop _//to initialize the files in the build directory_
* grunt watch _as the files are changed in the src/app folder, the build files get geneated with develop config_

Release Process
----------------
* setup the deveopment environment as above
* make the desired changes
* grunt package
* release the generated easy-url-params.zip (found at project root) file to the chrome app store