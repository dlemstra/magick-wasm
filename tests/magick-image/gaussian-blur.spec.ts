/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { TestFiles } from '@test/test-files';

describe('MagickImage#gaussianBlur', () => {
    it('should gaussian blur the image', () => {
        TestFiles.Images.Builtin.wizard.use(image => {
            image.clone(other => {
                image.gaussianBlur(5.5, 10.2);
                other.blur(5.5, 10.2);

                expect(image).toEqualImage(other, 0.00067);
            })
        });
    });

    it('should use the correct default sigma', () => {
        TestFiles.Images.Builtin.wizard.use(image => {
            image.clone(other => {
                image.gaussianBlur(4.2);
                other.gaussianBlur(4.2, 1.0);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should only blur the specified channels', () => {
        TestFiles.Images.Builtin.wizard.use(image => {
            image.gaussianBlur(4.2, 1, Channels.Green);

            expect(image).toHavePixelWithColor(120, 200, '#185338ff');
        });
    });
});
