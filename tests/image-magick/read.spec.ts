import { ImageMagick } from '../../src/image-magick';
import * as fs from "fs";
import * as util from "util";

beforeAll(() => { ImageMagick._api = (global as any).native; });

describe('ImageMagick#read', () => {
    it('should read built-in image async', async () => {
        await ImageMagick.read('logo:', async (image) => {
            expect(image.width).toEqual(640);
            expect(image.height).toEqual(480);
        });
    });

    it('should read built-in image', () => {
        ImageMagick.read('wizard:', (image) => {
            expect(image.width).toEqual(480);
            expect(image.height).toEqual(640);
        });
    });

    it('should read image from array async', async () => {
        const readFile = util.promisify(fs.readFile);
        const data = await readFile('tests/images/ImageMagick.jpg');
        await ImageMagick.read(data, (image) => {
            expect(image.width).toEqual(123);
            expect(image.height).toEqual(118);
        });
    });

    it('should read image from array', () => {
        const data = fs.readFileSync('tests/images/ImageMagick.jpg');
        ImageMagick.read(data, (image) => {
            expect(image.width).toEqual(123);
            expect(image.height).toEqual(118);
        });
    });
});
