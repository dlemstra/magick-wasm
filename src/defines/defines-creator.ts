import {IDefines} from './defines';
import {IDefine} from './define';
import {MagickFormat} from '../magick-format';
import {MagickDefine} from './magick-define';

interface IHasToString {
  toString(): string
}

export abstract class DefinesCreator implements IDefines {
  format: MagickFormat;

  constructor (format: MagickFormat) {
    this.format = format;
  }

  createDefine(name: string, value: boolean): MagickDefine;
  createDefine(name: string, value: number): MagickDefine;
  createDefine(name: string, value: string): MagickDefine;
  createDefine(name: string, value: unknown[]): MagickDefine | null;
  createDefine(name: string, value: boolean | number | string | unknown[]): MagickDefine | null {
    if (typeof value === 'boolean') {
      return new MagickDefine(this.format, name, value ? 'true' : 'false');
    } else if (typeof value === 'string') {
      return new MagickDefine(this.format, name, value);
    } else if (typeof value === 'number') {
      return new MagickDefine(this.format, name, value.toString());
    } else {
      if (value === null) {
        return null;
      }

      const values = value.map(v => {
        if (this.hasToString(v)) {
          return v.toString();
        }
      });
      if (values.length === 0) {
        return null;
      }

      return new MagickDefine(this.format, name, values.join(','));
    }
  }

  abstract getDefines (): IDefine[]

  private hasToString(obj: unknown): obj is IHasToString {
    return (obj as IHasToString).toString !== undefined
      && typeof (obj as IHasToString).toString === 'function';
  }
}