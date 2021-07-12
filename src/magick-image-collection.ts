// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from './image-magick';
import { Exception } from './internal/exception/exception';
import { MagickFormat } from './magick-format';
import { MagickImage } from './magick-image';
import { MagickReadSettings } from './settings/magick-read-settings';
import { MagickSettings } from './settings/magick-settings';

export interface IMagickImageCollection extends Array<MagickImage> {
    /** @internal */
    _use(func: (images: IMagickImageCollection) => void): void;
    /** @internal */
    _use(func: (images: IMagickImageCollection) => Promise<void>): Promise<void>;

    dispose(): void;
    read(fileName: string, settings?: MagickReadSettings): void;
    read(array: Uint8Array, settings?: MagickReadSettings): void;
}

export class MagickImageCollection extends Array<MagickImage> implements IMagickImageCollection {
    private constructor() {
        super();
    }

    dispose(): void {
        let image = this.pop();
        while (image !== undefined) {
            image.dispose();
            image = this.pop();
        }
    }

    read(fileName: string, settings?: MagickReadSettings): void;
    read(array: Uint8Array, settings?: MagickReadSettings): void;
    read(fileNameOrArray: string | Uint8Array, settings?: MagickReadSettings): void {
        this.dispose();

        Exception.use(exception => {
            const readSettings = MagickImageCollection.createSettings(settings);
            if (fileNameOrArray instanceof Uint8Array) {
                readSettings._use(settings => {
                    const length = fileNameOrArray.byteLength;
                    let data = 0;
                    try {
                        data = ImageMagick._api._malloc(length);
                        ImageMagick._api.HEAPU8.set(fileNameOrArray, data);
                        const instances = ImageMagick._api._MagickImageCollection_ReadBlob(settings._instance, data, 0, length, exception.ptr);
                        this.addImages(instances, readSettings);
                    } finally {
                        if (data !== 0)
                            ImageMagick._api._free(data);
                    }
                });
            } else {
                readSettings._fileName = fileNameOrArray;

                readSettings._use(settings => {
                    const instances = ImageMagick._api._MagickImageCollection_ReadFile(settings._instance, exception.ptr);
                    this.addImages(instances, readSettings);
                });
            }
        });
    }

    static create(): IMagickImageCollection {
        return MagickImageCollection.createObject();
    }

    /** @internal */
    static _createFromImages(images: number, settings: MagickSettings): IMagickImageCollection {
        const collection = MagickImageCollection.createObject();

        collection.addImages(images, settings);

        return collection;
    }

    /** @internal */
    _use(func: (images: IMagickImageCollection) => void): void;
    _use(func: (images: IMagickImageCollection) => Promise<void>): Promise<void>;
    _use(func: (images: IMagickImageCollection) => void | Promise<void>): void | Promise<void> {
        try {
            return func(this);
        } finally {
            this.dispose();
        }
    }

    private static createObject(): MagickImageCollection {
        return Object.create(MagickImageCollection.prototype);
    }

    private static createSettings(settings?: MagickReadSettings): MagickSettings
    {
        if (settings == null)
            return new MagickSettings();

        return new MagickReadSettings(settings);
    }

    private addImages(images: number, settings: MagickSettings) {
        settings.format = MagickFormat.Unknown;

        let image = images;
        while (image !== 0) {
            const next = ImageMagick._api._MagickImage_GetNext(image);
            ImageMagick._api._MagickImage_SetNext(image, 0);

            this.push(MagickImage._createFromImage(image, settings));

            image = next;
        }
    }
}
