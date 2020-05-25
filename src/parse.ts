import { ColorInfo, ColorFormat, ColorModel } from './types'
import { clamp, round } from './utils'

export default function parse(str: string): ColorInfo {
    if (typeof str !== 'string') {
        return null
    }

    str = str.trim()

    if (str[0] === '#') {
        return parser.hex(str)
    } else if (str[0] === 'r' || str[0] === 'R') {
        return parser.rgb(str)
    } else if (str[0] === 'h' || str[0] === 'H') {
        if (str[1] === 's' || str[1] === 'S') {
            return parser.hslvb(str)
        } else {
            return null
        }
    } else {
        return null
    }
}

const r_hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i
const r_abbr_hex = /^#([a-f0-9]{3,4})$/i
const r_rgb = /^rgba?\(\s*([+-]?[\d\.]+)(%)?(?:\s*(,)\s*|\s+)([+-]?[\d\.]+)(%)?(?:\s*(,)\s*|\s+)([+-]?[\d\.]+)(%)?\s*(?:(,|\/)\s*([+-]?[\d\.]+)(%)?\s*)?\)$/i
const r_hslvb = /^hs[lvb]a?\(\s*([+-]?[\d\.]+)(?:deg)?(?:\s*(,)\s*|\s+)([+-]?[\d\.]+)%(?:\s*(,)\s*|\s+)([+-]?[\d\.]+)%\s*(?:(,|\/)\s*([+-]?[\d\.]+)(%)?\s*)?\)$/i

const parser = {
    hex(str: string): ColorInfo {
        let match: RegExpMatchArray

        let rhex: string
        let ghex: string
        let bhex: string
        let ahex: string

        let format: ColorFormat

        if ((match = str.match(r_hex))) {
            format = 'hex'
            const valueHex = match[1]
            rhex = valueHex.substring(0, 2)
            ghex = valueHex.substring(2, 4)
            bhex = valueHex.substring(4, 6)
            ahex = match[2]
        } else if ((match = str.match(r_abbr_hex))) {
            format = 'abbr_hex'
            const valueHex = match[1]
            rhex = valueHex[0] + valueHex[0]
            ghex = valueHex[1] + valueHex[1]
            bhex = valueHex[2] + valueHex[2]
            ahex = valueHex[3] ? valueHex[3] + valueHex[3] : undefined
        } else {
            return null
        }

        return {
            model: 'rgb',
            format,
            value: [parseInt(rhex, 16), parseInt(ghex, 16), parseInt(bhex, 16)],
            alpha: ahex ? parseInt(ahex, 16) / 255 : undefined,
        }
    },

    rgb(str: string): ColorInfo {
        const match = str.match(r_rgb)

        if (match === null) {
            return null
        }

        const srg = match[3]
        const sgb = match[6]

        if (srg !== sgb) {
            return null
        }

        const rp = match[2]
        const gp = match[5]
        const bp = match[8]

        if (rp !== gp || rp !== bp) {
            return null
        }

        let r = Number(match[1])
        let g = Number(match[4])
        let b = Number(match[7])

        if (isNaN(r) || isNaN(g) || isNaN(b)) {
            return null
        }

        if (rp) {
            r = (r / 100) * 255
            g = (g / 100) * 255
            b = (b / 100) * 255
        }

        r = clamp(r, 0, 255)
        g = clamp(g, 0, 255)
        b = clamp(b, 0, 255)

        const sba = match[9]

        let a: number = undefined

        if (sba) {
            a = Number(match[10])

            if (isNaN(a)) return null
            if (srg ? sba !== ',' : sba !== '/') return null

            // alpha percent symbol
            if (match[11]) {
                a = a / 100
            }

            a = clamp(a, 0, 1)
        }

        return {
            model: 'rgb',
            format: srg ? 'rgb' : 'rgb_css4',
            value: [r, g, b],
            alpha: a,
        }
    },

    hslvb(str: string): ColorInfo {
        const match = str.match(r_hslvb)

        if (match === null) {
            return null
        }

        const shs = match[2]
        const ssx = match[4]

        if (shs !== ssx) {
            return null
        }

        let h = Number(match[1])
        let s = Number(match[3])
        let x = Number(match[5])

        if (isNaN(h) || isNaN(s) || isNaN(x)) {
            return null
        }

        h = round(h, 360)
        s = clamp(s, 0, 100)
        x = clamp(x, 0, 100)

        const sxa = match[6]

        let a: number = undefined

        if (sxa) {
            a = Number(match[7])

            if (isNaN(a)) return null
            if (shs ? sxa !== ',' : sxa !== '/') return null

            // alpha percent symbol
            if (match[8]) {
                a = a / 100
            }

            a = clamp(a, 0, 1)
        }

        let format: ColorFormat =
            str[2] === 'l' || str[2] === 'L'
                ? 'hsl'
                : str[2] === 'v' || str[2] === 'V'
                ? 'hsv'
                : 'hsb'

        const model = (format[2] === 'b' ? 'hsv' : format) as ColorModel

        if (!shs) {
            format = (format + '_css4') as ColorFormat
        }

        return {
            model,
            format,
            value: [h, s, x],
            alpha: a,
        }
    },
}
