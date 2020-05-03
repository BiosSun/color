export function clamp(value, min, max) {
    return Math.min(Math.max(min, value), max)
}

export function round(value, range) {
    if (value >= 0) {
        return value % range
    } else {
        return (value % range) + range
    }
}
