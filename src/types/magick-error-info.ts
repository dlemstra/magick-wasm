/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from '../image-magick';
import { IMagickImage } from '../magick-image';

/**
 * An ImageMagick connected component object.
 */
export class MagickErrorInfo {
    private constructor(meanErrorPerPixel: number, normalizedMeanError: number, normalizedMaximumError: number) {
        this.meanErrorPerPixel = meanErrorPerPixel;
        this.normalizedMeanError = normalizedMeanError;
        this.normalizedMaximumError = normalizedMaximumError;
    }

    /**
     * Gets the mean error per pixel computed when an image is color reduced.
     */
    readonly meanErrorPerPixel: number;

    /**
     * Gets the normalized maximum error per pixel computed when an image is color reduced.
     */
    readonly normalizedMaximumError: number;

    /**
     * Gets the normalized mean error per pixel computed when an image is color reduced.
     */
    readonly normalizedMeanError: number;

    /** @internal */
    static _create(image: IMagickImage): MagickErrorInfo {
        const meanErrorPerPixel = ImageMagick._api._MagickImage_MeanErrorPerPixel_Get(image._instance);
        const normalizedMeanError = ImageMagick._api._MagickImage_NormalizedMeanError_Get(image._instance);
        const normalizedMaximumError = ImageMagick._api._MagickImage_NormalizedMaximumError_Get(image._instance);
        return new MagickErrorInfo(meanErrorPerPixel, normalizedMeanError, normalizedMaximumError);
    }
}
