import Color, { ColorInfo } from '../src/index'

describe('normalize', () => {
    const rgb_raw: ColorInfo = { model: 'rgb', format: 'rgb', state: 'raw', value: [0, 0.5, 256], alpha: 2 }
    const rgb_rounded: ColorInfo = { model: 'rgb', format: 'rgb', state: 'rounded', value: [0, 1, 255], alpha: 1 }
    const rgb_normalized: ColorInfo = { model: 'rgb', format: 'rgb', state: 'normalized', value: [0, 1, 255], alpha: 1 }

    const hsl_raw: ColorInfo = { model: 'hsl', format: 'hsl', state: 'raw', value: [370, 2.4, 101], alpha: 2 }
    const hsl_rounded: ColorInfo = { model: 'hsl', format: 'hsl', state: 'rounded', value: [10, 2, 100], alpha: 1 }
    const hsl_normalized: ColorInfo = { model: 'hsl', format: 'hsl', state: 'normalized', value: [0, 0, 100], alpha: 1 }

    const hsv_raw: ColorInfo = { model: 'hsv', format: 'hsv', state: 'raw', value: [370, 2.4, -10], alpha: 2 }
    const hsv_rounded: ColorInfo = { model: 'hsv', format: 'hsv', state: 'rounded', value: [10, 2, 0], alpha: 1 }
    const hsv_normalized: ColorInfo = { model: 'hsv', format: 'hsv', state: 'normalized', value: [0, 0, 0], alpha: 1 }

    describe('props', () => {
        test('hue', () => {
            expect(Color.normalize.hue(30, hsl_raw)).toBe(0)
            expect(Color.normalize.hue(30, { ...hsl_raw, value: [370, 2.4, 0] })).toBe(0)
            expect(Color.normalize.hue(30.8, { ...hsl_raw, value: [370, 2.4, 1] })).toBe(31)

            expect(Color.normalize.hue(30, hsv_raw)).toBe(0)
            expect(Color.normalize.hue(30, { ...hsv_raw, value: [370, 2.4, 100] })).toBe(30)
            expect(Color.normalize.hue(30.8, { ...hsv_raw, value: [370, 2.4, 1] })).toBe(31)
        })

        test('saturationl', () => {
            expect(Color.normalize.saturationl(30, hsl_raw)).toBe(0)
            expect(Color.normalize.saturationl(30, { ...hsl_raw, value: [370, 2.4, 0] })).toBe(0)
            expect(Color.normalize.saturationl(30.8, { ...hsl_raw, value: [370, 2.4, 1] })).toBe(31)
        })

        test('saturationv', () => {
            expect(Color.normalize.saturationv(30, hsv_raw)).toBe(0)
            expect(Color.normalize.saturationv(30, { ...hsv_raw, value: [370, 2.4, 30] })).toBe(30)
            expect(Color.normalize.saturationv(30.8, { ...hsv_raw, value: [370, 2.4, 1] })).toBe(31)
        })
    })

    describe('infos', () => {
        test('rgb', () => {
            expect(Color.normalize(rgb_raw)).toEqual(rgb_normalized)
            expect(Color.normalize(rgb_rounded)).toEqual(rgb_normalized)
            expect(Color.normalize(rgb_normalized)).toBe(rgb_normalized)
        })

        test('hsl', () => {
            expect(Color.normalize(hsl_raw)).toEqual(hsl_normalized)
            expect(Color.normalize(hsl_rounded)).toEqual(hsl_normalized)
            expect(Color.normalize(hsl_normalized)).toBe(hsl_normalized)

            expect(Color.normalize({ ...hsl_raw, value: [370, 2.4, 0] })).toEqual({ ...hsl_normalized, value: [0, 0, 0] })
            expect(Color.normalize({ ...hsl_raw, value: [370, 2.4, 1] })).toEqual({ ...hsl_normalized, value: [10, 2, 1] })
        })

        test('hsv', () => {
            expect(Color.normalize(hsv_raw)).toEqual(hsv_normalized)
            expect(Color.normalize(hsv_rounded)).toEqual(hsv_normalized)
            expect(Color.normalize(hsv_normalized)).toBe(hsv_normalized)

            expect(Color.normalize({ ...hsv_raw, value: [370, 2.4, 100] })).toEqual({ ...hsv_normalized, value: [10, 2, 100] })
            expect(Color.normalize({ ...hsv_raw, value: [370, 2.4, 1] })).toEqual({ ...hsv_normalized, value: [10, 2, 1] })
        })
    })
})
