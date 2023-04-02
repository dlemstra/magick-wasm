// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Disposable } from './internal/disposable';
import { DisposableArray } from './internal/disposable-array';
import { EvaluateOperator } from './evaluate-operator';
import { Exception } from './internal/exception/exception';
import { IDisposable } from './disposable';
import { ImageMagick } from './image-magick';
import { IMagickImage } from './magick-image';
import { MagickError } from './magick-error';
import { MagickFormat } from './magick-format';
import { MagickImage } from './magick-image';
import { MagickReadSettings } from './settings/magick-read-settings';
import { MagickSettings } from './settings/magick-settings';
import { MontageSettings } from './settings/montage-settings';
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

export interface IMagickImageCollection extends Array<IMagickImage>, IDisposable {
    /** @internal */
    _use<TReturnType>(func: (images: IMagickImageCollection) => TReturnType): TReturnType;
    /** @internal */
    _use<TReturnType>(func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;

    appendHorizontally<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
    appendHorizontally<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    appendVertically<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
    appendVertically<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    clone<TReturnType>(func: (images: IMagickImageCollection) => TReturnType): TReturnType;
    clone<TReturnType>(func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
    evaluate<TReturnType>(evaluateOperator: EvaluateOperator, func: (image: IMagickImage) => TReturnType): TReturnType;
    evaluate<TReturnType>(evaluateOperator: EvaluateOperator, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    flatten<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
    flatten<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    merge<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
    merge<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    montage<TReturnType>(settings: MontageSettings, func: (image: IMagickImage) => TReturnType): TReturnType;
    montage<TReturnType>(settings: MontageSettings, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    mosaic<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
    mosaic<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    read(fileName: string, settings?: MagickReadSettings): void;
    read(array: Uint8Array, settings?: MagickReadSettings): void;
    write<TReturnType>(func: (data: Uint8Array) => TReturnType, format?: MagickFormat): TReturnType;
    write<TReturnType>(func: (data: Uint8Array) => Promise<TReturnType>, format?: MagickFormat): Promise<TReturnType>;
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

    appendHorizontally<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
    appendHorizontally<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    appendHorizontally<TReturnType>(func: (image: IMagickImage) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        return this.createImage((instance, exception) => {
            return ImageMagick._api._MagickImageCollection_Append(instance, 0, exception.ptr);
        }, func);
    }

    appendVertically<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
    appendVertically<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    appendVertically<TReturnType>(func: (image: IMagickImage) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        return this.createImage((instance, exception) => {
            return ImageMagick._api._MagickImageCollection_Append(instance, 1, exception.ptr);
        }, func);
    }

    clone<TReturnType>(func: (images: IMagickImageCollection) => TReturnType): TReturnType;
    clone<TReturnType>(func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
    clone<TReturnType>(func: (images: IMagickImageCollection) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        const images = MagickImageCollection.create();
        for (let i = 0; i < this.length; i++)
            images.push(MagickImage._clone(this[i]));

        return images._use(func);
    }

    evaluate<TReturnType>(evaluateOperator: EvaluateOperator, func: (image: IMagickImage) => TReturnType): TReturnType;
    evaluate<TReturnType>(evaluateOperator: EvaluateOperator, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    evaluate<TReturnType>(evaluateOperator: EvaluateOperator, func: (image: IMagickImage) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        return this.createImage((instance, exception) => {
            return ImageMagick._api._MagickImageCollection_Evaluate(instance, evaluateOperator, exception.ptr);
        }, func);
    }

    flatten<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
    flatten<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    flatten<TReturnType>(func: (image: IMagickImage) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        return this.mergeImages(LayerMethod.Flatten, func);
    }

    merge<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
    merge<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    merge<TReturnType>(func: (image: IMagickImage) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        return this.mergeImages(LayerMethod.Merge, func);
    }

    montage<TReturnType>(settings: MontageSettings, func: (image: IMagickImage) => TReturnType): TReturnType;
    montage<TReturnType>(settings: MontageSettings, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    montage<TReturnType>(settings: MontageSettings, func: (image: IMagickImage) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        this.throwIfEmpty();

        try {
            this.attachImages();

            const result = settings._use(settingsPtr => {
                return Exception.use(exception => {
                    const images = ImageMagick._api._MagickImageCollection_Montage(this[0]._instance, settingsPtr._instance, exception.ptr);
                    return this.checkResult(images, exception);
                });
            });

            const collection = MagickImageCollection._createFromImages(result, this.getSettings());
            const transparentColor = settings.transparentColor;
            if (transparentColor !== undefined) {
                collection.forEach(image => {
                    image.transparent(transparentColor);
                });
            }

            return collection.merge(func);
        } finally {
            this.detachImages();
        }
    }

    mosaic<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
    mosaic<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    mosaic<TReturnType>(func: (image: IMagickImage) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        return this.mergeImages(LayerMethod.Mosaic, func);
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

    write<TReturnType>(func: (data: Uint8Array) => TReturnType, format?: MagickFormat): TReturnType;
    write<TReturnType>(func: (data: Uint8Array) => Promise<TReturnType>, format?: MagickFormat): Promise<TReturnType>;
    write<TReturnType>(func: (data: Uint8Array) => TReturnType | Promise<TReturnType>, format?: MagickFormat): TReturnType | Promise<TReturnType> {
        this.throwIfEmpty();

        let data = 0;
        let length = 0;

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
                        length = pointer.value;
                    } finally {
                        this.detachImages();
                    }
                });
            });
        });

        const array = new DisposableArray(data, length, func);
        return Disposable._disposeAfterExecution(array, array.func);
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
    _use<TReturnType>(func: (images: IMagickImageCollection) => TReturnType): TReturnType;
    /** @internal */
    _use<TReturnType>(func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
    _use<TReturnType>(func: (images: IMagickImageCollection) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        return Disposable._disposeAfterExecution(this, func);
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

    private createImage<TReturnType>(createImages: (instance: number, exception: Exception) => number, func: (image: IMagickImage) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        this.throwIfEmpty();

        try {
            this.attachImages();

            const result = Exception.use(exception => {
                const images = createImages(this[0]._instance, exception);
                return this.checkResult(images, exception);
            });

            const image = MagickImage._createFromImage(result, this.getSettings());
            return image._use(func);
        } finally {
            this.detachImages();
        }
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
        return this.createImage((instance, exception) => {
            return ImageMagick._api._MagickImageCollection_Merge(instance, layerMethod, exception.ptr);
        }, func);
    }

    private throwIfEmpty() {
        if (this.length === 0)
            throw new MagickError('operation requires at least one image');
    }

    private checkResult(images: number, exception: Exception): number {
        return exception.check(() => {
            return images;
        }, () => {
            ImageMagick._api._MagickImageCollection_Dispose(images);
            return 0;
        });
    }
}
