/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { Channels } from '../../src/channels';
import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';
import { Percentage } from '../../src/percentage';
import { colorAssert } from '../color-assert';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
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
            other.level(Channels.Composite, new Percentage(50), new Percentage(10), 1.0);

            expect(image.signature).toBe(other.signature);
        });
    });

    it('should scale the colors', () => {
        image.level(new Percentage(50), new Percentage(10));

        colorAssert(image, 244, 50, '#00ffffff');
        colorAssert(image, 230, 150, '#000000ff');
        colorAssert(image, 430, 150, '#a70000ff');
        colorAssert(image, 300, 250, '#b1bb00ff');
        colorAssert(image, 395, 440, '#00c692ff');
    });
});