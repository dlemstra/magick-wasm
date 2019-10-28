import { MagickNative } from "../lib/wasm/magick";
import { ColorSpace } from "./color-space";
import { Exception } from "./exception/exception";
import { MagickSettings } from "./settings/magick-settings";
import { withString } from "./util/string";
import { MagickGeometry } from "./types/magick-geometry";
import { Pointer } from "./pointer/pointer";

export class MagickImage
{
    private instance = 0;

    private constructor(private im: MagickNative) { }

    /** @internal */
    static create<TReturnType>(im: MagickNative, func: (settings: MagickImage) => TReturnType): TReturnType {
        const image = new MagickImage(im);
        try {
            return func(image);
        } finally {
            image.dispose();
        }
    }

    /** @internal */
    static createImage(im: MagickNative): MagickImage {
        return new MagickImage(im);
    }

    get colorSpace(): ColorSpace {
        return Exception.create(this.im, (exception) => {
            return this.im._MagickImage_ColorSpace_Get(this.instance, exception);
        });
    }

    get depth(): number { return this.im._MagickImage_Depth_Get(this.instance); }
    set depth(value) { this.im._MagickImage_Depth_Set(this.instance, value); }

    get format(): string { return this.im.UTF8ToString(this.im._MagickImage_Format_Get(this.instance)); }
    set format(value) { withString(this.im, value, (instance) => this.im._MagickImage_Format_Set(this.instance, instance)); }

    get height(): number { return this.im._MagickImage_Height_Get(this.instance); }

    get width(): number { return this.im._MagickImage_Width_Get(this.instance); }

    dispose(): void {
        if (this.instance !== 0) {
            this.im._MagickImage_Dispose(this.instance);
            this.instance = 0;
        }
    }

    read(fileName: string): void {
        Exception.create(this.im, (exception) => {
            MagickSettings.create(this.im, (settings) => {
                settings.setFileName(fileName);
                this.instance = this.im._MagickImage_ReadFile(settings.getPointer(), exception);
            });
        });
    }

    resize(geometry: MagickGeometry): void;
    resize(width: number, height: number): void;
    resize(widthOrGeometry: number | MagickGeometry, height?: number): void {
        const geometry = typeof widthOrGeometry === 'number' ? new MagickGeometry(widthOrGeometry, height as number) : widthOrGeometry;
        Exception.createWithPointer(this.im, (exception) => {
            withString(this.im, geometry.toString(), (geometryPtr) => {
                const image = this.im._MagickImage_Resize(this.getInstance(), geometryPtr, exception.ptr);
                this.setInstance(image, exception);
            });
        });
    }

    toString = (): string => `${this.format} ${this.width}x${this.height} ${this.depth}-bit ${ColorSpace[this.colorSpace]}`

    private disposeInstance(instance: number): number {
        if (instance !== 0) {
            this.im._MagickImage_Dispose(instance);
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
        if (Exception.isError(this.im, exception)) {
            this.disposeInstance(instance);
        } else {
            this.disposeInstance(this.instance);
            this.instance = instance;
        }
    }
}