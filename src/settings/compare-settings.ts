/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ErrorMetric } from '../enums/error-metric';
import { IMagickColor } from '../magick-color';
import { TemporaryDefines } from '../helpers/temporary-defines';

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

    /** @internal */
    _setArtifacts(temporaryDefines: TemporaryDefines): void {
        if (this.highlightColor !== undefined)
            temporaryDefines.setArtifact('compare:highlight-color', this.highlightColor);

        if (this.lowlightColor !== undefined)
            temporaryDefines.setArtifact('compare:lowlight-color', this.lowlightColor);

        if (this.masklightColor !== undefined)
            temporaryDefines.setArtifact('compare:masklight-color', this.masklightColor);
    }
}
