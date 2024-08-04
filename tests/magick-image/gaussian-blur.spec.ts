/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { ErrorMetric } from '@src/enums/error-metric';
import { TestImages } from '@test/test-images';

describe('MagickImage#gaussianBlur', () => {
    it('should gaussian blur the image', () => {
        TestImages.Builtin.wizard.use(image => {
            image.clone(other => {
                image.gaussianBlur(5.5, 10.2);
                other.blur(5.5, 10.2);

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBeCloseTo(0.000665, 6);
            })
        });
    });

    it('should use the correct default sigma', () => {
        TestImages.Builtin.wizard.use(image => {
            image.clone(other => {
                image.gaussianBlur(4.2);
                other.gaussianBlur(4.2, 1.0);

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toEqual(0);
            });
        });
    });

    it('should only blur the specified channels', () => {
        TestImages.Builtin.wizard.use(image => {
            image.gaussianBlur(4.2, 1, Channels.Green);

            expect(image).toHavePixelWithColor(120, 200, '#185338ff');
        });
    });
});
