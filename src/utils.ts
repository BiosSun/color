export function clamp(num, min, max) {
    return Math.min(Math.max(min, num), max)
}

export function round(num, range) {
    if (num >= 0) {
        return num % range
    } else {
        return (num % range) + range
    }
}

export function hex(num) {
    const hex = num.toString(16)
    return hex.length < 2 ? `0${hex}` : hex
}

export function abbrHex(num) {
    return num.toString(16)[0]
}
