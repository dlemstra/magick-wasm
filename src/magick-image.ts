// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { AlphaOption } from './alpha-option';
import { AutoThresholdMethod } from './auto-threshold-method';
import { Channels } from './channels';
import { ChromaticityInfo } from './chromaticity-info';
import { ClassType } from './class-type';
import { ColorSpace } from './color-space';
import { ColorType } from './color-type';
import { CompositeOperator } from './composite-operator';
import { CompressionMethod } from './compression-method';
import { Disposable } from './internal/disposable';
import { DisposableArray } from './internal/disposable-array';
import { DistortMethod } from './distort-method';
import { DistortSettings } from './settings/distort-settings';
import { DrawingWand } from './drawables/drawing-wand';
import { ErrorMetric } from './error-metric';
import { EvaluateOperator } from './evaluate-operator';
import { Exception } from './internal/exception/exception';
import { FilterType } from './filter-type';
import { Gravity } from './gravity';
import { ImageMagick } from './image-magick';
import { IDisposable } from './disposable';
import { IDrawable } from './drawables/drawable';
import { ImageProfile, IImageProfile } from './profiles/image-profile';
import { MagickColor } from './magick-color';
import { MagickError } from './magick-error';
import { MagickFormat } from './magick-format';
import { MagickGeometry } from './magick-geometry';
import { MagickImageCollection, IMagickImageCollection } from './magick-image-collection';
import { MagickReadSettings } from './settings/magick-read-settings';
import { MagickRectangle } from './internal/magick-rectangle';
import { MagickSettings } from './settings/magick-settings';
import { NativeInstance } from './native-instance';
import { OrientationType } from './orientation-type';
import { Percentage } from './percentage';
import { PixelChannel } from './pixel-channel';
import { PixelCollection, IPixelCollection } from './pixels/pixel-collection';
import { PixelInterpolateMethod } from './pixel-interpolate-method';
import { Point } from './point';
import { Pointer } from './internal/pointer/pointer';
import { PrimaryInfo } from './primary-info';
import { Quantum } from './quantum';
import { Statistics, IStatistics } from './statistics';
import { StringInfo } from './internal/string-info';
import { VirtualPixelMethod } from './virtual-pixel-method';
import { _createString, _withString } from './internal/native/string';
import { _getEdges } from './gravity';
import { _withDoubleArray } from './internal/native/array';

export interface IMagickImage extends IDisposable {
    /** @internal */
    _instance: number;
    /** @internal */
    _use<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
    /** @internal */
    _use<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    /** @internal */
    _use<TReturnType>(func: (image: IMagickImage) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType>;

    animationDelay: number;
    animationIterations: number;
    animationTicksPerSecond: number;
    readonly artifactNames: ReadonlyArray<string>;
    readonly attributeNames: ReadonlyArray<string>;
    backgroundColor: MagickColor;
    readonly baseHeight: number;
    readonly baseWidth: number;
    blackPointCompensation: boolean;
    borderColor: MagickColor;
    boundingBox: MagickGeometry | null;
    readonly channelCount: number;
    readonly channels: ReadonlyArray<PixelChannel>;
    chromaticity: ChromaticityInfo;
    classType: ClassType;
    colorFuzz: Percentage;
    colormapSize: number;
    colorSpace: ColorSpace;
    colorType : ColorType;
    comment: string | null;
    compose: CompositeOperator;
    readonly compression: CompressionMethod;
    depth: number;
    filterType: FilterType;
    format: MagickFormat;
    hasAlpha: boolean;
    readonly height: number;
    interpolate: PixelInterpolateMethod;
    label: string | null;
    orientation: OrientationType;
    page: MagickGeometry;
    quality: number;
    readonly settings: MagickSettings;
    readonly signature: string | null;
    virtualPixelMethod: VirtualPixelMethod;
    width: number;

    alpha(value: AlphaOption): void;
    autoOrient(): void;
    autoThreshold(method: AutoThresholdMethod): void;
    blur(): void;
    blur(channels: Channels): void;
    blur(radius: number, sigma: number): void;
    blur(radius: number, sigma: number, channels: Channels): void;
    border(size: number): void;
    border(width: number, height: number): void;
    brightnessContrast(brightness: Percentage, contrast: Percentage): void;
    brightnessContrast(brightness: Percentage, contrast: Percentage, channels: Channels): void;
    channelOffset(pixelChannel: PixelChannel): number;
    charcoal(): void;
    charcoal(radius: number, sigma: number): void;
    clahe(xTiles: number, yTiles: number, numberBins: number, clipLimit: number): void;
    clahe(xTiles: Percentage, yTiles: Percentage, numberBins: number, clipLimit: number): void;
    clone<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
    clone<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    colorAlpha(color: MagickColor): void;
    compare(image: IMagickImage, metric: ErrorMetric): number;
    compare(image: IMagickImage, metric: ErrorMetric, channels: Channels): number;
    composite(image: IMagickImage): void;
    composite(image: IMagickImage, compose: CompositeOperator): void;
    composite(image: IMagickImage, compose: CompositeOperator, channels: Channels): void;
    composite(image: IMagickImage, compose: CompositeOperator, args: string): void;
    composite(image: IMagickImage, compose: CompositeOperator, args: string, channels: Channels): void;
    composite(image: IMagickImage, point: Point): void;
    composite(image: IMagickImage, point: Point, channels: Channels): void;
    composite(image: IMagickImage, compose: CompositeOperator, point: Point): void;
    composite(image: IMagickImage, compose: CompositeOperator, point: Point, channels: Channels): void;
    composite(image: IMagickImage, compose: CompositeOperator, point: Point, args: string): void;
    composite(image: IMagickImage, compose: CompositeOperator, point: Point, args: string, channels: Channels): void;
    compositeGravity(image: IMagickImage, gravity: Gravity): void;
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator): void;
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, channels: Channels): void;
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, args: string): void;
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, args: string, channels: Channels): void;
    compositeGravity(image: IMagickImage, gravity: Gravity, point: Point): void;
    compositeGravity(image: IMagickImage, gravity: Gravity, point: Point, channels: Channels): void;
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, point: Point): void;
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, point: Point, channels: Channels): void;
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, point: Point, args: string): void;
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, point: Point, args: string, channels: Channels): void;
    contrast(): void;
    contrastStretch(blackPoint: Percentage): void;
    contrastStretch(blackPoint: Percentage, whitePoint: Percentage): void;
    contrastStretch(blackPoint: Percentage, whitePoint?: Percentage, channels?: Channels): void;
    crop(geometry: MagickGeometry): void;
    crop(geometry: MagickGeometry, gravity: Gravity): void;
    crop(width: number, height: number): void;
    crop(width: number, height: number, gravity: Gravity): void;
    cropToTiles(geometry: MagickGeometry): IMagickImageCollection;
    deskew(threshold: Percentage): number;
    distort(method: DistortMethod, params: number[]): void;
    distort(method: DistortMethod, settings: DistortSettings, params: number[]): void;
    draw(drawables: IDrawable[]): void;
    draw(...drawables: IDrawable[]): void;
    evaluate(channels: Channels, operator: EvaluateOperator, value: number): void;
    evaluate(channels: Channels, operator: EvaluateOperator, value: Percentage): void;
    evaluate(channels: Channels, geometry: MagickGeometry, operator: EvaluateOperator, value: number): void;
    evaluate(channels: Channels, geometry: MagickGeometry, operator: EvaluateOperator, value: Percentage): void;
    extent(width: number, height: number): void;
    extent(width: number, height: number, gravity: Gravity): void;
    extent(width: number, height: number, backgroundColor: MagickColor): void;
    extent(geometry: MagickGeometry): void;
    extent(geometry: MagickGeometry, gravity: Gravity): void;
    extent(geometry: MagickGeometry, gravity: Gravity, backgroundColor: MagickColor): void;
    extent(geometry: MagickGeometry, backgroundColor: MagickColor): void;
    flip(): void;
    flop(): void;
    getArtifact(name: string): string | null;
    getAttribute(name: string): string | null;
    getProfile(name: string): IImageProfile | null;
    getWriteMask<TReturnType>(func: (mask: IMagickImage | null) => TReturnType): TReturnType;
    getWriteMask<TReturnType>(func: (mask: IMagickImage | null) => Promise<TReturnType>): Promise<TReturnType>;
    getPixels<TReturnType>(func: (pixels: IPixelCollection) => TReturnType): TReturnType;
    getPixels<TReturnType>(func: (pixels: IPixelCollection) => Promise<TReturnType>): Promise<TReturnType>;
    histogram(): Map<string, number>;
    inverseContrast(): void;
    inverseOpaque(target: MagickColor, fill: MagickColor): void;
    inverseSigmoidalContrast(contrast: number): void;
    inverseSigmoidalContrast(contrast: number, midpointPercentage: Percentage): void;
    inverseSigmoidalContrast(contrast: number, midpoint: number): void;
    inverseSigmoidalContrast(contrast: number, midpoint: number, channels: Channels): void;
    inverseTransparent(color: MagickColor): void;
    level(blackPoint: Percentage, whitePoint: Percentage): void;
    level(blackPoint: Percentage, whitePoint: Percentage, gamma: number): void;
    level(channels: Channels, blackPoint: Percentage, whitePoint: Percentage): void;
    level(channels: Channels, blackPoint: Percentage, whitePoint: Percentage, gamma: number): void;
    linearStretch(blackPoint: Percentage, whitePoint: Percentage): void;
    liquidRescale(geometry: MagickGeometry): void;
    liquidRescale(width: number, height: number): void;
    modulate(brightness: Percentage): void;
    modulate(brightness: Percentage, saturation: Percentage): void;
    modulate(brightness: Percentage, saturation: Percentage, hue: Percentage): void;
    negate(): void;
    negate(channels: Channels): void;
    negateGrayScale(): void;
    negateGrayScale(channels: Channels): void;
    normalize(): void;
    oilPaint(): void;
    oilPaint(radius: number): void;
    opaque(target: MagickColor, fill: MagickColor): void;
    ping(fileName: string, settings?: MagickReadSettings): void;
    ping(array: Uint8Array, settings?: MagickReadSettings): void;
    read(color: MagickColor, width: number, height: number): void;
    read(fileName: string, settings?: MagickReadSettings): void;
    read(array: Uint8Array, settings?: MagickReadSettings): void;
    readFromCanvas(canvas: HTMLCanvasElement): void;
    removeArtifact(name: string): void;
    removeAttribute(name: string): void;
    removeWriteMask(): void;
    repage(): void;
    resize(geometry: MagickGeometry): void;
    resize(width: number, height: number): void;
    rotate(degrees: number): void;
    separate<TReturnType>(func: (images: IMagickImageCollection) => TReturnType): TReturnType;
    separate<TReturnType>(func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
    separate<TReturnType>(func: (images: IMagickImageCollection) => TReturnType, channels: Channels): TReturnType;
    separate<TReturnType>(func: (images: IMagickImageCollection) => Promise<TReturnType>, channels: Channels): Promise<TReturnType>;
    setArtifact(name: string, value: string): void;
    setArtifact(name: string, value: boolean): void;
    setAttribute(name: string, value: string): void;
    setWriteMask(image: IMagickImage): void;
    sharpen(): void;
    sharpen(radius: number, sigma: number): void;
    sharpen(radius: number, sigma: number, channels: Channels): void;
    shave(leftRight: number, topBottom: number): void;
    sigmoidalContrast(contrast: number): void;
    sigmoidalContrast(contrast: number, midpointPercentage: Percentage): void;
    sigmoidalContrast(contrast: number, midpoint: number): void;
    sigmoidalContrast(contrast: number, midpoint: number, channels: Channels): void;
    splice(geometry: MagickGeometry): void;
    statistics(): IStatistics;
    statistics(channels: Channels): IStatistics;
    strip(): void;
    toString(): string;
    transparent(color: MagickColor): void;
    trim(): void;
    trim(...edges: Gravity[]): void;
    trim(percentage: Percentage): void;
    vignette(): void;
    vignette(radius: number, sigma: number, x: number, y: number): void;
    wave(): void;
    wave(method: PixelInterpolateMethod, amplitude: number, length: number): void;
    write<TReturnType>(func: (data: Uint8Array) => TReturnType, format?: MagickFormat): TReturnType;
    write<TReturnType>(func: (data: Uint8Array) => Promise<TReturnType>, format?: MagickFormat): Promise<TReturnType>;
    writeToCanvas(canvas: HTMLCanvasElement): void;
}

export class MagickImage extends NativeInstance implements IMagickImage {
    private readonly _settings: MagickSettings;

    private constructor(instance: number, settings: MagickSettings) {
        super(instance, ImageMagick._api._MagickImage_Dispose);
        this._settings = settings;
    }

    get animationDelay(): number { return ImageMagick._api._MagickImage_AnimationDelay_Get(this._instance); }
    set animationDelay(value: number) { ImageMagick._api._MagickImage_AnimationDelay_Set(this._instance, value); }

    get animationIterations(): number { return ImageMagick._api._MagickImage_AnimationIterations_Get(this._instance); }
    set animationIterations(value: number) { ImageMagick._api._MagickImage_AnimationIterations_Set(this._instance, value); }

    get animationTicksPerSecond(): number { return ImageMagick._api._MagickImage_AnimationTicksPerSecond_Get(this._instance); }
    set animationTicksPerSecond(value: number) { ImageMagick._api._MagickImage_AnimationTicksPerSecond_Set(this._instance, value); }

    get artifactNames(): ReadonlyArray<string> {
        const artifactNames: string[] = [];
        ImageMagick._api._MagickImage_ResetArtifactIterator(this._instance);
        let name = ImageMagick._api._MagickImage_GetNextArtifactName(this._instance);
        while (name !== 0) {
            artifactNames.push(ImageMagick._api.UTF8ToString(name));
            name = ImageMagick._api._MagickImage_GetNextArtifactName(this._instance);
        }

        return artifactNames;
    }

    get attributeNames(): ReadonlyArray<string> {
        const artifactNames: string[] = [];
        ImageMagick._api._MagickImage_ResetAttributeIterator(this._instance);
        let name = ImageMagick._api._MagickImage_GetNextAttributeName(this._instance);
        while (name !== 0) {
            artifactNames.push(ImageMagick._api.UTF8ToString(name));
            name = ImageMagick._api._MagickImage_GetNextAttributeName(this._instance);
        }

        return artifactNames;
    }

    get backgroundColor(): MagickColor {
        const colorPtr = ImageMagick._api._MagickImage_BackgroundColor_Get(this._instance);
        return MagickColor._create(colorPtr);
    }
    set backgroundColor(value: MagickColor) {
        value._use(valuePtr => {
            ImageMagick._api._MagickImage_BackgroundColor_Set(this._instance, valuePtr);
        });
    }

    get baseHeight(): number {
        return ImageMagick._api._MagickImage_BaseHeight_Get(this._instance);
    }

    get baseWidth(): number {
        return ImageMagick._api._MagickImage_BaseWidth_Get(this._instance);
    }

    get blackPointCompensation(): boolean {
        return ImageMagick._api._MagickImage_BlackPointCompensation_Get(this._instance) === 1;
    }

    set blackPointCompensation(value: boolean) {
        ImageMagick._api._MagickImage_BlackPointCompensation_Set(this._instance, value ? 1 : 0);
    }

    get borderColor(): MagickColor {
        const colorPtr = ImageMagick._api._MagickImage_BorderColor_Get(this._instance);
        return MagickColor._create(colorPtr);
    }
    set borderColor(value: MagickColor) {
        value._use(valuePtr => {
            ImageMagick._api._MagickImage_BorderColor_Set(this._instance, valuePtr);
        });
    }

    get boundingBox(): MagickGeometry | null {
        return Exception.usePointer(exception => {
            const boundingBox = ImageMagick._api._MagickImage_BoundingBox_Get(this._instance, exception);
            const geometry = MagickGeometry._fromRectangle(boundingBox);
            if (geometry.width === 0 || geometry.height === 0)
                return null;

            return geometry;
        });
    }

    get channelCount(): number { return ImageMagick._api._MagickImage_ChannelCount_Get(this._instance); }

    get channels(): ReadonlyArray<PixelChannel> {
        const channels: PixelChannel[] = [];
        [PixelChannel.Red, PixelChannel.Green, PixelChannel.Blue, PixelChannel.Black, PixelChannel.Alpha].forEach(channel => {
            if (ImageMagick._api._MagickImage_HasChannel(this._instance, channel))
                channels.push(channel);
        })

        return channels;
    }

    get chromaticity(): ChromaticityInfo {
        return new ChromaticityInfo(
            PrimaryInfo._create(ImageMagick._api._MagickImage_ChromaRedPrimary_Get(this._instance)),
            PrimaryInfo._create(ImageMagick._api._MagickImage_ChromaGreenPrimary_Get(this._instance)),
            PrimaryInfo._create(ImageMagick._api._MagickImage_ChromaBluePrimary_Get(this._instance)),
            PrimaryInfo._create(ImageMagick._api._MagickImage_ChromaWhitePoint_Get(this._instance)));
    }
    set chromaticity(value: ChromaticityInfo) {
        value.blue._use(primaryInfoPtr => ImageMagick._api._MagickImage_ChromaBluePrimary_Set(this._instance, primaryInfoPtr));
        value.green._use(primaryInfoPtr => ImageMagick._api._MagickImage_ChromaGreenPrimary_Set(this._instance, primaryInfoPtr));
        value.red._use(primaryInfoPtr => ImageMagick._api._MagickImage_ChromaRedPrimary_Set(this._instance, primaryInfoPtr));
        value.white._use(primaryInfoPtr => ImageMagick._api._MagickImage_ChromaWhitePoint_Set(this._instance, primaryInfoPtr));
    }

    get classType(): ClassType {
        return Exception.usePointer(exception => {
            return ImageMagick._api._MagickImage_ClassType_Get(this._instance, exception);
        });
    }
    set classType(value: ClassType) {
        Exception.usePointer(exception => {
            ImageMagick._api._MagickImage_ClassType_Set(this._instance, value, exception);
        });
    }

    get colorFuzz(): Percentage { return Percentage.fromQuantum(ImageMagick._api._MagickImage_ColorFuzz_Get(this._instance)); }
    set colorFuzz(value: Percentage) { ImageMagick._api._MagickImage_ColorFuzz_Set(this._instance, value.toQuantum()); }

    get colormapSize(): number {
        return Exception.usePointer(exception => {
            return ImageMagick._api._MagickImage_ColormapSize_Get(this._instance, exception);
        });
    }
    set colormapSize(value: number) {
        Exception.usePointer(exception => {
            ImageMagick._api._MagickImage_ColormapSize_Set(this._instance, value, exception);
        });
    }

    get colorSpace(): ColorSpace {
        return Exception.usePointer(exception => {
            return ImageMagick._api._MagickImage_ColorSpace_Get(this._instance, exception);
        });
    }
    set colorSpace(value: ColorSpace) {
        Exception.usePointer(exception => {
            ImageMagick._api._MagickImage_ColorSpace_Set(this._instance, value, exception);
        });
    }

    get colorType(): ColorType {
        if (this.settings.colorType !== undefined) {
            return this.settings.colorType;
        }

        return Exception.usePointer(exception => {
            return ImageMagick._api._MagickImage_ColorType_Get(this._instance, exception);
        });
    }
    set colorType(value: ColorType) {
        Exception.usePointer(exception => {
            ImageMagick._api._MagickImage_ColorType_Set(this._instance, value, exception);
        });
    }

    get comment(): string | null {
        return this.getAttribute('comment');
    }
    set comment(value: string | null) {
        if (value === null)
            this.removeAttribute('comment');
        else
            this.setAttribute('comment', value);
    }

    get compose(): CompositeOperator {
        return ImageMagick._api._MagickImage_Compose_Get(this._instance);
    }
    set compose(value: CompositeOperator) {
        ImageMagick._api._MagickImage_Compose_Set(this._instance, value);
    }

    get compression(): CompressionMethod {
        return ImageMagick._api._MagickImage_Compression_Get(this._instance);
    }

    get depth(): number { return ImageMagick._api._MagickImage_Depth_Get(this._instance); }
    set depth(value: number) { ImageMagick._api._MagickImage_Depth_Set(this._instance, value); }

    get filterType(): number { return ImageMagick._api._MagickImage_FilterType_Get(this._instance); }
    set filterType(value: number) { ImageMagick._api._MagickImage_FilterType_Set(this._instance, value); }

    get format(): MagickFormat { return _createString(ImageMagick._api._MagickImage_Format_Get(this._instance), '') as MagickFormat; }
    set format(value: MagickFormat) { _withString(value.toString(), instance => ImageMagick._api._MagickImage_Format_Set(this._instance, instance)); }

    get hasAlpha(): boolean {
        return Exception.usePointer(exception => {
            return this.toBool(ImageMagick._api._MagickImage_HasAlpha_Get(this._instance, exception));
        });
    }
    set hasAlpha(value: boolean) {
        Exception.usePointer(exception => {
            if (value)
                this.alpha(AlphaOption.Opaque);

            ImageMagick._api._MagickImage_HasAlpha_Set(this._instance, this.fromBool(value), exception);
        });
    }

    get height(): number { return ImageMagick._api._MagickImage_Height_Get(this._instance); }

    get interpolate(): PixelInterpolateMethod {
        return ImageMagick._api._MagickImage_Interpolate_Get(this._instance);
    }
    set interpolate(value: PixelInterpolateMethod) {
        ImageMagick._api._MagickImage_Interpolate_Set(this._instance, value);
    }

    get label(): string | null {
        return this.getAttribute('label');
    }
    set label(value: string | null) {
        if (value === null)
            this.removeAttribute('label');
        else
            this.setAttribute('label', value);
    }


    get orientation(): OrientationType { return ImageMagick._api._MagickImage_Orientation_Get(this._instance); }
    set orientation(value: OrientationType) { ImageMagick._api._MagickImage_Orientation_Set(this._instance, value); }

    get page(): MagickGeometry {
        const rectangle = ImageMagick._api._MagickImage_Page_Get(this._instance);
        return MagickGeometry._fromRectangle(rectangle);
    }
    set page(value: MagickGeometry) {
        value._toRectangle(rectangle => {
            ImageMagick._api._MagickImage_Page_Set(this._instance, rectangle);
        });
    }

    get quality(): number { return ImageMagick._api._MagickImage_Quality_Get(this._instance); }
    set quality(value: number) {
        let quality = value < 1 ? 1 : value;
        quality = quality > 100 ? 100 : quality;

        ImageMagick._api._MagickImage_Quality_Set(this._instance, quality);
        this._settings._quality = quality;
    }

    get settings(): MagickSettings {
        return this._settings;
    }

    get signature(): string | null {
        return Exception.usePointer(exception => {
            return _createString(ImageMagick._api._MagickImage_Signature_Get(this._instance, exception));
        });
    }

    get virtualPixelMethod(): VirtualPixelMethod {
        return Exception.usePointer(exception => {
            return ImageMagick._api._MagickImage_VirtualPixelMethod_Get(this._instance, exception);
        });
    }
    set virtualPixelMethod(value: VirtualPixelMethod) {
        Exception.usePointer(exception => {
            ImageMagick._api._MagickImage_VirtualPixelMethod_Set(this._instance, value, exception);
        });
    }

    get width(): number { return ImageMagick._api._MagickImage_Width_Get(this._instance); }

    alpha(value: AlphaOption): void {
        Exception.usePointer(exception => {
            ImageMagick._api._MagickImage_SetAlpha(this._instance, value, exception);
        });
    }

    autoOrient(): void {
        Exception.use(exception => {
            const instance = ImageMagick._api._MagickImage_AutoOrient(this._instance, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    autoThreshold(method: AutoThresholdMethod): void {
        Exception.use(exception => {
            ImageMagick._api._MagickImage_AutoThreshold(this._instance, method, exception.ptr);
        });
    }

    blur(): void;
    blur(channels: Channels): void;
    blur(radius: number, sigma: number): void;
    blur(radius: number, sigma: number, channels: Channels): void;
    blur(radiusOrChannel?: number | Channels, sigmaOrUndefined?: number, channelsOrUndefined?: Channels): void {
        let radius = 0;
        const sigma = this.valueOrDefault(sigmaOrUndefined, 1);
        let channels = this.valueOrDefault(channelsOrUndefined, Channels.Undefined);

        if (typeof radiusOrChannel === 'number')
            radius = radiusOrChannel;
        else if (radiusOrChannel !== undefined)
            channels = radiusOrChannel;

        Exception.use(exception => {
            const instance = ImageMagick._api._MagickImage_Blur(this._instance, radius, sigma, channels, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    border(size: number): void;
    border(width: number, height: number): void;
    border(sizeOrWidth: number, heightOrUndefined?: number): void {
        const width = sizeOrWidth;
        const height = this.valueOrDefault(heightOrUndefined, sizeOrWidth);
        const geometry = new MagickGeometry(0, 0, width, height);

        Exception.use(exception => {
            geometry._toRectangle(rectangle => {
                const instance = ImageMagick._api._MagickImage_Border(this._instance, rectangle, exception.ptr);
                this._setInstance(instance, exception);
            });
        });
    }

    brightnessContrast(brightness: Percentage, contrast: Percentage): void;
    brightnessContrast(brightness: Percentage, contrast: Percentage, channels: Channels): void;
    brightnessContrast(brightness: Percentage, contrast: Percentage, channelsOrUndefined?: Channels): void {
        const channels = this.valueOrDefault(channelsOrUndefined, Channels.Undefined);

        Exception.use(exception => {
           ImageMagick._api._MagickImage_BrightnessContrast(this._instance, brightness.toDouble(), contrast.toDouble(), channels, exception.ptr);
        });
    }

    channelOffset(pixelChannel: PixelChannel): number {
        if (!ImageMagick._api._MagickImage_HasChannel(this._instance, pixelChannel))
            return -1;

        return ImageMagick._api._MagickImage_ChannelOffset(this._instance, pixelChannel);
    }

    charcoal(): void;
    charcoal(radius: number, sigma: number): void;
    charcoal(radiusOrUndefined?: number, sigmaOrUndefined?: number): void {
        const radius = radiusOrUndefined === undefined ? 0 : radiusOrUndefined;
        const sigma =sigmaOrUndefined === undefined ? 1 :sigmaOrUndefined;
        Exception.use(exception => {
            const instance = ImageMagick._api._MagickImage_Charcoal(this._instance, radius, sigma, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    clahe(xTiles: number, yTiles: number, numberBins: number, clipLimit: number): void;
    clahe(xTiles: Percentage, yTiles: Percentage, numberBins: number, clipLimit: number): void;
    clahe(xTiles: number | Percentage, yTiles: number | Percentage, numberBins: number, clipLimit: number): void {
        Exception.usePointer(exception => {
            const xTilesValue = xTiles instanceof Percentage ? xTiles.multiply(this.width) : xTiles;
            const yTilesValue = yTiles instanceof Percentage ? yTiles.multiply(this.height) : yTiles;
            ImageMagick._api._MagickImage_Clahe(this._instance, xTilesValue, yTilesValue, numberBins, clipLimit, exception);
        });
    }

    clone<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
    clone<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    clone<TReturnType>(func: (image: IMagickImage) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        const image = MagickImage._clone(this);
        return image._use(func);
    }

    colorAlpha(color: MagickColor): void {
        if (!this.hasAlpha)
            return;

        const canvas = MagickImage.create();
        canvas.read(color, this.width, this.height);
        canvas.composite(this, CompositeOperator.SrcOver, new Point(0, 0));
        this._instance = canvas._instance;
    }

    compare(image: IMagickImage, metric: ErrorMetric): number;
    compare(image: IMagickImage, metric: ErrorMetric, channels: Channels): number;
    compare(image: IMagickImage, metric: ErrorMetric, channelsOrUndefined?: Channels): number {
        return Exception.usePointer(exception => {
            const channels = this.valueOrDefault(channelsOrUndefined, Channels.Undefined);
            return ImageMagick._api._MagickImage_CompareDistortion(this._instance, image._instance, metric, channels, exception);
        });
    }

    composite(image: IMagickImage): void;
    composite(image: IMagickImage, compose: CompositeOperator): void;
    composite(image: IMagickImage, compose: CompositeOperator, channels: Channels): void;
    composite(image: IMagickImage, compose: CompositeOperator, args: string): void;
    composite(image: IMagickImage, compose: CompositeOperator, args: string, channels: Channels): void;
    composite(image: IMagickImage, point: Point): void;
    composite(image: IMagickImage, point: Point, channels: Channels): void;
    composite(image: IMagickImage, compose: CompositeOperator, point: Point): void;
    composite(image: IMagickImage, compose: CompositeOperator, point: Point, channels: Channels): void;
    composite(image: IMagickImage, compose: CompositeOperator, point: Point, args: string): void;
    composite(image: IMagickImage, compose: CompositeOperator, point: Point, args: string, channels: Channels): void;
    composite(image: IMagickImage, composeOrPoint?: CompositeOperator | Point, pointOrArgsOrChannels?: Point | string | Channels, channelsOrArgs?:  Channels | string, channelsOrUndefined?: Channels): void {
        let x = 0;
        let y = 0;
        let compose = CompositeOperator.In;
        let channels = Channels.Default;
        let args: string | null = null;

        if (composeOrPoint instanceof Point) {
            x = composeOrPoint.x;
            y = composeOrPoint.y;
        } else if (composeOrPoint !== undefined) {
            compose = composeOrPoint;
        }

        if (pointOrArgsOrChannels instanceof Point) {
            x = pointOrArgsOrChannels.x;
            y = pointOrArgsOrChannels.y;
        } else if (typeof pointOrArgsOrChannels === 'string') {
            args = pointOrArgsOrChannels;
        } else if (pointOrArgsOrChannels !== undefined) {
            channels = pointOrArgsOrChannels;
        }

        if (typeof channelsOrArgs === 'string')
            args = channelsOrArgs;
        else if (channelsOrArgs !== undefined)
            channels = channelsOrArgs;

        if (channelsOrUndefined !== undefined)
            channels = channelsOrUndefined;

        if (args !== null)
            this.setArtifact('compose:args', args);

        Exception.usePointer(exception => {
            ImageMagick._api._MagickImage_Composite(this._instance, image._instance, x, y, compose, channels, exception);
        });

        if (args !== null)
            this.removeArtifact('compose:args');
    }

    compositeGravity(image: IMagickImage, gravity: Gravity): void;
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator): void;
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, channels: Channels): void;
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, args: string): void;
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, args: string, channels: Channels): void;
    compositeGravity(image: IMagickImage, gravity: Gravity, point: Point): void;
    compositeGravity(image: IMagickImage, gravity: Gravity, point: Point, channels: Channels): void;
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, point: Point): void;
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, point: Point, channels: Channels): void;
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, point: Point, args: string): void;
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, point: Point, args: string, channels: Channels): void;
    compositeGravity(image: IMagickImage, gravity: Gravity, composeOrPoint?: CompositeOperator | Point, pointOrArgsOrChannels?: Point | string | Channels, channelsOrArgs?:  Channels | string, channelsOrUndefined?: Channels): void {
        let x = 0;
        let y = 0;
        let compose = CompositeOperator.In;
        let channels = Channels.Default;
        let args: string | null = null;

        if (composeOrPoint instanceof Point) {
            x = composeOrPoint.x;
            y = composeOrPoint.y;
        } else if (composeOrPoint !== undefined) {
            compose = composeOrPoint;
        }

        if (pointOrArgsOrChannels instanceof Point) {
            x = pointOrArgsOrChannels.x;
            y = pointOrArgsOrChannels.y;
        } else if (typeof pointOrArgsOrChannels === 'string') {
            args = pointOrArgsOrChannels;
        } else if (pointOrArgsOrChannels !== undefined) {
            channels = pointOrArgsOrChannels;
        }

        if (typeof channelsOrArgs === 'string')
            args = channelsOrArgs;
        else if (channelsOrArgs !== undefined)
            channels = channelsOrArgs;

        if (channelsOrUndefined !== undefined)
            channels = channelsOrUndefined;

        if (args !== null)
            this.setArtifact('compose:args', args);

        Exception.usePointer(exception => {
            ImageMagick._api._MagickImage_CompositeGravity(this._instance, image._instance, gravity, x, y, compose, channels, exception);
        });

        if (args !== null)
            this.removeArtifact('compose:args');
    }

    contrast = () => this._contrast(true);

    contrastStretch(blackPoint: Percentage): void;
    contrastStretch(blackPoint: Percentage, whitePoint: Percentage): void;
    contrastStretch(blackPoint: Percentage, whitePointOrUndefined?: Percentage, channelsOrUndefined?: Channels): void {
        const pixels = this.width * this.height;
        const lower = blackPoint.multiply(pixels);
        const upper = pixels - (whitePointOrUndefined ?? blackPoint).multiply(pixels);
        const channels = this.valueOrDefault(channelsOrUndefined, Channels.Undefined);

        Exception.usePointer(exception => {
            ImageMagick._api._MagickImage_ContrastStretch(this._instance, lower, upper, channels, exception);
        });
    }

    static create(): IMagickImage;
    static create(color: MagickColor, width: number, height: number): IMagickImage;
    static create(fileName: string, settings?: MagickReadSettings): IMagickImage;
    static create(array: Uint8Array, settings?: MagickReadSettings): IMagickImage;
    static create(fileNameOrArrayOrColorOrUndefined?: string | Uint8Array | MagickColor, settingsOrWidthOrUndefined?: MagickReadSettings | number, heightOrUndefined?: number): IMagickImage {
        const image = new MagickImage(MagickImage.createInstance(), new MagickSettings());
        if (fileNameOrArrayOrColorOrUndefined !== undefined)
            image.readOrPing(false, fileNameOrArrayOrColorOrUndefined, settingsOrWidthOrUndefined, heightOrUndefined);
        return image;
    }

    crop(geometry: MagickGeometry): void;
    crop(geometry: MagickGeometry, gravity: Gravity): void;
    crop(width: number, height: number): void;
    crop(width: number, height: number, gravity: Gravity): void;
    crop(geometryOrWidth: MagickGeometry | number, heightOrGravity?: number | Gravity, gravityOrUndefined?: Gravity): void {
        let geometry: MagickGeometry;
        let gravity: Gravity;

        if (geometryOrWidth instanceof MagickGeometry) {
            geometry = geometryOrWidth;
            gravity = this.valueOrDefault(heightOrGravity, Gravity.Undefined);
        } else if (heightOrGravity !== undefined) {
            geometry = new MagickGeometry(geometryOrWidth, heightOrGravity);
            gravity = this.valueOrDefault(gravityOrUndefined, Gravity.Undefined);
        }

        Exception.use(exception => {
            _withString(geometry.toString(), geometryPtr => {
                const instance = ImageMagick._api._MagickImage_Crop(this._instance, geometryPtr, gravity, exception.ptr);
                this._setInstance(instance, exception);
            });
        });
    }

    cropToTiles(geometry: MagickGeometry): IMagickImageCollection
    {
        return Exception.use(exception => {
            return _withString(geometry.toString(), geometryPtr => {
                const images = ImageMagick._api._MagickImage_CropToTiles(this._instance, geometryPtr, exception.ptr);
                const collection = MagickImageCollection._createFromImages(images, this._settings);
                return collection;
            });
        });
    }

    deskew(threshold: Percentage): number {
        Exception.use(exception => {
            const instance = ImageMagick._api._MagickImage_Deskew(this._instance, threshold.toQuantum(), exception.ptr);
            this._setInstance(instance, exception);
        });

        const angle = Number(this.getArtifact('deskew:angle'));
        return isNaN(angle) ? 0.0 : angle;
    }

    distort(method: DistortMethod, params: number[]): void;
    distort(method: DistortMethod, settings: DistortSettings, params: number[]): void;
    distort(method: DistortMethod, settingsOrParams: number[] | DistortSettings, params?: number[]): void {
        let distortArgs: number[];
        let bestFit = 0;
        let settings: DistortSettings | null = null;
        if (settingsOrParams instanceof Array) {
            distortArgs = settingsOrParams;
        } else if (params instanceof Array) {
            distortArgs = params;
            settings = <DistortSettings>settingsOrParams;
            bestFit = settings.bestFit ? 1 : 0;

            settings._setArtifacts(this);
        } else {
            distortArgs = [];
        }

        Exception.use(exception => {
            _withDoubleArray(distortArgs, (distortArgsPtr: number) => {
                const instance = ImageMagick._api._MagickImage_Distort(this._instance, method, bestFit, distortArgsPtr, distortArgs.length, exception.ptr);
                this._setInstance(instance, exception)
            });
        });

        if (settings !== null)
            settings._removeArtifacts(this);
    }

    draw(drawables: IDrawable[]): void;
    draw(...drawables: IDrawable[]): void;
    draw(...drawables: IDrawable[][] | IDrawable[]): void {
        const wand = DrawingWand._create(this, this._settings);
        try {
            wand.draw(drawables.flat());
        }
        finally {
            wand.dispose();
        }
    }

    evaluate(channels: Channels, operator: EvaluateOperator, value: number): void;
    evaluate(channels: Channels, operator: EvaluateOperator, value: Percentage): void;
    evaluate(channels: Channels, geometry: MagickGeometry, operator: EvaluateOperator, value: number): void;
    evaluate(channels: Channels, geometry: MagickGeometry, operator: EvaluateOperator, value: Percentage): void;
    evaluate(channels: Channels, operatorOrGeometry: EvaluateOperator | MagickGeometry, valueOrPercentageOrOperator: number | Percentage | EvaluateOperator, valueOrPercentage?: number | Percentage): void {
        if (typeof operatorOrGeometry === 'number') {
            const operator = operatorOrGeometry;
            const value = typeof valueOrPercentageOrOperator === 'number' ? valueOrPercentageOrOperator : valueOrPercentageOrOperator.toQuantum();
            Exception.usePointer(exception => {
                ImageMagick._api._MagickImage_EvaluateOperator(this._instance, channels, operator, value, exception);
            });
        } else if (valueOrPercentage !== undefined) {
            if (typeof valueOrPercentageOrOperator !== 'number')
                throw new MagickError('this should not happen');

            const geometry = operatorOrGeometry;
            const operator = valueOrPercentageOrOperator;
            const value = typeof valueOrPercentage === 'number' ? valueOrPercentage : valueOrPercentage.toQuantum();

            if (geometry.isPercentage)
                throw new MagickError('percentage is not supported');

            Exception.usePointer(exception => {
                MagickRectangle.use(this, geometry, rectangle => {
                    ImageMagick._api._MagickImage_EvaluateGeometry(this._instance, channels, rectangle, operator, value, exception);
                })
            });
        }

    }

    extent(width: number, height: number): void;
    extent(width: number, height: number, gravity: Gravity): void;
    extent(width: number, height: number, backgroundColor: MagickColor): void;
    extent(geometry: MagickGeometry): void;
    extent(geometry: MagickGeometry, gravity: Gravity): void;
    extent(geometry: MagickGeometry, gravity: Gravity, backgroundColor: MagickColor): void;
    extent(geometry: MagickGeometry, backgroundColor: MagickColor): void;
    extent(geometryOrWidth: MagickGeometry | number, widthOrGravityOrBackgroundColor?: Gravity | MagickColor | number, backgroundColorOrGravity?: MagickColor | Gravity): void {
        let gravity = Gravity.Undefined;
        let geometry: MagickGeometry;

        if (geometryOrWidth instanceof MagickGeometry)
            geometry = geometryOrWidth;
        else if (typeof widthOrGravityOrBackgroundColor === 'number')
            geometry = new MagickGeometry(geometryOrWidth, widthOrGravityOrBackgroundColor);

        if (widthOrGravityOrBackgroundColor instanceof MagickColor)
            this.backgroundColor = widthOrGravityOrBackgroundColor;
        else if (widthOrGravityOrBackgroundColor !== undefined)
            gravity = widthOrGravityOrBackgroundColor;

        if (backgroundColorOrGravity instanceof MagickColor)
            this.backgroundColor = backgroundColorOrGravity;
        else if (backgroundColorOrGravity !== undefined)
            gravity = backgroundColorOrGravity;

        Exception.use(exception => {
            _withString(geometry.toString(), geometryPtr => {
                const instance = ImageMagick._api._MagickImage_Extent(this._instance, geometryPtr, gravity, exception.ptr);
                this._setInstance(instance, exception);
            });
        });
    }

    flip(): void {
        Exception.use(exception => {
            const instance = ImageMagick._api._MagickImage_Flip(this._instance, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    flop(): void {
        Exception.use(exception => {
            const instance = ImageMagick._api._MagickImage_Flop(this._instance, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    getArtifact(name: string): string | null {
        return _withString(name, namePtr => {
            const value = ImageMagick._api._MagickImage_GetArtifact(this._instance, namePtr);
            return _createString(value);
        });
    }

    getAttribute(name: string): string | null {
        return Exception.use(exception => {
            return _withString(name, namePtr => {
                const value = ImageMagick._api._MagickImage_GetAttribute(this._instance, namePtr, exception.ptr);
                return _createString(value);
            });
        });
    }

    getProfile(name: string): IImageProfile | null {
        return _withString(name, namePtr => {
            const value = ImageMagick._api._MagickImage_GetProfile(this._instance, namePtr);
            const data = StringInfo.toArray(value);
            if (data === null)
                return null;

            return new ImageProfile(name, data);
        });
    }

    getWriteMask<TReturnType>(func: (mask: IMagickImage | null) => TReturnType): TReturnType;
    getWriteMask<TReturnType>(func: (mask: IMagickImage | null) => Promise<TReturnType>): Promise<TReturnType>;
    getWriteMask<TReturnType>(func: (mask: IMagickImage | null) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        const instance = Exception.usePointer(exception => {
            return ImageMagick._api._MagickImage_GetWriteMask(this._instance, exception);
        });
        const image = instance === 0 ? null : new MagickImage(instance, new MagickSettings());
        if (image == null)
            return func(image);
        else
            return image._use(func);
    }

    getPixels<TReturnType>(func: (pixels: IPixelCollection) => TReturnType): TReturnType;
    getPixels<TReturnType>(func: (pixels: IPixelCollection) => Promise<TReturnType>): Promise<TReturnType>;
    getPixels<TReturnType>(func: (pixels: IPixelCollection) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        if (this._settings._ping)
            throw new MagickError('image contains no pixel data');

        return PixelCollection._use(this, func);
    }

    histogram(): Map<string, number> {
        const result = new Map<string, number>();

        Exception.usePointer(exception => {
            Pointer.use(lengthPointer => {
                const histogram = ImageMagick._api._MagickImage_Histogram(this._instance, lengthPointer.ptr, exception);
                if (histogram !== 0) {
                    const length = lengthPointer.value;
                    for (let i = 0; i < length; i++) {
                        const colorPtr = ImageMagick._api._MagickColorCollection_GetInstance(histogram, i);
                        const color = MagickColor._create(colorPtr);
                        const count = ImageMagick._api._MagickColor_Count_Get(colorPtr);
                        result.set(color.toString(), count);
                    }

                    ImageMagick._api._MagickColorCollection_DisposeList(histogram);
                }
            });
        });

        return result;
    }

    inverseContrast = () => this._contrast(false);

    inverseOpaque = (target: MagickColor, fill: MagickColor) => this._opaque(target, fill, true);

    inverseSigmoidalContrast(contrast: number): void;
    inverseSigmoidalContrast(contrast: number, midpointPercentage: Percentage): void;
    inverseSigmoidalContrast(contrast: number, midpoint: number): void;
    inverseSigmoidalContrast(contrast: number, midpoint: number, channels: Channels): void;
    inverseSigmoidalContrast(contrast: number, midpointOrPercentage?: number | Percentage, channelsOrUndefined?: Channels): void {
        this._sigmoidalContrast(false, contrast, midpointOrPercentage, channelsOrUndefined)
    }

    inverseTransparent = (color: MagickColor) => this._transparent(color, true);

    level(blackPoint: Percentage, whitePoint: Percentage): void;
    level(blackPoint: Percentage, whitePoint: Percentage, gamma: number): void;
    level(channels: Channels, blackPoint: Percentage, whitePoint: Percentage): void;
    level(channels: Channels, blackPoint: Percentage, whitePoint: Percentage, gamma: number): void;
    level(channelsOrBlackPoint: Channels | Percentage, blackPointOrWhitePoint: Percentage, whitePointPercentageOrGamma?: Percentage | number, gammaOrUndefined?: number): void {
        let channels = Channels.Composite;
        let blackPoint: Percentage;
        let whitePoint: Percentage;
        let gamma = this.valueOrDefault(gammaOrUndefined, 1.0);
        if (typeof channelsOrBlackPoint === 'number') {
            channels = channelsOrBlackPoint;
            blackPoint = blackPointOrWhitePoint;
            if (whitePointPercentageOrGamma instanceof Percentage)
                whitePoint = whitePointPercentageOrGamma;
        } else {
            blackPoint = channelsOrBlackPoint;
            whitePoint = blackPointOrWhitePoint;
            if (typeof whitePointPercentageOrGamma === 'number')
                gamma = whitePointPercentageOrGamma;
        }

        Exception.usePointer(exception => {
            ImageMagick._api._MagickImage_Level(this._instance, blackPoint.toDouble(), whitePoint.toQuantum(), gamma, channels, exception);
        });
    }

    linearStretch(blackPoint: Percentage, whitePoint: Percentage): void {
        Exception.usePointer(exception => {
            ImageMagick._api._MagickImage_LinearStretch(this._instance, blackPoint.toDouble(), whitePoint.toQuantum(), exception);
        });
    }

    liquidRescale(geometry: MagickGeometry): void;
    liquidRescale(width: number, height: number): void;
    liquidRescale(widthOrGeometry: number | MagickGeometry, height?: number): void {
        const geometry = typeof widthOrGeometry === 'number' ? new MagickGeometry(widthOrGeometry, height as number) : widthOrGeometry;
        Exception.use(exception => {
            _withString(geometry.toString(), geometryPtr => {
                const instance = ImageMagick._api._MagickImage_LiquidRescale(this._instance, geometryPtr, geometry.x, geometry.y, exception.ptr);
                this._setInstance(instance, exception);
            });
        });
    }

    negate(): void;
    negate(channelsOrUndefined?: Channels): void {
        Exception.usePointer(exception => {
            const channels = this.valueOrDefault(channelsOrUndefined, Channels.Undefined);
            ImageMagick._api._MagickImage_Negate(this._instance, 0, channels, exception);
        });
    }

    negateGrayScale(): void;
    negateGrayScale(channelsOrUndefined?: Channels): void {
        Exception.usePointer(exception => {
            const channels = this.valueOrDefault(channelsOrUndefined, Channels.Undefined);
            ImageMagick._api._MagickImage_Negate(this._instance, 1, channels, exception);
        });
    }

    normalize(): void {
        Exception.usePointer(exception => {
            ImageMagick._api._MagickImage_Normalize(this._instance, exception);
        });
    }

    modulate(brightness: Percentage): void;
    modulate(brightness: Percentage, saturation: Percentage): void;
    modulate(brightness: Percentage, saturation: Percentage, hue: Percentage): void;
    modulate(brightness: Percentage, saturationOrUndefined?: Percentage, hueOrUndefined?: Percentage): void {
        const saturation = this.valueOrDefault(saturationOrUndefined, new Percentage(100));
        const hue = this.valueOrDefault(hueOrUndefined, new Percentage(100));
        Exception.usePointer(exception => {
            const modulate = `${brightness.toDouble()}/${saturation.toDouble()}/${hue.toDouble()}`;
            _withString(modulate, modulatePtr => {
                ImageMagick._api._MagickImage_Modulate(this._instance, modulatePtr, exception);
            });
        });
    }

    oilPaint(): void;
    oilPaint(radius: number): void
    oilPaint(radiusOrUndefined?: number): void {
        const radius = this.valueOrDefault(radiusOrUndefined, 3);
        const sigma = 0.0; // Not used due to precision issue in GetOptimalKernelWidth2D.
        Exception.use(exception => {
            const instance = ImageMagick._api._MagickImage_OilPaint(this._instance, radius, sigma, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    opaque = (target: MagickColor, fill: MagickColor) => this._opaque(target, fill, false);

    ping(fileName: string, settings?: MagickReadSettings): void;
    ping(array: Uint8Array, settings?: MagickReadSettings): void;
    ping(fileNameOrArray: string | Uint8Array, settingsOrUndefined?: MagickReadSettings): void {
        this.readOrPing(true, fileNameOrArray, settingsOrUndefined);
    }

    read(color: MagickColor, width: number, height: number): void;
    read(fileName: string, settings?: MagickReadSettings): void;
    read(array: Uint8Array, settings?: MagickReadSettings): void;
    read(fileNameOrArrayOrColor: string | Uint8Array | MagickColor, settingsOrWidthOrUndefined?: MagickReadSettings | number, heightOrUndefined?: number): void {
        this.readOrPing(false, fileNameOrArrayOrColor, settingsOrWidthOrUndefined, heightOrUndefined);
    }

    readFromCanvas(canvas: HTMLCanvasElement): void {
        const ctx = canvas.getContext('2d');
        if (ctx === null)
            return;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const settings = new MagickReadSettings();
        settings.format = MagickFormat.Rgba;
        settings.width = canvas.width;
        settings.height = canvas.height;

        Exception.use(exception => {
            this.readFromArray(imageData.data, settings, exception);
        });
    }

    removeArtifact(name: string): void {
        _withString(name, namePtr => {
            ImageMagick._api._MagickImage_RemoveArtifact(this._instance, namePtr);
        });
    }

    removeAttribute(name: string): void {
        _withString(name, namePtr => {
            ImageMagick._api._MagickImage_RemoveAttribute(this._instance, namePtr);
        });
    }

    removeWriteMask(): void {
        Exception.usePointer(exception => {
            ImageMagick._api._MagickImage_SetWriteMask(this._instance, 0, exception);
        });
    }

    repage(): void {
        this.page = new MagickGeometry(0, 0, 0, 0);
    }

    resize(geometry: MagickGeometry): void;
    resize(width: number, height: number): void;
    resize(widthOrGeometry: number | MagickGeometry, heightOrUndefined?: number): void {
        const geometry = typeof widthOrGeometry === 'number' ? new MagickGeometry(widthOrGeometry, heightOrUndefined as number) : widthOrGeometry;
        Exception.use(exception => {
            _withString(geometry.toString(), geometryPtr => {
                const instance = ImageMagick._api._MagickImage_Resize(this._instance, geometryPtr, exception.ptr);
                this._setInstance(instance, exception);
            });
        });
    }

    rotate(degrees: number): void {
        Exception.use(exception => {
            const instance = ImageMagick._api._MagickImage_Rotate(this._instance, degrees, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    separate<TReturnType>(func: (images: IMagickImageCollection) => TReturnType ): TReturnType;
    separate<TReturnType>(func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
    separate<TReturnType>(func: (images: IMagickImageCollection) => TReturnType, channels: Channels): TReturnType;
    separate<TReturnType>(func: (images: IMagickImageCollection) => Promise<TReturnType>, channels: Channels): Promise<TReturnType>;
    separate<TReturnType>(func: (images: IMagickImageCollection) => TReturnType | Promise<TReturnType>, channelsOrUndefined?: Channels): TReturnType | Promise<TReturnType> {
        return Exception.use(exception => {
            const channels = this.valueOrDefault(channelsOrUndefined, Channels.Undefined);
            const images = ImageMagick._api._MagickImage_Separate(this._instance, channels, exception.ptr);
            const collection = MagickImageCollection._createFromImages(images, this._settings);
            return collection._use(func);
        });
    }

    setArtifact(name: string, value: string): void;
    setArtifact(name: string, value: boolean): void;
    setArtifact(name: string, value: string | boolean): void {
        let strValue: string;
        if (typeof value === 'string') {
            strValue = value;
        } else {
            strValue = this.fromBool(value).toString();
        }
        _withString(name, namePtr => {
            _withString(strValue, valuePtr => {
                ImageMagick._api._MagickImage_SetArtifact(this._instance, namePtr, valuePtr);
            });
        });
    }

    setAttribute(name: string, value: string): void {
        Exception.use(exception => {
            _withString(name, namePtr => {
                _withString(value, valuePtr => {
                    ImageMagick._api._MagickImage_SetAttribute(this._instance, namePtr, valuePtr, exception.ptr);
                });
            });
        });
    }

    setWriteMask(image: IMagickImage): void {
        Exception.usePointer(exception => {
            ImageMagick._api._MagickImage_SetWriteMask(this._instance, image._instance, exception);
        });
    }

    sharpen(): void;
    sharpen(radius: number, sigma: number): void;
    sharpen(radius: number, sigma: number, channels: Channels): void;
    sharpen(radiusOrUndefined?: number, sigmaOrUndefined?: number, channelsOrUndefined?: Channels): void {
        const radius = this.valueOrDefault(radiusOrUndefined, 0.0);
        const sigma = this.valueOrDefault(sigmaOrUndefined, 1.0);
        const channels = this.valueOrDefault(channelsOrUndefined, Channels.Undefined);

        Exception.use(exception => {
            const instance = ImageMagick._api._MagickImage_Sharpen(this._instance, radius, sigma, channels, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    shave(leftRight: number, topBottom: number) {
        Exception.use(exception => {
            const instance = ImageMagick._api._MagickImage_Shave(this._instance, leftRight, topBottom, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    sigmoidalContrast(contrast: number): void;
    sigmoidalContrast(contrast: number, midpointPercentage: Percentage): void;
    sigmoidalContrast(contrast: number, midpoint: number): void;
    sigmoidalContrast(contrast: number, midpoint: number, channels: Channels): void;
    sigmoidalContrast(contrast: number, midpointOrPercentage?: number | Percentage, channelsOrUndefined?: Channels): void {
        this._sigmoidalContrast(true, contrast, midpointOrPercentage, channelsOrUndefined)
    }

    splice(geometry: MagickGeometry): void {
        MagickRectangle.use(this, geometry, geometryPtr => {
            Exception.use(exception => {
                const instance = ImageMagick._api._MagickImage_Splice(this._instance, geometryPtr, exception.ptr);
                this._setInstance(instance, exception);
        });
        });
    }

    statistics(): IStatistics;
    statistics(channels: Channels): IStatistics;
    statistics(channelsOrUndefined?: Channels): IStatistics {
        const channels = this.valueOrDefault(channelsOrUndefined, Channels.Default);
        return Exception.usePointer(exception => {
            const list = ImageMagick._api._MagickImage_Statistics(this._instance, channels, exception);
            const statistics =  Statistics._create(this, list, channels);
            ImageMagick._api._Statistics_DisposeList(list);
            return statistics;
        });
    }

    strip(): void {
        Exception.usePointer(exception => {
            ImageMagick._api._MagickImage_Strip(this._instance, exception);
        });
    }

    toString = (): string => `${this.format} ${this.width}x${this.height} ${this.depth}-bit ${ColorSpace[this.colorSpace]}`

    transparent(color: MagickColor): void {
        color._use(valuePtr => {
            Exception.usePointer(exception => {
                ImageMagick._api._MagickImage_Transparent(this._instance, valuePtr, 0, exception);
            });
        });
    }

    trim(): void;
    trim(...edges: Gravity[]): void;
    trim(percentage: Percentage): void;
    trim(...args: Gravity[] | Percentage[]): void {
        if (args.length > 0) {
            if (args.length == 1 && args[0] instanceof Percentage) {
                const percentage = args[0];
                this.setArtifact('trim:percent-background', percentage.toDouble().toString());
            } else {
                const edges = args as Gravity[];
                const value = [...new Set(_getEdges(edges))].join(',');
                this.setArtifact('trim:edges', value);
            }
        }

        Exception.use(exception => {
            const instance = ImageMagick._api._MagickImage_Trim(this._instance, exception.ptr);
            this._setInstance(instance, exception);

            this.removeArtifact('trim:edges');
            this.removeArtifact('trim:percent-background');
        });
    }

    wave(): void;
    wave(method: PixelInterpolateMethod, amplitude: number, length: number): void;
    wave(methodOrUndefined?: PixelInterpolateMethod, amplitudeOrUndefined?: number, lengthOrUndefined?: number): void {
        const method = this.valueOrDefault(methodOrUndefined, this.interpolate);
        const amplitude = this.valueOrDefault(amplitudeOrUndefined, 25);
        const length = this.valueOrDefault(lengthOrUndefined, 150);

        Exception.use(exception => {
            const instance = ImageMagick._api._MagickImage_Wave(this._instance, method, amplitude, length, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    vignette(): void;
    vignette(radius: number, sigma: number, x: number, y: number): void
    vignette(radiusOrUndefined?: number, sigmaOrUndefined?: number, xOrUndefined?: number, yOrUndefined?: number): void {
        const radius = this.valueOrDefault(radiusOrUndefined, 0);
        const sigma = this.valueOrDefault(sigmaOrUndefined, 1.0);
        const x = this.valueOrDefault(xOrUndefined, 0);
        const y = this.valueOrDefault(yOrUndefined, 0);

        Exception.use(exception => {
            const instance = ImageMagick._api._MagickImage_Vignette(this._instance, radius, sigma, x, y, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    write<TReturnType>(func: (data: Uint8Array) => TReturnType, format?: MagickFormat): TReturnType;
    write<TReturnType>(func: (data: Uint8Array) => Promise<TReturnType>, format?: MagickFormat): Promise<TReturnType>;
    write<TReturnType>(func: (data: Uint8Array) => TReturnType | Promise<TReturnType>, format?: MagickFormat): TReturnType | Promise<TReturnType> {
        let data = 0;
        let length = 0;

        Exception.use(exception => {
            Pointer.use(pointer => {
                if (format !== undefined)
                    this._settings.format = format;

                this._settings._use(settings => {
                    try {
                        data = ImageMagick._api._MagickImage_WriteBlob(this._instance, settings._instance, pointer.ptr, exception.ptr);
                        length = pointer.value;
                    } catch {
                        if (data !== 0)
                            data = ImageMagick._api._MagickMemory_Relinquish(data);
                    }
                });
            });
        });

        const array = new DisposableArray(data, length, func);
        return Disposable._disposeAfterExecution(array, array.func);
    }

    writeToCanvas(canvas: HTMLCanvasElement): void {
        canvas.width = this.width;
        canvas.height = this.height;

        const ctx = canvas.getContext('2d');
        if (ctx === null)
            return;

        PixelCollection._map(this, 'RGBA', q => {
            const imageData = ctx.createImageData(this.width, this.height);

            let p = 0;
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    imageData.data[p++] = ImageMagick._api.HEAPU8[q++];
                    imageData.data[p++] = ImageMagick._api.HEAPU8[q++];
                    imageData.data[p++] = ImageMagick._api.HEAPU8[q++];
                    imageData.data[p++] = ImageMagick._api.HEAPU8[q++];
                }
            }

            ctx.putImageData(imageData, 0, 0);
        });
    }

    /** @internal */
    static _createFromImage(instance: number, settings: MagickSettings): MagickImage {
        return new MagickImage(instance, settings);
    }

    /** @internal */
    static _clone(image: MagickImage): MagickImage {
        return Exception.usePointer(exception => {
            return new MagickImage(ImageMagick._api._MagickImage_Clone(image._instance, exception), image._settings._clone());
        });
    }

    /** @internal */
    _getSettings(): MagickSettings {
        return this._settings;
    }

    /** @internal */
    protected _instanceNotInitialized(): void {
        throw new MagickError('no image has been read');
    }

    /** @internal */
    _use<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
    /** @internal */
    _use<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    _use<TReturnType>(func: (image: IMagickImage) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        return Disposable._disposeAfterExecution(this, func);
    }

    /** @internal */
    static _use<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
    /** @internal */
    static _use<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    static _use<TReturnType>(func: (image: IMagickImage) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        const image = MagickImage.create();
        return image._use<TReturnType>(func);
    }

    private _contrast(enhance: boolean) {
        Exception.usePointer(exception => {
            ImageMagick._api._MagickImage_Contrast(this._instance, this.fromBool(enhance), exception);
        });
    }

    private _opaque(target: MagickColor, fill: MagickColor, invert: boolean) {
        Exception.usePointer(exception => {
            target._use(targetPtr => {
                fill._use(filltPtr => {
                    ImageMagick._api._MagickImage_Opaque(this._instance, targetPtr, filltPtr, this.fromBool(invert), exception);
                });
            });
        });
    }

    private _sigmoidalContrast(sharpen: boolean, contrast: number, midpointOrPercentage?: number | Percentage, channelsOrUndefined?: Channels): void {
        let midpoint: number;
        if (midpointOrPercentage !== undefined) {
            if (typeof midpointOrPercentage === 'number')
                midpoint = midpointOrPercentage;
            else
                midpoint = midpointOrPercentage.multiply(Quantum.max);
        } else {
            midpoint = Quantum.max * 0.5;
        }
        const channels = this.valueOrDefault(channelsOrUndefined, Channels.Undefined);
        Exception.usePointer(exception => {
            ImageMagick._api._MagickImage_SigmoidalContrast(this._instance, this.fromBool(sharpen), contrast, midpoint, channels, exception);
        });
    }

    private _transparent(color: MagickColor, invert: boolean) {
        color._use(valuePtr => {
            Exception.usePointer(exception => {
                ImageMagick._api._MagickImage_Transparent(this._instance, valuePtr, this.fromBool(invert), exception);
            });
        });
    }

    private static createInstance(): number {
        return Exception.usePointer(exception => {
            return ImageMagick._api._MagickImage_Create(0, exception);
        });
    }

    private fromBool(value: boolean): number {
        return value ? 1 : 0;
    }

    private readOrPing(ping: boolean, fileNameOrArrayOrColor: string | Uint8Array | MagickColor, settingsOrWidthOrUndefined?: MagickReadSettings | number, heightOrUndefined?: number): void {
        Exception.use(exception => {
            if (fileNameOrArrayOrColor instanceof Uint8Array) {
                const readSettings = settingsOrWidthOrUndefined instanceof MagickReadSettings  ? settingsOrWidthOrUndefined : new MagickReadSettings(this._settings);
                readSettings._ping = ping;
                this._settings._ping = ping;
                this.readFromArray(fileNameOrArrayOrColor, readSettings, exception);
            } else {
                const readSettings = settingsOrWidthOrUndefined instanceof MagickReadSettings ? settingsOrWidthOrUndefined : new MagickReadSettings(this._settings);
                readSettings._ping = ping;
                this._settings._ping = ping;
                if (typeof fileNameOrArrayOrColor === 'string') {
                    readSettings._fileName = fileNameOrArrayOrColor;
                } else if (fileNameOrArrayOrColor instanceof MagickColor) {
                    readSettings._fileName = 'xc:' + fileNameOrArrayOrColor.toShortString();
                    readSettings.width = typeof settingsOrWidthOrUndefined === 'number' ? settingsOrWidthOrUndefined : 0;
                    readSettings.height = typeof heightOrUndefined === 'number' ? heightOrUndefined : 0;
                }
                readSettings._use(settings => {
                    const instance = ImageMagick._api._MagickImage_ReadFile(settings._instance, exception.ptr);
                    this._setInstance(instance, exception);
                });
            }
        });
    }

    private readFromArray(array: Uint8Array | Uint8ClampedArray, readSettings: MagickReadSettings, exception: Exception): void {
        readSettings._use(settings => {
            const length = array.byteLength;
            let data = 0;
            try {
                data = ImageMagick._api._malloc(length);
                ImageMagick._api.HEAPU8.set(array, data);
                const instance = ImageMagick._api._MagickImage_ReadBlob(settings._instance, data, 0, length, exception.ptr);
                this._setInstance(instance, exception);
            } finally {
                if (data !== 0)
                    ImageMagick._api._free(data);
            }
        });
    }

    private toBool(value: number): boolean {
        return value === 1;
    }

    private valueOrDefault<TType>(value: TType | undefined, defaultValue: TType): TType {
        if (value === undefined)
            return defaultValue;

        return value;
    }
}
