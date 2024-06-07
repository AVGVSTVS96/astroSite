import type { ImageMetadata } from 'astro';

export function getImageUrl(data: any, baseUrl: string) {
  return new URL(data.image?.url, baseUrl).href;
}

export const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/images/*.{jpeg,jpg,png,gif}'
);

// export function validateImage(data: any) {
//   if (data.image && !images[data.image.url]) {
//     throw new Error(`"${data.image.url}" does not exist in images directory"`);
//   }
// }
