import { ColorInfo, RGBTuple, HSLTuple, HSVTuple } from './types'
import { clampInt, clampIntFn, roundIntFn } from './utils'

export default function round(info: ColorInfo): ColorInfo {
    if (info === null) {
        return null
    }

    if (info.state === 'rounded' || info.state === 'normalized') {
        return info
    }

    return {
        model: info.model,
        format: info.format,
        state: 'rounded',
        alpha: round.alpha(info.alpha),
        value: roundValuesWith[info.model](info.value),
    }
}

round.alpha = function (value: number): number {
    if (value === undefined) {
        return undefined
    }

    return clampInt(value * 100, 0, 100) / 100
}

round.red = clampIntFn(0, 255)
round.green = clampIntFn(0, 255)
round.blue = clampIntFn(0, 255)

round.hue = roundIntFn(360)

round.saturationl = clampIntFn(0, 100)
round.lightness = clampIntFn(0, 100)

round.saturationv = clampIntFn(0, 100)
round.value = clampIntFn(0, 100)
round.brightness = clampIntFn(0, 100)

const roundValuesWith = {
    rgb(value: RGBTuple): RGBTuple {
        return [round.red(value[0]), round.green(value[1]), round.blue(value[2])]
    },

    hsl(value: HSLTuple): HSLTuple {
        return [round.hue(value[0]), round.saturationl(value[1]), round.lightness(value[2])]
    },

    hsv(value: HSVTuple): HSVTuple {
        return [round.hue(value[0]), round.saturationv(value[1]), round.value(value[2])]
    },
}
