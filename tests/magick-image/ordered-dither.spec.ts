/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { TestFiles } from '@test/test-files';

describe('MagickImage#orderedDither', () => {
    it('should apply ordered dithering to the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(original => {
                image.orderedDither('checks');

                expect(image).toEqualImage(original, 0.11783);
            });
        });
    });

    it('should use the correct default channels', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                image.orderedDither('checks');
                other.orderedDither('checks', Channels.Undefined);

                expect(image).toEqualImage(other);
            });
        });
    });
});
