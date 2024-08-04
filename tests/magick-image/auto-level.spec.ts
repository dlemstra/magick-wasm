/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { ErrorMetric } from '@src/enums/error-metric';
import { TestImages } from '@test/test-images';

describe('MagickImage#autoLevel', () => {
    it('should auto level to the image', () => {
        TestImages.Builtin.rose.use(image => {
            image.autoLevel();

            expect(image).toHavePixelWithColor(5, 40, '#5b5646ff');
        });
    });

    it('should only auto level the specified channels', () => {
        TestImages.Builtin.rose.use(image => {
            image.autoLevel(Channels.Red);

            expect(image).toHavePixelWithColor(5, 40, '#516556ff');
        });
    });

    it('should use the correct default channels', () => {
        TestImages.Builtin.rose.use(image => {
            image.clone(other => {
                image.autoLevel();
                other.autoLevel(Channels.Undefined);

                const distortion = image.compare(other, ErrorMetric.RootMeanSquared);
                expect(distortion).toBe(0);
            })
        });
    });
});
