// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from './image-magick';
import { MagickFormatInfo } from './magick-format-info';
import { _createString } from './internal/native/string';

export class Magick {
    static get delegates(): string { return _createString(ImageMagick._api._Magick_Delegates_Get(), 'Unknown'); }

    static get features(): string { return _createString(ImageMagick._api._Magick_Features_Get(), ' ').slice(0, -1); }

    static get imageMagickVersion(): string { return _createString(ImageMagick._api._Magick_ImageMagickVersion_Get(), 'Unknown'); }

    static get supportedFormats(): ReadonlyArray<MagickFormatInfo> { return MagickFormatInfo.all; }

    static addFont(name: string, data: Uint8Array): void {
        const fileSystem = ImageMagick._api.FS;
        const stats = fileSystem.analyzePath('/fonts');
        if (!stats.exists) {
            fileSystem.mkdir('/fonts');
        }

        const stream = fileSystem.open(`/fonts/${name}`, 'w');
        fileSystem.write(stream, data, 0, data.length);
        fileSystem.close(stream);
    }

    static setRandomSeed = (seed: number): void => ImageMagick._api._Magick_SetRandomSeed(seed);

    /** @internal */
    static _getFontFileName(name: string): string {
        const fileName = `/fonts/${name}`;
        const stats = ImageMagick._api.FS.analyzePath(fileName);
        if (!stats.exists) {
            throw `Unable to find a font with the name '${name}', add it with Magick.addFont.`
        }

        return fileName;
    }
}
