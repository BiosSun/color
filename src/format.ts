import { ColorInfo, ColorFormat } from './types'
import { abbrHex, hex } from './utils'

export default function format(info: ColorInfo): string {
    return formater[info.format](info)
}

const abbr_hexs = new Set([
    0x00,
    0x11,
    0x22,
    0x33,
    0x44,
    0x55,
    0x66,
    0x77,
    0x88,
    0x99,
    0xaa,
    0xbb,
    0xcc,
    0xdd,
    0xee,
    0xff,
])

const formater = {
    'abbr-hex'(info: ColorInfo): string {
        const [r, g, b] = info.value

        if (!abbr_hexs.has(r) || !abbr_hexs.has(g) || !abbr_hexs.has(b)) {
            return this.hex(info)
        }

        const a = info.alpha !== undefined ? Math.round(info.alpha * 255) : undefined

        if (a !== undefined && !abbr_hexs.has(a)) {
            return this.hex(info)
        }

        let str = '#' + abbrHex(r) + abbrHex(g) + abbrHex(b)

        if (a !== undefined) {
            str += abbrHex(a)
        }

        return str
    },

    hex(info: ColorInfo): string {
        let str = '#' + hex(info.value[0]) + hex(info.value[1]) + hex(info.value[2])

        if (info.alpha !== undefined) {
            str += hex(Math.round(info.alpha * 255))
        }

        return str
    },

    rgb(info: ColorInfo): string {
        return info.alpha === undefined
            ? `rgb(${info.value[0]}, ${info.value[1]}, ${info.value[2]})`
            : `rgba(${info.value[0]}, ${info.value[1]}, ${info.value[2]}, ${info.alpha})`
    },

    hsl(info: ColorInfo): string {
        return info.alpha === undefined
            ? `hsl(${info.value[0]}, ${info.value[1]}%, ${info.value[2]}%)`
            : `hsla(${info.value[0]}, ${info.value[1]}%, ${info.value[2]}%, ${info.alpha})`
    },

    hsv(info: ColorInfo): string {
        return info.alpha === undefined
            ? `hsv(${info.value[0]}, ${info.value[1]}%, ${info.value[2]}%)`
            : `hsva(${info.value[0]}, ${info.value[1]}%, ${info.value[2]}%, ${info.alpha})`
    },

    hsb(info: ColorInfo): string {
        return info.alpha === undefined
            ? `hsb(${info.value[0]}, ${info.value[1]}%, ${info.value[2]}%)`
            : `hsba(${info.value[0]}, ${info.value[1]}%, ${info.value[2]}%, ${info.alpha})`
    },
}
