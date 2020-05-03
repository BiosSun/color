const gulp = require('gulp')
const ts = require('gulp-typescript')
const shelljs = require('shelljs')

gulp.task('benchmark', () => {
    const tsp = ts.createProject('./tsconfig.json')

    return gulp
        .src(['*.ts'])
        .pipe(tsp())
        .pipe(gulp.dest('./output'))
        .on('end', () => {
            shelljs.cd(__dirname)
            shelljs.exec('node ./output/index.benchmark.js')
        })
})
