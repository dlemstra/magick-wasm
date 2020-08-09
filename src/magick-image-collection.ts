/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from "./image-magick";
import { MagickImage } from "./magick-image";
import { MagickSettings } from "./settings/magick-settings";

export class MagickImageCollection extends Array<MagickImage> {
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

    static create(): MagickImageCollection {
        return Object.create(MagickImageCollection.prototype);
    }

    /** @internal */
    static _createFromImages(images: number, settings: MagickSettings): MagickImageCollection {
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
    _use(func: (images: MagickImageCollection) => void): void;
    _use(func: (images: MagickImageCollection) => Promise<void>): Promise<void>;
    _use(func: (images: MagickImageCollection) => void | Promise<void>): void | Promise<void> {
        try {
            return func(this);
        } finally {
            this.dispose();
        }
    }
}