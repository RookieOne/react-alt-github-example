var gulp = require("gulp")
var webserver = require("gulp-webserver")
var concat = require("gulp-concat")
var sass = require("gulp-sass")
var browserify = require("browserify")
var reactify= require("reactify")
var babelify = require("babelify")
var source = require("vinyl-source-stream")
var watchify = require("watchify")
var livereload = require("gulp-livereload")

var DEST = "build"

var src = {
  webpages: "app/*.html",
  css: "./app/css/*.scss",
  images: "app/images/*.*"
}

gulp.task("default", ["watch"])

gulp.task("watch", ["build-app", "webserver"], function() {
  gulp.watch(src.webpages, ["move-webpages"])
  gulp.watch(src.css, ["css"])
  gulp.watch(src.images, ["images"])
})

gulp.task("build-app", ["move-webpages", "bower-css", "bower-js", "fonts", "fonts-awesome", "css", "images", "react"])

gulp.task("move-webpages", function() {
  return gulp.src(src.webpages)
    .pipe(gulp.dest(DEST))
})

gulp.task('css', function () {
  return gulp.src(src.css)
    .pipe(sass())
    .pipe(concat("main.css"))
    .pipe(gulp.dest(DEST + "/css"))
})

gulp.task("images", function() {
  return gulp.src(src.images)
    .pipe(gulp.dest(DEST + "/images"))
})

gulp.task("bower-css", function() {
  return gulp.src([
    "app/bower/materialize/bin/materialize.css",
    "app/bower/animate.css/animate.css",
    "app/bower/font-awesome/css/font-awesome.css"
  ])
  .pipe(concat("vendor.css"))
  .pipe(gulp.dest(DEST + "/css"))
})

gulp.task("bower-js", function() {
  return gulp.src([
    'app/bower/jquery/dist/jquery.js',
    'app/bower/materialize/dist/js/materialize.js'])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(DEST + "/js"))
})

gulp.task("fonts", function() {
  return gulp.src([
    "app/bower/materialize/font/**/*"
  ])
  .pipe(gulp.dest(DEST + "/font"))
})

gulp.task("fonts-awesome", function() {
  return gulp.src([
    "./app/bower/font-awesome/fonts/**.*"
  ])
  .pipe(gulp.dest(DEST + "/fonts"))
})

gulp.task("webserver", ["build-app"], function() {
  return gulp.src("build")
    .pipe(webserver({
      livereload: true
    }))
})

gulp.task("react", function() {
  var bundler;

  var bundle = function() {
    return bundler.bundle()
      .pipe(source("main.js"))
      .pipe(gulp.dest(DEST + "/js"))
      .pipe(livereload())
  }

  bundler = browserify("./app/main.js", watchify.args)
  bundler.transform(reactify)
  bundler.transform(babelify)
  bundler.on("update", bundle)
  bundler = watchify(bundler)

  return bundle()
})
