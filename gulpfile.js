var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var del = require("del");


/*Acabei não utilizando o gulp-rename mas não consegui desisntalar*/

gulp.task("cleanCss", function(){
    del("./dist/css");
});

gulp.task("cleanHtml", function(){
    del("./dist/*.html");
});


/*Minificar Html*/

var html = './source/index.html';
var htmlDest = './dist/';

gulp.task('minificarhtml',['cleanHtml'], function(){
   return gulp.src(html) 
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(htmlDest));
});


/*Minificar Scss*/

// Sass Source
var scssArquivos = './source/scss/*.scss';

// CSS destino
var cssDest = './dist/css/';

// Options for development
var estiloSaida = {
  outputStyle: 'compressed',
}

gulp.task('sassdev',['cleanCss'], function() {
  return gulp.src(scssArquivos)
    .pipe(sass(estiloSaida).on('error', sass.logError))
    .pipe(gulp.dest(cssDest));
});


// Task 'watch' - Run with command 'gulp watch'
gulp.task('watch', function() {
  gulp.watch(scssArquivos, ['sassdev']);
});

// Default task - Run with command 'gulp'
gulp.task('default', ['sassdev', 'watch','minificarhtml']);
