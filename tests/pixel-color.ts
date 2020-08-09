/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { MagickImage } from "../src/magick-image";
import { PixelChannel } from "../src/pixel-channel";

function toHex(value: number): string {
    return value.toString(16).padStart(2, '0');
}

export function pixelColor(image: MagickImage, x: number, y: number): string {
    return image.pixels((pixels) => {
        let channelCount = image.channelCount;
        if (image.channelOffset(PixelChannel.Index) !== -1)
            channelCount--;

        const pixel = pixels.getArea(x, y, 1, 1);
        let result = '#';

        switch (channelCount) {
            case 1:
                result += toHex(pixel[0]);
                break;
            case 2:
                result += toHex(pixel[image.channelOffset(PixelChannel.Red)]);
                result += toHex(pixel[image.channelOffset(PixelChannel.Alpha)]);
                break;
            case 3:
                result += toHex(pixel[image.channelOffset(PixelChannel.Red)]);
                result += toHex(pixel[image.channelOffset(PixelChannel.Green)]);
                result += toHex(pixel[image.channelOffset(PixelChannel.Blue)]);
                break;
            case 4:
                result += toHex(pixel[image.channelOffset(PixelChannel.Red)]);
                result += toHex(pixel[image.channelOffset(PixelChannel.Green)]);
                result += toHex(pixel[image.channelOffset(PixelChannel.Blue)]);
                result += toHex(pixel[image.channelOffset(PixelChannel.Alpha)]);
                break;
        }

        return result;
    });
}