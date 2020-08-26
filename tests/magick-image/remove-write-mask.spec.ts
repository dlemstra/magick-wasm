/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickColors } from '../../src/magick-colors';
import { MagickImage } from '../../src/magick-image';

let image: MagickImage;
let writeMask: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
    writeMask = MagickImage.create();
});

afterEach(() => {
    image.dispose();
    writeMask.dispose();
});

describe('MagickImage#removeWriteMask', () => {
    it('should remove the write mask from the image', () => {
        image.read('logo:');
        writeMask.read(MagickColors.Black, image.width, image.height);

        image.setWriteMask(writeMask);

        image.getWriteMask(mask => {
            expect(mask).not.toBeNull();
        });

        image.removeWriteMask()

        image.getWriteMask(mask => {
            expect(mask).toBeNull();
        });
    });
});