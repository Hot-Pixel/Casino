import gulp from "gulp";
import imagemin from "gulp-imagemin";
import watch from "gulp-watch";
import dartSass from "sass";
import gulpSass from "gulp-sass";
const sassCompiler = gulpSass(dartSass);
import maps from "gulp-sourcemaps";
import browserSync from "browser-sync";
const server = browserSync.create();
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import ejsCompiler from "gulp-ejs";
import webpack from "webpack-stream";
import esbuild from "gulp-esbuild";

const paths = {
  scss: {
    src: "src/scss/pages/*.scss",
    watcher: "src/scss/**/*.scss",
    dest: "public/css/",
  },
  css: {
    src: "public/css/*.css",
    dest: "public/css/min/",
  },
  scripts: {
    src: "src/js/main.js",
    watcher: "src/js/**/*.js",
    dest: "public/js/",
  },
  images: {
    src: "src/img/**/*",
    watcher: "src/img/**/*",
    dest: "public/img/",
  },
};

/* Gulp Pipe for compiling SASS main file */
gulp.task("sass", async () => {
  gulp
    .src(paths.scss.src)
    .pipe(maps.init())
    .pipe(sassCompiler().on("Error compiling!", sassCompiler.logError))
    .pipe(maps.write("./"))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(server.stream());
});

/* Gulp Pipe for minifying CSS main file */
gulp.task("minCss", async () => {
  gulp
    .src(paths.css.src)
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest(paths.css.dest));
});

/* Gulp task to Babel and Uglify the Javascript Code */
gulp.task("compileJs", async () => {
  gulp
    .src(paths.scripts.src)
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(rename("script.js"))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(uglify())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task("bundle", function () {
  return gulp
    .src("src/js/main.js")
    .pipe(
      esbuild({
        outfile: "script.js",
        bundle: true
      })
    )
    .pipe(gulp.dest("public/js/"));
});

/* Gulp task to minify images */
gulp.task("imageMin", async () => {
  gulp
    .src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
});

gulp.task("ejs", async () => {
  gulp
    .src("./views/*.ejs")
    .pipe(ejsCompiler())
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest("./public/html/"));
});

/* Gulp Watch */
gulp.task("watch", async () => {
  server.init({
    proxy: "http://localhost:3000",
  });
  watch(paths.scss.watcher).on("change", gulp.series("sass", server.reload));
  watch(paths.scripts.watcher).on(
    "change",
    gulp.series("compileJs", server.reload)
  );
  watch(paths.images.watcher).on("add", gulp.series("imageMin", server.reload));
  watch("./**/*.ejs").on("change", server.reload);
});
