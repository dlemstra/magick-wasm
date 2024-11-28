/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorProfileData } from "./color-profile-data";
import { ColorSpace } from "../../enums/color-space";
import { EndianReader } from "../endian-reader";

/** @internal */
export class ColorProfileReader {
    private readonly _data: ColorProfileData = new ColorProfileData();
    private readonly _reader: EndianReader;

    private constructor(data: Uint8Array) {
        this._reader = new EndianReader(data);
    }

    static read(data: Uint8Array): ColorProfileData {
        const reader = new ColorProfileReader(data);
        reader.readColorSpace();
        reader.readTagTable();

        return reader._data;
    }

    private readColorSpace() {
        this._reader.seek(16);

        const colorSpace = this._reader.readString(4);

        if (colorSpace == null)
            return;

        this._data.colorSpace = this.determineColorSpace(colorSpace.trimEnd());
    }

    private determineColorSpace(colorSpace: string): ColorSpace {
        switch (colorSpace) {
            case 'CMY':
                return ColorSpace.CMY;
            case 'CMYK':
                return ColorSpace.CMYK;
            case 'GRAY':
                return ColorSpace.Gray;
            case 'HSL':
                return ColorSpace.HSL;
            case 'HSV':
                return ColorSpace.HSV;
            case 'Lab':
                return ColorSpace.Lab;
            case 'Luv':
                return ColorSpace.Luv;
            case 'RGB':
                return ColorSpace.sRGB;
            case 'XYZ':
                return ColorSpace.XYZ;
            case 'YCbr':
                return ColorSpace.YCbCr;
            default:
                return ColorSpace.Undefined;
        }
    }

    private readTagTable() {
        if (!this._reader.seek(128))
            return;

        const count = this._reader.readLong();
        if (count == null)
            return;

        for (let i = 0; i < count; i++) {
            const tag = this._reader.readLong();

            switch (tag) {
                case 0x63707274:
                    this._data.copyright = this.readTag();
                    break;
                case 0x64657363:
                    this._data.description = this.readTag();
                    break;
                case 0x646D6E64:
                    this._data.manufacturer = this.readTag();
                    break;
                case 0x646D6464:
                    this._data.model = this.readTag();
                    break;
                default:
                    this._reader.skip(8);
                    break;
            }
        }
    }

    private readTag(): string | null {
        const offset = this._reader.readLong();
        const length = this._reader.readLong();

        if (offset === null || length === null)
            return null;

        const originalIndex = this._reader.index;

        if (!this._reader.seek(offset))
            return null;

        const value = this.readTagValue(length);

        this._reader.seek(originalIndex);

        return value;
    }

    private readTagValue(length: number): string | null {
        switch (this._reader.readString(4)) {
            case 'desc':
                return this.readTextDescriptionTypeValue();
            case 'text':
                return this.readTextTypeValue(length);
            default:
                return null;
        }
    }

    private readTextDescriptionTypeValue(): string | null {
        if (!this._reader.skip(4))
            return null;

        const length = this._reader.readLong();
        if (length == null)
            return null;

        return this._reader.readString(length);
    }

    private readTextTypeValue(length: number): string | null {
        if (!this._reader.skip(4))
            return null;

        return this._reader.readString(length);
    }
}

