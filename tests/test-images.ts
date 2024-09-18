/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { readFileSync } from 'node:fs';
import { IMagickColor } from '@src/magick-color';
import { MagickColors } from '@src/magick-colors';
import { MagickImage, IMagickImage } from '@src/magick-image';
import { MagickImageCollection, IMagickImageCollection } from '@src/magick-image-collection';

interface Cloneable<T> {
    clone<TReturnType>(func: (clone: T) => TReturnType): TReturnType;
    clone<TReturnType>(func: (clone: T) => Promise<TReturnType>): Promise<TReturnType>;
}

abstract class TestImageBase<TImageType extends Cloneable<TImageType>> {
    private _image: TImageType | undefined;

    use<TReturnType>(func: (image: TImageType) => TReturnType): TReturnType;
    use<TReturnType>(func: (image: TImageType) => Promise<TReturnType>): Promise<TReturnType>;
    use<TReturnType>(func: (image: TImageType) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        if (this._image === undefined)
            this._image = this.load();

        return this._image.clone(image => {
            return func(image);
        });
    }

    abstract load(): TImageType;
}

class BuiltinTestImage extends TestImageBase<IMagickImage> {
    private readonly _name: string;

    constructor(name: string) {
        super();

        this._name = name;
    }

    load() {
        return MagickImage.create(this._name);
    }
}

class TestImage extends TestImageBase<IMagickImage> {
    readonly data: Uint8Array;

    constructor(fileName: string) {
        super();

        this.data = new Uint8Array(readFileSync(fileName));
    }

    load() {
        return MagickImage.create(this.data);
    }
}

class TestImageCollection extends TestImageBase<IMagickImageCollection> {
    readonly data: Uint8Array;

    constructor(fileName: string) {
        super();

        this.data = new Uint8Array(readFileSync(fileName));
    }

    load() {
        return MagickImageCollection.create(this.data);
    }
}

class TestImageFromColor extends TestImageBase<IMagickImage> {
    private readonly _color: IMagickColor;
    private readonly _height: number;
    private readonly _width: number;

    constructor(color: IMagickColor, width: number, height: number) {
        super();

        this._color = color;
        this._width = width;
        this._height = height;
    }

    load(): IMagickImage {
        return MagickImage.create(this._color, this._width, this._height);
    }
}

class EmptyTestImage {
    use<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
    use<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    use<TReturnType>(func: (image: IMagickImage) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        return MagickImage.create()._use(image => {
            return func(image);
        });
    }
}

class EmptyTestImageCollection {
    use<TReturnType>(func: (images: IMagickImageCollection) => TReturnType): TReturnType;
    use<TReturnType>(func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
    use<TReturnType>(func: (images: IMagickImageCollection) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        return MagickImageCollection.create()._use(images => {
            return func(images);
        });
    }
}

export class TestImages {
    static readonly empty = new EmptyTestImage();
    static readonly emptyCollection = new EmptyTestImageCollection();
    static readonly empty150x150Canvas = new TestImageFromColor(MagickColors.White, 150, 150);
    static readonly cmykJpg = new TestImage('tests/images/cmyk.jpg');
    static readonly connectedComponentsPng = new TestImage('tests/images/connected-components.png');
    static readonly fujiFilmFinePixS1ProJpg = new TestImage('tests/images/fuji-film-fine-pix-s1-pro.jpg');
    static readonly imageMagickJpg = new TestImage('tests/images/image-magick.jpg');
    static readonly movingHoleGif = new TestImageCollection('tests/images/moving-hole.gif');
    static readonly redPng = new TestImage('tests/images/red.png');
    static readonly roseSparkleGif = new TestImageCollection('tests/images/röse-sparkle.gif');
    static readonly warningJpg = new TestImage('tests/images/warning.jpg');

    static Builtin = class {
        static readonly logo = new BuiltinTestImage('logo:');
        static readonly rose = new BuiltinTestImage('rose:');
        static readonly wizard = new BuiltinTestImage('wizard:');
    }

    static Color = class {
        static readonly red = new TestImageFromColor(MagickColors.Red, 1, 1);
        static readonly black = new TestImageFromColor(MagickColors.Black, 1, 1);
        static readonly purple = new TestImageFromColor(MagickColors.Purple, 1, 1);
        static readonly white = new TestImageFromColor(MagickColors.Black, 2, 2);
    }
}
