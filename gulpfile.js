const gulp = require('gulp')
const shelljs = require('shelljs')
const ts = require('gulp-typescript')
const merge = require('merge2')
const rollup = require('rollup')
const rollupTypescript = require('@rollup/plugin-typescript')

gulp.task('benchmark', async () => {
    const bundle = await rollup.rollup({
        input: './benchmark/index.ts',
        external: ['benchmark', '@biossun/color', 'color-string', 'color-convert'],
        plugins: [rollupTypescript()],
    })

    await bundle.write({
        file: './output/benchmark.js',
        format: 'cjs',
    })

    shelljs.cd(__dirname)
    shelljs.exec('node ./output/benchmark.js')
})

gulp.task('build', async () => {
    const tsp = ts.createProject('./tsconfig.json', {
        declaration: true,
        module: 'CommonJS',
        esModuleInterop: false,
    })

    const tsResult = gulp.src(['src/*.ts']).pipe(tsp())

    return merge([tsResult.dts.pipe(gulp.dest('./')), tsResult.js.pipe(gulp.dest('./'))])
})
