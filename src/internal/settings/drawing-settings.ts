/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Disposable } from '../disposable';
import { FillRule } from '../../enums/fill-rule';
import { Gravity } from '../../enums/gravity';
import { IDrawableAffine } from '../../drawing/drawable-affine';
import { IMagickColor } from '../../magick-color';
import { NativeDrawingSettings } from './native-drawing-settings';

/** @internal */
export class DrawingSettings {
    affine?: IDrawableAffine;

    borderColor?: IMagickColor;

    backgroundColor?: IMagickColor;

    fillColor?: IMagickColor;

    fillRule?: FillRule;

    font?: string;

    fontPointsize?: number;

    strokeColor?: IMagickColor;

    strokeDashArray?: number[];

    strokeDashOffset?: number;

    strokeWidth?: number;

    textAntiAlias?: boolean;

    textGravity?: Gravity;

    textKerning?: number;

    textUnderColor?: IMagickColor;

    _use<TReturnType>(func: (settings: NativeDrawingSettings) => TReturnType): TReturnType {
        const settings = new NativeDrawingSettings(this);
        return Disposable._disposeAfterExecution(settings, func);
    }
}
