import * as colorConvert from 'color-convert'
import parse from './parse'
import { clamp, clampFn, roundFn, abbrHex, hex } from './utils'
import {
    RGBTuple,
    HSLTuple,
    HSVTuple,
    ColorValue,
    ColorModel,
    ColorFormat,
    ColorProperty,
    ColorChannelDescriptor,
    ColorChannelProperty,
    ColorInfo,
} from './types'

const formatToModel: { [index in ColorFormat]: ColorModel } = {
    hex: 'rgb',
    abbr_hex: 'rgb',
    rgb: 'rgb',
    hsl: 'hsl',
    hsv: 'hsv',
    hsb: 'hsv',
    rgb_css4: 'rgb',
    hsl_css4: 'hsl',
    hsv_css4: 'hsv',
    hsb_css4: 'hsv',
}

function isColorValue(val: any): val is ColorValue {
    return Array.isArray(val)
}

interface ColorConverter {
    rgb: Color
    hsl: Color
    hsv: Color
    hsb: Color
}

interface ColorGeterSeter {
    alpha(): number
    alpha(value: number): Color

    red(): number
    red(value: number): Color

    green(): number
    green(value: number): Color

    blue(): number
    blue(value: number): Color

    hue(): number
    hue(value: number): Color

    saturationl(): number
    saturationl(value: number): Color

    lightness(): number
    lightness(value: number): Color

    saturationv(): number
    saturationv(value: number): Color

    brightness(): number
    brightness(value: number): Color

    get(prop: ColorProperty): number

    set(prop: ColorProperty, value: number): Color
    set(props: Partial<Record<ColorProperty | 'alpha', number>>): Color
}

interface ColorChecker {
    isEqual(otherColor: Color): boolean
    isDark(): boolean
    isLight(): boolean
}

interface ColorFormater {
    round(): Color
    normalize(): Color
    format(format?: ColorFormat): string
    toString(format?: ColorFormat): string
}

interface Color extends ColorConverter, ColorGeterSeter, ColorChecker, ColorFormater {
    readonly info: ColorInfo
}

class ColorImpl implements Color {
    $m: ColorModel
    $f: ColorFormat
    $a: number
    $v: ColorValue

    constructor(v: ColorValue, a: number, m: ColorModel, f: ColorFormat) {
        this.$m = m
        this.$f = f
        this.$a = a
        this.$v = v
    }

    private $convert(model: ColorModel, format?: ColorFormat): ColorImpl {
        if (format === undefined) {
            format = model === this.$m ? this.$f : model
        } else {
            if (formatToModel[format] !== model) {
                throw new Error(`invalid format '${format}' with model '${model}'.`)
            }
        }

        if (model !== this.$m) {
            const converter = colorConvert[this.$m][model].raw
            this.$v = converter(this.$v)
        }

        this.$m = model
        this.$f = format

        return this
    }

    private $get(models: ColorModel[], channel: number) {
        const isSameModel = models.includes(this.$m)
        const color = isSameModel ? this : this[models[0]]
        return color.$v[channel]
    }

    private $set(
        models: ColorModel[],
        channel: number,
        round: (value: number) => number,
        value: number,
    ) {
        if (value === undefined) {
            throw new Error('invalid value.')
        }

        const isSameModel = models.includes(this.$m)

        if (!isSameModel) {
            this.$convert(models[0])
        }

        this.$v[channel] = round(value)

        return this
    }

    private $round(isNormalize: Boolean): ColorImpl {
        const { $m, $a, $v } = this

        if ($a !== undefined) {
            this.$a = Math.round($a * 100) / 100
        }

        switch ($m) {
            case 'rgb':
                $v[0] = Math.round($v[0])
                $v[1] = Math.round($v[1])
                $v[2] = Math.round($v[2])
                break
            case 'hsl': {
                let h = Math.round($v[0])
                let s = Math.round($v[1])
                let l = Math.round($v[2])

                if (isNormalize) {
                    if (l === 0 || l === 100) {
                        s = 0
                        h = 0
                    } else if (s === 0) {
                        h = 0
                    } else if (h === 360) {
                        h = 0
                    }
                }

                this.$v = [h, s, l]
                break
            }
            case 'hsv': {
                let h = Math.round($v[0])
                let s = Math.round($v[1])
                let v = Math.round($v[2])

                if (isNormalize) {
                    if (v === 0) {
                        s = 0
                        h = 0
                    } else if (s === 0) {
                        h = 0
                    } else if (h === 360) {
                        h = 0
                    }
                }

                this.$v = [h, s, v]
                break
            }
        }

        return this
    }

    private $format(): string {
        return formater[this.$f](this.$v, this.$a)
    }

    private clone(): ColorImpl {
        return new ColorImpl([...this.$v] as ColorValue, this.$a, this.$m, this.$f)
    }

    get info(): ColorInfo {
        return {
            format: this.$f,
            model: this.$m,
            value: this.$v,
            alpha: this.$a,
        }
    }

    get rgb(): ColorImpl {
        return this.clone().$convert('rgb')
    }

    get hsl(): ColorImpl {
        return this.clone().$convert('hsl')
    }

    get hsv(): ColorImpl {
        return this.clone().$convert('hsv')
    }

    get hsb(): ColorImpl {
        return this.clone().$convert('hsv', 'hsb')
    }

    isEqual(otherColor: ColorImpl): boolean {
        return ColorImpl.isEqual(this, otherColor)
    }

    round(): ColorImpl {
        return this.clone().$round(false)
    }

    normalize(): ColorImpl {
        return this.clone().$round(true)
    }

    format(format = this.$f): string {
        // diff `toString`, don't normalize
        return this.clone().$convert(formatToModel[format], format).$format()
    }

    toString(format = this.$f): string {
        let color = this.clone().$convert(formatToModel[format], format)

        if (format !== 'hex' && format !== 'abbr_hex') {
            color = color.$round(true)
        }

        return color.$format()
    }

    static isEqual(a: ColorImpl, b: ColorImpl): boolean {
        const aIsNil = a === undefined || a === null
        const bIsNil = b === undefined || b === null

        if (aIsNil && bIsNil) {
            return true
        }

        if (aIsNil || bIsNil) {
            return false
        }

        return ColorImpl.compare(a, b)
    }

    private static compare(a: ColorImpl, b: ColorImpl): boolean {
        if (a.$m !== b.$m) {
            // rgb(3, 122, 190) => hsv(202, 98, 75)
            // hsv(202, 98, 75) => rgb(4, 123, 191)
            return ColorImpl.compare(a, b[a.$m]) || ColorImpl.compare(a[b.$m], b)
        }

        a = a.normalize()
        b = b.normalize()

        if (a.$a !== b.$a) {
            return false
        }

        const avl = a.$v.length
        const bvl = b.$v.length

        if (avl !== bvl) {
            return false
        }

        for (let i = 0; i < avl; i++) {
            if (a.$v[i] !== b.$v[i]) {
                return false
            }
        }

        return true
    }

    /**
     * @see {@link https://thoughtbot.com/blog/closer-look-color-lightness A Closer Look at Color Lightness}
     */
    isDark() {
        return !this.isLight()
    }

    /**
     * @see {@link https://thoughtbot.com/blog/closer-look-color-lightness A Closer Look at Color Lightness}
     */
    isLight() {
        const [r, g, b] = this.rgb.$v
        const lightness = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255
        return lightness > 0.6
    }
}

// NOTE
interface ColorImpl extends ColorGeterSeter {}

const CHANNEL_PROPERTY_DESCRIPTORS = new Map<ColorChannelProperty, ColorChannelDescriptor>()
    .set('red', [['rgb'], 0, clampFn(0, 255)])
    .set('green', [['rgb'], 1, clampFn(0, 255)])
    .set('blue', [['rgb'], 2, clampFn(0, 255)])
    .set('hue', [['hsl', 'hsv'], 0, roundFn(360)])
    .set('saturationl', [['hsl'], 1, clampFn(0, 100)])
    .set('lightness', [['hsl'], 2, clampFn(0, 100)])
    .set('saturationv', [['hsv'], 1, clampFn(0, 100)])
    .set('brightness', [['hsv'], 2, clampFn(0, 100)])

Object.assign(ColorImpl.prototype, {
    alpha(value?: any) {
        // get
        if (arguments.length === 0) {
            return this.$a
        }
        // set
        else {
            const color = this.clone()
            color.$a = value !== undefined ? clamp(value, 0, 1) : undefined
            return color
        }
    },

    red: getset(CHANNEL_PROPERTY_DESCRIPTORS.get('red')),
    green: getset(CHANNEL_PROPERTY_DESCRIPTORS.get('green')),
    blue: getset(CHANNEL_PROPERTY_DESCRIPTORS.get('blue')),
    hue: getset(CHANNEL_PROPERTY_DESCRIPTORS.get('hue')),
    saturationl: getset(CHANNEL_PROPERTY_DESCRIPTORS.get('saturationl')),
    lightness: getset(CHANNEL_PROPERTY_DESCRIPTORS.get('lightness')),
    saturationv: getset(CHANNEL_PROPERTY_DESCRIPTORS.get('saturationv')),
    brightness: getset(CHANNEL_PROPERTY_DESCRIPTORS.get('brightness')),

    get(prop: ColorProperty): number {
        return this[prop]()
    },

    set(
        props: ColorProperty | Partial<Record<ColorProperty | 'alpha', number>>,
        value?: number,
    ): ColorImpl {
        if (typeof props === 'string') {
            return this[props](value)
        } else {
            let color = this.clone()

            if ('alpha' in props) {
                color.$a = props.alpha !== undefined ? clamp(props.alpha, 0, 1) : undefined
            }

            CHANNEL_PROPERTY_DESCRIPTORS.forEach((descriptor, prop) => {
                if (!(prop in props)) {
                    return
                }

                const [models, channel, round] = descriptor
                const value = props[prop]

                color.$set(models, channel, round, value)
            })

            return color.$convert(this.$m, this.$f)
        }
    },
})

function getset([models, channel, round]: ColorChannelDescriptor) {
    return function (...args: [] | [number]): number | ColorImpl {
        if (args.length === 0) {
            return this.$get(models, channel)
        } else {
            return this.clone().$set(models, channel, round, args[0]).$convert(this.$m, this.$f)
        }
    }
}

const ABBR_HEXS = new Set([
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
    abbr_hex(v: RGBTuple, a: number): string {
        const r = Math.round(v[0])
        const g = Math.round(v[1])
        const b = Math.round(v[2])

        if (!ABBR_HEXS.has(r) || !ABBR_HEXS.has(g) || !ABBR_HEXS.has(b)) {
            return formater.hex(v, a)
        }

        let str = '#' + abbrHex(r) + abbrHex(g) + abbrHex(b)

        let av: number
        if (a !== undefined && (av = Math.round(a * 255)) !== 255) {
            if (!ABBR_HEXS.has(av)) {
                return formater.hex(v, a)
            }

            str += abbrHex(av)
        }

        return str
    },

    hex([r, g, b]: RGBTuple, a: number): string {
        let str = `#${hex(r)}${hex(g)}${hex(b)}`

        let av: number
        if (a !== undefined && (av = Math.round(a * 255)) !== 255) {
            str += hex(av)
        }

        return str
    },

    rgb([r, g, b]: RGBTuple, a: number): string {
        const na = a === undefined || a === 1
        return `rgb${na ? '' : 'a'}(${r}, ${g}, ${b}${na ? '' : `, ${a}`})`
    },

    rgb_css4([r, g, b]: RGBTuple, a: number): string {
        return `rgb(${r} ${g} ${b}${a === undefined || a === 1 ? '' : ` / ${a}`})`
    },

    hsl(v: HSLTuple, a: number): string {
        return hslvb('l', v, a)
    },

    hsl_css4(v: HSLTuple, a: number): string {
        return hslvb_css4('l', v, a)
    },

    hsv(v: HSLTuple, a: number): string {
        return hslvb('v', v, a)
    },

    hsv_css4(v: HSLTuple, a: number): string {
        return hslvb_css4('v', v, a)
    },

    hsb(v: HSLTuple, a: number): string {
        return hslvb('b', v, a)
    },

    hsb_css4(v: HSLTuple, a: number): string {
        return hslvb_css4('b', v, a)
    },
}

function hslvb(key: string, [h, s, x]: HSLTuple | HSVTuple, a: number): string {
    const na = a === undefined || a === 1
    return `hs${key}${na ? '' : 'a'}(${h}, ${s}%, ${x}%${na ? '' : `, ${a}`})`
}

function hslvb_css4(key: string, [h, s, x]: HSLTuple | HSVTuple, a: number): string {
    return `hs${key}(${h} ${s}% ${x}%${a === undefined || a === 1 ? '' : ` / ${a}`})`
}

function Color(value: string): Color
function Color(value: Color): Color
function Color(value: ColorValue, alpha: number, model: ColorModel, format: ColorFormat): Color
function Color(v: any, a?: any, m?: any, f?: any): Color {
    if (typeof v === 'string') {
        const info = parse(v)

        if (info === null) {
            throw new Error(`invalid color: ${v}`)
        }

        return new ColorImpl(info.value, info.alpha, info.model, info.format)
    } else if (isColorValue(v)) {
        return new ColorImpl(v, a, m, f)
    } else if (v instanceof ColorImpl) {
        return new ColorImpl(v.$v, v.$a, v.$m, v.$f)
    } else {
        throw new Error('failed to build color instance.')
    }
}

Color.isEqual = ColorImpl.isEqual as (c1: Color, c2: Color) => boolean

export default Color
export * from './types'
