import parse from './parse'
import normalize from './normalize'
import { ColorInfo } from './types'
import format from './format'

export default function color(str: string): ColorInfo {
    const info = parse(str)

    if (info) {
        normalize(info)
    }

    return info
}

color.format = format
