// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Channels } from '@src/channels';
import { CompositeOperator } from '@src/composite-operator';
import { Gravity } from '@src/gravity';
import { ImageMagick } from '@src/image-magick';
import { MagickColors } from '@src/magick-colors';
import { Point } from '@src/point';

describe('MagickImage#compositeGravity', () => {
    it('should use the gravity', () => {
        ImageMagick.read(MagickColors.Red, 3, 3, (image) => {
            ImageMagick.read(MagickColors.White, 1, 1, (white) => {

                image.compositeGravity(white, Gravity.East);
                expect(image).toHavePixelWithColor(2, 1, MagickColors.White);
            });
        });
    });

    it('should draw at the correct position with west gravity', () => {
        const backgroundColor = MagickColors.LightBlue;
        const overlayColor = MagickColors.YellowGreen;

        ImageMagick.read(backgroundColor, 100, 100, (background) => {
            ImageMagick.read(overlayColor, 50, 50, (overlay) => {

                background.compositeGravity(overlay, Gravity.West, CompositeOperator.Over);
                expect(background).toHavePixelWithColor(0, 0, backgroundColor);
                expect(background).toHavePixelWithColor(0, 25, overlayColor);
                expect(background).toHavePixelWithColor(0, 75, backgroundColor);

                expect(background).toHavePixelWithColor(49, 0, backgroundColor);
                expect(background).toHavePixelWithColor(49, 25, overlayColor);
                expect(background).toHavePixelWithColor(49, 75, backgroundColor);

                expect(background).toHavePixelWithColor(50, 0, backgroundColor);
                expect(background).toHavePixelWithColor(50, 25, backgroundColor);
                expect(background).toHavePixelWithColor(50, 75, backgroundColor);

                expect(background).toHavePixelWithColor(99, 0, backgroundColor);
                expect(background).toHavePixelWithColor(99, 25, backgroundColor);
                expect(background).toHavePixelWithColor(99, 75, backgroundColor);
            });
        });
    });

    it('should draw at the correct position with east gravity', () => {
        const backgroundColor = MagickColors.LightBlue;
        const overlayColor = MagickColors.YellowGreen;

        ImageMagick.read(backgroundColor, 100, 100, (background) => {
            ImageMagick.read(overlayColor, 50, 50, (overlay) => {

                background.compositeGravity(overlay, Gravity.East, CompositeOperator.Over);
                expect(background).toHavePixelWithColor(0, 0, backgroundColor);
                expect(background).toHavePixelWithColor(0, 25, backgroundColor);
                expect(background).toHavePixelWithColor(0, 75, backgroundColor);

                expect(background).toHavePixelWithColor(49, 0, backgroundColor);
                expect(background).toHavePixelWithColor(49, 25, backgroundColor);
                expect(background).toHavePixelWithColor(49, 75, backgroundColor);

                expect(background).toHavePixelWithColor(50, 0, backgroundColor);
                expect(background).toHavePixelWithColor(50, 25, overlayColor);
                expect(background).toHavePixelWithColor(50, 75, backgroundColor);

                expect(background).toHavePixelWithColor(99, 0, backgroundColor);
                expect(background).toHavePixelWithColor(99, 25, overlayColor);
                expect(background).toHavePixelWithColor(99, 75, backgroundColor);
            });
        });
    });

    it('should use the gravity, operator and channel', () => {
        ImageMagick.read(MagickColors.Red, 3, 3, (image) => {
            ImageMagick.read(MagickColors.White, 1, 1, (white) => {

                image.compositeGravity(white, Gravity.West, CompositeOperator.In, Channels.Green);
                expect(image).toHavePixelWithColor(0, 1, MagickColors.Yellow);
            });
        });
    });

    it('should use the arguments', () => {
        ImageMagick.read(MagickColors.White, 10, 10, (image) => {
            ImageMagick.read(MagickColors.White, image.width, image.height, (blur) => {
                // TODO: CHECK WARNING
                image.compositeGravity(blur, Gravity.Center, CompositeOperator.Blur, '3');
            });
        });
    });

    it('should remove the artifact', () => {
        ImageMagick.read(MagickColors.Red, 1, 1, (image) => {
            ImageMagick.read(MagickColors.White, 1, 1, (blur) => {
                image.compositeGravity(blur, Gravity.Center, CompositeOperator.Blur, '3');

                expect(image.artifactNames.length).toBe(0);
            });
        });
    });

    it('should use the arguments and channel', () => {
        ImageMagick.read(MagickColors.White, 10, 10, (image) => {
            ImageMagick.read(MagickColors.White, image.width, image.height, (blur) => {
                // TODO: CHECK WARNING
                image.compositeGravity(blur, Gravity.Center, CompositeOperator.Blur, '3', Channels.Red);
            });
        });
    });

    it('should remove the artifact when channel is used', () => {
        ImageMagick.read(MagickColors.Red, 1, 1, (image) => {
            ImageMagick.read(MagickColors.White, 1, 1, (blur) => {
                image.compositeGravity(blur, Gravity.Center, CompositeOperator.Blur, '3', Channels.Red);

                expect(image.artifactNames.length).toBe(0);
            });
        });
    });

    it('should use the gravity and position', () => {
        ImageMagick.read(MagickColors.Red, 3, 3, (image) => {
            ImageMagick.read(MagickColors.White, 1, 1, (white) => {

                image.compositeGravity(white, Gravity.Northeast, new Point(1, 1));
                expect(image).toHavePixelWithColor(1, 1, MagickColors.White);
            });
        });
    });

    it('should use the gravity, position and channels', () => {
        ImageMagick.read(MagickColors.Red, 3, 3, (image) => {
            ImageMagick.read(MagickColors.White, 1, 1, (white) => {

                image.compositeGravity(white, Gravity.Southwest, new Point(1, 1), Channels.Green);
                expect(image).toHavePixelWithColor(1, 1, MagickColors.Yellow);
            });
        });
    });

    it('should use the gravity, operator and position', () => {
        ImageMagick.read(MagickColors.Red, 3, 3, (image) => {
            ImageMagick.read(MagickColors.White, 1, 1, (white) => {

                image.compositeGravity(white, Gravity.Northwest, CompositeOperator.Over, new Point(1, 1));
                expect(image).toHavePixelWithColor(1, 1, MagickColors.White);
            });
        });
    });

    it('should use the gravity, operator, position and channel', () => {
        ImageMagick.read(MagickColors.White, 3, 3, (image) => {
            ImageMagick.read(MagickColors.Black, 1, 1, (black) => {

                image.compositeGravity(black, Gravity.Southeast, CompositeOperator.Clear, new Point(1, 1), Channels.Green);
                expect(image).toHavePixelWithColor(1, 1, MagickColors.Magenta);
            });
        });
    });

    it('should use the arguments and position', () => {
        ImageMagick.read(MagickColors.White, 10, 10, (image) => {
            ImageMagick.read(MagickColors.White, image.width, image.height, (blur) => {
                // TODO: CHECK WARNING
                image.compositeGravity(blur, Gravity.Center, CompositeOperator.Blur, new Point(1, 1), '3');
            });
        });
    });

    it('should remove the artifact when position is used', () => {
        ImageMagick.read(MagickColors.Red, 1, 1, (image) => {
            ImageMagick.read(MagickColors.White, 1, 1, (blur) => {
                image.compositeGravity(blur, Gravity.Center, CompositeOperator.Blur, new Point(1, 1), '3');

                expect(image.artifactNames.length).toBe(0);
            });
        });
    });

    it('should use the arguments, position and channel', () => {
        ImageMagick.read(MagickColors.White, 10, 10, (image) => {
            ImageMagick.read(MagickColors.White, image.width, image.height, (blur) => {
                // TODO: CHECK WARNING
                image.compositeGravity(blur, Gravity.Center, CompositeOperator.Blur, new Point(1, 1), '3', Channels.Red);
            });
        });
    });

    it('should remove the artifact when position and channel are used', () => {
        ImageMagick.read(MagickColors.Red, 1, 1, (image) => {
            ImageMagick.read(MagickColors.White, 1, 1, (blur) => {
                image.compositeGravity(blur, Gravity.Center, CompositeOperator.Blur, new Point(1, 1), '3', Channels.Red);

                expect(image.artifactNames.length).toBe(0);
            });
        });
    });
});
