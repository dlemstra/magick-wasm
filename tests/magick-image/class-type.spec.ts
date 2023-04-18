// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ClassType } from '../../src/class-type';
import { ImageMagick } from '../../src/image-magick';
import { TestFiles } from '../test-files';

beforeAll(() => { ImageMagick._api = global.native; });

describe('MagickImage#classType', () => {
    it('should return the class type the image', () => {
        TestFiles.Builtin.logo.read(image => {
            expect(image.classType).toBe(ClassType.Pseudo);
        });
    });

    it('should change the class type', () => {
        TestFiles.Builtin.logo.read(image => {
            image.classType = ClassType.Direct;
            expect(image.classType).toBe(ClassType.Direct);
        });
    });
});
