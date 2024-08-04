/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { exec as execWithCallback } from 'node:child_process';
import { createRequire } from 'node:module';
import { promisify } from 'node:util';

const exec = promisify(execWithCallback);
const require = createRequire(import.meta.url);

const features = 'Cipher';

let foundError = false;

async function runTest(filename) {
  try {
    return await exec(`node ${require.resolve(filename)}`);
  } catch (error) {
    return {
      stdout: '',
      stderr: error.stderr,
    };
  }
}

async function testDistFile(filename) {
  const { stdout, stderr } = await runTest(filename);

  const name = filename.substring(7, 10);

  if (stdout.trim() === features) {
    console.log(`${name} build passed`);
    return;
  }

  foundError = true;

  console.error(`${name} build failed:`);
  console.error(stderr || `"${stdout.trim()}"\ndoes not match\n"${features}"`);
}

async function testDist() {
  await testDistFile('./test-ESM.js');
  await testDistFile('./test-CJS.cjs');

  if (foundError) process.exit(1);
}

testDist();
