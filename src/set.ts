import { ColorInfo, ColorProperty, ColorModel } from './types'
import convert from './convert'
import { clampIntFn, createBuffer, roundIntFn } from './utils'
import round from './round'
import normalize from './normalize'

export default function set(info: ColorInfo, prop: ColorProperty, value: number): ColorInfo {
    if (info === null) {
        return null
    }

    return setWith[prop](info, prop, value)
}

const setWith = {
    alpha(info: ColorInfo, prop: ColorProperty, value: number): ColorInfo {
        if (value === info.alpha) {
            return info
        }

        return {
            ...info,
            alpha: value,
        }
    },

    red: s('rgb', 0),
    green: s('rgb', 1),
    blue: s('rgb', 2),

    hue: s(['hsv', 'hsl'], 0),

    saturationl: s('hsl', 1),
    lightness: s('hsl', 2),

    saturationv: s('hsv', 1),
    value: s('hsv', 2),
    brightness: s('hsv', 2),
}

function s(
    model: ColorModel | ColorModel[],
    channel: number,
): (info: ColorInfo, prop: ColorProperty, value: number) => ColorInfo {
    const models = Array.isArray(model) ? model : [model]

    return function (info, prop, value) {
        const convertedInfo = models.includes(info.model) ? info : convert(info, models[0])

        if (info.state === 'rounded') {
            value = round[prop](value)
        } else if (info.state === 'normalized') {
            value = normalize[prop](value, convertedInfo)
        }

        if (convertedInfo.value[channel] === value) {
            return info
        }

        const buffer = createBuffer(convertedInfo)
        buffer.value[channel] = value

        return convert(buffer, info.model, info.format)
    }
}

const b_hsv: ColorInfo = {
    model: 'hsv',
    format: 'hsb',
    state: 'normalized',
    alpha: undefined,
    value: [202, 98, 75],
}
