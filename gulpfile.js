const gulp = require('gulp');
const sass = require('gulp-sass');

const paths = {
  src: {
    js: 'src/js/**/*.js',
    sass: 'src/sass/**/*.*',
    img: 'src/img/**/*.*',
  },
  out: {
    css: 'public/css',
    js: 'public/js',
    img: 'public/img',
  },
};

gulp.task('sass', function() {
  return gulp.src(paths.src.sass).
      pipe(sass().on('error', sass.logError)).
      pipe(gulp.dest(paths.out.css));
});

gulp.task('build', gulp.series(['sass']));

gulp.task('watch', function() {
  gulp.watch([paths.src.sass],
      gulp.series('build'));
});
