/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import MagickNative from './wasm/magick.js';
import { ImageMagickApi } from './wasm/magick.js';
import { MagickColor } from './magick-color';
import { MagickImage } from './magick-image';
import { MagickReadSettings } from './settings/magick-read-settings';
import { _withNativeString } from './native/string';

export class ImageMagick {
    private readonly loader: Promise<void>;
    private api?: ImageMagickApi;

    private constructor() {
        this.loader = new Promise(resolve => {
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

    static _create(): ImageMagick { return new ImageMagick() }

    /** @internal */
    async _initialize(): Promise<void> { await this.loader; }

    /** @internal */
    static get _api(): ImageMagickApi {
        if (instance.api === undefined) // eslint-disable-line @typescript-eslint/no-use-before-define
            throw new Error('`await initializeImageMagick` should be called to initialize the library');

        return instance.api; // eslint-disable-line @typescript-eslint/no-use-before-define
    }

    /** @internal */
    static set _api(value: ImageMagickApi) {
        instance.api = value; // eslint-disable-line @typescript-eslint/no-use-before-define
    }

    static read(color: MagickColor, width: number, height: number, func: (image: MagickImage) => void): void;
    static read(color: MagickColor, width: number, height: number, func: (image: MagickImage) => Promise<void>): Promise<void>;
    static read(fileName: string, func: (image: MagickImage) => void): void;
    static read(fileName: string, func: (image: MagickImage) => Promise<void>): Promise<void>;
    static read(array: Uint8Array, func: (image: MagickImage) => void): void;
    static read(array: Uint8Array, func: (image: MagickImage) => Promise<void>): Promise<void>;
    static read(fileName: string, settings: MagickReadSettings, func: (image: MagickImage) => void): void;
    static read(fileName: string, settings: MagickReadSettings, func: (image: MagickImage) => Promise<void>): Promise<void>;
    static read(array: Uint8Array, settings: MagickReadSettings, func: (image: MagickImage) => void): void;
    static read(array: Uint8Array, settings: MagickReadSettings, func: (image: MagickImage) => Promise<void>): Promise<void>;
    static read(fileNameOrArrayOrColor: string | Uint8Array | MagickColor, funcOrSettingsOrWidth: MagickReadSettings | ((image: MagickImage) => void | Promise<void>) | number, funcOrheight?: ((image: MagickImage) => void | Promise<void>) | number, func?: (image: MagickImage) => void | Promise<void>): void | Promise<void> {
        MagickImage._use(image => {
            if (fileNameOrArrayOrColor instanceof MagickColor) {
                if (typeof funcOrSettingsOrWidth === 'number' && typeof funcOrheight === 'number')
                    image.read(fileNameOrArrayOrColor, funcOrSettingsOrWidth, funcOrheight);
                
                if (func !== undefined)
                    return func(image);
            } else if (funcOrSettingsOrWidth instanceof MagickReadSettings) {
                if (typeof fileNameOrArrayOrColor === 'string')
                    image.read(fileNameOrArrayOrColor, funcOrSettingsOrWidth);
                else
                    image.read(fileNameOrArrayOrColor, funcOrSettingsOrWidth);

                if (funcOrheight !== undefined && typeof funcOrheight !== 'number')
                    return funcOrheight(image);
            } else {
                if (typeof fileNameOrArrayOrColor === 'string')
                    image.read(fileNameOrArrayOrColor);
                else
                    image.read(fileNameOrArrayOrColor);

                if (typeof funcOrSettingsOrWidth !== 'number')
                    return funcOrSettingsOrWidth(image);
            }
        });
    }
}

/** @internal */
const instance = ImageMagick._create();

export async function initializeImageMagick(): Promise<void> { await instance._initialize() }