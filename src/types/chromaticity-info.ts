/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IPrimaryInfo } from './primary-info';

/**
 * Class that contains information about the chromaticity.
 */
export interface IChromaticityInfo {
    /**
     * Gets the chromaticity blue primary point.
     */
    readonly blue: IPrimaryInfo;

    /**
     * Gets the chromaticity green primary point.
     */
    readonly green: IPrimaryInfo;

    /**
     * Gets the chromaticity red primary point.
     */
    readonly red: IPrimaryInfo;

    /**
     * Gets the chromaticity white primary point.
     */
    readonly white: IPrimaryInfo;
}

export class ChromaticityInfo implements IChromaticityInfo {
    constructor(red: IPrimaryInfo, green: IPrimaryInfo, blue: IPrimaryInfo, white: IPrimaryInfo) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.white = white;
    }

    /**
     * Gets the chromaticity red primary point.
     */
    readonly red: IPrimaryInfo;

    /**
     * Gets the chromaticity green primary point.
     */
    readonly green: IPrimaryInfo;

    /**
     * Gets the chromaticity blue primary point.
     */
    readonly blue: IPrimaryInfo;

    /**
     * Gets the chromaticity white primary point.
     */
    readonly white: IPrimaryInfo;
}
