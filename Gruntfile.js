
/*global module:false*/

module.exports = function(grunt) {
	
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
	
  grunt.initConfig({

    jshint: {
      files: ['Gruntfile.js', 'extension/app.js']
    },

    watch: {
      files: 'extension/src/*.js',
      tasks: 'encase min'
    }
  });

  grunt.registerTask('default', ['jshint', 'encase', 'uglify']);
};
