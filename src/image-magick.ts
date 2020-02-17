import MagickNative from './wasm/magick.js';
import { ImageMagickApi } from './wasm/magick.js';
import { MagickImage } from './magick-image';
import { withNativeString } from './util/string';

export class ImageMagick {
    private readonly loader: Promise<void>;
    private api?: ImageMagickApi;

    private constructor() {
        this.loader = new Promise(resolve => {
            MagickNative().then(api => {
                withNativeString(api, 'MAGICK_CONFIGURE_PATH', name => {
                    withNativeString(api, '/xml', value => {
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
            throw new Error("`await initializeImageMagick` should be called to initialize the library");

        return instance.api; // eslint-disable-line @typescript-eslint/no-use-before-define
    }

    /** @internal */
    static set _api(value: ImageMagickApi) {
        instance.api = value; // eslint-disable-line @typescript-eslint/no-use-before-define
    }

    static read(fileName: string, func: (image: MagickImage) => void): void;
    static read(fileName: string, func: (image: MagickImage) => Promise<void>): Promise<void>;
    static read(fileName: string, func: (image: MagickImage) => void | Promise<void>): void | Promise<void> {
        MagickImage._use((image) => {
            image.read(fileName);
            return func(image);
        });
    }
}

/** @internal */
const instance = ImageMagick._create();

export async function initializeImageMagick(): Promise<void> { await instance._initialize() }