import gulp from "gulp";
import imagemin from "gulp-imagemin";
import watch from "gulp-watch";
import dartSass from "sass";
import gulpSass from "gulp-sass";
const sassCompiler = gulpSass(dartSass);
import maps from "gulp-sourcemaps";
import plumber from "gulp-plumber";
import browserSync from "browser-sync";
const server = browserSync.create();
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import ejsCompiler from "gulp-ejs";
import esbuild from "esbuild";

import * as rollup from "rollup";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const paths = {
  scss: {
    src: "src/scss/pages/*.scss",
    watcher: "src/scss/**/*.scss",
    dest: "public/css/",
  },
  css: {
    src: "public/css/*.css",
    dest: "dist/css/",
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
  ejs: {
    src: ['views/*.ejs', '!views/error.ejs'],
    watcher: "views/**/*.ejs",
    dest: "dist/",
  },
};

/* Gulp Pipe for compiling SASS main file */
gulp.task("sass", async () => {
  gulp
    .src(paths.scss.src)
    .pipe(plumber())
    .pipe(maps.init())
    .pipe(sassCompiler().on("Error compiling!", sassCompiler.logError))
    .pipe(maps.write("./"))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(server.stream());
});

/* Gulp task to minify images */
gulp.task("imageMin", async () => {
  gulp
    .src(paths.images.src)
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
});

gulp.task("js", async () => {
  return rollup
    .rollup({
      input: [
        "src/js/casino",
        "src/js/home",
        "src/js/slots",
        "src/js/slotsAll",
        "src/js/ruleta",
        "src/js/poker",
        "src/js/promociones",
        "src/js/promocion",
        "src/js/layout",
        "src/js/screens",
        "src/js/user",
        "src/js/data",
        "src/js/docs",
        "src/js/preferences",
        "src/js/support",
        "src/js/history",
        "src/js/wallet",
        "src/js/signIn",
        "src/js/signUp",
        "src/js/landingSeo",
      ],
      plugins: [
        commonjs({
          include: [
            "node_modules/mixitup/dist/mixitup.js",
            "src/js/modules/mixitup-multifilter.js",
          ],
        }),
        nodeResolve(),
      ],
    })
    .then((bundle) => {
      return bundle.write({
        dir: "public/js/",
        format: "esm",
        sourcemap: true,
      });
    });
});

/* Gulp Watch */
gulp.task("watch", async () => {
  server.init({
    proxy: "http://localhost:3000",
    browser: "chrome",
    online: true,
    tunnel: true,
  });
  watch(paths.scss.watcher).on("change", gulp.series("sass", server.reload));
  watch(paths.scripts.watcher).on("change", gulp.series("js", server.reload));
  watch(paths.images.watcher).on("add", gulp.series("imageMin"));
  watch(paths.ejs.watcher).on("change", server.reload);
});

/*---------------------------------------------------*/

/* Bundle Tasks */
gulp.task("bundleEjs", async () => {
  gulp
    .src(paths.ejs.src)
    .pipe(ejsCompiler())
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest(paths.ejs.dest));
});

gulp.task("bundleJs", async () => {
  const pagesArr = [
    "casino",
    "home",
    "slots",
    "slotsAll",
    "ruleta",
    "poker",
    "promociones",
    "layout",
  ];
  pagesArr.forEach((e) => {
    return rollup
      .rollup({
        input: [`src/js/${e}.js`],
        plugins: [
          commonjs({
            include: [
              "node_modules/mixitup/dist/mixitup.js",
              "src/js/modules/mixitup-multifilter.js",
            ],
          }),
          nodeResolve(),
        ],
      })
      .then((bundle) => {
        return bundle.write({
          file: `dist/js/${e}.js`,
          format: "iife",
          plugins: [terser()],
        });
      });
  });
});

// gulp.task("bundleCss", async () => {
//   gulp
//     .src(paths.css.src)
//     .pipe(autoprefixer())
//     .pipe(cleanCSS())
//     .pipe(rename({ extname: ".css" }))
//     .pipe(gulp.dest(paths.css.dest));
// });
gulp.task("bundleCss", async () => {
  gulp
    .src(paths.scss.src)
    .pipe(maps.init())
    .pipe(sassCompiler().on("Error compiling!", sassCompiler.logError))
    .pipe(maps.write("./"))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.css.dest))
});

gulp.task("copyImg", async () => {
  gulp
    .src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img/'));
});

gulp.task("build", gulp.series("bundleJs", "bundleEjs", "bundleCss", "copyImg"));