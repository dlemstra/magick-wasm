// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { PrimaryInfo } from './primary-info';

/**
 * Class that contains information about the chromaticity.
 */
export class ChromaticityInfo {
    constructor(red: PrimaryInfo, green: PrimaryInfo, blue: PrimaryInfo, white: PrimaryInfo) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.white = white;
    }

    /**
     * Gets or sets the chromaticity red primary point.
     */
    red: PrimaryInfo;

    /**
     * Gets or sets the chromaticity green primary point.
     */
    green: PrimaryInfo;

    /**
     * Gets or sets the chromaticity blue primary point.
     */
    blue: PrimaryInfo;

    /**
     * Gets or sets the chromaticity white primary point.
     */
    white: PrimaryInfo;
}
