## v0.7.3

### Refactor

* Refactor: Use recursive component for `TableOfContentsHeading` in [#38](https://github.com/AVGVSTVS96/astroSite/pull/38)
* Improve TOC Icon rendering, use `hidden` class instead of conditional rendering in [#39](https://github.com/AVGVSTVS96/astroSite/pull/39)

### Content

* blog: Update blog content, update code block styling in [#41](https://github.com/AVGVSTVS96/astroSite/pull/41)

**Full Changelog**: [v0.7.2...v0.7.3](https://github.com/AVGVSTVS96/astroSite/compare/v0.7.2...v0.7.3)

## v0.7.2

### Features

* update to older gpt-4-0613 model [#36](https://github.com/AVGVSTVS96/astroSite/pull/36)

**Full Changelog**: [v0.7.1...v0.7.2](https://github.com/AVGVSTVS96/astroSite/compare/v0.7.1...v0.7.2)

## v0.7.1

### Bug Fixes

- Add 3rd level headings to blog table of contents in [#35](https://github.com/AVGVSTVS96/astroSite/pull/35)

**Full Changelog**: [v0.7.0...v0.7.1](https://github.com/AVGVSTVS96/astroSite/compare/v0.7.0...v0.7.1)

## v0.7.0

### Features

- Add GPT Chat page from [FastGPT](https://github.com/AVGVSTVS96/fastGPT) in [#34](https://github.com/AVGVSTVS96/astroSite/pull/34)

### Bug Fixes
- Use Astro-icon for nav icons in [#31](https://github.com/AVGVSTVS96/astroSite/pull/31)
- Fix `ThemeSwitcher` incorrect size [31604bb](https://github.com/AVGVSTVS96/astroSite/commit/31604bb01b8d4a9b9c38e073a95ee8eabdc6a8b8)

### UI Enhancements

- Improve ThemeToggle script, replace CSS with TW, add dark class to html to fix [#19](https://github.com/AVGVSTVS96/astroSite/issues/19) in [#25](https://github.com/AVGVSTVS96/astroSite/pull/25)
- Update code theme switching based on dark and light classes in [#30](https://github.com/AVGVSTVS96/astroSite/pull/30)
- refactor(imports): Add styles import to `BaseLayout` instead of `Main/MDLayout` in [#26](https://github.com/AVGVSTVS96/astroSite/pull/26)
- Add color transition to TOC links [0328e91](https://github.com/AVGVSTVS96/astroSite/commit/0328e913dd957af4ca3048a2d56e5c4f010c3c64)
- Add `prose-table` [b0bd8cf](https://github.com/AVGVSTVS96/astroSite/commit/b0bd8cfad6b5340bda9e7af2e67e2230a0748bd3)

### Content

- Update blog content, add table styling, add color transitions to TOC, minor enhancements in [#27](https://github.com/AVGVSTVS96/astroSite/pull/27)
- Add reference style links in markdown [1ef64fe](https://github.com/AVGVSTVS96/astroSite/commit/1ef64fe7ac3915cecf1fb377217a552105961593) [6f28bbb](https://github.com/AVGVSTVS96/astroSite/commit/6f28bbbedde8ad7fa9faf8a9651e04d7a7cad77d)
- Add badges to README [261a8a3](https://github.com/AVGVSTVS96/astroSite/commit/261a8a3501321e45a9f9112bac4818460cc84dee)

### Dependencies

- Add sharp dependency, remove `package-lock.json`, recreate `node_modules` and lock files in [#28](https://github.com/AVGVSTVS96/astroSite/pull/28)
- Add my `remark-sectionize` repo as dependency [d33d6af](https://github.com/AVGVSTVS96/astroSite/commit/d33d6af3aed4138955f86a939ddadde35a1eef76)




**Full Changelog**: [v0.6.0...v0.7.0](https://github.com/AVGVSTVS96/astroSite/compare/v0.6.0...v0.7.0)

## v0.6.0

### Bug Fixes

- **Layout:** Switch from flex to grid, add noMargin prop to Card and set gap-4 [8cca63c](https://github.com/AVGVSTVS96/astroSite/commit/8cca63c555d9bfc35031a39619a418cd422252c0)

### Features

- **NavBar:** add theme color menu to mobile layouts, update gaps [ad2f6c1](https://github.com/AVGVSTVS96/astroSite/commit/ad2f6c1f74f327ba93ba2ed78eaf782ccdef1ce7)
- **Card:** add noMargin prop to remove margins from Card [6fdfd95](https://github.com/AVGVSTVS96/astroSite/commit/6fdfd95a6c0e6f0b1fa2ad544cd4d58fdb833efa)
- **Content:** Add astroSite project [3fe3c0d](https://github.com/AVGVSTVS96/astroSite/commit/3fe3c0d9bb4841bd1df44e39f4a366859f6a1b2d)

**Full Changelog**: [v0.5.0...v0.6.0](https://github.com/AVGVSTVS96/astroSite/compare/v0.5.0...v0.6.0)

## v0.5.0

### Dependencies

- astro to 4.2.6, astro-icon to 1.0.3, and astro-expressive-code to 0.32.3 by [@dependabot](https://github.com/dependabot) in [#22](https://github.com/AVGVSTVS96/astroSite/pull/22)

### Update to TypeScript

- Convert `astro.config` file to TypeScript and disallow JS
- Add type declaration to `env.d.ts` for `remark-sectionize`
- Resolve TypeScript error by adding underscore to unused variable `letter` in `flaskSite.astro`

**Full Changelog**: [v0.4.1...v0.5.0](https://github.com/AVGVSTVS96/astroSite/compare/v0.4.1...v0.5.0)

## v0.4.1

### Enhancements

- Create BaseLayout, Refine SEO Schemas, and Enhance Image Handling in [#20](https://github.com/AVGVSTVS96/astroSite/pull/20)
  - **BaseLayout:** Create new `BaseLayout` head for main pages and blog pages
    - Integrate NavBar and Footer in `BaseLayout`, remove from individual pages
    - Remove styles from other layout pages
  - **Schema Refinements:** Updated schemas for blog posts and main pages, pass image only when available
  - **Image Component Optimization:** Add Astro `Image` component for better image optimization
    - Import images from images directory into `MDLayout.astro` to enable optimization of imported images, use `frontmatter.image` value to import the correct image for each blog post

**Full Changelog**: [v0.4.0...v0.4.1](https://github.com/AVGVSTVS96/astroSite/compare/v0.4.0...v0.4.1)

## v0.4.0

### Dependencies

- Bump Prettier dependencies - 3 updates by [@dependabot](https://github.com/dependabot) in [#16](https://github.com/AVGVSTVS96/astroSite/pull/16)
- Bump Tailwind dependencies - 2 updates by [@dependabot](https://github.com/dependabot) in [#15](https://github.com/AVGVSTVS96/astroSite/pull/15)
- Bump Astro dependencies - 4 updates by [@dependabot](https://github.com/dependabot) in [#14](https://github.com/AVGVSTVS96/astroSite/pull/14) and [#17](https://github.com/AVGVSTVS96/astroSite/pull/17)

### Features and Enhancements
- Add theme functionality using variables, optimize script logic, update NavBar layout in [#18](https://github.com/AVGVSTVS96/astroSite/pull/18)
  - Add theme switcher functionality
    - Add `ThemeSwitcher.astro` to switch accent color theme using `data-theme` attribute, add to `NavBar.astro`
    - Use variables to define accent colors with `theme()` to access Tailwind color palette
      - Add `mix` function to `tailwind.config.cjs` to ensure opacity modifiers work
  - Optimize dark mode `ThemeToggle.astro` logic
    - Use `data-code-theme` to set code theme instead of `data-theme`
    - Modularize script and reduce redundancy
  - Update layout styles
    - Update `NavBar.astro`, `ThemeToggle.astro`, and `Button.astro` margin and padding, use `gap` for button spacing
    - Update `DropdownMenu.astro` margin and set menu width to match button width
- Add schema JSON-LD
  - Add ProfilePage schema to `MainLayout.astro`
  - Add BlogPosting schema to `MDLayout.astro`
    - Set schema as const with dynamic values from frontmatter for each blog post
- Add image to `blog2.md`
- Add conditional rendering to `Button.astro`
  - Render wrapper `<a>` element only if menu prop isn't passed or is equal to false
  - Pass menu prop to `Button.astro` in `DropdownMenu.astro`
- Conditionally add `w-full` to `DropdownMenu.astro` when `icon` prop isn't passed

**Full Changelog**: [v0.3.0...v0.4.0](https://github.com/AVGVSTVS96/astroSite/compare/v0.3.0...v0.4.0)

## v0.3.0

### What's Changed

### Dependencies

- Bump vite from 5.0.10 to 5.0.12 by [@dependabot](https://github.com/dependabot) in [#12](https://github.com/AVGVSTVS96/astroSite/pull/12)

### UI Enhancements
- Add color variables, extend core border and text colors, remove prose from h1 in [#13](https://github.com/AVGVSTVS96/astroSite/pull/13)
  - Remove prose from h1 headings, create h1 class component to style them
  - Define primary and accent color shades 50-950 in `tailwind.config.cjs`
    - Use `primaryColor` and `accentColor` variables for each shade
  - Extend border and text color core plugin with custom colors
    - Consolidate text colors with `text-light`, `text-dark`, and `text-muted`

**Full Changelog**: [v0.2.2...v0.3.0](https://github.com/AVGVSTVS96/astroSite/compare/v0.2.2...v0.3.0)

## v0.2.2

### Features and Enhancements

- Add content collection for projects, Projects component, add types, upgrade Astro in [#11](https://github.com/AVGVSTVS96/astroSite/pull/11)
  - Add Content Collection for Project data
    - Add two project YAML files
    - Create Projects component and add to `Index.astro`
    - Update TS config
  - Update Card component
    - Add class and padding props
    - Make default content divs only appear when content is passed to their props
  - Adjust Footer border-t width and decrease margin
  - Update Index.astro styles to display Projects component, set max-w-3xl
  - Add typescript interfaces, update all JS to resolve TS errors by defining types and adding checks
  - Update Dropdown menu bg color for light mode, remove opacity and use slate-100

**Full Changelog**: [v0.2.1...v0.2.2](https://github.com/AVGVSTVS96/astroSite/compare/v0.2.1...v0.2.2)

## v0.2.1

### Enhancements

- Add second dropdown for all menu items under 640px, update layout and margins for small screens in [#10](https://github.com/AVGVSTVS96/astroSite/pull/10)
  - Update DropdownMenu to use classes instead of IDs for opening and closing, allowing multiple instances of DropdownMenu per page
  - Update script for new classes and add a check to ensure dropdown doesn't close when clicking within it
  - Add Icon prop to Button to display an icon using astro-icon, using name prop to source the icon by it's name
  - Add `mx-4` margin on `MDLayout.astro` for blogs, `Card.astro`, and `Index.astro` to add space around elements on small screens
- Use Astro-Icon for [`Social.astro`](https://github.com/AVGVSTVS96/astroSite/commit/59628d1e254b035c39a7b2876df46bba11785478), [`Button.astro`](https://github.com/AVGVSTVS96/astroSite/commit/73adca41f4c6d079d95d778218408e4e9a8df936), and [`TableOfContentsHeading.astro`](https://github.com/AVGVSTVS96/astroSite/commit/836dc79aa2bb5db4100a6ca3c52e4ef9408033fa)
- Add LinkedIn icon [a7172f3](https://github.com/AVGVSTVS96/astroSite/commit/a7172f35ca4a84b84df0aef14162b5da6c3eef29) and set icon colors to change depending on light or dark mode [08fab4a](https://github.com/AVGVSTVS96/astroSite/commit/08fab4ab22ee54170c3de352cca6c52341a88b05)
- Update [`Navbar.astro`](https://github.com/AVGVSTVS96/astroSite/commit/fb40d7a5d5ad21271b4ed5d8212409b70d424179) styling, match color to bg, update margin and padding

### Dependencies
- Add Astro-Icon [5eab63d](https://github.com/AVGVSTVS96/astroSite/commit/5eab63d3128228cabc5078221ee993b2bfbb7773)

**Full Changelog**: [v0.2.0...v0.2.1](https://github.com/AVGVSTVS96/astroSite/compare/v0.2.0...v0.2.1)

## v0.2.0

### Features and Enhancements


- Add table of contents to blog pages, update layout in [#6](https://github.com/AVGVSTVS96/astroSite/pull/6)
- Create Dropdown menu, format code in [#7](https://github.com/AVGVSTVS96/astroSite/pull/7)
- Add dark mode, update toc script, add sample blog posts, update styling, update Tailwind config in [#9](https://github.com/AVGVSTVS96/astroSite/pull/9)

**Full Changelog**: [v0.1.0...v0.2.0](https://github.com/AVGVSTVS96/astroSite/compare/v0.1.0...v0.2.0)

## v0.1.0 Pre-release

### Features and Enhancements

* Migrated and Converted Flask Website to Astro Page by @AVGVSTVS96 in [#3](https://github.com/AVGVSTVS96/astroSite/pull/3)
   - [Updated Favicon](https://github.com/AVGVSTVS96/astroSite/commit/5e95ebb1f99fa9b96d120ab2310395cf55ad1441) and [linked it in `flaskSite.astro`](https://github.com/AVGVSTVS96/astroSite/commit/90815ce73ec0e14df78c107608869b8b3b24e670)
  - [Add Home Button to `flaskSite.astro` page](https://github.com/AVGVSTVS96/astroSite/commit/f26ef4d3776c916925b3f105786e7eef3a916307)
  - [Added newly supported Chrome CSS scrollbar styles](https://github.com/AVGVSTVS96/astroSite/commit/a309dae62c9f8a4ff96cacc2e74409166bfc907b) 
  - [Imported `global.css` in `flaskSite.astro`](https://github.com/AVGVSTVS96/astroSite/commit/98261e8dd4bb160ea976acd53631e09491a562df)
  - [Refactored styles, moved page specific styles to layout pages](https://github.com/AVGVSTVS96/astroSite/commit/157d76b2aea2e290a1f09fd0b64ac52fbecba004)
  - [Added TypeScript types to `flaskSite.astro` script](https://github.com/AVGVSTVS96/astroSite/commit/973fbcb762f8ef0cea51a03645bedda1122aadae)
