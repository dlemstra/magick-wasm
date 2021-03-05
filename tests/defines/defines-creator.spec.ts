import {MagickReadSettings} from '../../src/settings/magick-read-settings';
import {DefinesCreator} from '../../src/defines/defines-creator';
import {MagickFormat} from '../../src/magick-format';
import {IDefine} from '../../lib/defines/define';

class TestDefinesCreator extends DefinesCreator {
  constructor () {
    super(MagickFormat.A);
  }

  getDefines (): IDefine[] {
    return [this.createDefine("test", "empty")];
  }
}

class ListDefinesCreator extends DefinesCreator {
  constructor () {
    super(MagickFormat.A);
  }

  getDefines (): IDefine[] {
    return [this.createDefine("test", ['a', 'b', 'c']) as IDefine];
  }
}

describe('DefinesCreator', () => {
  it('should return correct define', () => {
    const readSettings = new MagickReadSettings();
    readSettings.setDefines(new TestDefinesCreator());

    expect(readSettings.getDefine(`${MagickFormat.A.toString()}:test`)).toBe("empty");
  });

  it('should convert list of values for define as comma separated values', () => {
    const readSettings = new MagickReadSettings();
    readSettings.setDefines(new ListDefinesCreator());

    expect(readSettings.getDefine(`${MagickFormat.A.toString()}:test`)).toBe("a,b,c");
  });
});