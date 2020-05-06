import { ColorInfo, RGBTuple, HSLTuple, HSVTuple } from './types'
import { clamp, clampInt, roundInt } from './utils'
import round from './round'

export default function normalize(info: ColorInfo): ColorInfo {
    if (info === null) {
        return null
    }

    if (info.state === 'normalized') {
        return info
    }

    if (info.state === 'raw') {
        info = round(info)
    }

    return {
        model: info.model,
        format: info.format,
        state: 'normalized',
        alpha: info.alpha,
        value: normalizeValuesWith[info.model](info.value),
    }
}

normalize.alpha = round.alpha

normalize.red = round.red
normalize.green = round.green
normalize.blue = round.blue

normalize.hue = function (value: number, info: ColorInfo): number {
    value = round.hue(value)

    if (info === null) {
        return value
    }

    switch (info.model) {
        case 'hsl': {
            const s = round.saturationl(info.value[1])
            const l = round.lightness(info.value[2])

            return l === 0 || l === 100 || s === 0 ? 0 : value
        }
        case 'hsv': {
            const s = round.saturationv(info.value[1])
            const v = round.brightness(info.value[2])

            return v === 0 || s === 0 ? 0 : value
        }
    }
}

normalize.saturationl = function (value: number, info: ColorInfo): number {
    value = round.saturationl(value)

    if (info === null) {
        return value
    }

    const l = round.lightness(info.value[2])
    return l === 0 || l === 100 ? 0 : value
}

normalize.saturationv = function (value: number, info: ColorInfo): number {
    value = round.saturationv(value)

    if (info === null) {
        return value
    }

    const v = round.brightness(info.value[2])
    return v === 0 ? 0 : value
}

normalize.lightness = round.lightness
normalize.value = round.value
normalize.brightness = round.brightness

const normalizeValuesWith = {
    rgb([r, g, b]: RGBTuple): RGBTuple {
        return [r, g, b]
    },

    hsl(value: HSLTuple): HSLTuple {
        let h = value[0]
        let s = value[1]
        let l = value[2]

        if (l === 0 || l === 100) {
            s = 0
            h = 0
        } else if (s === 0) {
            h = 0
        }

        return [h, s, l]
    },

    hsv(value: HSVTuple): HSVTuple {
        let h = value[0]
        let s = value[1]
        let v = value[2]

        if (v === 0) {
            s = 0
            h = 0
        } else if (s === 0) {
            h = 0
        }

        return [h, s, v]
    },
}
