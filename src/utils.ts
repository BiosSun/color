import { ColorInfo, ColorValue } from './types'

export function isNil(value: unknown): boolean {
    return value === null || value === undefined
}

export function clamp(num: number, min: number, max: number): number {
    const result = Math.min(Math.max(min, num), max)

    if (isNaN(result)) {
        return undefined
    }

    return result
}

export function clampInt(num: number, min: number, max: number): number {
    return clamp(Math.round(num), min, max)
}

export function clampIntFn(min: number, max: number): (num: number) => number {
    return function (num) {
        return clampInt(num, min, max)
    }
}

export function round(num: number, range: number): number {
    if (num < 0) {
        num %= range
    }

    // num maybe is -0
    const result = (num + range) % range

    if (isNaN(result)) {
        return undefined
    }

    return result
}

export function roundInt(num: number, range: number): number {
    return round(Math.round(num), range)
}

export function roundIntFn(range: number): (num: number) => number {
    return function (num) {
        return roundInt(num, range)
    }
}

export function hex(num: number): string {
    const hex = num.toString(16)
    return hex.length === 2 ? hex : hex.length < 2 ? `0${hex}` : hex.slice(-2)
}

export function abbrHex(num: number): string {
    const hex = num.toString(16)
    return hex[hex.length - 1]
}

export function createBuffer(info: ColorInfo): ColorInfo {
    return {
        model: info.model,
        format: info.format,
        state: info.state,
        alpha: info.alpha,
        value: [...info.value] as ColorValue,
    }
}
