/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { Gravity } from '../../src/gravity';
import { MagickColors } from '../../src/magick-colors';
import { MagickImage } from '../../src/magick-image';
import { MagickGeometry } from '../../src/magick-geometry';
import { pixelColor } from '../pixel-color';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = new MagickImage();
    image.read(MagickColors.black, 1, 1);
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#extent', () => {
    it('should extent the image', () => {
       image.extent(2, 3);

       expect(image.width).toBe(2);
       expect(image.height).toBe(3);
    });

    it('should extent the image with the specified color', () => {
        image.extent(2, 3, MagickColors.magenta);

        expect(image.width).toBe(2);
        expect(image.height).toBe(3);
        expect(pixelColor(image, 0, 0)).toBe('#ff00ffff');
     });

     it('should extent the image with the specified gravity', () => {
         image.backgroundColor = MagickColors.magenta;
         image.extent(2, 3, Gravity.Southeast);

         expect(image.width).toBe(2);
         expect(image.height).toBe(3);
         expect(pixelColor(image, 0, 0)).toBe('#ff00ffff');
      });

      it('should extent the image with the specified geometry', () => {
         image.extent(new MagickGeometry(2, 3));

         expect(image.width).toBe(2);
         expect(image.height).toBe(3);
      });

      it('should extent the image with the specified geometry and offset', () => {
         image.backgroundColor = MagickColors.magenta;
         image.extent(new MagickGeometry(2, 3, -1, -1));

         expect(image.width).toBe(2);
         expect(image.height).toBe(3);
         expect(pixelColor(image, 0, 0)).toBe('#ff00ffff');
      });

      it('should extent the image with the specified geometry and color', () => {
         image.extent(new MagickGeometry(2, 3), MagickColors.magenta);

         expect(image.width).toBe(2);
         expect(image.height).toBe(3);
         expect(pixelColor(image, 1, 1)).toBe('#ff00ffff');
      });

      it('should extent the image with the specified geometry and gravity', () => {
         image.backgroundColor = MagickColors.magenta;
         image.extent(new MagickGeometry(2, 3), Gravity.Southwest);

         expect(image.width).toBe(2);
         expect(image.height).toBe(3);
         expect(pixelColor(image, 0, 0)).toBe('#ff00ffff');
      });

      it('should extent the image with the specified geometry, gravity and color', () => {
         image.extent(new MagickGeometry(2, 3), Gravity.Southwest, MagickColors.magenta);

         expect(image.width).toBe(2);
         expect(image.height).toBe(3);
         expect(pixelColor(image, 0, 0)).toBe('#ff00ffff');
      });
});