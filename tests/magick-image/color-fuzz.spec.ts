/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Percentage } from '@src/types/percentage';
import { TestFiles } from '@test/test-files';

describe('MagickImage#colorFuzz', () => {
    it('should return the color fuzz percentage', () => {
        TestFiles.Images.empty.use(image => {
            const colorFuzz = image.colorFuzz;
            expect(colorFuzz.toDouble()).toBe(0);
        });
    });

    it('should change color fuzz percentage', () => {
        TestFiles.Images.empty.use(image => {
            image.colorFuzz = new Percentage(10);
            const colorFuzz = image.colorFuzz;
            expect(colorFuzz.toDouble()).toBe(10);
        });
    });
});
