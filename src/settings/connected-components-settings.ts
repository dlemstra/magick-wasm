/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TemporaryDefines } from '../helpers/temporary-defines';
import { Threshold } from '../types/threshold';

/**
 * Represents the number of neighbors to visit in the connected components
 * operation (4 or 8).
 */
export type Connectivity = 4 | 8;

/**
 * Settings for the connected components operation.
 */
export class ConnectedComponentsSettings {
    /**
     * The threshold that merges any object not within the min and max angle
     * threshold.
     **/
    angleThreshold?: Threshold;

    /**
     * The threshold that eliminates small objects by merging them with their
     * larger neighbors.
     */
    areaThreshold?: Threshold;

    /**
     * The threshold that merges any object not within the min and max
     * circularity threshold.
     */
    circularityThreshold?: Threshold;

    /**
     * The number of neighbors to visit (4 or 8).
     */
    connectivity: Connectivity;

    /**
     * The threshold that merges any object not within the min and max diameter
     * threshold.
     */
    diameterThreshold?: Threshold;

    /**
     * The threshold that merges any object not within the min and max
     * eccentricity threshold.
     */
    eccentricityThreshold?: Threshold;

    /**
     * The threshold that merges any object not within the min and max ellipse
     * major threshold.
     */
    majorAxisThreshold?: Threshold;

    /**
     * Whether the object color in the component labeled image will be replaced
     * with the mean color from the source image (defaults to grayscale).
     */
    meanColor?: boolean;

    /**
     * The threshold that merges any object not within the min and max ellipse
     * minor threshold.
     */
    minorAxisThreshold?: Threshold;

    /**
     * The threshold that merges any object not within the min and max perimeter
     * threshold.
     */
    perimeterThreshold?: Threshold;

    constructor(connectivity: Connectivity) {
        this.connectivity = connectivity;
    }

    /** @internal */
    _setArtifacts(temporaryDefines: TemporaryDefines): void {
        if (this.angleThreshold !== undefined)
            temporaryDefines.setArtifact('connected-components:angle-threshold', this.angleThreshold.toString());

        if (this.areaThreshold !== undefined)
            temporaryDefines.setArtifact('connected-components:area-threshold', this.areaThreshold.toString());

        if (this.circularityThreshold !== undefined)
            temporaryDefines.setArtifact('connected-components:circularity-threshold', this.circularityThreshold.toString());

        if (this.diameterThreshold !== undefined)
            temporaryDefines.setArtifact('connected-components:diameter-threshold', this.diameterThreshold.toString());

        if (this.eccentricityThreshold !== undefined)
            temporaryDefines.setArtifact('connected-components:eccentricity-threshold', this.eccentricityThreshold.toString());

        if (this.majorAxisThreshold !== undefined)
            temporaryDefines.setArtifact('connected-components:major-axis-threshold', this.majorAxisThreshold.toString());

        if (this.meanColor !== undefined)
            temporaryDefines.setArtifact('connected-components:mean-color', this.meanColor.toString());

        if (this.minorAxisThreshold !== undefined)
            temporaryDefines.setArtifact('connected-components:minor-axis-threshold', this.minorAxisThreshold.toString());

        if (this.perimeterThreshold !== undefined)
            temporaryDefines.setArtifact('connected-components:perimeter-threshold', this.perimeterThreshold.toString());
    }
}
