import type { CollectionEntry } from 'astro:content';

type Project = CollectionEntry<'projects'>;

export const fetchPackageVersion = async (packageName: string): Promise<string | null> => {
  try {
    const response = await fetch(`https://registry.npmjs.org/${packageName}/latest`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.version;
  } catch (error) {
    console.error(`Error fetching version for ${packageName}:`, error instanceof Error ? error.message : String(error));
    return null;
  }
};

export const getPackageVersions = async (projects: Project[]): Promise<Map<string, string | null>> => {
  const versions = new Map<string, string | null>();
  for (const project of projects) {
    if (project.data.package) {
      const version = await fetchPackageVersion(project.data.title);
      versions.set(project.id, version);
    }
  }
  return versions;
};