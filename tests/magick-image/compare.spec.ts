/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { CompareSettings } from '@src/settings/compare-settings';
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

                expect(image.compare(other, ErrorMetric.RootMeanSquared)).toBeCloseTo(0.48235, 4);
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
                    expect(compareResult.difference.width).toBe(1);
                    expect(compareResult.difference.height).toBe(1);
                    expect(compareResult.difference).toHavePixelWithColor(0, 0, new MagickColor('#f40018'));

                    return compareResult;
                });

                expect(() => { expect(result.difference._instance).toBeUndefined() }).toThrowError('instance is disposed');
                expect(result.distortion).toBeCloseTo(0.48235, 4);
            });
        });
    });

    it('should call function with compare result and use the settings', () => {
        TestImages.empty.use(image => {
            TestImages.empty.use(other => {
                image.read(MagickColors.Red, 1, 1);
                other.read(MagickColors.RosyBrown, 1, 1);

                const settings = new CompareSettings(ErrorMetric.RootMeanSquared);
                settings.highlightColor = MagickColors.Orange;

                const result = image.compare(other, settings, compareResult => {
                    expect(compareResult.difference).not.toBeNull();
                    expect(compareResult.difference.width).toBe(1);
                    expect(compareResult.difference.height).toBe(1);
                    expect(compareResult.difference).toHavePixelWithColor(0, 0, new MagickColor('#ffa500ff'));

                    return compareResult;
                });

                expect(() => { expect(result.difference._instance).toBeUndefined() }).toThrowError('instance is disposed');
                expect(result.distortion).toBeCloseTo(0.48235, 4);
            });
        });
    });

    it('should set the correct artifacts from the settings', () => {
        TestImages.empty.use(image => {
            TestImages.empty.use(other => {
                image.read(MagickColors.Red, 1, 1);
                other.read(MagickColors.RosyBrown, 1, 1);

                const settings = new CompareSettings(ErrorMetric.RootMeanSquared);
                settings.highlightColor = MagickColors.Red;
                settings.lowlightColor = MagickColors.Lime;
                settings.masklightColor = MagickColors.Blue;

                image.compare(other, settings, compareResult => {
                    expect(compareResult.difference.getArtifact('compare:highlight-color')).toBe('#ff0000ff');
                    expect(compareResult.difference.getArtifact('compare:lowlight-color')).toBe('#00ff00ff');
                    expect(compareResult.difference.getArtifact('compare:masklight-color')).toBe('#0000ffff');
                });
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
                    expect(compareResult.difference.width).toBe(1);
                    expect(compareResult.difference.height).toBe(1);

                    await bogusAsyncMethod();

                    expect(compareResult.difference).toHavePixelWithColor(0, 0, new MagickColor('#f40018'));

                    return compareResult;
                });

                expect(() => { expect(result.difference._instance).toBeUndefined() }).toThrowError('instance is disposed');
                expect(result.distortion).toBeCloseTo(0.48235, 4);
            });
        });
    });

    it('should call function with compare result async and use the settings', async () => {
        await TestImages.empty.use(async image => {
            await TestImages.empty.use(async other => {
                image.read(MagickColors.Red, 1, 1);
                other.read(MagickColors.RosyBrown, 1, 1);

                const settings = new CompareSettings(ErrorMetric.RootMeanSquared);
                settings.highlightColor = MagickColors.Purple;

                const result = await image.compare(other, settings, async compareResult => {
                    expect(compareResult.difference).not.toBeNull();
                    expect(compareResult.difference.width).toBe(1);
                    expect(compareResult.difference.height).toBe(1);

                    await bogusAsyncMethod();

                    expect(compareResult.difference).toHavePixelWithColor(0, 0, new MagickColor('#800080'));

                    return compareResult;
                });

                expect(() => { expect(result.difference._instance).toBeUndefined() }).toThrowError('instance is disposed');
                expect(result.distortion).toBeCloseTo(0.48235, 4);
            });
        });
    });

    it('should compare the specified channels', () => {
        TestImages.empty.use(image => {
            TestImages.empty.use(other => {
                image.read(MagickColors.Red, 1, 1);
                other.read(MagickColors.RosyBrown, 1, 1);
                expect(image.compare(other, ErrorMetric.RootMeanSquared, Channels.Red)).toBeCloseTo(0.15169, 4);
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
                    expect(compareResult.difference.width).toBe(1);
                    expect(compareResult.difference.height).toBe(1);
                    expect(compareResult.difference).toHavePixelWithColor(0, 0, new MagickColor('#f40018'));

                    return compareResult;
                });

                expect(() => { expect(result.difference._instance).toBeUndefined() }).toThrowError('instance is disposed');
                expect(result.distortion).toBeCloseTo(0.15169, 4);
            });
        });
    });

    it('should compare the specified channels, use the settings and call function with compare result', () => {
        TestImages.empty.use(image => {
            TestImages.empty.use(other => {
                image.read(MagickColors.Red, 1, 1);
                other.read(MagickColors.RosyBrown, 1, 1);

                const settings = new CompareSettings(ErrorMetric.RootMeanSquared);
                settings.highlightColor = MagickColors.Pink;

                const result = image.compare(other, settings, Channels.Red, compareResult => {
                    expect(compareResult.difference).not.toBeNull();
                    expect(compareResult.difference.width).toBe(1);
                    expect(compareResult.difference.height).toBe(1);
                    expect(compareResult.difference).toHavePixelWithColor(0, 0, new MagickColor('#ffc0cb'));

                    return compareResult;
                });

                expect(() => { expect(result.difference._instance).toBeUndefined() }).toThrowError('instance is disposed');
                expect(result.distortion).toBeCloseTo(0.15169, 4);
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
                    expect(compareResult.difference.width).toBe(1);
                    expect(compareResult.difference.height).toBe(1);

                    await bogusAsyncMethod();

                    expect(compareResult.difference).toHavePixelWithColor(0, 0, new MagickColor('#f40018'));

                    return compareResult;
                });

                expect(() => { expect(result.difference._instance).toBeUndefined() }).toThrowError('instance is disposed');
                expect(result.distortion).toBeCloseTo(0.15169, 4);
            });
        });
    });


    it('should compare the specified channels, use the settings and call function with compare result async', async () => {
        await TestImages.empty.use(async image => {
            await TestImages.empty.use(async other => {
                image.read(MagickColors.Red, 1, 1);
                other.read(MagickColors.RosyBrown, 1, 1);

                const settings = new CompareSettings(ErrorMetric.RootMeanSquared);
                settings.highlightColor = MagickColors.Gold;

                const result = await image.compare(other, settings, Channels.Red, async compareResult => {
                    expect(compareResult.difference).not.toBeNull();
                    expect(compareResult.difference.width).toBe(1);
                    expect(compareResult.difference.height).toBe(1);

                    await bogusAsyncMethod();

                    expect(compareResult.difference).toHavePixelWithColor(0, 0, new MagickColor('#ffd700ff'));

                    return compareResult;
                });

                expect(() => { expect(result.difference._instance).toBeUndefined() }).toThrowError('instance is disposed');
                expect(result.distortion).toBeCloseTo(0.15169, 4);
            });
        });
    });
});
