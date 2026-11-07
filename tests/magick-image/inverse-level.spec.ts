/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { Percentage } from '@src/types/percentage';
import { TestFiles } from '@test/test-files';

describe('MagickImage#inverseLevel', () => {
    it('should use composite as default channels and 1 as default gamma', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                image.inverseLevel(new Percentage(50), new Percentage(10));
                other.inverseLevel(new Percentage(50), new Percentage(10), 1.0, Channels.Composite);

                expect(image.signature).toBe(other.signature);
            });
        });
    });

    it('should scale the colors', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.inverseLevel(new Percentage(50), new Percentage(10));

            expect(image).toHavePixelWithColor(244, 50, '#1a8080');
            expect(image).toHavePixelWithColor(230, 150, '#1a1a1a');
            expect(image).toHavePixelWithColor(430, 150, '#726745');
            expect(image).toHavePixelWithColor(300, 250, '#72735a');
            expect(image).toHavePixelWithColor(395, 440, '#217371');
        });
    });
});
