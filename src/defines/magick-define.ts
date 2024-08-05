/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IDefine } from './define';
import { MagickFormat } from '../enums/magick-format';

export class MagickDefine implements IDefine {
    /**
     * Initializes a new instance of the {@link MagickDefine} class.
     * @param format
     * @param name The name of the define.
     * @param value The value of the define.
     */
    constructor(format: MagickFormat, name: string, value: string) {
        this.format = format;
        this.name = name;
        this.value = value;
    }

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
