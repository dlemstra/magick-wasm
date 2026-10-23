/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#integral', () => {
    it('should return cumulative pixel sums without changing the source', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.Black, 2, 2);
            image.getPixels(pixels => {
                pixels.setPixel(0, 0, [1, 2, 3]);
                pixels.setPixel(1, 0, [4, 5, 6]);
                pixels.setPixel(0, 1, [7, 8, 9]);
                pixels.setPixel(1, 1, [10, 11, 12]);
            });
            image.clone(original => {
                const width = image.integral(integral => {
                    expect(integral).not.toBeNull();
                    expect(integral!.width).toBe(2);
                    expect(integral!.height).toBe(2);
                    expect(integral!).toHavePixelWithColor(0, 0, '#010203');
                    expect(integral!).toHavePixelWithColor(1, 0, '#050709');
                    expect(integral!).toHavePixelWithColor(0, 1, '#080a0c');
                    expect(integral!).toHavePixelWithColor(1, 1, '#161a1e');
                    return integral!.width;
                });

                expect(width).toBe(2);
                expect(image).toEqualImage(original);
            });
        });
    });

    it('should support an async callback and return its result', async () => {
        await TestFiles.Images.Color.black.use(async image => {
            const width = await image.integral(async integral => {
                await Promise.resolve();

                expect(integral).not.toBeNull();
                expect(integral!).toHavePixelWithColor(0, 0, MagickColors.Black);
                return integral!.width;
            });

            expect(width).toBe(image.width);
        });
    });
});
