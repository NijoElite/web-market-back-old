const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

const paths = {
  src: {
    js: 'src/js/**/*.js',
    sass: 'src/sass/**/*.*',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
  },
  out: {
    css: 'public/css',
    js: 'public/js',
    img: 'public/img',
    fonts: 'public/fonts',
  },
};

gulp.task('sass', function() {
  return gulp.src(paths.src.sass).
      pipe(sass().on('error', sass.logError)).
      pipe(gulp.dest(paths.out.css));
});


gulp.task('js', function() {
  return gulp.src(paths.src.js).
      pipe(concat('main.js')).
      pipe(gulp.dest(paths.out.js));
});

gulp.task('fonts', function() {
  return gulp.src(paths.src.fonts).
      pipe(gulp.dest(paths.out.fonts));
});

gulp.task('build', gulp.series(['sass', 'js', 'fonts']));

gulp.task('watch', function() {
  gulp.watch([paths.src.sass, paths.src.js, paths.src.fonts],
      gulp.series('build'));
});
