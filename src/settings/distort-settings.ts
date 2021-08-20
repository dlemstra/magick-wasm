// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickGeometry } from '../magick-geometry';
import { IMagickImage } from '../magick-image';

export class DistortSettings {

    bestFit = false;

    scale?: number;

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
