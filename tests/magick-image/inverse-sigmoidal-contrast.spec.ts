/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { Percentage } from '@src/types/percentage';
import { Quantum } from '@src/quantum';
import { TestFiles } from '@test/test-files';

describe('MagickImage#inverseSigmoidalContrast', () => {
    it('should use half of quantum for midpoint by default', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                image.inverseSigmoidalContrast(4.0);
                other.inverseSigmoidalContrast(4.0, new Percentage(50));

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should adjust the image contrast', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                other.inverseSigmoidalContrast(4.0, new Percentage(25));

                expect(image).toEqualImage(other, 0.03913);
            });
        });
    });

    it('should adjust the specified channel', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                other.inverseSigmoidalContrast(4.0, Quantum.max * 0.25, Channels.Blue);

                expect(image).toEqualImage(other, 0.02709);
            });
        });
    });
});
