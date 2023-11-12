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
     * Gets the chromaticity red primary point.
     */
    readonly red: PrimaryInfo;

    /**
     * Gets the chromaticity green primary point.
     */
    readonly green: PrimaryInfo;

    /**
     * Gets the chromaticity blue primary point.
     */
    readonly blue: PrimaryInfo;

    /**
     * Gets the chromaticity white primary point.
     */
    readonly white: PrimaryInfo;
}
