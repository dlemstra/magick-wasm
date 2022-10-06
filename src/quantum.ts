// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from './image-magick';

export class Quantum {
    static get depth(): number { return ImageMagick._api._Quantum_Depth_Get(); }

    static get max(): number { return ImageMagick._api._Quantum_Max_Get(); }
}
