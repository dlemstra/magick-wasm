// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickGeometry } from '../../src/magick-geometry';

beforeEach(() => {
    ImageMagick._api = (global as any).native;
});

describe('MagickGeometry#constructor', () => {
    it('should throw exception when value is invalid', () => {
        expect(() => {
            new MagickGeometry('foobar');
        }).toThrowError('invalid geometry specified');
    });

    it('should throw exception when width is negative', () => {
        expect(() => {
            new MagickGeometry(-1, 0);
        }).toThrowError('negative width is not allowed');
    });

    it('should throw exception when height is negative', () => {
        expect(() => {
            new MagickGeometry(0, -1);
        }).toThrowError('negative height is not allowed');
    });

    it('should set the properties', () => {
        const geometry = new MagickGeometry(1, 2, 3, 4);
        expect(geometry.width).toBe(3);
        expect(geometry.height).toBe(4);
        expect(geometry.x).toBe(1);
        expect(geometry.y).toBe(2);
    });

    it('should use 0 and 0 for the default x and y', () => {
        const geometry = new MagickGeometry(1, 2);
        expect(geometry.width).toBe(1);
        expect(geometry.height).toBe(2);
        expect(geometry.x).toBe(0);
        expect(geometry.y).toBe(0);
    });

    it('should use width for height when height is not specified', () => {
        const geometry = new MagickGeometry(1);
        expect(geometry.width).toBe(1);
        expect(geometry.height).toBe(1);
        expect(geometry.x).toBe(0);
        expect(geometry.y).toBe(0);
    });

    it('should parse the specified string and set the properties', () => {
        const geometry = new MagickGeometry('1x2+3+4');
        expect(geometry.width).toBe(1);
        expect(geometry.height).toBe(2);
        expect(geometry.x).toBe(3);
        expect(geometry.y).toBe(4);
    });

    it('should set the aspect ratio', () => {
        const geometry = new MagickGeometry('3:2');
        expect(geometry.width).toBe(3);
        expect(geometry.height).toBe(2);
        expect(geometry.x).toBe(0);
        expect(geometry.y).toBe(0);
        expect(geometry.aspectRatio).toBe(true);
    });

    it('should set the aspect ratio with only x offset', () => {
        const geometry = new MagickGeometry('4:3+2');
        expect(geometry.width).toBe(4);
        expect(geometry.height).toBe(3);
        expect(geometry.x).toBe(2);
        expect(geometry.y).toBe(0);
        expect(geometry.aspectRatio).toBe(true);
    });

    it('should set fill area', () => {
        const geometry = new MagickGeometry('11x6^');
        expect(geometry.width).toBe(11);
        expect(geometry.height).toBe(6);
        expect(geometry.x).toBe(0);
        expect(geometry.y).toBe(0);
        expect(geometry.fillArea).toBe(true);
    });

    it('should set greater', () => {
        const geometry = new MagickGeometry('11x6>');
        expect(geometry.width).toBe(11);
        expect(geometry.height).toBe(6);
        expect(geometry.x).toBe(0);
        expect(geometry.y).toBe(0);
        expect(geometry.greater).toBe(true);
    });

    it('should set is ignore aspect ratio', () => {
        const geometry = new MagickGeometry('11x6!');
        expect(geometry.width).toBe(11);
        expect(geometry.height).toBe(6);
        expect(geometry.x).toBe(0);
        expect(geometry.y).toBe(0);
        expect(geometry.ignoreAspectRatio).toBe(true);
    });

    it('should set is percentage', () => {
        const geometry = new MagickGeometry('11%x6>');
        expect(geometry.width).toBe(11);
        expect(geometry.height).toBe(6);
        expect(geometry.x).toBe(0);
        expect(geometry.y).toBe(0);
        expect(geometry.isPercentage).toBe(true);
    });

    it('should set less', () => {
        const geometry = new MagickGeometry('11x6<');
        expect(geometry.width).toBe(11);
        expect(geometry.height).toBe(6);
        expect(geometry.x).toBe(0);
        expect(geometry.y).toBe(0);
        expect(geometry.less).toBe(true);
    });

    it('should set limit pixels', () => {
        const geometry = new MagickGeometry('11@x6');
        expect(geometry.width).toBe(11);
        expect(geometry.height).toBe(6);
        expect(geometry.x).toBe(0);
        expect(geometry.y).toBe(0);
        expect(geometry.limitPixels).toBe(true);
    });
});
