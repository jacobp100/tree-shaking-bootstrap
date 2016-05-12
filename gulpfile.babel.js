import { camelCase } from 'lodash';
import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssnano from 'gulp-cssnano';
import transformClasses from 'postcss-transform-classes';
import autoprefixer from 'autoprefixer';
import esCssModules from 'es-css-modules';
import cssClassGenerator from 'css-class-generator';
import webpack from 'webpack';

const keywordsThatAppearInBootstrap = {
  in: '$in',
};

gulp.task('compile-bootstrap', () => (
  gulp.src('scss/bootstrap.scss')
    .pipe(sass())
    .pipe(postcss([
      transformClasses({
        transform: (name) => (
          name in keywordsThatAppearInBootstrap
            ? keywordsThatAppearInBootstrap[name]
            : camelCase(name)
        ),
      }),
      autoprefixer({
        browsers: ['last 2 versions'],
      }),
    ]))
    .pipe(gulp.dest('styles'))
));

gulp.task('compile-css', ['compile-bootstrap'], () => {
  const cssClass = cssClassGenerator();

  return gulp.src('styles/**/*.css')
    .pipe(postcss([
      esCssModules({
        jsFiles: 'src/index.js',
        generateScopedName: () => cssClass.next().value,
        warnOnUnusedClasses: false,
      }),
    ]))
    .pipe(cssnano({
      discardComments: {
        removeAll: true,
      },
    }))
    .pipe(gulp.dest('dist'));
});

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
