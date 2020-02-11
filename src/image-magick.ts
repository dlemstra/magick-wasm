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
    setNative(native: MagickNativeClass): void { this.native = native; }

    /** @internal */
    get nativeApi(): MagickNativeClass {
        if (this.native === undefined)
            throw new Error("`await initializeImageMagick` should be called to initialize the library.");

        return this.native;
    }

    static read(fileName: string, func: (image: MagickImage) => void): void;
    static read(fileName: string, func: (image: MagickImage) => Promise<void>): Promise<void>;
    static read(fileName: string, func: (image: MagickImage) => void | Promise<void>): void | Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        MagickImage.use(imageMagick.nativeApi, (image) => {
            image.read(fileName);
            return func(image);
        });
    }
}

/** @internal */
const imageMagick = new ImageMagick();

/** @internal */
export function nativeApi(native?: MagickNativeClass): MagickNativeClass {
    if (native !== undefined) {
        imageMagick.setNative(native);
    }
    return imageMagick.nativeApi
}

export async function initializeImageMagick(): Promise<void> { await imageMagick.initialize() }