// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Percentage } from '@src/types/percentage';
import { TestImages } from '@test/test-images';

describe('ConnectedComponent#toGeometry', () => {
    it('converts the component to a geometry', () => {
        TestImages.connectedComponentsPng.use((image) => {
            image.clone((clone) => {
                clone.blur(0, 10);
                clone.threshold(new Percentage(50));

                const connectedComponents = [...clone.connectedComponents(4)].sort((a, b) => a.x - b.x);

                const geometry = connectedComponents[1].toGeometry();

                expect(geometry.x).toBe(57);
                expect(geometry.y).toBe(250);
                expect(geometry.width).toBe(88);
                expect(geometry.height).toBe(139);
            });
        });
    });
});
