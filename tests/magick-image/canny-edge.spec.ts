/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ErrorMetric } from '@src/enums/error-metric';
import { Percentage } from '@src/types/percentage';
import { TestFiles } from '@test/test-files';

describe('MagickImage#cannyEdge', () => {
    it('should change pixels of the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.cannyEdge();

            expect(image).toHavePixelWithColor(313, 288, '#fff');
            expect(image).toHavePixelWithColor(314, 288, '#000');
            expect(image).toHavePixelWithColor(466, 224, '#fff');
            expect(image).toHavePixelWithColor(467, 224, '#000');
        });
    });

    it('should use the correct default values', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                image.cannyEdge();
                other.cannyEdge(0, 1, new Percentage(10), new Percentage(30));

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBe(0);
            })
        });
    });
});
