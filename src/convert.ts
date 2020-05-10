import * as colorConvert from 'color-convert'
import { ColorInfo, ColorModel, ColorFormat, formatToModel } from './types'
import { isNil } from './utils'

export default function convert(
    info: ColorInfo,
    model: ColorModel,
    format?: ColorFormat,
): ColorInfo {
    if (isNil(info)) {
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

    let converter = colorConvert[info.model][model]

    if (info.state === 'raw') {
        converter = converter.raw
    }

    return {
        model: model,
        format: format,
        state: info.state,
        alpha: info.alpha,
        value: converter(info.value),
    }
}
