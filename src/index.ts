import parse from './parse'
import normalize from './normalize'
import { ColorInfo } from './types'
import format from './format'
import convert from './convert'

export default function Color(str: string): ColorInfo {
    const info = parse(str)

    if (info) {
        normalize(info)
    }

    return info
}

Color.format = format
Color.convert = convert

export * from './types'
