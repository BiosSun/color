export type RGBTuple = [number, number, number]
export type HSLTuple = [number, number, number]
export type HSVTuple = [number, number, number]

export type ColorModel = 'rgb' | 'hsl' | 'hsv'
export type ColorFormat = 'hex' | 'abbr_hex' | 'rgb' | 'hsl' | 'hsv' | 'hsb'
export type ColorValue = RGBTuple | HSLTuple | HSVTuple

export const formatToModel: { [index in ColorFormat]: ColorModel } = {
    hex: 'rgb',
    abbr_hex: 'rgb',
    rgb: 'rgb',
    hsl: 'hsl',
    hsv: 'hsv',
    hsb: 'hsv',
}

export interface ColorInfo {
    model: ColorModel
    format: ColorFormat
    value: ColorValue
    alpha?: number
}
