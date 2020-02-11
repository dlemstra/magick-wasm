import MagickNative from './wasm/magick.js';
import { MagickNative as MagickNativeClass } from './wasm/magick.js';
import { MagickImage } from './magick-image';
import { withNativeString } from './util/string';

export class ImageMagick
{
    private loader: Promise<void>;
    private native?: MagickNativeClass;

    /** @internal */
    constructor() {
        this.loader = new Promise(resolve => {
            MagickNative().then((native) => {
                withNativeString(native, 'MAGICK_CONFIGURE_PATH', name => {
                    withNativeString(native, '/xml', value => {
                        native._Environment_SetEnv(name, value);
                        this.native = native;
                    });
                });
                resolve();
            });
        });
    }

    /** @internal */
    async initialize(): Promise<void> { await this.loader; }

    /** @internal */
    static get api(): MagickNativeClass {
        if (instance.native === undefined) // eslint-disable-line @typescript-eslint/no-use-before-define
            throw new Error("`await initializeImageMagick` should be called to initialize the library.");

        return instance.native; // eslint-disable-line @typescript-eslint/no-use-before-define
    }

    /** @internal */
    static set api(value: MagickNativeClass) {
        instance.native = value; // eslint-disable-line @typescript-eslint/no-use-before-define
    }

    static read(fileName: string, func: (image: MagickImage) => void): void;
    static read(fileName: string, func: (image: MagickImage) => Promise<void>): Promise<void>;
    static read(fileName: string, func: (image: MagickImage) => void | Promise<void>): void | Promise<void> {
        MagickImage.use(ImageMagick.api, (image) => {
            image.read(fileName);
            return func(image);
        });
    }
}

/** @internal */
const instance = new ImageMagick();

export async function initializeImageMagick(): Promise<void> { await instance.initialize() }