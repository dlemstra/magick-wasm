/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Disposable } from '../disposable';
import { IMagickColor } from '../../magick-color';
import { NativeDrawingSettings } from './native-drawing-settings';

/** @internal */
export class DrawingSettings {
    backgroundColor?: IMagickColor;

    fillColor?: IMagickColor;

    font?: string;

    fontPointsize?: number;

    strokeColor?: IMagickColor;

    strokeWidth?: number;

    _use<TReturnType>(func: (settings: NativeDrawingSettings) => TReturnType): TReturnType {
        const settings = new NativeDrawingSettings(this);
        return Disposable._disposeAfterExecution(settings, func);
    }
}
