export type HEXTuple = [number, number, number]
export type HSLTuple = [number, number, number]
export type RGBTuple = [number, number, number]
export type HSVTuple = [number, number, number]
export type HSBTuple = [number, number, number]

export type ColorModel = 'rgb' | 'hsl' | 'hsv'
export type ColorFormat = 'hex' | 'abbr-hex' | 'rgb' | 'hsl' | 'hsv' | 'hsb'
export type ColorValue = HEXTuple | RGBTuple | HSLTuple | HSVTuple | HSBTuple

export interface ColorInfo {
    model: ColorModel
    format: ColorFormat
    value: ColorValue
    alpha?: number
}

