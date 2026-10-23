/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { TestFiles } from '@test/test-files';

describe('MagickImage#equalize', () => {
    it('should apply histogram equalization to the image', () => {
        TestFiles.Images.Builtin.rose.use(image => {
            image.clone(original => {
                image.equalize();

                expect(image).toEqualImage(original, 0.17011);
            });
        });
    });

    it('should use the correct default channels', () => {
        TestFiles.Images.Builtin.rose.use(image => {
            image.clone(other => {
                image.equalize();
                other.equalize(Channels.Undefined);

                expect(image).toEqualImage(other);
            });
        });
    });
});
