# @biossun/color

提供颜色解析、转换及格式化等功能。（注：颜色对象是 **不可变的(immutable)**， 变更或转换颜色值后将返回一个新的颜色对象）

**支持格式：**

-   hex: `#fff`, `#ffff`, `#ffffff`, `#ffffffff`;
-   rgb: `rgb(255, 255, 255)`, `rgba(255, 255, 255, 1)`;
-   hsl: `hsl(0, 0%, 100%)`, `hsla(0, 0%, 100%)`;
-   hsv/hsb: `hsv(0, 0%, 100%)`, `hsba(0, 0%, 100%)`;

## 安装

```bash
$ npm i @biossun/color
$ yarn add @biossun/color
```

## 解析

```javascript
import Color from '@biossun/color'

Color('#0ad')
// => { model: 'rgb', format: 'abbr_hex', state: 'normalized', value: [0, 170, 221], alpha: undefined }

Color('#0379bedf')
// => { model: 'rgb', format: 'hex', state: 'normalized', value: [3, 121, 190], alpha: 0.8745098 }

Color('rgba(3, 121, 190, .1'))
// => { model: 'rgb', format: 'rgb', state: 'normalized', value: [3, 121, 190], alpha: 0.1 }

Color('hsla(202, 97%, 38%, .2'))
// => { model: 'hsl', format: 'hsl', state: 'normalized', value: [202, 97, 38], alpha: 0.2 }

Color('hsba(202, 98%, 75%, .2'))
// => { model: 'hsv', format: 'hsb', state: 'normalized', value: [202, 98, 75], alpha: 0.3 }
```

## 解析（不进行标准化处理）

```javascript
import Color from '@biossun/color'

Color.parse('#0ad')
// => { model: 'rgb', format: 'abbr_hex', state: 'raw', value: [0, 170, 221], alpha: undefined }

Color.parse('#0379bedf')
// => { model: 'rgb', format: 'hex', state: 'raw', value: [3, 121, 190], alpha: 0.8745098 }

Color.parse('rgba(3, 121, 190, .1'))
// => { model: 'rgb', format: 'rgb', state: 'raw', value: [3, 121, 190], alpha: 0.1 }

Color.parse('hsla(202, 97%, 38%, .2'))
// => { model: 'hsl', format: 'hsl', state: 'raw', value: [202, 97, 38], alpha: 0.2 }

Color.parse('hsba(202, 98%, 75%, .2'))
// => { model: 'hsv', format: 'hsb', state: 'raw', value: [202, 98, 75], alpha: 0.3 }
```

## 标准化

```javascript
import Color from '@biossun/color'

let info = Color.parse('hsla(201.7, 98.43, 200, -1)')
// => { model: 'hsl', format: 'hsl', state: 'raw', value: [201.7, 98.43, 200], alpha: -1 }

info = Color.round(info)
// => { model: 'hsl', format: 'hsl', state: 'rounded', value: [202, 98, 100], alpha: 0 }

info = Color.normalize(info)
// => { model: 'hsl', format: 'hsl', state: 'normalized', value: [0, 0, 100], alpha: 0 }
```

## 访问属性

```javascript
import Color from '@biossun/color'

const info = Color('#0379be')

Color.get(info, 'alpha')
// => undefined

Color.get(info, 'red')
// => 3

Color.get(info, 'hue')
// => 202

Color.get(info, 'saturationv')
// => 75
```

## 设置属性

```javascript
import Color from '@biossun/color'

const info = Color('#0379be')

Color.set(info, 'alpha', 0.1)
// => { model: 'rgb', format: 'hex', value: [3, 121, 190], alpha: 0.1 }

Color.set(info, 'red', 10)
// => { model: 'rgb', format: 'hex', value: [10, 121, 190], alpha: undefined }

Color.set(info, 'hue', 10)
// => { model: 'rgb', format: 'hex', value: [191, 35, 4], alpha: undefined }

Color.set(info, 'saturationv', 10)
// => { model: 'rgb', format: 'hex', value: [172, 184, 191], alpha: undefined }
```

## 判断两个颜色是否相同

检测标准化后的两个颜色值是否是同一个颜色。

```javascript
import Color from '@biossun/color'

Color.isEqual(Color.parse('rgb(3, 122, 190)', Color.parse('hsv(202, 98, 75)')))
// => true
```

## 转换

```javascript
import Color from '@biossun/color'

const info = Color('#0379be')

Color.convert(info, 'hsv')
// => { model: 'hsv', format: 'hsv', value: [202, 98, 75], alpha: undefined }

Color.convert(info, 'hsv', 'hsb')
// => { model: 'hsv', format: 'hsb', value: [202, 98, 75], alpha: undefined }
```

## 格式化

```javascript
import Color from '@biossun/color'

const info = Color('#0379be')

Color.format(info)
// => '#0379be'

Color.format(info, 'rgb')
// => 'rgb(3, 121, 190)'

info.alpha = 1
Color.format(info, 'rgb')
// => 'rgba(3, 121, 190, 1)'
```

## API

```typescript
// 色彩模式
export type ColorModel = 'rgb' | 'hsl' | 'hsv'

// 序列化格式
export type ColorFormat = 'hex' | 'abbr_hex' | 'rgb' | 'hsl' | 'hsv' | 'hsb'

// 颜色属性
export type ColorProperty = 'alpha' | 'red' | 'green' | 'blue' | 'hue' | 'saturationl' | 'saturationv' | 'lightness' | 'value' | 'brightness'

// 颜色信息对象的处理状态
export type ColorInfoState = 'raw' | 'rounded' | 'normalized'

// 颜色信息
export interface ColorInfo {
    model: ColorModel
    format: ColorFormat
    state: ColorInfoState
    value: number[]
    alpha?: number
}

// 解析颜色字符串并标准化颜色值
Color(str: string) => ColorInfo

// 解析颜色字符串
Color.parse(str: string) => ColorInfo

// 将颜色的各通道值限定在标准区间内
Color.round(info: ColorInfo) => ColorInfo

// 将某些因受其它通道影响而不再起作用的通道的值转为该通道的初始值
// 如在 hsl 模式中，亮度为 0 或 100 时，无论色相及对比度是什么值，颜色一律为黑色或白色，此时该方法会将色相和对比度转为 0。
Color.normalize(info: ColorInfo) => ColorInfo

// 判断两个颜色是否相同
Color.isEqual(a: ColorInfo, b: ColorInfo) => string

// 获取颜色属性值
Color.get(info: ColorInfo, prop: ColorProperty): number

// 设置颜色属性值
// - 若所设置的值与当前颜色相同则返回原 info；
Color.set(info, ColorInfo, prop: ColorProperty, value: number): ColorInfo

// 转换颜色到指定模式（及格式）
// - 若 model 与 info 相同且 format 未指定或同样与 info 相同则返回原 info；
// - 若未指定 format 则默认与 model 相同；
// - 若指定的 format 与 modal 不匹配则抛出异常。
Color.convert(info: ColorInfo, model: ColorModel, format?: ColorForamt) => ColorInfo

// 格式化颜色
// - 默认按 info 中的格式处理；
// - 也可以明确指定输出格式。
Color.format(info: ColorInfo, format?: ColorFormat) => string
```
