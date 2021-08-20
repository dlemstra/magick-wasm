// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IDefine } from './define';
import { IDefines } from './defines';
import { MagickFormat } from '../magick-format';
import { MagickDefine } from './magick-define';

export abstract class DefinesCreator implements IDefines {
    protected format: MagickFormat;

    constructor(format: MagickFormat) {
        this.format = format;
    }

    abstract getDefines(): IDefine[]

    createDefine(name: string, value: boolean): MagickDefine;
    createDefine(name: string, value: number): MagickDefine;
    createDefine(name: string, value: string): MagickDefine;
    createDefine(name: string, value: boolean | number | string): MagickDefine {
        if (typeof value === 'boolean')
            return new MagickDefine(this.format, name, value ? 'true' : 'false');

        if (typeof value === 'string')
            return new MagickDefine(this.format, name, value);

        return new MagickDefine(this.format, name, value.toString());
    }
}
