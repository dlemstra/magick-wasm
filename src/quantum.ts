/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from './image-magick';

/**
 * Class that can be used to acquire information about the Quantum.
 */
export class Quantum {
    /**
     * Gets the quantum depth.
     */
    static get depth(): number { return ImageMagick._api._Quantum_Depth_Get(); }

    /**
     * Gets the maximum value of the quantum.
     */
    static get max(): number { return ImageMagick._api._Quantum_Max_Get(); }
}
