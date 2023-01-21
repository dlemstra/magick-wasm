// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Disposable } from '../internal/disposable';
import { MagickColor } from '../magick-color';
import { MagickSettings } from './magick-settings';
import { NativeDrawingSettings } from './native-drawing-settings';

export class DrawingSettings {
    backgroundColor?: MagickColor;

    fillColor?: MagickColor;

    font?: string;

    fontPointsize?: number;

    strokeColor?: MagickColor;

    strokeWidth?: number;

    /** @internal */
    static _create(settings: MagickSettings): DrawingSettings {
        const instance = new DrawingSettings();

        instance.fillColor = settings.fillColor;
        instance.font = settings.font;
        instance.fontPointsize = settings.fontPointsize;
        instance.strokeColor = settings.strokeColor;
        instance.strokeWidth = settings.strokeWidth;

        return instance;
    }

    /** @internal */
    _use<TReturnType>(func: (settings: NativeDrawingSettings) => TReturnType): TReturnType {
        const settings = new NativeDrawingSettings(this);
        return Disposable._disposeAfterExecution(settings, func);
    }
}
