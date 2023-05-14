// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { GifDisposeMethod } from '../../src/gif-dispose-method';
import { ImageMagick } from '../../src/image-magick';
import { TestImages } from '../test-images';

describe('MagickImage#gifDisposeMethod', () => {
    it('should return the gif dispose method of the image', async () => {
        await TestImages.roseSparkleGif.readCollection(images => {
            expect(images[0].gifDisposeMethod).toBe(GifDisposeMethod.None);
            expect(images[1].gifDisposeMethod).toBe(GifDisposeMethod.None);
            expect(images[2].gifDisposeMethod).toBe(GifDisposeMethod.None);
        });
    });

    it('should change the gif dispose method', async () => {
        await TestImages.roseSparkleGif.readCollection(input => {
            input[0].gifDisposeMethod = GifDisposeMethod.Background;
            input[2].gifDisposeMethod = GifDisposeMethod.Previous;

            input.write((data) => {
                ImageMagick.readCollection(data, output => {
                    expect(output[0].gifDisposeMethod).toBe(GifDisposeMethod.Background);
                    expect(output[1].gifDisposeMethod).toBe(GifDisposeMethod.None);
                    expect(output[2].gifDisposeMethod).toBe(GifDisposeMethod.Previous);
                });
            });
        });
    });
});
