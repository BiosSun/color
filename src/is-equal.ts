import { ColorInfo } from './types'
import convert from './convert'
import normalize from './normalize'

export default function isEqual(a: ColorInfo, b: ColorInfo): boolean {
    if (a === b) {
        return true
    }

    if (a === null || b === null) {
        return false
    }

    return compare(a, b)
}

function compare(a: ColorInfo, b: ColorInfo): boolean {
    if (a.model !== b.model) {
        // rgb(3, 122, 190) => hsv(202, 98, 75)
        // hsv(202, 98, 75) => rgb(4, 123, 191)
        return compare(a, convert(b, a.model)) || compare(convert(a, b.model), b)
    }

    a = normalize(a)
    b = normalize(b)

    if (a.alpha !== b.alpha) {
        return false
    }

    const avl = a.value.length
    const bvl = b.value.length

    if (avl !== bvl) {
        return false
    }

    for (let i = 0; i < avl; i++) {
        if (a.value[i] !== b.value[i]) {
            return false;
        }
    }

    return true;
}