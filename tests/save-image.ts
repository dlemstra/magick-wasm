import { MagickImage } from "../src/magick-image";
import { MagickFormat } from "../src/magick-format";
import * as fs from "fs";

export function saveImage(image: MagickImage, fileName: string): void {
    const info = fileName.split('.');
    const format = info[info.length - 1].toUpperCase() as MagickFormat;
    image.write((data) => {
        fs.writeFileSync(fileName, data);
    }, format);
}