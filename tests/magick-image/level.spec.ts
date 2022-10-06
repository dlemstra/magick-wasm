// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Channels } from '../../src/channels';
import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { Percentage } from '../../src/percentage';
import '../custom-matcher';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = global.native;
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#level', () => {
    it('should use composite as default channels', () => {
        image.clone(other => {
            image.level(new Percentage(50), new Percentage(10));
            other.level(Channels.Composite, new Percentage(50), new Percentage(10));

            expect(image.signature).toBe(other.signature);
        });
    });

    it('should use 1 as default gamma', () => {
        image.clone(other => {
            image.level(new Percentage(50), new Percentage(10));
            other.level(Channels.Composite, new Percentage(50), new Percentage(10), 1);

            expect(image.signature).toBe(other.signature);
        });
    });

    it('should scale the colors', () => {
        image.level(new Percentage(50), new Percentage(10));

        expect(image).toHavePixelWithColor(244, 50, '#00ffffff');
        expect(image).toHavePixelWithColor(230, 150, '#000000ff');
        expect(image).toHavePixelWithColor(430, 150, '#a70000ff');
        expect(image).toHavePixelWithColor(300, 250, '#b1bb00ff');
        expect(image).toHavePixelWithColor(395, 440, '#00c692ff');
    });
});
