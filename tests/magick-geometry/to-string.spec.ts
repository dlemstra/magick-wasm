// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickGeometry } from '../../src/magick-geometry';

beforeEach(() => {
    ImageMagick._api = (global as any).native;
});

describe('MagickGeometry#toString', () => {
    it('should only return with and height', () => {
        const geometry = new MagickGeometry(11, 6);

        expect(geometry.toString()).toBe('11x6');
    });

    it('should return correct value for positive values', () => {
        const geometry = new MagickGeometry(1, 2, 11, 6);

        expect(geometry.toString()).toBe('11x6+1+2');
    });

    it('should return correct value for negative values', () => {
        const geometry = new MagickGeometry(-1, -2, 11, 6);

        expect(geometry.toString()).toBe('11x6-1-2');
    });

    it('should return correct value for aspect ratio', () => {
        const geometry = new MagickGeometry('11:6');

        expect(geometry.toString()).toBe('11:6');
    });

    it('should return correct value for fill area', () => {
        const geometry = new MagickGeometry(11, 0);
        geometry.fillArea = true;

        expect(geometry.toString()).toBe('11x^');
    });

    it('should return correct value for greater', () => {
        const geometry = new MagickGeometry(0, 6);
        geometry.greater = true;

        expect(geometry.toString()).toBe('x6>');
    });

    it('should return correct value for ignore aspect ratio', () => {
        const geometry = new MagickGeometry(11, 6);
        geometry.ignoreAspectRatio = true;

        expect(geometry.toString()).toBe('11x6!');
    });

    it('should return correct value for less', () => {
        const geometry = new MagickGeometry(11, 6);
        geometry.less = true;

        expect(geometry.toString()).toBe('11x6<');
    });

    it('should return correct value for limit pixels', () => {
        const geometry = new MagickGeometry(11, 6);
        geometry.limitPixels = true;

        expect(geometry.toString()).toBe('11x6@');
    });
});