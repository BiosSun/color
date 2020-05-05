import Color from '../src/index'

describe('parse', () => {
    test('#FFF', () => {
        expect(Color.parse('#FFF')).toEqual({ model: 'rgb', format: 'abbr_hex', state: 'raw', alpha: undefined, value: [255, 255, 255] })
        expect(Color.parse('#0Ad')).toEqual({ model: 'rgb', format: 'abbr_hex', state: 'raw', alpha: undefined, value: [0, 170, 221] })
        expect(Color.parse('#000')).toEqual({ model: 'rgb', format: 'abbr_hex', state: 'raw', alpha: undefined, value: [0, 0, 0] })
    })

    test('#FFFF', () => {
        expect(Color.parse('#FFFF')).toEqual({ model: 'rgb', format: 'abbr_hex', state: 'raw', alpha: 1, value: [255, 255, 255] })
        expect(Color.parse('#FFFD')).toEqual({ model: 'rgb', format: 'abbr_hex', state: 'raw', alpha: 0xdd / 255, value: [255, 255, 255] })
        expect(Color.parse('#FFFd')).toEqual({ model: 'rgb', format: 'abbr_hex', state: 'raw', alpha: 0xdd / 255, value: [255, 255, 255] })
        expect(Color.parse('#FFF0')).toEqual({ model: 'rgb', format: 'abbr_hex', state: 'raw', alpha: 0, value: [255, 255, 255] })
    })

    test('#FFFFFF', () => {
        expect(Color.parse('#FFFFFF')).toEqual({ model: 'rgb', format: 'hex', state: 'raw', alpha: undefined, value: [255, 255, 255] })
        expect(Color.parse('#0077Bb')).toEqual({ model: 'rgb', format: 'hex', state: 'raw', alpha: undefined, value: [0, 119, 187] })
        expect(Color.parse('#037AbE')).toEqual({ model: 'rgb', format: 'hex', state: 'raw', alpha: undefined, value: [3, 122, 190] })
        expect(Color.parse('#000000')).toEqual({ model: 'rgb', format: 'hex', state: 'raw', alpha: undefined, value: [0, 0, 0] })
    })

    test('#FFFFFFFF', () => {
        expect(Color.parse('#FFFFFFFF')).toEqual({ model: 'rgb', format: 'hex', state: 'raw', alpha: 1, value: [255, 255, 255] })
        expect(Color.parse('#FFFFFFDD')).toEqual({ model: 'rgb', format: 'hex', state: 'raw', alpha: 0xdd / 255, value: [255, 255, 255] })
        expect(Color.parse('#FFFFFFDd')).toEqual({ model: 'rgb', format: 'hex', state: 'raw', alpha: 0xdd / 255, value: [255, 255, 255] })
        expect(Color.parse('#FFFFFF00')).toEqual({ model: 'rgb', format: 'hex', state: 'raw', alpha: 0, value: [255, 255, 255] })
    })

    test('rgb(255, 255, 255)', () => {
        expect(Color.parse('rgb(255, 255,  255 )')).toEqual({ model: 'rgb', format: 'rgb', state: 'raw', alpha: undefined, value: [255, 255, 255] })
        expect(Color.parse('rgb(0,   119,  187 )')).toEqual({ model: 'rgb', format: 'rgb', state: 'raw', alpha: undefined, value: [0, 119, 187] })
        expect(Color.parse('rgb(0,   0,    0   )')).toEqual({ model: 'rgb', format: 'rgb', state: 'raw', alpha: undefined, value: [0, 0, 0] })
        expect(Color.parse('rgb(.4,  0.5,  20.3)')).toEqual({ model: 'rgb', format: 'rgb', state: 'raw', alpha: undefined, value: [0.4, 0.5, 20.3] })
        expect(Color.parse('rgb(-.2, -100, 256 )')).toEqual({ model: 'rgb', format: 'rgb', state: 'raw', alpha: undefined, value: [-0.2, -100, 256] })
    })

    test('rgba(255, 255, 255, 1)', () => {
        expect(Color.parse('rgba(255, 255, 255, 1       )')).toEqual({ model: 'rgb', format: 'rgb', state: 'raw', alpha: 1, value: [255, 255, 255] })
        expect(Color.parse('rgba(255, 255, 255, 0.87    )')).toEqual({ model: 'rgb', format: 'rgb', state: 'raw', alpha: 0.87, value: [255, 255, 255] })
        expect(Color.parse('rgba(255, 255, 255, .87     )')).toEqual({ model: 'rgb', format: 'rgb', state: 'raw', alpha: 0.87, value: [255, 255, 255] })
        expect(Color.parse('rgba(255, 255, 255, 0.866667)')).toEqual({ model: 'rgb', format: 'rgb', state: 'raw', alpha: 0.866667, value: [255, 255, 255] })
        expect(Color.parse('rgba(255, 255, 255, 2       )')).toEqual({ model: 'rgb', format: 'rgb', state: 'raw', alpha: 2, value: [255, 255, 255] })
        expect(Color.parse('rgba(255, 255, 255, -1.3    )')).toEqual({ model: 'rgb', format: 'rgb', state: 'raw', alpha: -1.3, value: [255, 255, 255] })
    })

    test('hsl(0, 0%, 100%)', () => {
        expect(Color.parse('hsl(0,     0%,     50%)')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: undefined, value: [0, 0, 50] })
        expect(Color.parse('hsl(0,     50%,    50%)')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: undefined, value: [0, 50, 50] })
        expect(Color.parse('hsl(360,   50%,    50%)')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: undefined, value: [360, 50, 50] })

        expect(Color.parse('hsl(202,   100%,   50% )')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: undefined, value: [202, 100, 50] })
        expect(Color.parse('hsl(370,   100%,   50% )')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: undefined, value: [370, 100, 50] })
        expect(Color.parse('hsl(-370,  100%,   50% )')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: undefined, value: [-370, 100, 50] })
        expect(Color.parse('hsl(20.01, 100%,   50% )')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: undefined, value: [20.01, 100, 50] })

        expect(Color.parse('hsl(202,   0.2%,   50% )')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: undefined, value: [202, 0.2, 50] })
        expect(Color.parse('hsl(202,   .2%,    50% )')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: undefined, value: [202, 0.2, 50] })
        expect(Color.parse('hsl(202,   .5%,    50% )')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: undefined, value: [202, 0.5, 50] })
        expect(Color.parse('hsl(202,   -.5%,   50% )')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: undefined, value: [202, -0.5, 50] })
        expect(Color.parse('hsl(202,   100.7%, 50% )')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: undefined, value: [202, 100.7, 50] })

        expect(Color.parse('hsl(202,   100%,   0%    )')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: undefined, value: [202, 100, 0] })
        expect(Color.parse('hsl(202,   100%,   100%  )')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: undefined, value: [202, 100, 100] })
        expect(Color.parse('hsl(202,   100%,   50.4% )')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: undefined, value: [202, 100, 50.4] })
        expect(Color.parse('hsl(202,   100%,   50.5% )')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: undefined, value: [202, 100, 50.5] })
        expect(Color.parse('hsl(202,   100%,   .555% )')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: undefined, value: [202, 100, 0.555] })
        expect(Color.parse('hsl(202,   100%,   -.5%  )')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: undefined, value: [202, 100, -0.5] })
        expect(Color.parse('hsl(202,   100%,   100.5%)')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: undefined, value: [202, 100, 100.5] })

        expect(Color.parse('hsl(0,     120%,   -120% )')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: undefined, value: [0, 120, -120] })
        expect(Color.parse('hsl(0.001, 100.0%, 37.15%)')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: undefined, value: [0.001, 100, 37.15] })
        expect(Color.parse('hsl(0,     0%,     100%)')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: undefined, value: [0, 0, 100] })
    })

    test('hsla(0, 0%, 100%, 1)', () => {
        expect(Color.parse('hsla(0, 0%, 100%, 1      )')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: 1, value: [0, 0, 100] })
        expect(Color.parse('hsla(0, 0%, 100%, 0.87   )')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: 0.87, value: [0, 0, 100] })
        expect(Color.parse('hsla(0, 0%, 100%, .87    )')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: 0.87, value: [0, 0, 100] })
        expect(Color.parse('hsla(0, 0%, 100%, .866667)')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: 0.866667, value: [0, 0, 100] })
        expect(Color.parse('hsla(0, 0%, 100%, 2      )')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: 2, value: [0, 0, 100] })
        expect(Color.parse('hsla(0, 0%, 100%, -1.3   )')).toEqual({ model: 'hsl', format: 'hsl', state: 'raw', alpha: -1.3, value: [0, 0, 100] })
    })

    test('hsv(0, 0%, 100%)', () => {
        expect(Color.parse('hsv(0,     0%,     50%)')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [0, 0, 50] })
        expect(Color.parse('hsv(0,     50%,    50%)')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [0, 50, 50] })
        expect(Color.parse('hsv(360,   50%,    50%)')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [360, 50, 50] })

        expect(Color.parse('hsv(202,   100%,   50% )')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [202, 100, 50] })
        expect(Color.parse('hsv(370,   100%,   50% )')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [370, 100, 50] })
        expect(Color.parse('hsv(-370,  100%,   50% )')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [-370, 100, 50] })
        expect(Color.parse('hsv(20.01, 100%,   50% )')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [20.01, 100, 50] })

        expect(Color.parse('hsv(202,   0.2%,   50% )')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [202, 0.2, 50] })
        expect(Color.parse('hsv(202,   .2%,    50% )')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [202, 0.2, 50] })
        expect(Color.parse('hsv(202,   .5%,    50% )')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [202, 0.5, 50] })
        expect(Color.parse('hsv(202,   -.5%,   50% )')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [202, -0.5, 50] })
        expect(Color.parse('hsv(202,   100.7%, 50% )')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [202, 100.7, 50] })

        expect(Color.parse('hsv(202,   100%,   0%    )')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [202, 100, 0] })
        expect(Color.parse('hsv(202,   100%,   100%  )')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [202, 100, 100] })
        expect(Color.parse('hsv(202,   100%,   50.4% )')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [202, 100, 50.4] })
        expect(Color.parse('hsv(202,   100%,   50.5% )')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [202, 100, 50.5] })
        expect(Color.parse('hsv(202,   100%,   .555% )')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [202, 100, 0.555] })
        expect(Color.parse('hsv(202,   100%,   -.5%  )')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [202, 100, -0.5] })
        expect(Color.parse('hsv(202,   100%,   100.5%)')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [202, 100, 100.5] })

        expect(Color.parse('hsv(0,     120%,   -120% )')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [0, 120, -120] })
        expect(Color.parse('hsv(0.001, 100.0%, 37.15%)')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [0.001, 100, 37.15] })
        expect(Color.parse('hsv(0,     0%,     100%)')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [0, 0, 100] })
    })

    test('hsva(0, 0%, 100%, 1)', () => {
        expect(Color.parse('hsva(0, 0%, 100%, 1      )')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: 1, value: [0, 0, 100] })
        expect(Color.parse('hsva(0, 0%, 100%, 0.87   )')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: 0.87, value: [0, 0, 100] })
        expect(Color.parse('hsva(0, 0%, 100%, .87    )')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: 0.87, value: [0, 0, 100] })
        expect(Color.parse('hsva(0, 0%, 100%, .866667)')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: 0.866667, value: [0, 0, 100] })
        expect(Color.parse('hsva(0, 0%, 100%, 2      )')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: 2, value: [0, 0, 100] })
        expect(Color.parse('hsva(0, 0%, 100%, -1.3   )')).toEqual({ model: 'hsv', format: 'hsv', state: 'raw', alpha: -1.3, value: [0, 0, 100] })
    })

    test('hsb(0, 0%, 100%)', () => {
        expect(Color.parse('hsb(0,     0%,     50%)')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: undefined, value: [0, 0, 50] })
        expect(Color.parse('hsb(0,     50%,    50%)')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: undefined, value: [0, 50, 50] })
        expect(Color.parse('hsb(360,   50%,    50%)')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: undefined, value: [360, 50, 50] })

        expect(Color.parse('hsb(202,   100%,   50% )')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: undefined, value: [202, 100, 50] })
        expect(Color.parse('hsb(370,   100%,   50% )')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: undefined, value: [370, 100, 50] })
        expect(Color.parse('hsb(-370,  100%,   50% )')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: undefined, value: [-370, 100, 50] })
        expect(Color.parse('hsb(20.01, 100%,   50% )')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: undefined, value: [20.01, 100, 50] })

        expect(Color.parse('hsb(202,   0.2%,   50% )')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: undefined, value: [202, 0.2, 50] })
        expect(Color.parse('hsb(202,   .2%,    50% )')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: undefined, value: [202, 0.2, 50] })
        expect(Color.parse('hsb(202,   .5%,    50% )')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: undefined, value: [202, 0.5, 50] })
        expect(Color.parse('hsb(202,   -.5%,   50% )')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: undefined, value: [202, -0.5, 50] })
        expect(Color.parse('hsb(202,   100.7%, 50% )')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: undefined, value: [202, 100.7, 50] })

        expect(Color.parse('hsb(202,   100%,   0%    )')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: undefined, value: [202, 100, 0] })
        expect(Color.parse('hsb(202,   100%,   100%  )')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: undefined, value: [202, 100, 100] })
        expect(Color.parse('hsb(202,   100%,   50.4% )')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: undefined, value: [202, 100, 50.4] })
        expect(Color.parse('hsb(202,   100%,   50.5% )')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: undefined, value: [202, 100, 50.5] })
        expect(Color.parse('hsb(202,   100%,   .555% )')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: undefined, value: [202, 100, 0.555] })
        expect(Color.parse('hsb(202,   100%,   -.5%  )')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: undefined, value: [202, 100, -0.5] })
        expect(Color.parse('hsb(202,   100%,   100.5%)')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: undefined, value: [202, 100, 100.5] })

        expect(Color.parse('hsb(0,     120%,   -120% )')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: undefined, value: [0, 120, -120] })
        expect(Color.parse('hsb(0.001, 100.0%, 37.15%)')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: undefined, value: [0.001, 100, 37.15] })
        expect(Color.parse('hsb(0,     0%,     100%)')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: undefined, value: [0, 0, 100] })
    })

    test('hsva(0, 0%, 100%, 1)', () => {
        expect(Color.parse('hsba(0, 0%, 100%, 1      )')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: 1, value: [0, 0, 100] })
        expect(Color.parse('hsba(0, 0%, 100%, 0.87   )')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: 0.87, value: [0, 0, 100] })
        expect(Color.parse('hsba(0, 0%, 100%, .87    )')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: 0.87, value: [0, 0, 100] })
        expect(Color.parse('hsba(0, 0%, 100%, .866667)')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: 0.866667, value: [0, 0, 100] })
        expect(Color.parse('hsba(0, 0%, 100%, 2      )')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: 2, value: [0, 0, 100] })
        expect(Color.parse('hsba(0, 0%, 100%, -1.3   )')).toEqual({ model: 'hsv', format: 'hsb', state: 'raw', alpha: -1.3, value: [0, 0, 100] })
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
            expect({ source: v, result: Color.parse(v) }).toEqual({ source: v, result: null })
        }
    })
})
