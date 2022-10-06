// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickColor } from '../src/magick-color';
import { IMagickImage } from '../src/magick-image';
import { PixelChannel } from '../src/pixel-channel';
import { Quantum } from '../src/quantum';

interface CustomMatchers {
    toHavePixelWithColor: (x: number, y: number, colorOrString: MagickColor | string) => void;
}
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Vi {
        /* eslint-disable @typescript-eslint/no-empty-interface */
        interface Assertion extends CustomMatchers {}
        interface AsymmetricMatchersContaining extends CustomMatchers {}
        /* eslint-enable @typescript-eslint/no-empty-interface */
    }
}

function toHex(value: number): string {
    return value.toString(16).padStart(2, '0');
}

function pixelColor(image: IMagickImage, x: number, y: number): string {
    return image.getPixels(pixels => {
        let { channelCount } = image;
        if (image.channelOffset(PixelChannel.Index) !== -1) channelCount--;

        const pixel = pixels.getPixel(x, y);
        let result = '#';

        switch (channelCount) {
            case 1:
                result += toHex(pixel[0]);
                result += toHex(Quantum.max);
                break;
            case 2:
                result += toHex(pixel[image.channelOffset(PixelChannel.Red)]);
                if (image.hasAlpha) {
                    result += toHex(pixel[image.channelOffset(PixelChannel.Alpha)]);
                } else {
                    result += toHex(Quantum.max);
                }
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
                if (image.hasAlpha) {
                    result += toHex(pixel[image.channelOffset(PixelChannel.Alpha)]);
                } else {
                    result += toHex(Quantum.max);
                }
                break;
            default:
        }

        return result;
    });
}

expect.extend({
    toHavePixelWithColor: ((image: IMagickImage, x: number, y: number, colorOrString: MagickColor | string) => {
        const actualColor = pixelColor(image, x, y);
        const expectedColor = colorOrString.toString();

        if (expectedColor === actualColor) {
            return { pass: true, message: () => '' };
        }

        return {
            pass: false,
            message: () => `Excepted color at position ${x}x${y} to be '${expectedColor}', but the color is '${actualColor}'.`,
        };
    }) as () => { message: () => string, pass: boolean },
});
