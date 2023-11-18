// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Disposable } from '../disposable';
import { IMagickColor } from '../../magick-color';
import { MagickSettings } from '../../settings/magick-settings';
import { NativeDrawingSettings } from '../../settings/native-drawing-settings';

/** @internal */
export class DrawingSettings {
    backgroundColor?: IMagickColor;

    fillColor?: IMagickColor;

    font?: string;

    fontPointsize?: number;

    strokeColor?: IMagickColor;

    strokeWidth?: number;

    static _create(settings: MagickSettings): DrawingSettings {
        const instance = new DrawingSettings();

        instance.fillColor = settings.fillColor;
        instance.font = settings.font;
        instance.fontPointsize = settings.fontPointsize;
        instance.strokeColor = settings.strokeColor;
        instance.strokeWidth = settings.strokeWidth;

        return instance;
    }

    _use<TReturnType>(func: (settings: NativeDrawingSettings) => TReturnType): TReturnType {
        const settings = new NativeDrawingSettings(this);
        return Disposable._disposeAfterExecution(settings, func);
    }
}
