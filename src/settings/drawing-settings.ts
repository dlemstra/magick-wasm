// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

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
        const instace = new DrawingSettings();

        instace.fillColor = settings.fillColor;
        instace.font = settings.font;
        instace.fontPointsize = settings.fontPointsize;
        instace.strokeColor = settings.strokeColor;
        instace.strokeWidth = settings.strokeWidth;

        return instace;
    }

    /** @internal */
    _use<TReturnType>(func: (settings: NativeDrawingSettings) => TReturnType): TReturnType {
        const settings = new NativeDrawingSettings(this);
        try {
            return func(settings);
        } finally {
            settings.dispose();
        }
    }
}
