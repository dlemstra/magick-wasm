/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#profileNames', () => {
    it('should return empty array when image has not profiles', () => {
        TestFiles.Images.empty.use(image => {
            const names = image.profileNames;

            expect(names).not.toBeNull();
            expect(names.length).toBe(0);
        });
    });

    it('should return the profiles names of the image', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(image => {
            const names = image.profileNames;

            expect(names).not.toBeNull();
            expect(names.length).toBe(5);
            expect(names[0]).toBe('8bim');
            expect(names[1]).toBe('exif');
            expect(names[2]).toBe('icc');
            expect(names[3]).toBe('iptc');
            expect(names[4]).toBe('xmp');
        });
    });
});
