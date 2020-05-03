import { ColorInfo, RGBTuple, HSLTuple, HSVTuple } from './types'
import { clamp, round } from './utils'

export default function normalize(info: ColorInfo): void {
    info.alpha = info.alpha !== undefined ? clamp(info.alpha, 0, 1) : undefined
    info.value = normalizear[info.model](info.value)
}

const normalizear = {
    rgb(value: RGBTuple): RGBTuple {
        return [
            clamp(Math.round(value[0]), 0, 255),
            clamp(Math.round(value[1]), 0, 255),
            clamp(Math.round(value[2]), 0, 255),
        ]
    },

    hsl(value: HSLTuple): HSLTuple {
        const h = round(Math.round(value[0]), 360)
        const l = clamp(Math.round(value[2]), 0, 100)
        const s = l > 0 && l < 100 ? clamp(Math.round(value[1]), 0, 100) : 0

        return [h, s, l]
    },

    hsv(value: HSVTuple): HSVTuple {
        const h = round(Math.round(value[0]), 360)
        const v = clamp(Math.round(value[2]), 0, 100)
        const s = v > 0 ? clamp(Math.round(value[1]), 0, 100) : 0

        return [h, s, v]
    },
}
