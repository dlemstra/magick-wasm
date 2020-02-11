import { ImageMagick } from "./image-magick";
import { MagickNative } from "./wasm/magick";
import { ColorSpace } from "./color-space";
import { Exception } from "./exception/exception";
import { MagickSettings } from "./settings/magick-settings";
import { withString } from "./util/string";
import { MagickGeometry } from "./types/magick-geometry";
import { NativeInstance } from "./native-instance";

export class MagickImage extends NativeInstance
{
    constructor() { super(0, ImageMagick.api._MagickImage_Dispose); }

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
            return ImageMagick.api._MagickImage_ColorSpace_Get(this.instance, exception);
        });
    }

    get depth(): number { return ImageMagick.api._MagickImage_Depth_Get(this.instance); }
    set depth(value) { ImageMagick.api._MagickImage_Depth_Set(this.instance, value); }

    get format(): string { return ImageMagick.api.UTF8ToString(ImageMagick.api._MagickImage_Format_Get(this.instance)); }
    set format(value) { withString(value, (instance) => ImageMagick.api._MagickImage_Format_Set(this.instance, instance)); }

    get height(): number { return ImageMagick.api._MagickImage_Height_Get(this.instance); }

    get width(): number { return ImageMagick.api._MagickImage_Width_Get(this.instance); }

    read(fileName: string): void {
        Exception.useWithPointer((exception) => {
            MagickSettings.use((settings) => {
                settings.setFileName(fileName);
                const instance = ImageMagick.api._MagickImage_ReadFile(settings.instance, exception.ptr);
                this.setInstance(instance, exception);
            });
        });
    }

    resize(geometry: MagickGeometry): void;
    resize(width: number, height: number): void;
    resize(widthOrGeometry: number | MagickGeometry, height?: number): void {
        const geometry = typeof widthOrGeometry === 'number' ? new MagickGeometry(widthOrGeometry, height as number) : widthOrGeometry;
        Exception.useWithPointer((exception) => {
            withString(geometry.toString(), (geometryPtr) => {
                const image = ImageMagick.api._MagickImage_Resize(this.instance, geometryPtr, exception.ptr);
                this.setInstance(image, exception);
            });
        });
    }

    toString = (): string => `${this.format} ${this.width}x${this.height} ${this.depth}-bit ${ColorSpace[this.colorSpace]}`
}
