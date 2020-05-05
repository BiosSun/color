import Color, { ColorInfo } from '../src/index'

describe('set', () => {
    const w_rgb: ColorInfo = { model: 'rgb', format: 'hex', state: 'raw', alpha: undefined, value: [255, 255, 255] }
    const w_hsl: ColorInfo = { model: 'hsl', format: 'hsl', state: 'rounded', alpha: undefined, value: [0, 0, 100] }
    const w_hsv: ColorInfo = { model: 'hsv', format: 'hsb', state: 'normalized', alpha: undefined, value: [0, 0, 100] }

    const b_rgb: ColorInfo = { model: 'rgb', format: 'hex', state: 'raw', alpha: undefined, value: [3, 121, 190] }
    const b_hsl: ColorInfo = { model: 'hsl', format: 'hsl', state: 'rounded', alpha: undefined, value: [202, 97, 38] }
    const b_hsv: ColorInfo = { model: 'hsv', format: 'hsb', state: 'normalized', alpha: undefined, value: [202, 98, 75] }

    test('red', () => {
        expect(Color.set(w_rgb, 'red', 10)).toEqual({ ...w_rgb, value: [10, 255, 255] })
        expect(Color.set(w_hsl, 'red', 10)).toEqual({ ...w_hsl, value: [180, 100, 52] })
        expect(Color.set(w_hsv, 'red', 10)).toEqual({ ...w_hsv, value: [180, 96, 100] })

        expect(Color.set(b_rgb, 'red', 10)).toEqual({ ...b_rgb, value: [10, 121, 190] })
        expect(Color.set(b_hsl, 'red', 10)).toEqual({ ...b_hsl, value: [203, 90, 39] })
        expect(Color.set(b_hsv, 'red', 10)).toEqual({ ...b_hsv, value: [203, 95, 75] })
    })

    test('green', () => {
        expect(Color.set(w_rgb, 'green', 10)).toEqual({ ...w_rgb, value: [255, 10, 255] })
        expect(Color.set(w_hsl, 'green', 10)).toEqual({ ...w_hsl, value: [300, 100, 52] })
        expect(Color.set(w_hsv, 'green', 10)).toEqual({ ...w_hsv, value: [300, 96, 100] })

        expect(Color.set(b_rgb, 'green', 10)).toEqual({ ...b_rgb, value: [3, 10, 190] })
        expect(Color.set(b_hsl, 'green', 10)).toEqual({ ...b_hsl, value: [238, 97, 38] })
        expect(Color.set(b_hsv, 'green', 10)).toEqual({ ...b_hsv, value: [238, 98, 75] })
    })

    test('blue', () => {
        expect(Color.set(w_rgb, 'blue', 10)).toEqual({ ...w_rgb, value: [255, 255, 10] })
        expect(Color.set(w_hsl, 'blue', 10)).toEqual({ ...w_hsl, value: [60, 100, 52] })
        expect(Color.set(w_hsv, 'blue', 10)).toEqual({ ...w_hsv, value: [60, 96, 100] })

        expect(Color.set(b_rgb, 'blue', 10)).toEqual({ ...b_rgb, value: [3, 121, 10] })
        expect(Color.set(b_hsl, 'blue', 10)).toEqual({ ...b_hsl, value: [124, 95, 25] })
        expect(Color.set(b_hsv, 'blue', 10)).toEqual({ ...b_hsv, value: [123, 97, 48] })
    })

    test('hue', () => {
        expect(Color.set(w_rgb, 'hue', 10)).toEqual({ ...w_rgb, value: [255, 255, 255] })
        expect(Color.set(w_hsl, 'hue', 10)).toEqual({ ...w_hsl, value: [10, 0, 100] })
        expect(Color.set(w_hsv, 'hue', 0)).toEqual({ ...w_hsv, value: [0, 0, 100] })

        expect(Color.set(b_rgb, 'hue', 10)).toEqual({ ...b_rgb, value: [190, 34.16666666666663, 2.999999999999967] })
        expect(Color.set(b_hsl, 'hue', 10)).toEqual({ ...b_hsl, value: [10, 97, 38] })
        expect(Color.set(b_hsv, 'hue', 10)).toEqual({ ...b_hsv, value: [10, 98, 75] })
    })

    test('saturationl', () => {
        expect(Color.set(w_rgb, 'saturationl', 10)).toEqual({ ...w_rgb, value: [255, 255, 255] })
        expect(Color.set(w_hsl, 'saturationl', 10)).toEqual({ ...w_hsl, value: [0, 10, 100] })
        expect(Color.set(w_hsv, 'saturationl', 100)).toEqual({ ...w_hsv, value: [0, 0, 100] })

        expect(Color.set(b_rgb, 'saturationl', 10)).toEqual({ ...b_rgb, value: [86.84999999999998, 99.02860962566844, 106.15] })
        expect(Color.set(b_hsl, 'saturationl', 10)).toEqual({ ...b_hsl, value: [202, 10, 38] })
        expect(Color.set(b_hsv, 'saturationl', 10)).toEqual({ ...b_hsv, value: [202, 18, 42] })
    })

    test('lightness', () => {
        expect(Color.set(w_rgb, 'lightness', 10)).toEqual({ ...w_rgb, value: [25.5, 25.5, 25.5] })
        expect(Color.set(w_hsl, 'lightness', 10)).toEqual({ ...w_hsl, value: [0, 0, 10] })
        expect(Color.set(w_hsv, 'lightness', 10)).toEqual({ ...w_hsv, value: [0, 0, 10] })

        expect(Color.set(b_rgb, 'lightness', 10)).toEqual({ ...b_rgb, value: [0.7927461139896317, 31.974093264248687, 50.20725388601037] })
        expect(Color.set(b_hsl, 'lightness', 10)).toEqual({ ...b_hsl, value: [202, 97, 10] })
        expect(Color.set(b_hsv, 'lightness', 10)).toEqual({ ...b_hsv, value: [202, 98, 20] })
    })

    test('saturationv', () => {
        expect(Color.set(w_rgb, 'saturationv', 10)).toEqual({ ...w_rgb, value: [255, 229.5, 229.5] })
        expect(Color.set(w_hsl, 'saturationv', 10)).toEqual({ ...w_hsl, value: [0, 100, 95] })
        expect(Color.set(w_hsv, 'saturationv', 10)).toEqual({ ...w_hsv, value: [0, 10, 100] })

        expect(Color.set(b_rgb, 'saturationv', 10)).toEqual({ ...b_rgb, value: [171, 182.98930481283423, 190] })
        expect(Color.set(b_hsl, 'saturationv', 10)).toEqual({ ...b_hsl, value: [202, 13, 71] })
        expect(Color.set(b_hsv, 'saturationv', 10)).toEqual({ ...b_hsv, value: [202, 10, 75] })
    })

    test('value', () => {
        expect(Color.set(w_rgb, 'value', 10)).toEqual({ ...w_rgb, value: [25.5, 25.5, 25.5] })
        expect(Color.set(w_hsl, 'value', 10)).toEqual({ ...w_hsl, value: [0, 0, 10] })
        expect(Color.set(w_hsv, 'value', 10)).toEqual({ ...w_hsv, value: [0, 0, 10] })

        expect(Color.set(b_rgb, 'value', 10)).toEqual({ ...b_rgb, value: [0.402631578947364, 16.239473684210544, 25.5] })
        expect(Color.set(b_hsl, 'value', 10)).toEqual({ ...b_hsl, value: [202, 96, 5] })
        expect(Color.set(b_hsv, 'value', 10)).toEqual({ ...b_hsv, value: [202, 98, 10] })
    })

    test('alpha', () => {
        expect(Color.set(w_rgb, 'alpha', 0.5)).toEqual({ ...w_rgb, alpha: 0.5 })
    })

    test('same value', () => {
        expect(Color.set(b_hsv, 'alpha', undefined)).toBe(b_hsv)
        expect(Color.set(b_hsv, 'red', 4)).toBe(b_hsv)
        expect(Color.set(b_hsv, 'hue', 202)).toBe(b_hsv)
    })

    test('empty argument', () => {
        expect(Color.set(null, 'red', 0)).toBe(null)
    })
})
