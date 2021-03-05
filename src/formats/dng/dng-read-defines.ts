import {DefinesCreator} from '../../defines/defines-creator';
import {MagickFormat} from '../../magick-format';
import {DngOutputColor} from './dng-output-color';
import {IDefine} from '../../defines/define';

export class DngReadDefines extends DefinesCreator {

  constructor () {
    super(MagickFormat.Dng);
  }

  disableAutoBrightness?: boolean;

  outputColor?: DngOutputColor;

  useAutoWhitebalance?: boolean;

  useCameraWhitebalance?: boolean;

  getDefines (): IDefine[] {
    const defines: IDefine[] = [];

    if (this.hasValue(this.disableAutoBrightness)) {
      defines.push(this.createDefine('no_auto_bright', this.disableAutoBrightness as boolean));
    }

    if (this.hasValue(this.outputColor)) {
      defines.push(this.createDefine('output_color', this.outputColor as number));
    }

    if (this.hasValue(this.useCameraWhitebalance)) {
      defines.push(this.createDefine('use_camera_wb', this.useCameraWhitebalance as boolean));
    }

    if (this.hasValue(this.useAutoWhitebalance)) {
      defines.push(this.createDefine('use_auto_wb', this.useAutoWhitebalance as boolean));
    }

    return defines;
  }

  private hasValue (value: boolean | DngOutputColor | undefined): boolean {
    return value !== undefined && value !== null;
  }
}