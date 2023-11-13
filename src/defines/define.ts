// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickFormat } from '../enums/magick-format';

/**
 * Interface for a define.
 */
export interface IDefine {
    /**
     * Gets the format to set the define for.
     */
    readonly format: MagickFormat;

    /**
     * Gets the name of the define.
     */
    readonly name: string;

    /**
     * Gets the value of the define.
     */
    readonly value: string;
}
