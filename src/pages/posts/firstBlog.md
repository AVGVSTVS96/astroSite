---
layout: "../../layouts/MDLayout.astro"
title: "First post on my custom built blog"
pubDate: "June 7, 2023"
author: "Bassim Shahidy"
tags: ["blog", "astro", "tailwindcss"]
---

# How I built this blog
---
This post describes the process of building my website with Astro and TailwindCSS

I wrote a markdown template for my blog posts. It's located at `src/layouts/MDLayout.astro`

```jsx
---
const { title } = Astro.props;
import NavBar from '../components/NavBar.astro';
import '/src/global.css'
---

<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<meta name="viewport" content="width=device-width" />
		<meta name="generator" content={Astro.generator} />
		<title>{title}</title>
        <style>
            :root {
                @apply bg-gray-900;
            }
        </style>
	</head>
    <NavBar />
    <div class="prose prose-invert">
        <slot>
        </slot>
    </div>
</html>

```
### Markdown styling

Prose is a class provided by the TailwindCSS Typography plugin used for adding opinionated typographic markdown styling to the content. TailwidCSS by default resets default styles so markdown content looks like plain text, Typography applies styles back to the content.

`Prose-invert` changes the color of text to white as opposed to the default black.
There are a wide range of prose modifiers that can be used to change the look of the content such as `prose-sm` to make the text smaller or `prose-lg` to make it larger and modifiers to target each element type like `prose-h1` or `prose-headings` to target all headings.

```jsx
// Sets padding top to 12rem for h1 elements
prose-h1:pt-12
```
### Creating a footer with the current year and a link to GitHub
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
> Within the Footer component, I created a subcomponent called Social.astro. It takes in a icon prop which accesses icons by name from the public folder. 
```jsx
---
const { platform, username, icon } = Astro.props;
---
<a href={`https://www.${platform}.com/${username}`}>
    <img src={`/${icon}.svg`} alt={`${icon} icon`} width="22" height="22"/>
</a>

```
---