import {ImageMagick} from '../../../src/image-magick'
import {MagickImage} from '../../../src/magick-image'
import {MagickReadSettings} from '../../../src/settings/magick-read-settings'
import {MagickFormat} from '../../../src/magick-format'
import {AlphaOption} from '../../../src/alpha-option'

let image: MagickImage;

beforeEach(() => {
  ImageMagick._api = (global as any).native;
  image = MagickImage.create();
});

afterEach(() => {
  image.dispose();
});

describe('DdsReadDefines', () => {
  it('should set the define', () => {
    const settings = new MagickReadSettings();

    image.read('logo:', settings);
    image.alpha(AlphaOption.Set)
    image.settings.setDefines({
      defines: [
        {
          format: MagickFormat.Dds,
          name: 'compression',
          value: 'DXT5'
        }
      ]
    });
    image.write(data => {
      console.log(image.compression)
      console.log(image.settings._options)
      image.read(data);
      console.log(image.compression);
    }, MagickFormat.Dds);
  });
});
