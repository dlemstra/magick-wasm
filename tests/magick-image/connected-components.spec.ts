// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ConnectedComponent } from '@src/connected-component';
import { MagickColors } from '@src/magick-colors';
import { IMagickImage } from '@src/magick-image';
import { Percentage } from '@src/percentage';
import { Point } from '@src/point';
import { TestImages } from '@test/test-images';

type ComponentTestData = Required<Omit<ConnectedComponent, 'toGeometry'>>;

describe('MagickImage#connectedComponents', () => {
    test('should return the connected components', () => {
        TestImages.connectedComponents.use((image) => {
            image.clone((clone) => {
                clone.blur(0, 10);
                clone.threshold(new Percentage(50));

                const connectedComponents = [...clone.connectedComponents(4)].sort((a, b) => a.x - b.x);

                expect(connectedComponents).toHaveLength(7);

                const color = MagickColors.Black;

                assertComponent(image, connectedComponents[1], {
                    id: 2,
                    x: 94,
                    y: 297,
                    width: 128,
                    height: 151,
                    area: 11783,
                    centroid: new Point(157.209, 371.743),
                    color,
                });
                assertComponent(image, connectedComponents[2], {
                    id: 5,
                    x: 99,
                    y: 554,
                    width: 128,
                    height: 150,
                    area: 11772,
                    centroid: new Point(162.24, 628.234),
                    color,
                });
                assertComponent(image, connectedComponents[3], {
                    id: 4,
                    x: 267,
                    y: 432,
                    width: 89,
                    height: 139,
                    area: 11792,
                    centroid: new Point(310.84, 501.142),
                    color,
                });
                assertComponent(image, connectedComponents[4], {
                    id: 1,
                    x: 301,
                    y: 202,
                    width: 148,
                    height: 143,
                    area: 11801,
                    centroid: new Point(374.831, 272.887),
                    color,
                });
                assertComponent(image, connectedComponents[5], {
                    id: 6,
                    x: 341,
                    y: 622,
                    width: 136,
                    height: 150,
                    area: 11793,
                    centroid: new Point(408.52, 696.301),
                    color,
                });
                assertComponent(image, connectedComponents[6], {
                    id: 3,
                    x: 434,
                    y: 411,
                    width: 88,
                    height: 139,
                    area: 11835,
                    centroid: new Point(477.281, 480.149),
                    color,
                });
            });
        });
    });
});

function assertComponent(image: IMagickImage, component: ConnectedComponent, { id, area, x, y, width, height, color, centroid }: ComponentTestData) {
    expect(component.id).toBe(id);
    expect(component.area).toBe(area);
    expect(component.x).toBe(x);
    expect(component.y).toBe(y);
    expect(component.width).toBe(width);
    expect(component.height).toBe(height);
    expect(component.color).toEqual(color);
    expect(component.centroid.x).toBeCloseTo(centroid.x);
    expect(component.centroid.y).toBeCloseTo(centroid.y);

    image.clone((clone) => {
        clone.crop(component.toGeometry(10));

        const delta = 20;

        expect(clone.width).toBeGreaterThanOrEqual(width - delta);
        expect(clone.width).toBeLessThanOrEqual(width + delta);
        expect(clone.height).toBeGreaterThanOrEqual(height - delta);
        expect(clone.height).toBeLessThanOrEqual(height + delta);
    });
}
