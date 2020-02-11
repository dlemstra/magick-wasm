import { MagickNative } from "./wasm/magick";
import { ColorSpace } from "./color-space";
import { Exception } from "./exception/exception";
import { MagickSettings } from "./settings/magick-settings";
import { withString } from "./util/string";
import { MagickGeometry } from "./types/magick-geometry";
import { Pointer } from "./pointer/pointer";
import { nativeApi } from "./image-magick";

export class MagickImage
{
    private instance = 0;
    private native = nativeApi();

    /** @internal */
    constructor() { }

    /** @internal */
    static use<TReturnType>(im: MagickNative, func: (image: MagickImage) => TReturnType): TReturnType;
    static use<TReturnType>(im: MagickNative, func: (image: MagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    static use<TReturnType>(im: MagickNative, func: (image: MagickImage) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        const image = new MagickImage();
        try {
            return func(image);
        } finally {
            image.dispose();
        }
    }

    get colorSpace(): ColorSpace {
        return Exception.use((exception) => {
            return this.native._MagickImage_ColorSpace_Get(this.instance, exception);
        });
    }

    get depth(): number { return this.native._MagickImage_Depth_Get(this.instance); }
    set depth(value) { this.native._MagickImage_Depth_Set(this.instance, value); }

    get format(): string { return this.native.UTF8ToString(this.native._MagickImage_Format_Get(this.instance)); }
    set format(value) { withString(value, (instance) => this.native._MagickImage_Format_Set(this.instance, instance)); }

    get height(): number { return this.native._MagickImage_Height_Get(this.instance); }

    get width(): number { return this.native._MagickImage_Width_Get(this.instance); }

    dispose(): void {
        if (this.instance !== 0) {
            this.native._MagickImage_Dispose(this.instance);
            this.instance = 0;
        }
    }

    read(fileName: string): void {
        Exception.use((exception) => {
            MagickSettings.use((settings) => {
                settings.setFileName(fileName);
                this.instance = this.native._MagickImage_ReadFile(settings.getPointer(), exception);
            });
        });
    }

    resize(geometry: MagickGeometry): void;
    resize(width: number, height: number): void;
    resize(widthOrGeometry: number | MagickGeometry, height?: number): void {
        const geometry = typeof widthOrGeometry === 'number' ? new MagickGeometry(widthOrGeometry, height as number) : widthOrGeometry;
        Exception.useWithPointer((exception) => {
            withString(geometry.toString(), (geometryPtr) => {
                const image = this.native._MagickImage_Resize(this.getInstance(), geometryPtr, exception.ptr);
                this.setInstance(image, exception);
            });
        });
    }

    toString = (): string => `${this.format} ${this.width}x${this.height} ${this.depth}-bit ${ColorSpace[this.colorSpace]}`

    private disposeInstance(instance: number): number {
        if (instance !== 0) {
            this.native._MagickImage_Dispose(instance);
        }
        return 0;
    }

    private getInstance(): number {
        if (this.instance === 0) {
            throw new Error('image is disposed');
        }

        return this.instance;
    }

    private setInstance(instance: number, exception: Pointer): void {
        if (Exception.isError(exception)) {
            this.disposeInstance(instance);
        } else {
            this.disposeInstance(this.instance);
            this.instance = instance;
        }
    }
}
