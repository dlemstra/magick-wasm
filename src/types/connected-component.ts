/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from '../image-magick';
import { MagickColor, IMagickColor } from '../magick-color';
import { MagickGeometry, IMagickGeometry } from './magick-geometry';
import { NativePointer } from '@dlemstra/magick-native';
import { Point } from './point';
import { _castToSize } from '../internal/native/size';

/**
 * An ImageMagick connected component object.
 */
export class ConnectedComponent {
    private constructor(instance: NativePointer) {
        this.area = Number(ImageMagick._api._ConnectedComponent_GetArea(instance));
        this.centroid = Point._create(ImageMagick._api._ConnectedComponent_GetCentroid(instance));
        this.color = MagickColor._create(ImageMagick._api._ConnectedComponent_GetColor(instance));
        this.height = Number(ImageMagick._api._ConnectedComponent_GetHeight(instance));
        this.id = Number(ImageMagick._api._ConnectedComponent_GetId(instance));
        this.width = Number(ImageMagick._api._ConnectedComponent_GetWidth(instance));
        this.x = Number(ImageMagick._api._ConnectedComponent_GetX(instance));
        this.y = Number(ImageMagick._api._ConnectedComponent_GetY(instance));
    }

    /**
     * The pixel count of the area.
     */
    readonly area: number;

    /**
     * The centroid of the area.
     */
    readonly centroid: Point;

    /**
     * The color of the area.
     */
    readonly color?: IMagickColor;

    /**
     * The height of the area.
     */
    readonly height: number;

    /**
     * The id of the area.
     */
    readonly id: number;

    /**
     * The width of the area.
     */
    readonly width: number;

    /**
     * The X offset from origin.
     */
    readonly x: number;

    /**
     * The Y offset from origin.
     */
    readonly y: number;

    /** @internal */
    static _create(list: NativePointer, length: number): ConnectedComponent[] {
        const result: ConnectedComponent[] = [];

        if (list === ImageMagick._api._NullPointer) {
            return result;
        }

        for (let i = 0; i < length; i++) {
            const instance = ImageMagick._api._ConnectedComponent_GetInstance(list, _castToSize(i));

            if (instance === ImageMagick._api._NullPointer || ImageMagick._api._ConnectedComponent_GetArea(instance) < Number.EPSILON) {
                continue;
            }

            result.push(new ConnectedComponent(instance));
        }

        return result;
    }

    /**
     * Returns the geometry of the area of the connected component.
     */
    toGeometry(): IMagickGeometry {
        return new MagickGeometry(this.x, this.y, this.width, this.height);
    }
}
