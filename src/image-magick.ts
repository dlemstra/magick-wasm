// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import MagickNative, { ImageMagickApi } from '@dlemstra/magick-native/magick';
import { _withNativeString } from './internal/native/string';
import { MagickColor } from './magick-color';
import { MagickError } from './magick-error';
import { IMagickImage, MagickImage } from './magick-image';
import { IMagickImageCollection, MagickImageCollection } from './magick-image-collection';
import { MagickReadSettings } from './settings/magick-read-settings';

export class ImageMagick {
    private api?: ImageMagickApi;

    private readonly loader: () => Promise<void>;

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

    /** @internal */
    static get _api(): ImageMagickApi {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        if (!instance.api) throw new MagickError('`await initializeImageMagick` should be called to initialize the library');

        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return instance.api;
    }

    /** @internal */
    static set _api(value: ImageMagickApi) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        instance.api = value;
    }

    /** @internal */
    async _initialize(): Promise<void> { await this.loader(); }

    static _create(): ImageMagick { return new ImageMagick(); }

    static read(color: MagickColor, width: number, height: number, func: (image: IMagickImage) => void): void;
    static read(color: MagickColor, width: number, height: number, func: (image: IMagickImage) => Promise<void>): Promise<void>;
    static read(fileName: string, func: (image: IMagickImage) => void): void;
    static read(fileName: string, func: (image: IMagickImage) => Promise<void>): Promise<void>;
    static read(array: Uint8Array, func: (image: IMagickImage) => void): void;
    static read(array: Uint8Array, func: (image: IMagickImage) => Promise<void>): Promise<void>;
    static read(fileName: string, settings: MagickReadSettings, func: (image: IMagickImage) => void): void;
    static read(fileName: string, settings: MagickReadSettings, func: (image: IMagickImage) => Promise<void>): Promise<void>;
    static read(array: Uint8Array, settings: MagickReadSettings, func: (image: IMagickImage) => void): void;
    static read(array: Uint8Array, settings: MagickReadSettings, func: (image: IMagickImage) => Promise<void>): Promise<void>;
    static read(fileNameOrArrayOrColor: string | Uint8Array | MagickColor, funcOrSettingsOrWidth: MagickReadSettings | ((image: IMagickImage) => void | Promise<void>) | number, funcOrheight?: ((image: IMagickImage) => void | Promise<void>) | number, func?: (image: IMagickImage) => void | Promise<void>): void | Promise<void> {
        MagickImage._use(image => {
            if (fileNameOrArrayOrColor instanceof MagickColor) {
                if (typeof funcOrSettingsOrWidth === 'number' && typeof funcOrheight === 'number') {
                    image.read(fileNameOrArrayOrColor, funcOrSettingsOrWidth, funcOrheight);
                }

                func?.(image);
            } else if (funcOrSettingsOrWidth instanceof MagickReadSettings) {
                image.read(fileNameOrArrayOrColor as string, funcOrSettingsOrWidth);

                if (funcOrheight !== undefined && typeof funcOrheight !== 'number') funcOrheight(image);
            } else {
                image.read(fileNameOrArrayOrColor as string);

                if (typeof funcOrSettingsOrWidth !== 'number') funcOrSettingsOrWidth(image);
            }
        });
    }

    static readCollection(fileName: string, func: (images: IMagickImageCollection) => void): void;
    static readCollection(fileName: string, func: (images: IMagickImageCollection) => Promise<void>): Promise<void>;
    static readCollection(array: Uint8Array, func: (images: IMagickImageCollection) => void): void;
    static readCollection(array: Uint8Array, func: (image: IMagickImageCollection) => Promise<void>): Promise<void>;
    static readCollection(fileName: string, settings: MagickReadSettings, func: (images: IMagickImageCollection) => void): void;
    static readCollection(fileName: string, settings: MagickReadSettings, func: (images: IMagickImageCollection) => Promise<void>): Promise<void>;
    static readCollection(array: Uint8Array, settings: MagickReadSettings, func: (images: IMagickImageCollection) => void): void;
    static readCollection(array: Uint8Array, settings: MagickReadSettings, func: (images: IMagickImageCollection) => Promise<void>): Promise<void>;
    static readCollection(fileNameOrArray: string | Uint8Array, funcOrSettings: MagickReadSettings | ((images: IMagickImageCollection) => void | Promise<void>), func?: (images: IMagickImageCollection) => void | Promise<void>): void | Promise<void> {
        const collection = MagickImageCollection.create();
        return collection._use(images => {
            if (funcOrSettings instanceof MagickReadSettings) {
                images.read(fileNameOrArray as string, funcOrSettings);

                func?.(images);
            } else {
                images.read(fileNameOrArray as string);

                funcOrSettings(images);
            }
        });
    }

    static readFromCanvas(canvas: HTMLCanvasElement, func: (image: IMagickImage) => void): void;
    static readFromCanvas(canvas: HTMLCanvasElement, func: (image: IMagickImage) => Promise<void>): Promise<void>;
    static readFromCanvas(canvas: HTMLCanvasElement, func: (image: IMagickImage) => void | Promise<void>): void | Promise<void> {
        return MagickImage._use(image => {
            image.readFromCanvas(canvas);
            func(image);
        });
    }
}

/** @internal */
const instance = ImageMagick._create();

export async function initializeImageMagick(): Promise<void> { await instance._initialize(); }
