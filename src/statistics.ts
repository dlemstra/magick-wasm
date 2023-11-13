// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ChannelStatistics, IChannelStatistics } from './channel-statistics';
import { Channels } from './enums/channels';
import { ImageMagick } from './image-magick';
import { MagickImage } from './magick-image';
import { PixelChannel } from './enums/pixel-channel';

export interface IStatistics {
    readonly channels: ReadonlyArray<PixelChannel>;
    composite(): IChannelStatistics;
    getChannel(channel: PixelChannel): IChannelStatistics | null;
}

/** @internal */
export class Statistics implements IStatistics {
    private _channels: Record<number, ChannelStatistics> = {};

    get channels(): ReadonlyArray<PixelChannel> {
        const channels: PixelChannel[] = [];
        for (const channel in this._channels) {
            channels.push(parseInt(channel));
        }

        return channels;
    }

    composite(): IChannelStatistics {
        return this._channels[PixelChannel.Composite];
    }

    getChannel(channel: PixelChannel): IChannelStatistics | null {
        const channelStatistics = this._channels[channel];
        return channelStatistics !== undefined ? channelStatistics : null;
    }

    static _create(image: MagickImage, list: number, channels: Channels): Statistics {
        const instance = new Statistics();

        image.channels.forEach(channel => {
            if (((<number>channels >> <number>channel) & 0x01) != 0)
                instance.addChannel(list, channel);
        });

        instance.addChannel(list, PixelChannel.Composite);

        return instance;
    }

    private addChannel(list: number, channel: PixelChannel) {
        const instance = ImageMagick._api._Statistics_GetInstance(list, channel);
        if (instance !== 0) {
            this._channels[channel] = new ChannelStatistics(channel, instance);
        }
    }
}
