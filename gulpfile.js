/// <vs />
var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var reload = browserSync.reload;
var gutil = require('gulp-util');
//var inject = require('gulp-inject');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var spritesmith = require('gulp.spritesmith');

var onError = function (err) {
    gutil.beep();
    console.log(err);
};

var src = {
    scss: 'assets/sass/**/*.scss',
    css: 'assets/css',
    html: ['Views/**/*.cshtml', '*.html'],
    js: 'assets/js/**/*.js',
    map: 'assets/map',
};

//gulp.task('jsadd', function () {
//    var target = gulp.src('./src/index.html');
//    // It's not necessary to read the files (will speed up things), we're only after their paths:
//    var sources = gulp.src(['assets/js/lib/*.js'], {read: false});
//
//    return target.pipe(inject(sources))
//        .pipe(gulp.dest('./src'));
//});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

    browserSync({
        startPath: "/",
        proxy: "localhost:19089"
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html).on('change', reload);
    gulp.watch(src.js).on('change', reload);
});

// Compile sass into CSS
gulp.task('sass', function () {
    return gulp.src(src.scss)
               .pipe(plumber())
        .pipe(sourcemaps.init())
       
        .pipe(sass.sync({
            outputStyle: 'compressed',
        }))
         .pipe(autoprefixer({
             browsers: ['last 50 versions'],
             cascade: false
         }))
        .pipe(sourcemaps.write(src.map))
        .pipe(gulp.dest(src.css))

        .pipe(browserSync.stream());
});
gulp.task('autoprefix', function () {
    return gulp.src(src.css)
         .pipe(autoprefixer({
             browsers: ['last 50 versions'],
             cascade: false
         }))
});



gulp.task('sprite', function () {
    var spriteData = gulp.src('./assets/images/section-icons/*.png').pipe(spritesmith({
        imgName: 'section-icons-sprite.png',
        cssName: 'section-icons-sprite.css',
      // algorithm: 'left-right',
        algorithmOpts: { sort: false }
    }));
    return spriteData.pipe(gulp.dest('./assets/images/section-icons/'));
});

gulp.task('default', ['serve']);
