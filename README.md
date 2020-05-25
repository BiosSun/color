# @biossun/color

提供颜色解析、转换及格式化等功能。（注：颜色对象是 **不可变的(immutable)**， 变更或转换颜色值后将返回一个新的颜色对象）

**支持格式：**

-   hex: `#fff`, `#ffff`, `#ffffff`, `#ffffffff`;
-   rgb: `rgb(255, 255, 255)`, `rgba(255, 255, 255, 1)`;
-   hsl: `hsl(0, 0%, 100%)`, `hsla(0, 0%, 100%, 1)`;
-   hsv/hsb: `hsv(0, 0%, 100%)`, `hsba(0, 0%, 100%, 1)`;
-   rgb (css4): `rgb(255 255 255)`, `rgba(255 255 255 / 1)`;
-   hsl (css4): `hsl(0 0% 100%)`, `hsla(0 0% 100% / 1)`;
-   hsv/hsb _(css4)_: `hsv(0 0% 100%)`, `hsba(0 0% 100% / 1)`;

## 安装

```bash
$ npm i @biossun/color
$ yarn add @biossun/color
```

## 解析

```javascript
import Color from '@biossun/color'

Color('#0ad')
Color('#0379bedf')
Color('rgba(3, 121, 190, .1'))
Color('hsla(202, 97%, 38%, .2'))
Color('hsba(202, 98%, 75%, .2'))
```

## 访问属性

```javascript
import Color from '@biossun/color'

const color = Color('#0379be')

color.alpha()
// => undefined

color.red()
// => 3

color.hue()
// => 202.1390374331551

color.get('saturationv')
// => 74.50980392156863
```

## 设置属性

```javascript
import Color from '@biossun/color'

const color = Color('#0379be')

color.alpha(0.1)
// alpha is 0.1 with new color

color.red(10)
// red is 10 with new color

color.set('hue', 10)
// hue is 10 with new color

color.set({ hue: 10, saturationv: 10 })
// hue is 10 and saturationv is 10 with new color
```

## 判断两个颜色是否相同

检测标准化后的两个颜色值是否是同一个颜色。

```javascript
import Color from '@biossun/color'

const color1 = Color('rgb(3, 122, 190)')
const color2 = Color('hsv(202, 98, 75)')

color1.isEqual(color2)
// => true

Color.isEqual(color1, color2)
// => true
```

## 判断颜色是亮色还是暗色

```javascript
Color('#fff').isLight()
// => true

Color('#000').isDark()
// => true
```

## 转换

```javascript
import Color from '@biossun/color'

const color = Color('#0379be')

color.rgb
// new rgb color

color.hsl
// new hsl color

color.hsv
// new hsv color

color.hsb
// new hsv color and format is hsb
```

## 格式化

```javascript
import Color from '@biossun/color'

const color = Color('#0379BE')

color.format()
// => '#0379be'

color.format('rgb')
// => 'rgb(3, 122, 190)'

color.red(3.1).format('rgb')
// => 'rgb(3.1, 121, 190)'

color.alpha(0.123).format('rgb')
// => 'rgba(3.1, 121, 190, 0.123)'
```

## 格式化（normalized）

```javascript
import Color from '@biossun/color'

const color = Color('#0379BE')

color.toString()
// => '#0379be'

color.toString('rgb')
// => 'rgb(3, 122, 190)'

color.red(3.1).format('rgb')
// => 'rgb(3, 121, 190)'

color.alpha(0.123).format('rgb')
// => 'rgba(3.1, 121, 190, 0.12)'
```

## API

```typescript
// 色彩模式
export type ColorModel =
    | 'rgb' | 'hsl' | 'hsv'

// 序列化格式
export type ColorFormat =
    | 'hex'      | 'abbr_hex'
    | 'rgb'      | 'hsl'      | 'hsv'      | 'hsb'
    | 'rgb_css4' | 'hsl_css4' | 'hsv_css4' | 'hsb_css4'

// 颜色属性
export type ColorProperty =
    | 'alpha'
    | 'red' | 'green' | 'blue'
    | 'hue' | 'saturationl' | 'saturationv' | 'lightness' | 'brightness'

// 颜色构造器
export default function colorFactory(value: string): Color

// 判断颜色是否相等
colorFactory.isEqual = (c1: Color, c2: Color) => boolean

// 颜色类
class Color {
    // 颜色转换
    // ---------------------------

    // 转换为 rgb 颜色模式
    get rgb(): Color

    // 转换为 hsl 颜色模式
    get hsl(): Color

    // 转换为 hsv 颜色模式
    get hsv(): Color

    // 转换为 hsv 颜色模式，hsb 格式
    get hsb(): Color

    // 获取/设置颜色属性
    // ---------------------------

    // 获取或设置透明度
    alpha(): number
    alpha(value: number): Color

    // 获取或设置红色（rgb）通道值
    red(): number
    red(value: number): Color

    // 获取或设置绿色（rgb）通道值
    green(): number
    green(value: number): Color

    // 获取或设置蓝色（rgb）通道值
    blue(): number
    blue(value: number): Color

    // 获取或设置色调（hsl/hsv）通道值
    hue(): number
    hue(value: number): Color

    // 获取或设置对比度（hsl）通道值
    saturationl(): number
    saturationl(value: number): Color

    // 获取或设置亮度（hsl）通道值
    lightness(): number
    lightness(value: number): Color

    // 获取或设置对比度（hsv）通道值
    saturationv(): number
    saturationv(value: number): Color

    // 获取或设置明度（hsv）通道值
    brightness(): number
    brightness(value: number): Color

    // 获取某个属性值
    get(prop: ColorProperty): number

    // 设置某个（或某几个）属性值
    set(prop: ColorProperty, value: number): Color
    set(props: Partial<Record<ColorProperty | 'alpha', number>>): Color

    // 判断
    // ---------------------------

    // 判断是否与当前颜色相等
    isEqual(otherColor: Color): boolean

    // 判断当前颜色是否是偏浅色的
    isLight(): boolean

    // 判断当前颜色是否是偏暗色的
    isDark(): boolean

    // 格式化
    // ---------------------------

    // 当各颜色值规范化
    // - 各通道值四舍五入为整数
    // - 透明度值四舍五入为两位小数
    // - 对于 hsl/hsv 颜色模式：
    //   - 色度为 360 时，转换为 0
    //   - 对比度为 0 时，色度转换为 0
    //   - 亮度/明度为 0 时，色度及对比度转换为 0
    // - 对于 hsl 颜色模式：
    //   - 亮度为 100 时，色度及对比度转换为 0
    normalize(): Color

    // 格式化颜色
    format(format: ColorFormat): string

    // 格式化颜色（基本与 format 相同，但在在转换成目标颜色模式之后，格式化为字符串之前，会将颜色值规范化处理）
    toString(format: ColorFormat): string
}
```
