/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ErrorMetric } from '../enums/error-metric';
import { IMagickColor } from '../magick-color';

/**
 * Class that contains setting for the compare operation.
 */
export class CompareSettings {

    constructor(metric: ErrorMetric) {
        this.metric = metric;
    }

    /**
     * Gets the distortion method to use.
     */
    readonly metric: ErrorMetric;

    /**
     * Gets or sets the color that emphasize pixel differences.
     */
    highlightColor?: IMagickColor;

    /**
     * Gets or sets the color that de-emphasize pixel differences.
     */
    lowlightColor?: IMagickColor;

    /**
     * Gets or sets the color of pixels that are inside the read mask.
     */
    masklightColor?: IMagickColor;
}
