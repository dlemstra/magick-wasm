import js from "@eslint/js";
import path from "node:path";
import pluginLicenseHeader from "eslint-plugin-license-header";
import pluginTypescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "**/dist",
        "deno/*.ts",
        "demo/*.js",
        "issue/*.ts",
        "issue/*.js",
        "tools/*.js",
        "**/vite.config.ts",
    ],
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
), {
    plugins: {
        "@eslint-plugin-license-header": pluginLicenseHeader,
        "@typescript-eslint": pluginTypescriptEslint,
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: [
                "./tsconfig.json",
                "./demo/tsconfig.json",
                "./tests/tsconfig.json",
                "./tools/tsconfig.json",
            ],
        },
    },

    rules: {
        "@eslint-plugin-license-header/header": [
            "error",
            [
                "/*",
                "  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.",
                "  Licensed under the Apache License, Version 2.0.",
                "*/",
            ]
        ],
        "@typescript-eslint/no-duplicate-enum-values": "off",
    },
}];