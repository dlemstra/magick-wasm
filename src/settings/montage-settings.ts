// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Disposable } from '../internal/disposable';
import { Gravity } from '../gravity';
import { MagickColor } from '../magick-color';
import { MagickGeometry } from '../magick-geometry';
import { NativeMontageSettings } from './native-montage-settings';

export class MontageSettings {
    backgroundColor? : MagickColor;

    borderColor? : MagickColor;

    borderWidth?: number;

    fillColor? : MagickColor;

    font?: string;

    fontPointsize?: number;

    frameGeometry?: MagickGeometry;

    geometry?: MagickGeometry;

    gravity?: Gravity;

    label?: string;

    shadow?: boolean;

    strokeColor? : MagickColor;

    textureFileName?: string;

    tileGeometry?: MagickGeometry;

    title?: string;

    transparentColor? : MagickColor;

    /** @internal */
    _use<TReturnType>(func: (settings: NativeMontageSettings) => TReturnType): TReturnType
    /** @internal */
    _use<TReturnType>(func: (settings: NativeMontageSettings) => Promise<TReturnType>): Promise<TReturnType>
    _use<TReturnType>(func: (settings: NativeMontageSettings) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        const settings = new NativeMontageSettings(this);
        return Disposable._disposeAfterExecution(settings, func);
    }
}
