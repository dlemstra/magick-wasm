// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickColor } from '../../src/magick-color';

beforeEach(() => {
    ImageMagick._api = global.native;
});

describe('MagickColor#constructor', () => {
    it('should set throw error when color is invalid', () => {
        expect(() => {
            new MagickColor('foobar');
        }).toThrowError('invalid color specified');
    });

    it('should set the properties', () => {
        const color = new MagickColor('#abcdef42');
        expect(color.r).toBe(171);
        expect(color.g).toBe(205);
        expect(color.b).toBe(239);
        expect(color.a).toBe(66);
        expect(color.isCmyk).toBe(false);
    });

    it('should read cmyk color', () => {
        const color = new MagickColor('cmyka(5%,10%,20%,40%,0.8)');
        expect(color.r).toBe(13);
        expect(color.g).toBe(26);
        expect(color.b).toBe(51);
        expect(color.a).toBe(204);
        expect(color.isCmyk).toBe(true);
    });

    it('should set the RGB channels', () => {
        const color = new MagickColor(1, 2, 3);
        expect(color.r).toBe(1);
        expect(color.g).toBe(2);
        expect(color.b).toBe(3);
        expect(color.a).toBe(255);
        expect(color.isCmyk).toBe(false);
    });

    it('should set the RGBA channels', () => {
        const color = new MagickColor(1, 2, 3, 4);
        expect(color.r).toBe(1);
        expect(color.g).toBe(2);
        expect(color.b).toBe(3);
        expect(color.a).toBe(4);
        expect(color.isCmyk).toBe(false);
    });

    it('should set the CMYKA channels', () => {
        const color = new MagickColor(1, 2, 3, 4, 5);
        expect(color.r).toBe(1);
        expect(color.g).toBe(2);
        expect(color.b).toBe(3);
        expect(color.k).toBe(4);
        expect(color.a).toBe(5);
        expect(color.isCmyk).toBe(true);
    });
});
