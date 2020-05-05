import { ColorInfo, ColorProperty, ColorModel } from './types'
import convert from './convert'

export default function get(info: ColorInfo, prop: ColorProperty): number {
    if (info === null) {
        return undefined
    }

    return getWith[prop](info)
}

const getWith = {
    alpha(info: ColorInfo): number {
        return info.alpha
    },

    red: g('rgb', 0),
    green: g('rgb', 1),
    blue: g('rgb', 2),

    hue: g(['hsl', 'hsv'], 0),

    saturationl: g('hsl', 1),
    lightness: g('hsl', 2),

    saturationv: g('hsv', 1),
    value: g('hsv', 2),
    brightness: g('hsv', 2),
}

function g(model: ColorModel | ColorModel[], channel: number): (info: ColorInfo) => number {
    const models = Array.isArray(model) ? model : [model]

    return function (info) {
        const convertedInfo = models.includes(info.model) ? info : convert(info, models[0])
        return convertedInfo.value[channel]
    }
}
