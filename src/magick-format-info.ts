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
    private readonly _supportsMultipleFrames: boolean;
    private readonly _supportsReading: boolean;
    private readonly _supportsWriting: boolean;
    private static _all: ReadonlyArray<MagickFormatInfo>;

    private constructor(format: MagickFormat, description: string, supportsMultipleFrames: boolean, supportsReading: boolean, supportsWriting: boolean) {
        this._format = format;
        this._description = description;
        this._supportsMultipleFrames = supportsMultipleFrames;
        this._supportsReading = supportsReading;
        this._supportsWriting = supportsWriting;
    }

    get description(): string { return this._description; }

    get format(): MagickFormat { return this._format; }

    get supportsMultipleFrames(): boolean { return this._supportsMultipleFrames; }

    get supportsReading(): boolean { return this._supportsReading; }

    get supportsWriting(): boolean { return this._supportsWriting; }

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
                        const supportsMultipleFrames = ImageMagick._api._MagickFormatInfo_IsMultiFrame_Get(info) == 1;
                        const supportsReading = ImageMagick._api._MagickFormatInfo_IsReadable_Get(info) == 1;
                        const supportsWriting = ImageMagick._api._MagickFormatInfo_IsWritable_Get(info) == 1;
                        result[i] = new MagickFormatInfo(format, description, supportsMultipleFrames, supportsReading, supportsWriting);
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
