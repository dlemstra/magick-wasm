/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ErrorMetric } from '@src/enums/error-metric';
import { TestFiles } from '@test/test-files';

describe('MagickImage#colorDecisionList', () => {
    it('should color the alpha channel', () => {
        const colorCorrectionCollection = `
            <ColorCorrectionCollection xmlns="urn:ASC:CDL:v1.2">
                <ColorCorrection id="cc03345">
                    <SOPNode>
                        <Slope> 0.9 1.2 0.5 </Slope>
                        <Offset> 0.4 -0.5 0.6 </Offset>
                        <Power> 1.0 0.8 1.5 </Power>
                    </SOPNode>
                    <SATNode>
                        <Saturation> 0.85 </Saturation>
                    </SATNode>
                </ColorCorrection>
            </ColorCorrectionCollection>`;
        TestFiles.Images.imageMagickJpg.use(image => {
            image.colorDecisionList(colorCorrectionCollection);
            TestFiles.Images.imageMagickJpg.use(original => {
                expect(image.compare(original, ErrorMetric.RootMeanSquared)).toBeCloseTo( 0.16576);
            });
        });
    });
});
