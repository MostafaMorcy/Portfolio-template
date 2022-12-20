const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile Sass & Inject into browser
gulp.task('sass', function() {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('dist/src/css'))
    .pipe(browserSync.stream());
});
// Move JS Files to src/js
gulp.task('js', function() {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest('dist/src/js'))
    .pipe(browserSync.stream());
});
// Watch Sass & Server
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: "./dist/src"
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'scss/*.scss'], ['sass']);
  gulp.watch('dist/*.html').on('change', browserSync.reload);
});

// Move Fonts folder to src
gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('dist/src/fonts'));
});

// Move Font Awesome CSS to src/css
gulp.task('fa', function() {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('dist/src/css'));
});

gulp.task('default', ['js', 'serve', 'fa', 'fonts']);
