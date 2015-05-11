'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    autoprefixer: {
      options: ['last 1 version'],
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= app.src %>',
            '.'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '<%= app.src %>/{,*/}*.html',
            '.tmp/styles/{,*/}*.css',
            '{.tmp,<%= app.src %>}/scripts/{,*/}*.js',
            '<%= app.src %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            'bower_components/{,*/}*'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= app.dist %>'
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= app.src %>/scripts/{,*/}*.js'
      ]
    },
    concurrent: {
      server: [
        'compass:server',
        'copy:styles'
      ],
      test: [
        'compass',
        'copy:styles'
      ],
      dist: [
        'compass:dist',
        'copy:styles',
        'htmlmin'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      server: {
        configFile: 'karma.conf.js',
        singleRun: false,
        autoWatch: true
      }
    },
    plato: {
      report: {
        files: {
          'target/plato-report': ['<%= app.src %>/scripts/**/*.js']
        }
      }
    }
  });


  grunt.registerTask('test', [
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma:unit'
  ]);


    grunt.registerTask('test', [
    ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);
};
