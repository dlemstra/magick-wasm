import {MagickFormat} from '../magick-format';

export interface IDefine {

  readonly format: MagickFormat;

  readonly name: string;

  readonly value: string;
}
