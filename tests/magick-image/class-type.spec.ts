/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ClassType } from '@src/enums/class-type';
import { TestFiles } from '@test/test-files';

describe('MagickImage#classType', () => {
    it('should return the class type the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            expect(image.classType).toBe(ClassType.Pseudo);
        });
    });

    it('should change the class type', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.classType = ClassType.Direct;
            expect(image.classType).toBe(ClassType.Direct);
        });
    });
});
