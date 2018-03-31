//gulp.src: Método por el que se le comunica a Gulp que archivos se van a usar para la tarea.
//gulp.dest: Método por el que se informa a Gulp la salida de los archivos una vez se complete la tarea.

'use strict';


var gulp = require('gulp'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	imageminMozjpeg = require('imagemin-mozjpeg'),
	imagemin = require('gulp-imagemin'),
	concat = require('gulp-concat'),
  	uglify = require('gulp-uglify'),
  	pump = require('pump'),
	browserSync = require('browser-sync').create();


gulp.task('server', function(){
	browserSync.init({
		server: './public/'
	})

	gulp.watch('./app/images/*.{jpg,jpeg,png,gif}', ['imagemin']);
	gulp.watch('./public/*.html').on('change',browserSync.reload);
	gulp.watch('./app/scss/*.scss', ['sass']);
})


//Tarea para SASS

gulp.task('sass', function () {
	return gulp.src('./app/scss/*.scss')   
	.pipe(sass().on('error', sass.logError))
	.pipe(plumber())   
	.pipe(gulp.dest('./public/css/'))
	.pipe(browserSync.stream()); 
});


gulp.task('compress', function () {
  pump([
        gulp.src('./app/js/*.js'),
        uglify(),
        gulp.dest('./public/js')
    ],
  );
});
	

// Tarea para reducir imagenes

gulp.task('imagemin', function() {
	gulp.src('./app/images/*.{jpg,jpeg,png,gif}')
	.pipe(plumber())
	.pipe(imagemin([
		imagemin.gifsicle({interlaced: true}),
		imagemin.jpegtran({progressive: true}),
		imagemin.optipng({optimizationLevel: 5}),
		imageminMozjpeg({ quality: 50 }),
		imagemin.svgo({
			plugins: [
			{removeViewBox: true},
			{cleanupIDs: false}
			]
		})
		]))
	.pipe(gulp.dest('./public/img'));
});


// Tarea para observar cambios

// gulp.task('watch', function () {
// 	gulp.watch('./app/scss/**/*.scss', ['sass']);
// 	gulp.watch('./app/images/**/*.{jpg,jpeg,png,gif}', ['imagemin']);
// });

gulp.task('sass:watch', function () {
  gulp.watch('./app/scss/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'compress', 'server']);
// gulp.task('default', ['sass', 'imagemin', 'connect', 'watch']);
