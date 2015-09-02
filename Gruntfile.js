'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      files: {
        expand: true,
        cwd: 'src/less/',
        src: '*.less',
        dest: 'dist/css/',
        ext: '.min.css'
      }
    },

    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
        cascade: false
      },
      dist: {
        expand: true,
        flatten: true,
        src: 'dist/css/*.min.css',
        dest: 'dist/css/'
      }
    },

    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: ['*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['less', 'autoprefixer', 'cssmin']);
};
