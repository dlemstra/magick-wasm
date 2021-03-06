// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { IMagickImage } from '../src/magick-image';
import { PixelChannel } from '../src/pixel-channel';
import { MagickColor } from '../src/magick-color';
import { Quantum } from '../src/quantum';

function toHex(value: number): string {
    return value.toString(16).padStart(2, '0');
}

function pixelColor(image: IMagickImage, x: number, y: number): string {
    return image.getPixels(pixels => {
        let channelCount = image.channelCount;
        if (image.channelOffset(PixelChannel.Index) !== -1)
            channelCount--;

        const pixel = pixels.getPixel(x, y);
        let result = '#';

        switch (channelCount) {
            case 1:
                result += toHex(pixel[0]);
                result += toHex(Quantum.max);
                break;
            case 2:
                result += toHex(pixel[image.channelOffset(PixelChannel.Red)]);
                if (image.hasAlpha)
                    result += toHex(pixel[image.channelOffset(PixelChannel.Alpha)]);
                else
                    result += toHex(Quantum.max);
                break;
            case 3:
                result += toHex(pixel[image.channelOffset(PixelChannel.Red)]);
                result += toHex(pixel[image.channelOffset(PixelChannel.Green)]);
                result += toHex(pixel[image.channelOffset(PixelChannel.Blue)]);
                result += toHex(Quantum.max);
                break;
            case 4:
                result += toHex(pixel[image.channelOffset(PixelChannel.Red)]);
                result += toHex(pixel[image.channelOffset(PixelChannel.Green)]);
                result += toHex(pixel[image.channelOffset(PixelChannel.Blue)]);
                if (image.hasAlpha)
                    result += toHex(pixel[image.channelOffset(PixelChannel.Alpha)]);
                else
                    result += toHex(Quantum.max);
                break;
        }

        return result;
    });
}

export function colorAssert(image: IMagickImage, x: number, y: number, colorOrString: MagickColor | string): void {
    if (typeof colorOrString === 'string')
        expect(pixelColor(image, x, y)).toBe(colorOrString);
    else
        expect(pixelColor(image, x, y)).toBe(colorOrString.toString());
}