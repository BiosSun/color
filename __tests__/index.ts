import Color from '../src/index'

// const color = Color('rgb(3, 121, 190)')
// const otherColor = Color('hsv(202, 98, 75)')

describe('Color', () => {
    test('constructor', () => {
        const c1 = Color('rgb(3, 121, 190)')
        const c2 = Color(c1)
        const c3 = Color([3, 121, 190], undefined, 'rgb', 'rgb')

        expect(c1).toEqual({ $m: 'rgb', $f: 'rgb', $a: undefined, $v: [3, 121, 190] })
        expect(c2).toEqual({ $m: 'rgb', $f: 'rgb', $a: undefined, $v: [3, 121, 190] })
        expect(c3).toEqual({ $m: 'rgb', $f: 'rgb', $a: undefined, $v: [3, 121, 190] })

        expect(c1).not.toBe(c2)

        expect(() => Color('rgb')).toThrowError('invalid color: rgb')
        expect(() => Color({} as string)).toThrowError('failed to build color instance.')
    })

    test('convert', () => {
        const c1 = Color('rgb(3 121 190 / 20%)')
        const c2 = Color('hsv(202, 98%, 75%, .2)')

        expect(c1.rgb).toEqual({ $m: 'rgb', $f: 'rgb_css4', $a: 0.2, $v: [3, 121, 190] })
        expect(c1.hsl).toEqual({ $m: 'hsl', $f: 'hsl', $a: 0.2, $v: [202.1390374331551, 96.89119170984458, 37.84313725490196] })
        expect(c1.hsv).toEqual({ $m: 'hsv', $f: 'hsv', $a: 0.2, $v: [202.13903743315504, 98.42105263157896, 74.50980392156863] })
        expect(c1.hsb).toEqual({ $m: 'hsv', $f: 'hsb', $a: 0.2, $v: [202.13903743315504, 98.42105263157896, 74.50980392156863] })

        expect(c1.rgb).not.toBe(c1)

        expect(() => c1.$convert('hsl', 'hsb')).toThrowError(`invalid format 'hsb' with model 'hsl'.`)
    })

    test('get', () => {
        const c1 = Color('rgb(3 121 190 / 20%)')

        expect(c1.alpha()).toBe(0.2)

        expect(c1.red()).toBe(3)
        expect(c1.green()).toBe(121)
        expect(c1.blue()).toBe(190)
        expect(c1.hue()).toBe(202.1390374331551)
        expect(c1.saturationl()).toBe(96.89119170984458)
        expect(c1.lightness()).toBe(37.84313725490196)
        expect(c1.saturationv()).toBe(98.42105263157896)
        expect(c1.brightness()).toBe(74.50980392156863)

        expect(c1.get('alpha')).toBe(0.2)
        expect(c1.get('red')).toBe(3)
        expect(c1.get('hue')).toBe(202.1390374331551)
    })

    describe('set', () => {
        const c1 = Color('rgb(3 121 190 / 20%)')

        test('alpha', () => {
            expect(c1.alpha(undefined).alpha()).toBe(undefined)
            expect(c1.alpha(-0.3).alpha()).toBe(0)
            expect(c1.alpha(0).alpha()).toBe(0)
            expect(c1.alpha(0.4).alpha()).toBe(0.4)
            expect(c1.alpha(0.5).alpha()).toBe(0.5)
            expect(c1.alpha(1).alpha()).toBe(1)
            expect(c1.alpha(2).alpha()).toBe(1)

            expect(c1.alpha(2)).not.toBe(c1)
        })

        const props = [
            ['red', 255],
            ['green', 255],
            ['blue', 255],
            ['saturationl', 100],
            ['lightness', 100],
            ['saturationv', 100],
            ['brightness', 100],
        ]

        props.forEach(([prop, max]: [string, number]) => {
            test(prop, () => {
                expect(() => c1[prop](undefined)).toThrowError('invalid value.')
                expect(c1[prop](-1)[prop]()).toBe(0)
                expect(c1[prop](0)[prop]()).toBe(0)
                expect(c1[prop](50)[prop]()).toEqual(50)
                expect(c1[prop](max)[prop]()).toBe(max)
                expect(c1[prop](max + 0.5)[prop]()).toBe(max)
            })
        })

        test('hue', () => {
            expect(() => c1.hue(undefined)).toThrowError('invalid value.')
            expect(c1.hue(0).hue()).toBe(0)
            expect(c1.hue(-10).hue()).toBe(350)
            expect(c1.hue(-360).hue()).toBe(0)
            expect(c1.hue(-720).hue()).toBe(0)
            expect(c1.hue(-180).hue()).toBe(180)
            expect(c1.hue(360).hue()).toBe(0)
            expect(c1.hue(540).hue()).toBe(180)
            expect(c1.hue(720).hue()).toBe(0)
            expect(c1.hue(720)).not.toBe(c1)
        })

        test('set', () => {
            expect(c1.set('alpha', undefined).alpha()).toBe(undefined)
            expect(c1.set('alpha', 0.4).alpha()).toBe(0.4)
            expect(c1.set('alpha', 1.2).alpha()).toBe(1)

            expect(() => c1.set('red', undefined).red()).toThrowError('invalid value.')
            expect(c1.set('red', 0.4).red()).toBe(0.4)
            expect(c1.set('red', 1.2).red()).toBe(1.2)
            expect(c1.set('red', 256).red()).toBe(255)

            expect(
                c1.set({
                    alpha: 1,
                    red: 200,
                    brightness: 50,
                }),
            ).toEqual({ $m: 'rgb', $f: 'rgb_css4', $a: 1, $v: [127.5, 77.1375, 121.12500000000006] })

            expect(c1.set('red', 256)).not.toBe(c1)
            expect(c1.set({ red: 256 })).not.toBe(c1)
        })
    })

    test('isEqual', () => {
        const c1 = Color('rgb(3, 121, 190)')
        const c2 = Color('hsv(202, 98%, 75%)')
        const c3 = Color('hsv(202, 98%, 75%, 20%)')

        expect(c1.isEqual(c2)).toBe(true)
        expect(c1.isEqual(c3)).toBe(false)

        expect(Color.isEqual(c1, c2)).toBe(true)
        expect(Color.isEqual(c1, c3)).toBe(false)
        expect(Color.isEqual(c1, null)).toBe(false)
        expect(Color.isEqual(null, null)).toBe(true)
    })

    test('format', () => {
        expect(Color('#FFF').format()).toBe('#fff')
        expect(Color('#FFFF').format()).toBe('#fff')
        expect(Color('#FFFA').format()).toBe('#fffa')
        expect(Color('#FFFA').red(3.2).format()).toBe('#03ffffaa')
        expect(Color('#FFFA').alpha(0.1).format()).toBe('#ffffff1a')

        expect(Color('#FFFFFF').format()).toBe('#ffffff')
        expect(Color('#FFFFFFFF').format()).toBe('#ffffff')
        expect(Color('#FFFFFFAA').format()).toBe('#ffffffaa')
        expect(Color('#FFFFFFAA').red(3.2).alpha(0.1).format()).toBe('#03ffff1a')

        expect(Color('rgb(3, 121, 190)').format()).toBe('rgb(3, 121, 190)')
        expect(Color('rgb(3, 121, 190, 1)').format()).toBe('rgb(3, 121, 190)')
        expect(Color('rgb(3, 121, 190, 0.2)').format()).toBe('rgba(3, 121, 190, 0.2)')
        expect(Color('rgb(1.1764706%, 47.4509804%, 74.5098039%, 20%)').format()).toBe('rgba(3.00000003, 121.00000002, 189.99999994499998, 0.2)')
        expect(Color('rgb(3 121 190)').format()).toBe('rgb(3 121 190)')
        expect(Color('rgb(3.1 121.2 190.3 / 20.4%)').format()).toBe('rgb(3.1 121.2 190.3 / 0.204)')

        expect(Color('hsl(202, 98%, 75%)').format()).toBe('hsl(202, 98%, 75%)')
        expect(Color('hsl(202, 98%, 75%, 1)').format()).toBe('hsl(202, 98%, 75%)')
        expect(Color('hsl(202, 98%, 75%, 0.2)').format()).toBe('hsla(202, 98%, 75%, 0.2)')
        expect(Color('hsl(202 98% 75%)').format()).toBe('hsl(202 98% 75%)')
        expect(Color('hsl(202.1 98.2% 75.3% / 20.4%)').format()).toBe('hsl(202.1 98.2% 75.3% / 0.204)')

        expect(Color('hsv(202, 98%, 75%)').format()).toBe('hsv(202, 98%, 75%)')
        expect(Color('hsv(202, 98%, 75%, 1)').format()).toBe('hsv(202, 98%, 75%)')
        expect(Color('hsv(202, 98%, 75%, 0.2)').format()).toBe('hsva(202, 98%, 75%, 0.2)')
        expect(Color('hsv(202 98% 75%)').format()).toBe('hsv(202 98% 75%)')
        expect(Color('hsv(202.1 98.2% 75.3% / 20.4%)').format()).toBe('hsv(202.1 98.2% 75.3% / 0.204)')
        expect(Color('hsb(202, 98%, 75%)').format()).toBe('hsb(202, 98%, 75%)')

        expect(Color('rgb(3, 121, 190)').format('hsl_css4')).toBe('hsl(202.1390374331551 96.89119170984458% 37.84313725490196%)')
    })

    test('toString', () => {
        expect(Color('#FFF').toString()).toBe('#fff')
        expect(Color('#FFFF').toString()).toBe('#fff')
        expect(Color('#FFFA').toString()).toBe('#fffa')
        expect(Color('#FFFA').red(3.2).toString()).toBe('#03ffffaa')
        expect(Color('#FFFA').alpha(0.1).toString()).toBe('#ffffff1a')

        expect(Color('#FFFFFF').toString()).toBe('#ffffff')
        expect(Color('#FFFFFFFF').toString()).toBe('#ffffff')
        expect(Color('#FFFFFFAA').toString()).toBe('#ffffffaa')
        expect(Color('#FFFFFFAA').red(3.2).alpha(0.1).toString()).toBe('#03ffff1a')

        expect(Color('rgb(3, 121, 190)').toString()).toBe('rgb(3, 121, 190)')
        expect(Color('rgb(3, 121, 190, 1)').toString()).toBe('rgb(3, 121, 190)')
        expect(Color('rgb(3, 121, 190, 0.2)').toString()).toBe('rgba(3, 121, 190, 0.2)')
        expect(Color('rgb(1.1764706%, 47.4509804%, 74.5098039%, 20%)').toString()).toBe('rgba(3, 121, 190, 0.2)')
        expect(Color('rgb(3 121 190)').toString()).toBe('rgb(3 121 190)')
        expect(Color('rgb(3.1 121.2 190.3 / 20.4%)').toString()).toBe('rgb(3 121 190 / 0.2)')

        expect(Color('hsl(202, 98%, 75%)').toString()).toBe('hsl(202, 98%, 75%)')
        expect(Color('hsl(202, 98%, 75%, 1)').toString()).toBe('hsl(202, 98%, 75%)')
        expect(Color('hsl(202, 98%, 75%, 0.2)').toString()).toBe('hsla(202, 98%, 75%, 0.2)')
        expect(Color('hsl(202 98% 75%)').toString()).toBe('hsl(202 98% 75%)')
        expect(Color('hsl(202.1 98.2% 75.3% / 20.4%)').toString()).toBe('hsl(202 98% 75% / 0.2)')
        expect(Color('hsl(360 20% 100%)').toString()).toBe('hsl(0 0% 100%)')
        expect(Color('hsl(360 20% 0%)').toString()).toBe('hsl(0 0% 0%)')
        expect(Color('hsl(360 0% 10%)').toString()).toBe('hsl(0 0% 10%)')
        expect(Color('hsl(360 10% 10%)').toString()).toBe('hsl(0 10% 10%)')

        expect(Color('hsv(202, 98%, 75%)').toString()).toBe('hsv(202, 98%, 75%)')
        expect(Color('hsv(202, 98%, 75%, 1)').toString()).toBe('hsv(202, 98%, 75%)')
        expect(Color('hsv(202, 98%, 75%, 0.2)').toString()).toBe('hsva(202, 98%, 75%, 0.2)')
        expect(Color('hsv(202 98% 75%)').toString()).toBe('hsv(202 98% 75%)')
        expect(Color('hsv(202.1 98.2% 75.3% / 20.4%)').toString()).toBe('hsv(202 98% 75% / 0.2)')
        expect(Color('hsv(360 20% 0%)').toString()).toBe('hsv(0 0% 0%)')
        expect(Color('hsv(360 0% 10%)').toString()).toBe('hsv(0 0% 10%)')
        expect(Color('hsv(360 10% 10%)').toString()).toBe('hsv(0 10% 10%)')
        expect(Color('hsb(202, 98%, 75%)').toString()).toBe('hsb(202, 98%, 75%)')
        expect(Color('hsb(202 98% 75%)').toString()).toBe('hsb(202 98% 75%)')

        expect(Color('rgb(3, 121, 190)').toString('hsl_css4')).toBe('hsl(202 97% 38%)')
    })
})
