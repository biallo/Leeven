module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: ['public/javascripts/sub/**'],
                tasks: ['uglify']
            },
            css: {
                files: ['public/stylesheets/sub/**'],
                tasks: ['less']
            }
        },
        less: {
            development: {
                options: {
                    paths: ["public/stylesheets"]
                },
                files: {
                    "public/stylesheets/style.css": "public/stylesheets/style.less"
                }
            },
            production: {
                options: {
                    paths: ["public/stylesheets"],
                    yuicompress: true
                },
                files: {
                    "public/stylesheets/style.min.css": "public/stylesheets/style.less"
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' //添加banner
            },
            main: {
                options: {
                    mangle: true, //混淆变量名
                    preserveComments: false, //删除所有注释
                    footer: '\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                files: {
                    'public/javascripts/libs.min.js': ['public/libs/jquery/jquery-1.11.1.js', 'public/libs/semantic/javascript/semantic.js', 'public/libs/npgrogress/npgrogress.js', 'public/javascripts/sub/base.js'],
                    'public/javascripts/sign.min.js': ['public/javascripts/sub/login.js', 'public/javascripts/sub/signup.js'],
                    'public/javascripts/script.min.js': ['public/javascripts/sub/projects.js', 'public/javascripts/sub/files.js']
                }
            }
        },
        concurrent: {
            target: {
                tasks: ['nodemon', 'watch', 'uglify'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js', 'hbs'],
                    watchedFolders: ['controllers', 'routes', 'public', 'views'],
                    debug: true,
                    delayTime: 1,
                    cwd: __dirname
                }
            },
            exec: {
                options: {
                    exec: 'less'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('default', ['less', 'concurrent:target']);
}