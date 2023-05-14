// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeEach(() => {
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#animationTicksPerSecond', () => {
    it('should return the animation ticks per second', () => {
        expect(image.animationTicksPerSecond).toBe(100);
    });

    it('should change the animation ticks per second', () => {
        image.animationTicksPerSecond = 10;
        expect(image.animationTicksPerSecond).toBe(10);
    });
});
