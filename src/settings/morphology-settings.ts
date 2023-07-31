// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Channels } from '../channels';
import { Kernel } from '../kernel';
import { MagickGeometry } from '../magick-geometry';
import { MorphologyMethod } from '../morphology-method';
import { Percentage } from '../percentage';

export class MorphologySettings {
    channels: Channels = Channels.Composite;
    convolveBias: Percentage | undefined;
    convolveScale: MagickGeometry | undefined;
    iterations: number = 1;
    readonly method: MorphologyMethod;
    readonly kernel: string;

    constructor(method: MorphologyMethod, kernel: Kernel | string, args?: string) {
        this.method = method;
        this.kernel = kernel;
        if (args !== undefined)
            this.kernel += `:${args}`;
    }
}
