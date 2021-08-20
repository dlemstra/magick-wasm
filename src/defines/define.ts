// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickFormat } from '../magick-format';

export interface IDefine {
    readonly format: MagickFormat;
    readonly name: string;
    readonly value: string;
}
