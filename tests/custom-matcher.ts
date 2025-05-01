/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ErrorMetric } from '@src/enums/error-metric';
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
    toEqualColor: (colorOrString: IMagickColor | string) => void;
    toEqualImage: (other: IMagickImage, expectedDistortion?: number) => void;
    toHavePixelWithColor: (x: number, y: number, colorOrString: IMagickColor | string) => void;
    toNotBeUnknown: (message: string) => void;
}

export const CustomMatchers = {
    toEqualColor: ((color: IMagickColor, colorOrString: IMagickColor | string) => {
        const actualColor = color.toString();
        const expectedColor = toColorString(colorOrString);

        if (actualColor === expectedColor)
            return {
                pass: true,
                message: () => ''
            }

        return {
            pass: false,
            message: () => `Excepted color to be '${expectedColor}', but the color is '${actualColor}'.`
        };
    }) as () => MatcherResult,

    toEqualImage: ((image: IMagickImage, other: IMagickImage, expectedDistortion: number = 0) => {
        const distortion = image.compare(other, ErrorMetric.RootMeanSquared);
        if (expectedDistortion === 0) {
            if (distortion !== 0) {
                const distortionString = distortion.toFixed(5);
                return {
                    pass: false,
                    message: () => `Excepted images to be equal but the distortion is ${distortionString}.`
                };
            }
        } else {
            const expectedDistortionString = expectedDistortion.toFixed(5).toString();
            const distortionString = distortion.toFixed(5);
            if (distortionString !== expectedDistortionString) {
                return {
                    pass: false,
                    message: () => `Excepted ${distortionString} to be ${expectedDistortionString}.`
                };
            }
        }

        return { pass: true, message: () => '' }
    }) as () => MatcherResult,

    toHavePixelWithColor: ((image: IMagickImage, x: number, y: number, colorOrString: IMagickColor | string) => {
        const actualColor = pixelColor(image, x, y);
        const expectedColor = toColorString(colorOrString);

        if (actualColor === expectedColor)
            return {
                pass: true,
                message: () => ''
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
                {
                    const value = toHex(pixel[0]);
                    result += value + value + value;
                    result += toHex(Quantum.max);
                    break;
                }
            case 2:
                {
                    const value = toHex(pixel[image._channelOffset(PixelChannel.Red)]);
                    result += value + value + value;
                    if (image.hasAlpha)
                        result += toHex(pixel[image._channelOffset(PixelChannel.Alpha)]);
                    else
                        result += toHex(Quantum.max);
                    break;
                }
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

function toColorString(colorOrString: IMagickColor | string): string {
    let expectedColor = colorOrString.toString();
    if (expectedColor.length === 4)
        expectedColor = '#' + expectedColor[1] + expectedColor[1] + expectedColor[2] + expectedColor[2] + expectedColor[3] + expectedColor[3];

    if (expectedColor.length === 7)
        expectedColor += 'ff';

    return expectedColor;
}
