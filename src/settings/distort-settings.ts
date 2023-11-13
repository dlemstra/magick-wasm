// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickGeometry } from '../magick-geometry';
import { IMagickImage } from '../magick-image';

/**
 * Class that contains setting for the distort operation.
 */
export class DistortSettings {

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
    viewport?: MagickGeometry;

    /** @internal */
    _removeArtifacts(image: IMagickImage): void {
        if (this.scale !== undefined)
            image.removeArtifact('distort:scale');
        if (this.viewport !== undefined)
            image.removeArtifact('distort:viewport');
    }

    /** @internal */
    _setArtifacts(image: IMagickImage): void {
        if (this.scale !== undefined)
            image.setArtifact('distort:scale', this.scale.toString());
        if (this.viewport !== undefined)
            image.setArtifact('distort:viewport', this.viewport.toString());
    }
}
