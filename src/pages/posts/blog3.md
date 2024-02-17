---
title: Building navigation and dropdown menu's in Astro
description: This is how I built my navigation menu, dropdown, and buttons in Astro
pubDate: 'December 27, 2023'
author: 'Bassim Shahidy'
tags:
layout: '@layouts/MDLayout.astro'
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