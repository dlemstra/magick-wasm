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
    setNative(native: MagickNativeClass) { this.native = native; }

    /** @internal */
    get nativeApi(): MagickNativeClass {
        if (this.native === undefined)
            throw new Error("`await initializeImageMagick` should be called to initialize the library.");

        return this.native;
    }

    static read(fileName: string, func: (image: MagickImage) => void): void;
    static read(fileName: string, func: (image: MagickImage) => Promise<void>): Promise<void>;
    static read(fileName: string, func: (image: MagickImage) => void | Promise<void>): void | Promise<void> {
        MagickImage.create(imageMagick.nativeApi, (image) => {
            image.read(fileName);
            return func(image);
        });
    }
}

/** @internal */
let imageMagick = new ImageMagick();

/** @internal */
export function nativeApi(native?: MagickNativeClass)
{
    if (native !== undefined) {
        imageMagick.setNative(native);
    }
    return imageMagick.nativeApi
}

export async function initializeImageMagick() { await imageMagick.initialize() }