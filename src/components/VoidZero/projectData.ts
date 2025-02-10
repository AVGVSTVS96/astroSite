export interface Projects {
  name: string;
  description: string;
  url: string;
  github: string;
  icon: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export const projects = [
  {
    name: 'Vite',
    description: 'The Build Tool for the Web',
    url: 'https://vite.dev',
    github: 'https://github.com/vitejs/vite',
    icon: 'vite',
    stats: [
      { label: 'GitHub Stars', value: '69.8k' },
      { label: 'Contributors', value: '1082' },
    ],
  },
  {
    name: 'Vitest',
    description: 'Next-Generation Test Runner',
    url: 'https://vitest.dev',
    github: 'https://github.com/vitest-dev/vitest',
    icon: 'vitest',
    stats: [
      { label: 'GitHub Stars', value: '13.58k' },
      { label: 'Contributors', value: '541' },
    ],
  },
  {
    name: 'Rolldown',
    description: 'The Fastest JavaScript Bundler',
    url: 'https://rolldown.rs',
    github: 'https://github.com/rolldown/rolldown',
    icon: 'rolldown',
    stats: [
      { label: 'GitHub Stars', value: '9.6k' },
      { label: 'Contributors', value: '95' },
    ],
  },
  {
    name: 'Oxc',
    description: 'The Fastest JavaScript Bundler',
    url: 'https://oxc.rs',
    github: 'https://github.com/oxc/oxc',
    icon: 'oxc',
    stats: [
      { label: 'GitHub Stars', value: '13.0k' },
      { label: 'Contributors', value: '179' },
    ],
  },
] as const satisfies readonly Projects[];

