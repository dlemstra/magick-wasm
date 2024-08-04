/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IMagickImage } from '@src/magick-image';
import { IMagickColor } from '@src/magick-color';
import { MagickFormat } from '@src/enums/magick-format';
import { PixelChannel } from '@src/enums/pixel-channel';
import { Quantum } from '@src/quantum';

interface MatcherResult {
    pass: boolean;
    message: () => string;
}

export interface ICustomMatchers {
    toHavePixelWithColor: (x: number, y: number, colorOrString: IMagickColor | string) => void;
    toNotBeUnknown: (message: string) => void;
}

export const CustomMatchers = {
    toHavePixelWithColor: ((image: IMagickImage, x: number, y: number, colorOrString: IMagickColor | string) => {
        const actualColor = pixelColor(image, x, y);
        const expectedColor = colorOrString.toString();

        if (expectedColor === actualColor) {
            return { pass: true, message: () => '' }
        }

        return {
            pass: false,
            message: () => `Excepted color at position ${x}x${y} to be '${expectedColor}', but the color is '${actualColor}'.`
        };
    }) as () => MatcherResult,

    toNotBeUnknown: ((actual: MagickFormat, message: string) => {
        if (actual !== MagickFormat.Unknown) {
            return { pass: true, message: () => '' }
        }

        return { pass: false, message: () => message };
    }) as () => MatcherResult,
};

function toHex(value: number): string {
    return value.toString(16).padStart(2, '0');
}

function pixelColor(image: IMagickImage, x: number, y: number): string {
    return image.getPixels(pixels => {
        let channelCount = image.channelCount;
        if (image._channelOffset(PixelChannel.Index) !== -1)
            channelCount--;

        const pixel = pixels.getPixel(x, y);
        let result = '#';

        switch (channelCount) {
            case 1:
                result += toHex(pixel[0]);
                result += toHex(Quantum.max);
                break;
            case 2:
                result += toHex(pixel[image._channelOffset(PixelChannel.Red)]);
                if (image.hasAlpha)
                    result += toHex(pixel[image._channelOffset(PixelChannel.Alpha)]);
                else
                    result += toHex(Quantum.max);
                break;
            case 3:
                result += toHex(pixel[image._channelOffset(PixelChannel.Red)]);
                result += toHex(pixel[image._channelOffset(PixelChannel.Green)]);
                result += toHex(pixel[image._channelOffset(PixelChannel.Blue)]);
                result += toHex(Quantum.max);
                break;
            case 4:
                result += toHex(pixel[image._channelOffset(PixelChannel.Red)]);
                result += toHex(pixel[image._channelOffset(PixelChannel.Green)]);
                result += toHex(pixel[image._channelOffset(PixelChannel.Blue)]);
                if (image.hasAlpha)
                    result += toHex(pixel[image._channelOffset(PixelChannel.Alpha)]);
                else
                    result += toHex(Quantum.max);
                break;
        }

        return result;
    });
}
