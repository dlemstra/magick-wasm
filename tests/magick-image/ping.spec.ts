// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { MagickReadSettings } from '../../src/settings/magick-read-settings';
import { TestFiles  } from '../test-files';
import '../custom-matcher';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = global.native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#ping', () => {
    const exceptImageToNotHavePixelData = (image: IMagickImage) => {
        expect(() => {
            image.getPixels(pixels => { pixels === undefined })
        }).toThrowError('image contains no pixel data')
    }

    it('should ping built-in image', () => {
        image.ping('logo:');
        expect(image.width).toBe(640);
        expect(image.height).toBe(480);
        exceptImageToNotHavePixelData(image);
    });

    it('should ping image from array', () => {
        const data = TestFiles.imageMagickJpg.toBufferSync();

        image.ping(data);
        expect(image.width).toBe(123);
        expect(image.height).toBe(118);
        exceptImageToNotHavePixelData(image);
    });

    it('should use settings when pinging image', () => {
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
