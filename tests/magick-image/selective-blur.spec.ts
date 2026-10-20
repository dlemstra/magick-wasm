/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { MagickColors } from '@src/magick-colors';
import { Quantum } from '@src/quantum';
import { Percentage } from '@src/types/percentage';
import { TestFiles } from '@test/test-files';

describe('MagickImage#selectiveBlur', () => {
    it('should use the default channels with a numeric threshold', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(32, 24);
            image.clone(other => {
                image.selectiveBlur(2, 1, 50);
                other.selectiveBlur(2, 1, 50, Channels.Undefined);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should convert percentage thresholds and use the default channels', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(32, 24);
            image.clone(other => {
                image.selectiveBlur(2, 1, new Percentage(20));
                other.selectiveBlur(2, 1, Quantum.max * 0.2, Channels.Undefined);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should only blur pixels within the contrast threshold', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.White, 9, 9);
            image.getPixels(pixels => {
                pixels.setPixel(4, 4, [128, 128, 128]);
            });
            image.clone(other => {
                image.selectiveBlur(2, 1, Quantum.max);
                other.selectiveBlur(2, 1, 10);

                expect(image.width).toBe(9);
                expect(image.height).toBe(9);
                expect(other).toHavePixelWithColor(4, 4, '#808080');
                image.getPixels(pixels => {
                    expect(pixels.getPixel(4, 4)[0]).toBe(234);
                });
            });
        });
    });

    it('should only blur the specified channels with a percentage threshold', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.White, 9, 9);
            image.getPixels(pixels => {
                pixels.setPixel(4, 4, [128, 128, 128]);
            });

            image.selectiveBlur(2, 1, new Percentage(100), Channels.Red);

            image.getPixels(pixels => {
                const pixel = pixels.getPixel(4, 4);
                expect(pixel[0]).toBe(234);
                expect(pixel[1]).toBe(128);
                expect(pixel[2]).toBe(128);
            });
        });
    });
});
