/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ErrorMetric } from '@src/enums/error-metric';
import { TestFiles } from '@test/test-files';

describe('MagickImage#blueShift', () => {
    it('should change pixels of the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.blueShift(1.5);

            expect(image).toHavePixelWithColor(235, 65, '#ffbfbf');
            expect(image).toHavePixelWithColor(340, 260, '#838a9f');
        });
    });

    it('should use the correct default factor value', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                image.blueShift();
                other.blueShift(1.5);

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBe(0);
            })
        });
    });
});
