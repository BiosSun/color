import Color, { ColorInfo } from '../src/index'

const w_rgb: ColorInfo = { model: 'rgb', format: 'rgb', state: 'raw', alpha: undefined, value: [255, 255, 255] }
const w_hsv: ColorInfo = { model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [0, 0, 100] }

const b_rgb: ColorInfo = { model: 'rgb', format: 'rgb', state: 'raw', alpha: undefined, value: [0, 0, 0] }
const b_hsv: ColorInfo = { model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [0, 0, 0] }

const c_rgb: ColorInfo = { model: 'rgb', format: 'rgb', state: 'raw', alpha: undefined, value: [3, 122, 190] }
const c_hsv: ColorInfo = { model: 'hsv', format: 'hsv', state: 'raw', alpha: undefined, value: [202, 98, 75] }

test('is-equal', () => {
    // both is null
    expect(Color.isEqual(null, null)).toBe(true)

    // same color info
    expect(Color.isEqual(w_rgb, w_rgb)).toBe(true)
    expect(Color.isEqual(w_rgb, { ...w_rgb })).toBe(true)

    // same color, but diff format
    expect(Color.isEqual(w_rgb, { ...w_rgb, format: 'hex' })).toBe(true)

    // same color, but diff model
    expect(Color.isEqual(w_rgb, w_hsv)).toBe(true)
    expect(Color.isEqual(c_rgb, c_hsv)).toBe(true)

    // same color, but diff state
    expect(Color.isEqual({ ...b_hsv, state: 'rounded', value: [38, 100, 0] }, { ...b_rgb, state: 'raw', value: [-100, 0.2, -0.1] })).toBe(true)
    expect(Color.isEqual({ ...c_rgb, state: 'normalized', value: [3, 122, 190] }, { ...c_rgb, state: 'raw', value: [3.4, 121.9847, 190] })).toBe(true)

    // same alpha
    expect(Color.isEqual({ ...w_rgb, alpha: 0.001 }, { ...w_hsv, alpha: -100 })).toBe(true)

    // diff color
    expect(Color.isEqual(w_rgb, null)).toBe(false)
    expect(Color.isEqual(null, w_rgb)).toBe(false)

    expect(Color.isEqual(w_rgb, b_rgb)).toBe(false)
    expect(Color.isEqual(w_rgb, b_hsv)).toBe(false)

    expect(Color.isEqual({ ...w_rgb, alpha: undefined }, { ...w_rgb, alpha: 0 })).toBe(false)
})
