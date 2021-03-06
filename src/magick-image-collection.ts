// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from './image-magick';
import { MagickImage } from './magick-image';
import { MagickSettings } from './settings/magick-settings';

export interface IMagickImageCollection extends Array<MagickImage> {
    /** @internal */
    _use(func: (images: IMagickImageCollection) => void): void;
    /** @internal */
    _use(func: (images: IMagickImageCollection) => Promise<void>): Promise<void>;
}

export class MagickImageCollection extends Array<MagickImage> implements IMagickImageCollection {
    private constructor() {
        super();
    }

    dispose(): void {
        let image = this.pop();
        while (image !== undefined) {
            image.dispose();
            image = this.pop();
        }
    }

    static create(): IMagickImageCollection {
        return Object.create(MagickImageCollection.prototype);
    }

    /** @internal */
    static _createFromImages(images: number, settings: MagickSettings): IMagickImageCollection {
        const collection = MagickImageCollection.create();

        let image = images;
        while (image !== 0) {
            const next = ImageMagick._api._MagickImage_GetNext(image);
            ImageMagick._api._MagickImage_SetNext(image, 0);

            collection.push(MagickImage._createFromImage(image, settings));

            image = next;
        }

        return collection;
    }

    /** @internal */
    _use(func: (images: IMagickImageCollection) => void): void;
    _use(func: (images: IMagickImageCollection) => Promise<void>): Promise<void>;
    _use(func: (images: IMagickImageCollection) => void | Promise<void>): void | Promise<void> {
        try {
            return func(this);
        } finally {
            this.dispose();
        }
    }
}