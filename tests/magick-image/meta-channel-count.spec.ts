/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickFormat } from '@src/enums/magick-format';
import { TestImages } from '@test/test-images';

describe('MagickImage#metaChannelCount', () => {
    it('should return the number of meta channels', () => {
        TestImages.Builtin.logo.use(image => {
            expect(image.metaChannelCount).toBe(0);
        })
    });

    it('should allow 53 meta channels', () => {
        TestImages.Builtin.logo.use(image => {
            image.metaChannelCount = 53;
        })
    });

    it('should raise error when value is higher than 53', () => {
        TestImages.Builtin.logo.use(image => {
            expect(() => image.metaChannelCount = 54).toThrowError('MaximumChannelsExceeded');
        })
    });

    it('should save extra channels in a TIFF file', () => {
        TestImages.imageMagickJpg.use(input => {
            input.metaChannelCount = 2;

            input.write(MagickFormat.Tiff, (data) => {
                TestImages.empty.use((output) => {
                    output.read(data);
                    expect(output.metaChannelCount).toBe(2);
                });
            });
        });
    });
});
