export type RGBTuple = [number, number, number]
export type HSLTuple = [number, number, number]
export type HSVTuple = [number, number, number]

export type ColorProperty =
    | 'alpha'
    | 'red'
    | 'green'
    | 'blue'
    | 'hue'
    | 'saturationl'
    | 'saturationv'
    | 'lightness'
    | 'value'
    | 'brightness'

export const formatToModel: { [index in ColorFormat]: ColorModel } = {
    hex: 'rgb',
    abbr_hex: 'rgb',
    rgb: 'rgb',
    hsl: 'hsl',
    hsv: 'hsv',
    hsb: 'hsv',
}

export type ColorModel = 'rgb' | 'hsl' | 'hsv'
export type ColorFormat = 'hex' | 'abbr_hex' | 'rgb' | 'hsl' | 'hsv' | 'hsb'
export type ColorInfoState = 'raw' | 'rounded' | 'normalized'

export type ColorValue = RGBTuple | HSLTuple | HSVTuple

export interface ColorInfo {
    model: ColorModel
    format: ColorFormat
    state: ColorInfoState
    value: ColorValue
    alpha?: number
}
