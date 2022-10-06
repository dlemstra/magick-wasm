// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../image-magick';
import { Exception } from '../internal/exception/exception';
import { NativeInstance } from '../internal/native-instance';
import { _withString } from '../internal/native/string';
import { MagickColor } from '../magick-color';
import { IMagickImage } from '../magick-image';
import { PaintMethod } from '../paint-method';
import { DrawingSettings } from '../settings/drawing-settings';
import { MagickSettings } from '../settings/magick-settings';
import { IDrawable } from './drawable';

export interface IDrawingWand extends NativeInstance {
    color(x: number, y: number, paintMethod: number): void;
    draw(drawables: IDrawable[]): void;
    fillColor(value: MagickColor): void;
    fillOpacity(value: number): void;
    font(family: string): void;
    fontPointSize(value: number): void;
    text(x: number, y: number, value: string): void;
}

export class DrawingWand extends NativeInstance implements IDrawingWand {
    private constructor(image: IMagickImage, magickSettings: MagickSettings) {
        const drawingSettings = DrawingSettings._create(magickSettings);
        const instance = drawingSettings._use(settings => ImageMagick._api._DrawingWand_Create(image._instance, settings._instance));
        const disposeMethod = ImageMagick._api._DrawingWand_Dispose;
        super(instance, disposeMethod);
    }

    color(x: number, y: number, paintMethod: PaintMethod): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_Color(this._instance, x, y, paintMethod, exception);
        });
    }

    draw(drawables: IDrawable[]): void {
        drawables.forEach(drawable => {
            drawable.draw(this);
        });

        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_Render(this._instance, exception);
        });
    }

    fillColor(value: MagickColor): void {
        Exception.usePointer(exception => {
            value._use(valuePtr => {
                ImageMagick._api._DrawingWand_FillColor(this._instance, valuePtr, exception);
            });
        });
    }

    fillOpacity(value: number): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_FillOpacity(this._instance, value, exception);
        });
    }

    font(fileName: string): void {
        Exception.usePointer(exception => {
            _withString(fileName, ptr => {
                ImageMagick._api._DrawingWand_Font(this._instance, ptr, exception);
            });
        });
    }

    fontPointSize(value: number): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_FontPointSize(this._instance, value, exception);
        });
    }

    text(x: number, y: number, value: string): void {
        Exception.usePointer(exception => {
            _withString(value, valuePtr => {
                ImageMagick._api._DrawingWand_Text(this._instance, x, y, valuePtr, exception);
            });
        });
    }

    /** @internal */
    static _create(image: IMagickImage, settings: MagickSettings): DrawingWand {
        return new DrawingWand(image, settings);
    }
}
