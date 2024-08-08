/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { MagickColor } from '@src/magick-color';
import { MagickImage } from '@src/magick-image';
import { bogusAsyncMethod } from '@test/bogus-async';
import { TestImages } from '@test/test-images';

describe('MagickImageCollection#fx', () => {
    it('should throw exception when collection is empty', () => {
        TestImages.emptyCollection.use((images) => {
            expect(() => {
                images.fx('test', () => { /* never reached */ });
            }).toThrowError('operation requires at least one image');
        });
    });

    it('apply a mathematical expression', () => {
        TestImages.emptyCollection.use((images) => {
            images.push(MagickImage.create(new MagickColor('#ff0040'), 1, 1));
            images.push(MagickImage.create(new MagickColor('#00ff40'), 1, 1));
            images.fx('(u+v)/2', (image) => {
                expect(image).toHavePixelWithColor(0, 0, new MagickColor('#808040ff'));
            });
        });
    });

    it('apply a mathematical expression async', async () => {
        await TestImages.emptyCollection.use(async (images) => {
            images.push(MagickImage.create(new MagickColor('#ff0040'), 1, 1));
            images.push(MagickImage.create(new MagickColor('#00ff40'), 1, 1));
            await images.fx('(u+v)/2', async (image) => {
                expect(image).toHavePixelWithColor(0, 0, new MagickColor('#808040ff'));

                await bogusAsyncMethod();
            });
        });
    });

    it('apply a mathematical expression to the specified channels', () => {
        TestImages.emptyCollection.use((images) => {
            images.push(MagickImage.create(new MagickColor('#ff0040'), 1, 1));
            images.push(MagickImage.create(new MagickColor('#00ff40'), 1, 1));
            images.fx('(u+v)/2', Channels.Red | Channels.Blue, (image) => {
                expect(image).toHavePixelWithColor(0, 0, new MagickColor('#800040ff'));
            });
        });
    });

    it('apply a mathematical expression to the specified channels async', async () => {
        await TestImages.emptyCollection.use(async (images) => {
            images.push(MagickImage.create(new MagickColor('#aa00bb'), 1, 1));
            images.push(MagickImage.create(new MagickColor('#00ff40'), 1, 1));
            await images.fx('(u+v)/2', Channels.Green, async (image) => {
                expect(image).toHavePixelWithColor(0, 0, new MagickColor('#aa80bbff'));

                await bogusAsyncMethod();
            });
        });
    });
});
