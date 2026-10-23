/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { MagickColor } from '@src/magick-color';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#haldClut', () => {
    it('should use undefined as the default channels', () => {
        TestFiles.Images.Color.red.use(image => {
            TestFiles.Images.empty.use(hald => {
                hald.read('hald:2');
                hald.negate();
                image.clone(clone => {
                    image.haldClut(hald);
                    clone.haldClut(hald, Channels.Undefined);

                    expect(image).toEqualImage(clone);
                    expect(image).toHavePixelWithColor(0, 0, MagickColors.Cyan);
                });
            });
        });
    });

    it('should preserve the image with an identity Hald CLUT', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            TestFiles.Images.empty.use(hald => {
                hald.read('hald:2');
                image.clone(original => {
                    image.haldClut(hald);

                    expect(image).toEqualImage(original);
                });
            });
        });
    });

    it('should only transform the specified channels', () => {
        TestFiles.Images.empty.use(image => {
            image.read(new MagickColor('#80402080'), 3, 3);
            TestFiles.Images.Color.black.use(hald => {
                image.haldClut(hald, Channels.Red);

                expect(image.width).toBe(3);
                expect(image.height).toBe(3);
                expect(image).toHavePixelWithColor(1, 1, '#00402080');
            });
        });
    });
});
