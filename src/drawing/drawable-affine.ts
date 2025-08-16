/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

/**
 * Adjusts the current affine transformation matrix with the specified affine transformation
 * matrix. Note that the current affine transform is adjusted rather than replaced.
 */
export interface IDrawableAffine extends IDrawable {
    /**
     * Gets the X coordinate scaling element.
     */
    readonly scaleX: number;

    /**
     * Gets the Y coordinate scaling element.
     */
    readonly scaleY: number;

    /**
     * Gets the X coordinate shearing element.
     */
    readonly shearX: number;

    /**
     * Gets the Y coordinate shearing element.
     */
    readonly shearY: number;

    /**
     * Gets the X coordinate of the translation element.
     */
    readonly translateX: number;

    /**
     * Gets the Y coordinate of the translation element.
     */
    readonly translateY: number;

    /**
     * Reset to default.
     */
    reset(): void;

    /**
     * Sets the origin of coordinate system.
     * @param translateX The X coordinate of the translation element.
     * @param translateY The Y coordinate of the translation element.
     */
    transformOrigin(translateX: number, translateY: number): void;

    /**
     * Sets the rotation to use.
     * @param angle The angle of the rotation
     */
    transformRotation(angle: number): void;

    /**
     * Sets the scale to use.
     * @param scaleX The X coordinate scaling element.
     * @param scaleY The Y coordinate scaling element.
     */
    transformScale(scaleX: number, scaleY: number): void;

    /**
     * Skew to use in X axis.
     * @param skewX The X shearing element.
     */
    transformSkewX(skewX: number): void;

    /**
     * Skew to use in Y axis.
     * @param skewY The Y shearing element.
     */
    transformSkewY(skewY: number): void;
}

export class DrawableAffine implements IDrawableAffine {
    private _scaleX: number;
    private _scaleY: number;
    private _shearX: number;
    private _shearY: number;
    private _translateX: number;
    private _translateY: number;

    constructor(scaleX: number = 1, scaleY: number = 1, shearX: number = 0, shearY: number = 0, translateX: number = 0, translateY: number = 0) {
        this._scaleX = scaleX;
        this._scaleY = scaleY;
        this._shearX = shearX;
        this._shearY = shearY;
        this._translateX = translateX;
        this._translateY = translateY;
    }

    get scaleX(): number { return this._scaleX; }

    get scaleY(): number { return this._scaleY; }

    get shearX(): number { return this._shearX; }

    get shearY(): number { return this._shearY; }

    get translateX(): number { return this._translateX; }

    get translateY(): number { return this._translateY; }

    draw(wand: IDrawingWand): void {
        wand.affine(this._scaleX, this._scaleY, this._shearX, this._shearY, this._translateX, this._translateY);
    }

    reset(): void {
        this._scaleX = 1;
        this._scaleY = 1;
        this._shearX = 0;
        this._shearY = 0;
        this._translateX = 0;
        this._translateY = 0;
    }

    transformOrigin(translateX: number, translateY: number): void {
        const affine = new DrawableAffine();
        affine._translateX = translateX;
        affine._translateY = translateY;

        this.transform(affine);
    }

    transformRotation(angle: number): void {
        const affine = new DrawableAffine();
        affine._scaleX = Math.cos(DrawableAffine.normalizeAngleToRadians(angle));
        affine._scaleY = Math.cos(DrawableAffine.normalizeAngleToRadians(angle));
        affine._shearX = -Math.sin(DrawableAffine.normalizeAngleToRadians(angle));
        affine._shearY = Math.sin(DrawableAffine.normalizeAngleToRadians(angle));

        this.transform(affine);
    }

    transformScale(scaleX: number, scaleY: number): void {
        const affine = new DrawableAffine();
        affine._scaleX = scaleX;
        affine._scaleY = scaleY;

        this.transform(affine);
    }

    transformSkewX(skewX: number): void {
        const affine = new DrawableAffine();
        affine._shearX = Math.tan(DrawableAffine.normalizeAngleToRadians(skewX));

        this.transform(affine);
    }

    transformSkewY(skewY: number): void {
        const affine = new DrawableAffine();
        affine._shearY = Math.tan(DrawableAffine.normalizeAngleToRadians(skewY));

        this.transform(affine);
    }

    static normalizeAngleToRadians(angle: number): number {
        const divisor = 360.0;

        const quotient = angle / divisor;
        let roundedQuotient = Math.round(quotient);

        if (Math.abs(quotient - roundedQuotient) === 0.5) {
            if (roundedQuotient % 2 !== 0) {
                roundedQuotient = quotient > 0 ? roundedQuotient - 1 : roundedQuotient + 1;
            }
        }

        return Math.PI * (angle - (roundedQuotient * divisor)) / 180.0;
    }

    private transform(affine: DrawableAffine): void {
        const scaleX = this._scaleX;
        const scaleY = this._scaleY;
        const shearX = this._shearX;
        const shearY = this._shearY;
        const translateX = this._translateX;
        const translateY = this._translateY;

        this._scaleX = (scaleX * affine._scaleX) + (shearY * affine._shearX);
        this._scaleY = (shearX * affine._shearY) + (scaleY * affine._scaleY);
        this._shearX = (shearX * affine._scaleX) + (scaleY * affine._shearX);
        this._shearY = (scaleX * affine._shearY) + (shearY * affine._scaleY);
        this._translateX = (scaleX * affine._translateX) + (shearY * affine._translateY) + translateX;
        this._translateY = (shearX * affine._translateX) + (scaleY * affine._translateY) + translateY;
    }
}
