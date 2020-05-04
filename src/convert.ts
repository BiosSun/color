import * as colorConvert from 'color-convert'
import { ColorInfo, ColorModel, ColorFormat, formatToModel } from './types'

export default function convert(
    info: ColorInfo,
    model: ColorModel,
    format?: ColorFormat,
): ColorInfo {
    if (info === null) {
        return null
    }

    if (model === info.model) {
        if (format === undefined || format === info.format) {
            return info
        } else {
            return {
                ...info,
                format,
            }
        }
    }

    if (format === undefined) {
        format = model
    } else {
        if (formatToModel[format] !== model) {
            throw new Error(`invalid format '${format}' with model '${model}'.`)
        }
    }

    return {
        model: model,
        format: format,
        alpha: info.alpha,
        value: colorConvert[info.model][model](info.value),
    }
}
