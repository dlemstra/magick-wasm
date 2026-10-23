/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { MagickError } from '@src/magick-error';
import { TestFiles } from '@test/test-files';

describe('MagickImage#fx', () => {
    it('should evaluate the expression', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.fx('b');

            expect(image.width).toBe(640);
            expect(image.height).toBe(480);
            expect(image).toHavePixelWithColor(183, 83, '#000000');
            expect(image).toHavePixelWithColor(140, 400, '#ffffff');
        });
    });

    it('should apply the expression to all channels by default', () => {
        TestFiles.Images.Color.red.use(image => {
            image.hasAlpha = true;
            image.clone(other => {
                image.fx('1/2');
                other.fx('1/2', Channels.All);

                expect(image).toEqualImage(other);
                expect(image).toHavePixelWithColor(0, 0, '#80808080');
            });
        });
    });

    it('should evaluate the expression only for the specified channels', () => {
        TestFiles.Images.Color.red.use(image => {
            image.fx('1/2', Channels.Green);

            expect(image).toHavePixelWithColor(0, 0, '#ff8000');

            image.fx('1/4', Channels.Alpha);

            expect(image).toHavePixelWithColor(0, 0, '#ff8000');

            image.hasAlpha = true;
            image.fx('1/4', Channels.Alpha);

            expect(image).toHavePixelWithColor(0, 0, '#ff800040');
        });
    });

    it('should preserve the image with an identity expression', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(original => {
                image.fx('u');

                expect(image).toEqualImage(original);
            });
        });
    });

    it('should reject an empty expression', () => {
        TestFiles.Images.Color.red.use(image => {
            expect(() => image.fx('')).toThrow('The specified expression cannot be empty');
        });
    });

    it('should propagate an invalid expression error without changing the image', () => {
        TestFiles.Images.Color.red.use(image => {
            image.clone(original => {
                expect(() => image.fx('foobar')).toThrow(MagickError);

                expect(image).toEqualImage(original);
            });
        });
    });
});
