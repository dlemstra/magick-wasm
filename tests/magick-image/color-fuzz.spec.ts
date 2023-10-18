// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Percentage } from '@src/percentage';
import { TestImages } from '@test/test-images';

describe('MagickImage#colorFuzz', () => {
    it('should return the color fuzz percentage', () => {
        TestImages.empty.use(image => {
            const colorFuzz = image.colorFuzz;
            expect(colorFuzz.toDouble()).toBe(0);
        });
    });

    it('should change color fuzz percentage', () => {
        TestImages.empty.use(image => {
            image.colorFuzz = new Percentage(10);
            const colorFuzz = image.colorFuzz;
            expect(colorFuzz.toDouble()).toBe(10);
        });
    });
});
