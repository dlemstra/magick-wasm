// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Percentage } from '@src/percentage';
import { TestImages } from '@test/test-images';

describe('ConnectedComponent#toGeometry', () => {
    it('converts the component to a geometry', () => {
        TestImages.connectedComponents.use((image) => {
            image.clone((clone) => {
                clone.blur(0, 10);
                clone.threshold(new Percentage(50));

                const connectedComponents = [...clone.connectedComponents(4)].sort((a, b) => a.x - b.x);

                const geometry = connectedComponents[1].toGeometry();

                expect(geometry.x).toBe(94);
                expect(geometry.y).toBe(297);
                expect(geometry.width).toBe(128);
                expect(geometry.height).toBe(151);
            });
        });
    });
});
