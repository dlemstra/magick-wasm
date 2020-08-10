/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { Channels } from '../../src/channels';
import { ColorSpace } from '../../src/color-space';
import { CompositeOperator } from '../../src/composite-operator';
import { Gravity } from '../../src/gravity';
import { ImageMagick } from '../../src/image-magick';
import { MagickColor } from '../../src/magick-color';
import { MagickColors } from '../../src/magick-colors';
import { Point } from '../../src/point';
import { colorAssert } from '../color-assert';

beforeEach(() => { ImageMagick._api = (global as any).native; });

describe('MagickImage#composite', () => {
    it('should preserve gray color space', () => {
        ImageMagick.read('logo:', (logo) => {
            logo.separate(images => {
                const blue = images[0];
                blue.composite(logo, CompositeOperator.Modulate);

                expect(blue.colorSpace).toBe(ColorSpace.Gray);
            }, Channels.Blue);
        });
    });

    it('should add transparency with CopyAlpha', () => {
        ImageMagick.read(MagickColors.Red, 2, 1, (image) => {
            ImageMagick.read(MagickColors.Black, 1, 1, (alpha) => {
                alpha.backgroundColor = MagickColors.White;
                alpha.extent(2, 1, Gravity.East);

                image.composite(alpha, CompositeOperator.CopyAlpha);
                expect(image.hasAlpha).toBe(true);
                colorAssert(image, 0, 0, MagickColors.Red);
                colorAssert(image, 1, 0, new MagickColor('#ff000000'));
            });
        });
    }); 

    it('should composite the specified channel', () => {
        ImageMagick.read('logo:', (image) => {
            ImageMagick.read(MagickColors.Red, image.width, image.height, (red) => {
                image.composite(red, CompositeOperator.Multiply, Channels.Blue);
                colorAssert(image, 0, 0, MagickColors.Yellow);
            });
        });
    });

    it('should use the arguments', () => {
        ImageMagick.read(MagickColors.Red, 10, 10, (image) => {
            ImageMagick.read(MagickColors.White, image.width, image.height, (blur) => {
                // TODO: CHECK WARNING
                image.composite(blur, CompositeOperator.Blur, '3');
            });
        });
    });

    it('should remove the artifact', () => {
        ImageMagick.read(MagickColors.Red, 1, 1, (image) => {
            ImageMagick.read(MagickColors.White, 1, 1, (blur) => {
                image.composite(blur, CompositeOperator.Blur, '3');

                expect(image.artifactNames.length).toBe(0);
            });
        });
    });

    it('should use the arguments and channels', () => {
        ImageMagick.read(MagickColors.Red, 10, 10, (image) => {
            ImageMagick.read(MagickColors.White, 1, 1, (blur) => {
                // TODO: CHECK WARNING
                image.composite(blur, CompositeOperator.Blur, '3', Channels.Red);
            });
        });
    });

    it('should remove the artifact when channel is specified', () => {
        ImageMagick.read(MagickColors.Red, 1, 1, (image) => {
            ImageMagick.read(MagickColors.White, 1, 1, (blur) => {
                image.composite(blur, CompositeOperator.Blur, '3', Channels.Red);

                expect(image.artifactNames.length).toBe(0);
            });
        });
    });

    it('should use the offset', () => {
        ImageMagick.read('logo:', (image) => {
            ImageMagick.read(MagickColors.Yellow, 100, 100, (yellow) => {
                image.composite(yellow, new Point(100, 100));

                colorAssert(image, 150, 150, MagickColors.Yellow);
                colorAssert(image, 199, 109, MagickColors.Yellow);
                colorAssert(image, 200, 200, MagickColors.White);
            });
        });
    });

    it('should use the offset and channels', () => {
        ImageMagick.read('logo:', (image) => {
            ImageMagick.read(MagickColors.Yellow, 100, 100, (yellow) => {
                image.composite(yellow, new Point(100, 100), Channels.Red);

                colorAssert(image, 150, 150, MagickColors.White);
                colorAssert(image, 199, 109, MagickColors.White);
                colorAssert(image, 200, 200, MagickColors.White);
            });
        });
    });

    it('should use the offset and operator', () => {
        ImageMagick.read('logo:', (image) => {
            ImageMagick.read(MagickColors.Yellow, 100, 100, (yellow) => {
                image.composite(yellow, CompositeOperator.Copy, new Point(100, 100));

                colorAssert(image, 150, 150, MagickColors.Yellow);
                colorAssert(image, 199, 109, MagickColors.Yellow);
                colorAssert(image, 200, 200, MagickColors.White);
            });
        });
    });

    it('should use the offset, operator and channels', () => {
        ImageMagick.read('logo:', (image) => {
            ImageMagick.read(MagickColors.Yellow, 100, 100, (yellow) => {
                image.composite(yellow, CompositeOperator.Clear, new Point(100, 100), Channels.Red);

                colorAssert(image, 150, 150, MagickColors.Aqua);
                colorAssert(image, 199, 109, MagickColors.Aqua);
                colorAssert(image, 200, 200, MagickColors.White);
            });
        });
    });

    it('should use the offset and arguments', () => {
        ImageMagick.read(MagickColors.Red, 10, 10, (image) => {
            ImageMagick.read(MagickColors.White, 1, 1, (blur) => {
                // TODO: CHECK WARNING
                image.composite(blur, CompositeOperator.Blur, new Point(1, 1), '3');
            });
        });
    });

    it('should remove the artifact when offset and arguments are specified', () => {
        ImageMagick.read(MagickColors.Red, 1, 1, (image) => {
            ImageMagick.read(MagickColors.White, 1, 1, (blur) => {
                image.composite(blur,  CompositeOperator.Blur, new Point(1, 1), '3');

                expect(image.artifactNames.length).toBe(0);
            });
        });
    });

    it('should use the offset, arguments and channels', () => {
        ImageMagick.read(MagickColors.Red, 10, 10, (image) => {
            ImageMagick.read(MagickColors.White, 1, 1, (blur) => {
                // TODO: CHECK WARNING
                image.composite(blur, CompositeOperator.Blur, new Point(1, 1), '3', Channels.Red);
            });
        });
    });

    it('should remove the artifact when offset, arguments and channels are specified', () => {
        ImageMagick.read(MagickColors.Red, 1, 1, (image) => {
            ImageMagick.read(MagickColors.White, 1, 1, (blur) => {
                image.composite(blur,  CompositeOperator.Blur, new Point(1, 1), '3', Channels.Red);

                expect(image.artifactNames.length).toBe(0);
            });
        });
    });
});