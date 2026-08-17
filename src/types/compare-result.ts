/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IMagickImage } from '../magick-image';
import { NativePointer } from '@dlemstra/magick-native';

/**
 *  Compare result.
 */
export class CompareResult {
    private constructor(distortion: NativePointer, difference: IMagickImage) {
        this.distortion = distortion;
        this.difference = difference;
    }

    /**
     * Gets the difference image.
     */
    readonly difference;
    /**
     * Gets the distortion.
     */
    readonly distortion;

    /** @internal */
    static _create(distortion: NativePointer, difference: IMagickImage): CompareResult {
        return new CompareResult(distortion, difference);
    }
}
