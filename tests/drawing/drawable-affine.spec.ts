/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableAffine } from '@src/drawing/drawable-affine';
import { DrawableRectangle } from '@src/drawing/drawable-rectangle';
import { TestFiles } from '@test/test-files';

describe('DrawablePoint', () => {
    it('should set point in the image', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableAffine(2, 3, 4, 5, 6, 7),
                new DrawableRectangle(-20, -20, 10, 10),
            ])

            expect(image).toHavePixelWithColor(32, 119, '#fff');
            expect(image).toHavePixelWithColor(33, 118, '#f1f1f1');
            expect(image).toHavePixelWithColor(34, 117, '#000');
            expect(image).toHavePixelWithColor(127, 56, '#fff');
            expect(image).toHavePixelWithColor(126, 57, '#f8f8f8');
            expect(image).toHavePixelWithColor(125, 58, '#000');
        });
    });
});
