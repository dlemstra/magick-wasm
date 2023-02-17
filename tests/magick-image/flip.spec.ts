// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ErrorMetric } from '../../src/error-metric';
import { ImageMagick } from '../../src/image-magick';
import { TestFiles } from '../test-files';

beforeAll(() => { ImageMagick._api = global.native; });

describe('MagickImage#flip', () => {
    it('should flip the image', async () => {
        await TestFiles.fujiFilmFinePixS1ProJpg.read(async image => {

            image.flip();

            await TestFiles.fujiFilmFinePixS1ProJpg.read(orignal => {
                expect(image.width).toBe(orignal.width);
                expect(image.height).toBe(orignal.height);

                let difference = image.compare(orignal, ErrorMetric.RootMeanSquared);
                expect(difference).toBeCloseTo(0.1654);

                image.flip();

                difference = image.compare(orignal, ErrorMetric.RootMeanSquared);
                expect(difference).toBe(0);
            });
        });
    });
});
