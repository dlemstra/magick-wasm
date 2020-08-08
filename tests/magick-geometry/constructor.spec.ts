/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickGeometry } from '../../src/magick-geometry';

beforeEach(() => {
    ImageMagick._api = (global as any).native;
});

describe('MagickGeometry#constructor', () => {
    it('should set the properties', () => {
        const geometry = new MagickGeometry(1, 2, 3, 4);
        expect(geometry.width).toBe(1);
        expect(geometry.height).toBe(2);
        expect(geometry.x).toBe(3);
        expect(geometry.y).toBe(4);
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
        expect(geometry.aspectRatio).toEqual(true);
    });

    it('should set the aspect ratio with only x offset', () => {
        const geometry = new MagickGeometry('4:3+2');
        expect(geometry.width).toBe(4);
        expect(geometry.height).toBe(3);
        expect(geometry.x).toBe(2);
        expect(geometry.y).toBe(0);
        expect(geometry.aspectRatio).toEqual(true);
    });
});