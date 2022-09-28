// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { JSDOM } from 'jsdom';
import { MagickColors } from '../../src/magick-colors';
import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#writeToCanvas', () => {
    it('should write the image on the canvas', () => {
        let canvasData: Uint8ClampedArray | null = null;

        const window = new JSDOM().window;
        const canvas = window.document.createElement('canvas');

        window.HTMLCanvasElement.prototype.getContext = <any> vi.fn(function(contextId: string) {
            expect(contextId).toBe('2d');
            return {
                createImageData: function(width: number, height: number) {
                    return {
                        data: new Array(width*height*4)
                    };
                },
                putImageData: function(imageData: ImageData, x: number, y: number) {
                    expect(x).toBe(0);
                    expect(y).toBe(0);

                    canvasData = imageData.data;
                }
            };
        });

        image.read(MagickColors.Magenta, 1, 1);
        image.writeToCanvas(canvas);

        expect(canvasData).toEqual([255, 0, 255, 255]);
    });
});
