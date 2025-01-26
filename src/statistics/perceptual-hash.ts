/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorSpace } from "../enums/color-space";
import { ChannelPerceptualHash, IChannelPerceptualHash } from "./channel-perceptual-hash";
import { IMagickImage } from "../magick-image";
import { ImageMagick } from "../image-magick";
import { MagickError } from "../magick-error";
import { PixelChannel } from "../enums/pixel-channel";

/**
 * Contains the perceptual hash of one or more image channels.
 */
export interface IPerceptualHash {
    /**
     * Returns the perceptual hash for the specified channel.
     * @param channel: The channel to get the hash for.
     */
    getChannel(channel: number): IChannelPerceptualHash | null;

    /**
     * Returns the sum squared difference between this hash and the other hash.
     * @param other - The @see IPerceptualHash to get the distance of.
     */
    sumSquaredDistance(other: IPerceptualHash): number;

    /**
     * Returns a string representation of this hash.
     */
    toString(): string;
}

/** @internal */
export class PerceptualHash implements IPerceptualHash {
    private readonly _red: ChannelPerceptualHash;
    private readonly _green: ChannelPerceptualHash;
    private readonly _blue: ChannelPerceptualHash;

    constructor(hash: string);
    constructor(hash: string, colorSpaces: ReadonlyArray<ColorSpace>);
    /** @internal */
    constructor(red: ChannelPerceptualHash, green: ChannelPerceptualHash, blue: ChannelPerceptualHash);
    constructor(hashOrRed: string | ChannelPerceptualHash, colorSpacesOrGreenOrUndefined?: ReadonlyArray<ColorSpace> | ChannelPerceptualHash, blue?: ChannelPerceptualHash) {
        if (typeof hashOrRed === 'string') {
            const colorSpaces = colorSpacesOrGreenOrUndefined as ReadonlyArray<ColorSpace> ?? PerceptualHash._defaultColorspaces();
            PerceptualHash._validateColorSpaces(colorSpaces);
            const length = 35 * colorSpaces.length;
            if (hashOrRed.length !== 3 * length)
                throw new MagickError('Invalid hash size');

            this._red = new ChannelPerceptualHash(PixelChannel.Red, colorSpaces, hashOrRed.substring(0, length));
            this._blue = new ChannelPerceptualHash(PixelChannel.Blue, colorSpaces, hashOrRed.substring(length, length + length));
            this._green = new ChannelPerceptualHash(PixelChannel.Green, colorSpaces, hashOrRed.substring(length + length));
        } else {
            this._red = hashOrRed;
            this._green = colorSpacesOrGreenOrUndefined as ChannelPerceptualHash;
            this._blue = blue as ChannelPerceptualHash;
        }
    }

    /** @internal */
    static _create(image: IMagickImage, colorSpaces: ReadonlyArray<ColorSpace>, listInstance: number) {
        if (listInstance === 0)
            throw new MagickError('The native operation failed to create an instance');

        const red = PerceptualHash.createChannel(image, colorSpaces, listInstance, PixelChannel.Red);
        const green = PerceptualHash.createChannel(image, colorSpaces, listInstance, PixelChannel.Green);
        const blue = PerceptualHash.createChannel(image, colorSpaces, listInstance, PixelChannel.Blue);
        return new PerceptualHash(red, green, blue);
    }

    /** @internal */
    static _defaultColorspaces(): ReadonlyArray<ColorSpace> {
        return [ColorSpace.XyY, ColorSpace.HSB];
    }

    /** @internal */
    static _validateColorSpaces(colorSpaces: ReadonlyArray<ColorSpace>): void {
        if (colorSpaces.length < 1 || colorSpaces.length > 6)
            throw new MagickError('Invalid number of colorspaces, the minimum is 1 and the maximum is 6');

        const uniqueColorSpaces = new Set(colorSpaces);
        if (uniqueColorSpaces.size !== colorSpaces.length)
            throw new MagickError('Specifying the same colorspace more than once is not allowed');
    }

    getChannel(channel: number): IChannelPerceptualHash | null {
        switch (channel) {
            case PixelChannel.Red:
                return this._red;
            case PixelChannel.Green:
                return this._green;
            case PixelChannel.Blue:
                return this._blue;
            default:
                return null;
        }
    }

    sumSquaredDistance(other: IPerceptualHash): number {
        const red = other.getChannel(PixelChannel.Red);
        const green = other.getChannel(PixelChannel.Green);
        const blue = other.getChannel(PixelChannel.Blue);

        if (red === null || green === null || blue === null)
            throw new MagickError('The other perceptual hash should contain a red, green and blue channel.');

        return this._red.sumSquaredDistance(red) +
            this._green.sumSquaredDistance(green) +
            this._blue.sumSquaredDistance(blue);
    }

    toString(): string {
        return this._red.toString() +
            this._green.toString() +
            this._blue.toString();
    }

    private static createChannel(image: IMagickImage, colorSpaces: ReadonlyArray<ColorSpace>, list: number, channel: PixelChannel): ChannelPerceptualHash {
        const nativeInstance = ImageMagick._api._PerceptualHash_GetInstance(image._instance, list, channel);
        return new ChannelPerceptualHash(channel, colorSpaces, nativeInstance);
    }
}
