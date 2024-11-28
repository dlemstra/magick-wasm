/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickImage } from '@src/magick-image';
import { TestFiles } from '@test/test-files';

describe('MagickImageCollection#morph', () => {
    it('should throw exception when collection is empty', () => {
        TestFiles.Images.emptyCollection.use((images) => {
            expect(() => {
                images.morph(1);
            }).toThrowError('operation requires at least two images');
        });
    });

    it('should throw exception when collection contains single image', () => {
        TestFiles.Images.emptyCollection.use((images) => {
            images.push(TestFiles.Images.imageMagickJpg.load());
            expect(() => {
                images.morph(1);
            }).toThrowError('operation requires at least two images');
        });
    });

    it('should add images that transform one image into another', () => {
        TestFiles.Images.emptyCollection.use((images) => {
            images.push(MagickImage.create('logo:'));
            images.push(MagickImage.create('wizard:'));

            images.morph(3);

            expect(images.length).toBe(5);
            expect(images[1].width).toBe(600);
            expect(images[1].height).toBe(520);
            expect(images[2].width).toBe(560);
            expect(images[2].height).toBe(560);
            expect(images[3].width).toBe(520);
            expect(images[3].height).toBe(600);

            expect(images[2]).toHavePixelWithColor(180, 150, '#fae972ff');
            expect(images[2]).toHavePixelWithColor(280, 280, '#8695c2ff');
            expect(images[2]).toHavePixelWithColor(150, 180, '#9d9fcfff');
        });
    });
});
