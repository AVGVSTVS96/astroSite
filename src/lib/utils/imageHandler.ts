import type { ImageMetadata } from 'astro';

type ImageModule = { default: ImageMetadata };

const images: Record<string, () => Promise<ImageModule>> =
  import.meta.glob<ImageModule>('/src/images/*.{jpeg,jpg,png,gif}');

export function getImage(
  url: string | undefined
): Promise<ImageMetadata> | undefined {
  if (!url) return undefined;
  const imageModule = images[url];

  return imageModule ? imageModule().then((mod) => mod.default) : undefined;
}
