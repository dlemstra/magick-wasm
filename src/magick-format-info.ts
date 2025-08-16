/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Exception } from './internal/exception/exception';
import { ImageMagick } from './image-magick';
import { IntPointer } from './internal/pointer/int-pointer';
import { MagickFormat } from './enums/magick-format';
import { _createString } from './internal/native/string';

export interface IMagickFormatInfo {
    /**
     * Gets the description of the format.
     */
    readonly description: string;

    /**
     * Gets the format.
     */
    readonly format: MagickFormat;

    /**
     * Gets the mime type.
     */
    readonly mimeType: string | null;

    /**
     * Gets a value indicating whether the format supports multiple frames.
     */
    readonly supportsMultipleFrames: boolean;

    /**
     * Gets a value indicating whether the format can be read.
     */
    readonly supportsReading: boolean;

    /**
     * Gets a value indicating whether the format can be written.
     */
    readonly supportsWriting: boolean;
}

/** @internal */
export class MagickFormatInfo implements IMagickFormatInfo {
    private static _allFormats: ReadonlyArray<IMagickFormatInfo>;

    private constructor(format: MagickFormat, description: string, mimeType: string | null, supportsMultipleFrames: boolean, supportsReading: boolean, supportsWriting: boolean) {
        this.format = format;
        this.description = description;
        this.mimeType = mimeType;
        this.supportsMultipleFrames = supportsMultipleFrames;
        this.supportsReading = supportsReading;
        this.supportsWriting = supportsWriting;
    }

    readonly description: string;

    readonly format: MagickFormat;

    readonly mimeType: string | null;

    readonly supportsMultipleFrames: boolean;

    readonly supportsReading: boolean;

    readonly supportsWriting: boolean;

    static get all(): ReadonlyArray<IMagickFormatInfo> {
        if (MagickFormatInfo._allFormats === undefined)
            MagickFormatInfo._allFormats = MagickFormatInfo.loadFormats();
        return MagickFormatInfo._allFormats;
    }

    private static loadFormats() {
        return Exception.usePointer(exception => {
            return IntPointer.use(pointer => {
                const list = ImageMagick._api._MagickFormatInfo_CreateList(pointer.ptr, exception);
                const count = pointer.value;
                try {
                    const result = new Array<IMagickFormatInfo>(count);
                    const values = Object.values(MagickFormat);
                    for (let i = 0; i < count; i++) {
                        const info = ImageMagick._api._MagickFormatInfo_GetInfo(list, i, exception);
                        const formatName = _createString(ImageMagick._api._MagickFormatInfo_Format_Get(info));

                        const format = MagickFormatInfo.convertFormat(formatName, values);
                        const description = _createString(ImageMagick._api._MagickFormatInfo_Description_Get(info), '');
                        const mimeType = _createString(ImageMagick._api._MagickFormatInfo_MimeType_Get(info));
                        const supportsMultipleFrames = ImageMagick._api._MagickFormatInfo_SupportsMultipleFrames_Get(info) == 1;
                        const supportsReading = ImageMagick._api._MagickFormatInfo_SupportsReading_Get(info) == 1;
                        const supportsWriting = ImageMagick._api._MagickFormatInfo_SupportsWriting_Get(info) == 1;
                        result[i] = new MagickFormatInfo(format, description, mimeType, supportsMultipleFrames, supportsReading, supportsWriting);
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
