const {src, dest, watch, parallel} = require('gulp');

const scss          = require('gulp-sass')(require('sass'));
const concat        = require('gulp-concat');
const browserSync   = require('browser-sync').create();
const uglify        = require('gulp-uglify-es').default;
const autoprefixer  = require('gulp-autoprefixer');




function browsersync(){
    browserSync.init({
        server : {
            baseDir: 'app/'
            
        }
    });
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function style() {
    return src('app/scss/style.scss')
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function build() {
    return src([
        'app/css/style.min.css',
        'app/form__build/css/demo.css',
        'app/form__build/css/intlTelInput.css',
        'app/fonts/**/*',
        'app/images/**/*',
        'app/form__build/img/**/*',
        'app/js/main.min.js',
        'app/form__build/js/data.js',
        'app/form__build/js/intlTelInput.js',
        'app/form__build/js/utils.js',
        'app/*.html',
    ], {base: 'app'})
        .pipe(dest('dist'))
}


function watching(){
    watch(['app/scss/**/*.scss'], style);
    watch(['app/js/main.js', '!app/js/main.min.js'], scripts);
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.style = style
exports.watching = watching
exports.browsersync = browsersync
exports.scripts = scripts
exports.build = build

exports.default = parallel(scripts, browsersync, watching)