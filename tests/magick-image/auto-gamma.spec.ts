/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { ErrorMetric } from '@src/enums/error-metric';
import { TestFiles } from '@test/test-files';

describe('MagickImage#autoGamma', () => {
    it('should apply gamma correction to the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.autoGamma();

            expect(image).toHavePixelWithColor(496, 429, '#000001ff');
        });
    });

    it('should only apply gamma correction to the specified channels', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.autoGamma(Channels.Red);

            expect(image).toHavePixelWithColor(496, 429, '#002d73ff');
        });
    });

    it('should use the correct default channels', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                image.autoGamma();
                other.autoGamma(Channels.Composite);

                const distortion = image.compare(other, ErrorMetric.RootMeanSquared);
                expect(distortion).toBe(0);
            })
        });
    });
});
