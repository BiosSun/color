import { ColorInfo, ColorValue } from './types'

export function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(min, num), max)
}

export function clampFn(min: number, max: number): (num: number) => number {
    return function (num) {
        return clamp(num, min, max)
    }
}

export function round(num: number, range: number): number {
    if (num > 0) {
        return num % range || range
    } else if (num === 0) {
        return 0
    } else {
        return ((num % range) + range) % range || 0
    }
}

export function roundFn(range: number): (num: number) => number {
    return function (num) {
        return round(num, range)
    }
}

export function hex(num: number): string {
    const hex = Math.round(num).toString(16)
    return hex.length < 2 ? `0${hex}` : hex
}

export function abbrHex(num: number): string {
    return num.toString(16)[0]
}
