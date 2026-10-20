/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';
import { bogusAsyncMethod } from '@test/bogus-async';

describe('MagickImage#uniqueColors', () => {
    it('should create an image containing each unique color once without changing the original', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(original => {
                const colors = image.histogram();
                const width = image.uniqueColors(unique => {
                    expect(unique.height).toBe(1);
                    expect(unique.width).toBe(colors.size);
                    const histogram = unique.histogram();
                    expect([...histogram.keys()].sort()).toEqual([...colors.keys()].sort());
                    expect([...histogram.values()].every(count => count === 1n)).toBe(true);
                    return unique.width;
                });

                expect(width).toBe(colors.size);
                expect(image).toEqualImage(original);
            });
        });
    });

    it('should create an image containing the unique colors async', async () => {
        await TestFiles.Images.empty150x150Canvas.use(async image => {
            const width = await image.uniqueColors(async unique => {
                await bogusAsyncMethod();

                expect(unique.height).toBe(1);
                expect(unique).toHavePixelWithColor(0, 0, MagickColors.White);
                return unique.width;
            });

            expect(width).toBe(1);
        });
    });
});
