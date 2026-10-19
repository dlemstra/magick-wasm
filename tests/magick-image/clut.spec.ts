/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { PixelInterpolateMethod } from '@src/enums/pixel-interpolate-method';
import { TestFiles } from '@test/test-files';

describe('MagickImage#clut', () => {
    it('should use undefined as the default method', () => {
        TestFiles.Images.blurredShapeJpg.use(image => {
            TestFiles.Images.Color.red.use(red => {
                TestFiles.Images.Color.purple.use(purple => {
                    TestFiles.Images.emptyCollection.use(collection => {
                        collection.push(red);
                        collection.push(purple);
                        collection.appendHorizontally(clut => {
                            image.clone(clone => {
                                image.clut(clut);
                                clone.clut(clut, PixelInterpolateMethod.Undefined);
                                expect(image).toEqualImage(clone);
                            });
                        });
                    });
                });
            });
        });
    });

    it('should use undefined as the default channel', () => {
        TestFiles.Images.blurredShapeJpg.use(image => {
            TestFiles.Images.Color.red.use(red => {
                TestFiles.Images.Color.purple.use(purple => {
                    TestFiles.Images.emptyCollection.use(collection => {
                        collection.push(red);
                        collection.push(purple);
                        collection.appendHorizontally(clut => {
                            image.clone(clone => {
                                image.clut(clut, PixelInterpolateMethod.Integer);
                                clone.clut(clut, PixelInterpolateMethod.Integer, Channels.Undefined);
                                expect(image).toEqualImage(clone);
                            });
                        });
                    });
                });
            });
        });
    });

    it('should apply the clut to the image', () => {
        TestFiles.Images.blurredShapeJpg.use(image => {
            TestFiles.Images.Color.red.use(red => {
                TestFiles.Images.Color.purple.use(purple => {
                    TestFiles.Images.emptyCollection.use(collection => {
                        collection.push(red);
                        collection.push(purple);
                        collection.appendHorizontally(clut => {
                            image.clone(clone => {
                                clone.clut(clut, PixelInterpolateMethod.Integer, Channels.Red);
                                expect(image).toEqualImage(clone, 0.29349);
                            });
                        });
                    });
                });
            });
        });
    });
});
