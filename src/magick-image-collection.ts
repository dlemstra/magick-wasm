/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { AsyncImageCallback, AsyncImageCollectionCallback, ImageCallback, ImageCollectionCallback, SyncImageCallback, SyncImageCollectionCallback } from './types/callbacks';
import { ByteArray } from './byte-array';
import { ColorSpace } from './enums/color-space';
import { ComplexSettings } from './settings/complex-settings';
import { Disposable } from './internal/disposable';
import { DisposableArray } from './internal/disposable-array';
import { EvaluateOperator } from './enums/evaluate-operator';
import { Exception } from './internal/exception/exception';
import { IDisposable } from './disposable';
import { ImageMagick } from './image-magick';
import { IMagickImage } from './magick-image';
import { IntPointer } from './internal/pointer/int-pointer';
import { LayerMethod } from './enums/layer-method';
import { MagickError } from './magick-error';
import { MagickFormat } from './enums/magick-format';
import { MagickImage } from './magick-image';
import { MagickReadSettings } from './settings/magick-read-settings';
import { MagickSettings } from './settings/magick-settings';
import { MontageSettings } from './settings/montage-settings';
import { TemporaryDefines } from './helpers/temporary-defines';

export interface IMagickImageCollection extends Array<IMagickImage>, IDisposable {
    /** @internal */
    _use<TReturnType>(func: SyncImageCollectionCallback<TReturnType>): TReturnType;
    /** @internal */
    _use<TReturnType>(func: AsyncImageCollectionCallback<TReturnType>): Promise<TReturnType>;

    /**
     * Creates a single image, by appending all the images in the collection horizontally (+append).
     * @param func - The function to execute with the image.
     */
    appendHorizontally<TReturnType>(func: SyncImageCallback<TReturnType>): TReturnType;

    /**
     * Creates a single image, by appending all the images in the collection horizontally (+append).
     * @param func - The async function to execute with the image.
     */
    appendHorizontally<TReturnType>(func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;

    /**
     * Creates a single image, by appending all the images in the collection vertically (-append).
     * @param func - The function to execute with the image.
     */
    appendVertically<TReturnType>(func: SyncImageCallback<TReturnType>): TReturnType;

    /**
     * Creates a single image, by appending all the images in the collection vertically (-append).
     * @param func - The async function to execute with the image.
     */
    appendVertically<TReturnType>(func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;

    /**
     * Creates a clone of the current image collection.
     * @param func - The function to execute with the images.
     */
    clone<TReturnType>(func: (images: IMagickImageCollection) => TReturnType): TReturnType;

    /**
     * Creates a clone of the current image collection.
     * @param func - The async function to execute with the images.
     */
    clone<TReturnType>(func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;

    /**
     * Merge a sequence of images. This is useful for GIF animation sequences that have page
     * offsets and disposal methods.
     */
    coalesce(): void;

    /**
     * Combines the images into a single image. The typical ordering would be
     * image 1 => Red, 2 => Green, 3 => Blue, etc.
     */
    combine<TReturnType>(func: SyncImageCallback<TReturnType>): TReturnType;

    /**
     * Merge a sequence of images. This is useful for GIF animation sequences that have page
     * offsets and disposal methods.
     */
    combine<TReturnType>(func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;

    /**
     * Combines the images into a single image. The typical ordering would be
     * image 1 => Red, 2 => Green, 3 => Blue, etc.
     * @param colorSpace - The image colorspace.
     */
    combine<TReturnType>(colorSpace: ColorSpace, func: SyncImageCallback<TReturnType>): TReturnType;

    /**
     * Combines the images into a single image. The typical ordering would be
     * image 1 => Red, 2 => Green, 3 => Blue, etc.
     * @param colorSpace - The image colorspace.
     */
    combine<TReturnType>(colorSpace: ColorSpace, func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;

    /**
     * Perform complex mathematics on an image sequence.
     * @param func - The function to execute with the image.
     */
    complex<TReturnType>(settings: ComplexSettings, func: SyncImageCallback<TReturnType>): TReturnType;

    /**
     * Perform complex mathematics on an image sequence.
     * @param func - The function to execute with the image.
     */
    complex<TReturnType>(settings: ComplexSettings, func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;

    /**
     * Break down an image sequence into constituent parts. This is useful for creating GIF or
     * MNG animation sequences.
     */
    deconstruct(): void;

    /**
     * Evaluate image pixels into a single image. All the images in the collection must be the
     * same size in pixels.
     * @param evaluateOperator - The operator.
     * @param func - The function to execute with the image.
     */
    evaluate<TReturnType>(evaluateOperator: EvaluateOperator, func: SyncImageCallback<TReturnType>): TReturnType;

    /**
     * Evaluate image pixels into a single image. All the images in the collection must be the
     * same size in pixels.
     * @param evaluateOperator - The operator.
     * @param func - The async function to execute with the image.
     */
    evaluate<TReturnType>(evaluateOperator: EvaluateOperator, func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;

    /**
     * Flatten this collection into a single image.
     * Use the virtual canvas size of first image. Images which fall outside this canvas is clipped.
     * This can be used to 'fill out' a given virtual canvas.
     * @param func - The function to execute with the image.
     */
    flatten<TReturnType>(func: SyncImageCallback<TReturnType>): TReturnType;

    /**
     * Flatten this collection into a single image.
     * Use the virtual canvas size of first image. Images which fall outside this canvas is clipped.
     * This can be used to 'fill out' a given virtual canvas.
     * @param func - The async function to execute with the image.
     */
    flatten<TReturnType>(func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;

    /**
     * Merge all layers onto a canvas just large enough to hold all the actual images. The virtual
     * canvas of the first image is preserved but otherwise ignored.
     * @param func - The function to execute with the image.
     */
    merge<TReturnType>(func: SyncImageCallback<TReturnType>): TReturnType;

    /**
     * Merge all layers onto a canvas just large enough to hold all the actual images. The virtual
     * canvas of the first image is preserved but otherwise ignored.
     * @param func - The async function to execute with the image.
     */
    merge<TReturnType>(func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;

    /**
     * Create a composite image by combining the images with the specified settings.
     * @param settings - The settings to use.
     * @param func - The function to execute with the image.
     */
    montage<TReturnType>(settings: MontageSettings, func: SyncImageCallback<TReturnType>): TReturnType;

    /**
     * Create a composite image by combining the images with the specified settings.
     * @param settings - The settings to use.
     * @param func - The async function to execute with the image.
     */
    montage<TReturnType>(settings: MontageSettings, func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;

    /**
     * Start with the virtual canvas of the first image, enlarging left and right edges to contain
     * all images. Images with negative offsets will be clipped.
     * @param func - The function to execute with the image.
     */
    mosaic<TReturnType>(func: SyncImageCallback<TReturnType>): TReturnType;

    /**
     * Start with the virtual canvas of the first image, enlarging left and right edges to contain
     * all images. Images with negative offsets will be clipped.
     * @param func - The async function to execute with the image.
     */
    mosaic<TReturnType>(func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;

    /**
     * Read all image frames.
     * @param fileName - The fully qualified name of the image file, or the relative image file name.
     * @param settings - The read settings.
     */
    read(fileName: string, settings?: MagickReadSettings): void;

    /**
     * Read all image frames.
     * @param fileName - The fully qualified name of the image file, or the relative image file name.
     * @param settings - The read settings.
     */
    read(array: ByteArray, settings?: MagickReadSettings): void;

    /**
     * Write all image frames to a byte array.
     * @param func - The function to execute with the byte array.
     */
    write<TReturnType>(func: (data: Uint8Array) => TReturnType): TReturnType;

    /**
     * Write all image frames to a byte array.
     * @param func - The async function to execute with the byte array.
     */
    write<TReturnType>(func: (data: Uint8Array) => Promise<TReturnType>): Promise<TReturnType>;

    /**
     * Write all image frames to a byte array.
     * @param format - The format to use.
     * @param func - The async function to execute with the byte array.
     */
    write<TReturnType>(format: MagickFormat, func: (data: Uint8Array) => TReturnType): TReturnType;

    /**
     * Write all image frames to a byte array.
     * @param format - The format to use.
     * @param func - The async async function to execute with the byte array.
     */
    write<TReturnType>(format: MagickFormat, func: (data: Uint8Array) => Promise<TReturnType>): Promise<TReturnType>;
}

export class MagickImageCollection extends Array<MagickImage> implements IMagickImageCollection {
    private constructor() {
        super();
    }

    /**
     * Creates a new {@link IMagickImageCollection} instance.
     */
    static create(): IMagickImageCollection;

    /**
     * Creates a new {@link IMagickImageCollection} instance from the specified byte array.
     */
    static create(array: ByteArray): IMagickImageCollection;
    static create(arrayOrUndefined?: ByteArray): IMagickImageCollection {
        const images = MagickImageCollection.createObject();
        if (arrayOrUndefined !== undefined)
            images.read(arrayOrUndefined);
        return images;
    }

    dispose(): void {
        let image = this.pop();
        while (image !== undefined) {
            image.dispose();
            image = this.pop();
        }
    }

    appendHorizontally<TReturnType>(func: SyncImageCallback<TReturnType>): TReturnType;
    appendHorizontally<TReturnType>(func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;
    appendHorizontally<TReturnType>(func: ImageCallback<TReturnType>): TReturnType | Promise<TReturnType> {
        return this.createImage((instance, exception) => {
            return ImageMagick._api._MagickImageCollection_Append(instance, 0, exception.ptr);
        }, func);
    }

    appendVertically<TReturnType>(func: SyncImageCallback<TReturnType>): TReturnType;
    appendVertically<TReturnType>(func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;
    appendVertically<TReturnType>(func: ImageCallback<TReturnType>): TReturnType | Promise<TReturnType> {
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

    coalesce(): void {
        this.throwIfEmpty();

        const result = this.attachImages((instance) => {
            return Exception.use(exception => {
                const result = ImageMagick._api._MagickImageCollection_Coalesce(instance, exception.ptr);
                return this.checkResult(result, exception);
            });
        });

        const settings = this.getSettings()._clone();
        this.dispose();
        this.addImages(result, settings);
    }

    combine<TReturnType>(func: SyncImageCallback<TReturnType>): TReturnType;
    combine<TReturnType>(func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;
    combine<TReturnType>(colorSpace: ColorSpace, func: SyncImageCallback<TReturnType>): TReturnType;
    combine<TReturnType>(colorSpace: ColorSpace, func: AsyncImageCallback<TReturnType>): Promise<TReturnType>
    combine<TReturnType>(colorSpaceOrfunc: ColorSpace | (ImageCallback<TReturnType>), func?: (images: IMagickImage) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        let callback = func;
        let colorSpace = ColorSpace.sRGB;
        if (typeof colorSpaceOrfunc === 'number')
            colorSpace = colorSpaceOrfunc;
        else
            callback = colorSpaceOrfunc;

        return this.createImage((instance, exception) => {
            return ImageMagick._api._MagickImageCollection_Combine(instance, colorSpace, exception.ptr);
        }, callback!);
    }

    complex<TReturnType>(settings: ComplexSettings, func: SyncImageCallback<TReturnType>): TReturnType;
    complex<TReturnType>(settings: ComplexSettings, func: AsyncImageCallback<TReturnType>): Promise<TReturnType>
    complex<TReturnType>(settings: ComplexSettings, func: ImageCallback<TReturnType>): TReturnType | Promise<TReturnType> {
        return TemporaryDefines.use(this[0], temporaryDefines => {
            settings._setArtifacts(temporaryDefines);
            return this.createImage((instance, exception) => {
                return ImageMagick._api._MagickImageCollection_Complex(instance, settings.complexOperator, exception.ptr);
            }, func);
        });
    }

    deconstruct(): void {
        this.throwIfEmpty();

        const result = this.attachImages((instance) => {
            return Exception.use(exception => {
                const result = ImageMagick._api._MagickImageCollection_Deconstruct(instance, exception.ptr);
                return this.checkResult(result, exception);
            });
        });

        const settings = this.getSettings()._clone();
        this.dispose();
        this.addImages(result, settings);
    }

    evaluate<TReturnType>(evaluateOperator: EvaluateOperator, func: SyncImageCallback<TReturnType>): TReturnType;
    evaluate<TReturnType>(evaluateOperator: EvaluateOperator, func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;
    evaluate<TReturnType>(evaluateOperator: EvaluateOperator, func: ImageCallback<TReturnType>): TReturnType | Promise<TReturnType> {
        return this.createImage((instance, exception) => {
            return ImageMagick._api._MagickImageCollection_Evaluate(instance, evaluateOperator, exception.ptr);
        }, func);
    }

    flatten<TReturnType>(func: SyncImageCallback<TReturnType>): TReturnType;
    flatten<TReturnType>(func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;
    flatten<TReturnType>(func: ImageCallback<TReturnType>): TReturnType | Promise<TReturnType> {
        return this.mergeImages(LayerMethod.Flatten, func);
    }

    merge<TReturnType>(func: SyncImageCallback<TReturnType>): TReturnType;
    merge<TReturnType>(func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;
    merge<TReturnType>(func: ImageCallback<TReturnType>): TReturnType | Promise<TReturnType> {
        return this.mergeImages(LayerMethod.Merge, func);
    }

    montage<TReturnType>(settings: MontageSettings, func: SyncImageCallback<TReturnType>): TReturnType;
    montage<TReturnType>(settings: MontageSettings, func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;
    montage<TReturnType>(settings: MontageSettings, func: ImageCallback<TReturnType>): TReturnType | Promise<TReturnType> {
        this.throwIfEmpty();

        return this.attachImages((instance) => {
            const result = settings._use(settingsPtr => {
                return Exception.use(exception => {
                    const images = ImageMagick._api._MagickImageCollection_Montage(instance, settingsPtr._instance, exception.ptr);
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
        });
    }

    mosaic<TReturnType>(func: SyncImageCallback<TReturnType>): TReturnType;
    mosaic<TReturnType>(func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;
    mosaic<TReturnType>(func: ImageCallback<TReturnType>): TReturnType | Promise<TReturnType> {
        return this.mergeImages(LayerMethod.Mosaic, func);
    }

    read(fileName: string, settings?: MagickReadSettings): void;
    read(array: ByteArray, settings?: MagickReadSettings): void;
    read(fileNameOrArray: string | ByteArray, settings?: MagickReadSettings): void {
        this.dispose();

        Exception.use(exception => {
            const readSettings = MagickImageCollection.createSettings(settings);
            if (typeof fileNameOrArray === 'string') {
                readSettings._fileName = fileNameOrArray;

                readSettings._use(settings => {
                    const instances = ImageMagick._api._MagickImageCollection_ReadFile(settings._instance, exception.ptr);
                    this.addImages(instances, readSettings);
                });
            } else {
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
            }
        });
    }


    write<TReturnType>(func: (data: Uint8Array) => TReturnType): TReturnType;
    write<TReturnType>(format: MagickFormat, func: (data: Uint8Array) => TReturnType): TReturnType;
    write<TReturnType>(func: (data: Uint8Array) => Promise<TReturnType>): Promise<TReturnType>;
    write<TReturnType>(format: MagickFormat, func: (data: Uint8Array) => Promise<TReturnType>): Promise<TReturnType>;
    write<TReturnType>(funcOrFormat: ((data: Uint8Array) => TReturnType | Promise<TReturnType>) | MagickFormat, func?: (data: Uint8Array) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        this.throwIfEmpty();

        let data = 0;
        let length = 0;
        const image = this[0];
        const settings = this.getSettings();

        if (func !== undefined) {
            settings.format = funcOrFormat as MagickFormat;
        } else {
            func = funcOrFormat as (data: Uint8Array) => TReturnType | Promise<TReturnType>;
            settings.format = image.format;
        }

        Exception.use(exception => {
            IntPointer.use(pointer => {
                settings._use(nativeSettings => {
                    this.attachImages((instance) => {
                        data = ImageMagick._api._MagickImage_WriteBlob(instance, nativeSettings._instance, pointer.ptr, exception.ptr);
                        length = pointer.value;
                    });
                });
            });
        });

        const array = new DisposableArray(data, length, func);
        return Disposable._disposeAfterExecution(array, array.func);
    }

    /** @internal */
    static _createFromImages(images: number, settings: MagickSettings): IMagickImageCollection {
        const collection = MagickImageCollection.createObject();

        collection.addImages(images, settings._clone());

        return collection;
    }

    /** @internal */
    _use<TReturnType>(func: SyncImageCollectionCallback<TReturnType>): TReturnType;
    /** @internal */
    _use<TReturnType>(func: AsyncImageCollectionCallback<TReturnType>): Promise<TReturnType>;
    _use<TReturnType>(func: ImageCollectionCallback<TReturnType>): TReturnType | Promise<TReturnType> {
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

    private attachImages<TReturnType>(func: (instance: number) => TReturnType): TReturnType {
        try {
            for (let i = 0; i < this.length - 1; i++)
                ImageMagick._api._MagickImage_SetNext(this[i]._instance, this[i + 1]._instance);

            return func(this[0]._instance);
        }
        finally {
            for (let i = 0; i < this.length - 1; i++)
                ImageMagick._api._MagickImage_SetNext(this[i]._instance, 0);
        }
    }

    private static createObject(): MagickImageCollection {
        return Object.create(MagickImageCollection.prototype);
    }

    private createImage<TReturnType>(createImages: (instance: number, exception: Exception) => number, func: ImageCallback<TReturnType>): TReturnType | Promise<TReturnType> {
        this.throwIfEmpty();

        const result = this.attachImages((instance) => {
            return Exception.use(exception => {
                const images = createImages(instance, exception);
                return this.checkResult(images, exception);
            });
        });

        const image = MagickImage._createFromImage(result, this.getSettings());
        return image._use(func);
    }

    private static createSettings(settings?: MagickReadSettings): MagickSettings {
        if (settings == null)
            return new MagickSettings();

        return new MagickReadSettings(settings);
    }

    private getSettings(): MagickSettings {
        return this[0]._getSettings()._clone();
    }

    private mergeImages<TReturnType>(layerMethod: LayerMethod, func: ImageCallback<TReturnType>): TReturnType | Promise<TReturnType> {
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
