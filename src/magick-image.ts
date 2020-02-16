import { AlphaOption } from "./alpha-option";
import { ColorSpace } from "./color-space";
import { Exception } from "./exception/exception";
import { ImageMagick } from "./image-magick";
import { MagickGeometry } from "./types/magick-geometry";
import { MagickNative } from "./wasm/magick";
import { MagickSettings } from "./settings/magick-settings";
import { NativeInstance } from "./native-instance";
import { PixelCollection } from "./pixels/pixel-collection";
import { withString } from "./util/string";
import { PixelChannel } from "./pixel-channel";

export class MagickImage extends NativeInstance {
    private readonly settings: MagickSettings;

    constructor() {
        super(-1, ImageMagick._api._MagickImage_Dispose);
        this.settings = new MagickSettings();
    }

    /** @internal */
    static _use<TReturnType>(im: MagickNative, func: (image: MagickImage) => TReturnType): TReturnType;
    static _use<TReturnType>(im: MagickNative, func: (image: MagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    static _use<TReturnType>(im: MagickNative, func: (image: MagickImage) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        const image = new MagickImage();
        try {
            return func(image);
        } finally {
            image.dispose();
        }
    }

    get channelCount(): number { return ImageMagick._api._MagickImage_ChannelCount_Get(this.instance); }

    get colorSpace(): ColorSpace {
        return Exception.usePointer((exception) => {
            return ImageMagick._api._MagickImage_ColorSpace_Get(this.instance, exception);
        });
    }

    get depth(): number { return ImageMagick._api._MagickImage_Depth_Get(this.instance); }
    set depth(value) { ImageMagick._api._MagickImage_Depth_Set(this.instance, value); }

    get format(): string { return ImageMagick._api.UTF8ToString(ImageMagick._api._MagickImage_Format_Get(this.instance)); }
    set format(value) { withString(value, (instance) => ImageMagick._api._MagickImage_Format_Set(this.instance, instance)); }

    get height(): number { return ImageMagick._api._MagickImage_Height_Get(this.instance); }

    get width(): number { return ImageMagick._api._MagickImage_Width_Get(this.instance); }

    alpha(value: AlphaOption): void {
        Exception.usePointer((exception) => {
            ImageMagick._api._MagickImage_SetAlpha(this.instance, value, exception);
        });
    }

    channelOffset(pixelChannel: PixelChannel): number {
        if (!ImageMagick._api._MagickImage_HasChannel(this.instance, pixelChannel))
            return -1;

        return ImageMagick._api._MagickImage_ChannelOffset(this.instance, pixelChannel);
    }

    drawOnCanvas(canvas: HTMLCanvasElement): void {
        canvas.width = this.width;
        canvas.height = this.height;

        const ctx = canvas.getContext("2d");
        if (ctx === null)
            return;

        PixelCollection._use(this, (pixels) => {
            let data = 0;
            try {
                data = pixels.toByteArray(0, 0, this.width, this.height, 'RGBA');

                const imageData = ctx.createImageData(this.width, this.height);

                let p = 0;
                let q = data;
                for (let y = 0; y < this.height; y++) {
                    for (let x = 0; x < this.width; x++) {
                        imageData.data[p++] = ImageMagick._api.HEAPU8[q++];
                        imageData.data[p++] = ImageMagick._api.HEAPU8[q++];
                        imageData.data[p++] = ImageMagick._api.HEAPU8[q++];
                        imageData.data[p++] = ImageMagick._api.HEAPU8[q++];
                    }
                }

                ImageMagick._api._free(data);
                data = 0;

                ctx.putImageData(imageData, 0, 0);
            }
            catch {
                if (data !== 0)
                    ImageMagick._api._free(data);
            }
        });
    }

    pixels<TReturnType>(func: (pixels: PixelCollection) => TReturnType): TReturnType {
        return PixelCollection._use(this, (pixels) => {
            return func(pixels);
        });
    }

    read(fileName: string): void {
        Exception.use((exception) => {
            this.settings._fileName = fileName;
            this.settings._use((settings) => {
                const instance = ImageMagick._api._MagickImage_ReadFile(settings.instance, exception.ptr);
                this._setInstance(instance, exception);
            });
        });
    }

    resize(geometry: MagickGeometry): void;
    resize(width: number, height: number): void;
    resize(widthOrGeometry: number | MagickGeometry, height?: number): void {
        const geometry = typeof widthOrGeometry === 'number' ? new MagickGeometry(widthOrGeometry, height as number) : widthOrGeometry;
        Exception.use((exception) => {
            withString(geometry.toString(), (geometryPtr) => {
                const image = ImageMagick._api._MagickImage_Resize(this.instance, geometryPtr, exception.ptr);
                this._setInstance(image, exception);
            });
        });
    }

    toString = (): string => `${this.format} ${this.width}x${this.height} ${this.depth}-bit ${ColorSpace[this.colorSpace]}`

    /** @internal */
    protected _instanceNotInitialized(): void {
        throw new Error('no image has been read');
    }
}
