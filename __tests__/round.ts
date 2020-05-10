import Color, { ColorInfo } from '../src/index'

describe('round', () => {
    describe('props', () => {
        const suites: { [prop: string]: [number, number][] } = {}

        suites.red = suites.green = suites.blue = [
            [0, 0],
            [128, 128],
            [255, 255],

            [-0, 0],
            [-1, 0],
            [256, 255],

            [0.4, 0],
            [0.5, 1],
            [255.1, 255],
            [-0.1, 0],

            [undefined, undefined],
        ]

        suites.hue = [
            [0, 0],
            [180, 180],
            [359, 359],
            [360, 360],
            [720, 360],

            [-0, 0],
            [-1, 359],
            [-359, 1],
            [-360, 0],
            [-361, 359],
            [-720, 0],

            [0.1, 0],
            [0.4, 0],
            [0.5, 1],
            [359.4, 359],
            [359.5, 360],
            [719.5, 360],

            [-0.1, 0],
            [-0.4, 0],
            [-0.51, 359],
            [-359.4, 1],
            [-359.51, 0],
            [-719.51, 0],

            [undefined, undefined],
        ]

        suites.saturationl = suites.lightness = suites.saturationv = suites.value = suites.brightness = [
            [0, 0],
            [50, 50],
            [100, 100],

            [-0, 0],
            [-1, 0],
            [101, 100],

            [0.4, 0],
            [0.5, 1],
            [100.1, 100],
            [-0.1, 0],

            [undefined, undefined],
        ]

        suites.alpha = [
            [0, 0],
            [0.5, 0.5],
            [0.55, 0.55],
            [1, 1],

            [-0, 0],
            [-0.1, 0],
            [1.01, 1],

            [0.554, 0.55],
            [0.555, 0.56],

            [undefined, undefined],
        ]

        Object.keys(suites).forEach((prop) => {
            const suite = suites[prop]

            test(`round.${prop}`, () => {
                suite.forEach(([input, output]) => {
                    expect(Color.round[prop](input)).toBe(output)
                })
            })
        })
    })

    describe('infos', () => {
        const rgb_raw: ColorInfo = { model: 'rgb', format: 'rgb', state: 'raw', value: [0, 0.5, 256], alpha: 2 }
        const rgb_rounded: ColorInfo = { model: 'rgb', format: 'rgb', state: 'rounded', value: [0, 1, 255], alpha: 1 }
        const rgb_normalized: ColorInfo = { model: 'rgb', format: 'rgb', state: 'normalized', value: [0, 1, 255], alpha: 1 }

        const hsl_raw: ColorInfo = { model: 'hsl', format: 'hsl', state: 'raw', value: [0, 0.5, 101], alpha: 2 }
        const hsl_rounded: ColorInfo = { model: 'hsl', format: 'hsl', state: 'rounded', value: [0, 1, 100], alpha: 1 }
        const hsl_normalized: ColorInfo = { model: 'hsl', format: 'hsl', state: 'normalized', value: [0, 1, 100], alpha: 1 }

        const hsv_raw: ColorInfo = { model: 'hsv', format: 'hsv', state: 'raw', value: [0, 0.5, 101], alpha: 2 }
        const hsv_rounded: ColorInfo = { model: 'hsv', format: 'hsv', state: 'rounded', value: [0, 1, 100], alpha: 1 }
        const hsv_normalized: ColorInfo = { model: 'hsv', format: 'hsv', state: 'normalized', value: [0, 1, 100], alpha: 1 }

        test('rgb', () => {
            expect(Color.round(rgb_raw)).toEqual(rgb_rounded)
        })

        test('hsl', () => {
            expect(Color.round(hsl_raw)).toEqual(hsl_rounded)
        })

        test('hsv', () => {
            expect(Color.round(hsv_raw)).toEqual(hsv_rounded)
        })

        test('others', () => {
            expect(Color.round(null)).toBe(null)
            expect(Color.round(undefined)).toBe(null)

            expect(Color.round(rgb_rounded)).toBe(rgb_rounded)
            expect(Color.round(rgb_normalized)).toBe(rgb_normalized)

            expect(Color.round(hsl_rounded)).toBe(hsl_rounded)
            expect(Color.round(hsl_normalized)).toBe(hsl_normalized)

            expect(Color.round(hsv_rounded)).toBe(hsv_rounded)
            expect(Color.round(hsv_normalized)).toBe(hsv_normalized)
        })
    })
})
