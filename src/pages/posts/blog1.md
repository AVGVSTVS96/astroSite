---
title: 'How I built this website'
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
    description="Bassim Shahidy's personal website">
</MainLayout>
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
      class="prose dark:prose-invert max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl prose-h1:pt-2 prose-code:text-accent-600 prose-code:dark:text-accent-400 prose-code:font-normal
      prose-a:decoration-accent-400 prose-a:underline-offset-[3px] prose-a:transition-colors prose-a:duration-100 hover:prose-a:text-accent-300
      prose-hr:border-accent-500
      dark:prose-hr:border-accent-400 dark:prose-hr:border-opacity-60">
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
<!-- TODO -->
## Nav Bar Component

I created a Nav bar component for my site, in it I import [Button](#button-component) and [DropdownMenu](#dropdown-menu-component) components in addition to two logos, one for mobile and one for desktop.

```astro title="components/NavBar.astro"
---
import Button from './subComponents/Button.astro';
import DropdownMenu from './subComponents/DropdownMenu.astro';
---

<div
  class="navbar-container sticky top-0 z-10 mb-8 w-full bg-slate-900 py-2 pl-4 pr-2 sm:w-5/6 sm:rounded-b-lg">
  <div class="button-container flex items-center justify-between gap-6">
    <a href="/">
      <img
        src="../astroLogo.svg"
        alt="Astro Logo"
        class="w-30 hidden h-8 opacity-80 md:block"
      />
      <img
        src="../astro-icon-light.svg"
        alt="Astro Logo"
        class="h-8 w-8 opacity-80 sm:block md:hidden"
      />
    </a>
    <div class="md:text-md flex lg:text-lg">
      <Button name="Home" link="/" />
      <Button name="About" link="/about" />
      <Button name="Blog" link="/posts/blog1" />
      <DropdownMenu
        name="Projects"
        links={[
          { name: 'Minimal Typography', url: '/designProject' },
          { name: 'Old Flask Site', url: '/flaskSite' },
        ]}
      />
    </div>
  </div>
</div>
```

### Button Component

I created a button component with variable styling including the ability to add a caret icon when the button is being used to trigger a dropdown menu. The button component accepts several props including `name`, `link`, `id`, `showCaret`, and `styles` which are used to customize the button component when it's called.

```astro title="components/subComponents/Button.astro"
---
interface Props {
  name: string;
  link?: string;
  id?: string;
  showCaret?: boolean;
  styles?: string;
}

const { name, link, id, showCaret = false, styles = '' } = Astro.props;
---

<a
  href={link}
  id={id}
  class=`mx-2 flex rounded-lg px-3 py-2 font-normal text-slate-200 hover:bg-slate-800 text-opacity-70 hover:text-opacity-100 transition-color duration-200 max-w-max ${styles}`>
  <button class="flex">
    {name}
    {
      showCaret && (
        <svg
          class="caret-icon ml-1 mt-1 h-5 w-5 lg:h-6 lg:w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.1">
          <path
            d="M8 9l5 5 5-5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )
    }
  </button>
</a>
<style>
  .dropdown-active {
    @apply bg-slate-800;
  }

  .caret-icon {
    transition: transform 0.15s ease-in-out;
    will-change: transform;
  }
  .dropdown-active .caret-icon {
    transform: rotate(180deg);
  }
</style>
```

### Dropdown Menu Component

The DropdownMenu component uses the Button component to open a dropdown menu with links to project pages on my website.

```astro title="components/subComponents/DropdownMenu.astro"
---
interface Link {
  name: string;
  url: string;
}

interface Props {
  name: string;
  links: Link[];
}

const { name = 'Dropdown', links = [] } = Astro.props;
import Button from './Button.astro';
---

<div class="relative">
  <Button name={name} id="dropdown-button" showCaret={true} />
  <div
    id="dropdown"
    class="absolute mt-2 hidden text-balance rounded-md bg-slate-800 p-[0.5px] sm:ml-2 md:w-40">
    {
      links.map((link) => (
        <a
          href={link.url}
          class="m-1 block rounded-md px-2 py-2 text-sm text-slate-300/80 transition-colors duration-200 hover:bg-slate-700 hover:text-slate-200/95">
          {link.name}
        </a>
      ))
    }
  </div>
</div>

<script>
  const button = document.getElementById('dropdown-button');
  const dropdown = document.getElementById('dropdown');

  button.addEventListener('click', (event) => {
    dropdown.classList.toggle('hidden');
    button.classList.toggle('dropdown-active');
    event.stopPropagation();
  });

  document.addEventListener('click', () => {
    button.classList.remove('dropdown-active');
    dropdown.classList.add('hidden');
  });
</script>
```

---

## Card Component

```astro title="components/Card.astro"
<div class="prose prose-invert max-w-3xl">
  <h1 class="mb-2">{Astro.props.title}</h1>
  <h2 class="mt-0">{Astro.props.subtitle}</h2>
  <hr class="border-gray-400" />
  <h3 class="mb-1">Introduction</h3>
  <slot name="content" />
</div>
```

In a new file called `Card.astro` I created a `<Card />` component to further modularize my code. This component accepts a `title` and `subtitle` as props, and uses the `slot` to feature any type or amount of HTML elements when the component is called, each being passed as props to the <Card /> component.

```astro frame="terminal"
<slot name="content" />
```

`name="content"` is then used to identify all elements to be rendered within the main `<slot>` element.

```astro title="pages/index.astro" {4-5}
<Card
  title="Bassim Shahidy"
  subtitle="IT Technician at the New York City BAR Association">
  <p slot="content" class="text-lg"></p>
  <p slot="content"></p>
</Card>
```

### Using the `<Card />` component in pages

This `<Card />` component can be imported and used in any other Astro files with the ability to pass a customized title, subtitle, and content for each instance.

```astro title="pages/index.astro" {2-4, 11}
<Card
  title="Bassim Shahidy"
  subtitle="IT Technician at the New York City BAR Association">
  <p slot="content" class="text-lg">
    This is the third version of my personal website! With each iteration my
    website has grown in complexity in proportion to my progress learning web
    development. This version is built with Astro, a frontend rendering
    framework that uses an HTML like syntax to create components while allowing
    the use of components from several of the most popular frameworks.
  </p>
  <p slot="content">
    Astro is also extremely fast, it uses the islands architecture to only send
    Javascript when required within interactive components.
  </p>
</Card>
```

---

## Markdown styling

TailwindCSS resets default browser styles so all markdown looks like plain text. To fix this I used the official [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) plugin which provides opinionated markdown styling.

```js title="tailwind.config.cjs" {2}
module.exports = {
  plugins: [require('@tailwindcss/typography')],
};
```

Prose is the main utility class used to style markdown. There are a wide range of prose modifiers that can be used to change the look of the content such as `prose-sm` to make the text smaller or `prose-lg` to make it larger and modifiers to target each element type like `prose-h1` or `prose-headings` to target all headings. In addition `prose-invert` changes the default color of all text to white as opposed to.

```html title="layouts/MDLayout.astro"
<article
  class="prose prose-invert prose-h1:pt-2 prose-hr:border-accent">
</article>
```

### Syntax Highlighting

Changing the code syntax highlighting theme in Astro is easy, I just needed to add a shikiConfig object to the astro.config.mjs file and set the desired theme.

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

## Creating a footer with the current year and a link to GitHub

```astro title="components/Footer.astro"
---
import Social from './subComponents/Social.astro';
---

<footer class="mb-6 mt-8 flex items-center gap-4 text-sm text-white">
  <p>© {new Date().getFullYear()} Bassim shahidy. All rights reserved.</p>
  <Social platform="github" username="withastro" icon="github" />
</footer>
```

### Adding icons as props to Astro components

Within the Footer component, I created a subcomponent called Social.astro. It takes in a icon prop which accesses icons by name from the public folder.

```astro title="components/subComponents/Social.astro"
---
const { platform, username } = Astro.props;
---

<a href={`https://www.${platform}.com/${username}`}>
  <img
    src={`/${platform}.svg`}
    alt={`${platform} icon`}
    width="22"
    height="22"
  />
</a>
```

### String Interpolation in Astro

Astro utilizes JavaScript's template literals `(` `)` to embed variable values within strings.
Variables within template literals are then denoted by the `${}` syntax. This allows dynamic composition of strings URLs, paths, or text based on `Astro.props` values.

```astro frame="terminal"
<a href={`https://www.${platform}.com/${username}`}></a>
```

Here, `platform` and `username` are variables passed as props which are used to create a URL string dynamically.

```astro frame="terminal"
<img src={`/${platform}.svg`} alt={`${platform} icon`} />
```

The `platform` variable is also passed as a prop to the `src` and `alt` attributes because the icon itself should be named with the platform name. There should be no need for more than one icon per platform, changes in icon color can be done with CSS.
