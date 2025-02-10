/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { Percentage } from '@src/types/percentage';
import { TestFiles } from '@test/test-files';

describe('MagickImage#adaptiveSharpen', () => {
    it('should threshold the image', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(image => {
            image.adaptiveThreshold(100, 100);

            TestFiles.Images.fujiFilmFinePixS1ProJpg.use(original => {
                expect(image).toEqualImage(original, 0.45749);
            });
        });
    });

    it('should use the bias percentage', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(image => {
            image.adaptiveThreshold(100, 100, new Percentage(50));

            TestFiles.Images.fujiFilmFinePixS1ProJpg.use(original => {
                expect(image).toEqualImage(original, 0.42296);
            });
        });
    });

    it('should use the specified channels', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(image => {
            image.adaptiveThreshold(100, 100, new Percentage(50), Channels.Green);

            TestFiles.Images.fujiFilmFinePixS1ProJpg.use(original => {
                expect(image).toEqualImage(original, 0.23814);
            });
        });
    });
});
