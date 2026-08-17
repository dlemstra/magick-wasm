/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ChannelStatistics, IChannelStatistics } from './channel-statistics';
import { Channels } from '../enums/channels';
import { ImageMagick } from '../image-magick';
import { MagickImage } from '../magick-image';
import { NativePointer } from '@dlemstra/magick-native';
import { PixelChannel } from '../enums/pixel-channel';
import { _castToSize } from '../internal/native/size';

/**
 * Encapsulation of the ImageMagick ImageStatistics object.
 */
export interface IStatistics {
    /**
     * Gets the channels.
     */
    readonly channels: ReadonlyArray<PixelChannel>;

    /**
     * Returns the statistics for the all the channels.
     */
    composite(): IChannelStatistics;

    /**
     * Returns the statistics for the specified channel.
     * @param channel - The channel to get the statistics for.
     */
    getChannel(channel: PixelChannel): IChannelStatistics | null;
}

/** @internal */
export class Statistics implements IStatistics {
    private readonly _channels: Map<PixelChannel, ChannelStatistics> = new Map();

    get channels(): ReadonlyArray<PixelChannel> {
        return Array.from(this._channels.keys());
    }

    composite(): IChannelStatistics {
        return this._channels.get(PixelChannel.Composite)!;
    }

    getChannel(channel: PixelChannel): IChannelStatistics | null {
        const channelStatistics = this._channels.get(channel);
        return channelStatistics !== undefined ? channelStatistics : null;
    }

    static _create(image: MagickImage, list: NativePointer, channels: Channels): Statistics {
        const instance = new Statistics();

        image.channels.forEach(channel => {
            if (((<number>channels >> <number>channel) & 0x01) != 0)
                instance.addChannel(list, channel);
        });

        instance.addChannel(list, PixelChannel.Composite);

        return instance;
    }

    private addChannel(list: NativePointer, channel: PixelChannel) {
        const instance = ImageMagick._api._Statistics_GetInstance(list, _castToSize(channel));
        if (instance !== ImageMagick._api._NullPointer) {
            this._channels.set(channel, new ChannelStatistics(channel, instance));
        }
    }
}
