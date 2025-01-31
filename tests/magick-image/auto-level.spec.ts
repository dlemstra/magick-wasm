/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { ErrorMetric } from '@src/enums/error-metric';
import { TestFiles } from '@test/test-files';

describe('MagickImage#autoLevel', () => {
    it('should auto level to the image', () => {
        TestFiles.Images.Builtin.rose.use(image => {
            image.autoLevel();

            expect(image).toHavePixelWithColor(5, 40, '#5b5646');
        });
    });

    it('should only auto level the specified channels', () => {
        TestFiles.Images.Builtin.rose.use(image => {
            image.autoLevel(Channels.Red);

            expect(image).toHavePixelWithColor(5, 40, '#516556');
        });
    });

    it('should use the correct default channels', () => {
        TestFiles.Images.Builtin.rose.use(image => {
            image.clone(other => {
                image.autoLevel();
                other.autoLevel(Channels.Undefined);

                const distortion = image.compare(other, ErrorMetric.RootMeanSquared);
                expect(distortion).toBe(0);
            })
        });
    });
});
