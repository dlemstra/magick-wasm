// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ConnectedComponent } from '@src/connected-component';
import { MagickColors } from '@src/magick-colors';
import { IMagickImage } from '@src/magick-image';
import { Percentage } from '@src/types/percentage';
import { Point } from '@src/types/point';
import { TestImages } from '@test/test-images';

type ComponentTestData = Required<Omit<ConnectedComponent, 'toGeometry'>>;

describe('MagickImage#connectedComponents', () => {
    test('should return the connected components', () => {
        TestImages.connectedComponentsPng.use((image) => {
            image.clone((clone) => {
                clone.blur(0, 10);
                clone.threshold(new Percentage(50));

                const connectedComponents = [...clone.connectedComponents(4)].sort((a, b) => a.x - b.x);

                expect(connectedComponents).toHaveLength(7);

                const color = MagickColors.Black;

                assertComponent(image, connectedComponents[1], {
                    id: 4,
                    x: 57,
                    y: 250,
                    width: 88,
                    height: 139,
                    area: 11835,
                    centroid: new Point(100.718, 318.8505),
                    color,
                });
                assertComponent(image, connectedComponents[2], {
                    id: 1,
                    x: 102,
                    y: 28,
                    width: 136,
                    height: 150,
                    area: 11793,
                    centroid: new Point(169.479, 102.698),
                    color,
                });
                assertComponent(image, connectedComponents[3], {
                    id: 6,
                    x: 130,
                    y: 455,
                    width: 148,
                    height: 143,
                    area: 11801,
                    centroid: new Point(203.168, 526.112),
                    color,
                });
                assertComponent(image, connectedComponents[4], {
                    id: 3,
                    x: 223,
                    y: 229,
                    width: 89,
                    height: 139,
                    area: 11792,
                    centroid: new Point(267.159, 297.857),
                    color,
                });
                assertComponent(image, connectedComponents[5], {
                    id: 2,
                    x: 352,
                    y: 96,
                    width: 128,
                    height: 150,
                    area: 11772,
                    centroid: new Point(415.759, 170.765),
                    color,
                });
                assertComponent(image, connectedComponents[6], {
                    id: 5,
                    x: 357,
                    y: 352,
                    width: 128,
                    height: 151,
                    area: 11783,
                    centroid: new Point(420.79, 427.256),
                    color,
                });
            });
        });
    });
});

function assertComponent(image: IMagickImage, component: ConnectedComponent, { id, area, x, y, width, height, color, centroid }: ComponentTestData) {
    expect(component).toEqual({
        id,
        area,
        x,
        y,
        width,
        height,
        color,
        centroid: expect.any(Point),
    });
    expect(component.centroid.x).toBeCloseTo(centroid.x);
    expect(component.centroid.y).toBeCloseTo(centroid.y);

    image.clone((clone) => {
        clone.crop(component.toGeometry());

        const delta = 20;

        expect(clone.width).toBeGreaterThanOrEqual(width - delta);
        expect(clone.width).toBeLessThanOrEqual(width + delta);
        expect(clone.height).toBeGreaterThanOrEqual(height - delta);
        expect(clone.height).toBeLessThanOrEqual(height + delta);
    });
}
