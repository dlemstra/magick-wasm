/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableAffine } from "./drawable-affine";
import { DrawableBorderColor } from "./drawable-border-color";
import { DrawableColor } from "./drawable-color";
import { DrawableFillColor } from "./drawable-fill-color";
import { DrawableFillOpacity } from "./drawable-fill-opacity";
import { DrawableFillRule } from "./drawable-fill-rule";
import { DrawableFont } from "./drawable-font";
import { DrawableFontPointSize } from "./drawable-font-point-size";
import { DrawableGravity } from "./drawable-gravity";
import { DrawableLine } from "./drawable-line";
import { DrawablePath } from "./drawable-path";
import { DrawablePoint } from "./drawable-point";
import { DrawableRectangle } from "./drawable-rectangle";
import { DrawableRoundRectangle } from "./drawable-round-rectangle";
import { DrawableStrokeColor } from "./drawable-stroke-color";
import { DrawableStrokeDashArray } from "./drawable-stroke-dash-array";
import { DrawableStrokeDashOffset } from "./drawable-stroke-dash-offset";
import { DrawableStrokeWidth } from "./drawable-stroke-width";
import { DrawableText } from "./drawable-text";
import { DrawableTextAlignment } from "./drawable-text-alignment";
import { DrawableTextAntialias } from "./drawable-text-antialias";
import { DrawableTextDecoration } from "./drawable-text-decoration";
import { DrawableTextInterlineSpacing } from "./drawable-text-interline-spacing";
import { DrawableTextInterwordSpacing } from "./drawable-text-interword-spacing";
import { DrawableTextKerning } from "./drawable-text-kerning";
import { DrawableTextUnderColor } from "./drawable-text-under-color";
import { DrawingWand } from "./drawing-wand";
import { FillRule } from "../enums/fill-rule";
import { Gravity } from "../enums/gravity";
import { IDrawable } from "./drawable";
import { IMagickImage, MagickImage } from "../magick-image";
import { IMagickColor } from "../magick-color";
import { IPath } from "./path";
import { MagickColors } from "../magick-colors";
import { PaintMethod } from "../enums/paint-method";
import { Paths } from "./paths";
import { Percentage } from "../types/percentage";
import { TextAlignment } from "../enums/text-alignment";
import { TextDecoration } from "../enums/text-decoration";
import { TypeMetric } from "../types/type-metric";

export class Drawables {
    private readonly _drawables: IDrawable[] = [];

    /**
     * Adds a {@link DrawableAffine} to the drawables.
     * @param scaleX The X coordinate scaling element.
     * @param scaleY The Y coordinate scaling element.
     * @param shearX The X coordinate shearing element.
     * @param shearY The Y coordinate shearing element.
     * @param translateX The X coordinate of the translation element.
     * @param translateY The Y coordinate of the translation element.
     */
    affine(scaleX: number = 1, scaleY: number = 1, shearX: number = 0, shearY: number = 0, translateX: number = 0, translateY: number = 0) {
        this._drawables.push(new DrawableAffine(scaleX, scaleY, shearX, shearY, translateX, translateY));
        return this;
    }

    color(x: number, y: number, paintMethod: PaintMethod): Drawables {
        this._drawables.push(new DrawableColor(x, y, paintMethod));
        return this;
    }

    /**
     * Adds a {@link DrawableBorderColor} to the drawables.
     * @param color The color to use.
     */
    borderColor(color: IMagickColor): Drawables {
        this._drawables.push(new DrawableBorderColor(color));
        return this;
    }

    /**
     * Adds {@link DrawableTextAntialias.enabled} to the drawables.
     */
    disableTextAntialias(): Drawables {
        this._drawables.push(DrawableTextAntialias.disabled);
        return this;
    }

    /**
     * Draw on the specified image.
     * @param image The image to draw on.
     */
    draw(image: IMagickImage): Drawables {
        image.draw(this._drawables);
        return this;
    }

    /**
     * Adds {@link DrawableTextAntialias.enabled} to the drawables.
     */
    enableTextAntialias(): Drawables {
        this._drawables.push(DrawableTextAntialias.enabled);
        return this;
    }

    /**
     * Adds a {@link DrawableFillColor} to the drawables.
     * @param color The color to use.
     */
    fillColor(color: IMagickColor): Drawables {
        this._drawables.push(new DrawableFillColor(color));
        return this;
    }

    /**
     * Adds a {@link DrawableFillOpacity} to the drawables.
     * @param opacity The opacity.
     */
    fillOpacity(opacity: Percentage): Drawables {
        this._drawables.push(new DrawableFillOpacity(opacity));
        return this;
    }

    /**
     * Adds a {@link DrawableFillRule} to the drawables.
     * @param fillRule The rule to use when filling drawn objects.
     */
    fillRule(value: FillRule): Drawables {
        this._drawables.push(new DrawableFillRule(value));
        return this;
    }

    /**
     * Adds a {@link DrawableFont} to the drawables.
     * @param font The name of the font that was registered.
     */
    font(font: string): Drawables {
        this._drawables.push(new DrawableFont(font));
        return this;
    }

    /**
     * Adds a {@link DrawableFontPointSize} to the drawables.
     * @param pointSize The point size.
     */
    fontPointSize(pointSize: number): Drawables {
        this._drawables.push(new DrawableFontPointSize(pointSize));
        return this;
    }

    /**
     * Obtain font metrics for text string given current font, pointsize, and density settings.
     * @param text The text to get the metrics for.
     * @param ignoreNewlines A value indicating whether newlines should be ignored.
     */
    fontTypeMetrics(text: string, ignoreNewlines = false): TypeMetric | null {
        return MagickImage._create((image) => {
            image.read(MagickColors.Transparent, 1, 1);
            return DrawingWand._use(image, (wand) => {
                wand.draw(this._drawables);
                return wand.fontTypeMetrics(text, ignoreNewlines);
            });
        });
    }

    /**
     * Adds a {@link DrawableGravity} to the drawables.
     * @param value The gravity to use.
     */
    gravity(value: Gravity): Drawables {
        this._drawables.push(new DrawableGravity(value));
        return this;
    }

    /**
     * Adds a {@link DrawableLine} to the drawables.
     * @param startX The starting X coordinate.
     * @param startY The starting Y coordinate.
     * @param endX The ending X coordinate.
     * @param endY The ending Y coordinate.
     */
    line(startX: number, startY: number, endX: number, endY: number): Drawables {
        this._drawables.push(new DrawableLine(startX, startY, endX, endY));
        return this;
    }

    /**
     * Draws a set of paths.
     * @param paths The paths to draw.
     */
    path(paths: IPath[]): Drawables {
        this._drawables.push(new DrawablePath(paths));
        return this;
    }

    paths(): Paths { return new Paths(this); }

    /**
     * Adds a {@link DrawablePoint} to the drawables.
     * @param x The X coordinate.
     * @param y The Y coordinate.
     */
    point(x: number, y: number): Drawables {
        this._drawables.push(new DrawablePoint(x, y));
        return this;
    }

    /**
     * Adds a {@link DrawableRectangle} to the drawables.
     * @param upperLeftX The upper left X coordinate.
     * @param upperLeftY The upper left Y coordinate.
     * @param lowerRightX The lower right X coordinate.
     * @param lowerRightY The lower right Y coordinate.
     */
    rectangle(upperLeftX: number, upperLeftY: number, lowerRightX: number, lowerRightY: number): Drawables {
        this._drawables.push(new DrawableRectangle(upperLeftX, upperLeftY, lowerRightX, lowerRightY));
        return this;
    }

    /**
     * Adds a {@link DrawableRoundRectangle} to the drawables.
     * @param upperLeftX The upper left X coordinate.
     * @param upperLeftY The upper left Y coordinate.
     * @param lowerRightX The lower right X coordinate.
     * @param lowerRightY The lower right Y coordinate.
     * @param cornerWidth The corner width.
     * @param cornerHeight The corner height.
     */
    roundRectangle(upperLeftX: number, upperLeftY: number, lowerRightX: number, lowerRightY: number, cornerWidth: number, cornerHeight: number): Drawables {
        this._drawables.push(new DrawableRoundRectangle(upperLeftX, upperLeftY, lowerRightX, lowerRightY, cornerWidth, cornerHeight));
        return this;
    }

    /**
     * Adds a {@link DrawableStrokeColor} to the drawables.
     * @param color The color to use.
     */
    strokeColor(color: IMagickColor): Drawables {
        this._drawables.push(new DrawableStrokeColor(color));
        return this;
    }

    /**
     * Adds a {@link DrawableStrokeDashArray} to the drawables.
     * @param dash An array containing the dash information.
     */
    strokeDashArray(dash: number[]): Drawables {
        this._drawables.push(new DrawableStrokeDashArray(dash));
        return this;
    }

    /**
     * Adds a {@link DrawableStrokeDashOffset} to the drawables.
     * @param offset The dash offset.
     */
    strokeDashOffset(offset: number): Drawables {
        this._drawables.push(new DrawableStrokeDashOffset(offset));
        return this;
    }

    /**
     * Adds a {@link DrawableStrokeWidth} to the drawables.
     * @param width The width.
     */
    strokeWidth(width: number): Drawables {
        this._drawables.push(new DrawableStrokeWidth(width));
        return this;
    }

    /**
     * Adds a {@link DrawableText} to the drawables.
     * @param x The X coordinate.
     * @param y The Y coordinate.
     * @param value The text to draw.
     */
    text(x: number, y: number, value: string): Drawables {
        this._drawables.push(new DrawableText(x, y, value));
        return this;
    }

    /**
     * Adds a {@link DrawableTextAlignment} to the drawables.
     * @param alignment The text alignment.
     */
    textAlignment(alignment: TextAlignment): Drawables {
        this._drawables.push(new DrawableTextAlignment(alignment));
        return this;
    }

    /**
     * Adds a {@link DrawableTextDecoration} to the drawables.
     * @param decoration The text decoration.
     */
    textDecoration(decoration: TextDecoration): Drawables {
        this._drawables.push(new DrawableTextDecoration(decoration));
        return this;
    }

    /**
     * Adds a {@link DrawableTextInterlineSpacing} to the drawables.
     * @param spacing The spacing to use.
     */
    textInterlineSpacing(spacing: number): Drawables {
        this._drawables.push(new DrawableTextInterlineSpacing(spacing));
        return this;
    }

    /**
     * Adds a {@link DrawableTextInterlineSpacing} to the drawables.
     * @param spacing The spacing to use.
     */
    textInterwordSpacing(spacing: number): Drawables {
        this._drawables.push(new DrawableTextInterwordSpacing(spacing));
        return this;
    }

    /**
     * Adds a {@link DrawableTextKerning} to the drawables.
     * @param kerning The kerning to use.
     */
    textKerning(kerning: number): Drawables {
        this._drawables.push(new DrawableTextKerning(kerning));
        return this;
    }

    /**
     * Adds a {@link DrawableTextUnderColor} to the drawables.
     * @param color The color to use.
     */
    textUnderColor(color: IMagickColor): Drawables {
        this._drawables.push(new DrawableTextUnderColor(color));
        return this;
    }
}
