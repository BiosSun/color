import parse from '../src/parse'

describe('parse', () => {
    test('hex', () => {
        expect(parse('#FFF')).toEqual({ model: 'rgb', format: 'abbr_hex', alpha: undefined, value: [255, 255, 255] })
        expect(parse('#0Ad')).toEqual({ model: 'rgb', format: 'abbr_hex', alpha: undefined, value: [0, 170, 221] })
        expect(parse('#000')).toEqual({ model: 'rgb', format: 'abbr_hex', alpha: undefined, value: [0, 0, 0] })

        expect(parse('#FFFF')).toEqual({ model: 'rgb', format: 'abbr_hex', alpha: 1, value: [255, 255, 255] })
        expect(parse('#FFFD')).toEqual({ model: 'rgb', format: 'abbr_hex', alpha: 0xdd / 255, value: [255, 255, 255] })
        expect(parse('#FFFd')).toEqual({ model: 'rgb', format: 'abbr_hex', alpha: 0xdd / 255, value: [255, 255, 255] })
        expect(parse('#FFF0')).toEqual({ model: 'rgb', format: 'abbr_hex', alpha: 0, value: [255, 255, 255] })

        expect(parse('#FFFFFF')).toEqual({ model: 'rgb', format: 'hex', alpha: undefined, value: [255, 255, 255] })
        expect(parse('#0077Bb')).toEqual({ model: 'rgb', format: 'hex', alpha: undefined, value: [0, 119, 187] })
        expect(parse('#037AbE')).toEqual({ model: 'rgb', format: 'hex', alpha: undefined, value: [3, 122, 190] })
        expect(parse('#000000')).toEqual({ model: 'rgb', format: 'hex', alpha: undefined, value: [0, 0, 0] })

        expect(parse('#FFFFFFFF')).toEqual({ model: 'rgb', format: 'hex', alpha: 1, value: [255, 255, 255] })
        expect(parse('#FFFFFFDD')).toEqual({ model: 'rgb', format: 'hex', alpha: 0xdd / 255, value: [255, 255, 255] })
        expect(parse('#FFFFFFDd')).toEqual({ model: 'rgb', format: 'hex', alpha: 0xdd / 255, value: [255, 255, 255] })
        expect(parse('#FFFFFF00')).toEqual({ model: 'rgb', format: 'hex', alpha: 0, value: [255, 255, 255] })
    })

    test('rgb', () => {
        expect(parse('rgb(255, 255, 255)')).toEqual({ model: 'rgb', format: 'rgb', alpha: undefined, value: [255, 255, 255] })
        expect(parse('rgb(0,   0,    0 )')).toEqual({ model: 'rgb', format: 'rgb', alpha: undefined, value: [0, 0, 0] })
        expect(parse('rgb(0,   119,  187 )')).toEqual({ model: 'rgb', format: 'rgb', alpha: undefined, value: [0, 119, 187] })
        expect(parse('rgb(.4,  0.5,  20.3)')).toEqual({ model: 'rgb', format: 'rgb', alpha: undefined, value: [0.4, 0.5, 20.3] })
        expect(parse('rgb(-.2, -100, 256 )')).toEqual({ model: 'rgb', format: 'rgb', alpha: undefined, value: [0, 0, 255] })
        expect(parse('rgb(100%, 50%, 0% )')).toEqual({ model: 'rgb', format: 'rgb', alpha: undefined, value: [255, 127.5, 0] })

        expect(parse('rgb(255, 255, 255, 1       )')).toEqual({ model: 'rgb', format: 'rgb', alpha: 1, value: [255, 255, 255] })
        expect(parse('rgb(255, 255, 255, 0.87    )')).toEqual({ model: 'rgb', format: 'rgb', alpha: 0.87, value: [255, 255, 255] })
        expect(parse('rgb(255, 255, 255, .87     )')).toEqual({ model: 'rgb', format: 'rgb', alpha: 0.87, value: [255, 255, 255] })
        expect(parse('rgb(255, 255, 255, 0.866667)')).toEqual({ model: 'rgb', format: 'rgb', alpha: 0.866667, value: [255, 255, 255] })
        expect(parse('rgba(255, 255, 255, 2       )')).toEqual({ model: 'rgb', format: 'rgb', alpha: 1, value: [255, 255, 255] })
        expect(parse('rgba(255, 255, 255, -1.3    )')).toEqual({ model: 'rgb', format: 'rgb', alpha: 0, value: [255, 255, 255] })
        expect(parse('rgba(255, 255, 255, 80%    )')).toEqual({ model: 'rgb', format: 'rgb', alpha: 0.8, value: [255, 255, 255] })

        expect(parse('rgb( 255 255 255    )')).toEqual({ model: 'rgb', format: 'rgb_css4', alpha: undefined, value: [255, 255, 255] })
        expect(parse('rgba(255 255 255    )')).toEqual({ model: 'rgb', format: 'rgb_css4', alpha: undefined, value: [255, 255, 255] })
        expect(parse('rgb( 255 255 255 / 1)')).toEqual({ model: 'rgb', format: 'rgb_css4', alpha: 1, value: [255, 255, 255] })
        expect(parse('rgba(255 255 255 / 1)')).toEqual({ model: 'rgb', format: 'rgb_css4', alpha: 1, value: [255, 255, 255] })
    })

    test('hsl/hsv/hsb', () => {
        expect(parse('hsl(0,      0%,     50%)')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [0, 0, 50] })
        expect(parse('hsl(0,      50%,    50%)')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [0, 50, 50] })
        expect(parse('hsl(360,    50%,    50%)')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [360, 50, 50] })
        expect(parse('hsl(360deg, 50%,    50%)')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [360, 50, 50] })

        expect(parse('hsl(202,    100%,   50% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 100, 50] })
        expect(parse('hsl(370,    100%,   50% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [10, 100, 50] })
        expect(parse('hsl(-370,   100%,   50% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [350, 100, 50] })
        expect(parse('hsl(20.01,  100%,   50% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [20.01, 100, 50] })

        expect(parse('hsl(202,    0.2%,   50% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 0.2, 50] })
        expect(parse('hsl(202,    .2%,    50% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 0.2, 50] })
        expect(parse('hsl(202,    .5%,    50% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 0.5, 50] })
        expect(parse('hsl(202,    -.5%,   50% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 0, 50] })
        expect(parse('hsl(202,    100.7%, 50% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 100, 50] })

        expect(parse('hsl(202,    100%,   0%    )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 100, 0] })
        expect(parse('hsl(202,    100%,   100%  )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 100, 100] })
        expect(parse('hsl(202,    100%,   50.4% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 100, 50.4] })
        expect(parse('hsl(202,    100%,   50.5% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 100, 50.5] })
        expect(parse('hsl(202,    100%,   .555% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 100, 0.555] })
        expect(parse('hsl(202,    100%,   -.5%  )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 100, 0] })
        expect(parse('hsl(202,    100%,   100.5%)')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [202, 100, 100] })

        expect(parse('hsl(0,      120%,   -120% )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [0, 100, 0] })
        expect(parse('hsl(0.001,  100.0%, 37.15%)')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [0.001, 100, 37.15] })
        expect(parse('hsl(0,      0%,     100%  )')).toEqual({ model: 'hsl', format: 'hsl', alpha: undefined, value: [0, 0, 100] })

        expect(parse('hsl( 0, 0%, 100%, 1       )')).toEqual({ model: 'hsl', format: 'hsl', alpha: 1, value: [0, 0, 100] })
        expect(parse('hsl( 0, 0%, 100%, 0.87    )')).toEqual({ model: 'hsl', format: 'hsl', alpha: 0.87, value: [0, 0, 100] })
        expect(parse('hsl( 0, 0%, 100%, .87     )')).toEqual({ model: 'hsl', format: 'hsl', alpha: 0.87, value: [0, 0, 100] })
        expect(parse('hsla(0, 0%, 100%, .866667 )')).toEqual({ model: 'hsl', format: 'hsl', alpha: 0.866667, value: [0, 0, 100] })
        expect(parse('hsla(0, 0%, 100%, 2       )')).toEqual({ model: 'hsl', format: 'hsl', alpha: 1, value: [0, 0, 100] })
        expect(parse('hsla(0, 0%, 100%, -1.3    )')).toEqual({ model: 'hsl', format: 'hsl', alpha: 0, value: [0, 0, 100] })
        expect(parse('hsla(0, 0%, 100%, 80%     )')).toEqual({ model: 'hsl', format: 'hsl', alpha: 0.8, value: [0, 0, 100] })

        expect(parse('hsl( 0 0% 50%      )')).toEqual({ model: 'hsl', format: 'hsl_css4', alpha: undefined, value: [0, 0, 50] })
        expect(parse('hsla(0 0% 50%      )')).toEqual({ model: 'hsl', format: 'hsl_css4', alpha: undefined, value: [0, 0, 50] })
        expect(parse('hsl( 0 0% 100% / 1 )')).toEqual({ model: 'hsl', format: 'hsl_css4', alpha: 1, value: [0, 0, 100] })
        expect(parse('hsla(0 0% 100% / 1 )')).toEqual({ model: 'hsl', format: 'hsl_css4', alpha: 1, value: [0, 0, 100] })

        expect(parse('hsv(0, 0%, 50%    )')).toEqual({ model: 'hsv', format: 'hsv', alpha: undefined, value: [0, 0, 50] })
        expect(parse('hsv(0, 0%, 50%, 1 )')).toEqual({ model: 'hsv', format: 'hsv', alpha: 1, value: [0, 0, 50] })
        expect(parse('hsv(0  0%  50%    )')).toEqual({ model: 'hsv', format: 'hsv_css4', alpha: undefined, value: [0, 0, 50] })
        expect(parse('hsv(0  0%  50% / 1)')).toEqual({ model: 'hsv', format: 'hsv_css4', alpha: 1, value: [0, 0, 50] })

        expect(parse('hsb(0, 0%, 50%    )')).toEqual({ model: 'hsv', format: 'hsb', alpha: undefined, value: [0, 0, 50] })
        expect(parse('hsb(0, 0%, 50%, 1 )')).toEqual({ model: 'hsv', format: 'hsb', alpha: 1, value: [0, 0, 50] })
        expect(parse('hsb(0  0%  50%    )')).toEqual({ model: 'hsv', format: 'hsb_css4', alpha: undefined, value: [0, 0, 50] })
        expect(parse('hsb(0  0%  50% / 1)')).toEqual({ model: 'hsv', format: 'hsb_css4', alpha: 1, value: [0, 0, 50] })
    })

    test('invalids', () => {
        const values = [
            1,
            '',
            '     ',
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
            'rgb(0, ., 0)',
            'rgb(+, 0, 0)',
            'rgb(-, 0, 0)',
            'rgb(0, 0, 0',
            'rgb(0, 0, 0, 0',
            'rgb(0%, 0, 0)',
            'rgb(0, 0%, 0)',
            'rgb(0, 0, 0%)',
            'rgb(0, 0 0)',
            'rgb(0 0 0 , 1)',
            'rgb(0, 0, 0 / 1)',
            'rgba',
            'rgba()',
            'rgba(,,,)',
            'rgba( , , , )',
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
            'hsl(0, 100%, 100%',
            'hsl(0, 100%, 100%, 0%',
            'hsl(0%, 100%, 100%)',
            'hsl(0, 100% 100%)',
            'hsl(0 100% 100% , 1)',
            'hsl(0, 100%, 100% / 1)',
            'hsla',
            'hsla()',
            'hsla(,,,)',
            'hsla( , , , )',
            'hsla(0, 0, 0, 0, 0)',
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
            'hsva(0, 0, 0, 0, 0)',
            'hsva(0, 100%, 100%, .)',
            'hsva(0, 100%, 100%, +)',
            'hsva(0, 100%, 100%, -.)',
            'hsva(0, 100%, 100%, .)',
            'hwb(0, 0%, 0%)',
            'cmyk(0, 0, 0, 0)',
        ]

        for (const v of values) {
            expect({ source: v, result: parse(v as string) }).toEqual({ source: v, result: null })
        }
    })
})
