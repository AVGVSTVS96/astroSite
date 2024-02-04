---
title: 'Astro: The Next-Gen Front-End Framework'
description: "Astro is the web framework for building content-driven websites like blogs, marketing, and e-commerce. Astro is best-known for pioneering a new frontend architecture to reduce JavaScript overhead and complexity compared to other frameworks. If you need a website that loads fast and has great SEO, then Astro is for you."
pubDate: 'December 12, 2023'
author: 'Bassim Shahidy'
image: /src/images/astroBackground.png
tags:
layout: '@layouts/MDLayout.astro'
---

## Features

**Astro is an all-in-one web framework.** It includes everything you need to create a website, built-in. There are also hundreds of different [integrations](https://astro.build/integrations/) and [API hooks](https://docs.astro.build/en/reference/integrations-reference/) available to customize a project to your exact use case and needs.

Astro comes with out-of-the-box support for a plethora of popular JavaScript frameworks, including React, Vue, Svelte, and Preact. This means developers can leverage their existing skills and knowledge, while still reaping the performance benefits that Astro offers.

Some highlights include:

-   **[Islands](https://docs.astro.build/en/concepts/islands/):** A component-based web architecture optimized for content-driven websites.
-   **[UI-agnostic](https://docs.astro.build/en/core-concepts/framework-components/):** Supports React, Preact, Svelte, Vue, Solid, Lit, HTMX, web components, and more.
-   **[Server-first](https://docs.astro.build/en/core-concepts/rendering-modes/):** Moves expensive rendering off of your visitors’ devices.
-   **[Zero JS, by default](https://docs.astro.build/en/core-concepts/astro-components/):** Less client-side JavaScript to slow your site down.
-   **[Content collections](https://docs.astro.build/en/guides/content-collections/):** Organize, validate, and provide TypeScript type-safety for your Markdown content.
-   **[Customizable](https://docs.astro.build/en/guides/integrations-guide/):** Tailwind, MDX, and hundreds of integrations to choose from.

## Design Principles

Here are five core design principles to help explain why we built Astro, the problems that it exists to solve, and why Astro may be the best choice for your project or team.

Astro is…

1.  **[Content-driven](https://docs.astro.build/en/concepts/why-astro//#content-driven):** Astro was designed to showcase your content.
2.  **[Server-first](https://docs.astro.build/en/concepts/why-astro//#server-first):** Websites run faster when they render HTML on the server.
3.  **[Fast by default](https://docs.astro.build/en/concepts/why-astro//#fast-by-default):** It should be impossible to build a slow website in Astro.
4.  **[Easy to use](https://docs.astro.build/en/concepts/why-astro//#easy-to-use):** You don’t need to be an expert to build something with Astro.
5.  **[Developer-focused](https://docs.astro.build/en/concepts/why-astro//#developer-focused):** You should have the resources you need to be successful.

### Content-driven

**Astro was designed for building content-rich websites.** This includes marketing sites, publishing sites, documentation sites, blogs, portfolios, landing pages, community sites, and e-commerce sites. If you have content to show, it needs to reach your reader quickly.

By contrast, most modern web frameworks were designed for building _web applications_. These frameworks excel at building more complex, application-like experiences in the browser: logged-in admin dashboards, inboxes, social networks, todo lists, and even native-like applications like [Figma](https://figma.com/) and [Ping](https://ping.gg/). However with that complexity, they can struggle to provide great performance when delivering your content.

Astro’s focus on content from its beginnings as a static site builder have allowed Astro to **sensibly scale up to performant, powerful, dynamic web applications** that still respect your content and your audience. Astro’s unique focus on content lets Astro make tradeoffs and deliver unmatched performance features that wouldn’t make sense for more application-focused web frameworks to implement.

### Server-first

**Astro leverages [server-rendering](https://docs.astro.build/en/core-concepts/rendering-modes/) over client-side rendering in the browser as much as possible.** This is the same approach that traditional server-side frameworks -- PHP, WordPress, Laravel, Ruby on Rails, etc. -- have been using for decades. But you don’t need to learn a second server-side language to unlock it. With Astro, everything is still just HTML, CSS, and JavaScript (or TypeScript, if you prefer).

This approach stands in contrast to other modern JavaScript web frameworks like Next.js, SvelteKit, Nuxt, Remix, and others. These frameworks were built for client-side rendering of your entire website and include server-side rendering mainly to address performance concerns. This approach has been dubbed the **Single-Page App (SPA)**, in contrast with Astro’s **Multi-Page App (MPA)** approach.

The SPA model has its benefits. However, these come at the expense of additional complexity and performance tradeoffs. These tradeoffs harm page performance -- critical metrics like [Time to Interactive (TTI)](https://web.dev/interactive/) -- which doesn’t make much sense for content-focused websites where first-load performance is essential.

Astro’s server-first approach allows you to opt in to client-side rendering only if, and exactly as, necessary. You can choose to add UI framework components that run on the client. You can take advantage of Astro’s view transitions router for finer control over select page transitions and animations. Astro’s server-first rendering, either pre-rendered or on-demand, provides performant defaults that you can enhance and extend.

### Fast by default

Good performance is always important, but it is _especially_ critical for websites whose success depends on displaying your content. It has been well-proven that poor performance loses you engagement, conversions, and money. For example:

-   Every 100ms faster → 1% more conversions ([Mobify](https://web.dev/why-speed-matters/), earning +$380,000/yr)
-   50% faster → 12% more sales ([AutoAnything](https://www.digitalcommerce360.com/2010/08/19/web-accelerator-revs-conversion-and-sales-autoanything/))
-   20% faster → 10% more conversions ([Furniture Village](https://www.thinkwithgoogle.com/intl/en-gb/marketing-strategies/app-and-mobile/furniture-village-and-greenlight-slash-page-load-times-boosting-user-experience/))
-   40% faster → 15% more sign-ups ([Pinterest](https://medium.com/pinterest-engineering/driving-user-growth-with-performance-improvements-cfc50dafadd7))
-   850ms faster → 7% more conversions ([COOK](https://web.dev/why-speed-matters/))
-   Every 1 second slower → 10% fewer users ([BBC](https://www.creativebloq.com/features/how-the-bbc-builds-websites-that-scale))

In many web frameworks, it is easy to build a website that looks great during development only to load painfully slow once deployed. JavaScript is often the culprit, since many phones and lower-powered devices rarely match the speed of a developer’s laptop.

Astro’s magic is in how it combines the two values explained above -- a content focus with a server-first architecture -- to make tradeoffs and deliver features that other frameworks cannot. The result is amazing web performance for every website, out of the box. Our goal: **It should be nearly impossible to build a slow website with Astro.**

An Astro website can [load 40% faster with 90% less JavaScript](https://twitter.com/t3dotgg/status/1437195415439360003) than the same site built with the most popular React web framework. But don’t take our word for it: watch Astro’s performance leave Ryan Carniato (creator of Solid.js and Marko) [speechless](https://youtu.be/2ZEMb_H-LYE?t=8163).### Server-first

**Astro leverages [server-rendering](https://docs.astro.build/en/core-concepts/rendering-modes/) over client-side rendering in the browser as much as possible.** This is the same approach that traditional server-side frameworks -- PHP, WordPress, Laravel, Ruby on Rails, etc. -- have been using for decades. But you don’t need to learn a second server-side language to unlock it. With Astro, everything is still just HTML, CSS, and JavaScript (or TypeScript, if you prefer).

This approach stands in contrast to other modern JavaScript web frameworks like Next.js, SvelteKit, Nuxt, Remix, and others. These frameworks were built for client-side rendering of your entire website and include server-side rendering mainly to address performance concerns. This approach has been dubbed the **Single-Page App (SPA)**, in contrast with Astro’s **Multi-Page App (MPA)** approach.

The SPA model has its benefits. However, these come at the expense of additional complexity and performance tradeoffs. These tradeoffs harm page performance -- critical metrics like [Time to Interactive (TTI)](https://web.dev/interactive/) -- which doesn’t make much sense for content-focused websites where first-load performance is essential.

Astro’s server-first approach allows you to opt in to client-side rendering only if, and exactly as, necessary. You can choose to add UI framework components that run on the client. You can take advantage of Astro’s view transitions router for finer control over select page transitions and animations. Astro’s server-first rendering, either pre-rendered or on-demand, provides performant defaults that you can enhance and extend.
