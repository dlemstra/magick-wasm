/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickGeometry } from '../../src/magick-geometry';

beforeEach(() => {
    ImageMagick._api = (global as any).native;
});

describe('MagickGeometry#constructor', () => {
    it('should set the properties', () => {
        const color = new MagickGeometry(1, 2, 3, 4);
        expect(color.width).toBe(1);
        expect(color.height).toBe(2);
        expect(color.x).toBe(3);
        expect(color.y).toBe(4);
    });

    it('should use 0 and 0 for the default x and y', () => {
        const color = new MagickGeometry(1, 2);
        expect(color.width).toBe(1);
        expect(color.height).toBe(2);
        expect(color.x).toBe(0);
        expect(color.y).toBe(0);
    });

    it('should use width for height when height is not specified', () => {
        const color = new MagickGeometry(1);
        expect(color.width).toBe(1);
        expect(color.height).toBe(1);
        expect(color.x).toBe(0);
        expect(color.y).toBe(0);
    });
});