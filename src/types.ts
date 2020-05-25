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
    | 'brightness'

export type ColorChannelProperty = Exclude<ColorProperty, 'alpha'>

export type ColorChannelDescriptor = [
    // model
    ColorModel[],

    // channel index
    number,

    // round value
    (value: number) => number,
]

export type ColorModel = 'rgb' | 'hsl' | 'hsv'
export type ColorFormat =
    | 'abbr_hex'
    | 'hex'
    | 'rgb'
    | 'hsl'
    | 'hsv'
    | 'hsb'
    | 'rgb_css4'
    | 'hsl_css4'
    | 'hsv_css4'
    | 'hsb_css4'

export type ColorValue = RGBTuple | HSLTuple | HSVTuple

export interface ColorInfo {
    model: ColorModel
    format: ColorFormat
    value: ColorValue
    alpha?: number
}
