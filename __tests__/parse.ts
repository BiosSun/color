import color from '../index'

describe('parse', () => {
    test('#FFF', () => {
        expect(color('#FFF')).toEqual({ model: 'rgb', format: 'abbr-hex', alpha: undefined, value: [255, 255, 255] })
        expect(color('#0Ad')).toEqual({ model: 'rgb', format: 'abbr-hex', alpha: undefined, value: [0, 170, 221] })
        expect(color(' #000    ')).toEqual({ model: 'rgb', format: 'abbr-hex', alpha: undefined, value: [0, 0, 0] })
    })

    test('#FFFF', () => {
        expect(color('#FFFF')).toEqual({ model: 'rgb', format: 'abbr-hex', alpha: 1, value: [255, 255, 255] })
        expect(color('#FFFD')).toEqual({ model: 'rgb', format: 'abbr-hex', alpha: 0xdd / 255, value: [255, 255, 255] })
        expect(color('#FFFd')).toEqual({ model: 'rgb', format: 'abbr-hex', alpha: 0xdd / 255, value: [255, 255, 255] })
        expect(color(' #FFF0    ')).toEqual({ model: 'rgb', format: 'abbr-hex', alpha: 0, value: [255, 255, 255] })
    })

    test('#FFFFFF', () => {
        expect(color('#FFFFFF')).toEqual({ model: 'rgb', format: 'hex', alpha: undefined, value: [255, 255, 255] })
        expect(color('#0077Bb')).toEqual({ model: 'rgb', format: 'hex', alpha: undefined, value: [0, 119, 187] })
        expect(color('#0379bE')).toEqual({ model: 'rgb', format: 'hex', alpha: undefined, value: [3, 121, 190] })
        expect(color(' #000000    ')).toEqual({ model: 'rgb', format: 'hex', alpha: undefined, value: [0, 0, 0] })
    })

    test('#FFFFFFFF', () => {
        expect(color('#FFFFFFFF')).toEqual({ model: 'rgb', format: 'hex', alpha: 1, value: [255, 255, 255] })
        expect(color('#FFFFFFDD')).toEqual({ model: 'rgb', format: 'hex', alpha: 0xdd / 255, value: [255, 255, 255] })
        expect(color('#FFFFFFDd')).toEqual({ model: 'rgb', format: 'hex', alpha: 0xdd / 255, value: [255, 255, 255] })
        expect(color(' #FFFFFF00    ')).toEqual({ model: 'rgb', format: 'hex', alpha: 0, value: [255, 255, 255] })
    })

    test('rgb(255, 255, 255)', () => {
        expect(color('rgb(255, 255, 255)')).toEqual({ model: 'rgb', format: 'rgb', alpha: undefined, value: [255, 255, 255] })
        expect(color('rgb(0, 119, 187)')).toEqual({ model: 'rgb', format: 'rgb', alpha: undefined, value: [0, 119, 187] })
        expect(color('rgb(0, 0, 0)')).toEqual({ model: 'rgb', format: 'rgb', alpha: undefined, value: [0, 0, 0] })
        expect(color(' rgb(.2, -300.3, 20.3)    ')).toEqual({ model: 'rgb', format: 'rgb', alpha: undefined, value: [0.2, -300.3, 20.3] })
    })

    test('rgba(255, 255, 255, 1)', () => {
        expect(color('rgba(255, 255, 255, 1)')).toEqual({ model: 'rgb', format: 'rgb', alpha: 1, value: [255, 255, 255] })
        expect(color('rgba(255, 255, 255, 0.87)')).toEqual({ model: 'rgb', format: 'rgb', alpha: 0.87, value: [255, 255, 255] })
        expect(color('rgba(255, 255, 255, .87)')).toEqual({ model: 'rgb', format: 'rgb', alpha: 0.87, value: [255, 255, 255] })
        expect(color('rgba(255, 255, 255, 0.866667)')).toEqual({ model: 'rgb', format: 'rgb', alpha: 0.866667, value: [255, 255, 255] })
        expect(color('rgba(255, 255, 255, 2)')).toEqual({ model: 'rgb', format: 'rgb', alpha: 2, value: [255, 255, 255] })
        expect(color(' rgba(255, 255, 255, -1.3)    ')).toEqual({ model: 'rgb', format: 'rgb', alpha: -1.3, value: [255, 255, 255] })
    })

    test('hsl(0, 0%, 100%)', () => {
        expect(color('hsl(0, 0%, 100%)')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [0, 0, 100] })
        expect(color('hsl(0, 50%, 100%)')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [0, 50, 100] })
        expect(color('hsl(202, 100%, 37%)')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 100, 37] })
        expect(color('hsl(370, 100%, 37%)')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [370, 100, 37] })
        expect(color('hsl(-370, 100%, 37%)')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [-370, 100, 37] })
        expect(color('hsl(0, 120%, -120%)')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [0, 120, -120] })
        expect(color('hsl(0.0001, 100.00%, 37.12345%)')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [0.0001, 100, 37.12345] })
        expect(color('hsl(0,0%,100%)')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [0, 0, 100] })
        expect(color(' hsl(  0.0001,100.00%,    37.12345%)    ')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [0.0001, 100, 37.12345] })
    })

    test('hsla(0, 0%, 100%, 1)', () => {
        expect(color('hsla(0, 0%, 100%, 1)')).toEqual({ model: 'hsl', format: 'hsl', alpha: 1, value: [0, 0, 100] })
        expect(color('hsla(0, 0%, 100%, 0.87)')).toEqual({ model: 'hsl', format: 'hsl', alpha: 0.87, value: [0, 0, 100] })
        expect(color('hsla(0, 0%, 100%, .87)')).toEqual({ model: 'hsl', format: 'hsl', alpha: 0.87, value: [0, 0, 100] })
        expect(color('hsla(0, 0%, 100%, .866667)')).toEqual({ model: 'hsl', format: 'hsl', alpha: 0.866667, value: [0, 0, 100] })
        expect(color('hsla(0, 0%, 100%, 2)')).toEqual({ model: 'hsl', format: 'hsl', alpha: 2, value: [0, 0, 100] })
        expect(color(' hsla(  0,0%,  100%,   -1.3    )    ')).toEqual({ model: 'hsl', format: 'hsl', alpha: -1.3, value: [0, 0, 100] })
    })

    test('hsv(0, 0%, 100%)', () => {
        expect(color('hsv(0, 0%, 100%)')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [0, 0, 100] })
        expect(color('hsv(0, 50%, 100%)')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [0, 50, 100] })
        expect(color('hsv(202, 100%, 37%)')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [202, 100, 37] })
        expect(color('hsv(370, 100%, 37%)')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [370, 100, 37] })
        expect(color('hsv(-370, 100%, 37%)')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [-370, 100, 37] })
        expect(color('hsv(0, 120%, -120%)')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [0, 120, -120] })
        expect(color('hsv(0.0001, 100.00%, 37.12345%)')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [0.0001, 100, 37.12345] })
        expect(color('hsv(0,0%,100%)')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [0, 0, 100] })
        expect(color('hsv(   0.0001,100.00%,    37.12345%)')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [0.0001, 100, 37.12345] })
    })

    test('hsva(0, 0%, 100%, 1)', () => {
        expect(color('hsva(0, 0%, 100%, 1)')).toEqual({ model: 'hsv', format: 'hsv', alpha: 1, value: [0, 0, 100] })
        expect(color('hsva(0, 0%, 100%, 0.87)')).toEqual({ model: 'hsv', format: 'hsv', alpha: 0.87, value: [0, 0, 100] })
        expect(color('hsva(0, 0%, 100%, .87)')).toEqual({ model: 'hsv', format: 'hsv', alpha: 0.87, value: [0, 0, 100] })
        expect(color('hsva(0, 0%, 100%, .866667)')).toEqual({ model: 'hsv', format: 'hsv', alpha: 0.866667, value: [0, 0, 100] })
        expect(color('hsva(0, 0%, 100%, 2)')).toEqual({ model: 'hsv', format: 'hsv', alpha: 2, value: [0, 0, 100] })
        expect(color('hsva(    0,     0%, 100%, -1.3)')).toEqual({ model: 'hsv', format: 'hsv', alpha: -1.3, value: [0, 0, 100] })
    })

    test('hsb(0, 0%, 100%)', () => {
        expect(color('hsb(0, 0%, 100%)')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [0, 0, 100] })
        expect(color('hsb(0, 50%, 100%)')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [0, 50, 100] })
        expect(color('hsb(202, 100%, 37%)')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [202, 100, 37] })
        expect(color('hsb(370, 100%, 37%)')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [370, 100, 37] })
        expect(color('hsb(-370, 100%, 37%)')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [-370, 100, 37] })
        expect(color('hsb(0, 120%, -120%)')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [0, 120, -120] })
        expect(color('hsb(0.0001, 100.00%, 37.12345%)')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [0.0001, 100, 37.12345] })
        expect(color('hsb(0,0%,100%)')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [0, 0, 100] })
        expect(color('hsb(    0.0001,100.00%,37.12345%)')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [0.0001, 100, 37.12345] })
    })

    test('hsba(0, 0%, 100%, 1)', () => {
        expect(color('hsba(0, 0%, 100%, 1)')).toEqual({ model: 'hsv', format: 'hsb', alpha: 1, value: [0, 0, 100] })
        expect(color('hsba(0, 0%, 100%, 0.87)')).toEqual({ model: 'hsv', format: 'hsb', alpha: 0.87, value: [0, 0, 100] })
        expect(color('hsba(0, 0%, 100%, .87)')).toEqual({ model: 'hsv', format: 'hsb', alpha: 0.87, value: [0, 0, 100] })
        expect(color('hsba(0, 0%, 100%, .866667)')).toEqual({ model: 'hsv', format: 'hsb', alpha: 0.866667, value: [0, 0, 100] })
        expect(color('hsba(0, 0%, 100%, 2)')).toEqual({ model: 'hsv', format: 'hsb', alpha: 2, value: [0, 0, 100] })
        expect(color('      hsba(0, 0%, 100%, -1.3)      ')).toEqual({ model: 'hsv', format: 'hsb', alpha: -1.3, value: [0, 0, 100] })
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
            expect({ source: v, result: color(v) }).toEqual({ source: v, result: null })
        }
    })
})
