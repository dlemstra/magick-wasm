// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Channels } from '@src/enums/channels';
import { Percentage } from '@src/types/percentage';
import { TestImages } from '@test/test-images';

describe('MagickImage#level', () => {
    it('should use composite as default channels', () => {
        TestImages.Builtin.logo.use((image) => {
            image.clone(other => {
                image.level(new Percentage(50), new Percentage(10));
                other.level(Channels.Composite, new Percentage(50), new Percentage(10));

                expect(image.signature).toBe(other.signature);
            });
        });
    });

    it('should use 1 as default gamma', () => {
        TestImages.Builtin.logo.use((image) => {
            image.clone(other => {
                image.level(new Percentage(50), new Percentage(10));
                other.level(Channels.Composite, new Percentage(50), new Percentage(10), 1.0);

                expect(image.signature).toBe(other.signature);
            });
        });
    });

    it('should scale the colors', () => {
        TestImages.Builtin.logo.use((image) => {
            image.level(new Percentage(50), new Percentage(10));

            expect(image).toHavePixelWithColor(244, 50, '#00ffffff');
            expect(image).toHavePixelWithColor(230, 150, '#000000ff');
            expect(image).toHavePixelWithColor(430, 150, '#a70000ff');
            expect(image).toHavePixelWithColor(300, 250, '#b1bb00ff');
            expect(image).toHavePixelWithColor(395, 440, '#00c692ff');
        });
    });
});
