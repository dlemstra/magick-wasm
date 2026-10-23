/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from '@src/image-magick';
import { MagickColors } from '@src/magick-colors';
import { MagickFormat } from '@src/enums/magick-format';
import { MagickReadSettings } from '@src/settings/magick-read-settings';
import { TestFiles } from '@test/test-files';

describe('MagickImage#stegano', () => {
    it('should embed a recoverable watermark without changing the watermark', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(64, 48);
            TestFiles.Images.empty.use(watermark => {
                watermark.read(MagickColors.Black, 4, 2);
                watermark.getPixels(pixels => {
                    pixels.setPixel(0, 0, [255, 255, 255]);
                    pixels.setPixel(1, 0, [64, 64, 64]);
                    pixels.setPixel(2, 1, [128, 128, 128]);
                    pixels.setPixel(3, 1, [192, 192, 192]);
                });
                watermark.clone(original => {
                    image.clone(source => {
                        image.stegano(watermark);

                        expect(image.width).toBe(64);
                        expect(image.height).toBe(48);
                        expect(image).toEqualImage(source, 0.00026);
                        expect(watermark).toEqualImage(original);

                        image.write(MagickFormat.Png, data => {
                            const fileName = '/tmp/stegano-test.png';
                            const fs = ImageMagick._api.FS;
                            const stream = fs.open(fileName, 'w');
                            try {
                                fs.write(stream, data, 0, data.length);
                            } finally {
                                fs.close(stream);
                            }
                            try {
                                TestFiles.Images.empty.use(hidden => {
                                    hidden.read(`stegano:${fileName}`, new MagickReadSettings({
                                        width: watermark.width,
                                        height: watermark.height,
                                    }));

                                    expect(hidden.width).toBe(4);
                                    expect(hidden.height).toBe(2);
                                    expect(hidden).toEqualImage(watermark, 0.00196);
                                });
                            } finally {
                                //fs.unlink(fileName);
                            }
                        });
                    });
                });
            });
        });
    });
});
