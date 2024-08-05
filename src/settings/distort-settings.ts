/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DistortMethod } from '../enums/distort-method';
import { TemporaryDefines } from '../helpers/temporary-defines';
import { IMagickGeometry } from '../types/magick-geometry';

/**
 * Class that contains setting for the distort operation.
 */
export class DistortSettings {

    constructor(method: DistortMethod) {
        this.method = method;
    }

    /**
     * Gets the distortion method to use.
     */
    readonly method: DistortMethod;

    /**
     * Gets or sets a value indicating whether distort attempt to 'bestfit' the size of the resulting image.
     */
    bestFit = false;

    /**
     * Gets or sets a value to scale the size of the output canvas by this amount to provide a method of
     * Zooming, and for super-sampling the results.
     */
    scale?: number;

    /**
     * Gets or sets the viewport that directly set the output image canvas area and offest to use for the
     * resulting image, rather than use the original images canvas, or a calculated 'bestfit' canvas.
     */
    viewport?: IMagickGeometry;

    /** @internal */
    _setArtifacts(temporaryDefines: TemporaryDefines): void {
        if (this.scale !== undefined)
            temporaryDefines.setArtifact('distort:scale', this.scale.toString());

        if (this.viewport !== undefined)
            temporaryDefines.setArtifact('distort:viewport', this.viewport.toString());
    }
}
