// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import MagickNative, { ImageMagickApi } from '@dlemstra/magick-native/magick';
import { IMagickImage, MagickImage } from './magick-image';
import { IMagickImageCollection, MagickImageCollection } from './magick-image-collection';
import { MagickColor } from './magick-color';
import { MagickError } from './magick-error';
import { MagickReadSettings } from './settings/magick-read-settings';
import { _withNativeString } from './internal/native/string';
import { MagickFormat } from './magick-format';

export class ImageMagick {
    private readonly loader: () => Promise<void>;
    private api?: ImageMagickApi;

    private constructor() {
        this.loader = () => new Promise(resolve => {
            if (this.api !== undefined) {
                resolve();
                return;
            }

            MagickNative().then(api => {
                _withNativeString(api, 'MAGICK_CONFIGURE_PATH', name => {
                    _withNativeString(api, '/xml', value => {
                        api._Environment_SetEnv(name, value);
                        this.api = api;
                    });
                });
                resolve();
            });
        });
    }

    static _create = (): ImageMagick => new ImageMagick();

    /** @internal */
    async _initialize(): Promise<void> { await this.loader(); }

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

    static read(color: MagickColor, width: number, height: number, func: (image: IMagickImage) => void | Promise<void>): void | Promise<void>;
    static read(array: Uint8Array, format: MagickFormat, func: (image: IMagickImage) => void | Promise<void>): void | Promise<void>;
    static read(array: Uint8Array, settings: MagickReadSettings, func: (image: IMagickImage) => void | Promise<void>): void | Promise<void>;
    static read(array: Uint8Array, func: (image: IMagickImage) => void | Promise<void>): void | Promise<void>;
    static read(fileName: string, format: MagickFormat, func: (image: IMagickImage) => void | Promise<void>): void | Promise<void>;
    static read(fileName: string, settings: MagickReadSettings, func: (image: IMagickImage) => void | Promise<void>): void | Promise<void>;
    static read(fileName: string, func: (image: IMagickImage) => void | Promise<void>): void | Promise<void>;
    static read(colorOrArrayOrFileName: MagickColor | Uint8Array | string, widthOrFormatOrSetttingsOrFunc: number | MagickFormat | MagickReadSettings | ((image: IMagickImage) => void | Promise<void>) , heightOrFunc?: number | ((image: IMagickImage) => void | Promise<void>), func?: (image: IMagickImage) => void | Promise<void>): void | Promise<void> {
        MagickImage._use(image => {
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

            if (callback !== undefined)
                return callback(image);
        });
    }

    static readCollection(array: Uint8Array, settings: MagickReadSettings, func: (images: IMagickImageCollection) => void | Promise<void>): void | Promise<void>;
    static readCollection(array: Uint8Array, settings: MagickReadSettings, func: (images: IMagickImageCollection) => void | Promise<void>): void | Promise<void>;
    static readCollection(array: Uint8Array, func: (images: IMagickImageCollection) => void | Promise<void>): (void | Promise<void>);
    static readCollection(fileName: string, settings: MagickReadSettings, func: (images: IMagickImageCollection) => void | Promise<void>): void | Promise<void>;
    static readCollection(fileName: string, func: (images: IMagickImageCollection) => void | Promise<void>): (void | Promise<void>);
    static readCollection(arrayOrFileName: Uint8Array | string, settingsOrFunc: MagickReadSettings | ((images: IMagickImageCollection) => void | Promise<void>), func?: (images: IMagickImageCollection) => void | Promise<void>): void | Promise<void> {
        const collection = MagickImageCollection.create();
        return collection._use(images => {
            if (settingsOrFunc instanceof MagickReadSettings) {
                if (typeof arrayOrFileName === 'string')
                    images.read(arrayOrFileName, settingsOrFunc);
                else
                    images.read(arrayOrFileName, settingsOrFunc);

                if (func !== undefined)
                    return func(images);
            } else {
                if (typeof arrayOrFileName === 'string')
                    images.read(arrayOrFileName);
                else
                    images.read(arrayOrFileName);

                return settingsOrFunc(images);
            }
        });
    }

    static readFromCanvas(canvas: HTMLCanvasElement, func: (image: IMagickImage) => void | Promise<void>): void | Promise<void> {
        return MagickImage._use(image => {
            image.readFromCanvas(canvas);
            return func(image);
        });
    }
}

/** @internal */
const instance = ImageMagick._create();

export async function initializeImageMagick(): Promise<void> { await instance._initialize() }
