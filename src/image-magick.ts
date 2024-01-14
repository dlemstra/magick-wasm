// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import MagickNative, { ImageMagickApi, IWasmLocator } from '@dlemstra/magick-native';
import { ByteArray, _isByteArray } from './byte-array';
import { IConfigurationFiles, ConfigurationFiles } from './configuration/configuration-files';
import { IMagickImage, MagickImage } from './magick-image';
import { IMagickImageCollection, MagickImageCollection } from './magick-image-collection';
import { IMagickColor } from './magick-color';
import { MagickError } from './magick-error';
import { MagickFormat } from './enums/magick-format';
import { MagickReadSettings } from './settings/magick-read-settings';
import { _withNativeString } from './internal/native/string';

class WasmLocator implements IWasmLocator {
    constructor(wasmLocationDataOrAssembly: URL | ByteArray | WebAssembly.Module) {
        if (wasmLocationDataOrAssembly instanceof URL) {
            if (wasmLocationDataOrAssembly.protocol !== 'http:' && wasmLocationDataOrAssembly.protocol !== 'https:')
                throw new Error('Only http/https protocol is supported');

            this.locateFile = (): string => {
                return wasmLocationDataOrAssembly.href;
            };
        } else if (wasmLocationDataOrAssembly instanceof WebAssembly.Module) {
            this.instantiateWasm = (imports: WebAssembly.Imports, successCallback: (module: WebAssembly.Instance) => void) => {
                const instance = new WebAssembly.Instance(wasmLocationDataOrAssembly, imports);
                successCallback(instance);
            };
        } else {
            this.wasmBinary = wasmLocationDataOrAssembly;
        }
    }

    wasmBinary?: ByteArray;

    instantiateWasm?: (importObject: WebAssembly.Imports, successCallback: (module: WebAssembly.Instance) => void) => void;

    locateFile?: (path: string, scriptDirectory: string) => string;
}

export class ImageMagick {
    private readonly loader: (wasmLocationDataOrAssembly: URL | ByteArray | WebAssembly.Module, configurationFiles: IConfigurationFiles) => Promise<void>;
    private api?: ImageMagickApi;

    /** @internal */
    constructor() {
        this.loader = (wasmLocationDataOrAssembly: URL | ByteArray | WebAssembly.Module, configurationFiles: IConfigurationFiles) => new Promise((resolve, reject) => {
            if (this.api !== undefined) {
                resolve();
                return;
            }

            const wasmLocator = new WasmLocator(wasmLocationDataOrAssembly);
            MagickNative(wasmLocator).then(api => {
                try {
                    this.writeConfigurationFiles(api, configurationFiles);

                    _withNativeString(api, 'MAGICK_CONFIGURE_PATH', name => {
                        _withNativeString(api, '/xml', value => {
                            api._Environment_SetEnv(name, value);
                            this.api = api;
                            resolve();
                        });
                    });
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    /** @internal */
    async _initialize(wasmLocationDataOrAssembly: URL | ByteArray | WebAssembly.Module, configurationFiles: IConfigurationFiles): Promise<void> {
        await this.loader(wasmLocationDataOrAssembly, configurationFiles);
    }

    /** @internal */
    static get _api(): ImageMagickApi {
        if (!_instance.api)
            throw new MagickError('`await initializeImageMagick` should be called to initialize the library');

        return _instance.api;
    }

    /** @internal */
    static set _api(value: ImageMagickApi) {
        _instance.api = value;
    }

    /**
     * Read single image frame.
     * @param color - The color to fill the image with.
     * @param width - The width of the image.
     * @param height - The height of the image.
     * @param func - The function that will be invoked with the image.
     */
    static read<TReturnType>(color: IMagickColor, width: number, height: number, func: (image: IMagickImage) => TReturnType): TReturnType;
    /**
     * Read single image frame.
     * @param color - The color to fill the image with.
     * @param width - The width of the image.
     * @param height - The height of the image.
     * @param func - The async function that will be invoked with the image.
     */
    static read<TReturnType>(color: IMagickColor, width: number, height: number, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    /**
     * Read single image frame.
     * @param array - The byte array to read the image from.
     * @param format - The format of the image.
     * @param func - The function that will be invoked with the image.
     */
    static read<TReturnType>(array: ByteArray, format: MagickFormat, func: (image: IMagickImage) => TReturnType): TReturnType;
    /**
     * Read single image frame.
     * @param array - The byte array to read the image from.
     * @param format - The format of the image.
     * @param func - The async function that will be invoked with the image.
     */
    static read<TReturnType>(array: ByteArray, format: MagickFormat, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    /**
     * Read single image frame.
     * @param array - The byte array to read the image from.
     * @param settings - The settings to use when reading the image.
     * @param func - The function that will be invoked with the image.
     */
    static read<TReturnType>(array: ByteArray, settings: MagickReadSettings, func: (image: IMagickImage) => TReturnType): TReturnType;
    /**
     * Read single image frame.
     * @param array - The byte array to read the image from.
     * @param settings - The settings to use when reading the image.
     * @param func - The async function that will be invoked with the image.
     */
    static read<TReturnType>(array: ByteArray, settings: MagickReadSettings, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    /**
     * Read single image frame.
     * @param array - The byte array to read the image from.
     * @param func - The function that will be invoked with the image.
     */
    static read<TReturnType>(array: ByteArray, func: (image: IMagickImage) => TReturnType): TReturnType;
    /**
     * Read single image frame.
     * @param array - The byte array to read the image from.
     * @param func - The async function that will be invoked with the image.
     */
    static read<TReturnType>(array: ByteArray, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    /**
     * Read single image frame.
     * @param fileName - The fully qualified name of the image file, or the relative image file name.
     * @param format - The format of the image.
     * @param func - The function that will be invoked with the image.
     */
    static read<TReturnType>(fileName: string, format: MagickFormat, func: (image: IMagickImage) => TReturnType): TReturnType;
    /**
     * Read single image frame.
     * @param fileName - The fully qualified name of the image file, or the relative image file name.
     * @param format - The format of the image.
     * @param func - The async function that will be invoked with the image.
     */
    static read<TReturnType>(fileName: string, format: MagickFormat, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    /**
     * Read single image frame.
     * @param fileName - The fully qualified name of the image file, or the relative image file name.
     * @param settings - The settings to use when reading the image.
     * @param func - The function that will be invoked with the image.
     */
    static read<TReturnType>(fileName: string, settings: MagickReadSettings, func: (image: IMagickImage) => TReturnType): TReturnType;
    /**
     * Read single image frame.
     * @param fileName - The fully qualified name of the image file, or the relative image file name.
     * @param settings - The settings to use when reading the image.
     * @param func - The async function that will be invoked with the image.
     */
    static read<TReturnType>(fileName: string, settings: MagickReadSettings, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    /**
     * Read single image frame.
     * @param fileName - The fully qualified name of the image file, or the relative image file name.
     * @param func - The function that will be invoked with the image.
     */
    static read<TReturnType>(fileName: string, func: (image: IMagickImage) => TReturnType): TReturnType;
    /**
     * Read single image frame.
     * @param fileName - The fully qualified name of the image file, or the relative image file name.
     * @param func - The async function that will be invoked with the image.
     */
    static read<TReturnType>(fileName: string, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    static read<TReturnType>(colorOrArrayOrFileName: IMagickColor | ByteArray | string, widthOrFormatOrSetttingsOrFunc: number | MagickFormat | MagickReadSettings | ((image: IMagickImage) => TReturnType | Promise<TReturnType>), heightOrFunc?: number | ((image: IMagickImage) => TReturnType | Promise<TReturnType>), func?: (image: IMagickImage) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        return MagickImage._create(image => {
            let callback = func;
            if (typeof colorOrArrayOrFileName !== 'string' && !_isByteArray(colorOrArrayOrFileName)) {
                if (typeof widthOrFormatOrSetttingsOrFunc === 'number' && typeof heightOrFunc === 'number')
                    image.read(colorOrArrayOrFileName, widthOrFormatOrSetttingsOrFunc, heightOrFunc);
            } else if (typeof widthOrFormatOrSetttingsOrFunc !== 'number' && typeof heightOrFunc !== 'number') {
                callback = heightOrFunc;
                let settings: MagickReadSettings | undefined = undefined;
                if (widthOrFormatOrSetttingsOrFunc instanceof MagickReadSettings) {
                    settings = widthOrFormatOrSetttingsOrFunc;
                } else if (typeof widthOrFormatOrSetttingsOrFunc === 'string') {
                    settings = new MagickReadSettings();
                    settings.format = widthOrFormatOrSetttingsOrFunc;
                } else {
                    callback = widthOrFormatOrSetttingsOrFunc;
                }

                if (typeof colorOrArrayOrFileName === 'string')
                    image.read(colorOrArrayOrFileName, settings);
                else
                    image.read(colorOrArrayOrFileName, settings);
            }

            /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
            return callback!(image);
        });
    }

    /**
     * Read all image frames.
     * @param array - The byte array to read the images from.
     * @param format - The format of the image.
     * @param func - The function that will be invoked with the image collection.
     */
    static readCollection<TReturnType>(array: ByteArray, format: MagickFormat, func: (images: IMagickImageCollection) => TReturnType): TReturnType;
    /**
     * Read all image frames.
     * @param array - The byte array to read the images from.
     * @param format - The format of the image.
     * @param func - The async function that will be invoked with the image collection.
     */
    static readCollection<TReturnType>(array: ByteArray, format: MagickFormat, func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
    /**
     * Read all image frames.
     * @param array - The byte array to read the images from.
     * @param settings - The settings to use when reading the images.
     * @param func - The function that will be invoked with the image collection.
     */
    static readCollection<TReturnType>(array: ByteArray, settings: MagickReadSettings, func: (images: IMagickImageCollection) => TReturnType): TReturnType;
    /**
     * Read all image frames.
     * @param array - The byte array to read the images from.
     * @param settings - The settings to use when reading the images.
     * @param func - The async function that will be invoked with the image collection.
     */
    static readCollection<TReturnType>(array: ByteArray, settings: MagickReadSettings, func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
    /**
     * Read all image frames.
     * @param array - The byte array to read the images from.
     * @param func - The function that will be invoked with the image collection.
     */
    static readCollection<TReturnType>(array: ByteArray, func: (images: IMagickImageCollection) => TReturnType): TReturnType;
    /**
     * Read all image frames.
     * @param array - The byte array to read the images from.
     * @param func - The async function that will be invoked with the image collection.
     */
    static readCollection<TReturnType>(array: ByteArray, func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
    /**
     * Read all image frames.
     * @param fileName - The fully qualified name of the image file, or the relative image file name.
     * @param settings - The settings to use when reading the images.
     * @param func - The function that will be invoked with the image collection.
     */
    static readCollection<TReturnType>(fileName: string, settings: MagickReadSettings, func: (images: IMagickImageCollection) => TReturnType): TReturnType
    /**
     * Read all image frames.
     * @param fileName - The fully qualified name of the image file, or the relative image file name.
     * @param settings - The settings to use when reading the images.
     * @param func - The async function that will be invoked with the image collection.
     */
    static readCollection<TReturnType>(fileName: string, settings: MagickReadSettings, func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
    /**
     * Read all image frames.
     * @param fileName - The fully qualified name of the image file, or the relative image file name.
     * @param func - The function that will be invoked with the image collection.
     */
    static readCollection<TReturnType>(fileName: string, func: (images: IMagickImageCollection) => TReturnType): TReturnType;
    /**
     * Read all image frames.
     * @param fileName - The fully qualified name of the image file, or the relative image file name.
     * @param func - The async function that will be invoked with the image collection.
     */
    static readCollection<TReturnType>(fileName: string, func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
    static readCollection<TReturnType>(arrayOrFileName: ByteArray | string, formatOrSettingsOrFunc: MagickFormat | MagickReadSettings | ((images: IMagickImageCollection) => TReturnType | Promise<TReturnType>), func?: (images: IMagickImageCollection) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        const collection = MagickImageCollection.create();
        return collection._use(images => {
            let callback = func;
            let settings: MagickReadSettings | undefined = undefined;
            if (formatOrSettingsOrFunc instanceof MagickReadSettings) {
                settings = formatOrSettingsOrFunc;
            } else if (typeof formatOrSettingsOrFunc === 'string') {
                settings = new MagickReadSettings();
                settings.format = formatOrSettingsOrFunc;
            } else {
                callback = formatOrSettingsOrFunc;
            }

            if (typeof arrayOrFileName === 'string')
                images.read(arrayOrFileName, settings);
            else
                images.read(arrayOrFileName, settings);

            /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
            return callback!(images);
        });
    }

    /**
     * Read single image frame from canvas.
     * @param canvas - The canvas to read the image from.
     * @param func - The function that will be invoked with the image.
     * @param settings - The {@link CanvasRenderingContext2DSettings} to use when reading the image.
     */
    static readFromCanvas<TReturnType>(canvas: HTMLCanvasElement, func: (image: IMagickImage) => TReturnType, settings?: CanvasRenderingContext2DSettings): TReturnType;
    /**
     * Read single image frame from canvas.
     * @param canvas - The canvas to read the image from.
     * @param func - The async function that will be invoked with the image.
     * @param settings - The {@link CanvasRenderingContext2DSettings} to use when reading the image.
     */
    static readFromCanvas<TReturnType>(canvas: HTMLCanvasElement, func: (image: IMagickImage) => Promise<TReturnType>, settings?: CanvasRenderingContext2DSettings): Promise<TReturnType>;
    static readFromCanvas<TReturnType>(canvas: HTMLCanvasElement, func: (image: IMagickImage) => TReturnType | Promise<TReturnType>, settings?: CanvasRenderingContext2DSettings): TReturnType | Promise<TReturnType> {
        return MagickImage._create(image => {
            image.readFromCanvas(canvas, settings);
            return func(image);
        });
    }

    private writeConfigurationFiles(api: ImageMagickApi, configurationFiles: IConfigurationFiles) {
        const pathInfo = api.FS.analyzePath('/xml');
        if (!pathInfo.exists)
            api.FS.mkdir('/xml');

        for (const configurationFile of configurationFiles.all()) {
            const stream = api.FS.open(`/xml/${configurationFile.fileName}`, 'w');
            const data = new TextEncoder().encode(configurationFile.data);
            api.FS.write(stream, data, 0, data.length);
            api.FS.close(stream);
        }
    }
}

/** @internal */
const _instance = new ImageMagick();

export async function initializeImageMagick(wasmLocationDataOrAssembly: URL | ByteArray | WebAssembly.Module, configurationFiles?: IConfigurationFiles): Promise<void> {
    await _instance._initialize(wasmLocationDataOrAssembly, configurationFiles ?? ConfigurationFiles.default);
}
