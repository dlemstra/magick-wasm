/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { MagickGeometry } from "../types/magick-geometry";

export class DistortSettings {

    bestFit = false;

    scale?: number;

    viewport?: MagickGeometry;
}