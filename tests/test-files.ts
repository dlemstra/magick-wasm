/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorProfile } from '@src/profiles/color/color-profile';
import { IMagickColor } from '@src/magick-color';
import { MagickColors } from '@src/magick-colors';
import { MagickImage, IMagickImage } from '@src/magick-image';
import { MagickImageCollection, IMagickImageCollection } from '@src/magick-image-collection';
import { readFileSync } from 'node:fs';

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

        return this._image.clone(func);
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
        return MagickImage.create()._use(func);
    }
}

class EmptyTestImageCollection {
    use<TReturnType>(func: (images: IMagickImageCollection) => TReturnType): TReturnType;
    use<TReturnType>(func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
    use<TReturnType>(func: (images: IMagickImageCollection) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        return MagickImageCollection.create()._use(func);
    }
}

export class TestFile {
    readonly data: Buffer;

    constructor(fileName: string) {
        this.data = readFileSync(fileName);
    }
}

export class TestColorProfile extends TestFile {
    constructor(fileName: string) {
        super(fileName);
    }

    load(): ColorProfile {
        return new ColorProfile(this.data);
    }
}

export class TestFont extends TestFile {
    readonly name: string;

    constructor(name: string, fileName: string) {
        super(fileName);

        this.name = name;
    }
}

export class TestFiles {
    static readonly Fonts = {
        kaushanScriptRegularTtf: new TestFont('KaushanScript', 'tests/files/fonts/KaushanScript-Regular.ttf'),
    }

    static readonly Images = {
        empty: new EmptyTestImage(),
        emptyCollection: new EmptyTestImageCollection(),
        empty150x150Canvas: new TestImageFromColor(MagickColors.White, 150, 150),
        cmykJpg: new TestImage('tests/files/images/cmyk.jpg'),
        connectedComponentsPng: new TestImage('tests/files/images/connected-components.png'),
        fujiFilmFinePixS1ProJpg: new TestImage('tests/files/images/fuji-film-fine-pix-s1-pro.jpg'),
        imageMagickJpg: new TestImage('tests/files/images/image-magick.jpg'),
        movingHoleGif: new TestImageCollection('tests/files/images/moving-hole.gif'),
        redPng: new TestImage('tests/files/images/red.png'),
        roseSparkleGif: new TestImageCollection('tests/files/images/röse-sparkle.gif'),
        warningJpg: new TestImage('tests/files/images/warning.jpg'),

        Builtin: {
            logo: new BuiltinTestImage('logo:'),
            rose: new BuiltinTestImage('rose:'),
            wizard: new BuiltinTestImage('wizard:'),
        },

        Color: {
            red: new TestImageFromColor(MagickColors.Red, 1, 1),
            black: new TestImageFromColor(MagickColors.Black, 1, 1),
            purple: new TestImageFromColor(MagickColors.Purple, 1, 1),
            white: new TestImageFromColor(MagickColors.Black, 2, 2),
        }
    }

    static readonly Profiles = {
        Color: {
            SRGB: new TestColorProfile('tests/files/color-profiles/SRGB.icm'),
            USWebCoatedSWOP: new TestColorProfile('tests/files/color-profiles/USWebCoatedSWOP.icc'),
        }
    }
}
