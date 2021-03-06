import { IDefine } from './define';
import { MagickFormat } from '../magick-format';

export class MagickDefine implements IDefine {
    constructor (format: MagickFormat, name: string, value: string) {
        this.format = format;
        this.name = name;
        this.value = value;
    }

    readonly format: MagickFormat;

    readonly name: string;

    readonly value: string;
}