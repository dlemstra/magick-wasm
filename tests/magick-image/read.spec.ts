/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { MagickReadSettings } from '@src/settings/magick-read-settings';
import { TestFiles } from '@test/test-files';

describe('MagickImage#read', () => {
    it('should read built-in image', () => {
        TestFiles.Images.empty.use((image) => {
            image.read('logo:');
            expect(image.width).toBe(640);
            expect(image.height).toBe(480);
        });
    });

    it('should read image from array', () => {
        TestFiles.Images.empty.use((image) => {
            image.read(TestFiles.Images.imageMagickJpg.data);
            expect(image.width).toBe(123);
            expect(image.height).toBe(118);
        });
    });

    it('should read correct image when width and height are specified', () => {
        const settings = new MagickReadSettings({
            width: 2,
            height: 3
        });

        TestFiles.Images.empty.use((image) => {
            image.read('xc:red', settings);
            expect(image.width).toBe(2);
            expect(image.height).toBe(3);
        });
    });

    it('should read correct image when height is specified', () => {
        const settings = new MagickReadSettings({
            width: 2
        });

        TestFiles.Images.empty.use((image) => {
            image.read('xc:red', settings);
            expect(image.width).toBe(2);
            expect(image.height).toBe(1);
        });
    });

    it('should read correct image when width is specified', () => {
        const settings = new MagickReadSettings({
            height: 2
        });

        TestFiles.Images.empty.use((image) => {
            image.read('xc:red', settings);
            expect(image.width).toBe(1);
            expect(image.height).toBe(2);
        });
    });

    it('should read correct image when color is specified', () => {
        TestFiles.Images.empty.use((image) => {
            image.read(MagickColors.Red, 1, 2);
            expect(image.width).toBe(1);
            expect(image.height).toBe(2);
            expect(image.hasAlpha).toBe(false);
            expect(image).toHavePixelWithColor(0, 1, MagickColors.Red);
        });
    });
});
