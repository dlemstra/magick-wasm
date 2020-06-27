/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';
import { OrientationType } from '../../src/orientation-type';
let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = new MagickImage();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#autoOrient', () => {
    it('should rotate the image', () => {
        image.orientation = OrientationType.LeftTop;
        image.autoOrient();
        expect(image.orientation).toBe(OrientationType.TopLeft);
        expect(image.width).toBe(480);
        expect(image.height).toBe(640);
    });
});