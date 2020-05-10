import Color from '../src/index'
import { ColorInfo } from '../src/types'

describe('format', () => {
    test('abbr_hex', () => {
        const info: ColorInfo = { model: 'rgb', format: 'abbr_hex', state: 'normalized', alpha: undefined, value: [255, 255, 255] }

        expect(Color.format({ ...info, value: [255, 255, 255] })).toBe('#fff')
        expect(Color.format({ ...info, value: [0, 170, 221] })).toBe('#0ad')
        expect(Color.format({ ...info, value: [0, 0, 0] })).toBe('#000')

        // alpha
        expect(Color.format({ ...info, alpha: 1 })).toBe('#ffff')
        expect(Color.format({ ...info, alpha: 0.4 })).toBe('#fff6')
        expect(Color.format({ ...info, alpha: 0 })).toBe('#fff0')

        // 若色值无法格式化为简写格式，则自动转为普通格式
        expect(Color.format({ ...info, value: [3, 121, 190] })).toBe('#0379be')
        expect(Color.format({ ...info, alpha: 0.5 })).toBe('#ffffff80')

        // 若是 raw 状态的颜色值，则自动进行标准化处理
        expect(Color.format({ ...info, state: 'raw', value: [254.5, 255.4, 255.5], alpha: 1.1111 })).toBe('#ffff')
    })

    test('hex', () => {
        const info: ColorInfo = { model: 'rgb', format: 'hex', state: 'normalized', alpha: undefined, value: [255, 255, 255] }

        expect(Color.format({ ...info, value: [255, 255, 255] })).toBe('#ffffff')
        expect(Color.format({ ...info, value: [0, 170, 221] })).toBe('#00aadd')
        expect(Color.format({ ...info, value: [3, 121, 190] })).toBe('#0379be')
        expect(Color.format({ ...info, value: [0, 0, 0] })).toBe('#000000')

        // alpha
        expect(Color.format({ ...info, alpha: 1 })).toBe('#ffffffff')
        expect(Color.format({ ...info, alpha: 0.4 })).toBe('#ffffff66')
        expect(Color.format({ ...info, alpha: 0.5 })).toBe('#ffffff80')
        expect(Color.format({ ...info, alpha: 0 })).toBe('#ffffff00')

        // 若是 raw 状态的颜色值，则自动进行标准化处理
        expect(Color.format({ ...info, state: 'raw', value: [254.5, 255.4, 255.5], alpha: 1.1111 })).toBe('#ffffffff')
    })

    test('rgb', () => {
        const info: ColorInfo = { model: 'rgb', format: 'rgb', state: 'normalized', alpha: undefined, value: [255, 255, 255] }

        expect(Color.format({ ...info, value: [255, 255, 255] })).toBe('rgb(255, 255, 255)')
        expect(Color.format({ ...info, value: [0, 170, 221] })).toBe('rgb(0, 170, 221)')
        expect(Color.format({ ...info, value: [0, 0, 0] })).toBe('rgb(0, 0, 0)')

        // alpha
        expect(Color.format({ ...info, alpha: 1 })).toBe('rgba(255, 255, 255, 1)')
        expect(Color.format({ ...info, alpha: 0.5 })).toBe('rgba(255, 255, 255, 0.5)')
        expect(Color.format({ ...info, alpha: 0 })).toBe('rgba(255, 255, 255, 0)')
    })

    test('hsl', () => {
        const info: ColorInfo = { model: 'hsl', format: 'hsl', state: 'normalized', alpha: undefined, value: [0, 0, 100] }

        expect(Color.format({ ...info, value: [0, 0, 100] })).toBe('hsl(0, 0%, 100%)')
        expect(Color.format({ ...info, value: [202, 97, 38] })).toBe('hsl(202, 97%, 38%)')
        expect(Color.format({ ...info, value: [0, 0, 0] })).toBe('hsl(0, 0%, 0%)')

        // alpha
        expect(Color.format({ ...info, alpha: 1 })).toBe('hsla(0, 0%, 100%, 1)')
        expect(Color.format({ ...info, alpha: 0.5 })).toBe('hsla(0, 0%, 100%, 0.5)')
        expect(Color.format({ ...info, alpha: 0 })).toBe('hsla(0, 0%, 100%, 0)')
    })

    test('hsv', () => {
        const info: ColorInfo = { model: 'hsv', format: 'hsv', state: 'normalized', alpha: undefined, value: [0, 0, 100] }

        expect(Color.format({ ...info, value: [0, 0, 100] })).toBe('hsv(0, 0%, 100%)')
        expect(Color.format({ ...info, value: [202, 98, 75] })).toBe('hsv(202, 98%, 75%)')
        expect(Color.format({ ...info, value: [0, 0, 0] })).toBe('hsv(0, 0%, 0%)')

        // alpha
        expect(Color.format({ ...info, alpha: 1 })).toBe('hsva(0, 0%, 100%, 1)')
        expect(Color.format({ ...info, alpha: 0.5 })).toBe('hsva(0, 0%, 100%, 0.5)')
        expect(Color.format({ ...info, alpha: 0 })).toBe('hsva(0, 0%, 100%, 0)')
    })

    test('hsb', () => {
        const info: ColorInfo = { model: 'hsv', format: 'hsb', state: 'normalized', alpha: undefined, value: [0, 0, 100] }

        expect(Color.format({ ...info, value: [0, 0, 100] })).toBe('hsb(0, 0%, 100%)')
        expect(Color.format({ ...info, value: [202, 98, 75] })).toBe('hsb(202, 98%, 75%)')
        expect(Color.format({ ...info, value: [0, 0, 0] })).toBe('hsb(0, 0%, 0%)')

        // alpha
        expect(Color.format({ ...info, alpha: 1 })).toBe('hsba(0, 0%, 100%, 1)')
        expect(Color.format({ ...info, alpha: 0.5 })).toBe('hsba(0, 0%, 100%, 0.5)')
        expect(Color.format({ ...info, alpha: 0 })).toBe('hsba(0, 0%, 100%, 0)')
    })

    test('force format', () => {
        const info: ColorInfo = { model: 'hsv', format: 'hsb', state: 'normalized', alpha: undefined, value: [0, 0, 100] }

        expect(Color.format(info, 'rgb')).toBe('rgb(255, 255, 255)')
        expect(Color.format(info, 'abbr_hex')).toBe('#fff')
        expect(Color.format(info, 'hex')).toBe('#ffffff')

        // alpha
        expect(Color.format({ ...info, alpha: 1 }, 'rgb')).toBe('rgba(255, 255, 255, 1)')
        expect(Color.format({ ...info, alpha: 0.4 }, 'abbr_hex')).toBe('#fff6')
        expect(Color.format({ ...info, alpha: 0 }, 'hex')).toBe('#ffffff00')
    })

    test('empty arguments', () => {
        expect(Color.format(null, 'rgb')).toBe('')
        expect(Color.format(undefined, 'rgb')).toBe('')
    })
})
