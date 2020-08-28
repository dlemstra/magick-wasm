/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';
import { TestFiles, readTestFile } from '../test-files';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#quality', () => {
    it('should not allow a value below 1', () => {
        image.quality = 0;
        expect(image.quality).toBe(1);
    });

    it('should not allow a value above 100', () => {
        image.quality = 101;
        expect(image.quality).toBe(100);
    });

    it('should return the image quality', async () => {
        await readTestFile(TestFiles.imageMagickJpg, image => {
            expect(image.quality).toBe(100);
        });
    });
});