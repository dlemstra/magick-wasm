// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from './image-magick';
import { Exception } from './internal/exception/exception';
import { Pointer } from './internal/pointer/pointer';
import { MagickError } from './magick-error';
import { MagickFormat } from './magick-format';
import { IMagickImage, MagickImage } from './magick-image';
import { MagickReadSettings } from './settings/magick-read-settings';
import { MagickSettings } from './settings/magick-settings';

export interface IMagickImageCollection extends Array<IMagickImage> {
    /** @internal */
    _use(func: (images: IMagickImageCollection) => void): void;
    /** @internal */
    _use(func: (images: IMagickImageCollection) => Promise<void>): Promise<void>;

    dispose(): void;
    read(fileName: string, settings?: MagickReadSettings): void;
    read(array: Uint8Array, settings?: MagickReadSettings): void;
    write(func: (data: Uint8Array) => void, format?: MagickFormat): void;
    write(func: (data: Uint8Array) => Promise<void>, format?: MagickFormat): Promise<void>;
}

export class MagickImageCollection extends Array<MagickImage> implements IMagickImageCollection {
    private constructor() {
        super();
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
                readSettings._use(useSettings => {
                    const length = fileNameOrArray.byteLength;
                    let data = 0;
                    try {
                        data = ImageMagick._api._malloc(length);
                        ImageMagick._api.HEAPU8.set(fileNameOrArray, data);
                        const instances = ImageMagick._api._MagickImageCollection_ReadBlob(useSettings._instance, data, 0, length, exception.ptr);
                        this.addImages(instances, readSettings);
                    } finally {
                        if (data !== 0) ImageMagick._api._free(data);
                    }
                });
            } else {
                readSettings._fileName = fileNameOrArray;

                readSettings._use(useSettings => {
                    const instances = ImageMagick._api._MagickImageCollection_ReadFile(useSettings._instance, exception.ptr);
                    this.addImages(instances, readSettings);
                });
            }
        });
    }

    write(func: (data: Uint8Array) => void, format?: MagickFormat): void;
    write(func: (data: Uint8Array) => Promise<void>, format?: MagickFormat): Promise<void>;
    write(func: (data: Uint8Array) => void | Promise<void>, format?: MagickFormat): void | Promise<void> {
        this.throwIfEmpty();

        let data = 0;
        let bytes = new Uint8Array();

        Exception.use(exception => {
            Pointer.use(pointer => {
                const image = this[0];
                const settings = this[0]._getSettings()._clone();
                if (format !== undefined) settings.format = format;
                else settings.format = image.format;

                settings._use(nativeSettings => {
                    try {
                        this.attachImages();
                        data = ImageMagick._api._MagickImage_WriteBlob(image._instance, nativeSettings._instance, pointer.ptr, exception.ptr);
                        if (data !== 0) bytes = ImageMagick._api.HEAPU8.subarray(data, data + pointer.value);
                    } catch {
                        if (data !== 0) data = ImageMagick._api._MagickMemory_Relinquish(data);
                    } finally {
                        this.detachImages();
                    }
                });
            });
        });

        try {
            let result = func(bytes);
            if (!!result && typeof result.then === 'function') {
                result = result.finally(() => {
                    if (data !== 0) data = ImageMagick._api._MagickMemory_Relinquish(data);
                });
            }
            return result;
        } finally {
            if (data !== 0) data = ImageMagick._api._MagickMemory_Relinquish(data);
        }
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

    private attachImages() {
        for (let i = 0; i < this.length - 1; i++) ImageMagick._api._MagickImage_SetNext(this[i]._instance, this[i + 1]._instance);
    }

    private detachImages() {
        for (let i = 0; i < this.length - 1; i++) ImageMagick._api._MagickImage_SetNext(this[i]._instance, 0);
    }

    private throwIfEmpty() {
        if (this.length === 0) throw new MagickError('operation requires at least one image');
    }

    /** @internal */
    static _createFromImages(images: number, settings: MagickSettings): IMagickImageCollection {
        const collection = MagickImageCollection.createObject();

        collection.addImages(images, settings);

        return collection;
    }

    static create(): IMagickImageCollection {
        return MagickImageCollection.createObject();
    }

    private static createObject(): MagickImageCollection {
        return Object.create(MagickImageCollection.prototype);
    }

    private static createSettings(settings?: MagickReadSettings): MagickSettings {
        if (settings == null) return new MagickSettings();

        return new MagickReadSettings(settings);
    }
}
