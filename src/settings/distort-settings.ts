/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { MagickGeometry } from "../magick-geometry";
import { MagickImage } from "../magick-image";

export class DistortSettings {

    bestFit = false;

    scale?: number;

    viewport?: MagickGeometry;

    /** @internal */
    _setArtifacts(image: MagickImage): void {
        if (this.scale !== undefined)
            image.setArtifact('distort:scale', this.scale.toString());
    }
}