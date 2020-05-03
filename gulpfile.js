const gulp = require('gulp')
const shelljs = require('shelljs')
const rollup = require('rollup')
const rollupTypescript = require('@rollup/plugin-typescript')

gulp.task('benchmark', async () => {
    const bundle = await rollup.rollup({
        input: './benchmark/index.ts',
        external: ['benchmark', 'color-string', /node_modules/],
        plugins: [rollupTypescript()],
    })

    await bundle.write({
        file: './output/benchmark.js',
        format: 'cjs',
    })

    shelljs.cd(__dirname)
    shelljs.exec('node ./output/benchmark.js')
})
