---
title: 'How I used Astro to build this website'
description: 'This is my first blog post, it describes several fundamental concepts I learned and used to build this website using Astro and TailwindCSS, such as Astro layouts and components, markdown styling, and variables in Astro.'
pubDate: 'June 7, 2023'
author: 'Bassim Shahidy'
tags: ['blog', 'astro', 'tailwindcss']
layout: '@layouts/MDLayout.astro'
---

---

[Astro]: https://astro.build
[TailwindCSS]: https://tailwindcss.com/

I chose to build this site with [Astro][] and [TailwindCSS][] for several reasons. Astro is an excellent framework to build a portfolio website with and is a joy to work with thanks to it's rich documentation and intuitive structure. It allows for progressive enhancement, gradually adding new and more complex features to the site as I learn more about web development and Astro's features.

TailwindCSS provides a well thought out design system that speeds up development by abstracting CSS classes into utility classes designed to be used in conjunction with each other. This promotes a consistent design system and speeds up development.

## Layouts

In Astro, layouts are used to create a base structure for pages which can include the websites main components and styling like navbars, footers, and the main color scheme. Layouts can also be used to import other layouts, allowing for a nested layout structure; for example, a base layout containing HTML boilerplate and SEO, and a markdown layout which provides styling and compoents for blog posts and articles.

### Base Layout

I first created a `BaseLayout.astro` file to set up the basic structure of my pages. This layout includes the HTML boilerplate, head section, my [navbar][] and [footer][] components, and a `<slot />` tag where the page's content is inserted. A named `<slot />` tag is also used in the head section to allow for the insertion of additional page specific head elements like schema data and meta tags.

In this layout I'm using `Astro.props` to pass the title and description of the page to the layout. This allows the these fields to be set dynamically based on each page's content.

[navbar]: #nav-bar-component
[footer]: #creating-a-footer-with-the-current-year-and-a-link-to-github

```astro title="layouts/BaseLayout.astro" {17, 21}
---
import Footer from '@components/Footer.astro';
import NavBar from '@components/NavBar.astro';
import '@styles/global.css';

const { description, title } = Astro.props;
---

<html lang="en" class="dark min-h-dvh scroll-pt-16">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="generator" content={Astro.generator} />
    <meta name="description" content={description} />
    <title>{title}</title>
    <slot name="head" />
  </head>
  <body class="flex flex-col items-center">
    <NavBar />
    <slot />
    <Footer />
  </body>
  <style>
    :root {
      @apply bg-primary-50;
    }

    :root.dark {
      @apply bg-primary-950;
    }
  </style>
</html>
```

### Main Layout

I then created a `MainLayout.astro` file which imports my base layout, defines the schema data for my website's main pages, and passes metadata like the title and description to the base layout's meta tags.

To pass page specific metadata to the base layout, I use the spread operator with `Astro.props` allowing all properties defined on the main layout component to be available to the base layout.

```astro title="layouts/MainLayout.astro" {5}
---
import BaseLayout from '@layouts/BaseLayout.astro';
---

<BaseLayout {...Astro.props}>
  <script slot="head" type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "mainEntity": {
        "@type": "Person",
        "name": "Bassim Shahidy",
        "alternateName": "bassimshahidy",
        "description": "IT Technician at NYC Bar Association",
        "sameAs": [
          "https://www.linkedin.com/in/bassimshahidy",
          "https://github.com/avgvstvs96"
        ]
      },
      "jobTitle": "IT Technician",
      "worksFor": {
        "@type": "Organization",
        "name": "NYC Bar Association"
      },
      "url": "https://bassimshahidy.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "bassim@bassimshahidy.com",
        "contactType": "professional"
      }
    }
  </script>
  <slot />
</BaseLayout>
```

On each page, the title and description props are defined on the main layout component, and are then passed to the base layout.

```astro title="pages/index.astro" {2-3}
<MainLayout
  title="Bassim Shahidy"
  description="Bassim Shahidy's personal website"
/>
```

### Markdown Layout

I also created a `MDLayout.astro` file to define the styling and structure for blog posts. This layout is a lot more complex than the main layout, it includes styling for markdown content, a table of contents, post specific schema data, and image handling.

```astro title="layouts/MDLayout.astro" {2, 5, 8-12, 19-23, 50, 68-73}
---
const { frontmatter, headings } = Astro.props;
import TableOfContents from '@components/TableOfContents.astro';
import BaseLayout from '@layouts/BaseLayout.astro';
import { Image } from 'astro:assets';
import type { ImageMetadata } from 'astro';

const isoDate = new Date(frontmatter.pubDate).toISOString().substring(0, 10);
const imageUrl = new URL(frontmatter.image, Astro.request.url).href;
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/images/*.{jpeg,jpg,png,gif}'
);
if (frontmatter.image && !images[frontmatter.image])
  throw new Error(`"${frontmatter.image}" does not exist in images directory"`);

const jsonLD = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: frontmatter.title,
  description: frontmatter.description,
  ...(frontmatter.image ? { image: imageUrl } : {}),
  url: Astro.request.url,
  datePublished: isoDate + 'T08:00:00-05:00',
  author: {
    '@type': 'Person',
    name: 'Bassim Shahidy',
    jobTitle: 'IT Technician',
    worksFor: {
      '@type': 'Organization',
      name: 'NYC Bar Association',
    },
    description:
      'Bassim Shahidy is an IT specialist with experience in information technologies, audio visual technologies, and computer science. Bassim also has a vast set of academic interests including history, political science, and philosophy.',
    url: 'https://bassimshahidy.com',
    sameAs: [
      'https://www.linkedin.com/in/bassimshahidy',
      'https://github.com/avgvstvs96',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'bassim@bassimshahidy.com',
      contactType: 'professional',
    },
  },
};

const schema = JSON.stringify(jsonLD, null, 2);
---

<BaseLayout {...frontmatter}>
  <script slot="head" type="application/ld+json" set:html={schema} />
  <div class="mx-6 flex justify-center">
    <div class="xl:w-[240px]"></div>
    <article
      class="prose max-w-sm dark:prose-invert prose-h1:pt-2 prose-a:decoration-accent-400 prose-a:underline-offset-[3px] prose-a:transition-colors prose-a:duration-100 hover:prose-a:text-accent-300 prose-code:font-normal prose-code:text-accent-600
      prose-hr:border-accent-500 prose-code:dark:text-accent-400 dark:prose-hr:border-accent-400 dark:prose-hr:border-opacity-60 sm:max-w-lg
      md:max-w-xl
      lg:max-w-2xl xl:max-w-3xl">
      <div class="mb-1 flex justify-start">
        <span
          class="written-by max-w-fit rounded-md bg-accent-300/25 px-2 py-1 text-sm text-accent-500 dark:bg-accent-700/25 dark:text-accent-400">
          Written by {frontmatter.author} on {frontmatter.pubDate}
        </span>
      </div>
      <h1>{frontmatter.title}</h1>
      {
        frontmatter.image && (
          <Image
            src={images[frontmatter.image]()}
            width={frontmatter.image.width}
            height={frontmatter.image.height}
            alt={frontmatter.title}
          />
        )
      }
      <p>{frontmatter.description}</p>
      <slot />
    </article>
    <div
      class="hidden min-h-full prose-a:transition-colors prose-a:duration-100 lg:block">
      <TableOfContents headings={headings} />
    </div>
  </div>
</BaseLayout>
```

#### Frontmatter and Astro.props

Frontmatter variables defined in markdown files make post specific metadata available to the `Astro.props` object: `const { frontmatter } = Astro.props;`

This allows these values to be accessed by the base layout's `{description}` and `{title}` variables by spreading `{...frontmatter}` into it.

#### SEO Schema

I created a JSON-LD object to define the schema data for each blog post. This object uses values from the frontmatter to set the headline, description, and date published from each blog post and includes the post's image if it exists.

The published date is formatted to be compatible with the ISO 8601 standard to comply with Google's schema specifications and the image URL is created for locally hosted images using the `new URL()` method to provide a full image URL to the schema based on the current page's URL.

#### Image Optimization

Images are optimized using the Astro `Image` component. In order to optimize each post's images dynamically, they need to be imported into the layout file's `Image` component. I used the `import.meta.glob` function to selectively import a post's image from the `/src/images` directory by filtering through them using the `frontmatter.image` value, then imported the image using `{images[frontmatter.image]()}`.

### Importing Layouts

Layouts are imported differently depending on the file type.

#### Markdown Files

```astro title="pages/posts/blog1.md"
---
layout: '../../layouts/MDLayout.astro';
---
```

#### Astro Files

```astro title="pages/index.astro"
---
import MainLayout from '../layouts/MainLayout.astro';
---
```

---

## Markdown styling

TailwindCSS resets default browser styles so all HTML elements rendered from markdown look like plain text. To style markdown, I used the official [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) plugin which provides well thought out, opinionated markdown styling.

```js title="tailwind.config.cjs"
module.exports = {
  plugins: [require('@tailwindcss/typography')],
};
```

Prose is the main utility class used to style markdown. There are a wide range of prose modifiers that can be used to change the look of the content such as `prose-sm` to make the text smaller or `prose-lg` to make it larger and modifiers to target each element type like `prose-h1` or `prose-headings` to target all headings. In addition `prose-invert` changes the default color of all text to white as opposed to.

```html title="layouts/MDLayout.astro"
<article
  class="prose-hr:border-accent prose prose-invert prose-h1:pt-2"></article>
```

### Syntax Highlighting

By default Astro will highlight any code in markdown files. Changing the code syntax highlighting theme in Astro is easy, I just needed to add a shikiConfig object to the astro.config.mjs file and set the desired theme.

```js title="astro.config.mjs" {6-7}
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'material-theme-ocean',
    },
  },
  integrations: [tailwind()],
});
```

---

## Card Component

To display content, I created a customizable `Card` component. This component accepts a variety of props which can be used to configure the component for the page it's being imported into.

The `Card` also conditionally renders title, subtitle, and heading if they are provided to the component. If not, only content passed to the `slot` is rendered within the `Card`.

There are also variable styles which can be defined based on the props passed. For example, `padding` sets a default padding value to `card-p`, a custom TailwindCSS `@layer component` I created to define card padding. The `padding` prop can also be set to a custom value when the component is called in a file, overriding the default value.

The `variant` prop defines whether or not the `Card` has a border, it's two values being bordered and borderless. When this prop isn't set, the `Card` defaults to bordered.

`noMargin` removes the component's default `mx-4` margins. I use this to remove margins for smaller `Card` components like my `Projects` component.

`displayHr` displays a horizontal divider between the title, subtitle and main card content.

And the `class` prop allows me to pass any custom classes I want when calling this component in a file.

```astro title="components/Card.astro"
---
interface Props {
  title?: string;
  subtitle?: string;
  heading?: string;
  variant: 'bordered' | 'borderless';
  displayHr?: boolean;
  padding?: string;
  class?: string;
  noMargin?: boolean;
}

const {
  title,
  subtitle,
  heading,
  variant,
  displayHr,
  padding = 'card-p',
  class: className,
  noMargin = false,
} = Astro.props;
---

<div
  class={`prose prose-slate dark:prose-invert max-w-3xl rounded-lg prose-h2:font-semibold prose-h2:opacity-80 dark:prose-h2:opacity-60 ${padding} ${className} ${noMargin ? '' : 'mx-4'} ${
    variant === 'borderless' ? '' : 'border-card'
  }`}>
  {title && <h1 class="mb-2">{title}</h1>}
  {subtitle && <h2 class="mt-0">{subtitle}</h2>}
  {displayHr && <hr class="mb-8 border-accent-500" />}
  {heading && <h3 class="mb-1">{heading}</h3>}
  <slot name="content" />
</div>
<style>
  html.light {
    @apply prose-headings:text-dark;
  }
</style>
```

The `Card` uses a `<slot>` to insert any type or amount of HTML elements when the component is called in a file.

```astro
<slot name="content" />
```

When inserting new elements, `name="content"` is defined on them to identify all elements to be rendered within the `<slot>` element. A single wrapper div can also be defined with `name="content"` and any elements wrapped by that div will be slotted into the `Card` component.

```astro title="pages/index.astro" {4-5}
<Card
  title="Bassim Shahidy"
  subtitle="IT Technician at the New York City BAR Association">
  <p slot="content" class="text-lg">lorem ipsum</p>
  <p slot="content">lorem ipsum</p>
</Card>
```

### Using the `Card` component in pages

This example shows how I implemented the `<Card />` component on my `index.astro` page. The component is imported in the frontmatter with `import Card from '@components/Card.astro';` and is used to wrap the main content on my page. In this page I set the `variant` prop to `borderless`, passed a title and subtitle, and created a couple `<p>` elements with `slot="content"` so they're properly slotted into the `Card` component.

```astro title="pages/index.astro"
<Card
  title="Bassim Shahidy"
  subtitle="IT Specialist at the New York City BAR Association"
  variant="borderless">
  <p slot="content">
    Based in NY, I'm an IT Professional with a wealth of experience in hardware,
    software management, network operations, cybersecurity, and audio-visual
    systems. Currently, my focus is on advancing my skillset in software
    engineering and web development, utilizing the latest programming
    technologies to enhance user experiences and system performance.
  </p>
  <p slot="content">
    In addition, I'm exploring AI and machine learning, seeking to understand
    and apply these technologies in practical scenarios. My technical repertoire
    also includes 3D printing—where I skillfully build and maintain printers for
    precision parts—and drone building, where I apply my electronics and
    software knowledge to create and pilot high-performance drones.
  </p>
</Card>
```

## Projects component

I created a `Projects` component to display web development projects I've worked on. In this component I used the `Card` component within a function that displays each project in it's in an unordered list. I customized the card for this component by setting it to `bordered`, with a custom padding value passed to the `padding` prop, and `noMargin` set to `true`

```astro title="components/projects.astro {3-4}
<ul class="grid list-none gap-4 pl-0 md:grid-cols-2">
  {
    projects.map((project) => (
      <Card variant="bordered" padding="p-3.5" noMargin={true}>
        <div slot="content">
          <a
            class="flex items-center justify-between text-[1.2rem] font-semibold no-underline"
            href={project.data.url}>
            <span class="dark:text-light hover:dark:text-muted-light/75">
              {project.data.title}
            </span>
            <Icon
              name="github"
              class="mx-2 size-5 opacity-70 hover:opacity-100"
            />
          </a>
          <p class="mt-2.5 line-clamp-2 text-[0.925rem]">
            {project.data.description}
          </p>
          <div class="flex flex-wrap gap-2">
            {project.data.tags.map((tag) => (
              <div class="rounded-xl border border-accent-400 bg-accent-50 px-2 py-1 text-sm text-accent-700/85 dark:border-accent-500/15 dark:bg-accent-500/10 dark:text-accent-300">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </Card>
    ))
  }
</ul>
```

### Using Astro's Content Collections

My projects utilize Astro's content collections, each project is defined as a single `YAML` file within a `content/projects` directory and are made available to the `Projects` component with `const projects = await getCollection('projects');`

```yaml
title: FlaskGPT
description: A customizable GPT-3.5/4 chat application built with Flask and plain HTML, CSS, and JavaScript
tags: [Flask, OpenAI, Python, JavaScript]
url: https://github.com/AVGVSTVS96/flaskGPT
```

Now, when I want to add a new project, all I have to do is create a new `YAML` file with my project's information in `/projects` and it will automatically be rendered within a card in the `Projects` component.
