/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IMagickImage } from '@src/magick-image';
import { MagickReadSettings } from '@src/settings/magick-read-settings';
import { TestFiles } from '@test/test-files';

describe('MagickImage#ping', () => {
    const exceptImageToNotHavePixelData = (image: IMagickImage) => {
        expect(() => { image.getPixels(pixels => { expect(pixels).toBeUndefined() }) }).toThrowError('image contains no pixel data')
    }

    it('should ping built-in image', () => {
        TestFiles.Images.empty.use((image) => {
            image.ping('logo:');
            expect(image.width).toBe(640);
            expect(image.height).toBe(480);
            exceptImageToNotHavePixelData(image);
        });
    });

    it('should ping image from array', () => {
        TestFiles.Images.empty.use((image) => {
            image.ping(TestFiles.Images.imageMagickJpg.data);
            expect(image.width).toBe(123);
            expect(image.height).toBe(118);
            exceptImageToNotHavePixelData(image);
        });
    });

    it('should use settings when pinging image', () => {
        TestFiles.Images.empty.use((image) => {
            const settings = new MagickReadSettings({
                width: 2,
                height: 2
            });

            image.ping('pattern:checkerboard', settings);
            expect(image.width).toBe(2);
            expect(image.height).toBe(2);
            exceptImageToNotHavePixelData(image);
        });
    });
});
