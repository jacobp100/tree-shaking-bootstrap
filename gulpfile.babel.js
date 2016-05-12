import { flow, camelCase } from 'lodash/fp';
import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssnano from 'gulp-cssnano';
import transformClasses from 'postcss-transform-classes';
import esCssModules from 'es-css-modules';
import webpack from 'webpack';

const keywordsThatAppearInBootstrap = {
  in: 'In',
};

gulp.task('compile-bootstrap', () => (
  gulp.src('scss/bootstrap.scss')
    .pipe(sass())
    .pipe(postcss([
      transformClasses({
        transform: flow(
          camelCase,
          name => keywordsThatAppearInBootstrap[name] || name
        ),
      }),
    ]))
    .pipe(gulp.dest('styles'))
));

gulp.task('compile-css', ['compile-bootstrap'], () => (
  gulp.src('styles/**/*.css')
    .pipe(postcss([
      esCssModules({
        jsFiles: 'src/index.js',
        warnOnUnusedClasses: false,
      }),
    ]))
    .pipe(cssnano())
    .pipe(gulp.dest('dist'))
));

gulp.task('compile-js', ['compile-css'], (cb) => (
  webpack({
    entry: './src/index',
    output: {
      path: './dist',
      filename: 'index.js',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
        },
      ],
    },
  }, err => {
    cb(err);
  })
));

gulp.task('default', ['compile-js']);
