/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from '../../image-magick';
import { size } from '@dlemstra/magick-native';

/** @internal */
export function _castToSize(instance: number): size {
    return ImageMagick._api._CastToSize(instance);
}
