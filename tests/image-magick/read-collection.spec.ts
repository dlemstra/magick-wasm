// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '@src/image-magick';
import { MagickFormat } from '@src/enums/magick-format';
import { MagickReadSettings } from '@src/settings/magick-read-settings';
import { TestImages } from '@test/test-images';

function bogusAsyncMethod(): Promise<number> { return new Promise(resolve => resolve(1)); }

describe('ImageMagick#readCollection', () => {
    it('should read built-in image async', async () => {
        await ImageMagick.readCollection('logo:', async (images) => {
            expect(images.length).toBe(1);
            expect(images[0].width).toBe(640);
            expect(images[0].height).toBe(480);
            await bogusAsyncMethod();
        });
    });

    it('should read built-in image', () => {
        ImageMagick.readCollection('wizard:', (images) => {
            expect(images.length).toBe(1);
            expect(images[0].width).toBe(480);
            expect(images[0].height).toBe(640);
        });
    });

    it('should read image from array async', async () => {
        await ImageMagick.readCollection(TestImages.roseSparkleGif.data, async (images) => {
            expect(images.length).toBe(3);
            images.forEach(image => {
                expect(image.width).toBe(70);
                expect(image.height).toBe(46);
            });
            await bogusAsyncMethod();
        });
    });

    it('should read image from array', () => {
        ImageMagick.readCollection(TestImages.roseSparkleGif.data, (images) => {
            expect(images.length).toBe(3);
            images.forEach(image => {
                expect(image.width).toBe(70);
                expect(image.height).toBe(46);
            });
        });
    });

    it('should read image from array with specified format async', async () => {
        await expect(async () => {
            await ImageMagick.readCollection(TestImages.roseSparkleGif.data, MagickFormat.Png, async () => {
                await bogusAsyncMethod();
            });
        })
        .rejects
        .toThrowError('ReadPNGImage');
    });

    it('should read image from array with specified format', () => {
        expect(() => {
            ImageMagick.readCollection(TestImages.roseSparkleGif.data, MagickFormat.Png, (image) => {
                console.log(image);
            });
        })
        .toThrowError('ReadPNGImage');
    });

    it('should read image from array with settings async', async () => {
        const settings = new MagickReadSettings({
            format: MagickFormat.Png
        });

        await expect(async () => {
            await ImageMagick.readCollection(TestImages.roseSparkleGif.data, settings, async () => {
                await bogusAsyncMethod();
            });
        })
        .rejects
        .toThrowError('ImproperImageHeader');
    });

    it('should read image from array with settings', () => {
        const settings = new MagickReadSettings({
            format: MagickFormat.Png
        });

        expect(() => {
            ImageMagick.readCollection(TestImages.roseSparkleGif.data, settings, () => {
                // will never be reached
            });
        }).toThrowError('ImproperImageHeader');
    });
});
