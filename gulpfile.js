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

import glob from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';


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
gulp.task("sass", async done => {
  gulp
    .src(paths.scss.src)
    .pipe(plumber())
    .pipe(maps.init())
    .pipe(sassCompiler().on("Error compiling!", sassCompiler.logError))
    .pipe(maps.write("./"))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(server.stream());
  done();
});

gulp.task("bundleImg", async done => imageMinTask('dist/img/'));

function imageMinTask(dest) {
  gulp
    .src(paths.images.src)
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest(dest));
}


gulp.task("js", async done => {
  return rollup
    .rollup({
      input: Object.fromEntries(
        glob.sync('src/js/**/*.js').map(file => [
          path.relative('src', file.slice(0, file.length - path.extname(file).length)),
          fileURLToPath(new URL(file, import.meta.url))
        ])
      ),
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
        dir: `public`,
        format: "es",
      });
    });
  done();
});

gulp.task("copyImg", async done => {
  gulp
    .src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
  done();
});

/* Keep imageMiin task for legacy */
gulp.task("imageMin", gulp.series("copyImg"));

/* Gulp Watch */
gulp.task("watch", gulp.series("sass", "js", "copyImg", async done => {
  server.init({
    proxy: "http://localhost:3000",
    browser: "chrome",
    online: false,
    tunnel: false,
    reloadDelay: 1000,
  });
  watch(paths.scss.watcher).on("change", gulp.series("sass", 'reload'));
  watch(paths.scripts.watcher).on("change", gulp.series("js", 'reload'));
  watch(paths.images.watcher).on("add", gulp.series("copyImg"));
  watch(paths.ejs.watcher).on("change", gulp.series('reload'));
  done();
}));

gulp.task('reload', async done => {
  server.notify("Compiling, please wait...");
  server.reload();
  done();
})

/*---------------------------------------------------*/

/* Bundle Tasks */
gulp.task("bundleEjs", async done => {
  gulp
    .src(paths.ejs.src)
    .pipe(ejsCompiler({
      player: {
        isLogged: true
      }
    }))
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest(paths.ejs.dest));
  done();
});

gulp.task("bundleJs", async done => {
  return rollup
    .rollup({
      input: Object.fromEntries(
        glob.sync('src/js/**/*.js').map(file => [
          path.relative('src', file.slice(0, file.length - path.extname(file).length)),
          fileURLToPath(new URL(file, import.meta.url))
        ])
      ),
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
        dir: `dist`,
        format: "es",
        plugins: [terser()],
      });
    });
  done();
});

gulp.task("bundleCss", async done => {
  gulp
    .src(paths.scss.src)
    .pipe(maps.init())
    .pipe(sassCompiler().on("Error compiling!", sassCompiler.logError))
    .pipe(maps.write("./"))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.css.dest))
  done();
});

// gulp.task("copyImg", async done => {
//   gulp
//     .src(paths.images.src)
//     .pipe(imagemin())
//     .pipe(gulp.dest('dist/img/'));
//   done();
// });

gulp.task("build", gulp.series("bundleJs", "bundleEjs", "bundleCss", "bundleImg"));