/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorSpace } from '../enums/color-space';
import { DitherMethod } from '../enums/dither-method';
import { Disposable } from '../internal/disposable';
import { NativeQuantizeSettings } from './native-quantize-settings';

/**
 * Class that contains setting for quantize operations.
 */
export class QuantizeSettings {
    constructor() {
        this.colors = 256;
        this.colorSpace = ColorSpace.Undefined;
        this.ditherMethod = DitherMethod.Riemersma;
        this.measureErrors = false;
        this.treeDepth = 0;
    }

    /**
     * Gets or sets the maximum number of colors to quantize to.
     */
    colors: number;

    /**
     * Gets or sets the colorspace to quantize in.
     */
    colorSpace: ColorSpace;

    /// <summary>
    /// Gets or sets the dither method to use.
    /// </summary>
    ditherMethod?: DitherMethod;

    /// <summary>
    /// Gets or sets a value indicating whether errors should be measured.
    /// </summary>
    measureErrors: boolean;

    /// <summary>
    /// Gets or sets the quantization tree-depth.
    /// </summary>
    treeDepth: number;

    /** @internal */
    _use(func: (settings: NativeQuantizeSettings) => void): void {
        const settings = new NativeQuantizeSettings(this);
        return Disposable._disposeAfterExecution(settings, func);
    }
}
