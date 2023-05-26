// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import MagickNative, { ImageMagickApi, IWasmLocator } from '@dlemstra/magick-native/magick';
import { IMagickImage, MagickImage } from './magick-image';
import { IMagickImageCollection, MagickImageCollection } from './magick-image-collection';
import { MagickColor } from './magick-color';
import { MagickError } from './magick-error';
import { MagickFormat } from './magick-format';
import { MagickReadSettings } from './settings/magick-read-settings';
import { _withNativeString } from './internal/native/string';
import { ByteArray } from './byte-array';

class WasmLocator implements IWasmLocator {
    private _wasmLocation: string | undefined;

    constructor(wasmLocationOrData?: string | ByteArray) {
        if (wasmLocationOrData !== undefined) {
            if (typeof wasmLocationOrData === 'string')
                this._wasmLocation = wasmLocationOrData;
            else
                this.wasmBinary = wasmLocationOrData;
        }
    }

    wasmBinary?: ByteArray;

    locateFile = (path: string, scriptDirectory: string): string => {
        let wasmLocation = this._wasmLocation;

        if (wasmLocation === undefined || wasmLocation.length === 0)
            wasmLocation = scriptDirectory + path;

        return wasmLocation;
    }
}

export class ImageMagick {
    private readonly loader: (wasmLocationOrData?: string | ByteArray) => Promise<void>;
    private api?: ImageMagickApi;

    private constructor() {
        this.loader = (wasmLocationOrData?: string | ByteArray) => new Promise((resolve, reject) => {
            if (this.api !== undefined) {
                resolve();
                return;
            }

            const wasmLocator = new WasmLocator(wasmLocationOrData);
            MagickNative(wasmLocator).then(api => {
                try {
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

    static _create = (): ImageMagick => new ImageMagick();

    /** @internal */
    async _initialize(wasmLocationOrData?: string | ByteArray): Promise<void> {
        await this.loader(wasmLocationOrData);
     }

    /** @internal */
    static get _api(): ImageMagickApi {
        if (!instance.api)
            throw new MagickError('`await initializeImageMagick` should be called to initialize the library');

        return instance.api;
    }

    /** @internal */
    static set _api(value: ImageMagickApi) {
        instance.api = value;
    }

    static read<TReturnType>(color: MagickColor, width: number, height: number, func: (image: IMagickImage) => TReturnType): TReturnType;
    static read<TReturnType>(color: MagickColor, width: number, height: number, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    static read<TReturnType>(array: Uint8Array, format: MagickFormat, func: (image: IMagickImage) => TReturnType): TReturnType;
    static read<TReturnType>(array: Uint8Array, format: MagickFormat, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    static read<TReturnType>(array: Uint8Array, settings: MagickReadSettings, func: (image: IMagickImage) => TReturnType): TReturnType;
    static read<TReturnType>(array: Uint8Array, settings: MagickReadSettings, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    static read<TReturnType>(array: Uint8Array, func: (image: IMagickImage) => TReturnType): TReturnType;
    static read<TReturnType>(array: Uint8Array, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    static read<TReturnType>(fileName: string, format: MagickFormat, func: (image: IMagickImage) => TReturnType): TReturnType;
    static read<TReturnType>(fileName: string, format: MagickFormat, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    static read<TReturnType>(fileName: string, settings: MagickReadSettings, func: (image: IMagickImage) => TReturnType): TReturnType;
    static read<TReturnType>(fileName: string, settings: MagickReadSettings, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    static read<TReturnType>(fileName: string, func: (image: IMagickImage) => TReturnType): TReturnType;
    static read<TReturnType>(fileName: string, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    static read<TReturnType>(colorOrArrayOrFileName: MagickColor | Uint8Array | string, widthOrFormatOrSetttingsOrFunc: number | MagickFormat | MagickReadSettings | ((image: IMagickImage) => TReturnType | Promise<TReturnType>) , heightOrFunc?: number | ((image: IMagickImage) => TReturnType | Promise<TReturnType>), func?: (image: IMagickImage) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        return MagickImage._use(image => {
            let callback = func;
            if (colorOrArrayOrFileName instanceof MagickColor) {
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

    static readCollection<TReturnType>(array: Uint8Array, format: MagickFormat, func: (images: IMagickImageCollection) => TReturnType): TReturnType;
    static readCollection<TReturnType>(array: Uint8Array, format: MagickFormat, func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
    static readCollection<TReturnType>(array: Uint8Array, settings: MagickReadSettings, func: (images: IMagickImageCollection) => TReturnType): TReturnType;
    static readCollection<TReturnType>(array: Uint8Array, settings: MagickReadSettings, func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
    static readCollection<TReturnType>(array: Uint8Array, settings: MagickReadSettings, func: (images: IMagickImageCollection) => TReturnType): TReturnType;
    static readCollection<TReturnType>(array: Uint8Array, settings: MagickReadSettings, func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
    static readCollection<TReturnType>(array: Uint8Array, func: (images: IMagickImageCollection) => TReturnType): TReturnType;
    static readCollection<TReturnType>(array: Uint8Array, func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
    static readCollection<TReturnType>(fileName: string, settings: MagickReadSettings, func: (images: IMagickImageCollection) => TReturnType): TReturnType
    static readCollection<TReturnType>(fileName: string, settings: MagickReadSettings, func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
    static readCollection<TReturnType>(fileName: string, func: (images: IMagickImageCollection) => TReturnType): TReturnType;
    static readCollection<TReturnType>(fileName: string, func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
    static readCollection<TReturnType>(arrayOrFileName: Uint8Array | string, formatOrSettingsOrFunc: MagickFormat | MagickReadSettings | ((images: IMagickImageCollection) => TReturnType | Promise<TReturnType>), func?: (images: IMagickImageCollection) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
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

    static readFromCanvas<TReturnType>(canvas: HTMLCanvasElement, func: (image: IMagickImage) => TReturnType): TReturnType;
    static readFromCanvas<TReturnType>(canvas: HTMLCanvasElement, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    static readFromCanvas<TReturnType>(canvas: HTMLCanvasElement, func: (image: IMagickImage) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        return MagickImage._use(image => {
            image.readFromCanvas(canvas);
            return func(image);
        });
    }
}

/** @internal */
const instance = ImageMagick._create();

export async function initializeImageMagick(wasmLocationOrData?: string | ByteArray): Promise<void> {
    await instance._initialize(wasmLocationOrData);
}
