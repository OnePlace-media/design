var gulp = require('gulp');
var stylus = require('gulp-stylus');
var combineMq = require('gulp-combine-mq');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var include = require('gulp-include');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

var params = {
	srcPath: 'src/', // Path to the source files
	distPath: 'public/' // Path to the distribution files
};

// Paths that gulp should watch
var watchPaths = {
	html: [
        params.srcPath + '**/*.html'
    ],
	styles: [
        params.srcPath + '**/*.styl'
    ]
};


// Browser-sync
gulp.task('browser-sync', function () {
	browserSync.init({
		port : 3200,
		ui: false,
		server: {
			baseDir: params.distPath
		}
	});
});


// HTML task
gulp.task('html', function () {
	gulp
		.src([params.srcPath + '*.html'])
		.pipe(include())
		.on("error", notify.onError({
			message: "Error: <%= error.message %>",
			title: "Error running html task"
		}))
		.pipe(gulp.dest(params.distPath))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// Stylus task
gulp.task('styles', function () {
	gulp
		.src([params.srcPath + 'css/*.styl'])
		.pipe(stylus())
		.pipe(autoprefixer({
			browsers: ['> 1%', 'Safari >= 7'],
			cascade: false
		}))
		.pipe(combineMq({
			beautify: true
		}))
		//    .pipe(cssmin())
		//    .pipe(rename({
		//      suffix: '.min'
		//    }))
		.pipe(gulp.dest(params.distPath + 'static/css/'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// Watch task
gulp.task('watch', function () {
	gulp.watch(watchPaths.html, ['html']);
	gulp.watch(watchPaths.styles, ['styles']);
	//  gulp.watch(params.distPath + '*.js').on('change', browserSync.reload);
});

// Default task
gulp.task('default', ['html', 'styles', 'watch', 'browser-sync']);