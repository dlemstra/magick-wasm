// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IMagickImage } from '../magick-image';
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
    _removeArtifacts(image: IMagickImage): void {
        if (this.angleThreshold !== undefined) {
            image.removeArtifact('connected-components:angle-threshold');
        }
        if (this.areaThreshold !== undefined) {
            image.removeArtifact('connected-components:area-threshold');
        }
        if (this.circularityThreshold !== undefined) {
            image.removeArtifact('connected-components:circularity-threshold');
        }
        if (this.diameterThreshold !== undefined) {
            image.removeArtifact('connected-components:diameter-threshold');
        }
        if (this.eccentricityThreshold !== undefined) {
            image.removeArtifact('connected-components:eccentricity-threshold');
        }
        if (this.majorAxisThreshold !== undefined) {
            image.removeArtifact('connected-components:major-axis-threshold');
        }
        if (this.meanColor !== undefined) {
            image.removeArtifact('connected-components:mean-color');
        }
        if (this.minorAxisThreshold !== undefined) {
            image.removeArtifact('connected-components:minor-axis-threshold');
        }
        if (this.perimeterThreshold !== undefined) {
            image.removeArtifact('connected-components:perimeter-threshold');
        }
    }

    /** @internal */
    _setArtifacts(image: IMagickImage): void {
        if (this.angleThreshold !== undefined) {
            image.setArtifact('connected-components:angle-threshold', this.angleThreshold.toString());
        }
        if (this.areaThreshold !== undefined) {
            image.setArtifact('connected-components:area-threshold', this.areaThreshold.toString());
        }
        if (this.circularityThreshold !== undefined) {
            image.setArtifact('connected-components:circularity-threshold', this.circularityThreshold.toString());
        }
        if (this.diameterThreshold !== undefined) {
            image.setArtifact('connected-components:diameter-threshold', this.diameterThreshold.toString());
        }
        if (this.eccentricityThreshold !== undefined) {
            image.setArtifact('connected-components:eccentricity-threshold', this.eccentricityThreshold.toString());
        }
        if (this.majorAxisThreshold !== undefined) {
            image.setArtifact('connected-components:major-axis-threshold', this.majorAxisThreshold.toString());
        }
        if (this.meanColor !== undefined) {
            image.setArtifact('connected-components:mean-color', this.meanColor.toString());
        }
        if (this.minorAxisThreshold !== undefined) {
            image.setArtifact('connected-components:minor-axis-threshold', this.minorAxisThreshold.toString());
        }
        if (this.perimeterThreshold !== undefined) {
            image.setArtifact('connected-components:perimeter-threshold', this.perimeterThreshold.toString());
        }
    }
}
