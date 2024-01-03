---
title: "How I built this website"
description: "This is my first blog post, it describes several fundamental concepts I learned and used to build this website using Astro and TailwindCSS, such as Astro layouts and components, markdown styling, and variables in Astro."
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

### Main Layout for Astro pages

```jsx title="layouts/MainLayout.astro"
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

`const { title } = Astro.props;` Set's the title to a prop, this prop is set when `MainLayout` is called in a file. Other props can also be accessed through `Astro.props` such as `{ description }` or `{ author }`.


```jsx title="pages/index.astro"
<MainLayout title="Bassim Shahidy">
</MainLayout>
```

### Markdown Layout

```jsx title="layouts/MDLayout.astro"
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

```jsx title="pages/posts/blog1.md"
---
layout: "../../layouts/MDLayout.astro"
---
```
### In Astro files layouts are imported like any other component.

```jsx title="pages/index.astro"
import MainLayout from '../layouts/MainLayout.astro';
```

---

## Nav Bar Component
I created a Nav bar component for my site, in it I import [Button](#button-component) and [DropdownMenu](#dropdown-menu-component) components in addition to two logos, one for mobile and one for desktop. 

```jsx title="components/NavBar.astro"
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

```jsx title="components/subComponents/Button.astro"
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

```jsx title="components/subComponents/DropdownMenu.astro"
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

```jsx title="components/Card.astro"
<div class="max-w-3xl prose prose-invert">
    <h1 class="mb-2">{Astro.props.title}</h1>
    <h2 class="mt-0">{Astro.props.subtitle}</h2>
    <hr class="border-gray-400" />
    <h3 class="mb-1">Introduction</h3>
    <slot name="content"></slot>
</div>
```

In a new file called `Card.astro` I created a `<Card />` component to further modularize my code. This component accepts a `title` and `subtitle` as props, and uses the `slot` to feature any type or amount of HTML elements when the component is called, each being passed as props to the <Card /> component.

```jsx frame="terminal"
<slot name="content"></slot>
```

`name="content"` is then used to identify all elements to be rendered within the main `<slot>` element.
```jsx title="pages/index.astro" {4-5}
<Card
    title="Bassim Shahidy"
    subtitle="IT Technician at the New York City BAR Association">
    <p slot="content" class="text-lg"></p>
    <p slot="content"></p>
</Card>
```



### Using the `<Card />` component in pages

This `<Card />` component can be imported and used in any other Astro files with the ability to pass a customized title, subtitle, and content for each instance.

```jsx title="pages/index.astro" {2-4, 12}
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
---

## Markdown styling
TailwindCSS resets default browser styles so all markdown looks like plain text. To fix this I used the official [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) plugin which provides opinionated markdown styling.

```js title="tailwind.config.cjs" {3}
module.exports = {
	plugins: [
		require('@tailwindcss/typography')
	],
}
```

Prose is the main utility class used to style markdown. There are a wide range of prose modifiers that can be used to change the look of the content such as `prose-sm` to make the text smaller or `prose-lg` to make it larger and modifiers to target each element type like `prose-h1` or `prose-headings` to target all headings. In addition `prose-invert` changes the default color of all text to white as opposed to.

```html title="layouts/MDLayout.astro"
 <article
      class="prose prose-invert prose-h1:pt-2 prose-hr:border-sky-400">
</article>
```

### Syntax Highlighting

Changing the code syntax highlighting theme in Astro is easy, I just needed to add a shikiConfig object to the astro.config.mjs file and set the desired theme.

```jsx title="astro.config.mjs" {6-7}
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
```jsx title="components/Footer.astro"
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
```jsx title="components/subComponents/Social.astro"
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
```jsx frame="terminal" 
<a href={`https://www.${platform}.com/${username}`}>
```
Here, `platform` and `username` are variables passed as props which are used to create a URL string dynamically.
```jsx frame="terminal" 
<img src={`/${platform}.svg`} alt={`${platform} icon`}>
```
The `platform` variable is also passed as a prop to the `src` and `alt` attributes because the icon itself should be named with the platform name. There should be no need for more than one icon per platform, changes in icon color can be done with CSS.
