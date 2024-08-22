/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { TestImages } from '@test/test-images';

describe('MagickImage#sharpen', () => {
    it('should use correct defaults for radius and sigma.', () => {
        TestImages.Builtin.logo.use(image => {
            image.clone(other => {
                image.sharpen();
                other.sharpen(0, 1.0);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should use composite as default channels', () => {
        TestImages.Builtin.logo.use(image => {
            image.clone(other => {
                image.sharpen(1.0, 1.0);
                other.sharpen(1.0, 1.0, Channels.Composite);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should sharpen the image', () => {
        TestImages.Builtin.logo.use(image => {
            image.clone(other => {
                other.sharpen(10, 20);

                expect(image).toEqualImage(other, 0.03956);
            });
        });
    });
});
