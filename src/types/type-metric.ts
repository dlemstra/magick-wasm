// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from "../image-magick";

/**
* Used to obtain font metrics for text string given current font, pointsize, and density settings.
*/
export class TypeMetric {
    private constructor(ascent: number, descent: number, maxHorizontalAdvance: number, textHeight: number, textWidth: number, underlinePosition: number, underlineThickness: number) {
        this.ascent = ascent;
        this.descent = descent;
        this.maxHorizontalAdvance = maxHorizontalAdvance;
        this.textHeight = textHeight;
        this.textWidth = textWidth;
        this.underlinePosition = underlinePosition;
        this.underlineThickness = underlineThickness;
    }

    /**
     * Gets the ascent, the distance in pixels from the text baseline to the highest/upper grid coordinate
     * used to place an outline point.
     */
    readonly ascent: number;

    /**
     * Gets the descent, the distance in pixels from the baseline to the lowest grid coordinate used to
     * place an outline point. Always a negative value.
     */
    readonly descent: number;

    /**
     * Gets the maximum horizontal advance in pixels.
     */
    readonly maxHorizontalAdvance: number;

    /**
     * Gets the text height in pixels.
     */
    readonly textHeight: number;

    /**
     * Gets the text width in pixels.
     */
    readonly textWidth: number;

    /**
     * Gets the underline position.
     */
    readonly underlinePosition: number;

    /**
     * Gets the underline thickness.
     */
    readonly underlineThickness: number;

    /** @internal */
    static _create(instance: number): TypeMetric | null {
        if (instance == 0)
            return null;

        try {
            const ascent = ImageMagick._api._TypeMetric_Ascent_Get(instance);
            const descent = ImageMagick._api._TypeMetric_Descent_Get(instance);
            const maxHorizontalAdvance = ImageMagick._api._TypeMetric_MaxHorizontalAdvance_Get(instance);
            const textHeight = ImageMagick._api._TypeMetric_TextHeight_Get(instance);
            const textWidth = ImageMagick._api._TypeMetric_TextWidth_Get(instance);
            const underlinePosition = ImageMagick._api._TypeMetric_UnderlinePosition_Get(instance);
            const underlineThickness = ImageMagick._api._TypeMetric_UnderlineThickness_Get(instance);
            return new TypeMetric(ascent, descent, maxHorizontalAdvance, textHeight, textWidth, underlinePosition, underlineThickness);
        }
        finally {
            ImageMagick._api._TypeMetric_Dispose(instance);
        }
    }
}
