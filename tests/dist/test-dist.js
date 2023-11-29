// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const features = 'Cipher';

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

  if (stdout.trim() === features) {
    console.log(`${name} build passed`);
    return;
  }

  foundError = true;

  console.error(`${name} build failed:`);
  console.error(stderr || `"${stdout.trim()}"\ndoes not match\n"${features}"`);
}

async function testDist() {
  await testDistFile('test-ESM.mjs');
  await testDistFile('test-CJS.js');

  if (foundError) process.exit(1);
}

testDist();
