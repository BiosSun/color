import Color from '../src/index'

describe('parse', () => {
    test('#FFF', () => {
        expect(Color('#FFF')).toEqual({ model: 'rgb', format: 'abbr_hex', alpha: undefined, value: [255, 255, 255] })
        expect(Color('#0Ad')).toEqual({ model: 'rgb', format: 'abbr_hex', alpha: undefined, value: [0, 170, 221] })
        expect(Color(' #000    ')).toEqual({ model: 'rgb', format: 'abbr_hex', alpha: undefined, value: [0, 0, 0] })
    })

    test('#FFFF', () => {
        expect(Color('#FFFF')).toEqual({ model: 'rgb', format: 'abbr_hex', alpha: 1, value: [255, 255, 255] })
        expect(Color('#FFFD')).toEqual({ model: 'rgb', format: 'abbr_hex', alpha: 0xdd / 255, value: [255, 255, 255] })
        expect(Color('#FFFd')).toEqual({ model: 'rgb', format: 'abbr_hex', alpha: 0xdd / 255, value: [255, 255, 255] })
        expect(Color(' #FFF0    ')).toEqual({ model: 'rgb', format: 'abbr_hex', alpha: 0, value: [255, 255, 255] })
    })

    test('#FFFFFF', () => {
        expect(Color('#FFFFFF')).toEqual({ model: 'rgb', format: 'hex', alpha: undefined, value: [255, 255, 255] })
        expect(Color('#0077Bb')).toEqual({ model: 'rgb', format: 'hex', alpha: undefined, value: [0, 119, 187] })
        expect(Color('#0379bE')).toEqual({ model: 'rgb', format: 'hex', alpha: undefined, value: [3, 121, 190] })
        expect(Color(' #000000    ')).toEqual({ model: 'rgb', format: 'hex', alpha: undefined, value: [0, 0, 0] })
    })

    test('#FFFFFFFF', () => {
        expect(Color('#FFFFFFFF')).toEqual({ model: 'rgb', format: 'hex', alpha: 1, value: [255, 255, 255] })
        expect(Color('#FFFFFFDD')).toEqual({ model: 'rgb', format: 'hex', alpha: 0xdd / 255, value: [255, 255, 255] })
        expect(Color('#FFFFFFDd')).toEqual({ model: 'rgb', format: 'hex', alpha: 0xdd / 255, value: [255, 255, 255] })
        expect(Color(' #FFFFFF00    ')).toEqual({ model: 'rgb', format: 'hex', alpha: 0, value: [255, 255, 255] })
    })

    test('rgb(255, 255, 255)', () => {
        expect(Color('rgb(255, 255, 255)')).toEqual({ model: 'rgb', format: 'rgb', alpha: undefined, value: [255, 255, 255] })
        expect(Color('rgb(0, 119, 187)')).toEqual({ model: 'rgb', format: 'rgb', alpha: undefined, value: [0, 119, 187] })
        expect(Color('rgb(0, 0, 0)')).toEqual({ model: 'rgb', format: 'rgb', alpha: undefined, value: [0, 0, 0] })
        expect(Color('rgb(.4, 0.5, 20.3)')).toEqual({ model: 'rgb', format: 'rgb', alpha: undefined, value: [0, 1, 20] })
        expect(Color(' rgb(-.2, -100, 256)    ')).toEqual({ model: 'rgb', format: 'rgb', alpha: undefined, value: [0, 0, 255] })
    })

    test('rgba(255, 255, 255, 1)', () => {
        expect(Color('rgba(255, 255, 255, 1)')).toEqual({ model: 'rgb', format: 'rgb', alpha: 1, value: [255, 255, 255] })
        expect(Color('rgba(255, 255, 255, 0.87)')).toEqual({ model: 'rgb', format: 'rgb', alpha: 0.87, value: [255, 255, 255] })
        expect(Color('rgba(255, 255, 255, .87)')).toEqual({ model: 'rgb', format: 'rgb', alpha: 0.87, value: [255, 255, 255] })
        expect(Color('rgba(255, 255, 255, 0.866667)')).toEqual({ model: 'rgb', format: 'rgb', alpha: 0.866667, value: [255, 255, 255] })
        expect(Color('rgba(255, 255, 255, 2)')).toEqual({ model: 'rgb', format: 'rgb', alpha: 1, value: [255, 255, 255] })
        expect(Color(' rgba(255, 255, 255, -1.3)    ')).toEqual({ model: 'rgb', format: 'rgb', alpha: 0, value: [255, 255, 255] })
    })

    test('hsl(0, 0%, 100%)', () => {
        expect(Color('hsl(0,     0%,     50%)')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [0, 0, 50] })
        expect(Color('hsl(0,     50%,    50%)')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [0, 50, 50] })

        expect(Color('hsl(202,   100%,   50% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 100, 50] })
        expect(Color('hsl(370,   100%,   50% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [10, 100, 50] })
        expect(Color('hsl(-370,  100%,   50% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [350, 100, 50] })
        expect(Color('hsl(20.01, 100%,   50% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [20, 100, 50] })

        expect(Color('hsl(202,   0.2%,   50% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 0, 50] })
        expect(Color('hsl(202,   .2%,    50% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 0, 50] })
        expect(Color('hsl(202,   .5%,    50% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 1, 50] })
        expect(Color('hsl(202,   -.5%,   50% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 0, 50] })
        expect(Color('hsl(202,   100.7%, 50% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 100, 50] })

        expect(Color('hsl(202,   100%,   0%    )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 0, 0] })
        expect(Color('hsl(202,   100%,   100%  )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 0, 100] })
        expect(Color('hsl(202,   100%,   50.4% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 100, 50] })
        expect(Color('hsl(202,   100%,   50.5% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 100, 51] })
        expect(Color('hsl(202,   100%,   .555% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 100, 1] })
        expect(Color('hsl(202,   100%,   -.5%  )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 0, 0] })
        expect(Color('hsl(202,   100%,   100.5%)')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 0, 100] })

        expect(Color('hsl(0, 120%, -120%)')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [0, 0, 0] })
        expect(Color('hsl(0.0001, 100.00%, 37.12345%)')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [0, 100, 37] })
        expect(Color('hsl(0,0%,100%)')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [0, 0, 100] })
        expect(Color(' hsl(  0.0001,100.00%,    37.12345%)    ')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [0, 100, 37] })
    })

    test('hsla(0, 0%, 100%, 1)', () => {
        expect(Color('hsla(0, 0%, 100%, 1)')).toEqual({ model: 'hsl', format: 'hsl', alpha: 1, value: [0, 0, 100] })
        expect(Color('hsla(0, 0%, 100%, 0.87)')).toEqual({ model: 'hsl', format: 'hsl', alpha: 0.87, value: [0, 0, 100] })
        expect(Color('hsla(0, 0%, 100%, .87)')).toEqual({ model: 'hsl', format: 'hsl', alpha: 0.87, value: [0, 0, 100] })
        expect(Color('hsla(0, 0%, 100%, .866667)')).toEqual({ model: 'hsl', format: 'hsl', alpha: 0.866667, value: [0, 0, 100] })
        expect(Color('hsla(0, 0%, 100%, 2)')).toEqual({ model: 'hsl', format: 'hsl', alpha: 1, value: [0, 0, 100] })
        expect(Color(' hsla(  0,0%,  100%,   -1.3    )    ')).toEqual({ model: 'hsl', format: 'hsl', alpha: 0, value: [0, 0, 100] })
    })

    test('hsv(0, 0%, 100%)', () => {
        expect(Color('hsv(0,     0%,     50%)')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [0, 0, 50] })
        expect(Color('hsv(0,     50%,    50%)')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [0, 50, 50] })

        expect(Color('hsv(202,   100%,   50% )')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [202, 100, 50] })
        expect(Color('hsv(370,   100%,   50% )')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [10, 100, 50] })
        expect(Color('hsv(-370,  100%,   50% )')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [350, 100, 50] })
        expect(Color('hsv(20.01, 100%,   50% )')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [20, 100, 50] })

        expect(Color('hsv(202,   0.2%,   50% )')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [202, 0, 50] })
        expect(Color('hsv(202,   .2%,    50% )')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [202, 0, 50] })
        expect(Color('hsv(202,   .5%,    50% )')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [202, 1, 50] })
        expect(Color('hsv(202,   -.5%,   50% )')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [202, 0, 50] })
        expect(Color('hsv(202,   100.7%, 50% )')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [202, 100, 50] })

        expect(Color('hsv(202,   100%,   0%    )')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [202, 0, 0] })
        expect(Color('hsv(202,   100%,   100%  )')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [202, 100, 100] })
        expect(Color('hsv(202,   100%,   50.4% )')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [202, 100, 50] })
        expect(Color('hsv(202,   100%,   50.5% )')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [202, 100, 51] })
        expect(Color('hsv(202,   100%,   .555% )')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [202, 100, 1] })
        expect(Color('hsv(202,   100%,   -.5%  )')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [202, 0, 0] })
        expect(Color('hsv(202,   100%,   100.5%)')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [202, 100, 100] })

        expect(Color('hsv(0, 120%, -120%)')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [0, 0, 0] })
        expect(Color('hsv(0.001, 100.00%, 37.12345%)')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [0, 100, 37] })
        expect(Color('hsv(0,0%,100%)')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [0, 0, 100] })
        expect(Color(' hsv(  0.0001,100.00%,    37.12345%)    ')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [0, 100, 37] })
    })

    test('hsva(0, 0%, 100%, 1)', () => {
        expect(Color('hsva(0, 0%, 100%, 1)')).toEqual({ model: 'hsv', format: 'hsv', alpha: 1, value: [0, 0, 100] })
        expect(Color('hsva(0, 0%, 100%, 0.87)')).toEqual({ model: 'hsv', format: 'hsv', alpha: 0.87, value: [0, 0, 100] })
        expect(Color('hsva(0, 0%, 100%, .87)')).toEqual({ model: 'hsv', format: 'hsv', alpha: 0.87, value: [0, 0, 100] })
        expect(Color('hsva(0, 0%, 100%, .866667)')).toEqual({ model: 'hsv', format: 'hsv', alpha: 0.866667, value: [0, 0, 100] })
        expect(Color('hsva(0, 0%, 100%, 2)')).toEqual({ model: 'hsv', format: 'hsv', alpha: 1, value: [0, 0, 100] })
        expect(Color('hsva(    0,     0%, 100%, -1.3)')).toEqual({ model: 'hsv', format: 'hsv', alpha: 0, value: [0, 0, 100] })
    })

    test('hsb(0, 0%, 100%)', () => {
        expect(Color('hsb(0,     0%,     50%)')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [0, 0, 50] })
        expect(Color('hsb(0,     50%,    50%)')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [0, 50, 50] })

        expect(Color('hsb(202,   100%,   50% )')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [202, 100, 50] })
        expect(Color('hsb(370,   100%,   50% )')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [10, 100, 50] })
        expect(Color('hsb(-370,  100%,   50% )')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [350, 100, 50] })
        expect(Color('hsb(20.01, 100%,   50% )')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [20, 100, 50] })

        expect(Color('hsb(202,   0.2%,   50% )')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [202, 0, 50] })
        expect(Color('hsb(202,   .2%,    50% )')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [202, 0, 50] })
        expect(Color('hsb(202,   .5%,    50% )')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [202, 1, 50] })
        expect(Color('hsb(202,   -.5%,   50% )')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [202, 0, 50] })
        expect(Color('hsb(202,   100.7%, 50% )')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [202, 100, 50] })

        expect(Color('hsb(202,   100%,   0%    )')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [202, 0, 0] })
        expect(Color('hsb(202,   100%,   100%  )')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [202, 100, 100] })
        expect(Color('hsb(202,   100%,   50.4% )')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [202, 100, 50] })
        expect(Color('hsb(202,   100%,   50.5% )')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [202, 100, 51] })
        expect(Color('hsb(202,   100%,   .555% )')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [202, 100, 1] })
        expect(Color('hsb(202,   100%,   -.5%  )')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [202, 0, 0] })
        expect(Color('hsb(202,   100%,   100.5%)')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [202, 100, 100] })

        expect(Color('hsb(0, 120%, -120%)')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [0, 0, 0] })
        expect(Color('hsb(0.001, 100.00%, 37.12345%)')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [0, 100, 37] })
        expect(Color('hsb(0,0%,100%)')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [0, 0, 100] })
        expect(Color(' hsb(  0.0001,100.00%,    37.12345%)    ')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [0, 100, 37] })
    })

    test('hsva(0, 0%, 100%, 1)', () => {
        expect(Color('hsba(0, 0%, 100%, 1)')).toEqual({ model: 'hsv', format: 'hsb', alpha: 1, value: [0, 0, 100] })
        expect(Color('hsba(0, 0%, 100%, 0.87)')).toEqual({ model: 'hsv', format: 'hsb', alpha: 0.87, value: [0, 0, 100] })
        expect(Color('hsba(0, 0%, 100%, .87)')).toEqual({ model: 'hsv', format: 'hsb', alpha: 0.87, value: [0, 0, 100] })
        expect(Color('hsba(0, 0%, 100%, .866667)')).toEqual({ model: 'hsv', format: 'hsb', alpha: 0.866667, value: [0, 0, 100] })
        expect(Color('hsba(0, 0%, 100%, 2)')).toEqual({ model: 'hsv', format: 'hsb', alpha: 1, value: [0, 0, 100] })
        expect(Color('hsba(    0,     0%, 100%, -1.3)')).toEqual({ model: 'hsv', format: 'hsb', alpha: 0, value: [0, 0, 100] })
    })

    test('invalids', () => {
        const values = [
            '#',
            '#1',
            '#12',
            '#12345',
            '#1234567',
            '#123456789',
            '#123456789a',
            '#ggg',
            '#gggg',
            '#gggggg',
            '#gggggggg',
            '# fff',
            '#f ff',
            'rgb',
            'rgb()',
            'rgb(,,)',
            'rgb( , , )',
            'rgb(0)',
            'rgb(0,)',
            'rgb(0, 0)',
            'rgb(0, 0, 0, 0)',
            'rgb(0, ., 0)',
            'rgb(+, 0, 0)',
            'rgb(-, 0, 0)',
            'rgba',
            'rgba()',
            'rgba(,,,)',
            'rgba( , , , )',
            'rgba(0, 0, 0)',
            'rgba(0, 0, 0, 0, 0)',
            'rgba(0, 0, 0, .)',
            'rgba(0, 0, 0, +)',
            'rgba(0, 0, 0, -.)',
            'hsl',
            'hsl()',
            'hsl(,,)',
            'hsl( , , )',
            'hsl(0)',
            'hsl(0,)',
            'hsl(0, 0)',
            'hsl(0, 0, 0)',
            'hsl(0, 0, 0, 0, 0)',
            'hsl(., 100%, 100%)',
            'hsl(+, 100%, 100%)',
            'hsl(-., 100%, 100%)',
            'hsl(-., 100%, 100%, 0)',
            'hsl(-., 100%, 100%, 1)',
            'hsl(0, %, 100%)',
            'hsl(0, .%, 100%)',
            'hsl(0, +%, 100%)',
            'hsl(0, -.%, 100%)',
            'hsla',
            'hsla()',
            'hsla(,,,)',
            'hsla( , , , )',
            'hsla(0, 0, 0)',
            'hsla(0, 0, 0, 0, 0)',
            'hsla(0, 100%, 100%)',
            'hsla(0, 100%, 100%, .)',
            'hsla(0, 100%, 100%, +)',
            'hsla(0, 100%, 100%, -.)',
            'hsla(0, 100%, 100%, .)',
            'hsv',
            'hsv()',
            'hsv(,,)',
            'hsv( , , )',
            'hsv(0)',
            'hsv(0,)',
            'hsv(0, 0)',
            'hsv(0, 0, 0)',
            'hsv(0, 0, 0, 0, 0)',
            'hsv(., 100%, 100%)',
            'hsv(+, 100%, 100%)',
            'hsv(-., 100%, 100%)',
            'hsv(-., 100%, 100%, 0)',
            'hsv(-., 100%, 100%, 1)',
            'hsv(0, %, 100%)',
            'hsv(0, .%, 100%)',
            'hsv(0, +%, 100%)',
            'hsv(0, -.%, 100%)',
            'hsva',
            'hsva()',
            'hsva(,,,)',
            'hsva( , , , )',
            'hsva(0, 0, 0)',
            'hsva(0, 0, 0, 0, 0)',
            'hsva(0, 100%, 100%)',
            'hsva(0, 100%, 100%, .)',
            'hsva(0, 100%, 100%, +)',
            'hsva(0, 100%, 100%, -.)',
            'hsva(0, 100%, 100%, .)',
        ]

        for (const v of values) {
            expect({ source: v, result: Color(v) }).toEqual({ source: v, result: null })
        }
    })
})
