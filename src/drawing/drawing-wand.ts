/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Disposable } from '../internal/disposable';
import { Exception } from '../internal/exception/exception';
import { Gravity } from '../enums/gravity';
import { IDisposable } from '../disposable';
import { IDrawable } from './drawable';
import { ImageMagick } from '../image-magick';
import { IMagickImage } from '../magick-image';
import { IMagickColor } from '../magick-color';
import { NativeInstance } from '../native-instance';
import { PaintMethod } from '../enums/paint-method';
import { TextAlignment } from '../enums/text-alignment';
import { TextDecoration } from '../enums/text-decoration';
import { _withString } from '../internal/native/string';
import { TypeMetric } from '../types/type-metric';

/**
 * Interface for drawing on an wand.
 */
export interface IDrawingWand extends IDisposable {
    affine(scaleX: number, scaleY: number, shearX: number, shearY: number, translateX: number, translateY: number): void;
    borderColor(value: IMagickColor): void;
    color(x: number, y: number, paintMethod: number): void;
    draw(drawables: IDrawable[]): void;
    fillColor(value: IMagickColor): void;
    fillOpacity(value: number): void;
    font(family: string): void;
    fontPointSize(value: number): void;
    gravity(value: Gravity): void;
    line(startX: number, startY: number, endX: number, endY: number): void;
    pathFinish(): void;
    pathLineToAbs(x: number, y: number): void;
    pathLineToRel(x: number, y: number): void;
    pathMoveToAbs(x: number, y: number): void;
    pathMoveToRel(x: number, y: number): void;
    pathStart(): void;
    point(x: number, y: number): void;
    rectangle(upperLeftX: number, upperLeftY: number, lowerRightX: number, lowerRightY: number): void;
    roundRectangle(upperLeftX: number, upperLeftY: number, lowerRightX: number, lowerRightY: number, cornerWidth: number, cornerHeight: number): void;
    strokeColor(value: IMagickColor): void;
    strokeWidth(value: number): void
    text(x: number, y: number, value: string): void;
    textAlignment(value: TextAlignment): void;
    textAntialias(value: boolean): void;
    textDecoration(value: TextDecoration): void;
    textInterlineSpacing(value: number): void;
    textInterwordspacing(value: number): void;
    textKerning(value: number): void;
    textUnderColor(value: IMagickColor): void;
}

export class DrawingWand extends NativeInstance implements IDrawingWand {
    private constructor(image: IMagickImage) {
        const instance = image.settings._drawing._use(settings => {
            return ImageMagick._api._DrawingWand_Create(image._instance, settings._instance);
        });
        const disposeMethod = ImageMagick._api._DrawingWand_Dispose;
        super(instance, disposeMethod);
    }

    affine(scaleX: number, scaleY: number, shearX: number, shearY: number, translateX: number, translateY: number): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_Affine(this._instance, scaleX, scaleY, shearX, shearY, translateX, translateY, exception);
        });
    }

    borderColor(value: IMagickColor): void {
        Exception.usePointer(exception => {
            value._use(valuePtr => {
                ImageMagick._api._DrawingWand_BorderColor(this._instance, valuePtr, exception);
            });
        });
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

    fillColor(value: IMagickColor): void {
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

    /** @internal */
    fontTypeMetrics(value: string, ignoreNewlines: boolean): TypeMetric | null {
        return Exception.usePointer(exception => {
            return _withString(value, (valuePtr) => {
                const instance = ImageMagick._api._DrawingWand_FontTypeMetrics(this._instance, valuePtr, ignoreNewlines ? 1 : 0, exception);
                return TypeMetric._create(instance);
            });
        });
    }

    gravity(value: Gravity): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_Gravity(this._instance, value, exception);
        });
    }

    line(startX: number, startY: number, endX: number, endY: number): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_Line(this._instance, startX, startY, endX, endY, exception);
        });
    }

    pathFinish(): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_PathFinish(this._instance, exception);
        });
    }

    pathLineToAbs(x: number, y: number): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_PathLineToAbs(this._instance, x, y, exception);
        });
    }

    pathLineToRel(x: number, y: number): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_PathLineToRel(this._instance, x, y, exception);
        });
    }

    pathMoveToAbs(x: number, y: number): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_PathMoveToAbs(this._instance, x, y, exception);
        });
    }

    pathMoveToRel(x: number, y: number): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_PathMoveToRel(this._instance, x, y, exception);
        });
    }

    pathStart(): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_PathStart(this._instance, exception);
        });
    }

    point(x: number, y: number): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_Point(this._instance, x, y, exception);
        });
    }

    rectangle(upperLeftX: number, upperLeftY: number, lowerRightX: number, lowerRightY: number): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_Rectangle(this._instance, upperLeftX, upperLeftY, lowerRightX, lowerRightY, exception);
        });
    }

    roundRectangle(upperLeftX: number, upperLeftY: number, lowerRightX: number, lowerRightY: number, cornerWidth: number, cornerHeight: number): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_RoundRectangle(this._instance, upperLeftX, upperLeftY, lowerRightX, lowerRightY, cornerWidth, cornerHeight, exception);
        });
    }

    strokeColor(value: IMagickColor): void {
        Exception.usePointer(exception => {
            value._use(valuePtr => {
                ImageMagick._api._DrawingWand_StrokeColor(this._instance, valuePtr, exception);
            });
        });
    }

    strokeWidth(value: number): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_StrokeWidth(this._instance, value, exception);
        });
    }

    text(x: number, y: number, value: string): void {
        Exception.usePointer(exception => {
            _withString(value, valuePtr => {
                ImageMagick._api._DrawingWand_Text(this._instance, x, y, valuePtr, exception);
            });
        });
    }

    textAlignment(value: TextAlignment): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_TextAlignment(this._instance, value, exception);
        });
    }

    textAntialias(value: boolean): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_TextAntialias(this._instance, value ? 1 : 0, exception);
        });
    }

    textDecoration(value: TextDecoration): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_TextDecoration(this._instance, value, exception);
        });
    }

    textInterlineSpacing(value: number): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_TextInterlineSpacing(this._instance, value, exception);
        });
    }

    textInterwordspacing(value: number): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_TextInterwordSpacing(this._instance, value, exception);
        });
    }

    textKerning(value: number): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_TextKerning(this._instance, value, exception);
        });
    }

    textUnderColor(value: IMagickColor): void {
        Exception.usePointer(exception => {
            value._use(valuePtr => {
                ImageMagick._api._DrawingWand_TextUnderColor(this._instance, valuePtr, exception);
            });
        });
    }

    /** @internal */
    static _use<TReturnValue>(image: IMagickImage, func: (wand: DrawingWand) => TReturnValue): TReturnValue {
        const wand = new DrawingWand(image);
        return Disposable._disposeAfterExecution(wand, func);
    }
}
