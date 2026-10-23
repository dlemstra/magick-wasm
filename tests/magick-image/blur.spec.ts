/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { TestFiles } from '@test/test-files';

describe('MagickImage#blur', () => {
    it('should change pixels of the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.blur(5, 5);
            expect(image).toHavePixelWithColor(222, 60, '#ff6a6a');
        });
    });

    it('should not confuse channels for radius', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                image.blur(Channels.Blue);
                other.blur(4, 1);

                expect(image).toEqualImage(other, 0.03963);
            })
        });
    });

    it('should only blur the specified channel', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.blur(5, 5, Channels.Green);
            expect(image).toHavePixelWithColor(222, 60, '#ff6a00');
        });
    });
});
