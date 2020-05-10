import Color from '../src/index'
import { ColorInfo } from '../src/types'

describe('convert', () => {
    // -----------------------------------------------------------------------------
    // rgb <==> hsl (3,121,190 -> 202,97,38 -> 3,122,191)
    // -----------------------------------------------------------------------------

    test('rgb => hsl', () => {
        const info: ColorInfo = { model: 'rgb', format: 'hex', state: 'normalized', alpha: undefined, value: [3, 121, 190] }

        expect(Color.convert(info, 'hsl')).toEqual({
            model: 'hsl',
            format: 'hsl',
            state: 'normalized',
            alpha: undefined,
            value: [202, 97, 38],
        })
    })

    test('hsl => rgb', () => {
        const info: ColorInfo = { model: 'hsl', format: 'hsl', state: 'normalized', alpha: undefined, value: [202, 97, 38] }

        expect(Color.convert(info, 'rgb')).toEqual({
            model: 'rgb',
            format: 'rgb',
            state: 'normalized',
            alpha: undefined,
            value: [3, 122, 191],
        })
    })

    // -----------------------------------------------------------------------------
    // rgb <==> hsv (3,121,190 -> 202,98,75 -> 4,123,191)
    // -----------------------------------------------------------------------------

    test('rgb => hsv', () => {
        const info: ColorInfo = { model: 'rgb', format: 'hex', state: 'normalized', alpha: undefined, value: [3, 121, 190] }

        expect(Color.convert(info, 'hsv')).toEqual({
            model: 'hsv',
            format: 'hsv',
            state: 'normalized',
            alpha: undefined,
            value: [202, 98, 75],
        })
    })

    test('hsv => rgb', () => {
        const info: ColorInfo = { model: 'hsv', format: 'hsb', state: 'normalized', alpha: undefined, value: [202, 98, 75] }

        expect(Color.convert(info, 'rgb')).toEqual({
            model: 'rgb',
            format: 'rgb',
            state: 'normalized',
            alpha: undefined,
            value: [4, 123, 191],
        })
    })

    // -----------------------------------------------------------------------------
    // hsl <==> hsv (202,97,38 -> 202,98,75 -> 202,96,38)
    // -----------------------------------------------------------------------------

    test('hsl => hsv', () => {
        const info: ColorInfo = { model: 'hsl', format: 'hsl', state: 'normalized', alpha: undefined, value: [202, 97, 38] }

        expect(Color.convert(info, 'hsv')).toEqual({
            model: 'hsv',
            format: 'hsv',
            state: 'normalized',
            alpha: undefined,
            value: [202, 98, 75],
        })
    })

    test('hsv => hsl', () => {
        const info: ColorInfo = { model: 'hsv', format: 'hsb', state: 'normalized', alpha: undefined, value: [202, 98, 75] }

        expect(Color.convert(info, 'hsl')).toEqual({
            model: 'hsl',
            format: 'hsl',
            state: 'normalized',
            alpha: undefined,
            value: [202, 96, 38],
        })
    })

    // -----------------------------------------------------------------------------
    // other
    // -----------------------------------------------------------------------------

    test('alpha', () => {
        const info: ColorInfo = { model: 'hsv', format: 'hsb', state: 'normalized', alpha: undefined, value: [202, 98, 75] }
        const result: ColorInfo = { model: 'hsl', format: 'hsl', state: 'normalized', alpha: undefined, value: [202, 96, 38] }

        expect(Color.convert({ ...info, alpha: 0 }, 'hsl')).toEqual({ ...result, alpha: 0 })
        expect(Color.convert({ ...info, alpha: 0.5 }, 'hsl')).toEqual({ ...result, alpha: 0.5 })
        expect(Color.convert({ ...info, alpha: 1 }, 'hsl')).toEqual({ ...result, alpha: 1 })
    })

    test('same model', () => {
        const info: ColorInfo = { model: 'hsv', format: 'hsb', state: 'normalized', alpha: undefined, value: [202, 98, 75] }
        expect(Color.convert(info, 'hsv')).toBe(info)
    })

    test('format', () => {
        const info: ColorInfo = { model: 'hsv', format: 'hsb', state: 'normalized', alpha: undefined, value: [202, 98, 75] }

        expect(Color.convert(info, 'hsv', 'hsb')).toBe(info)

        expect(Color.convert(info, 'hsv', 'hsv')).toEqual({ model: 'hsv', format: 'hsv', state: 'normalized', alpha: undefined, value: [202, 98, 75] })
        expect(Color.convert(info, 'rgb', 'hex')).toEqual({ model: 'rgb', format: 'hex', state: 'normalized', alpha: undefined, value: [4, 123, 191] })

        expect(() => Color.convert(info, 'rgb', 'hsv')).toThrow("invalid format 'hsv' with model 'rgb'.")
    })

    test('empty arguments', () => {
        expect(Color.convert(null, 'rgb')).toBe(null)
        expect(Color.convert(undefined, 'rgb')).toBe(null)
    })
})
