// @deno-types='../dist/index.d.ts'
import {
    initializeImageMagick,
    ImageMagick,
    MagickFormat
} from '../dist/index.js'

const wasm = await Deno.readFile('../dist/magick.wasm');
await initializeImageMagick(wasm);

const inFile = '../tests/images/image-magick.jpg';
let data = await Deno.readFile(inFile);

const outFile = './example.png';
await ImageMagick.read(data, async (img) => {
  img.resize(42, 42);

  await img.write(MagickFormat.Png, (data) => Deno.writeFile(outFile, data));
});

data = await Deno.readFile(outFile);
await ImageMagick.read(data, async (img) => {
    console.log(`Converted ${inFile} to ${outFile} (${img.width}x${img.height}) with Deno ${Deno.version.deno}`)
});
