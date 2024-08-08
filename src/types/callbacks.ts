/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IMagickImage } from "../magick-image";
import { IMagickImageCollection } from "../magick-image-collection";

export type AsyncImageCallback<TReturnType> = (image: IMagickImage) => Promise<TReturnType>;
export type SyncImageCallback<TReturnType> = (image: IMagickImage) => TReturnType;
export type ImageCallback<TReturnType> = (image: IMagickImage) => TReturnType | Promise<TReturnType>;

export type AsyncImageCollectionCallback<TReturnType> = (images: IMagickImageCollection) => Promise<TReturnType>;
export type SyncImageCollectionCallback<TReturnType> = (images: IMagickImageCollection) => TReturnType;
export type ImageCollectionCallback<TReturnType> = (images: IMagickImageCollection) => TReturnType | Promise<TReturnType>;
