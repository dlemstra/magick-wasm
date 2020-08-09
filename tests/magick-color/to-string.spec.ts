/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickColor } from '../../src/magick-color';

beforeEach(() => {
    ImageMagick._api = (global as any).native;
});

describe('MagickColor#toString', () => {
    it('should format the color', () => {
        const color = new MagickColor(10, 20, 30, 40);

        expect(color.toString()).toBe('#0a141e28');
    });

    it('should always return the alpha channel', () => {
        const color = new MagickColor(10, 20, 30);

        expect(color.toString()).toBe('#0a141eff');
    });

    it('should return cmyka color for cmyk color', () => {
        const color = new MagickColor(10, 20, 30,40, 50);

        expect(color.toString()).toBe('cmyka(10,20,30,40,0.1961)');
    });
});