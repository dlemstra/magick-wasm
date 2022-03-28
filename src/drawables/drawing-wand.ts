// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { FontStretch } from '../font-stretch';
import { FontStyleType } from '../font-style-type';
import { FontWeight } from '../font-weight';
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
    draw(drawables: IDrawable[]): void;

    color(x: number, y: number, paintMethod: number): void;
    fillColor(value: MagickColor): void;
    fillOpacity(value: number): void;
    font(family: string): void;
    fontFamily(family: string, style: FontStyleType, weight: FontWeight, stretch: FontStretch): void;
    fontPointSize(value: number): void;
    text(x: number, y: number, value: string): void;
}

export class DrawingWand extends NativeInstance implements IDrawingWand {
    private constructor(image: IMagickImage, magickSettings: MagickSettings) {
        const drawingSettings = DrawingSettings._create(magickSettings);
        const instance = drawingSettings._use(settings => {
            return ImageMagick._api._DrawingWand_Create(image._instance, settings._instance);
        });
        const disposeMethod = ImageMagick._api._DrawingWand_Dispose;
        super(instance, disposeMethod);
    }

    /** @internal */
    static _create(image: IMagickImage, settings: MagickSettings): DrawingWand {
        return new DrawingWand(image, settings);
    }

    draw(drawables: IDrawable[]): void {
        drawables.forEach(drawable => {
            drawable.draw(this)
        });

        return Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_Render(this._instance, exception);
        });
    }

    color(x: number, y: number, paintMethod: PaintMethod): void {
        return Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_Color(this._instance, x, y, paintMethod, exception);
        });
    }

    fillColor(value: MagickColor): void {
        return Exception.usePointer(exception => {
            value._use(valuePtr => {
                ImageMagick._api._DrawingWand_FillColor(this._instance, valuePtr, exception);
            });
        });
    }

    fillOpacity(value: number): void {
        return Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_FillOpacity(this._instance, value, exception);
        });
    }

    font(fileName: string): void {
        return Exception.usePointer(exception => {
            _withString(fileName, ptr => {
                ImageMagick._api._DrawingWand_Font(this._instance, ptr, exception);
            });
        });
    }

    fontFamily(family: string, style: FontStyleType, weight: FontWeight, stretch: FontStretch): void {
        return Exception.usePointer(exception => {
            _withString(family, ptr => {
                ImageMagick._api._DrawingWand_FontFamily(this._instance, ptr, style, weight, stretch, exception);
            });
        });
    }

    fontPointSize(value: number): void {
        return Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_FontPointSize(this._instance, value, exception);
        });
    }

    text(x: number, y: number, value: string): void {
        return Exception.usePointer(exception => {
            _withString(value, valuePtr => {
                ImageMagick._api._DrawingWand_Text(this._instance, x, y, valuePtr, exception);
            });
        });
    }
}
