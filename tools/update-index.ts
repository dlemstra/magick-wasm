// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import * as fs from 'fs';

function fileHasExports(fileName: string): boolean {
    const lines = fs.readFileSync(fileName, 'utf-8').split(/\r?\n/);

    let internal = false;
    for (const line of lines) {
        if (line.startsWith('/** @internal */')) {
            internal = true;
        } else if (line.startsWith('export ')) {
            if (internal === false)
                return true;
        } else {
            internal = false;
        }
    }

    return false;
}

function getFilesWithExports(dir: string) {
    let results: string[] = [];
    const list = fs.readdirSync(dir);

    for (const item of list) {
        const name = dir + '/' + item;
        const stat = fs.statSync(name);
        if (stat && stat.isDirectory())
            results = results.concat(getFilesWithExports(name));
        else if (fileHasExports(name))
            results.push(name);
    }

    return results;
}

const folder = process.argv[2];
const indexFile = `${folder}/index.ts`

if (!fs.existsSync(indexFile))
{
    console.error(`Unable to find ${indexFile}`);
    process.exit(1);
}

let newContent = ''

for (const fileName of getFilesWithExports(folder)) {
    if (fileName === indexFile)
        continue;

    const path = fileName.substring(folder.length, fileName.length - 3);
    newContent += `export * from '.${path}';\n`;
}

const oldContent = fs.readFileSync(indexFile, 'utf-8').replace('\r', '');
fs.writeFileSync(indexFile, newContent);

if (newContent !== oldContent) {
    console.error(`${indexFile} did not contain all exports.`);
    process.exit(1);
}
