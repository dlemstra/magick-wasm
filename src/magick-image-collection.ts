// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from './image-magick';
import { Exception } from './internal/exception/exception';
import { IMagickImage } from './magick-image';
import { INativeInstance } from './native-instance';
import { MagickError } from './magick-error';
import { MagickFormat } from './magick-format';
import { MagickImage } from './magick-image';
import { MagickReadSettings } from './settings/magick-read-settings';
import { MagickSettings } from './settings/magick-settings';
import { Pointer } from './internal/pointer/pointer';

enum LayerMethod {
    Undefined,
    Coalesce,
    CompareAny,
    CompareClear,
    CompareOverlay,
    Dispose,
    Optimize,
    OptimizeImage,
    OptimizePlus,
    OptimizeTrans,
    RemoveDups,
    RemoveZero,
    Composite,
    Merge,
    Flatten,
    Mosaic,
    Trimbounds,
}

export interface IMagickImageCollection extends Array<IMagickImage>, INativeInstance {
    /** @internal */
    _use(func: (images: IMagickImageCollection) => void | Promise<void>): void | Promise<void>;

    merge<TReturnType>(func: (image: IMagickImage) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType>;
    read(fileName: string, settings?: MagickReadSettings): void;
    read(array: Uint8Array, settings?: MagickReadSettings): void;
    write(func: (data: Uint8Array) => void | Promise<void>, format?: MagickFormat): void | Promise<void>;
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

    merge<TReturnType>(func: (image: IMagickImage) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        return this.mergeImages(LayerMethod.Merge, func);
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

    write(func: (data: Uint8Array) => void | Promise<void>, format?: MagickFormat): void | Promise<void> {
        this.throwIfEmpty();

        let data = 0;
        let bytes = new Uint8Array();

        Exception.use(exception => {
            Pointer.use(pointer => {
                const image = this[0];
                const settings = this.getSettings();
                if (format !== undefined)
                    settings.format = format;
                else
                    settings.format = image.format;

                settings._use(nativeSettings => {
                    try {
                        this.attachImages();
                        data = ImageMagick._api._MagickImage_WriteBlob(image._instance, nativeSettings._instance, pointer.ptr, exception.ptr);
                        if (data !== 0)
                            bytes = ImageMagick._api.HEAPU8.subarray(data, data + pointer.value);
                    } catch {
                        if (data !== 0)
                            data = ImageMagick._api._MagickMemory_Relinquish(data);
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
                    if (data !== 0)
                        data = ImageMagick._api._MagickMemory_Relinquish(data);
                });
            }
            return result;
        } finally {
            if (data !== 0)
                data = ImageMagick._api._MagickMemory_Relinquish(data);
        }
    }

    static create(): IMagickImageCollection {
        return MagickImageCollection.createObject();
    }

    /** @internal */
    static _createFromImages(images: number, settings: MagickSettings): IMagickImageCollection {
        const collection = MagickImageCollection.createObject();

        collection.addImages(images, settings._clone());

        return collection;
    }

    /** @internal */
    _use(func: (images: IMagickImageCollection) => void | Promise<void>): void | Promise<void> {
        try {
            return func(this);
        } finally {
            this.dispose();
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
        for (let i = 0; i < this.length - 1; i++)
            ImageMagick._api._MagickImage_SetNext(this[i]._instance, this[i + 1]._instance);
    }

    private static createObject(): MagickImageCollection {
        return Object.create(MagickImageCollection.prototype);
    }

    private static createSettings(settings?: MagickReadSettings): MagickSettings {
        if (settings == null)
            return new MagickSettings();

        return new MagickReadSettings(settings);
    }

    private detachImages() {
        for (let i = 0; i < this.length - 1; i++)
            ImageMagick._api._MagickImage_SetNext(this[i]._instance, 0);
    }

    private getSettings(): MagickSettings {
        return this[0]._getSettings()._clone();
    }

    private mergeImages<TReturnType>(layerMethod: LayerMethod, func: (image: IMagickImage) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        this.throwIfEmpty();

        try {
            this.attachImages();

            return Exception.use(exception => {
                const image = ImageMagick._api._MagickImageCollection_Merge(this[0]._instance, layerMethod, exception.ptr);
                return MagickImage._createFromImage(image, this.getSettings())._use(func);
            });
        }
        finally
        {
            this.detachImages();
        }
    }

    private throwIfEmpty() {
        if (this.length === 0)
            throw new MagickError("operation requires at least one image");
    }
}
