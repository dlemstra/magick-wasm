// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickFormat } from '../../src/magick-format';
import { TestFiles } from '../test-files';

function bogusAsyncMethod(): Promise<number> { return new Promise(resolve => resolve(1)); }

describe('MagickImage#write', () => {
    it('should save the image to an array async', async () => {
        await TestFiles.imageMagickJpg.read(async (image) => {
            await image.write(async (data) => {
                expect(data.length).toBe(18830);
                await bogusAsyncMethod();
            });
        });
    });

    it('should save the image to an array', async () => {
        await TestFiles.Builtin.wizard.read((image) => {
            image.write(MagickFormat.Png, (data) => {
                expect(data.length).toBe(87352);
            });
        });
    });
});
