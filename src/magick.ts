// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from './image-magick';
import { _createString } from './internal/native/string';
import { MagickFormatInfo } from './magick-format-info';

export class Magick {
    static get delegates(): string { return _createString(ImageMagick._api._Magick_Delegates_Get(), 'Unknown'); }

    static get features(): string { return _createString(ImageMagick._api._Magick_Features_Get(), ' ').slice(0, -1); }

    static get imageMagickVersion(): string { return _createString(ImageMagick._api._Magick_ImageMagickVersion_Get(), 'Unknown'); }

    static get supportedFormats(): ReadonlyArray<MagickFormatInfo> { return MagickFormatInfo.all; }

    /** @internal */
    static _getFontFileName(name: string): string {
        const fileName = `/fonts/${name}`;
        const { exists } = ImageMagick._api.FS.analyzePath(fileName);
        if (!exists) throw new Error(`Unable to find a font with the name '${name}', add it with Magick.addFont.`);

        return fileName;
    }

    static addFont(name: string, data: Uint8Array): void {
        const fileSystem = ImageMagick._api.FS;
        const { exists } = fileSystem.analyzePath('/fonts');
        if (!exists) fileSystem.mkdir('/fonts');

        const stream = fileSystem.open(`/fonts/${name}`, 'w');
        fileSystem.write(stream, data, 0, data.length);
        fileSystem.close(stream);
    }

    static setRandomSeed = (seed: number): void => ImageMagick._api._Magick_SetRandomSeed(seed);
}
