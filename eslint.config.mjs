import { defineConfig } from "eslint/config";
import pluginLicenseHeader from "eslint-plugin-license-header";
import pluginTypescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default defineConfig([{
    files: [
        "**/*.ts"
    ],

    ignores: [
        "deno/*",
        "dist/*",
        "issue/*",
    ],

    plugins: {
        "@eslint-plugin-license-header": pluginLicenseHeader,
        "@typescript-eslint": pluginTypescriptEslint,
    },

    extends: [
        "@typescript-eslint/eslint-recommended",
        "@typescript-eslint/recommended",
    ],

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
}]);
