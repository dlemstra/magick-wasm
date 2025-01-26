/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorSpace } from "../enums/color-space";
import { ImageMagick } from "../image-magick";
import { MagickError } from "../magick-error";
import { PixelChannel } from "../enums/pixel-channel";

/**
 * Contains the perceptual hash of one image channel.
 */
export interface IChannelPerceptualHash {
    /**
     * Gets the channel.
     */
    readonly channel: PixelChannel;

    /**
     * Returns the hu perceptual hash for the specified colorspace.
     * @param colorSpace: The colorspace to use.
     * @param channelIndex: The index to use.
     */
    huPhash(colorSpace: ColorSpace, channelIndex: number): number;

    /**
     * Returns the sum squared difference between this hash and the other hash.
     * @param other The @see IChannelPerceptualHash to get the distance of.
     */
    sumSquaredDistance(other: IChannelPerceptualHash): number;

    /**
     * Returns a string representation of this hash.
     */
    toString(): string;
}

class HuPhashList {
    private _values: number[];

    constructor() {
        this._values = new Array(7).fill(0);
    }

    get(index: number): number {
        return this._values[index];
    }
    set(index: number, value: number): void {
        this._values[index] = value;
    }
}

export class ChannelPerceptualHash implements IChannelPerceptualHash {
    private readonly _huPhashes: Map<ColorSpace, HuPhashList> = new Map();
    private _hash: string = '';

    channel: PixelChannel;

    /** @internal */
    constructor(channel: PixelChannel, colorSpaces: ReadonlyArray<ColorSpace>, hash: string);
    constructor(channel: PixelChannel, colorSpaces: ReadonlyArray<ColorSpace>, instance: number);
    constructor(channel: PixelChannel, colorSpaces: ReadonlyArray<ColorSpace>, hashOrInstance: string | number) {
        this.channel = channel;
        if (typeof hashOrInstance == 'number') {
            for (let colorSpaceIndex = 0; colorSpaceIndex < colorSpaces.length; colorSpaceIndex++) {
                const huPhashList = new HuPhashList();
                for (let i = 0; i < 7; i++) {
                    const huPhash = ImageMagick._api._ChannelPerceptualHash_GetHuPhash(hashOrInstance, colorSpaceIndex, i);
                    huPhashList.set(i, huPhash);
                }

                this._huPhashes.set(colorSpaces[colorSpaceIndex], huPhashList);
            }
        } else {
            this.parseHash(colorSpaces, hashOrInstance);
        }
    }

    huPhash(colorSpace: ColorSpace, index: number): number {
        if (index < 0 || index > 6)
            throw new MagickError('Invalid index specified');

        const huPhashList = this._huPhashes.get(colorSpace);
        if (huPhashList === undefined)
            throw new MagickError('Invalid color space specified');

        return huPhashList.get(index);
    }

    sumSquaredDistance(other: IChannelPerceptualHash): number {
        let sumSquaredDistance = 0.0;

        this._huPhashes.forEach((huPhashList, colorSpace) => {
            for (let i = 0; i < 7; i++) {
                const a = huPhashList.get(i);
                const b = other.huPhash(colorSpace, i);
                sumSquaredDistance += (a - b) * (a - b);
            }
        });

        return sumSquaredDistance;
    }

    toString(): string {
        if (this._hash == "")
            this.setHash();

        return this._hash;
    }

    private parseHash(colorSpaces: ReadonlyArray<ColorSpace>, hash: string): void {
        this._hash = hash;

        let offset = 0;
        for (const colorSpace of colorSpaces) {
            const huPhashList = new HuPhashList();
            for (let i = 0; i < 7; i++, offset += 5) {
                const hex = Number.parseInt(hash.substring(offset, offset + 5), 16);
                if (isNaN(hex))
                    throw new MagickError('Invalid hash specified');

                let value = hex / ChannelPerceptualHash.powerOfTen(hex >> 17);
                if ((hex & (1 << 16)) != 0)
                    value = -value;

                huPhashList.set(i, value);
            }

            this._huPhashes.set(colorSpace, huPhashList);
        }
    }

    private static powerOfTen(power: number): number {
        switch (power) {
            case 2: return 100.0;
            case 3: return 1000.0;
            case 4: return 10000.0;
            case 5: return 100000.0;
            case 6: return 1000000.0;
            default: return 10.0;
        }
    }

    private setHash(): void {
        this._hash = '';
        this._huPhashes.forEach(huPhashList => {
            for (let i = 0; i < 7; i++) {
                let value = huPhashList.get(i);

                let hex = 0;
                while (hex < 7 && Math.abs(value * 10) < 65356) {
                    value *= 10;
                    hex++;
                }

                hex <<= 1;
                if (hex < 0)
                    hex |= 1;
                hex = (hex << 16) + Math.floor(value < 0 ? -(value - 0.5) : value + 0.5);
                this._hash += hex.toString(16);
            }
        });
    }
}
