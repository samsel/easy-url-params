
/*global module:false*/

var config = {

  uglify: {
    develop: {
        "screw-ie8":true,
        "verbose": true,
        "compress":false,
        "beautify":true,
        "mangle": false,
        "lint": true        
    },
    release: {
        "screw-ie8":true,
        "verbose": true,
        "report": 'gzip',
        "compress":true,
        "beautify":false,
        "mangle": true      
    },
    files: {
      'src/build/main.js': ['src/lib/jquery.js', 'src/lib/bootstrap.js', 'src/app/*.js']
    }     
  },

  cssmin: {   
    develop: {
      files: {
        'src/build/main.css': ['src/lib/*.css', 'src/app/*.css']
      } 
    },
    release: {
      options: {
        report: 'gzip', 
        debug:true
      },
      files: {
        'src/build/main.css': ['src/lib/*.css', 'src/app/*.css']
      }
    }
  },

  package: {
    options: {
      archive: './easy-url-params.zip',
      mode: 'zip'
    },
    files: [
      { 
        src: ['./src/app/app.html', './src/build/*', './src/img/**', './src/manifest.json'] 
      }
    ]
  } 
};

module.exports = function(grunt) {
	
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
	
  grunt.initConfig({

    uglify: {
      develop: {
        options: config.uglify.develop,
        files: config.uglify.files
      },
      release: {
        options: config.uglify.release,
        files: config.uglify.files
      }    
    },

    cssmin: {
      develop: config.cssmin.develop,
      release: config.cssmin.release
    },
    
    watch: {
      files: 'src/app/*',
      tasks: ['develop']
    },

    clean: ['src/build/*'],

    compress: {
        package: config.package 
    } 
  });

  grunt.registerTask('develop', ['clean', 'cssmin:develop', 'uglify:develop']);
  grunt.registerTask('release', ['clean', 'cssmin:release', 'uglify:release']);
  grunt.registerTask('package', ['release', 'compress:package']);
  grunt.registerTask('default', ['develop']);
};