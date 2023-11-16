// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../image-magick';
import { PixelChannel } from '../enums/pixel-channel';

/**
 * Encapsulation of the ImageMagick cannel statistics object.
 */
export interface IChannelStatistics {
    /**
     * Gets the channel.
     */
    readonly channel: PixelChannel;

    /**
     * Gets the depth of the channel.
     */
    readonly depth: number;

    /**
     * Gets the entropy.
     */
    readonly entropy: number;

    /**
     * Gets the kurtosis.
     */
    readonly kurtosis: number;

    /**
     * Gets the maximum value observed.
     */
    readonly maximum: number;

    /**
     * Gets the average (mean) value observed.
     */
    readonly mean: number;

    /**
     *  Gets the minimum value observed.
     */
    readonly minimum: number;

    /**
     * Gets the skewness.
     */
    readonly skewness: number;

    /**
     * Gets the standard deviation, sqrt(variance).
     */
    readonly standardDeviation: number;
}

/** @internal */
export class ChannelStatistics implements IChannelStatistics {
    channel: PixelChannel;
    depth: number;
    entropy: number;
    kurtosis: number;
    maximum: number;
    mean: number;
    minimum: number;
    skewness: number;
    standardDeviation: number;

    constructor(channel: PixelChannel, instance: number) {
        this.channel = channel;
        this.depth = ImageMagick._api._ChannelStatistics_Depth_Get(instance);
        this.entropy = ImageMagick._api._ChannelStatistics_Entropy_Get(instance);
        this.kurtosis = ImageMagick._api._ChannelStatistics_Kurtosis_Get(instance);
        this.maximum = ImageMagick._api._ChannelStatistics_Maximum_Get(instance);
        this.mean = ImageMagick._api._ChannelStatistics_Mean_Get(instance);
        this.minimum = ImageMagick._api._ChannelStatistics_Minimum_Get(instance);
        this.skewness = ImageMagick._api._ChannelStatistics_Skewness_Get(instance);
        this.standardDeviation = ImageMagick._api._ChannelStatistics_StandardDeviation_Get(instance);
    }
}
