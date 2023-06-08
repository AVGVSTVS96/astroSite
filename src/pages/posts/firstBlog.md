---
layout: "../../layouts/MDLayout.astro"
title: "First post on my custom built blog"
pubDate: "June 7, 2023"
author: "Bassim Shahidy"
tags: ["blog", "astro", "tailwindcss"]
---

# My first blog post
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
