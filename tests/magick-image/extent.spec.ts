// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { Gravity } from '../../src/gravity';
import { MagickColors } from '../../src/magick-colors';
import { MagickImage } from '../../src/magick-image';
import { MagickGeometry } from '../../src/magick-geometry';
import { colorAssert } from '../color-assert';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
    image.read(MagickColors.Black, 1, 1);
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
        image.extent(2, 3, MagickColors.Magenta);

        expect(image.width).toBe(2);
        expect(image.height).toBe(3);
        colorAssert(image, 0, 0, MagickColors.Magenta);
     });

     it('should extent the image with the specified gravity', () => {
         image.backgroundColor = MagickColors.Magenta;
         image.extent(2, 3, Gravity.Southeast);

         expect(image.width).toBe(2);
         expect(image.height).toBe(3);
         colorAssert(image, 0, 0, MagickColors.Magenta);
      });

      it('should extent the image with the specified geometry', () => {
         image.extent(new MagickGeometry(2, 3));

         expect(image.width).toBe(2);
         expect(image.height).toBe(3);
      });

      it('should extent the image with the specified geometry and offset', () => {
         image.backgroundColor = MagickColors.Magenta;
         image.extent(new MagickGeometry(-1, -1, 2, 3));

         expect(image.width).toBe(2);
         expect(image.height).toBe(3);
         colorAssert(image, 0, 0, MagickColors.Magenta);
      });

      it('should extent the image with the specified geometry and color', () => {
         image.extent(new MagickGeometry(2, 3), MagickColors.Magenta);

         expect(image.width).toBe(2);
         expect(image.height).toBe(3);
         colorAssert(image, 1, 1, MagickColors.Magenta);
      });

      it('should extent the image with the specified geometry and gravity', () => {
         image.backgroundColor = MagickColors.Magenta;
         image.extent(new MagickGeometry(2, 3), Gravity.Southwest);

         expect(image.width).toBe(2);
         expect(image.height).toBe(3);
         colorAssert(image, 0, 0, MagickColors.Magenta);
      });

      it('should extent the image with the specified geometry, gravity and color', () => {
         image.extent(new MagickGeometry(2, 3), Gravity.Southwest, MagickColors.Magenta);

         expect(image.width).toBe(2);
         expect(image.height).toBe(3);
         colorAssert(image, 0, 0, MagickColors.Magenta);
      });
});