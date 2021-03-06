import {IDefines} from './defines';
import {IDefine} from './define';
import {MagickFormat} from '../magick-format';
import {MagickDefine} from './magick-define';

export abstract class DefinesCreator implements IDefines {
  format: MagickFormat;

  constructor (format: MagickFormat) {
    this.format = format;
  }

  createDefine(name: string, value: boolean): MagickDefine;
  createDefine(name: string, value: number): MagickDefine;
  createDefine(name: string, value: string): MagickDefine;
  createDefine(name: string, value: boolean | number | string): MagickDefine {
    if (typeof value === 'boolean') {
      return new MagickDefine(this.format, name, value ? 'true' : 'false');
    } else if (typeof value === 'string') {
      return new MagickDefine(this.format, name, value);
    } else {
      return new MagickDefine(this.format, name, value.toString());
    }
  }

  abstract getDefines (): IDefine[]
}