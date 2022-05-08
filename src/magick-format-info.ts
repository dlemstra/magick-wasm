// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from './image-magick';
import { Exception } from './internal/exception/exception';
import { Pointer } from './internal/pointer/pointer';
import { MagickFormat } from './magick-format';
import { _createString } from './internal/native/string';
import { MagickError } from './magick-error';

export class MagickFormatInfo {
    private readonly _format: MagickFormat;
    private readonly _description: string;
    private readonly _isReadable: boolean;
    private readonly _isWritable: boolean;
    private static _all: ReadonlyArray<MagickFormatInfo>;

    private constructor(format: MagickFormat, description: string, isReadable: boolean, isWritable: boolean) {
        this._format = format;
        this._description = description;
        this._isReadable = isReadable;
        this._isWritable = isWritable;
    }

    get description(): string { return this._description; }

    get format(): MagickFormat { return this._format; }

    get isReadable(): boolean { return this._isReadable; }

    get isWritable(): boolean { return this._isWritable; }

    static get all(): ReadonlyArray<MagickFormatInfo> {
        if (MagickFormatInfo._all === undefined)
            MagickFormatInfo._all = MagickFormatInfo.loadFormats();
        return MagickFormatInfo._all;
    }

    static create(format: MagickFormat): MagickFormatInfo {
        for (const formatInfo of MagickFormatInfo.all) {
            if (formatInfo.format === format)
                return formatInfo;
        }

        throw new MagickError(`unable to get format info for ${format}`);
    }

    private static loadFormats() {
        return Exception.usePointer(exception => {
            return Pointer.use(pointer => {
                const list = ImageMagick._api._MagickFormatInfo_CreateList(pointer.ptr, exception);
                const count = pointer.value;
                try {
                    const result = new Array<MagickFormatInfo>(count);
                    const values = Object.values(MagickFormat);
                    for (let i = 0; i < count; i++) {
                        const info = ImageMagick._api._MagickFormatInfo_GetInfo(list, i, exception);
                        const formatName = _createString(ImageMagick._api._MagickFormatInfo_Format_Get(info));

                        const format = MagickFormatInfo.convertFormat(formatName, values);
                        const description = _createString(ImageMagick._api._MagickFormatInfo_Description_Get(info), '');
                        const isReadable = ImageMagick._api._MagickFormatInfo_IsReadable_Get(info) == 1;
                        const isWritable = ImageMagick._api._MagickFormatInfo_IsWritable_Get(info) == 1;
                        result[i] = new MagickFormatInfo(format, description, isReadable, isWritable);
                    }
                    return result;
                } finally {
                    ImageMagick._api._MagickFormatInfo_DisposeList(list, count);
                }
            });
        });
    }

    private static convertFormat(formatName: string | null, values: string[]): MagickFormat {
        if (formatName === null)
            return MagickFormat.Unknown;

        if (values.includes(formatName))
            return formatName as MagickFormat;

        return MagickFormat.Unknown;
    }
}
