/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#backgroundColor', () => {
    it('should return the background color of the image', () => {
        TestFiles.Images.empty.use(image => {
            const backgroundColor = image.backgroundColor;
            expect(backgroundColor.r).toBe(255);
            expect(backgroundColor.g).toBe(255);
            expect(backgroundColor.b).toBe(255);
            expect(backgroundColor.a).toBe(255);
        });
    });

    it('should change background color', () => {
        TestFiles.Images.empty.use(image => {
            image.backgroundColor = MagickColors.Black;
            const backgroundColor = image.backgroundColor;
            expect(backgroundColor.r).toBe(0);
            expect(backgroundColor.g).toBe(0);
            expect(backgroundColor.b).toBe(0);
            expect(backgroundColor.a).toBe(255);
        });
    });
});
