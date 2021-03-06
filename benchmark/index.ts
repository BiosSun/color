import { Suite } from 'benchmark'
import * as colorString from 'color-string'
import OldColor from '@biossun/color'
import Color from '../src/index'

function bench(value: string) {
    console.log(`\n> ${value}`)

    new Suite()
        .add('this           ', () => Color(value))
        .add('prev this      ', () => OldColor(value))
        .add('colorString    ', () => colorString.get(value))
        .on('cycle', (event: Event) => console.log('  ' + event.target))
        .run()

    console.log('')
}

bench('#FFF')
bench('#FFFF')
bench('#FFFFFF')
bench('#FFFFFFFF')
bench('rgb(255, 255, 255)')
bench('rgba(255, 255, 255, 1)')
bench('hsl(0, 100%, 50%)')
bench('hsla(0, 100%, 50%, 1)')
