---
title: "How I built this website"
description: "This is my first blog, it describes the fundamental concepts I used to build this website using Astro and TailwindCSS such as layouts, markdown styling, components, and string interpolation in Astro."
pubDate: "June 7, 2023"
author: "Bassim Shahidy"
tags: ["blog", "astro", "tailwindcss"]
layout: "../../layouts/MDLayout.astro"
---
---
I chose to build this site with [Astro](https://astro.build) and [TailwindCSS](https://tailwindcss.com/) for several reasons. Astro is an excellent framework to build a portfolio website with and is a joy to work with thanks to it's rich documentation and intuitive structure.

TailwindCSS provides a well thought out design system that speeds up development by abstracting CSS classes into utility classes designed to be used in conjunction with each other. This promotes a consistent design system and speeds up development.

## Layouts

Astro enables the use of page layouts, the two main ways I've used layouts so far is for normal pages and for markdown pages. The markdown page layout setup is a little different from normal `.astro` files.

### `MainLayout` for `.astro` files

```jsx
---
const { title } = Astro.props;
---

<html lang="en">
<head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
</head>
<slot>
</slot>
</html>
```

`const { title } = Astro.props;` Set's the title to a prop, this prop is set when `MainLayout` is called in a file.

```jsx
<MainLayout title="Bassim Shahidy">
</MainLayout>
```

### `MDLayout` for `.md` files

```jsx
---
const { frontmatter } = Astro.props;
import NavBar from '../components/NavBar.astro';
import '/src/global.css'
---

<html lang="en">
<head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="generator" content={Astro.generator} />
    <title>{frontmatter.title}</title>
</head>
    <NavBar />
    <div class="prose prose-invert prose-hr:border-amber-600 ">
        <slot>
        </slot>
    </div>
</html>
		  
```

`const { frontmatter } = Astro.props;` Sets the frontmatter in the markdown pages as props, the title can then be set in the MD template with `frontmatter.title`

Layouts features a `<slot />` tag which is where the content importing the layout is then placed.
A layout can be imported in both markdown and Astro files but each uses a different syntax.

### In MD files layouts are imported at the top in frontmatter

```jsx
---
layout: "../../layouts/MDLayout.astro"
---
```
### In Astro files layouts are imported like any other component.

```jsx
import MainLayout from '../layouts/MainLayout.astro';
```

---
## Markdown styling

Prose is a class provided by the TailwindCSS Typography plugin used for adding opinionated typographic markdown styling to the content. TailwidCSS by default resets default styles so markdown content looks like plain text, Typography applies styles back to the content.

`Prose-invert` changes the color of text to white as opposed to the default black.
There are a wide range of prose modifiers that can be used to change the look of the content such as `prose-sm` to make the text smaller or `prose-lg` to make it larger and modifiers to target each element type like `prose-h1` or `prose-headings` to target all headings.

```jsx
// Sets padding top to 12rem for h1 elements
prose-h1:pt-12
```

### Syntax Highlighting

Changing the code syntax highlighting theme in Astro is easy, I just needed to add a shikiConfig object to the astro.config.mjs file and set the desired theme.

```jsx
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'material-theme-ocean'
    }
  },
  integrations: [tailwind()]
});
```

---
## Creating a footer with the current year and a link to GitHub
```jsx
---
import Social from "./subComponents/Social.astro";
---

<footer class="text-white flex items-center mt-8 mb-6 gap-4 text-sm">
    <p>© {new Date().getFullYear()} Bassim shahidy. All rights reserved.</p>
    <Social platform="github" username="withastro" icon="github"/>
</footer>
```


### Adding icons as props to Astro components
Within the Footer component, I created a subcomponent called Social.astro. It takes in a icon prop which accesses icons by name from the public folder.
```jsx
---
const { platform, username } = Astro.props;
---
<a href={`https://www.${platform}.com/${username}`}>
    <img src={`/${platform}.svg`} alt={`${platform} icon`} width="22" height="22"/>
</a>
```
### String Interpolation in Astro

Astro utilizes JavaScript's template literals `(` `)` to embed variable values within strings.
Variables within template literals are then denoted by the `${}` syntax. This allows dynamic composition of strings URLs, paths, or text based on `Astro.props` values.
```jsx
<a href={`https://www.${platform}.com/${username}`}>
```
Here, `platform` and `username` are variables passed as props which are used to create a URL string dynamically.
```jsx
<img src={`/${platform}.svg`} alt={`${platform} icon`}>
```
The `platform` variable is also passed as a prop to the `src` and `alt` attributes because the icon itself should be named with the platform name. There should be no need for more than one icon per platform, changes in icon color can be done with CSS.

---

## Card Component

```jsx
<div class="max-w-3xl prose prose-invert">
    <h1 class="mb-2">{Astro.props.title}</h1>
    <h2 class="mt-0">{Astro.props.subtitle}</h2>
    <hr class="border-gray-400" />
    <h3 class="mb-1">Introduction</h3>
    <slot name="content"></slot>
</div>
```

In a new file called `Card.astro` I created a `<Card />` component to further modularize my code. This component accepts a `title` and `subtitle` as props, and uses the `slot` to feature any type or amount of HTML elements when the component is called, each being passed as props to the <Card /> component.

```jsx
<slot name="content"></slot>
```

`name="content"` is then used to identify all elements to be rendered within the main `<slot>` element.
```jsx
<Card
    title="Bassim Shahidy"
    subtitle="IT Technician at the New York City BAR Association">
    <p slot="content" class="text-lg"></p>
    <p slot="content"></p>
</Card>
```



### Using the `<Card />` component in pages

This `<Card />` component can be imported and used in any other Astro files with the ability to pass a customized title, subtitle, and content for each instance.

```jsx
<Card
    title="Bassim Shahidy"
    subtitle="IT Technician at the New York City BAR Association">
    <p slot="content" class="text-lg">
        This is the third version of my personal website! With each
        iteration my website has grown in complexity in proportion to my
        progress learning web development. This version is built with
        Astro, a frontend rendering framework that uses an HTML like
        syntax to create components while allowing the use of components
        from several of the most popular frameworks.
    </p>
    <p slot="content">
        Astro is also extremely fast, it uses the islands architecture
        to only send Javascript when required within interactive
        components.
    </p>
</Card>
```