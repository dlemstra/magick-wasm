// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Channels } from '../enums/channels';
import { Kernel } from '../enums/kernel';
import { MagickGeometry } from '../magick-geometry';
import { MorphologyMethod } from '../enums/morphology-method';
import { Percentage } from '../percentage';

/**
 * Class that contains setting for the morphology operation.
 */
export class MorphologySettings {
    constructor(method: MorphologyMethod, kernel: Kernel | string, args?: string) {
        this.method = method;
        this.kernel = kernel;
        if (args !== undefined)
            this.kernel += `:${args}`;
    }

    /**
     * Gets or sets the channels to apply the kernel to.
     */
    channels: Channels = Channels.Composite;

    /**
     * Gets or sets the bias to use when the method is Convolve.
     */
    convolveBias: Percentage | undefined;

    /**
     * Gets or sets the scale to use when the method is Convolve.
     */
    convolveScale: MagickGeometry | undefined;

    /**
     * Gets or sets the number of iterations.
     */
    iterations: number = 1;

    /**
     * Gets or sets built-in kernel.
     */
    readonly kernel: string;

    /**
     * Gets or sets the morphology method.
     */
    readonly method: MorphologyMethod;

}
