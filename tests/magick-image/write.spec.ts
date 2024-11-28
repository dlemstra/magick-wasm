/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickFormat } from '@src/enums/magick-format';
import { TestFiles } from '@test/test-files';
import { bogusAsyncMethod } from '@test/bogus-async';

describe('MagickImage#write', () => {
    it('should save the image to an array async', async () => {
        await TestFiles.Images.imageMagickJpg.use(async (image) => {
            await image.write(async (data) => {
                expect(data.length).toBe(18830);
                await bogusAsyncMethod();
            });
        });
    });

    it('should save the image to an array', () => {
        TestFiles.Images.Builtin.wizard.use((image) => {
            image.write(MagickFormat.Png, (data) => {
                expect(data.length).toBe(87352);
            });
        });
    });
});
