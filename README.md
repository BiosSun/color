# @biossun/color

提供颜色解析、转换及格式化功能。

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
import color from '@biossun/color'

color('#0ad')
// => { model: 'rgb', format: 'abbr_hex', value: [0, 170, 221], alpha: undefined }

color('#0379bedf')
// => { model: 'rgb', format: 'hex', value: [3, 121, 190], alpha: 0.8745098 }

color('rgba(3, 121, 190, .1'))
// => { model: 'rgb', format: 'rgb', value: [3, 121, 190], alpha: 0.1 }

color('hsla(202, 97%, 38%, .2'))
// => { model: 'hsl', format: 'hsl', value: [202, 97, 38], alpha: 0.2 }

color('hsba(202, 98%, 75%, .2'))
// => { model: 'hsv', format: 'hsb', value: [202, 98, 75], alpha: 0.3 }
```

## 转换

```javascript
import color from '@biossun/color'

const info = color('#0379bed')

color.convert(info, 'hsv')
// => { model: 'hsv', format: 'hsv', value: [202, 98, 75], alpha: undefined }

color.convert(info, 'hsv', 'hsb')
// => { model: 'hsv', format: 'hsb', value: [202, 98, 75], alpha: undefined }
```

## 格式化

```javascript
import color from '@biossun/color'

const info = color('#0379bed')

color.format(info)
// => '#0379bed'

color.format(info, 'rgb')
// => 'rgb(3, 121, 190)'

info.alpha = 1
color.format(info, 'rgb')
// => 'rgba(3, 121, 190, 1)'
```

## API

```typescript
// 色彩模式
export type ColorModel = 'rgb' | 'hsl' | 'hsv'

// 序列化格式
export type ColorFormat = 'hex' | 'abbr_hex' | 'rgb' | 'hsl' | 'hsv' | 'hsb'

// 颜色信息
export interface ColorInfo {
    model: ColorModel
    format: ColorFormat
    value: number[]
    alpha?: number
}

// 解析颜色字符串
color(str: string) => ColorInfo

// 转换颜色到指定模式（及格式），若 model 和 format 与 info 相同则直接返回，若 format 与 modal 不匹配则抛出异常
color.convert(info: ColorInfo, model: ColorModel, format?: ColorForamt = model) => ColorInfo

// 格式化颜色，默认按 info 中的格式处理，可以单独指定格式，内部会自动转换并格式化。
color.format(info: ColorInfo, format?: ColorFormat) => string
```
