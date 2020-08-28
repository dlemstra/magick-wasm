/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickColors } from '../../src/magick-colors';
import { MagickImage } from '../../src/magick-image';
import { JSDOM } from 'jsdom';

let image: MagickImage;
let canvas: HTMLCanvasElement;
let canvasData: number[];

const canvasContextMock = function() {
    return {
        createImageData: function(width: number, height: number) {
            return {
                data: new Array(width*height*4)
            };
        },
        putImageData: function(imageData: any, x: number, y: number) {
            canvasData = imageData.data;
            expect(x).toBe(0);
            expect(y).toBe(0);
        }
    };
}

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#drawOnCanvas', () => {
    it('should draw the image on the canvas', async () => {
        const window = new JSDOM().window;
        window.HTMLCanvasElement.prototype.getContext = <any> jest.fn(canvasContextMock);
    
        canvas = window.document.createElement('canvas');

        image.read(MagickColors.Magenta, 1, 1);
        image.drawOnCanvas(canvas);

        expect(canvasData).toEqual([255, 0, 255, 255]);
    });
});