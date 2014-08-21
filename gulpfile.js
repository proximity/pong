var gulp = require('gulp'),
	gutil = require('gulp-util'),
	watch = require('gulp-watch'),
	plumber = require('gulp-plumber'),
	sass = require('gulp-ruby-sass'),
	size = require('gulp-filesize'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer');

gulp.task('css', function() {
	return gulp.src('./public/scss/**/*.scss')
		.pipe(plumber())
		.pipe(sass({compass: true}))
		.pipe(autoprefixer())
		.pipe(minifycss({keepSpecialComments: 0}))
		.pipe(size())
		.pipe(gulp.dest('./public/css'));
});

gulp.task('css:watch', function() {
	watch({glob: './public/scss/**/*.scss', emit: 'all'}, ['css']);
});

gulp.task('js', function() {
	var bundler = browserify('./public/js/main.js');

	return bundler.bundle()
		.on('error', function(e) {
			gutil.log('Browserify Error', e);
		})
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(size())
		.pipe(gulp.dest('./public/js'));
});

gulp.task('js:watch', function() {
	var bundler = watchify('./public/js/main.js');

	bundler.on('update', build);

	function build() {
		return bundler.bundle()
			.on('error', function(e) {
				gutil.log('Browserify Error', e);
			})
			.pipe(source('bundle.js'))
			.pipe(buffer())
			.pipe(uglify())
			.pipe(size())
			.pipe(gulp.dest('./public/js'));
	}

	return build();
});

gulp.task('default', ['css', 'js']);
gulp.task('watch', ['css:watch', 'js:watch']);
