/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { MagickColor } from '@src/magick-color';
import { TestFiles } from '@test/test-files';

describe('MagickImage#shadeGrayscale', () => {
    it('should use the default light source direction', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(32, 24);
            image.clone(other => {
                image.shadeGrayscale();
                other.shadeGrayscale(30, 30);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should use RGB channels by default', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(32, 24);
            image.clone(other => {
                image.shadeGrayscale(60, 45);
                other.shadeGrayscale(60, 45, Channels.RGB);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should shade the image and produce grayscale pixels', () => {
        TestFiles.Images.empty.use(image => {
            image.read(new MagickColor('#804020'), 9, 9);

            image.shadeGrayscale(30, 30);

            expect(image.width).toBe(9);
            expect(image.height).toBe(9);
            expect(image).toHavePixelWithColor(4, 4, '#7f7f7f');
        });
    });

    it('should only shade the specified channels', () => {
        TestFiles.Images.empty.use(image => {
            image.read(new MagickColor('#804020'), 9, 9);

            image.shadeGrayscale(30, 30, Channels.Green);

            expect(image).toHavePixelWithColor(4, 4, '#807f20');
        });
    });
});
