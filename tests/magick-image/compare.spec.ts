// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Channels } from '@src/enums/channels';
import { ErrorMetric } from '@src/enums/error-metric';
import { MagickColor } from '@src/magick-color';
import { MagickColors } from '@src/magick-colors';
import { TestImages } from '@test/test-images';
import { bogusAsyncMethod } from '@test/bogus-async';

describe('MagickImage#compare', () => {
    it('should return 0 for same image', () => {
        TestImages.empty.use(image => {
            image.read(MagickColors.Red, 1, 1);
            expect(image.compare(image, ErrorMetric.RootMeanSquared)).toBe(0);
        });
    });

    it('should return difference', () => {
        TestImages.empty.use(image => {
            TestImages.empty.use(other => {
                image.read(MagickColors.Red, 1, 1);
                other.read(MagickColors.RosyBrown, 1, 1);
                expect(image.compare(other, ErrorMetric.RootMeanSquared)).toBeCloseTo(0.48);
            });
        });
    });

    it('should call function with compare result', () => {
        TestImages.empty.use(image => {
            TestImages.empty.use(other => {
                image.read(MagickColors.Red, 1, 1);
                other.read(MagickColors.RosyBrown, 1, 1);
                const result = image.compare(other, ErrorMetric.RootMeanSquared, compareResult => {
                    expect(compareResult.difference).not.toBeNull();
                    expect(compareResult.difference.width).toBeCloseTo(1);
                    expect(compareResult.difference.height).toBeCloseTo(1);
                    expect(compareResult.difference).toHavePixelWithColor(0, 0, new MagickColor('#f40018'));

                    return compareResult;
                });

                expect(() => { result.difference._instance }).toThrowError('instance is disposed');
                expect(result.distortion).toBeCloseTo(0.48);
            });
        });
    });

    it('should call function with compare result async', async () => {
        await TestImages.empty.use(async image => {
            await TestImages.empty.use(async other => {
                image.read(MagickColors.Red, 1, 1);
                other.read(MagickColors.RosyBrown, 1, 1);
                const result = await image.compare(other, ErrorMetric.RootMeanSquared, async compareResult => {
                    expect(compareResult.difference).not.toBeNull();
                    expect(compareResult.difference.width).toBeCloseTo(1);
                    expect(compareResult.difference.height).toBeCloseTo(1);

                    await bogusAsyncMethod();

                    expect(compareResult.difference).toHavePixelWithColor(0, 0, new MagickColor('#f40018'));

                    return compareResult;
                });

                expect(() => { result.difference._instance }).toThrowError('instance is disposed');
                expect(result.distortion).toBeCloseTo(0.48);
            });
        });
    });

    it('should compare the specified channels', () => {
        TestImages.empty.use(image => {
            TestImages.empty.use(other => {
                image.read(MagickColors.Red, 1, 1);
                other.read(MagickColors.RosyBrown, 1, 1);
                expect(image.compare(other, ErrorMetric.RootMeanSquared, Channels.Red)).toBeCloseTo(0.15);
            });
        });
    });

    it('should compare the specified channels and call function with compare result', () => {
        TestImages.empty.use(image => {
            TestImages.empty.use(other => {
                image.read(MagickColors.Red, 1, 1);
                other.read(MagickColors.RosyBrown, 1, 1);

                const result = image.compare(other, ErrorMetric.RootMeanSquared, Channels.Red, compareResult => {
                    expect(compareResult.difference).not.toBeNull();
                    expect(compareResult.difference.width).toBeCloseTo(1);
                    expect(compareResult.difference.height).toBeCloseTo(1);
                    expect(compareResult.difference).toHavePixelWithColor(0, 0, new MagickColor('#f40018'));

                    return compareResult;
                });

                expect(() => { result.difference._instance }).toThrowError('instance is disposed');
                expect(result.distortion).toBeCloseTo(0.15);
            });
        });
    });

    it('should compare the specified channels and call function with compare result async', async () => {
        await TestImages.empty.use(async image => {
            await TestImages.empty.use(async other => {
                image.read(MagickColors.Red, 1, 1);
                other.read(MagickColors.RosyBrown, 1, 1);

                const result = await image.compare(other, ErrorMetric.RootMeanSquared, Channels.Red, async compareResult => {
                    expect(compareResult.difference).not.toBeNull();
                    expect(compareResult.difference.width).toBeCloseTo(1);
                    expect(compareResult.difference.height).toBeCloseTo(1);

                    await bogusAsyncMethod();

                    expect(compareResult.difference).toHavePixelWithColor(0, 0, new MagickColor('#f40018'));

                    return compareResult;
                });

                expect(() => { result.difference._instance }).toThrowError('instance is disposed');
                expect(result.distortion).toBeCloseTo(0.15);
            });
        });
    });
});
