const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('default', function() {
	console.log("Gulp is watching...");
	gulp.watch('sass/**/*.scss', ['styles']);
});

gulp.task('styles', function() {
	gulp.src('sass/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./css/'));
});