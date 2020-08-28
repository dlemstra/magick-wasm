/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { JSDOM } from 'jsdom';
import { MagickColors } from '../../src/magick-colors';
import { MagickImage } from '../../src/magick-image';
import { colorAssert } from '../color-assert';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#readFromCanvas', () => {
    it('should read the image data from the canvas', async () => {
        const window = new JSDOM().window;

        const canvas = window.document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 2;

        window.HTMLCanvasElement.prototype.getContext = <any> jest.fn(function() {
            return {
                getImageData: function(x: number, y: number, width: number, height: number) {
                    expect(x).toBe(0);
                    expect(y).toBe(0);
                    expect(width).toBe(canvas.width);
                    expect(height).toBe(canvas.height);
                    return {
                        data: new Uint8ClampedArray([
                            255, 0, 255, 255,
                            255, 0, 0, 255
                        ])
                    }
                }
            };
        });

        image.readFromCanvas(canvas);

        expect(image.width).toBe(1);
        expect(image.height).toBe(2);

        colorAssert(image, 0, 0, MagickColors.Magenta);
        colorAssert(image, 0, 1, MagickColors.Red);
    });
});