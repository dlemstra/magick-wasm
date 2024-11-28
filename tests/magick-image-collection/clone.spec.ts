/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ErrorMetric } from '@src/enums/error-metric';
import { TestFiles } from '@test/test-files';

describe('MagickImageCollection#clone', () => {
    it('should clone the images in the collection', () => {
        TestFiles.Images.roseSparkleGif.use(images => {
            images.clone(clones => {
                expect(clones.length).toBe(3);
                for (let i = 0; i < clones.length; i++)
                    expect(clones[i].compare(images[i], ErrorMetric.RootMeanSquared)).toBe(0.0);
            });
        });
    });
});
