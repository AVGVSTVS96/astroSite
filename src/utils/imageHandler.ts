import type { ImageMetadata } from 'astro';

export const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/images/*.{jpeg,jpg,png,gif}'
);

// const resolvedImages = await Promise.all(
//   Object.entries(images).map(async ([key, value]) => [
//     key.split('/').pop(),
//     (await value()).default,
//   ])
// );
// export const imagesMap = Object.fromEntries(resolvedImages);

//////////////////////////////////////////////

// export function validateImage(data: any) {
//   if (data.image && !images[data.image.url]) {
//     throw new Error(`"${data.image.url}" does not exist in images directory"`);
//   }
// }
