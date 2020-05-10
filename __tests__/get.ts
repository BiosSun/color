import Color, { ColorInfo } from '../src/index'

describe('get', () => {
    const rgb: ColorInfo = { model: 'rgb', format: 'hex', state: 'raw', alpha: undefined, value: [3, 121, 190] }
    const hsl: ColorInfo = { model: 'hsl', format: 'hsl', state: 'rounded', alpha: undefined, value: [202, 97, 38] }
    const hsv: ColorInfo = { model: 'hsv', format: 'hsb', state: 'normalized', alpha: undefined, value: [202, 98, 75] }

    test('channel (same model)', () => {
        expect(Color.get(rgb, 'red')).toBe(3)
        expect(Color.get(rgb, 'green')).toBe(121)
        expect(Color.get(rgb, 'blue')).toBe(190)

        expect(Color.get(hsl, 'hue')).toBe(202)
        expect(Color.get(hsv, 'hue')).toBe(202)

        expect(Color.get(hsl, 'saturationl')).toBe(97)
        expect(Color.get(hsl, 'lightness')).toBe(38)

        expect(Color.get(hsv, 'saturationv')).toBe(98)
        expect(Color.get(hsv, 'value')).toBe(75)
        expect(Color.get(hsv, 'brightness')).toBe(75)
    })

    test('channel (different model)', () => {
        expect(Color.get(rgb, 'hue')).toBe(202.1390374331551)
        expect(Color.get(rgb, 'saturationl')).toBe(96.89119170984458)
        expect(Color.get(rgb, 'lightness')).toBe(37.84313725490196)
        expect(Color.get(rgb, 'saturationv')).toBe(98.42105263157896)
        expect(Color.get(rgb, 'value')).toBe(74.50980392156863)
        expect(Color.get(rgb, 'brightness')).toBe(74.50980392156863)

        expect(Color.get(hsl, 'red')).toBe(3)
        expect(Color.get(hsl, 'green')).toBe(122)
        expect(Color.get(hsl, 'blue')).toBe(191)
        expect(Color.get(hsl, 'saturationv')).toBe(98)
        expect(Color.get(hsl, 'value')).toBe(75)
        expect(Color.get(hsl, 'brightness')).toBe(75)

        expect(Color.get(hsv, 'red')).toBe(4)
        expect(Color.get(hsv, 'green')).toBe(123)
        expect(Color.get(hsv, 'blue')).toBe(191)
        expect(Color.get(hsv, 'saturationl')).toBe(96)
        expect(Color.get(hsv, 'lightness')).toBe(38)
    })

    test('alpha', () => {
        expect(Color.get(rgb, 'alpha')).toBe(undefined)
        expect(Color.get({ ...rgb, alpha: 1 }, 'alpha')).toBe(1)
    })

    test('empty argument', () => {
        expect(Color.get(null, 'red')).toBe(undefined)
        expect(Color.get(undefined, 'red')).toBe(undefined)
    })
})
