// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { EvaluateOperator } from '@src/evaluate-operator';
import { MagickColors } from '@src/magick-colors';
import { MagickImage } from '@src/magick-image';
import { MagickImageCollection } from '@src/magick-image-collection';

describe('MagickImageCollection#evaluate', () => {
    it('should throw exception when collection is empty', () => {
        expect(() => {
            const images = MagickImageCollection.create();
            images.evaluate(EvaluateOperator.Abs, () => { /* never reached */ });
        }).toThrowError('operation requires at least one image');
    });

    it('should evaluate the images', () => {
        const images = MagickImageCollection.create();
        images.push(MagickImage.create(MagickColors.Red, 1, 3));

        const pixels = MagickImageCollection.create();
        pixels.push(MagickImage.create(MagickColors.Black, 1, 1));
        pixels.push(MagickImage.create(MagickColors.White, 1, 1));
        pixels.push(MagickImage.create(MagickColors.Blue, 1, 1));

        pixels.appendVertically(image => {
            images.push(image);

            images.evaluate(EvaluateOperator.Max, image => {
                expect(image).toHavePixelWithColor(0, 0, MagickColors.Red);
                expect(image).toHavePixelWithColor(0, 1, MagickColors.White);
                expect(image).toHavePixelWithColor(0, 2, MagickColors.Fuchsia);
            });
        })

        pixels.dispose();
        images.dispose();
    });
});
