/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ByteArray } from "./byte-array";
import { ColorSpace } from "./enums/color-space";
import { CompressionMethod } from "./enums/compression-method";
import { Density } from "./types/density";
import { Interlace } from "./enums/interlace";
import { MagickFormat } from "./enums/magick-format";
import { MagickImage } from "./magick-image";
import { MagickOrientationType } from "./enums/magick-orientation-type";
import { MagickReadSettings } from "./settings/magick-read-settings";

export interface IMagickImageInfo {
    /**
     * Gets the color space of the image
     */
    readonly colorSpace: ColorSpace;

    /**
     * Gets the compression method of the image
     */
    readonly compression: CompressionMethod;

    /**
     * Gets the density of the image
     */
    readonly density: Density;

    /**
     * Gets the format of the image.
     */
    readonly format: MagickFormat;

    /**
     * Gets the height of the image.
     */
    readonly height: number;

    /**
     * Gets the type of interlacing.
     */
    readonly interlace: Interlace;

    /**
     * Gets the orientation of the image.
     */
    readonly orientation: MagickOrientationType;

    /**
     * Gets the JPEG/MIFF/PNG compression level.
     */
    readonly quality: number;

    /**
     * Gets the width of the image.
     */
    readonly width: number;

    /**
     * Read single image frame.
     * @param array The byte array to read the image from.
     * @param settings The settings to use when reading the image.
     */
    read(array: ByteArray, settings?: MagickReadSettings): void
}

export class MagickImageInfo implements IMagickImageInfo {
    private _colorSpace: ColorSpace = ColorSpace.Undefined;
    private _compression: CompressionMethod = CompressionMethod.Undefined;
    private _density: Density = new Density(0, 0);
    private _format: MagickFormat = MagickFormat.Unknown;
    private _height: number = 0;
    private _interlace: Interlace = Interlace.Undefined;
    private _orientation: MagickOrientationType = MagickOrientationType.Undefined;
    private _quality: number = 0;
    private _width: number = 0;

    get colorSpace(): ColorSpace {
        return this._colorSpace;
    }

    get compression(): CompressionMethod {
        return this._compression;
    }

    get density(): Density {
        return this._density;
    }

    get format(): MagickFormat {
        return this._format;
    }

    get height(): number {
        return this._height;
    }

    get interlace(): Interlace {
        return this._interlace;
    }

    get orientation(): MagickOrientationType {
        return this._orientation;
    }

    get quality(): number {
        return this._quality;
    }

    get width(): number {
        return this._width;
    }

    constructor() {
    }

    read(array: ByteArray, settings?: MagickReadSettings): void {
        MagickImage._create(image => {
            image.ping(array, settings);

            this._colorSpace = image.colorSpace;
            this._compression = image.compression;
            this._density = image.density;
            this._format = image.format;
            this._height = image.height;
            this._interlace = image.interlace;
            this._orientation = image.orientation;
            this._quality = image.quality;
            this._width = image.width;
        });
    }

    static create(array: ByteArray, settings?: MagickReadSettings): IMagickImageInfo {
        const result = new MagickImageInfo();
        result.read(array, settings);
        return result;
    }
}
