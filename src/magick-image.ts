/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { AlphaAction } from './enums/alpha-action';
import { AsyncImageCallback, AsyncImageCollectionCallback, ImageCallback, ImageCollectionCallback, SyncImageCallback, SyncImageCollectionCallback } from './types/callbacks';
import { AutoThresholdMethod } from './enums/auto-threshold-method';
import { ByteArray, _isByteArray } from './byte-array';
import { Channels } from './enums/channels';
import { ChromaticityInfo } from './types/chromaticity-info';
import { ClassType } from './enums/class-type';
import { ColorProfile, IColorProfile } from './profiles/color/color-profile';
import { ColorSpace, ColorSpaceNames } from './enums/color-space';
import { ColorTransformMode } from './enums/color-transform-mode';
import { ColorType } from './enums/color-type';
import { CompareResult } from './types/compare-result';
import { CompareSettings } from './settings/compare-settings';
import { CompositeOperator } from './enums/composite-operator';
import { CompressionMethod } from './enums/compression-method';
import { ConnectedComponent } from './types/connected-component';
import { ConnectedComponentsSettings, Connectivity } from './settings/connected-components-settings';
import { DelegateRegistry } from './helpers/delegate-registry';
import { Density } from './types/density';
import { DensityUnit } from './enums/density-unit';
import { Disposable } from './internal/disposable';
import { DisposableArray } from './internal/disposable-array';
import { DistortMethod } from './enums/distort-method';
import { DistortSettings } from './settings/distort-settings';
import { DrawingSettings } from './internal/settings/drawing-settings';
import { DrawingWand } from './drawing/drawing-wand';
import { DoublePointer } from './internal/pointer/double-pointer';
import { Endian } from './enums/endian';
import { ErrorMetric } from './enums/error-metric';
import { EvaluateOperator } from './enums/evaluate-operator';
import { Exception } from './internal/exception/exception';
import { FilterType } from './enums/filter-type';
import { GifDisposeMethod } from './enums/gif-dispose-method';
import { Gravity } from './enums/gravity';
import { IntPointer } from './internal/pointer/int-pointer';
import { IDisposable } from './disposable';
import { IDrawable } from './drawing/drawable';
import { ImageMagick } from './image-magick';
import { ImageProfile, IImageProfile } from './profiles/image-profile';
import { Interlace } from './enums/interlace';
import { MagickColor, IMagickColor } from './magick-color';
import { MagickError } from './magick-error';
import { MagickErrorInfo } from './types/magick-error-info';
import { MagickFormat } from './enums/magick-format';
import { MagickGeometry as MagickGeometry, IMagickGeometry } from './types/magick-geometry';
import { MagickImageCollection, IMagickImageCollection } from './magick-image-collection';
import { MagickReadSettings } from './settings/magick-read-settings';
import { MagickRectangle } from './internal/magick-rectangle';
import { MagickSettings } from './settings/magick-settings';
import { MorphologySettings } from './settings/morphology-settings';
import { NativeInstance } from './native-instance';
import { OffsetInfo } from './types/offset-info';
import { Orientation } from './enums/orientation';
import { NoiseType } from './enums/noise-type';
import { Percentage } from './types/percentage';
import { PerceptualHash, IPerceptualHash } from './statistics/perceptual-hash';
import { PixelChannel } from './enums/pixel-channel';
import { PixelCollection, IPixelCollection } from './pixels/pixel-collection';
import { PixelIntensityMethod } from './enums/pixel-intensity-method';
import { PixelInterpolateMethod } from './enums/pixel-interpolate-method';
import { Point } from './types/point';
import { PrimaryInfo } from './types/primary-info';
import { ProgressEvent } from './events/progress-event';
import { QuantizeSettings } from './settings/quantize-settings';
import { Quantum } from './quantum';
import { RenderingIntent } from './enums/rendering-intent';
import { Statistics, IStatistics } from './statistics/statistics';
import { StringInfo } from './internal/string-info';
import { TemporaryDefines } from './helpers/temporary-defines';
import { VirtualPixelMethod } from './enums/virtual-pixel-method';
import { WarningEvent } from './events/warning-event';
import { _createString, _createStringAndRelinquish, _withString } from './internal/native/string';
import { _getEdges } from './enums/gravity';
import { _withByteArray, _withDoubleArray } from './internal/native/array';

export interface IMagickImage extends IDisposable {
    /** @internal */
    _instance: number;
    /** @internal */
    _channelOffset(pixelChannel: PixelChannel): number;
    /** @internal */
    _use<TReturnType>(func: SyncImageCallback<TReturnType>): TReturnType;
    /** @internal */
    _use<TReturnType>(func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;
    /** @internal */
    _use<TReturnType>(func: ImageCallback<TReturnType>): TReturnType | Promise<TReturnType>;

    /**
     * Gets or sets the time in 1/100ths of a second which must expire before splaying the next image in an
     * animated sequence.
     */
    animationDelay: number;

    /**
     * Gets or sets the number of iterations to loop an animation (e.g. Netscape loop extension) for.
     */
    animationIterations: number;

    /**
     * Gets or sets the ticks per seconds for the animation delay.
     */
    animationTicksPerSecond: number;

    /**
     * Gets the names of the artifacts.
     */
    readonly artifactNames: ReadonlyArray<string>;

    /**
     * Gets the names of the attributes.
     */
    readonly attributeNames: ReadonlyArray<string>;

    /**
     * Gets or sets the background color of the image.
     */
    backgroundColor: IMagickColor;

    /**
     * Gets the height of the image before transformations.
     */
    readonly baseHeight: number;

    /**
     * Gets the width of the image before transformations.
     */
    readonly baseWidth: number;

    /**
     * Gets or sets a value indicating whether black point compensation should be used
     */
    blackPointCompensation: boolean;

    /**
     * Gets or sets the border color of the image.
     */
    borderColor: IMagickColor;

    /**
     * Gets the smallest bounding box enclosing non-border pixels. The current fuzz value is used
     * when discriminating between pixels.
     */
    boundingBox: IMagickGeometry | null;

    /**
     * Gets the number of channels that the image contains.
     */
    readonly channelCount: number;

    /**
     * Gets the channels of the image.
     */
    readonly channels: ReadonlyArray<PixelChannel>;

    /**
     * Gets or sets the chromaticity of the image.
     */
    chromaticity: ChromaticityInfo;

    /**
     * Gets or sets the image class (DirectClass or PseudoClass)
     * NOTE: Setting a DirectClass image to PseudoClass will result in the loss of color information
     * if the number of colors in the image is greater than the maximum palette size (either 256 (Q8)
     * or 65536 (Q16).
     */
    classType: ClassType;

    /**
     * Gets or sets the distance where colors are considered equal.
     */
    colorFuzz: Percentage;

    /**
     * Gets or sets the color space of the image.
     */
    colormapSize: number;

    /**
     * Gets or sets the color space of the image.
     */
    colorSpace: ColorSpace;

    /**
     * Gets or sets the color type of the image.
     */
    colorType: ColorType;

    /**
     * Gets or sets the comment text of the image.
     */
    comment: string | null;

    /**
     * Gets or sets the composition operator to be used when composition is implicitly used (such as for image flattening).
     */
    compose: CompositeOperator;

    /**
     * Gets the compression method of the image.
     */
    readonly compression: CompressionMethod;

    /**
     * Gets or sets the vertical and horizontal resolution in pixels of the image.
     */
    density: Density;

    /**
     * Gets or sets the depth (bits allocated to red/green/blue components).
     */
    depth: number;

    /**
     * Gets or sets the endianness (little like Intel or big like SPARC) for image formats which support
     * endian-specific options.
     */
    endian: Endian;

    /**
     * Gets the original file name of the image (only available if read from disk).
     */
    readonly fileName: string | null;

    /**
     * Gets or sets the filter to use when resizing image.
     */
    filterType: FilterType;

    /**
     * Gets or sets the format of the image.
     */
    format: MagickFormat;

    /**
     * Gets the gamma level of the image.
     */
    gamma: number;

    /**
     * Gets or sets the gif disposal method.
     */
    gifDisposeMethod: GifDisposeMethod;

    /**
     * Gets or sets a value indicating whether the image supports transparency (alpha channel).
     */
    hasAlpha: boolean;

    /**
     * Gets the height of the image.
     */
    readonly height: number;

    /**
     * Gets or sets the type of interlacing to use.
     */
    readonly interlace: Interlace;

    /**
     * Gets or sets the pixel color interpolate method to use.
     */
    interpolate: PixelInterpolateMethod;

    /**
     * Gets a value indicating whether none of the pixels in the image have an alpha value other
     * than OpaqueAlpha (QuantumRange).
     */
    readonly isOpaque: boolean;

    /**
     * Gets or sets the label of the image.
     */
    label: string | null;

    /**
     * Gets or sets the matte color.
     */
    matteColor: IMagickColor;

    /**
     * Gets or sets the number of meta channels that the image contains.
     */
    metaChannelCount: number;

    /**
     * Gets or sets the photo orientation of the image.
     */
    orientation: Orientation;

    /**
     * Event that will be raised when progress is reported by this image.
     */
    onProgress?: (event: ProgressEvent) => void;

    /**
     * Event that will we raised when a warning is raised by ImageMagick.
     */
    onWarning?: (event: WarningEvent) => void;

    /**
     * Gets or sets the preferred size and location of an image canvas.
     */
    page: IMagickGeometry;

    /**
     * Gets the names of the profiles.
     */
    readonly profileNames: ReadonlyArray<string>;

    /**
     * Gets or sets the JPEG/MIFF/PNG compression level (default 75).
     */
    quality: number;

    /**
     * Gets or sets the type of rendering intent.
     */
    renderingIntent: RenderingIntent;

    /**
     * Gets the settings for this instance.
     */
    readonly settings: MagickSettings;

    /**
     * Gets the signature of this image.
     */
    readonly signature: string | null;

    /**
     * Gets the number of colors in the image.
     */
    readonly totalColors: number;

    /**
     * Gets or sets the virtual pixel method.
     */
    virtualPixelMethod: VirtualPixelMethod;

    /**
     * Gets the width of the image.
     */
    width: number;

    /**
     * Adaptive-blur image with the default blur factor (0x1).
     */
    adaptiveBlur(): void;

    /**
     * Adaptive-blur image with the default blur factor (0x1).
     * @param radius The radius of the Gaussian, in pixels, not counting the center pixel.
     */
    adaptiveBlur(radius: number): void;

    /**
     * Adaptive-blur image with specified blur factor.
     * @param radius The radius of the Gaussian, in pixels, not counting the center pixel.
     * @param sigma The standard deviation of the Laplacian, in pixels.
     */
    adaptiveBlur(radius: number, sigma: number): void;

    /**
     * Resize using mesh interpolation. It works well for small resizes of less than +/- 50%
     * of the original image size. For larger resizing on images a full filtered and slower resize
     * function should be used instead.
     * @param geometry The geometry to use.
     */
    adaptiveResize(geometry: IMagickGeometry): void;

    /**
     * Resize using mesh interpolation. It works well for small resizes of less than +/- 50%
     * of the original image size. For larger resizing on images a full filtered and slower resize
     * function should be used instead.
     * @param width The new width.
     * @param height The new height.
     */
    adaptiveResize(width: number, height: number): void;

    /**
     * Adaptively sharpens the image by sharpening more intensely near image edges and less
     * intensely far from edges.
     */
    adaptiveSharpen(): void;

    /**
     * Adaptively sharpens the image by sharpening more intensely near image edges and less
     * intensely far from edges.
     * @param channels The channel(s) that should be sharpened.
     */
    adaptiveSharpen(channels: Channels): void;

    /**
     * Adaptively sharpens the image by sharpening more intensely near image edges and less
     * intensely far from edges.
     * @param radius The radius of the Gaussian, in pixels, not counting the center pixel.
     * @param sigma The standard deviation of the Laplacian, in pixels.
     */
    adaptiveSharpen(radius: number, sigma: number): void;

    /**
     * Adaptively sharpens the image by sharpening more intensely near image edges and less
     * intensely far from edges.
     * @param radius The radius of the Gaussian, in pixels, not counting the center pixel.
     * @param sigma The standard deviation of the Laplacian, in pixels.
     * @param channels The channel(s) that should be sharpened.
     */
    adaptiveSharpen(radius: number, sigma: number, channels: Channels): void;

    /**
     * Local adaptive threshold image.
     * http://www.dai.ed.ac.uk/HIPR2/adpthrsh.htm.
     * @param width The width of the pixel neighborhood.
     * @param height The height of the pixel neighborhood.
     */
    adaptiveThreshold(width: number, height: number): void;

    /**
     * Local adaptive threshold image.
     * http://www.dai.ed.ac.uk/HIPR2/adpthrsh.htm.
     * @param width The width of the pixel neighborhood.
     * @param height The height of the pixel neighborhood.
     * @param channels The channel(s) to threshold.
     */
    adaptiveThreshold(width: number, height: number, channels: Channels): void;

    /**
     * Local adaptive threshold image.
     * http://www.dai.ed.ac.uk/HIPR2/adpthrsh.htm.
     * @param width The width of the pixel neighborhood.
     * @param height The height of the pixel neighborhood.
     * @param channels The channel(s) to threshold.
     * @param bias Constant to subtract from pixel neighborhood mean (+/-)(0-QuantumRange).
     */
    adaptiveThreshold(width: number, height: number, bias: Percentage,): void;

    /**
     * Local adaptive threshold image.
     * http://www.dai.ed.ac.uk/HIPR2/adpthrsh.htm.
     * @param width The width of the pixel neighborhood.
     * @param height The height of the pixel neighborhood.
     * @param channels The channel(s) to threshold.
     * @param bias Constant to subtract from pixel neighborhood mean (+/-)(0-QuantumRange).
     * @param channels The channel(s) to threshold.
     */
    adaptiveThreshold(width: number, height: number, bias: Percentage, channels: Channels): void;

    /**
     * Add noise to image with the specified noise type.
     * @param noiseType The type of noise that should be added to the image.
     */
    addNoise(noiseType: NoiseType): void;

    /**
     * Add noise to image with the specified noise type.
     * @param noiseType The type of noise that should be added to the image.
     * @param channels The channel(s) where the noise should be added.
     */
    addNoise(noiseType: NoiseType, channels: Channels): void;

    /**
     * Add noise to image with the specified noise type.
     * @param noiseType The type of noise that should be added to the image.
     * @param attenuate Attenuate the random distribution.
     */
    addNoise(noiseType: NoiseType, attenuate: number): void;

    /**
     * Add noise to image with the specified noise type.
     * @param noiseType The type of noise that should be added to the image.
     * @param attenuate Attenuate the random distribution.
     * @param channels The channel(s) where the noise should be added.
     */
    addNoise(noiseType: NoiseType, attenuate: number, channels: Channels): void;

    /**
     * Applies the specified alpha action.
     * @param value The action to use.
     */
    alpha(value: AlphaAction): void;

    /**
     * Annotate using specified text, and bounding area.
     * @param text The text to use.
     * @param boundingArea The bounding area.
     */
    annotate(text: string, boundingArea: MagickGeometry): void;

    /**
     * Annotate using specified text, bounding area, and placement gravity.
     * @param text The text to use.
     * @param boundingArea The bounding area.
     * @param gravity The gravity to use.
     */
    annotate(text: string, boundingArea: MagickGeometry, gravity: Gravity): void;

    /**
     * Annotate using specified text, bounding area, and placement gravity.
     * @param text The text to use.
     * @param boundingArea The bounding area.
     * @param gravity The gravity to use.
     * @param angle The rotation.
     */
    annotate(text: string, boundingArea: MagickGeometry, gravity: Gravity, angle: number): void;

    /**
     * Annotate with text (bounding area is entire image) and placement gravity.
     * @param text The text to use.
     * @param gravity The gravity to use.
     */
    annotate(text: string, gravity: Gravity): void;

    /**
     * Annotate with text (bounding area is entire image) and placement gravity.
     * @param text The text to use.
     * @param gravity The gravity to use.
     * @param angle The rotation.
     */
    annotate(text: string, gravity: Gravity, angle: number): void;

    /**
     * Extracts the 'mean' from the image and adjust the image to try make set its gamma appropriately.
     */
    autoGamma(): void;

    /**
     * Extracts the 'mean' from the image and adjust the image to try make set its gamma appropriately.
     * @param channels The channel(s) to set the gamma for.
     */
    autoGamma(channels: Channels): void;

    /**
     * Adjusts the levels of a particular image channel by scaling the minimum and maximum
     * values to the full quantum range.
     */
    autoLevel(): void;

    /**
     * Adjusts the levels of a particular image channel by scaling the minimum and maximum
     * values to the full quantum range.
     * @param channels The channel(s) to level.
     */
    autoLevel(channels: Channels): void;

    /**
     * Adjusts an image so that its orientation is suitable for viewing.
     */
    autoOrient(): void;

    /**
     * Automatically selects a threshold and replaces each pixel in the image with a black pixel if
     * the image intentsity is less than the selected threshold otherwise white.
     * @param method The threshold method to use.
     */
    autoThreshold(method: AutoThresholdMethod): void;

    /**
     * Applies a non-linear, edge-preserving, and noise-reducing smoothing filter.
     * @param width The width of the neighborhood in pixels.
     * @param height The height of the neighborhood in pixels.
     */
    bilateralBlur(width: number, height: number): void;

    /**
     * Applies a non-linear, edge-preserving, and noise-reducing smoothing filter.
     * @param width The width of the neighborhood in pixels.
     * @param height The height of the neighborhood in pixels.
     * @param intensitySigma The sigma in the intensity space.
     * @param spatialSigma The sigma in the coordinate space.
     */
    bilateralBlur(width: number, height: number, intensitySigma: number, spatialSigma: number): void;

    /**
     * Forces all pixels below the threshold into black while leaving all pixels at or above
     * the threshold unchanged.
     * @param threshold The threshold to use.
     */
    blackThreshold(threshold: Percentage): void;

    /**
     * Forces all pixels below the threshold into black while leaving all pixels at or above
     * the threshold unchanged.
     * @param threshold The threshold to use.
     * @param channels The channel(s) to make black
     */
    blackThreshold(threshold: Percentage, channels: Channels): void;

    /**
     * Simulate a scene at nighttime in the moonlight.
     */
    blueShift(): void;

    /**
     * Simulate a scene at nighttime in the moonlight.
     * @param factor The factor to use.
     */
    blueShift(factor: number): void;

    /**
     * Blur image with the default blur factor (0x1).
     */
    blur(): void;

    /**
     * Blur the specified channel of the image with the default blur factor (0x1).
     * @param channels The channel(s) that should be blurred.
     */
    blur(channels: Channels): void;

    /**
     * Blur image with specified blur factor.
     * @param radius The radius of the Gaussian in pixels, not counting the center pixel.
     * @param sigma The standard deviation of the Laplacian, in pixels.
     */
    blur(radius: number, sigma: number): void;

    /**
     * Blur the specified channel(s) of the image with the specified blur factor.
     * @param radius The radius of the Gaussian in pixels, not counting the center pixel.
     * @param sigma The standard deviation of the Laplacian, in pixels.
     * @param channels The channel(s) that should be blurred.
     */
    blur(radius: number, sigma: number, channels: Channels): void;

    /**
     * Add a border to the image.
     * @param size The size of the border.
     */
    border(size: number): void;

    /**
     * Add a border to the image.
     * @param width The width of the border.
     * @param height The height of the border.
     */
    border(width: number, height: number): void;

    /**
     * Changes the brightness and/or contrast of an image. It converts the brightness and
     * contrast parameters into slope and intercept and calls a polynomical function to apply
     * to the image.
     * @param brightness The brightness.
     * @param contrast The contrast.
     */
    brightnessContrast(brightness: Percentage, contrast: Percentage): void;

    /**
     * Changes the brightness and/or contrast of an image. It converts the brightness and
     * contrast parameters into slope and intercept and calls a polynomical function to apply
     * to the image.
     * @param brightness The brightness.
     * @param contrast The contrast.
     * @param channels The channel(s) that should be changed.
     */
    brightnessContrast(brightness: Percentage, contrast: Percentage, channels: Channels): void;

    /**
     * Uses a multi-stage algorithm to detect a wide range of edges in images.
     */
    cannyEdge(): void;

    /**
     * Uses a multi-stage algorithm to detect a wide range of edges in images.
     */
    cannyEdge(radius: number, sigma: number, lower: Percentage, upper: Percentage): void;

    /**
     * Charcoal effect image (looks like charcoal sketch).
     */
    charcoal(): void;

    /**
     * Charcoal effect image (looks like charcoal sketch).
     * @param radius The radius of the Gaussian, in pixels, not counting the center pixel.
     * @param sigma The standard deviation of the Gaussian, in pixels.
     */
    charcoal(radius: number, sigma: number): void;

    /**
     * Chop image (remove vertical or horizontal subregion of image) using the specified geometry.
     */
    chop(geometry: MagickGeometry): void;

    /**
     * Chop image (remove vertical or horizontal subregion of image).
     * @param x The X offset from origin.
     * @param width The width of the part to chop horizontally.
     */
    chopHorizontal(x: number, width: number): void;

    /**
     * Chop image (remove vertical or horizontal subregion of image).
     * @param y The Y offset from origin.
     * @param height The height of the part to chop vertically.
     */
    chopVertical(y: number, height: number): void;

    /**
     * A variant of adaptive histogram equalization in which the contrast amplification is limited,
     * so as to reduce this problem of noise amplification.
     * @param xTiles The number of tile divisions to use in horizontal direction
     * @param yTiles The number of tile divisions to use in vertical direction.
     * @param numberBins The number of bins for histogram ("dynamic range").
     * @param clipLimit The contrast limit for localised changes in contrast. A limit less than 1 results in standard non-contrast limited AHE.
     */
    clahe(xTiles: number, yTiles: number, numberBins: number, clipLimit: number): void;

    /**
     * A variant of adaptive histogram equalization in which the contrast amplification is limited,
     * so as to reduce this problem of noise amplification.
     * @param xTiles The percentage of tile divisions to use in horizontal direction.
     * @param yTiles The percentage of tile divisions to use in vertical direction.
     * @param numberBins The number of bins for histogram ("dynamic range").
     * @param clipLimit The contrast limit for localised changes in contrast. A limit less than 1 results in standard non-contrast limited AHE.
     */
    clahe(xTiles: Percentage, yTiles: Percentage, numberBins: number, clipLimit: number): void;

    /**
     * Creates a clone of the current image.
     * @param func The function to execute with the image.
     */
    clone<TReturnType>(func: SyncImageCallback<TReturnType>): TReturnType;

    /**
     * Creates a clone of the current image.
     * @param func The async function to execute with the image.
     */
    clone<TReturnType>(func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;

    /**
     * Creates a clone of the current image with the specified geometry.
     * @param geometry The area to clone.
     * @param func The function to execute with the image.
     */
    cloneArea<TReturnType>(geometry: MagickGeometry, func: SyncImageCallback<TReturnType>): TReturnType;

    /**
     * Creates a clone of the current image with the specified geometry.
     * @param geometry The area to clone.
     * @param func The function to execute with the image.
     */
    cloneArea<TReturnType>(geometry: MagickGeometry, func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;

    /**
     * Sets the alpha channel to the specified color.
     * @param color The color to use
     */
    colorAlpha(color: IMagickColor): void;

    /**
     * Returns the distortion based on the specified metric.
     * @param image The other image to compare with this image.
     * @param metric The metric to use.
     */
    compare(image: IMagickImage, metric: ErrorMetric): number;

    /**
     * Returns the distortion based on the specified metric.
     * @param image The other image to compare with this image.
     * @param settings The settings to use.
     */
    compare<TReturnType>(image: IMagickImage, settings: CompareSettings, func: (compareResult: CompareResult) => TReturnType): TReturnType;

    /**
     * Returns the distortion based on the specified metric.
     * @param image The other image to compare with this image.
     * @param settings The settings to use.
     */
    compare<TReturnType>(image: IMagickImage, settings: CompareSettings, func: (compareResult: CompareResult) => Promise<TReturnType>): Promise<TReturnType>;

    /**
     * Returns the distortion based on the specified metric.
     * @param image The other image to compare with this image.
     * @param settings The settings to use.
     */
    compare<TReturnType>(image: IMagickImage, settings: CompareSettings, channels: Channels, func: (compareResult: CompareResult) => TReturnType): TReturnType;

    /**
     * Returns the distortion based on the specified metric.
     * @param image The other image to compare with this image.
     * @param settings The settings to use.
     */
    compare<TReturnType>(image: IMagickImage, settings: CompareSettings, channels: Channels, func: (compareResult: CompareResult) => Promise<TReturnType>): Promise<TReturnType>;

    /**
     * Returns the distortion based on the specified metric.
     * @param image The other image to compare with this image.
     * @param metric The metric to use.
     */
    compare<TReturnType>(image: IMagickImage, metric: ErrorMetric, func: (compareResult: CompareResult) => TReturnType): TReturnType;

    /**
     * Returns the distortion based on the specified metric.
     * @param image The other image to compare with this image.
     * @param metric The metric to use.
     */
    compare<TReturnType>(image: IMagickImage, metric: ErrorMetric, func: (compareResult: CompareResult) => Promise<TReturnType>): Promise<TReturnType>;

    /**
     * Returns the distortion based on the specified metric.
     * @param image The other image to compare with this image.
     * @param metric The metric to use.
     * @param channels The channel(s) to compare.
     */
    compare(image: IMagickImage, metric: ErrorMetric, channels: Channels): number;

    /**
     * Returns the distortion based on the specified metric.
     * @param image The other image to compare with this image.
     * @param metric The metric to use.
     */
    compare<TReturnType>(image: IMagickImage, metric: ErrorMetric, channels: Channels, func: (compareResult: CompareResult) => TReturnType): TReturnType;

    /**
     * Returns the distortion based on the specified metric.
     * @param image The other image to compare with this image.
     * @param metric The metric to use.
     */
    compare<TReturnType>(image: IMagickImage, metric: ErrorMetric, channels: Channels, func: (compareResult: CompareResult) => Promise<TReturnType>): Promise<TReturnType>;

    /**
     * Compose an image onto another at specified offset using the 'In' operator.
     * @param image The image to composite with this image.
     */
    composite(image: IMagickImage): void;

    /**
     * Compose an image onto another using the specified algorithm.
     * @param image The image to composite with this image.
     * @param compose The algorithm to use.
     */
    composite(image: IMagickImage, compose: CompositeOperator): void;

    /**
     * Compose an image onto another using the specified algorithm.
     * @param image The image to composite with this image.
     * @param compose The algorithm to use.
     * @param channels The channel(s) to composite.
     */
    composite(image: IMagickImage, compose: CompositeOperator, channels: Channels): void;

    /**
     * Compose an image onto another using the specified algorithm.
     * @param image The image to composite with this image.
     * @param compose The algorithm to use.
     * @param args The arguments for the algorithm (compose:args).
     */
    composite(image: IMagickImage, compose: CompositeOperator, args: string): void;

    /**
     * Compose an image onto another using the specified algorithm.
     * @param image The image to composite with this image.
     * @param compose The algorithm to use.
     * @param args The arguments for the algorithm (compose:args).
     * @param channels The channel(s) to composite.
     */
    composite(image: IMagickImage, compose: CompositeOperator, args: string, channels: Channels): void;

    /**
     * Compose an image onto another at specified offset using the 'In' operator.
     * @param image The image to composite with this image.
     * @param point The offset to use.
     */
    composite(image: IMagickImage, point: Point): void;

    /**
     * Compose an image onto another at specified offset using the 'In' operator.
     * @param image The image to composite with this image.
     * @param point The offset to use.
     * @param channels The channel(s) to composite.
     */
    composite(image: IMagickImage, point: Point, channels: Channels): void;

    /**
     * Compose an image onto another at specified offset using the specified algorithm.
     * @param image The image to composite with this image.
     * @param compose The algorithm to use.
     * @param point The offset to use.
     */
    composite(image: IMagickImage, compose: CompositeOperator, point: Point): void;

    /**
     * Compose an image onto another at specified offset using the specified algorithm.
     * @param image The image to composite with this image.
     * @param compose The algorithm to use.
     * @param point The offset to use.
     * @param channels The channel(s) to composite.
     */
    composite(image: IMagickImage, compose: CompositeOperator, point: Point, channels: Channels): void;

    /**
     * Compose an image onto another at specified offset using the specified algorithm.
     * @param image The image to composite with this image.
     * @param compose The algorithm to use.
     * @param point The offset to use.
     * @param args The arguments for the algorithm (compose:args).
     */
    composite(image: IMagickImage, compose: CompositeOperator, point: Point, args: string): void;

    /**
     * Compose an image onto another at specified offset using the specified algorithm.
     * @param image The image to composite with this image.
     * @param compose The algorithm to use.
     * @param point The offset to use.
     * @param args The arguments for the algorithm (compose:args).
     * @param channels The channel(s) to composite.
     */
    composite(image: IMagickImage, compose: CompositeOperator, point: Point, args: string, channels: Channels): void;

    /**
     * Compose an image onto another using the specified algorithm.
     * @param image The image to composite with this image.
     * @param compose The algorithm to use.
     * @param gravity The placement gravity.
     */
    compositeGravity(image: IMagickImage, gravity: Gravity): void;

    /**
     * Compose an image onto another using the specified algorithm.
     * @param image The image to composite with this image.
     * @param gravity The placement gravity.
     * @param channels The channel(s) to composite.
     */
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator): void;

    /**
     * Compose an image onto another using the specified algorithm.
     * @param image The image to composite with this image.
     * @param gravity The placement gravity.
     * @param compose The algorithm to use.
     * @param channels The channel(s) to composite.
     */
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, channels: Channels): void;

    /**
     * Compose an image onto another using the specified algorithm.
     * @param image The image to composite with this image.
     * @param gravity The placement gravity.
     * @param compose The algorithm to use.
     * @param args The arguments for the algorithm (compose:args).
     */
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, args: string): void;

    /**
     * Compose an image onto another using the specified algorithm.
     * @param image The image to composite with this image.
     * @param gravity The placement gravity.
     * @param compose The algorithm to use.
     * @param args The arguments for the algorithm (compose:args).
     * @param channels The channel(s) to composite.
     */
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, args: string, channels: Channels): void;

    /**
     * Compose an image onto another at specified offset using the 'In' operator.
     * @param image The image to composite with this image.
     * @param point The offset to use.
     */
    compositeGravity(image: IMagickImage, gravity: Gravity, point: Point): void;

    /**
     * Compose an image onto another at specified offset using the 'In' operator.
     * @param image The image to composite with this image.
     * @param point The offset to use.
     * @param channels The channel(s) to composite.
     */
    compositeGravity(image: IMagickImage, gravity: Gravity, point: Point, channels: Channels): void;

    /**
     * Compose an image onto another at specified offset using the specified algorithm.
     * @param image The image to composite with this image.
     * @param gravity The placement gravity.
     * @param point The offset to use.
     */
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, point: Point): void;

    /**
     * Compose an image onto another at specified offset using the specified algorithm.
     * @param image The image to composite with this image.
     * @param gravity The placement gravity.
     * @param point The offset to use.
     * @param channels The channel(s) to composite.
     */
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, point: Point, channels: Channels): void;

    /**
     * Compose an image onto another at specified offset using the specified algorithm.
     * @param image The image to composite with this image.
     * @param gravity The placement gravity.
     * @param point The offset to use.
     * @param args The arguments for the algorithm (compose:args).
     */
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, point: Point, args: string): void;

    /**
     * Compose an image onto another at specified offset using the specified algorithm.
     * @param image The image to composite with this image.
     * @param gravity The placement gravity.
     * @param point The offset to use.
     * @param args The arguments for the algorithm (compose:args).
     * @param channels The channel(s) to composite.
     */
    compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, point: Point, args: string, channels: Channels): void;

    /**
     * Determines the connected-components of the image.
     *
     * @param connectivity The number of neighbors to visit (4 or 8).
     * @see {@link https://imagemagick.org/script/connected-components.php}
     */
    connectedComponents(connectivity: Connectivity): ConnectedComponent[];

    /**
     * Determines the connected-components of the image.
     *
     * @param settings The connected-components operation settings.
     * @see {@link https://imagemagick.org/script/connected-components.php}
     */
    connectedComponents(settings: ConnectedComponentsSettings): ConnectedComponent[];

    /**
     * Contrast image (enhance intensity differences in image).
     */
    contrast(): void;

    /**
     * A simple image enhancement technique that attempts to improve the contrast in an image by
     * 'stretching' the range of intensity values it contains to span a desired range of values.
     * It differs from the more sophisticated histogram equalization in that it can only apply a
     * linear scaling function to the image pixel values. As a result the 'enhancement' is less harsh.
     * @param blackPoint The black point.
     */
    contrastStretch(blackPoint: Percentage): void;

    /**
     * A simple image enhancement technique that attempts to improve the contrast in an image by
     * 'stretching' the range of intensity values it contains to span a desired range of values.
     * It differs from the more sophisticated histogram equalization in that it can only apply a
     * linear scaling function to the image pixel values. As a result the 'enhancement' is less harsh.
     * @param blackPoint The black point.
     * @param channels The channel(s) to use.
     */
    contrastStretch(blackPoint: Percentage, channels: Channels): void;

    /**
     * A simple image enhancement technique that attempts to improve the contrast in an image by
     * 'stretching' the range of intensity values it contains to span a desired range of values.
     * It differs from the more sophisticated histogram equalization in that it can only apply a
     * linear scaling function to the image pixel values. As a result the 'enhancement' is less harsh.
     * @param blackPoint The black point.
     * @param whitePoint The white point.
     */
    contrastStretch(blackPoint: Percentage, whitePoint: Percentage): void;

    /**
     * A simple image enhancement technique that attempts to improve the contrast in an image by
     * 'stretching' the range of intensity values it contains to span a desired range of values.
     * It differs from the more sophisticated histogram equalization in that it can only apply a
     * linear scaling function to the image pixel values. As a result the 'enhancement' is less harsh.
     * @param blackPoint The black point.
     * @param whitePoint The white point.
     * @param channels The channel(s) to use.
     */
    contrastStretch(blackPoint: Percentage, whitePoint: Percentage, channels: Channels): void;

    /**
     * Crop image (subregion of original image). {@link repage } should be called unless the
     * {@link page} information is needed.
     * @param geometry The subregion to crop.
     */
    crop(geometry: IMagickGeometry): void;

    /**
     * Crop image (subregion of original image). {@link repage } should be called unless the
     * {@link page} information is needed.
     * @param geometry The subregion to crop.
     * @param gravity The position where the cropping should start from.
     */
    crop(geometry: IMagickGeometry, gravity: Gravity): void;

    /**
     * Crop image (subregion of original image). {@link repage } should be called unless the
     * {@link page} information is needed.
     * @param width  The width of the subregion to crop.
     * @param height The height of the subregion to crop.
     */
    crop(width: number, height: number): void;

    /**
     * Crop image (subregion of original image). {@link repage } should be called unless the
     * {@link page} information is needed.
     * @param width The width of the subregion to crop.
     * @param height The height of the subregion to crop.
     * @param gravity The position where the cropping should start from.
     */
    crop(width: number, height: number, gravity: Gravity): void;

    /**
     * Creates tiles of the current image in the specified dimension.
     * @param geometry The dimension of the tiles.
     * @param func: The function to execute with the tiles.
     */
    cropToTiles<TReturnType>(geometry: IMagickGeometry, func: (images: IMagickImageCollection) => TReturnType): TReturnType;

    /**
     * Creates tiles of the current image in the specified dimension.
     * @param geometry The dimension of the tiles.
     * @param func: The async function to execute with the tiles.
     */
    cropToTiles<TReturnType>(geometry: IMagickGeometry, func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;

    /**
     * Creates tiles of the current image in the specified dimension.
     * @param width: The width of the tiles.
     * @param height: The height of the tiles.
     * @param func: The function to execute with the tiles.
     */
    cropToTiles<TReturnType>(width: number, height: number, func: (images: IMagickImageCollection) => TReturnType): TReturnType;

    /**
     * Creates tiles of the current image in the specified dimension.
     * @param width: The width of the tiles.
     * @param height: The height of the tiles.
     * @param func: The async function to execute with the tiles.
     */
    cropToTiles<TReturnType>(width: number, height: number, func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;

    /**
     * Displaces an image's colormap by a given number of positions.
     * @param amount The amount to displace the colormap.
     */
    cycleColormap(amount: number): void;

    /**
     * Removes skew from the image. Skew is an artifact that occurs in scanned images because of
     * the camera being misaligned, imperfections in the scanning or surface, or simply because
     * the paper was not placed completely flat when scanned. The value of threshold ranges
     * from 0 to QuantumRange.
     * @param threshold The threshold.
     */
    deskew(threshold: Percentage): number;

    /**
     * Removes skew from the image. Skew is an artifact that occurs in scanned images because of
     * the camera being misaligned, imperfections in the scanning or surface, or simply because
     * the paper was not placed completely flat when scanned. The value of threshold ranges
     * from 0 to QuantumRange.
     * @param threshold The threshold.
     * @param autoCrop-  A value indicating whether the image should be auto cropped after deskewing.
     */
    deskew(threshold: Percentage, autoCrop: boolean): number;

    /**
     * Distorts an image using various distortion methods, by mapping color lookups of the source
     * image to a new destination image of the same size as the source image.
     * @param method The distortion method to use.
     * @param params An array containing the arguments for the distortion.
     */
    distort(method: DistortMethod, params: number[]): void;

    /**
     * Distorts an image using various distortion methods, by mapping color lookups of the source
     * image to a new destination image of the same size as the source image.
     * @param settings The settings for the distortion.
     * @param params An array containing the arguments for the distortion.
     */
    distort(settings: DistortSettings, params: number[]): void;

    /**
     * Draw on image using one or more drawables.
     * @param drawables The drawable(s) to draw on the image.
     */
    draw(drawables: IDrawable[]): void;

    /**
     * Draw on image using one or more drawables.
     * @param drawables The drawable(s) to draw on the image.
     */
    draw(...drawables: IDrawable[]): void;

    /**
     * Apply an arithmetic or bitwise operator to the image pixel quantums.
     * @param channels The channel(s) to apply the operator on.
     * @param operator The operator to use.
     * @param value- The value to use.
     */
    evaluate(channels: Channels, operator: EvaluateOperator, value: number): void;

    /**
     * Apply an arithmetic or bitwise operator to the image pixel quantums.
     * @param channels The channel(s) to apply the operator on.
     * @param operator The operator to use.
     * @param value- The value to use.
     */
    evaluate(channels: Channels, operator: EvaluateOperator, value: Percentage): void;

    /**
     * Apply an arithmetic or bitwise operator to the image pixel quantums.
     * @param channels The channel(s) to apply the operator on.
     * @param geometry The geometry to use.
     * @param operator The operator to use.
     * @param value- The value to use.
     */
    evaluate(channels: Channels, geometry: IMagickGeometry, operator: EvaluateOperator, value: number): void;

    /**
     * Apply an arithmetic or bitwise operator to the image pixel quantums.
     * @param channels The channel(s) to apply the operator on.
     * @param geometry The geometry to use.
     * @param operator The operator to use.
     * @param value- The value to use.
     */
    evaluate(channels: Channels, geometry: IMagickGeometry, operator: EvaluateOperator, value: Percentage): void;

    /**
     *  Extend the image as defined by the width and height.
     * @param width The width to extend the image to.
     * @param height The height to extend the image to.
     */
    extent(width: number, height: number): void;

    /**
     *  Extend the image as defined by the width and height.
     * @param width The width to extend the image to.
     * @param height The height to extend the image to.
     * @param gravity The placement gravity.
     */
    extent(width: number, height: number, gravity: Gravity): void;

    /**
     *  Extend the image as defined by the width and height.
     * @param width The width to extend the image to.
     * @param height The height to extend the image to.
     * @param gravity The placement gravity.
     * @param backgroundColor The background color to use.
     */
    extent(width: number, height: number, backgroundColor: IMagickColor): void;

    /**
     *  Extend the image as defined by the width and height.
     * @param geometry The geometry to extend the image to.
     */
    extent(geometry: IMagickGeometry): void;

    /**
     *  Extend the image as defined by the width and height.
     * @param geometry The geometry to extend the image to.
     * @param gravity The placement gravity.
     */
    extent(geometry: IMagickGeometry, gravity: Gravity): void;

    /**
     *  Extend the image as defined by the width and height.
     * @param geometry The geometry to extend the image to.
     * @param gravity The placement gravity.
     * @param backgroundColor The background color to use.
     */
    extent(geometry: IMagickGeometry, gravity: Gravity, backgroundColor: IMagickColor): void;

    /**
     *  Extend the image as defined by the width and height.
     * @param geometry The geometry to extend the image to.
     * @param backgroundColor The background color to use.
     */
    extent(geometry: IMagickGeometry, backgroundColor: IMagickColor): void;

    /**
     * Flips image (reflect each scanline in the vertical direction).
     */
    flip(): void;

    /**
     * Flop image (reflect each scanline in the horizontal direction).
     */
    flop(): void;

    /**
     * Formats the specified expression (more info can be found here: https://imagemagick.org/script/escape.php).
     * @param expression The expression.
     */
    formatExpression(expression: string): string | null;

    /**
     * Gamma correct image.
     * @param gamma The image gamma.
     */
    gammaCorrect(gamma: number): void;

    /**
     * Gamma correct image.
     * @param gamma The image gamma for the channel.
     * @param channels The channel(s) to gamma correct.
     */
    gammaCorrect(gamma: number, channels: Channels): void;

    /**
     * Gaussian blur image.
     * @param radius The number of neighbor pixels to be included in the convolution.
     */
    gaussianBlur(radius: number): void;

    /**
     * Gaussian blur image.
     * @param radius The number of neighbor pixels to be included in the convolution.
     * @param sigma The standard deviation of the gaussian bell curve.
    */
    gaussianBlur(radius: number, sigma: number): void;

    /**
     * Gaussian blur image.
     * @param radius The number of neighbor pixels to be included in the convolution.
     * @param sigma The standard deviation of the gaussian bell curve.
     * @param sigma The channel(s) to blur.
     */
    gaussianBlur(radius: number, sigma: number, channels: Channels): void;

    /**
     * Returns the value of the artifact with the specified name.
     * @param name The name of the artifact.
     */
    getArtifact(name: string): string | null;

    /**
     * Returns the value of the attribute with the specified name.
     * @param name The name of the attribute.
     */
    getAttribute(name: string): string | null;

    /**
     * Returns the color at colormap position index.
     * @param index The position index.
     */
    getColormapColor(index: number): IMagickColor | null;

    /**
     *  Retrieve the color profile from the image.
     */
    getColorProfile(): IColorProfile | null;

    /**
     * Get a pixel collection that can be used to read or modify the pixels of this image.
     * @param func The function to execute with the pixel collection.
     */
    getPixels<TReturnType>(func: (pixels: IPixelCollection) => TReturnType): TReturnType;

    /**
     * Get a pixel collection that can be used to read or modify the pixels of this image.
     * @param func The async function to execute with the pixel collection.
     */
    getPixels<TReturnType>(func: (pixels: IPixelCollection) => Promise<TReturnType>): Promise<TReturnType>;

    /**
     * Retrieve a named profile from the image.
     * @param name The name of the profile.
     */
    getProfile(name: string): IImageProfile | null;

    /**
     * Gets the associated write mask of the image.
     * @param func The function to execute with the write mask.
     */
    getWriteMask<TReturnType>(func: (mask: IMagickImage | null) => TReturnType): TReturnType;

    /**
     * Gets the associated write mask of the image.
     * @param func The async function to execute with the write mask.
     */
    getWriteMask<TReturnType>(func: (mask: IMagickImage | null) => Promise<TReturnType>): Promise<TReturnType>;

    /**
     * Converts the colors in the image to gray.
     */
    grayscale(): void;

    /**
     * Converts the colors in the image to gray.
     * @param method The pixel intensity method to use.
     */
    grayscale(method: PixelIntensityMethod): void;

    /**
     * Gets a value indicating whether a profile with the specified name already exists on the image.
     * @param name The name of the profile.
     */
    hasProfile(name: string): boolean;

    /**
     * Creates a color histogram.
     */
    histogram(): Map<string, number>;

    /**
     * Inverse contrast image (diminish intensity differences in image).
     */
    inverseContrast(): void;

    /**
     * Applies the reversed level operation to just the specific channels specified. It compresses
     * the full range of color values, so that they lie between the given black and white points.
     * @param blackPoint The darkest color in the image. Colors darker are set to zero.
     * @param whitePoint The lightest color in the image. Colors brighter are set to the maximum quantum value.
     */
    inverseLevel(blackPoint: Percentage, whitePoint: Percentage): void;

    /**
     * Applies the reversed level operation to just the specific channels specified. It compresses
     * the full range of color values, so that they lie between the given black and white points.
     * @param blackPoint The darkest color in the image. Colors darker are set to zero.
     * @param whitePoint The lightest color in the image. Colors brighter are set to the maximum quantum value.
     * @param gamma The gamma correction to apply to the image. (Useful range of 0 to 10).
     */
    inverseLevel(blackPoint: Percentage, whitePoint: Percentage, gamma: number): void;

    /**
     * Applies the reversed level operation to just the specific channels specified. It compresses
     * the full range of color values, so that they lie between the given black and white points.
     * @param blackPoint The darkest color in the image. Colors darker are set to zero.
     * @param whitePoint The lightest color in the image. Colors brighter are set to the maximum quantum value.
     * @param gamma The gamma correction to apply to the image. (Useful range of 0 to 10).
     * @param channels The channel(s) to level.
     */
    inverseLevel(blackPoint: Percentage, whitePoint: Percentage, gamma: number, channels: Channels): void;

    /**
     * Changes any pixel that does not match the target with the color defined by fill.
     * @param target The color to replace.
     * @param fill The color to replace opaque color with.
     */
    inverseOpaque(target: IMagickColor, fill: IMagickColor): void;

    /**
     * Adjust the image contrast with an inverse non-linear sigmoidal contrast algorithm.
     * @param contrast The contrast.
     */
    inverseSigmoidalContrast(contrast: number): void;

    /**
     * Adjust the image contrast with an inverse non-linear sigmoidal contrast algorithm.
     * @param contrast The contrast to use.
     * @param midpoint The midpoint to use.
     */
    inverseSigmoidalContrast(contrast: number, midpoint: Percentage): void;

    /**
     * Adjust the image contrast with an inverse non-linear sigmoidal contrast algorithm.
     * @param contrast The contrast to use.
     * @param midpoint The midpoint to use.
     */
    inverseSigmoidalContrast(contrast: number, midpoint: number): void;

    /**
     * Adjust the image contrast with an inverse non-linear sigmoidal contrast algorithm.
     * @param contrast The contrast to use.
     * @param midpoint The midpoint to use.
     * @param channels The channel(s) that should be adjusted.
     */
    inverseSigmoidalContrast(contrast: number, midpoint: number, channels: Channels): void;

    /**
     * Add alpha channel to image, setting pixels that don't match the specified color to transparent.
     * @param color The color that should not be made transparent.
     */
    inverseTransparent(color: IMagickColor): void;

    /**
     * Adjust the levels of the image by scaling the colors falling between specified white and
     * black points to the full available quantum range.
     * @param blackPoint The darkest color in the image. Colors darker are set to zero.
     * @param whitePoint The lightest color in the image. Colors brighter are set to the maximum quantum value.
     */
    level(blackPoint: Percentage, whitePoint: Percentage): void;

    /**
     * Adjust the levels of the image by scaling the colors falling between specified white and
     * black points to the full available quantum range.
     * @param blackPoint The darkest color in the image. Colors darker are set to zero.
     * @param whitePoint The lightest color in the image. Colors brighter are set to the maximum quantum value.
     * @param gamma The gamma correction to apply to the image. (Useful range of 0 to 10).
     */
    level(blackPoint: Percentage, whitePoint: Percentage, gamma: number): void;

    /**
     * Adjust the levels of the image by scaling the colors falling between specified white and
     * black points to the full available quantum range.
     * @param blackPoint The darkest color in the image. Colors darker are set to zero.
     * @param whitePoint The lightest color in the image. Colors brighter are set to the maximum quantum value.
     * @param gamma The gamma correction to apply to the image. (Useful range of 0 to 10).
     * @param channels The channel(s) to level.
     */
    level(blackPoint: Percentage, whitePoint: Percentage, gamma: number, channels: Channels): void;

    /**
     * Discards any pixels below the black point and above the white point and levels the remaining pixels.
     * @param blackPoint The black point.
     * @param whitePoint The white point.
     */
    linearStretch(blackPoint: Percentage, whitePoint: Percentage): void;

    /**
     * Rescales image with seam carving.
     * @param geometry The geometry to use.
     */
    liquidRescale(geometry: IMagickGeometry): void;

    /**
     * Rescales image with seam carving.
     * @param width The new width.
     * @param height The new height.
     */
    liquidRescale(width: number, height: number): void;

    /**
     * Modulate percent brightness of an image.
     * @param brightness The brightness percentage.
     */
    modulate(brightness: Percentage): void;

    /**
     * Modulate percent brightness and saturation of an image.
     * @param brightness The brightness percentage.
     * @param saturation The saturation percentage.
     */
    modulate(brightness: Percentage, saturation: Percentage): void;

    /**
     * Modulate percent brightness, saturation and hue of an image.
     * @param brightness The brightness percentage.
     * @param saturation The saturation percentage.
     * @param hue The hue percentage.
     */
    modulate(brightness: Percentage, saturation: Percentage, hue: Percentage): void;

    /**
     * Applies a kernel to the image according to the given mophology settings.
     * @param settings The settings to use.
     */
    morphology(settings: MorphologySettings): void;

    /**
     * Motion blur image with specified blur factor.
     * @param radius The radius of the Gaussian, in pixels, not counting the center pixel.
     * @param sigma The standard deviation of the Gaussian, in pixels.
     * @param angle The angle the object appears to be comming from (zero degrees is from the right).
     */
    motionBlur(radius: number, sigma: number, angle: number): void;

    /**
     * Negate colors in image.
     */
    negate(): void;

    /**
     * Negate colors in image for the specified channel.
     * @param channels  The channel(s) that should be negated.
     */
    negate(channels: Channels): void;

    /**
     * Negate the grayscale colors in image.
     */
    negateGrayScale(): void;

    /**
     * Negate the grayscale colors in image for the specified channel.
     * @param channels The channel(s) that should be negated.
     */
    negateGrayScale(channels: Channels): void;

    /**
     * Normalize image (increase contrast by normalizing the pixel values to span the full range
     * of color values).
     */
    normalize(): void;

    /**
     * Oilpaint image (image looks like oil painting).
     */
    oilPaint(): void;

    /**
     * Oilpaint image (image looks like oil painting).
     * @param radius The radius of the circular neighborhood.
     */
    oilPaint(radius: number): void;

    /**
     * Changes any pixel that matches target with the color defined by fill.
     * @param target The color to replace.
     * @param fill The color to replace opaque color with.
     */
    opaque(target: IMagickColor, fill: IMagickColor): void;

    /**
     * Returns the perceptual hash of this image with the colorspaces @see ColorSpace.XyY
     * and @see ColorSpace.HSB .
     */
    perceptualHash(): IPerceptualHash;

    /**
     * Returns the perceptual hash of this image.
     * @param colorSpaces The colorspaces to get the perceptual hash for.
     */
    perceptualHash(colorSpaces: ReadonlyArray<ColorSpace>): IPerceptualHash;

    /**
     * Reads only metadata and not the pixel data.
     * @param fileName The fully qualified name of the image file, or the relative image file name.
     * @param settings The settings to use when reading the image.
     */
    ping(fileName: string, settings?: MagickReadSettings): void;

    /**
     * Reads only metadata and not the pixel data.
     * @param array The byte array to read the information from.
     * @param settings The settings to use when reading the image.
     */
    ping(array: ByteArray, settings?: MagickReadSettings): void;

    /**
     * Quantize image (reduce number of colors).
     * @param settings The settings to use when quantizing the image.
     */
    quantize(settings?: QuantizeSettings): MagickErrorInfo | null;

    /**
     * Read single image frame.
     * @param color The color to fill the image with.
     * @param width The width of the image.
     * @param height The height of the image.
     */
    read(color: IMagickColor, width: number, height: number): void;

    /**
     * Read single image frame.
     * @param fileName The fully qualified name of the image file, or the relative image file name.
     * @param settings The settings to use when reading the image.
     */
    read(fileName: string, settings?: MagickReadSettings): void;

    /**
     * Read single image frame.
     * @param array The byte array to read the image from.
     * @param settings The settings to use when reading the image.
     */
    read(array: ByteArray, settings?: MagickReadSettings): void;

    /**
     * Read single image frame from canvas.
     * @param canvas The canvas to read the image from.
     * @param settings The {@link CanvasRenderingContext2DSettings} to use when reading the image.
     */
    readFromCanvas(canvas: HTMLCanvasElement, settings?: CanvasRenderingContext2DSettings): void;

    /**
     * Removes the artifact with the specified name.
     * @param name The name of the artifact.
     */
    removeArtifact(name: string): void;

    /**
     * Removes the attribute with the specified name.
     * @param name The name of the attribute.
     */
    removeAttribute(name: string): void;

    /**
     * Remove a named profile from the image.
     * @param profile The profile to remove.
     */
    removeProfile(profile: IImageProfile): void;

    /**
     * Remove a named profile from the image.
     * @param name The name of the profile (e.g. "ICM", "IPTC", or a generic profile name).
     */
    removeProfile(name: string): void;

    /**
     * Removes the associated write mask of the image.
     */
    removeWriteMask(): void;

    /**
     * Resets the page property of this image.
     */
    resetPage(): void;

    /**
     * Resize image in terms of its pixel size.
     * @param geometry The geometry to use.
     */
    resize(geometry: IMagickGeometry): void;

    /**
     * Resize image in terms of its pixel size.
     * @param geometry The geometry to use.
     * @param filterType The filter type to use.
     */
    resize(geometry: IMagickGeometry, filterType: FilterType): void;

    /**
     * Resize image in terms of its pixel size.
     * @param width The new width.
     * @param height The new height.
     */
    resize(width: number, height: number): void;

    /**
     * Resize image in terms of its pixel size.
     * @param width The new width.
     * @param height The new height.
     * @param filterType The filter type to use.
     */
    resize(width: number, height: number, filterType: FilterType): void;

    /**
     * Rotate image clockwise by specified number of degrees.
     * Specify a negative number for <paramref name="degrees"/> to rotate counter-clockwise.
     * @param degrees The number of degrees to rotate (positive to rotate clockwise, negative to rotate counter-clockwise).
     */
    rotate(degrees: number): void;

    /**
     * Separates the channels from the image and returns it as grayscale images.
     * @param func The function to execute with the separated images.
     */
    separate<TReturnType>(func: (images: IMagickImageCollection) => TReturnType): TReturnType;

    /**
     * Separates the channels from the image and returns it as grayscale images.
     * @param func The async function to execute with the separated images.
     */
    separate<TReturnType>(func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;

    /**
     * Separates the channels from the image and returns it as grayscale images.
     * @param channels The channel(s) to separate.
     * @param func The function to execute with the separated images.
     */
    separate<TReturnType>(channels: Channels, func: (images: IMagickImageCollection) => TReturnType): TReturnType;

    /**
     * Separates the channels from the image and returns it as grayscale images.
     * @param channels The channel(s) to separate.
     * @param func The async function to execute with the separated images.
     */
    separate<TReturnType>(channels: Channels, func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;

    /**
     * Applies a special effect to the image, similar to the effect achieved in a photo darkroom
     * by sepia toning.
     */
    sepiaTone(): void;

    /**
     * Applies a special effect to the image, similar to the effect achieved in a photo darkroom
     * by sepia toning.
     * @param threshold The tone threshold.
     */
    sepiaTone(threshold: number): void;

    /**
     * Applies a special effect to the image, similar to the effect achieved in a photo darkroom
     * by sepia toning.
     * @param threshold The tone threshold.
     */
    sepiaTone(threshold: Percentage): void;

    /**
     *  Inserts the artifact with the specified name and value into the artifact tree of the image.
     * @param name The name of the artifact.
     * @param value The value of the artifact.
     */
    setArtifact(name: string, value: boolean | IMagickColor | number | string): void;

    /**
     *  Inserts the attribute with the specified name and value into the artifact tree of the image.
     * @param name The name of the attribute.
     * @param value The value of the attribute.
     */
    setAttribute(name: string, value: string): void;

    /**
     * Set the specified profile of the image. If a profile with the same name already exists it will be overwritten.
     * @param profile The profile to set.
     */
    setProfile(profile: IImageProfile): void

    /**
     * Set the specified profile of the image. If a profile with the same name already exists it will be overwritten.
     * @param name The name of the profile (e.g. "ICM", "IPTC", or a generic profile name).
     * @param data The profile data.
     */
    setProfile(name: string, data: ByteArray): void

    /**
     * Sets the associated write mask of the image. The mask must be the same dimensions as the image and
     * only contains the colors black and white or have grayscale values that will cause blended updates of
     * the image.
     * @param image The image that contains the write mask.
     */
    setWriteMask(image: IMagickImage): void;

    /**
     * Sharpen pixels in image.
     */
    sharpen(): void;

    /**
     * Sharpen pixels in image.
     * @param radius The radius of the Gaussian, in pixels, not counting the center pixel.
     * @param sigma The standard deviation of the Gaussian, in pixels.
     */
    sharpen(radius: number, sigma: number): void;

    /**
     * Sharpen pixels in image.
     * @param radius The radius of the Gaussian, in pixels, not counting the center pixel.
     * @param sigma The standard deviation of the Gaussian, in pixels.
     * @param channels The channel(s) that should be sharpened.
     */
    sharpen(radius: number, sigma: number, channels: Channels): void;

    /**
     * Shave pixels from image edges.
     * @param leftRight The number of pixels to shave left and right.
     * @param topBottom The number of pixels to shave top and bottom.
     */
    shave(leftRight: number, topBottom: number): void;

    /**
     * Adjust the image contrast with a non-linear sigmoidal contrast algorithm.
     * @param contrast The contrast to use.
     */
    sigmoidalContrast(contrast: number): void;

    /**
     * Adjust the image contrast with a non-linear sigmoidal contrast algorithm.
     * @param contrast The contrast to use.
     * @param midpoint The midpoint to use.
     */
    sigmoidalContrast(contrast: number, midpoint: Percentage): void;

    /**
     * Adjust the image contrast with a non-linear sigmoidal contrast algorithm.
     * @param contrast The contrast to use.
     * @param midpoint The midpoint to use.
     */
    sigmoidalContrast(contrast: number, midpoint: number): void;

    /**
     * Adjust the image contrast with a non-linear sigmoidal contrast algorithm.
     * @param contrast The contrast to use.
     * @param midpoint The midpoint to use.
     * @param channels The channel(s) that should be adjusted.
     */
    sigmoidalContrast(contrast: number, midpoint: number, channels: Channels): void;

    /**
     * Solarize image (similar to effect seen when exposing a photographic film to light during
     * the development process).
     */
    solarize(): void;

    /**
     * Solarize image (similar to effect seen when exposing a photographic film to light during
     * the development process).
     * @param factor The factor to use.
     */
    solarize(factor: number): void;

    /**
     * Solarize image (similar to effect seen when exposing a photographic film to light during
     * the development process).
     * @param factor The factor to use.
     */
    solarize(factor: Percentage): void;

    /**
     * Splice the background color into the image.
     * @param geometry The geometry to use.
     */
    splice(geometry: IMagickGeometry): void;

    /**
     * Returns the image statistics.
     */
    statistics(): IStatistics;

    /**
     * Returns the image statistics.
     * @param channels The channel(s) to use.
     */
    statistics(channels: Channels): IStatistics;

    /**
     * Strips an image of all profiles and comments.
     */
    strip(): void;

    /**
     * Transforms the image from the colorspace of the source profile to the target profile. This
     * requires the image to have a color profile. Nothing will happen if the image has no color profile.
     * @param target The target color profile.
     * @returns A value indicating whether the transformation was successful.
     */
    transformColorSpace(target: IColorProfile): boolean;

    /**
     * Transforms the image from the colorspace of the source profile to the target profile. This
     * requires the image to have a color profile. Nothing will happen if the image has no color profile.
     * @param target The target color profile.
     * @param mode The color transform node.
     * @returns A value indicating whether the transformation was successful.
     */
    transformColorSpace(target: IColorProfile, mode: ColorTransformMode): boolean;

    /**
     * Transforms the image from the colorspace of the source profile to the target profile. The
     * source profile will only be used if the image does not contain a color profile. Nothing
     * will happen if the source profile has a different colorspace then that of the image.
     * @param source The source color profile.
     * @param target The target color profile.
     * @returns A value indicating whether the transformation was successful.
     */
    transformColorSpace(source: IColorProfile, target: IColorProfile): boolean;

    /**
     * Transforms the image from the colorspace of the source profile to the target profile. The
     * source profile will only be used if the image does not contain a color profile. Nothing
     * will happen if the source profile has a different colorspace then that of the image.
     * @param source The source color profile.
     * @param target The target color profile.
     * @param mode The color transform node.
     * @returns A value indicating whether the transformation was successful.
     */
    transformColorSpace(source: IColorProfile, target: IColorProfile, mode: ColorTransformMode): boolean;

    /**
     * Threshold image.
     * @param percentage The threshold percentage.
     */
    threshold(percentage: Percentage): void;

    /**
     * Threshold image.
     * @param percentage The threshold percentage.
     * @param channels The channel(s) that should be thresholded.
     */
    threshold(percentage: Percentage, channels: Channels): void;

    /**
     * Resize image to thumbnail size and remove all the image profiles except the icc/icm profile.
     * @param width The new width.
     * @param height The new height.
     */
    thumbnail(width: number, height: number): void;

    /**
     * Resize image to thumbnail size and remove all the image profiles except the icc/icm profile.
     * @param geometry The geometry to use.
     */
    thumbnail(geometry: IMagickGeometry): void;

    /**
     * Returns a string that represents the current image.
     */
    toString(): string;

    /**
     * Add alpha channel to image, setting pixels matching color to transparent.
     * @param color The color to make transparent.
     */
    transparent(color: IMagickColor): void;

    /**
     * Trim edges that are the background color from the image. The property {@link boundingBox} can be used to the
     * coordinates of the area that will be extracted.
     */
    trim(): void;

    /**
     * Trim the specified edges that are the background color from the image.
     * @param edges The edges that need to be trimmed.
     */
    trim(...edges: Gravity[]): void;

    /**
     * Trim edges that are the background color from the image. The property {@link boundingBox} can be used to the
     * coordinates of the area that will be extracted.
     * @param percentage The percentage of background pixels permitted in the outer rows and columns.
     */
    trim(percentage: Percentage): void;

    /**
     * Softens the edges of the image in vignette style.
     */
    vignette(): void;

    /**
     * Softens the edges of the image in vignette style.
     * @param radius The radius of the Gaussian, in pixels, not counting the center pixel.
     * @param sigma The standard deviation of the Gaussian, in pixels.
     * @param x The x ellipse offset.
     * @param y The y ellipse offset.
     */
    vignette(radius: number, sigma: number, x: number, y: number): void;

    /**
     * Map image pixels to a sine wave.
     */
    wave(): void;

    /**
     * Map image pixels to a sine wave.
     * @param method The pixel interpolate method.
     * @param amplitude The amplitude.
     * @param length The length of the wave.
     */
    wave(method: PixelInterpolateMethod, amplitude: number, length: number): void;

    /**
     * Forces all pixels below the threshold into white while leaving all pixels at or above
     * the threshold unchanged.
     * @param threshold The threshold to use.
     */
    whiteThreshold(threshold: Percentage): void;

    /**
     * Forces all pixels below the threshold into white while leaving all pixels at or above
     * the threshold unchanged.
     * @param threshold The threshold to use.
     * @param channels The channel(s) to make white
     */
    whiteThreshold(threshold: Percentage, channels: Channels): void;

    /**
     * Writes the image to a byte array. This array points to native memory and will be give back to the native
     * memory manager after the excution of the function. A copy of the data should be made if it needs to be
     * used after the function has completed.
     * @param func The function to execute with the byte array.
     */
    write<TReturnType>(func: (data: Uint8Array) => TReturnType): TReturnType;

    /**
     * Writes the image to a byte array.This array points to native memory and will be give back to the native
     * memory manager after the excution of the function. A copy of the data should be made if it needs to be
     * used after the function has completed.
     * @param func The async function to execute with the byte array.
     */
    write<TReturnType>(func: (data: Uint8Array) => Promise<TReturnType>): Promise<TReturnType>;

    /**
     * Writes the image to a byte array.This array points to native memory and will be give back to the native
     * memory manager after the excution of the function. A copy of the data should be made if it needs to be
     * used after the function has completed.
     * @param format The format to use.
     * @param func The function to execute with the byte array.
     */
    write<TReturnType>(format: MagickFormat, func: (data: Uint8Array) => TReturnType): TReturnType;

    /**
     * Writes the image to a byte array.This array points to native memory and will be give back to the native
     * memory manager after the excution of the function. A copy of the data should be made if it needs to be
     * used after the function has completed.
     * @param format The format to use.
     * @param func The async function to execute with the byte array.
     */
    write<TReturnType>(format: MagickFormat, func: (data: Uint8Array) => Promise<TReturnType>): Promise<TReturnType>;

    /**
     * Writes the image to the specified canvas.
     * @param canvas The canvas to write the image to.
     * @param settings The {@link CanvasRenderingContext2DSettings} to use when writing the image.
     */
    writeToCanvas(canvas: HTMLCanvasElement, settings?: CanvasRenderingContext2DSettings): void;
}

export class MagickImage extends NativeInstance implements IMagickImage {
    private readonly _settings: MagickSettings;
    private _progress?: (event: ProgressEvent) => number;
    private _warning?: (event: WarningEvent) => number;

    private constructor(instance: number, settings: MagickSettings) {
        super(instance, ImageMagick._api._MagickImage_Dispose);
        this._settings = settings;
    }

    get animationDelay(): number {
        return ImageMagick._api._MagickImage_AnimationDelay_Get(this._instance);
    }
    set animationDelay(value: number) {
        ImageMagick._api._MagickImage_AnimationDelay_Set(this._instance, value);
    }

    get animationIterations(): number {
        return ImageMagick._api._MagickImage_AnimationIterations_Get(this._instance);
    }
    set animationIterations(value: number) {
        ImageMagick._api._MagickImage_AnimationIterations_Set(this._instance, value);
    }

    get animationTicksPerSecond(): number {
        return ImageMagick._api._MagickImage_AnimationTicksPerSecond_Get(this._instance);
    }
    set animationTicksPerSecond(value: number) {
        ImageMagick._api._MagickImage_AnimationTicksPerSecond_Set(this._instance, value);
    }

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

    get backgroundColor(): IMagickColor {
        const colorPtr = ImageMagick._api._MagickImage_BackgroundColor_Get(this._instance);
        return MagickColor._create(colorPtr);
    }
    set backgroundColor(value: IMagickColor) {
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

    get borderColor(): IMagickColor {
        const colorPtr = ImageMagick._api._MagickImage_BorderColor_Get(this._instance);
        return MagickColor._create(colorPtr);
    }
    set borderColor(value: IMagickColor) {
        value._use(valuePtr => {
            ImageMagick._api._MagickImage_BorderColor_Set(this._instance, valuePtr);
        });
    }

    get boundingBox(): IMagickGeometry | null {
        return this.useExceptionPointer(exception => {
            const boundingBox = ImageMagick._api._MagickImage_BoundingBox_Get(this._instance, exception);
            const geometry = MagickGeometry._fromRectangle(boundingBox);
            if (geometry.width === 0 || geometry.height === 0)
                return null;

            return geometry;
        });
    }

    get channelCount(): number {
        return ImageMagick._api._MagickImage_ChannelCount_Get(this._instance);
    }

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
            PrimaryInfo._create(ImageMagick._api._MagickImage_ChromaRed_Get(this._instance)),
            PrimaryInfo._create(ImageMagick._api._MagickImage_ChromaGreen_Get(this._instance)),
            PrimaryInfo._create(ImageMagick._api._MagickImage_ChromaBlue_Get(this._instance)),
            PrimaryInfo._create(ImageMagick._api._MagickImage_ChromaWhite_Get(this._instance)));
    }
    set chromaticity(value: ChromaticityInfo) {
        value.blue._use(primaryInfoPtr => ImageMagick._api._MagickImage_ChromaBlue_Set(this._instance, primaryInfoPtr));
        value.green._use(primaryInfoPtr => ImageMagick._api._MagickImage_ChromaGreen_Set(this._instance, primaryInfoPtr));
        value.red._use(primaryInfoPtr => ImageMagick._api._MagickImage_ChromaRed_Set(this._instance, primaryInfoPtr));
        value.white._use(primaryInfoPtr => ImageMagick._api._MagickImage_ChromaWhite_Set(this._instance, primaryInfoPtr));
    }

    get classType(): ClassType {
        return <ClassType>ImageMagick._api._MagickImage_ClassType_Get(this._instance);
    }
    set classType(value: ClassType) {
        this.useExceptionPointer(exception => {
            ImageMagick._api._MagickImage_ClassType_Set(this._instance, value, exception);
        });
    }

    get colorFuzz(): Percentage {
        return Percentage._fromQuantum(ImageMagick._api._MagickImage_ColorFuzz_Get(this._instance));
    }
    set colorFuzz(value: Percentage) {
        ImageMagick._api._MagickImage_ColorFuzz_Set(this._instance, value._toQuantum());
    }

    get colormapSize(): number {
        return ImageMagick._api._MagickImage_ColormapSize_Get(this._instance);
    }
    set colormapSize(value: number) {
        this.useExceptionPointer(exception => {
            ImageMagick._api._MagickImage_ColormapSize_Set(this._instance, value, exception);
        });
    }

    get colorSpace(): ColorSpace {
        return <ColorSpace>ImageMagick._api._MagickImage_ColorSpace_Get(this._instance);
    }
    set colorSpace(value: ColorSpace) {
        this.useExceptionPointer(exception => {
            ImageMagick._api._MagickImage_ColorSpace_Set(this._instance, value, exception);
        });
    }

    get colorType(): ColorType {
        if (this.settings.colorType !== undefined) {
            return this.settings.colorType;
        }

        return <ColorType>ImageMagick._api._MagickImage_ColorType_Get(this._instance);
    }
    set colorType(value: ColorType) {
        this.useExceptionPointer(exception => {
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
        return <CompositeOperator>ImageMagick._api._MagickImage_Compose_Get(this._instance);
    }
    set compose(value: CompositeOperator) {
        ImageMagick._api._MagickImage_Compose_Set(this._instance, value);
    }

    get compression(): CompressionMethod {
        return <CompressionMethod>ImageMagick._api._MagickImage_Compression_Get(this._instance);
    }

    get density(): Density {
        return new Density(
            ImageMagick._api._MagickImage_ResolutionX_Get(this._instance),
            ImageMagick._api._MagickImage_ResolutionY_Get(this._instance),
            <DensityUnit>ImageMagick._api._MagickImage_ResolutionUnits_Get(this._instance));
    }
    set density(value: Density) {
        ImageMagick._api._MagickImage_ResolutionX_Set(this._instance, value.x);
        ImageMagick._api._MagickImage_ResolutionY_Set(this._instance, value.y);
        ImageMagick._api._MagickImage_ResolutionUnits_Set(this._instance, value.units);
    }

    get depth(): number { return ImageMagick._api._MagickImage_Depth_Get(this._instance); }
    set depth(value: number) { ImageMagick._api._MagickImage_Depth_Set(this._instance, value); }

    get endian(): Endian { return <Endian>ImageMagick._api._MagickImage_Endian_Get(this._instance); }
    set endian(value: Endian) { ImageMagick._api._MagickImage_Endian_Set(this._instance, value); }

    get fileName(): string | null {
        const fileName = ImageMagick._api._MagickImage_FileName_Get(this._instance);
        if (fileName === 0)
            return null;
        return ImageMagick._api.UTF8ToString(fileName);
    }

    get filterType(): FilterType {
        return <FilterType>ImageMagick._api._MagickImage_FilterType_Get(this._instance);
    }
    set filterType(value: FilterType) {
        ImageMagick._api._MagickImage_FilterType_Set(this._instance, value);
    }

    get format(): MagickFormat {
        return _createString(ImageMagick._api._MagickImage_Format_Get(this._instance), '') as MagickFormat;
    }
    set format(value: MagickFormat) {
        _withString(value.toString(), instance => ImageMagick._api._MagickImage_Format_Set(this._instance, instance));
    }

    get gamma(): number { return ImageMagick._api._MagickImage_Gamma_Get(this._instance); }

    get gifDisposeMethod(): GifDisposeMethod {
        return <GifDisposeMethod>ImageMagick._api._MagickImage_GifDisposeMethod_Get(this._instance);
    }
    set gifDisposeMethod(value: GifDisposeMethod) {
        ImageMagick._api._MagickImage_GifDisposeMethod_Set(this._instance, value);
    }

    get hasAlpha(): boolean {
        return this.toBool(ImageMagick._api._MagickImage_HasAlpha_Get(this._instance));
    }
    set hasAlpha(value: boolean) {
        this.useExceptionPointer(exception => {
            if (value)
                this.alpha(AlphaAction.Opaque);

            ImageMagick._api._MagickImage_HasAlpha_Set(this._instance, this.fromBool(value), exception);
        });
    }

    get height(): number {
        return ImageMagick._api._MagickImage_Height_Get(this._instance);
    }

    get interlace(): Interlace {
        return <Interlace>ImageMagick._api._MagickImage_Interlace_Get(this._instance);
    }

    get isOpaque(): boolean {
        return this.useExceptionPointer(exception => {
            return this.toBool(ImageMagick._api._MagickImage_IsOpaque_Get(this._instance, exception));
        });
    }

    get interpolate(): PixelInterpolateMethod {
        return <PixelInterpolateMethod>ImageMagick._api._MagickImage_Interpolate_Get(this._instance);
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

    get matteColor(): IMagickColor {
        const colorPtr = ImageMagick._api._MagickImage_MatteColor_Get(this._instance);
        return MagickColor._create(colorPtr);
    }
    set matteColor(value: IMagickColor) {
        value._use(valuePtr => {
            ImageMagick._api._MagickImage_MatteColor_Set(this._instance, valuePtr);
        });
    }

    get metaChannelCount(): number {
        return ImageMagick._api._MagickImage_MetaChannelCount_Get(this._instance);
    }
    set metaChannelCount(value: number) {
        this.useExceptionPointer(exception => {
            ImageMagick._api._MagickImage_MetaChannelCount_Set(this._instance, value, exception);
        });
    }

    get orientation(): Orientation {
        return <Orientation>ImageMagick._api._MagickImage_Orientation_Get(this._instance);
    }
    set orientation(value: Orientation) {
        ImageMagick._api._MagickImage_Orientation_Set(this._instance, value);
    }

    get onProgress(): ((event: ProgressEvent) => number) | undefined {
        return this._progress;
    }
    set onProgress(value: ((event: ProgressEvent) => number) | undefined) {
        if (value !== undefined)
            DelegateRegistry.setProgressDelegate(this);
        else
            this.disposeProgressDelegate();

        this._progress = value;
    }

    get onWarning(): ((event: WarningEvent) => number) | undefined {
        return this._warning;
    }
    set onWarning(value: ((event: WarningEvent) => number) | undefined) {
        this._warning = value;
    }

    get page(): IMagickGeometry {
        const rectangle = ImageMagick._api._MagickImage_Page_Get(this._instance);
        return MagickGeometry._fromRectangle(rectangle);
    }
    set page(value: IMagickGeometry) {
        value._toRectangle(rectangle => {
            ImageMagick._api._MagickImage_Page_Set(this._instance, rectangle);
        });
    }

    get profileNames(): ReadonlyArray<string> {
        const profileNames: string[] = [];
        ImageMagick._api._MagickImage_ResetProfileIterator(this._instance);
        let name = ImageMagick._api._MagickImage_GetNextProfileName(this._instance);
        while (name !== 0) {
            profileNames.push(ImageMagick._api.UTF8ToString(name));
            name = ImageMagick._api._MagickImage_GetNextProfileName(this._instance);
        }

        return profileNames;
    }

    get quality(): number {
        return ImageMagick._api._MagickImage_Quality_Get(this._instance);
    }
    set quality(value: number) {
        let quality = value < 1 ? 1 : value;
        quality = quality > 100 ? 100 : quality;

        ImageMagick._api._MagickImage_Quality_Set(this._instance, quality);
        this._settings._quality = quality;
    }

    get renderingIntent(): RenderingIntent {
        return <RenderingIntent>ImageMagick._api._MagickImage_RenderingIntent_Get(this._instance);
    }
    set renderingIntent(value: RenderingIntent) {
        ImageMagick._api._MagickImage_RenderingIntent_Set(this._instance, value);
    }

    get settings(): MagickSettings {
        return this._settings;
    }

    get signature(): string | null {
        return this.useExceptionPointer(exception => {
            return _createString(ImageMagick._api._MagickImage_Signature_Get(this._instance, exception));
        });
    }

    get totalColors(): number {
        return this.useExceptionPointer(exception => {
            return ImageMagick._api._MagickImage_TotalColors_Get(this._instance, exception);
        });
    }

    get virtualPixelMethod(): VirtualPixelMethod {
        return <VirtualPixelMethod>ImageMagick._api._MagickImage_VirtualPixelMethod_Get(this._instance);
    }
    set virtualPixelMethod(value: VirtualPixelMethod) {
        this.useExceptionPointer(exception => {
            ImageMagick._api._MagickImage_VirtualPixelMethod_Set(this._instance, value, exception);
        });
    }

    get width(): number {
        return ImageMagick._api._MagickImage_Width_Get(this._instance);
    }

    adaptiveBlur(): void;
    adaptiveBlur(radius: number): void;
    adaptiveBlur(radius: number, sigma: number): void;
    adaptiveBlur(radiusOrUndefined?: number, sigmaOrUndefined?: number): void {
        const radius = this.valueOrDefault(radiusOrUndefined, 0);
        const sigma = this.valueOrDefault(sigmaOrUndefined, 1);
        this.useException(exception => {
            const instance = ImageMagick._api._MagickImage_AdaptiveBlur(this._instance, radius, sigma, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    adaptiveResize(geometry: IMagickGeometry): void;
    adaptiveResize(width: number, height: number): void;
    adaptiveResize(geometryOrWidth: number | IMagickGeometry, height?: number): void {
        const geometry = typeof geometryOrWidth === 'number' ? new MagickGeometry(0, 0, geometryOrWidth, height!) : geometryOrWidth;
        this.useException(exception => {
            _withString(geometry.toString(), geometryPtr => {
                const instance = ImageMagick._api._MagickImage_AdaptiveResize(this._instance, geometryPtr, exception.ptr);
                this._setInstance(instance, exception);
            });
        });
    }

    adaptiveSharpen(): void;
    adaptiveSharpen(channels: Channels): void;
    adaptiveSharpen(radius: number, sigma: number): void;
    adaptiveSharpen(radius: number, sigma: number, channels: Channels): void
    adaptiveSharpen(channelsOrRadiusOrUndefined?: Channels | number, sigmaOrUndefined?: number, channelsOrUndefined?: Channels): void {
        let radius = 0;
        const sigma = sigmaOrUndefined ?? 1;
        let channels = channelsOrUndefined ?? Channels.Undefined;
        if (channelsOrRadiusOrUndefined !== undefined) {
            if (sigmaOrUndefined === undefined)
                channels = channelsOrRadiusOrUndefined as Channels;
            else
                radius = channelsOrRadiusOrUndefined as number;
        }

        this.useException(exception => {
            const instance = ImageMagick._api._MagickImage_AdaptiveSharpen(this._instance, radius, sigma, channels, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    adaptiveThreshold(width: number, height: number): void;
    adaptiveThreshold(width: number, height: number, channels: Channels): void;
    adaptiveThreshold(width: number, height: number, bias: Percentage,): void;
    adaptiveThreshold(width: number, height: number, bias: Percentage, channels: Channels): void;
    adaptiveThreshold(width: number, height: number, biasChannelsOrUndefined?: Percentage | Channels, channelsOrUndefined?: Channels): void {
        const bias = biasChannelsOrUndefined instanceof Percentage ? biasChannelsOrUndefined._toQuantum() : 0.0;
        let channels = channelsOrUndefined ?? Channels.Undefined;
        if (typeof biasChannelsOrUndefined === 'number')
            channels = biasChannelsOrUndefined;

        this.useException(exception => {
            const instance = ImageMagick._api._MagickImage_AdaptiveThreshold(this._instance, width, height, bias, channels, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    addNoise(noiseType: NoiseType): void;
    addNoise(noiseType: NoiseType, channels: Channels): void;
    addNoise(noiseType: NoiseType, attenuate: number): void;
    addNoise(noiseType: NoiseType, attenuate: number, channels: Channels): void;
    addNoise(noiseType: NoiseType, attenuateOrChannelsOrUndefined?: number | Channels, channelsOrUndefined?: Channels): void {
        let attenuate = 1;
        let channels = channelsOrUndefined ?? Channels.Undefined;

        if (attenuateOrChannelsOrUndefined !== undefined) {
            if (channelsOrUndefined === undefined)
                channels = attenuateOrChannelsOrUndefined as Channels;
            else
                attenuate = attenuateOrChannelsOrUndefined as number;
        }

        this.useException(exception => {
            const instance = ImageMagick._api._MagickImage_AddNoise(this._instance, noiseType, attenuate, channels, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    alpha(value: AlphaAction): void {
        this.useExceptionPointer(exception => {
            ImageMagick._api._MagickImage_SetAlpha(this._instance, value, exception);
        });
    }

    annotate(text: string, boundingArea: MagickGeometry): void;
    annotate(text: string, boundingArea: MagickGeometry, gravity: Gravity): void;
    annotate(text: string, boundingArea: MagickGeometry, gravity: Gravity, angle: number): void;
    annotate(text: string, gravity: Gravity): void;
    annotate(text: string, gravity: Gravity, angle: number): void;
    annotate(text: string, boundingAreaOrGravity: MagickGeometry | Gravity, gravityOrAngleOrUndefined?: Gravity | number, angleOrUndefined?: number): void {
        const drawingSettings = DrawingSettings._create(this._settings);
        return this.useExceptionPointer(exception => {
            return drawingSettings._use(settings => {
                _withString(text, textPtr => {
                    let boundingArea: string | null = null;
                    let gravity: Gravity = Gravity.Undefined;
                    let angle = 0.0;
                    if (typeof boundingAreaOrGravity === 'object') {
                        boundingArea = boundingAreaOrGravity.toString();
                        if (gravityOrAngleOrUndefined !== undefined)
                            gravity = <Gravity>gravityOrAngleOrUndefined;
                        if (angleOrUndefined !== undefined)
                            angle = angleOrUndefined;
                    } else {
                        gravity = boundingAreaOrGravity;
                        if (gravityOrAngleOrUndefined !== undefined)
                            angle = <number>gravityOrAngleOrUndefined;
                    }

                    _withString(boundingArea, boundingAreaPtr => {
                        ImageMagick._api._MagickImage_Annotate(this._instance, settings._instance, textPtr, boundingAreaPtr, gravity, angle, exception);
                    });
                });
            });
        });
    }

    autoGamma(): void;
    autoGamma(channelsOrUndefined?: Channels): void {
        this.useExceptionPointer(exception => {
            const channels = this.valueOrDefault(channelsOrUndefined, Channels.Composite);
            ImageMagick._api._MagickImage_AutoGamma(this._instance, channels, exception);
        });
    }

    autoLevel(): void;
    autoLevel(channelsOrUndefined?: Channels): void {
        this.useExceptionPointer(exception => {
            const channels = this.valueOrDefault(channelsOrUndefined, Channels.Undefined);
            ImageMagick._api._MagickImage_AutoLevel(this._instance, channels, exception);
        });
    }

    autoOrient(): void {
        this.useException(exception => {
            const instance = ImageMagick._api._MagickImage_AutoOrient(this._instance, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    autoThreshold(method: AutoThresholdMethod): void {
        this.useException(exception => {
            ImageMagick._api._MagickImage_AutoThreshold(this._instance, method, exception.ptr);
        });
    }

    bilateralBlur(width: number, height: number): void;
    bilateralBlur(width: number, height: number, intensitySigma: number, spatialSigma: number): void;
    bilateralBlur(width: number, height: number, intensitySigmaOrUndefined?: number, spatialSigmaOrUndefined?: number): void {
        const intensitySigma = this.valueOrComputedDefault(intensitySigmaOrUndefined, () => Math.sqrt((width * width) + (height * height)));
        const spatialSigma = this.valueOrDefault(spatialSigmaOrUndefined, intensitySigma * 0.25);
        this.useException(exception => {
            const instance = ImageMagick._api._MagickImage_BilateralBlur(this._instance, width, height, intensitySigma, spatialSigma, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    blackThreshold(threshold: Percentage): void;
    blackThreshold(threshold: Percentage, channels: Channels): void;
    blackThreshold(threshold: Percentage, channelsOrUndefined?: Channels): void {
        const channels = this.valueOrDefault(channelsOrUndefined, Channels.Composite);
        this.useException(exception => {
            _withString(threshold.toString(), thresholdPtr => {
                ImageMagick._api._MagickImage_BlackThreshold(this._instance, thresholdPtr, channels, exception.ptr);
            });
        });
    }

    blueShift(): void
    blueShift(factor: number): void
    blueShift(factorOrUndefined?: number): void {
        const factor = this.valueOrDefault(factorOrUndefined, 1.5);
        this.useException(exception => {
            const instance = ImageMagick._api._MagickImage_BlueShift(this._instance, factor, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    blur(): void;
    blur(channels: Channels): void;
    blur(radius: number, sigma: number): void;
    blur(radius: number, sigma: number, channels: Channels): void;
    blur(radiusOrChannels?: number | Channels, sigmaOrUndefined?: number, channelsOrUndefined?: Channels): void {
        let radius = 0;
        const sigma = this.valueOrDefault(sigmaOrUndefined, 1);
        let channels = this.valueOrDefault(channelsOrUndefined, Channels.Undefined);

        if (radiusOrChannels !== undefined) {
            if (sigmaOrUndefined === undefined)
                channels = radiusOrChannels;
            else
                radius = radiusOrChannels;
        }

        this.useException(exception => {
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

        this.useException(exception => {
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

        this.useException(exception => {
            ImageMagick._api._MagickImage_BrightnessContrast(this._instance, brightness.toDouble(), contrast.toDouble(), channels, exception.ptr);
        });
    }

    cannyEdge(): void;
    cannyEdge(radius: number, sigma: number, lower: Percentage, upper: Percentage): void;
    cannyEdge(radiusOrUndefined?: number, sigmaOrUndefined?: number, lowerOrUndefined?: Percentage, upperOrUndefined?: Percentage): void {
        const radius = this.valueOrDefault(radiusOrUndefined, 0);
        const sigma = this.valueOrDefault(sigmaOrUndefined, 1);
        const lower = this.valueOrDefault(lowerOrUndefined, new Percentage(10)).toDouble() / 100;
        const upper = this.valueOrDefault(upperOrUndefined, new Percentage(30)).toDouble() / 100;

        this.useException(exception => {
            const instance = ImageMagick._api._MagickImage_CannyEdge(this._instance, radius, sigma, lower, upper, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    charcoal(): void;
    charcoal(radius: number, sigma: number): void;
    charcoal(radiusOrUndefined?: number, sigmaOrUndefined?: number): void {
        const radius = radiusOrUndefined === undefined ? 0 : radiusOrUndefined;
        const sigma = sigmaOrUndefined === undefined ? 1 : sigmaOrUndefined;
        this.useException(exception => {
            const instance = ImageMagick._api._MagickImage_Charcoal(this._instance, radius, sigma, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    chop(geometry: MagickGeometry): void {
        this.useException(exception => {
            geometry._toRectangle(rectangle => {
                const instance = ImageMagick._api._MagickImage_Chop(this._instance, rectangle, exception.ptr);
                this._setInstance(instance, exception);
            });
        });
    }

    chopHorizontal(x: number, width: number): void {
        this.chop(new MagickGeometry(x, 0, width, 0));
    }

    chopVertical(y: number, height: number): void {
        this.chop(new MagickGeometry(0, y, 0, height));
    }

    clahe(xTiles: number, yTiles: number, numberBins: number, clipLimit: number): void;
    clahe(xTiles: Percentage, yTiles: Percentage, numberBins: number, clipLimit: number): void;
    clahe(xTiles: number | Percentage, yTiles: number | Percentage, numberBins: number, clipLimit: number): void {
        this.useExceptionPointer(exception => {
            const xTilesValue = xTiles instanceof Percentage ? xTiles.multiply(this.width) : xTiles;
            const yTilesValue = yTiles instanceof Percentage ? yTiles.multiply(this.height) : yTiles;
            ImageMagick._api._MagickImage_Clahe(this._instance, xTilesValue, yTilesValue, numberBins, clipLimit, exception);
        });
    }

    clone<TReturnType>(func: SyncImageCallback<TReturnType>): TReturnType;
    clone<TReturnType>(func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;
    clone<TReturnType>(func: ImageCallback<TReturnType>): TReturnType | Promise<TReturnType> {
        const image = MagickImage._clone(this);
        return image._use(func);
    }

    cloneArea<TReturnType>(geometry: MagickGeometry, func: SyncImageCallback<TReturnType>): TReturnType;
    cloneArea<TReturnType>(geometry: MagickGeometry, func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;
    cloneArea<TReturnType>(geometry: MagickGeometry, func: ImageCallback<TReturnType>): TReturnType | Promise<TReturnType> {
        return Exception.usePointer(exception => {
            return geometry._toRectangle(rectangle => {
                return OffsetInfo._use(0, 0, offset => {
                    const instance = ImageMagick._api._MagickImage_CloneArea(this._instance, geometry.width, geometry.height, exception);
                    ImageMagick._api._MagickImage_CopyPixels(instance, this._instance, rectangle, offset, Channels.Undefined, exception);
                    const image = new MagickImage(instance, this._settings);
                    return func(image);
                });
            });
        });
    }

    colorAlpha(color: IMagickColor): void {
        if (!this.hasAlpha)
            return;

        const canvas = MagickImage.create();
        canvas.read(color, this.width, this.height);
        canvas.composite(this, CompositeOperator.SrcOver, new Point(0, 0));
        this._instance = canvas._instance;
    }

    compare(image: IMagickImage, metric: ErrorMetric): number;
    compare(image: IMagickImage, metric: ErrorMetric, channels: Channels): number;
    compare<TReturnType>(image: IMagickImage, settings: CompareSettings, func: (compareResult: CompareResult) => TReturnType): TReturnType;
    compare<TReturnType>(image: IMagickImage, settings: CompareSettings, func: (compareResult: CompareResult) => Promise<TReturnType>): Promise<TReturnType>;
    compare<TReturnType>(image: IMagickImage, settings: CompareSettings, channels: Channels, func: (compareResult: CompareResult) => TReturnType): TReturnType;
    compare<TReturnType>(image: IMagickImage, settings: CompareSettings, channels: Channels, func: (compareResult: CompareResult) => Promise<TReturnType>): Promise<TReturnType>;
    compare<TReturnType>(image: IMagickImage, metric: ErrorMetric, func: (image: CompareResult) => TReturnType): TReturnType;
    compare<TReturnType>(image: IMagickImage, metric: ErrorMetric, func: (image: CompareResult) => Promise<TReturnType>): Promise<TReturnType>;
    compare<TReturnType>(image: IMagickImage, metric: ErrorMetric, channels: Channels, func: (result: CompareResult) => TReturnType): TReturnType;
    compare<TReturnType>(image: IMagickImage, metric: ErrorMetric, channels: Channels, func: (result: CompareResult) => Promise<TReturnType>): Promise<TReturnType>;
    compare<TReturnType>(image: IMagickImage, metricOrSettings: CompareSettings | ErrorMetric, channelsFuncOrUndefined?: Channels | ((result: CompareResult) => TReturnType | Promise<TReturnType>), funcOrUndefined?: (result: CompareResult) => TReturnType | Promise<TReturnType>): number | TReturnType | Promise<TReturnType> {
        const hasCompareSettings = metricOrSettings instanceof CompareSettings;
        const errorMetric = hasCompareSettings ? metricOrSettings.metric : metricOrSettings;

        let func = channelsFuncOrUndefined;
        if (funcOrUndefined !== undefined)
            func = funcOrUndefined;

        let channels: Channels = Channels.Undefined;
        if (typeof func !== 'function') {
            if (func !== undefined)
                channels = func;

            return this.useExceptionPointer(exception => {
                return ImageMagick._api._MagickImage_CompareDistortion(this._instance, image._instance, errorMetric, channels, exception);
            });
        }

        if (channelsFuncOrUndefined !== undefined && typeof channelsFuncOrUndefined !== 'function')
            channels = channelsFuncOrUndefined;

        const compareResult = TemporaryDefines.use(this, temporaryDefines => {
            if (hasCompareSettings) {
                metricOrSettings._setArtifacts(temporaryDefines);
            }

            return DoublePointer.use((pointer) => {
                const instance = this.useExceptionPointer(exception => {
                    return ImageMagick._api._MagickImage_Compare(this._instance, image._instance, errorMetric, channels, pointer.ptr, exception);
                });

                const distortion = pointer.value;
                const difference = MagickImage._createFromImage(instance, this._settings);
                return CompareResult._create(distortion, difference);
            });
        });

        return compareResult.difference._use(() => {
            return func(compareResult);
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
    composite(image: IMagickImage, composeOrPoint?: CompositeOperator | Point, pointOrArgsOrChannels?: Point | string | Channels, channelsOrArgs?: Channels | string, channelsOrUndefined?: Channels): void {
        let x = 0;
        let y = 0;
        let compose: CompositeOperator = CompositeOperator.In;
        let channels: Channels = Channels.All;
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

        this.useExceptionPointer(exception => {
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
    compositeGravity(image: IMagickImage, gravity: Gravity, composeOrPoint?: CompositeOperator | Point, pointOrArgsOrChannels?: Point | string | Channels, channelsOrArgs?: Channels | string, channelsOrUndefined?: Channels): void {
        let x = 0;
        let y = 0;
        let compose: CompositeOperator = CompositeOperator.In;
        let channels: Channels = Channels.All;
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

        this.useExceptionPointer(exception => {
            ImageMagick._api._MagickImage_CompositeGravity(this._instance, image._instance, gravity, x, y, compose, channels, exception);
        });

        if (args !== null)
            this.removeArtifact('compose:args');
    }

    connectedComponents(connectivity: Connectivity): ConnectedComponent[];
    connectedComponents(settings: ConnectedComponentsSettings): ConnectedComponent[];
    connectedComponents(connectivityOrSettings: Connectivity | ConnectedComponentsSettings): ConnectedComponent[] {
        const settings = typeof connectivityOrSettings === 'number' ? new ConnectedComponentsSettings(connectivityOrSettings) : connectivityOrSettings;

        const connectedComponents = TemporaryDefines.use(this, temporaryDefines => {
            settings._setArtifacts(temporaryDefines);

            return this.useException((exception) => {
                return IntPointer.use((objects) => {
                    try {
                        const instance = ImageMagick._api._MagickImage_ConnectedComponents(this._instance, settings.connectivity, objects.ptr, exception.ptr);
                        this._setInstance(instance, exception)
                        return ConnectedComponent._create(objects.value, this.colormapSize);
                    } finally {
                        if (objects.value !== 0) {
                            ImageMagick._api._ConnectedComponent_DisposeList(objects.value);
                        }
                    }
                });
            });
        });

        return connectedComponents;
    }

    contrast = () => this._contrast(true);

    contrastStretch(blackPoint: Percentage): void;
    contrastStretch(blackPoint: Percentage, channnels: Channels): void;
    contrastStretch(blackPoint: Percentage, whitePoint: Percentage): void;
    contrastStretch(blackPoint: Percentage, whitePoint: Percentage, channnels: Channels): void;
    contrastStretch(blackPoint: Percentage, whitePointOrChannelsOrUndefined?: Percentage | Channels, channelsOrUndefined?: Channels): void {
        const pixels = this.width * this.height;
        const lower = blackPoint.multiply(pixels);
        let upper = 0;
        let channels = this.valueOrDefault(channelsOrUndefined, Channels.Undefined);
        if (whitePointOrChannelsOrUndefined instanceof Percentage) {
            upper = pixels - whitePointOrChannelsOrUndefined.multiply(pixels);
        } else {
            upper = pixels - blackPoint.multiply(pixels);
            if (whitePointOrChannelsOrUndefined !== undefined)
                channels = whitePointOrChannelsOrUndefined;
        }

        this.useExceptionPointer(exception => {
            ImageMagick._api._MagickImage_ContrastStretch(this._instance, lower, upper, channels, exception);
        });
    }

    /**
     * Creates a new {@link IMagickImage} instance.
     */
    static create(): IMagickImage;
    /**
     * Creates a new {@link IMagickImage} instance.
     * @param color The color to fill the image with.
     * @param width The width of the image.
     * @param height The height of the image.
     */
    static create(color: IMagickColor, width: number, height: number): IMagickImage;
    /**
     * Creates a new {@link IMagickImage} instance.
     * @param fileName The fully qualified name of the image file, or the relative image file name.
     * @param settings The settings to use when reading the image.
     */
    static create(fileName: string, settings?: MagickReadSettings): IMagickImage;
    /**
     * Creates a new {@link IMagickImage} instance.
     * @param array The byte array to read the image from.
     * @param settings The settings to use when reading the image.
     */
    static create(array: ByteArray, settings?: MagickReadSettings): IMagickImage;
    static create(fileNameOrArrayOrColorOrUndefined?: string | ByteArray | IMagickColor, settingsOrWidthOrUndefined?: MagickReadSettings | number, heightOrUndefined?: number): IMagickImage {
        const image = new MagickImage(MagickImage.createInstance(), new MagickSettings());
        if (fileNameOrArrayOrColorOrUndefined !== undefined)
            image.readOrPing(false, fileNameOrArrayOrColorOrUndefined, settingsOrWidthOrUndefined, heightOrUndefined);
        return image;
    }

    crop(geometry: IMagickGeometry): void;
    crop(geometry: IMagickGeometry, gravity: Gravity): void;
    crop(width: number, height: number): void;
    crop(width: number, height: number, gravity: Gravity): void;
    crop(geometryOrWidth: IMagickGeometry | number, heightOrGravity?: number | Gravity, gravityOrUndefined?: Gravity): void {
        let geometry: IMagickGeometry;
        let gravity: Gravity;

        if (typeof geometryOrWidth !== 'number') {
            geometry = geometryOrWidth;
            gravity = this.valueOrDefault(<Gravity>heightOrGravity, Gravity.Undefined);
        } else if (heightOrGravity !== undefined) {
            geometry = new MagickGeometry(geometryOrWidth, heightOrGravity);
            gravity = this.valueOrDefault(gravityOrUndefined, Gravity.Undefined);
        }

        this.useException(exception => {
            _withString(geometry.toString(), geometryPtr => {
                const instance = ImageMagick._api._MagickImage_Crop(this._instance, geometryPtr, gravity, exception.ptr);
                this._setInstance(instance, exception);
            });
        });
    }

    cropToTiles<TReturnType>(geometry: IMagickGeometry, func: SyncImageCollectionCallback<TReturnType>): TReturnType;
    cropToTiles<TReturnType>(geometry: IMagickGeometry, func: AsyncImageCollectionCallback<TReturnType>): Promise<TReturnType>;
    cropToTiles<TReturnType>(width: number, height: number, func: SyncImageCollectionCallback<TReturnType>): TReturnType;
    cropToTiles<TReturnType>(width: number, height: number, func: AsyncImageCollectionCallback<TReturnType>): Promise<TReturnType>;
    cropToTiles<TReturnType>(widthOrGeometry: number | IMagickGeometry, funcOrHeight: ImageCollectionCallback<TReturnType> | number, funcOrUndefined?: ImageCollectionCallback<TReturnType>): TReturnType | Promise<TReturnType> {
        let geometry: IMagickGeometry;
        let func: ImageCollectionCallback<TReturnType>;
        if (typeof widthOrGeometry === 'number' && typeof funcOrHeight === 'number' && funcOrUndefined !== undefined) {
            geometry = new MagickGeometry(0, 0, widthOrGeometry, funcOrHeight);
            func = funcOrUndefined;
        } else if (typeof widthOrGeometry !== 'number' && typeof funcOrHeight !== 'number') {
            geometry = widthOrGeometry;
            func = funcOrHeight;
        }

        return this.useException(exception => {
            return _withString(geometry.toString(), geometryPtr => {
                const images = ImageMagick._api._MagickImage_CropToTiles(this._instance, geometryPtr, exception.ptr);
                const collection = MagickImageCollection._createFromImages(images, this._settings);
                return collection._use(func);
            });
        });
    }

    cycleColormap(amount: number): void {
        this.useExceptionPointer(exception => {
            ImageMagick._api._MagickImage_CycleColormap(this._instance, amount, exception);
        });
    }

    deskew(threshold: Percentage): number
    deskew(threshold: Percentage, autoCrop: boolean): number;
    deskew(threshold: Percentage, autoCrop?: boolean): number {
        return TemporaryDefines.use(this, temporaryDefines => {
            if (autoCrop !== undefined)
                temporaryDefines.setArtifact('deskew:auto-crop', autoCrop);

            this.useException(exception => {
                const instance = ImageMagick._api._MagickImage_Deskew(this._instance, threshold._toQuantum(), exception.ptr);
                this._setInstance(instance, exception);
            });

            const angle = Number(this.getArtifact('deskew:angle'));
            return isNaN(angle) ? 0.0 : angle;
        })
    }

    distort(method: DistortMethod, params: number[]): void;
    distort(settings: DistortSettings, params: number[]): void;
    distort(methodOrSettings: DistortMethod | DistortSettings, params: number[]): void {
        TemporaryDefines.use(this, temporaryDefines => {
            let method: DistortMethod;
            let bestFit = 0;
            if (typeof methodOrSettings === 'number') {
                method = methodOrSettings;
            } else {
                method = methodOrSettings.method;
                bestFit = methodOrSettings.bestFit ? 1 : 0;
                methodOrSettings._setArtifacts(temporaryDefines);
            }

            this.useException(exception => {
                _withDoubleArray(params, (paramsPtr: number) => {
                    const instance = ImageMagick._api._MagickImage_Distort(this._instance, method, bestFit, paramsPtr, params.length, exception.ptr);
                    this._setInstance(instance, exception)
                });
            });
        });
    }

    draw(drawables: IDrawable[]): void;
    draw(...drawables: IDrawable[]): void;
    draw(...drawables: IDrawable[][] | IDrawable[]): void {
        const items = drawables.flat();
        if (items.length === 0)
            return;

        DrawingWand._use(this, (wand) => {
            wand.draw(items);
        });
    }

    evaluate(channels: Channels, operator: EvaluateOperator, value: number): void;
    evaluate(channels: Channels, operator: EvaluateOperator, value: Percentage): void;
    evaluate(channels: Channels, geometry: IMagickGeometry, operator: EvaluateOperator, value: number): void;
    evaluate(channels: Channels, geometry: IMagickGeometry, operator: EvaluateOperator, value: Percentage): void;
    evaluate(channels: Channels, operatorOrGeometry: EvaluateOperator | IMagickGeometry, valueOrPercentageOrOperator: number | Percentage | EvaluateOperator, valueOrPercentage?: number | Percentage): void {
        if (typeof operatorOrGeometry === 'number') {
            const operator = operatorOrGeometry;
            const value = typeof valueOrPercentageOrOperator === 'number' ? valueOrPercentageOrOperator : valueOrPercentageOrOperator._toQuantum();
            this.useExceptionPointer(exception => {
                ImageMagick._api._MagickImage_EvaluateOperator(this._instance, channels, operator, value, exception);
            });
        } else if (valueOrPercentage !== undefined) {
            if (typeof valueOrPercentageOrOperator !== 'number')
                throw new MagickError('this should not happen');

            const geometry = operatorOrGeometry;
            const operator = valueOrPercentageOrOperator;
            const value = typeof valueOrPercentage === 'number' ? valueOrPercentage : valueOrPercentage._toQuantum();

            if (geometry.isPercentage)
                throw new MagickError('percentage is not supported');

            this.useExceptionPointer(exception => {
                MagickRectangle.use(this, geometry, rectangle => {
                    ImageMagick._api._MagickImage_EvaluateGeometry(this._instance, channels, rectangle, operator, value, exception);
                })
            });
        }

    }

    extent(width: number, height: number): void;
    extent(width: number, height: number, gravity: Gravity): void;
    extent(width: number, height: number, backgroundColor: IMagickColor): void;
    extent(geometry: IMagickGeometry): void;
    extent(geometry: IMagickGeometry, gravity: Gravity): void;
    extent(geometry: IMagickGeometry, gravity: Gravity, backgroundColor: IMagickColor): void;
    extent(geometry: IMagickGeometry, backgroundColor: IMagickColor): void;
    extent(geometryOrWidth: IMagickGeometry | number, widthOrGravityOrBackgroundColor?: Gravity | IMagickColor | number, backgroundColorOrGravity?: IMagickColor | Gravity): void {
        let gravity: Gravity = Gravity.Undefined;
        let geometry: IMagickGeometry;

        if (typeof geometryOrWidth !== 'number')
            geometry = geometryOrWidth;
        else if (typeof widthOrGravityOrBackgroundColor === 'number')
            geometry = new MagickGeometry(geometryOrWidth, widthOrGravityOrBackgroundColor);

        if (typeof widthOrGravityOrBackgroundColor === 'number')
            gravity = <Gravity>widthOrGravityOrBackgroundColor;
        else if (widthOrGravityOrBackgroundColor !== undefined)
            this.backgroundColor = widthOrGravityOrBackgroundColor;

        if (typeof backgroundColorOrGravity === 'number')
            gravity = backgroundColorOrGravity;
        else if (backgroundColorOrGravity !== undefined)
            this.backgroundColor = backgroundColorOrGravity;

        this.useException(exception => {
            _withString(geometry.toString(), geometryPtr => {
                const instance = ImageMagick._api._MagickImage_Extent(this._instance, geometryPtr, gravity, exception.ptr);
                this._setInstance(instance, exception);
            });
        });
    }

    flip(): void {
        this.useException(exception => {
            const instance = ImageMagick._api._MagickImage_Flip(this._instance, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    flop(): void {
        this.useException(exception => {
            const instance = ImageMagick._api._MagickImage_Flop(this._instance, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    /**
     * Formats the specified expression (more info can be found here: https://imagemagick.org/script/escape.php).
     * @param expression The expression.
     */
    formatExpression(expression: string): string | null {
        return this.useExceptionPointer(exception => {
            return this._settings._use(settings => {
                return _withString(expression, expressionPtr => {
                    const instance = ImageMagick._api._MagickImage_FormatExpression(this._instance, settings._instance, expressionPtr, exception);
                    return _createStringAndRelinquish(ImageMagick._api, instance);
                });
            });
        });
    }

    gammaCorrect(gamma: number): void;
    gammaCorrect(gamma: number, channels: Channels): void;
    gammaCorrect(gamma: number, channelsOrUndefined?: Channels): void {
        const channels = this.valueOrDefault(channelsOrUndefined, Channels.Undefined);

        this.useExceptionPointer((exception) => {
            ImageMagick._api._MagickImage_GammaCorrect(this._instance, gamma, channels, exception);
        });
    }

    gaussianBlur(radius: number): void;
    gaussianBlur(radius: number, sigma: number): void;
    gaussianBlur(radius: number, sigma: number, channels: Channels): void;
    gaussianBlur(radius: number, sigmaOrUndefined?: number, channelsOrUndefined?: Channels): void {
        const sigma = this.valueOrDefault(sigmaOrUndefined, 1.0);
        const channels = this.valueOrDefault(channelsOrUndefined, Channels.Undefined);

        this.useException(exception => {
            const instance = ImageMagick._api._MagickImage_GaussianBlur(this._instance, radius, sigma, channels, exception.ptr);
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
        return this.useException(exception => {
            return _withString(name, namePtr => {
                const value = ImageMagick._api._MagickImage_GetAttribute(this._instance, namePtr, exception.ptr);
                return _createString(value);
            });
        });
    }

    getColormapColor(index: number): IMagickColor | null {
        const colorPtr = ImageMagick._api._MagickImage_GetColormapColor(this._instance, index);
        if (colorPtr === 0)
            return null;

        return MagickColor._create(colorPtr);
    }

    getColorProfile(): IColorProfile | null {
        const names = ['icc', 'icm'];

        for (const name of names) {
            const data = this._getProfile(name);
            if (data !== null) {
                return new ColorProfile(data);
            }
        }

        return null;
    }

    getPixels<TReturnType>(func: (pixels: IPixelCollection) => TReturnType): TReturnType;
    getPixels<TReturnType>(func: (pixels: IPixelCollection) => Promise<TReturnType>): Promise<TReturnType>;
    getPixels<TReturnType>(func: (pixels: IPixelCollection) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        if (this._settings._ping)
            throw new MagickError('image contains no pixel data');

        return PixelCollection._use(this, func);
    }

    getProfile(name: string): IImageProfile | null {
        const data = this._getProfile(name);
        if (data === null)
            return null;

        return new ImageProfile(name, data);
    }

    getWriteMask<TReturnType>(func: (mask: IMagickImage | null) => TReturnType): TReturnType;
    getWriteMask<TReturnType>(func: (mask: IMagickImage | null) => Promise<TReturnType>): Promise<TReturnType>;
    getWriteMask<TReturnType>(func: (mask: IMagickImage | null) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        const instance = this.useExceptionPointer(exception => {
            return ImageMagick._api._MagickImage_GetWriteMask(this._instance, exception);
        });
        const image = instance === 0 ? null : new MagickImage(instance, new MagickSettings());
        if (image == null)
            return func(image);
        else
            return image._use(func);
    }

    grayscale(method: PixelIntensityMethod = PixelIntensityMethod.Undefined): void {
        this.useExceptionPointer(exception => {
            ImageMagick._api._MagickImage_Grayscale(this._instance, method, exception);
        });
    }

    hasProfile(name: string): boolean {
        return _withString(name, namePtr => {
            return this.toBool(ImageMagick._api._MagickImage_HasProfile(this._instance, namePtr));
        });
    }

    histogram(): Map<string, number> {
        const result = new Map<string, number>();

        this.useExceptionPointer(exception => {
            IntPointer.use(lengthPointer => {
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

    inverseLevel(blackPoint: Percentage, whitePoint: Percentage): void;
    inverseLevel(blackPoint: Percentage, whitePoint: Percentage, gamma: number): void;
    inverseLevel(blackPoint: Percentage, whitePoint: Percentage, gamma: number, channels: Channels): void;
    inverseLevel(blackPoint: Percentage, whitePoint: Percentage, gammaOrUndefined?: number, channelsOrUndefined?: Channels): void {
        const gamma = this.valueOrDefault(gammaOrUndefined, 1.0);
        const channels = this.valueOrDefault(channelsOrUndefined, Channels.Composite);
        this.useExceptionPointer(exception => {
            ImageMagick._api._MagickImage_InverseLevel(this._instance, blackPoint.toDouble(), whitePoint._toQuantum(), gamma, channels, exception);
        });
    }

    inverseOpaque = (target: IMagickColor, fill: IMagickColor) => this._opaque(target, fill, true);

    inverseSigmoidalContrast(contrast: number): void;
    inverseSigmoidalContrast(contrast: number, midpoint: Percentage): void;
    inverseSigmoidalContrast(contrast: number, midpoint: number): void;
    inverseSigmoidalContrast(contrast: number, midpoint: number, channels: Channels): void;
    inverseSigmoidalContrast(contrast: number, midpointOrPercentage?: number | Percentage, channelsOrUndefined?: Channels): void {
        this._sigmoidalContrast(false, contrast, midpointOrPercentage, channelsOrUndefined)
    }

    inverseTransparent = (color: IMagickColor) => this._transparent(color, true);

    level(blackPoint: Percentage, whitePoint: Percentage): void;
    level(blackPoint: Percentage, whitePoint: Percentage, gamma: number): void;
    level(blackPoint: Percentage, whitePoint: Percentage, gamma: number, channels: Channels): void;
    level(blackPoint: Percentage, whitePoint: Percentage, gammaOrUndefined?: number, channelsOrUndefined?: Channels): void {
        const gamma = this.valueOrDefault(gammaOrUndefined, 1.0);
        const channels = this.valueOrDefault(channelsOrUndefined, Channels.Composite);
        this.useExceptionPointer(exception => {
            ImageMagick._api._MagickImage_Level(this._instance, blackPoint.toDouble(), whitePoint._toQuantum(), gamma, channels, exception);
        });
    }

    linearStretch(blackPoint: Percentage, whitePoint: Percentage): void {
        this.useExceptionPointer(exception => {
            ImageMagick._api._MagickImage_LinearStretch(this._instance, blackPoint.toDouble(), whitePoint._toQuantum(), exception);
        });
    }

    liquidRescale(geometry: IMagickGeometry): void;
    liquidRescale(width: number, height: number): void;
    liquidRescale(widthOrGeometry: number | IMagickGeometry, height?: number): void {
        const geometry = typeof widthOrGeometry === 'number' ? new MagickGeometry(widthOrGeometry, height as number) : widthOrGeometry;
        this.useException(exception => {
            _withString(geometry.toString(), geometryPtr => {
                const instance = ImageMagick._api._MagickImage_LiquidRescale(this._instance, geometryPtr, geometry.x, geometry.y, exception.ptr);
                this._setInstance(instance, exception);
            });
        });
    }

    negate(): void;
    negate(channelsOrUndefined?: Channels): void {
        this.useExceptionPointer(exception => {
            const channels = this.valueOrDefault(channelsOrUndefined, Channels.Undefined);
            ImageMagick._api._MagickImage_Negate(this._instance, 0, channels, exception);
        });
    }

    negateGrayScale(): void;
    negateGrayScale(channelsOrUndefined?: Channels): void {
        this.useExceptionPointer(exception => {
            const channels = this.valueOrDefault(channelsOrUndefined, Channels.Undefined);
            ImageMagick._api._MagickImage_Negate(this._instance, 1, channels, exception);
        });
    }

    normalize(): void {
        this.useExceptionPointer(exception => {
            ImageMagick._api._MagickImage_Normalize(this._instance, exception);
        });
    }

    modulate(brightness: Percentage): void;
    modulate(brightness: Percentage, saturation: Percentage): void;
    modulate(brightness: Percentage, saturation: Percentage, hue: Percentage): void;
    modulate(brightness: Percentage, saturationOrUndefined?: Percentage, hueOrUndefined?: Percentage): void {
        const saturation = this.valueOrDefault(saturationOrUndefined, new Percentage(100));
        const hue = this.valueOrDefault(hueOrUndefined, new Percentage(100));
        this.useExceptionPointer(exception => {
            const modulate = `${brightness.toDouble()}/${saturation.toDouble()}/${hue.toDouble()}`;
            _withString(modulate, modulatePtr => {
                ImageMagick._api._MagickImage_Modulate(this._instance, modulatePtr, exception);
            });
        });
    }

    morphology(settings: MorphologySettings): void {
        this.useException(exception => {
            _withString(settings.kernel, kernelPtr => {
                const instance = ImageMagick._api._MagickImage_Morphology(this._instance, settings.method, kernelPtr, settings.channels, settings.iterations, exception.ptr);
                this._setInstance(instance, exception);
            });
        });
    }

    motionBlur(radius: number, sigma: number, angle: number): void {
        this.useException(exception => {
            const instance = ImageMagick._api._MagickImage_MotionBlur(this._instance, radius, sigma, angle, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    oilPaint(): void;
    oilPaint(radius: number): void
    oilPaint(radiusOrUndefined?: number): void {
        const radius = this.valueOrDefault(radiusOrUndefined, 3);
        const sigma = 0.0; // Not used due to precision issue in GetOptimalKernelWidth2D.
        this.useException(exception => {
            const instance = ImageMagick._api._MagickImage_OilPaint(this._instance, radius, sigma, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    opaque = (target: IMagickColor, fill: IMagickColor) => this._opaque(target, fill, false);

    ping(fileName: string, settings?: MagickReadSettings): void;
    ping(array: ByteArray, settings?: MagickReadSettings): void;
    ping(fileNameOrArray: string | ByteArray, settingsOrUndefined?: MagickReadSettings): void {
        this.readOrPing(true, fileNameOrArray, settingsOrUndefined);
    }

    perceptualHash(): IPerceptualHash;
    perceptualHash(colorSpaces: ReadonlyArray<ColorSpace>): IPerceptualHash;
    perceptualHash(colorSpacesOrUndefined?: ReadonlyArray<ColorSpace>): IPerceptualHash {
        const colorSpaces = this.valueOrDefault(colorSpacesOrUndefined, PerceptualHash._defaultColorspaces());
        PerceptualHash._validateColorSpaces(colorSpaces);

        return TemporaryDefines.use(this, temporaryDefines => {
            const colorSpaceName = colorSpaces.map(colorSpace => ColorSpaceNames[colorSpace]).join(',');
            temporaryDefines.setArtifact('phash:colorspaces', colorSpaceName);

            return this.useExceptionPointer(exception => {
                const listInstance = ImageMagick._api._MagickImage_PerceptualHash(this._instance, exception);
                return PerceptualHash._create(this, colorSpaces, listInstance);
            });
        });
    }

    quantize(settingsOrUndefined?: QuantizeSettings): MagickErrorInfo | null {
        const settings = this.valueOrDefault(settingsOrUndefined, new QuantizeSettings());
        this.useException(exception => {
            settings._use((settings) => {
                ImageMagick._api._MagickImage_Quantize(this._instance, settings._instance, exception.ptr);
            });
        });

        if (settings.measureErrors)
            return MagickErrorInfo._create(this);

        return null;
    }

    read(color: IMagickColor, width: number, height: number): void;
    read(fileName: string, settings?: MagickReadSettings): void;
    read(array: ByteArray, settings?: MagickReadSettings): void;
    read(fileNameOrArrayOrColor: string | ByteArray | IMagickColor, settingsOrWidthOrUndefined?: MagickReadSettings | number, heightOrUndefined?: number): void {
        this.readOrPing(false, fileNameOrArrayOrColor, settingsOrWidthOrUndefined, heightOrUndefined);
    }

    readFromCanvas(canvas: HTMLCanvasElement, settings?: CanvasRenderingContext2DSettings): void {
        const ctx = canvas.getContext('2d', settings);
        if (ctx === null)
            return;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const readSettings = new MagickReadSettings();
        readSettings.format = MagickFormat.Rgba;
        readSettings.width = canvas.width;
        readSettings.height = canvas.height;

        this.useException(exception => {
            this.readFromArray(imageData.data, readSettings, exception);
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

    removeProfile(profile: IImageProfile): void;
    removeProfile(name: string): void;
    removeProfile(nameOrProfile: string | IImageProfile): void {
        const name = typeof nameOrProfile === 'string' ? nameOrProfile : nameOrProfile.name;
        _withString(name, namePtr => {
            ImageMagick._api._MagickImage_RemoveProfile(this._instance, namePtr);
        });
    }

    removeWriteMask(): void {
        this.useExceptionPointer(exception => {
            ImageMagick._api._MagickImage_SetWriteMask(this._instance, 0, exception);
        });
    }

    resetPage(): void {
        this.page = new MagickGeometry(0, 0, 0, 0);
    }

    resize(geometry: IMagickGeometry): void;
    resize(geometry: IMagickGeometry, filterType: FilterType): void;
    resize(width: number, height: number): void;
    resize(width: number, height: number, filterType: FilterType): void;
    resize(widthOrGeometry: number | IMagickGeometry, heightOrFilterTypeOrUndefined?: number | FilterType, filterTypeOrUndefined?: FilterType): void {
        let filterType = this.filterType;
        let geometry: IMagickGeometry;
        if (typeof widthOrGeometry === 'number') {
            geometry = new MagickGeometry(widthOrGeometry, heightOrFilterTypeOrUndefined as number);
            if (filterTypeOrUndefined !== undefined)
                filterType = filterTypeOrUndefined;
        } else {
            geometry = widthOrGeometry;
            if (heightOrFilterTypeOrUndefined !== undefined)
                filterType = heightOrFilterTypeOrUndefined as FilterType;
        }

        this.useException(exception => {
            _withString(geometry.toString(), geometryPtr => {
                const instance = ImageMagick._api._MagickImage_Resize(this._instance, geometryPtr, filterType, exception.ptr);
                this._setInstance(instance, exception);
            });
        });
    }

    rotate(degrees: number): void {
        this.useException(exception => {
            const instance = ImageMagick._api._MagickImage_Rotate(this._instance, degrees, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    separate<TReturnType>(func: (images: IMagickImageCollection) => TReturnType): TReturnType;
    separate<TReturnType>(func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
    separate<TReturnType>(channels: Channels, func: (images: IMagickImageCollection) => TReturnType): TReturnType;
    separate<TReturnType>(channels: Channels, func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
    separate<TReturnType>(funcOrChannels: ImageCollectionCallback<TReturnType> | Channels, funcOrUndefined?: ImageCollectionCallback<TReturnType>): TReturnType | Promise<TReturnType> {
        return this.useException(exception => {
            let func: ImageCollectionCallback<TReturnType>;
            let channels: Channels = Channels.Undefined;
            if (typeof funcOrChannels === 'number' && funcOrUndefined !== undefined) {
                channels = funcOrChannels;
                func = funcOrUndefined;
            } else if (typeof funcOrChannels === 'function') {
                func = funcOrChannels;
            } else {
                throw new MagickError('invalid arguments');
            }

            const images = ImageMagick._api._MagickImage_Separate(this._instance, channels, exception.ptr);
            const collection = MagickImageCollection._createFromImages(images, this._settings);
            return collection._use(func);
        });
    }

    sepiaTone(): void
    sepiaTone(numberOrPercentage: Percentage | number = new Percentage(80)): void {
        this.useException(exception => {
            const threshold = typeof numberOrPercentage === 'number' ? new Percentage(numberOrPercentage) : numberOrPercentage;
            const instance = ImageMagick._api._MagickImage_SepiaTone(this._instance, threshold._toQuantum(), exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    setArtifact(name: string, value: boolean | IMagickColor | number | string): void {
        let strValue: string;
        if (typeof value === 'string')
            strValue = value;
        else if (typeof value === 'boolean')
            strValue = this.fromBool(value).toString();
        else
            strValue = value.toString();

        _withString(name, namePtr => {
            _withString(strValue, valuePtr => {
                ImageMagick._api._MagickImage_SetArtifact(this._instance, namePtr, valuePtr);
            });
        });
    }

    setAttribute(name: string, value: string): void {
        this.useException(exception => {
            _withString(name, namePtr => {
                _withString(value, valuePtr => {
                    ImageMagick._api._MagickImage_SetAttribute(this._instance, namePtr, valuePtr, exception.ptr);
                });
            });
        });
    }

    setProfile(profile: IImageProfile): void
    setProfile(pname: string, data: ByteArray): void
    setProfile(nameOrProfile: string | IImageProfile, dataOrUndefined?: ByteArray): void {
        const name = typeof nameOrProfile === 'string' ? nameOrProfile : nameOrProfile.name;
        let data: ByteArray;
        if (dataOrUndefined !== undefined)
            data = dataOrUndefined;
        else if (typeof nameOrProfile !== 'string')
            data = nameOrProfile.data;

        this.useException(exception => {
            _withString(name, namePtr => {
                _withByteArray(data, dataPtr => {
                    ImageMagick._api._MagickImage_SetProfile(this._instance, namePtr, dataPtr, data.byteLength, exception.ptr);
                });
            });
        });
    }

    setWriteMask(image: IMagickImage): void {
        this.useExceptionPointer(exception => {
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

        this.useException(exception => {
            const instance = ImageMagick._api._MagickImage_Sharpen(this._instance, radius, sigma, channels, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    shave(leftRight: number, topBottom: number) {
        this.useException(exception => {
            const instance = ImageMagick._api._MagickImage_Shave(this._instance, leftRight, topBottom, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    sigmoidalContrast(contrast: number): void;
    sigmoidalContrast(contrast: number, midpoint: Percentage): void;
    sigmoidalContrast(contrast: number, midpoint: number): void;
    sigmoidalContrast(contrast: number, midpoint: number, channels: Channels): void;
    sigmoidalContrast(contrast: number, midpointOrPercentage?: number | Percentage, channelsOrUndefined?: Channels): void {
        this._sigmoidalContrast(true, contrast, midpointOrPercentage, channelsOrUndefined)
    }

    solarize(): void
    solarize(numberOrPercentage: Percentage | number = new Percentage(50)): void {
        this.useException(exception => {
            const factor = typeof numberOrPercentage === 'number' ? new Percentage(numberOrPercentage) : numberOrPercentage;
            ImageMagick._api._MagickImage_Solarize(this._instance, factor._toQuantum(), exception.ptr);
        });
    }

    splice(geometry: IMagickGeometry): void {
        MagickRectangle.use(this, geometry, geometryPtr => {
            this.useException(exception => {
                const instance = ImageMagick._api._MagickImage_Splice(this._instance, geometryPtr, exception.ptr);
                this._setInstance(instance, exception);
            });
        });
    }

    statistics(): IStatistics;
    statistics(channels: Channels): IStatistics;
    statistics(channelsOrUndefined?: Channels): IStatistics {
        const channels = this.valueOrDefault(channelsOrUndefined, Channels.All);
        return this.useExceptionPointer(exception => {
            const list = ImageMagick._api._MagickImage_Statistics(this._instance, channels, exception);
            const statistics = Statistics._create(this, list, channels);
            ImageMagick._api._Statistics_DisposeList(list);
            return statistics;
        });
    }

    strip(): void {
        this.useExceptionPointer(exception => {
            ImageMagick._api._MagickImage_Strip(this._instance, exception);
        });
    }

    transformColorSpace(target: IColorProfile): boolean;
    transformColorSpace(target: IColorProfile, mode: ColorTransformMode): boolean;
    transformColorSpace(source: IColorProfile, target: IColorProfile): boolean;
    transformColorSpace(source: IColorProfile, target: IColorProfile, mode: ColorTransformMode): boolean;
    transformColorSpace(sourceOrTarget: IColorProfile, targetModeOrUndefined?: IColorProfile | ColorTransformMode, modeOrUndefined?: ColorTransformMode): boolean {
        const source = sourceOrTarget;
        let target: IColorProfile | undefined;
        let mode: ColorTransformMode = ColorTransformMode.Quantum;
        if (targetModeOrUndefined !== undefined) {
            if (typeof targetModeOrUndefined === 'number')
                mode = targetModeOrUndefined;
            else
                target = targetModeOrUndefined;
        }
        if (modeOrUndefined !== undefined)
            mode = modeOrUndefined;

        const hasColorProfile = this.hasProfile('icc') || this.hasProfile('icm');
        if (target === undefined) {
            if (!hasColorProfile)
                return false;

            target = source;
        }
        else {
            if (source.colorSpace !== this.colorSpace)
                return false;

            if (!hasColorProfile)
                this.setProfile(source);
        }

        if (mode === ColorTransformMode.Quantum) {
            TemporaryDefines.use(this, temporaryDefines => {
                temporaryDefines.setArtifact('profile:highres-transform', false);
                this.setProfile(target);
            });
        }
        else {
            this.setProfile(target);
        }

        return true;
    }

    threshold(percentage: Percentage): void
    threshold(percentage: Percentage, channels: Channels): void
    threshold(percentage: Percentage, channelsOrUndefined?: Channels): void {
        const channels = this.valueOrDefault(channelsOrUndefined, Channels.Undefined);
        this.useExceptionPointer(exception => {
            ImageMagick._api._MagickImage_Threshold(this._instance, percentage._toQuantum(), channels, exception);
        });
    }

    thumbnail(width: number, height: number): void;
    thumbnail(geometry: IMagickGeometry): void;
    thumbnail(widthOrGeometry: number | IMagickGeometry, heightOrUndefined?: number): void {
        const geometry = typeof widthOrGeometry === 'number' ? new MagickGeometry(widthOrGeometry, heightOrUndefined as number) : widthOrGeometry;
        this.useException(exception => {
            _withString(geometry.toString(), geometryPtr => {
                const instance = ImageMagick._api._MagickImage_Thumbnail(this._instance, geometryPtr, exception.ptr);
                this._setInstance(instance, exception);
            });
        });
    }

    toString = (): string => `${this.format} ${this.width}x${this.height} ${this.depth}-bit ${ColorSpaceNames[this.colorSpace]}`

    transparent(color: IMagickColor): void {
        color._use(valuePtr => {
            this.useExceptionPointer(exception => {
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

        this.useException(exception => {
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

        this.useException(exception => {
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

        this.useException(exception => {
            const instance = ImageMagick._api._MagickImage_Vignette(this._instance, radius, sigma, x, y, exception.ptr);
            this._setInstance(instance, exception);
        });
    }

    whiteThreshold(threshold: Percentage): void;
    whiteThreshold(threshold: Percentage, channels: Channels): void;
    whiteThreshold(threshold: Percentage, channelsOrUndefined?: Channels): void {
        const channels = this.valueOrDefault(channelsOrUndefined, Channels.Composite);
        this.useException(exception => {
            _withString(threshold.toString(), thresholdPtr => {
                ImageMagick._api._MagickImage_WhiteThreshold(this._instance, thresholdPtr, channels, exception.ptr);
            });
        });
    }

    write<TReturnType>(func: (data: Uint8Array) => TReturnType): TReturnType;
    write<TReturnType>(func: (data: Uint8Array) => Promise<TReturnType>): Promise<TReturnType>;
    write<TReturnType>(format: MagickFormat, func: (data: Uint8Array) => TReturnType): TReturnType;
    write<TReturnType>(format: MagickFormat, func: (data: Uint8Array) => Promise<TReturnType>): Promise<TReturnType>;
    write<TReturnType>(funcOrFormat: ((data: Uint8Array) => TReturnType | Promise<TReturnType>) | MagickFormat, func?: (data: Uint8Array) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        let data = 0;
        let length = 0;

        if (func !== undefined)
            this._settings.format = funcOrFormat as MagickFormat;
        else
            func = funcOrFormat as (data: Uint8Array) => TReturnType | Promise<TReturnType>;

        this.useException(exception => {
            IntPointer.use(pointer => {
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

    writeToCanvas(canvas: HTMLCanvasElement, settings?: CanvasRenderingContext2DSettings): void {
        canvas.width = this.width;
        canvas.height = this.height;

        const ctx = canvas.getContext('2d', settings);
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
    _channelOffset(pixelChannel: PixelChannel): number {
        if (!ImageMagick._api._MagickImage_HasChannel(this._instance, pixelChannel))
            return -1;

        return ImageMagick._api._MagickImage_ChannelOffset(this._instance, pixelChannel);
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
    protected _setInstance(instance: number, exception: Exception): boolean {
        if (super._setInstance(instance, exception) === true)
            return true;

        // Assume the task was cancelled if the instance is 0 and the progress delegate is set.
        if (instance === 0 && this.onProgress !== undefined)
            return true;

        throw new MagickError('out of memory');
    }

    /** @internal */
    _use<TReturnType>(func: SyncImageCallback<TReturnType>): TReturnType;
    /** @internal */
    _use<TReturnType>(func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;
    _use<TReturnType>(func: ImageCallback<TReturnType>): TReturnType | Promise<TReturnType> {
        return Disposable._disposeAfterExecution(this, func);
    }

    /** @internal */
    static _create<TReturnType>(func: SyncImageCallback<TReturnType>): TReturnType;
    /** @internal */
    static _create<TReturnType>(func: AsyncImageCallback<TReturnType>): Promise<TReturnType>;
    static _create<TReturnType>(func: ImageCallback<TReturnType>): TReturnType | Promise<TReturnType> {
        const image = MagickImage.create();
        return image._use<TReturnType>(func);
    }

    protected override onDispose(): void {
        this.disposeProgressDelegate();
    }

    private _contrast(enhance: boolean) {
        this.useExceptionPointer(exception => {
            ImageMagick._api._MagickImage_Contrast(this._instance, this.fromBool(enhance), exception);
        });
    }

    private _getProfile(name: string): Uint8Array | null {
        return _withString(name, namePtr => {
            const value = ImageMagick._api._MagickImage_GetProfile(this._instance, namePtr);
            const data = StringInfo.toArray(value);
            if (data === null)
                return null;

            return data;
        });
    }

    private _opaque(target: IMagickColor, fill: IMagickColor, invert: boolean) {
        this.useExceptionPointer(exception => {
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
        this.useExceptionPointer(exception => {
            ImageMagick._api._MagickImage_SigmoidalContrast(this._instance, this.fromBool(sharpen), contrast, midpoint, channels, exception);
        });
    }

    private _transparent(color: IMagickColor, invert: boolean) {
        color._use(valuePtr => {
            this.useExceptionPointer(exception => {
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

    private disposeProgressDelegate(): void {
        DelegateRegistry.removeProgressDelegate(this);
        this._progress = undefined;
    }

    private readOrPing(ping: boolean, fileNameOrArrayOrColor: string | ByteArray | IMagickColor, settingsOrWidthOrUndefined?: MagickReadSettings | number, heightOrUndefined?: number): void {
        this.useException(exception => {
            const readSettings = settingsOrWidthOrUndefined instanceof MagickReadSettings ? settingsOrWidthOrUndefined : new MagickReadSettings(this._settings);
            readSettings._ping = ping;
            this._settings._ping = ping;

            if (readSettings.frameCount !== undefined && readSettings.frameCount > 1)
                throw new MagickError('The frame count can only be set to 1 when a single image is being read.');

            if (typeof fileNameOrArrayOrColor === 'string') {
                readSettings._fileName = fileNameOrArrayOrColor;
            } else if (_isByteArray(fileNameOrArrayOrColor)) {
                this.readFromArray(fileNameOrArrayOrColor, readSettings, exception);
                return;
            } else {
                readSettings._fileName = 'xc:' + fileNameOrArrayOrColor.toShortString();
                readSettings.width = typeof settingsOrWidthOrUndefined === 'number' ? settingsOrWidthOrUndefined : 0;
                readSettings.height = typeof heightOrUndefined === 'number' ? heightOrUndefined : 0;
            }
            readSettings._use(settings => {
                const instance = ImageMagick._api._MagickImage_ReadFile(settings._instance, exception.ptr);
                this._setInstance(instance, exception);
            });
        });
    }

    private readFromArray(array: ByteArray, readSettings: MagickReadSettings, exception: Exception): void {
        readSettings._use(settings => {
            _withByteArray(array, (arrayPtr) => {
                const instance = ImageMagick._api._MagickImage_ReadBlob(settings._instance, arrayPtr, 0, array.byteLength, exception.ptr);
                this._setInstance(instance, exception);
            });
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

    private valueOrComputedDefault<TType>(value: TType | undefined, defaultValue: () => TType): TType {
        if (value === undefined)
            return defaultValue();

        return value;
    }

    private useException<TReturnType>(func: (exception: Exception) => TReturnType): TReturnType {
        return Exception.use(func, error => {
            if (this.onWarning !== undefined)
                this.onWarning(new WarningEvent(error));
        });
    }

    private useExceptionPointer<TReturnType>(func: (exception: number) => TReturnType): TReturnType {
        return Exception.usePointer(func, error => {
            if (this.onWarning !== undefined)
                this.onWarning(new WarningEvent(error));
        });
    }
}
