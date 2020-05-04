import color from '../src/index'
import { ColorInfo } from '../src/types'

describe('format', () => {
    test('abbr_hex', () => {
        const info = { model: 'rgb', format: 'abbr_hex', alpha: undefined, value: [255, 255, 255] } as ColorInfo

        expect(color.format({ ...info, value: [255, 255, 255] })).toBe('#fff')
        expect(color.format({ ...info, value: [0, 170, 221] })).toBe('#0ad')
        expect(color.format({ ...info, value: [0, 0, 0] })).toBe('#000')

        // alpha
        expect(color.format({ ...info, alpha: 1 })).toBe('#ffff')
        expect(color.format({ ...info, alpha: 0.4 })).toBe('#fff6')
        expect(color.format({ ...info, alpha: 0 })).toBe('#fff0')

        // 若色值无法格式化为简写格式，则自动转为普通格式
        expect(color.format({ ...info, value: [3, 121, 190] })).toBe('#0379be')
        expect(color.format({ ...info, alpha: 0.5 })).toBe('#ffffff80')
    })

    test('hex', () => {
        const info = { model: 'rgb', format: 'hex', alpha: undefined, value: [255, 255, 255] } as ColorInfo

        expect(color.format({ ...info, value: [255, 255, 255] })).toBe('#ffffff')
        expect(color.format({ ...info, value: [0, 170, 221] })).toBe('#00aadd')
        expect(color.format({ ...info, value: [3, 121, 190] })).toBe('#0379be')
        expect(color.format({ ...info, value: [0, 0, 0] })).toBe('#000000')

        // alpha
        expect(color.format({ ...info, alpha: 1 })).toBe('#ffffffff')
        expect(color.format({ ...info, alpha: 0.4 })).toBe('#ffffff66')
        expect(color.format({ ...info, alpha: 0.5 })).toBe('#ffffff80')
        expect(color.format({ ...info, alpha: 0 })).toBe('#ffffff00')
    })

    test('rgb', () => {
        const info = { model: 'rgb', format: 'rgb', alpha: undefined, value: [255, 255, 255] } as ColorInfo

        expect(color.format({ ...info, value: [255, 255, 255] })).toBe('rgb(255, 255, 255)')
        expect(color.format({ ...info, value: [0, 170, 221] })).toBe('rgb(0, 170, 221)')
        expect(color.format({ ...info, value: [0, 0, 0] })).toBe('rgb(0, 0, 0)')

        // alpha
        expect(color.format({ ...info, alpha: 1 })).toBe('rgba(255, 255, 255, 1)')
        expect(color.format({ ...info, alpha: 0.5 })).toBe('rgba(255, 255, 255, 0.5)')
        expect(color.format({ ...info, alpha: 0 })).toBe('rgba(255, 255, 255, 0)')
    })

    test('hsl', () => {
        const info = { model: 'hsl', format: 'hsl', alpha: undefined, value: [0, 0, 100] } as ColorInfo

        expect(color.format({ ...info, value: [0, 0, 100] })).toBe('hsl(0, 0%, 100%)')
        expect(color.format({ ...info, value: [202, 97, 38] })).toBe('hsl(202, 97%, 38%)')
        expect(color.format({ ...info, value: [0, 0, 0] })).toBe('hsl(0, 0%, 0%)')

        // alpha
        expect(color.format({ ...info, alpha: 1 })).toBe('hsla(0, 0%, 100%, 1)')
        expect(color.format({ ...info, alpha: 0.5 })).toBe('hsla(0, 0%, 100%, 0.5)')
        expect(color.format({ ...info, alpha: 0 })).toBe('hsla(0, 0%, 100%, 0)')
    })

    test('hsv', () => {
        const info = { model: 'hsv', format: 'hsv', alpha: undefined, value: [0, 0, 100] } as ColorInfo

        expect(color.format({ ...info, value: [0, 0, 100] })).toBe('hsv(0, 0%, 100%)')
        expect(color.format({ ...info, value: [202, 98, 75] })).toBe('hsv(202, 98%, 75%)')
        expect(color.format({ ...info, value: [0, 0, 0] })).toBe('hsv(0, 0%, 0%)')

        // alpha
        expect(color.format({ ...info, alpha: 1 })).toBe('hsva(0, 0%, 100%, 1)')
        expect(color.format({ ...info, alpha: 0.5 })).toBe('hsva(0, 0%, 100%, 0.5)')
        expect(color.format({ ...info, alpha: 0 })).toBe('hsva(0, 0%, 100%, 0)')
    })

    test('hsb', () => {
        const info = { model: 'hsv', format: 'hsb', alpha: undefined, value: [0, 0, 100] } as ColorInfo

        expect(color.format({ ...info, value: [0, 0, 100] })).toBe('hsb(0, 0%, 100%)')
        expect(color.format({ ...info, value: [202, 98, 75] })).toBe('hsb(202, 98%, 75%)')
        expect(color.format({ ...info, value: [0, 0, 0] })).toBe('hsb(0, 0%, 0%)')

        // alpha
        expect(color.format({ ...info, alpha: 1 })).toBe('hsba(0, 0%, 100%, 1)')
        expect(color.format({ ...info, alpha: 0.5 })).toBe('hsba(0, 0%, 100%, 0.5)')
        expect(color.format({ ...info, alpha: 0 })).toBe('hsba(0, 0%, 100%, 0)')
    })

    test('force format', () => {
        const info = { model: 'hsv', format: 'hsb', alpha: undefined, value: [0, 0, 100] } as ColorInfo

        expect(color.format(info, 'rgb')).toBe('rgb(255, 255, 255)')
        expect(color.format(info, 'abbr_hex')).toBe('#fff')
        expect(color.format(info, 'hex')).toBe('#ffffff')

        // alpha
        expect(color.format({ ...info, alpha: 1 }, 'rgb')).toBe('rgba(255, 255, 255, 1)')
        expect(color.format({ ...info, alpha: 0.4 }, 'abbr_hex')).toBe('#fff6')
        expect(color.format({ ...info, alpha: 0 }, 'hex')).toBe('#ffffff00')
    })

    test('empty arguments', () => {
        expect(color.format(null, 'rgb')).toBe('')
    })
})
