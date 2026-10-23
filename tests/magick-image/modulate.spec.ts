/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Percentage } from '@src/types/percentage';
import { TestFiles } from '@test/test-files';

describe('MagickImage#modulate', () => {
    it('should default to 100 percent for saturation and hue', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.clone(other => {
                image.modulate(new Percentage(50));
                other.modulate(new Percentage(50), new Percentage(100), new Percentage(100));

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should default to 100 percent for hue', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.clone(other => {
                image.modulate(new Percentage(50), new Percentage(25));
                other.modulate(new Percentage(50), new Percentage(25), new Percentage(100));

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should modulate the image', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.modulate(new Percentage(75), new Percentage(50), new Percentage(25));

            expect(image).toHavePixelWithColor(340, 270, '#43582e');
            expect(image).toHavePixelWithColor(410, 155, '#863da3');
            expect(image).toHavePixelWithColor(430, 230, '#4f47a9');
            expect(image).toHavePixelWithColor(500, 313, '#bfbfbf');
        });
    });
});
