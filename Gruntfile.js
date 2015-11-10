/*global module */
module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                  'scripts/navigation.js',
                  'scripts/jquery-1.8.0.min.js',
                  'scripts/modernizr-2.6.1.min.js',
                  'scripts/flowtype.js',
                  'scripts/skip-link-focus-fix.js',
                  'scripts/project.core.js'
                ],
                dest: 'scripts/combined.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'scripts/combined.min.js': ['scripts/combined.js']
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'assets/css/style.css': 'assets/sass/style.scss'
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'assets/css/style.min.css': ['assets/css/style.css']
                }
            }
        },

        watch: {
            sass: {
                files: 'assets/sass/**/*.scss',
                tasks: ['sass','cssmin']
            },
            concat: {
                files: ['scripts/**/*.js','!scripts/combined*.js'],
                tasks: ['concat','uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['sass', 'cssmin', 'concat', 'uglify']);
};