type HEXTuple = [number, number, number]
type HSLTuple = [number, number, number]
type RGBTuple = [number, number, number]
type HSVTuple = [number, number, number]
type HSBTuple = [number, number, number]

type ColorModel = 'rgb' | 'hsl' | 'hsv'
type ColorFormat = 'hex' | 'abbr-hex' | 'rgb' | 'hsl' | 'hsv' | 'hsb'
type ColorValue = HEXTuple | RGBTuple | HSLTuple | HSVTuple | HSBTuple

interface ColorInfo {
    model: ColorModel
    format: ColorFormat
    value: ColorValue
    alpha?: number
}

export default function color(str: string): ColorInfo {
    if (typeof str !== 'string') {
        return null
    }

    str = str?.trim() ?? ''

    if (str[0] === '#') {
        return parser.hex(str)
    } else if (str[0] === 'r' || str[0] === 'R') {
        return parser.rgb(str)
    } else if (str[0] === 'h' || str[0] === 'H') {
        return parser.hslvb(str)
    } else {
        return null
    }
}

const r_hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i
const r_abbr_hex = /^#([a-f0-9]{3,4})$/i
const r_rgb = /^rgba?\(\s*([+-]?[\d\.]+)\s*,\s*([+-]?[\d\.]+)\s*,\s*([+-]?[\d\.]+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i
const r_hslvb = /^hs[lvb]a?\(\s*([+-]?[\d\.]+)\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i

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
            format = 'abbr-hex'
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

        const hasAlpha = str[3] === 'a' || str[3] === 'A'
        const alpha = parseFloat(match[4])

        if (hasAlpha !== !isNaN(alpha)) {
            return null
        }

        const h = parseFloat(match[1])
        const s = parseFloat(match[2])
        const l = parseFloat(match[3])

        if (isNaN(h) || isNaN(s) || isNaN(l)) {
            return null
        }

        return {
            model: 'rgb',
            format: 'rgb',
            value: [h, s, l],
            alpha: hasAlpha ? alpha : undefined,
        }
    },

    hslvb(str: string): ColorInfo {
        const match = str.match(r_hslvb)

        if (match === null) {
            return null
        }

        const hasAlpha = str[3] === 'a' || str[3] === 'A'
        const alpha = parseFloat(match[4])

        if (hasAlpha !== !isNaN(alpha)) {
            return null
        }

        const h = parseFloat(match[1])
        const s = parseFloat(match[2])
        const l = parseFloat(match[3])

        if (isNaN(h) || isNaN(s) || isNaN(l)) {
            return null
        }

        const format =
            str[2] === 'l' || str[2] === 'L'
                ? 'hsl'
                : str[2] === 'v' || str[2] === 'V'
                ? 'hsv'
                : 'hsb'

        const model = (format[2] === 'b' ? 'hsv' : format) as ColorModel

        return {
            model,
            format,
            value: [h, s, l],
            alpha: hasAlpha ? alpha : undefined,
        }
    },
}
