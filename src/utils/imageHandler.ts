import type { ImageMetadata } from 'astro';

export const imagesImport = import.meta.glob<{ default: ImageMetadata }>(
  '/src/images/*.{jpeg,jpg,png,gif}'
);

const resolvedImages = await Promise.all(
  Object.entries(imagesImport).map(async ([key, value]) => [
    key.split('/').pop(),
    (await value()).default,
  ])
);
export const images = Object.fromEntries(resolvedImages);

//////////////////////////////////////////////

// export function validateImage(data: any) {
//   if (data.image && !images[data.image.url]) {
//     throw new Error(`"${data.image.url}" does not exist in images directory"`);
//   }
// }
