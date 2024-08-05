/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ComplexOperator } from '../enums/complex-operator';
import { TemporaryDefines } from '../helpers/temporary-defines';

/**
 * Settings for the complex operation.
 */
export class ComplexSettings {
    /**
     * Initializes a new instance of the {@link ComplexSettings} class.
     * @param complexOperator - The complex operator.
     */
    constructor(complexOperator: ComplexOperator) {
        this.complexOperator = complexOperator;
    }

    /**F
     * Gets or sets the complex operator.
     **/
    readonly complexOperator: ComplexOperator;

    /**
     * Gets or sets the signal to noise ratio.
     **/
    signalToNoiseRatio?: number;


    /** @internal */
    _setArtifacts(temporaryDefines: TemporaryDefines): void {
        if (this.signalToNoiseRatio !== undefined)
            temporaryDefines.setArtifact('complex:snr', this.signalToNoiseRatio);
    }
}
