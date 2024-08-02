// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IMagickColor } from '../magick-color';
import { IMagickImage } from '../magick-image';

/** @internal */
export class TemporaryDefines {
    private readonly _image: IMagickImage;
    private readonly _names: string[] = [];

    private constructor(image: IMagickImage) {
        this._image = image;
    }

    setArtifact(name: string, value: string): void;
    setArtifact(name: string, value: boolean): void;
    setArtifact(name: string, value: IMagickColor): void;
    setArtifact(name: string, value: string | boolean | IMagickColor): void {
        this._names.push(name);
        this._image.setArtifact(name, value);
    }

    static use<TReturnType>(image: IMagickImage, func: (temporaryDefines: TemporaryDefines) => TReturnType): TReturnType {
        const defines = new TemporaryDefines(image);
        try {
            return func(defines);
        } finally {
            defines.dispose();
        }
    }

    private dispose(): void {
        for (const name of this._names) {
            this._image.removeArtifact(name);
        }
    }
}
