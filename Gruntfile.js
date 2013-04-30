/*global module:false*/
module.exports = function(grunt) {
	
  grunt.loadNpmTasks('grunt-encase');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
	
  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.1',
      banner: '/*Easy URL Params - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* https://github.com/samsel/easy-url-params \n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'Samuel Selvanathan; Licensed MIT */'
    },
    encase: {
      develop: {                      
        separator: '\n',           
        enviroment: 'browser',  
        exports: [],
        src: 'extension/src/*.js',            
        dest: 'extension/application.js'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'extension/src/*.js']
    },   
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:lib/FILE_NAME.js>'],
        dest: 'dist/FILE_NAME.js'
      }
    },
    uglify: {
      dist: {
        src: ['<banner:meta.banner>', 'extension/application.js'],
        dest: 'extension/application.min.js'
      }
    },
    watch: {
      files: 'extension/src/*.js',
      tasks: 'encase min'
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'encase', 'uglify']);

};
