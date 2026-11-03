/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { TestFiles } from '@test/test-files';

describe('MagickImage#bilateralBlur', () => {
    it('should change pixels of the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.bilateralBlur(5, 6);
            expect(image).toHavePixelWithColor(387, 435, '#b5191e');
        });
    });

    it('should use the specified sigma values', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.bilateralBlur(5, 6, 7, 8);
            expect(image).toHavePixelWithColor(387, 435, '#b4191d');
        });
    });

    it('should use the default sigma values and channels', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                image.bilateralBlur(5, 6);
                const intensitySigma = Math.sqrt(61);
                other.bilateralBlur(5, 6, intensitySigma, intensitySigma * 0.25, Channels.Undefined);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should use the default channels with specified sigma values', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                image.bilateralBlur(5, 6, 7, 8);
                other.bilateralBlur(5, 6, 7, 8, Channels.Undefined);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should only blur the specified channel with default sigma values', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.bilateralBlur(5, 6, Channels.Blue);

            expect(image).toHavePixelWithColor(387, 435, '#af191e');
        });
    });

    it('should only blur the specified channel with specified sigma values', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.bilateralBlur(5, 6, 7, 8, Channels.Red);

            expect(image).toHavePixelWithColor(387, 435, '#b4191d');
        });
    });
});
