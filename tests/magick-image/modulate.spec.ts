// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ErrorMetric } from '@src/error-metric';
import { Percentage } from '@src/percentage';
import { TestImages } from '@test/test-images';

describe('MagickImage#modulate', () => {
    it('should default to 100 percent for saturation and hue', () => {
        TestImages.Builtin.logo.use((image) => {
            image.clone(other => {
                image.modulate(new Percentage(50));
                other.modulate(new Percentage(50), new Percentage(100), new Percentage(100));

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBe(0);
            });
        });
    });

    it('should default to 100 percent for hue', () => {
        TestImages.Builtin.logo.use((image) => {
            image.clone(other => {
                image.modulate(new Percentage(50), new Percentage(25));
                other.modulate(new Percentage(50), new Percentage(25), new Percentage(100));

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBe(0);
            });
        });
    });

    it('should modulate the image', () => {
        TestImages.Builtin.logo.use((image) => {
            image.modulate(new Percentage(75), new Percentage(50), new Percentage(25));

            expect(image).toHavePixelWithColor(340, 270, '#43582eff');
            expect(image).toHavePixelWithColor(410, 155, '#863da3ff');
            expect(image).toHavePixelWithColor(430, 230, '#4f47a9ff');
            expect(image).toHavePixelWithColor(500, 313, '#bfbfbfff');
        });
    });
});
