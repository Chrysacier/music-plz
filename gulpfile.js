const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');

const autoprefixer = require('autoprefixer');

const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');

const browserSyncServer = require("browser-sync").create();

const styles = () => {
	return gulp.src( './src/assets/sass/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
	.pipe(postcss([
		autoprefixer({ overrideBrowserslist: ['last 2 versions', 'ie >= 10'] })
	]))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest( './dist/assets/css/'))
	.pipe(browserSyncServer.stream());
}

const javascript = () => {
	return gulp.src('./src/assets/js/**/*.js')
	  .pipe(sourcemaps.init())
	  .pipe(eslint())
	  .pipe(babel())
	  .pipe(concat('main.min.js'))
	  .pipe(uglify())
	  .pipe(sourcemaps.write('./'))
	  .pipe(gulp.dest( './dist/assets/js/'))
	  .pipe(browserSyncServer.stream());
}

const html = () => {
	return gulp.src('./src/*.html')
		.pipe(gulp.dest( './dist/'));
}

const watchFiles = () => {
	gulp.watch("./src/assets/sass/**/*.scss", styles);
	gulp.watch("./src/assets/js/**/*.js", javascript);
	gulp.watch("./src/*.html", gulp.series(html, browserReload));
}

const browserSync = (done) => {
	browserSyncServer.init({
		server: {
		  baseDir: "./dist"
		},
		port: 3000
	  });
	  done();
}

const browserReload = (done) => {
	browserSyncServer.reload();
	done();
}



const build = gulp.series(html, styles, javascript);
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

exports.watch = watch;
exports.default = build;
