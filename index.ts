import parse from './parse'
import normalize from './normalize'
import { ColorInfo } from './types'

export default function color(str: string): ColorInfo {
    const info = parse(str)

    if (info) {
        normalize(info)
    }

    return info
}

console.info(color('hsba(0, 0%, 100%, 1)'))