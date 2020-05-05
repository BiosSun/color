import parse from './parse'
import get from './get'
import set from './set'
import convert from './convert'
import format from './format'
import round from './round'
import normalize from './normalize'
import { ColorInfo } from './types'

export default function Color(str: string): ColorInfo {
    let info = parse(str)

    info = round(info)
    info = normalize(info)

    return info
}

Color.parse = parse
Color.get = get
Color.set = set
Color.convert = convert
Color.format = format
Color.round = round
Color.normalize = normalize

export * from './types'
