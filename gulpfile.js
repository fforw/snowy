
var uglify = require('gulp-uglify');
var gulp = require('gulp');
var browserify = require('browserify');
var sourceStream = require("vinyl-source-stream");
var mocha = require("gulp-mocha");
var espower = require("gulp-espower");
//var streamify = require('gulp-streamify')

var mainFile = "./src/script/main";

var browserifyConfig = {
    debug : !gulp.env.production
};

var paths = {
    html: "src/*.html",
    media: "src/media/**/*",
    script: "src/script/**/*.js"
}

// Basic usage

gulp.task('script', function() {

    var stream = browserify({
        entries: mainFile,
        debug: true
    }).bundle();

    stream.pipe(sourceStream("main.js"))
//        .pipe(streamify(uglify()))
        .pipe(gulp.dest("build"));
});

gulp.task('html', function () {
    gulp.src(paths.html)
        .pipe(gulp.dest("build"));
});

gulp.task('media', function () {
    gulp.src(paths.media)
        .pipe(gulp.dest("build/media"));
});

gulp.task('watchdog', function () {
    gulp.watch(paths.script, ['script']);
    gulp.watch(paths.media, ['media']);
    gulp.watch(paths.html, ['html']);
});

gulp.task("test", function ()
{
    gulp.src("test/**/*.js")
        .pipe(espower())
        .pipe(gulp.dest("build/test"))
        .pipe(mocha({reporter: 'spec'}))
});

gulp.task("watch", ["script", "html", "media", "watchdog"]);

gulp.task("default", ["script", "html", "media"]);
