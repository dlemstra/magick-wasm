// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickFormat } from '../magick-format';
import { IDefine } from './define';

export class MagickDefine implements IDefine {
    readonly format: MagickFormat;

    readonly name: string;

    readonly value: string;

    constructor(format: MagickFormat, name: string, value: string) {
        this.format = format;
        this.name = name;
        this.value = value;
    }
}
