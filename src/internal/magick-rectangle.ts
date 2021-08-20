// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../image-magick';
import { MagickGeometry } from '../magick-geometry';
import { MagickImage } from '../magick-image';
import { Percentage } from '../percentage';

/** @internal */
export class MagickRectangle {
    static use<TReturnType>(image: MagickImage, geometry: MagickGeometry, func: (rectangle: number) => TReturnType): TReturnType {
        const rectangle = ImageMagick._api._MagickRectangle_Create();
        try {
            ImageMagick._api._MagickRectangle_X_Set(rectangle, geometry.x);
            ImageMagick._api._MagickRectangle_Y_Set(rectangle, geometry.y);

            let width = geometry.width;
            let height = geometry.height;
            if (geometry.isPercentage) {
                width =  new Percentage(geometry.width).multiply(image.width);
                height =  new Percentage(geometry.height).multiply(image.height);
            }

            ImageMagick._api._MagickRectangle_Width_Set(rectangle, width);
            ImageMagick._api._MagickRectangle_Height_Set(rectangle, height);

            return func(rectangle);
        } finally {
            ImageMagick._api._MagickRectangle_Dispose(rectangle);
        }
    }
}
