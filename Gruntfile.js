module.exports = function(grunt) {
    // load tasks
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    // Project configuration.
    grunt.initConfig({
        watch: {
            livereload:{
                options:{
                    livereload:true
                },
                files:['private/*.html', 'private/css/*.css', 'private/js/*.js']
            },

            scripts:{
                files: ['private/js/**/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false
                }
            },

            stylus:{
                files: ['private/stylus/**/*.styl'],
                tasks: ['preproccess']
            }
        },

        autoprefixer:{
            styles:{
                src: 'private/css/main.css'
            }
        },

        jshint:{
            options:{
                eqeqeq: true,
                undef: true,
                unused:true,
                strict: true,
                browser:true,
                devel:true,
                globals:{
                    jQuery: true
                }
            },
            files:['private/js/*.js']
        },

        stylus:{
            compile:{
                files: {
                    'private/css/main.css': 'private/stylus/main.styl'   
                }
            }
        }
    });  

    // register tasks
    grunt.registerTask('observer', ['watch']);
    grunt.registerTask('preproccess', ['stylus', 'autoprefixer']);
};