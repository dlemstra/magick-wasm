// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Channels } from '@src/enums/channels';
import { ErrorMetric } from '@src/enums/error-metric';
import { MagickColors } from '@src/magick-colors';
import { TestImages } from '@test/test-images';

describe('MagickImage#compare', () => {
    it('should return 0 for same image', () => {
        TestImages.empty.use(image => {
            image.read(MagickColors.Red, 1, 1);
            expect(image.compare(image, ErrorMetric.RootMeanSquared)).toBe(0);
        });
    });

    it('should return difference', () => {
        TestImages.empty.use(image => {
            TestImages.empty.use(other => {
                image.read(MagickColors.Red, 1, 1);
                other.read(MagickColors.RosyBrown, 1, 1);
                expect(image.compare(other, ErrorMetric.RootMeanSquared)).toBeCloseTo(0.48);
            });
        });
    });

    it('should compare the specified channels', () => {
        TestImages.empty.use(image => {
            TestImages.empty.use(other => {
                image.read(MagickColors.Red, 1, 1);
                other.read(MagickColors.RosyBrown, 1, 1);
                expect(image.compare(other, ErrorMetric.RootMeanSquared, Channels.Red)).toBeCloseTo(0.15);
            });
        });
    });
});
