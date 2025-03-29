/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ErrorMetric } from '@src/enums/error-metric';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';
import { bogusAsyncMethod } from '@test/bogus-async';

describe('MagickImage#clone', () => {
    it('should create a clone of the image', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.Magenta, 1, 1);
            image.clone(clone => {
                const difference = image.compare(clone, ErrorMetric.RootMeanSquared);
                expect(difference).toBe(0);
            });
        });
    });

    it('should create a clone of the image async', async () => {
        await TestFiles.Images.empty.use(async image => {
            image.read(MagickColors.Magenta, 1, 1);
            await image.clone(async clone => {
                const difference = image.compare(clone, ErrorMetric.RootMeanSquared);
                expect(difference).toBe(0);
                await bogusAsyncMethod();
            });
        });
    });
});
