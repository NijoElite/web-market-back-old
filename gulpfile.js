const gulp = require('gulp');
const sass = require('gulp-sass');

const paths = {
  src: {
    js: 'src/js/**/*.js',
    sass: 'src/sass/**/*.*',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    images: 'src/images/**/*.*',
  },
  out: {
    css: 'public/css',
    js: 'public/js',
    img: 'public/img',
    fonts: 'public/fonts',
    images: 'public/images',
  },
};

gulp.task('sass', function() {
  return gulp.src(paths.src.sass).
      pipe(sass().on('error', sass.logError)).
      pipe(gulp.dest(paths.out.css));
});


gulp.task('js', function() {
  return gulp.src(paths.src.js).
      pipe(gulp.dest(paths.out.js));
});

gulp.task('images', function() {
  return gulp.src(paths.src.images).
      pipe(gulp.dest(paths.out.images));
});

gulp.task('fonts', function() {
  return gulp.src(paths.src.fonts).
      pipe(gulp.dest(paths.out.fonts));
});

gulp.task('build', gulp.series(['sass', 'js', 'fonts', 'images']));

gulp.task('watch', function() {
  gulp.series('build')();

  gulp.watch(paths.src.sass, gulp.series('sass'));
  gulp.watch(paths.src.js, gulp.series('js'));
  gulp.watch(paths.src.fonts, gulp.series('fonts'));
  gulp.watch(paths.src.fonts, gulp.series('images'));
});
