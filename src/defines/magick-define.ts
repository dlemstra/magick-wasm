import {IDefine} from './define';
import {MagickFormat} from '../magick-format';

export class MagickDefine implements IDefine {
  format: MagickFormat;
  name: string;
  value: string;

  constructor (format: MagickFormat, name: string, value: string) {
    this.format = format;
    this.name = name;
    this.value = value;
  }
}