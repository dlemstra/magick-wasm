import {DngReadDefines} from '../../../src/formats/dng/dng-read-defines'
import {MagickReadSettings} from '../../../src/settings/magick-read-settings'
import {MagickFormat} from '../../../lib/magick-format'
import {DngOutputColor} from '../../../src/formats/dng/dng-output-color'

let readSettings: MagickReadSettings;

beforeEach(() => {
  readSettings = new MagickReadSettings();
});

describe('DngReadDefines', () => {
  it('constructor should not set any defines', () => {
    readSettings.setDefines(new DngReadDefines());

    expect(readSettings.getDefine(`${MagickFormat.Dng}:use_camera_wb`)).toBeNull();
    expect(readSettings.getDefine(`${MagickFormat.Dng}:use_auto_wb`)).toBeNull();
    expect(readSettings.getDefine(`${MagickFormat.Dng}:no_auto_bright`)).toBeNull();
    expect(readSettings.getDefine(`${MagickFormat.Dng}:output_color`)).toBeNull();
  });

  it('should set define when disable auto brightness has been set', () => {
    const dngReadDefines = new DngReadDefines();
    dngReadDefines.disableAutoBrightness = true;

    readSettings.setDefines(dngReadDefines);

    expect(readSettings.getDefine(`${MagickFormat.Dng}:no_auto_bright`)).toBe('true');
  });

  it('should set define when use camera white balance has been set', () => {
    const dngReadDefines = new DngReadDefines();
    dngReadDefines.useCameraWhitebalance = true;

    readSettings.setDefines(dngReadDefines);

    expect(readSettings.getDefine(`${MagickFormat.Dng}:use_camera_wb`)).toBe('true');
  });

  it('should set define when use auto white balance has been set', () => {
    const dngReadDefines = new DngReadDefines();
    dngReadDefines.useAutoWhitebalance = true;

    readSettings.setDefines(dngReadDefines);

    expect(readSettings.getDefine(`${MagickFormat.Dng}:use_auto_wb`)).toBe('true');
  });

  it('should set define when output color has been set', () => {
    const dngReadDefines = new DngReadDefines();
    dngReadDefines.outputColor = DngOutputColor.KodakProPhotoRGB;

    readSettings.setDefines(dngReadDefines);

    expect(readSettings.getDefine(`${MagickFormat.Dng}:output_color`)).toBe('4');
  });
});
