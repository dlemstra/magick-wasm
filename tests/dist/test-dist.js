// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const colorReset = '\x1b[0m';
const colorGreen = '\x1b[32m';
const colorRed = '\x1b[31m';

const versionRegEx =
  /^ImageMagick \d+\.\d+\.\d+-\d+ Q8 x86_64 [\w\d]+:[\w\d]+ https:\/\/imagemagick\.org$/;

let foundError = false;

async function runTest(filename) {
  try {
    return await exec(`node ${filename}`);
  } catch (error) {
    return {
      stdout: '',
      stderr: error.stderr,
    };
  }
}

async function testDistFile(filename) {
  const { stdout, stderr } = await runTest(filename);

  const name = filename.substring(5, 8);

  if (stdout.trim().match(versionRegEx)) {
    console.log(`${colorGreen}${name} build passed${colorReset}`);
    return;
  }

  foundError = true;

  console.error(`${colorRed}${name} build failed:${colorReset}`);
  console.error(
    stderr || `"${stdout.trim()}"\ndoes not match\n${versionRegEx}`
  );
}

async function testDist() {
  console.log('');

  await testDistFile('test-ESM.mjs');
  await testDistFile('test-CJS.js');

  if (foundError) process.exit(1);

  console.log('');
}

testDist();
