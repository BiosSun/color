import * as colorConvert from 'color-convert'
import { ColorInfo, ColorModel, ColorFormat, formatToModel } from './types'

export default function convert(
    info: ColorInfo,
    model: ColorModel,
    format: ColorFormat = model,
): ColorInfo {
    if (info === null) {
        return null
    }

    if (formatToModel[format] !== model) {
        throw new Error(`invalid format '${format}' with model '${model}'.`)
    }

    if (model === info.model) {
        if (format === info.format) {
            return info
        } else {
            return {
                ...info,
                format,
            }
        }
    }

    return {
        model: model,
        format: format,
        alpha: info.alpha,
        value: colorConvert[info.model][model](info.value),
    }
}
