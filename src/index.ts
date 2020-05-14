import parse from './parse'
import { ColorInfo } from './types'

class Color {
    info: ColorInfo = null

    constructor(str: string) {
        this.info = parse(str)

        if (this.info === null) {
            throw new Error('')
        }
    }
}

export default function (val: string | Color): Color {
    if (val instanceof Color) {
        return val
    }

    return new Color(val)
}

export * from './types'
