## v0.15.0

### Features
* feat(ChatUI): Add language to code blocks, add inline code check, and refactor in [#497](https://github.com/AVGVSTVS96/astroSite/pull/497)

### Performance
* perf(rendering): Optimize message rendering performance with fine-grained memoization in [#498](https://github.com/AVGVSTVS96/astroSite/pull/498)

### Refactor
* refactor(semantic-html): Update dates to use time tags in [#479](https://github.com/AVGVSTVS96/astroSite/pull/479)
  * Use `footer` tag instead of `div` in [#485](https://github.com/AVGVSTVS96/astroSite/pull/485)
* refactor(BlogTimeline): Add id's to elements, remove empty class attribute in [#480](https://github.com/AVGVSTVS96/astroSite/pull/480)
* refactor(chat-api): Rename `chatRoute.ts` to `chat.ts` in [#481](https://github.com/AVGVSTVS96/astroSite/pull/481)
* refactor(accentColorS.., useModel): Remove React.FC type and rename consts in [#482](https://github.com/AVGVSTVS96/astroSite/pull/482)
* refactor(chat-model-state): Move chat model selection state and logic down to `ModelSelector` in [#483](https://github.com/AVGVSTVS96/astroSite/pull/483)
* refactor(filenames): Convert hooks from `.tsx` to `.ts` in [#484](https://github.com/AVGVSTVS96/astroSite/pull/484)
* refactor(header-name): Rename `ReactHeader` to `Header` in [#486](https://github.com/AVGVSTVS96/astroSite/pull/486)
* refactor(hotkey-logic): Use `useHotkeys` hook, update and organize logic in [#491](https://github.com/AVGVSTVS96/astroSite/pull/491)
* refactor(CommandMenu): Modularize and update prop name in [#492](https://github.com/AVGVSTVS96/astroSite/pull/492)

### Styling
* styling: Update margins for markdown and code blocks in [#459](https://github.com/AVGVSTVS96/astroSite/pull/459)
* refactor(ChatUI-styling): Use objects for classes, fix markdown text colors in [#464](https://github.com/AVGVSTVS96/astroSite/pull/464)
* refactor(styling): Use `baseMessageStyles` as separate const, include in both roles in [#478](https://github.com/AVGVSTVS96/astroSite/pull/478)

### Dependencies
* chore(deps): Migrate `ai/react` package to `@ai-sdk/react` in [#451](https://github.com/AVGVSTVS96/astroSite/pull/451)
* chore(deps): Disable dependabot, delete config in [#450](https://github.com/AVGVSTVS96/astroSite/pull/450)
* chore(deps): update ai dependencies by @renovate in [#436](https://github.com/AVGVSTVS96/astroSite/pull/436)
* chore(deps): update components, icons, and styling libraries by @renovate in [#437](https://github.com/AVGVSTVS96/astroSite/pull/437)
* chore(deps): Pin all dependencies in package.json in [#462](https://github.com/AVGVSTVS96/astroSite/pull/462)
* chore(dev-deps): update dev-dependencies by @renovate in [#439](https://github.com/AVGVSTVS96/astroSite/pull/439)

### Linting
* chore(lint): Install and init Biome, setup for linting in [#470](https://github.com/AVGVSTVS96/astroSite/pull/470)
  * Add `useNamingConvention` rule to Biome config in [#475](https://github.com/AVGVSTVS96/astroSite/pull/475)
  * Update biome config in [#477](https://github.com/AVGVSTVS96/astroSite/pull/477)
* refactor(lint): Apply fixes to resolve lint errors in [#471](https://github.com/AVGVSTVS96/astroSite/pull/471)
  * Apply fixes to follow `useNamingConvention` rules in [#476](https://github.com/AVGVSTVS96/astroSite/pull/476)
* refactor(lint): Update Biome config and minor changes in [#493](https://github.com/AVGVSTVS96/astroSite/pull/493)

**Full Changelog**: [v0.13.2...v0.15.0](https://github.com/AVGVSTVS96/astroSite/compare/v0.13.2...v0.15.0)


## v0.13.2

### Features
- feat(`chatRoute`): Set compatibility mode, log token usage and finish reason in [#406](https://github.com/AVGVSTVS96/astroSite/pull/406)
- Set new custom expressive code theme, add several theme files in [#413](https://github.com/AVGVSTVS96/astroSite/pull/413)
- Add vscode themes for prism in `ChatUI`, set new theme in [#416](https://github.com/AVGVSTVS96/astroSite/pull/416)

### Refactor
- refactor(`MDLayout.astro`): Separate image handling and schema to their own util files in [#405](https://github.com/AVGVSTVS96/astroSite/pull/405)
- refactor(`ChatBox`): add styles suffix for Tailwind intellisense in [#407](https://github.com/AVGVSTVS96/astroSite/pull/407)
- refactor: Use style object for Tailwind classes in [#419](https://github.com/AVGVSTVS96/astroSite/pull/419)
- Delete old and unused gpt and react files in [#400](https://github.com/AVGVSTVS96/astroSite/pull/400)

### Styling
- style(`designProject`): Fix typo, update positioning in [#408](https://github.com/AVGVSTVS96/astroSite/pull/408)
- Use `dvh` instead of `vh` in `BaseLayout` for dynamic mobile screen sizing in [#401](https://github.com/AVGVSTVS96/astroSite/pull/401)
- Update code block copy button styling in [#414](https://github.com/AVGVSTVS96/astroSite/pull/414)

### Dependencies
- chore: Configure Renovate for dependency updates in [#424](https://github.com/AVGVSTVS96/astroSite/pull/424)
- chore(deps): update ai dependencies in [#426](https://github.com/AVGVSTVS96/astroSite/pull/426)
- chore(deps): update tailwindcss to ^3.4.4 in [#428](https://github.com/AVGVSTVS96/astroSite/pull/428)
- chore(dev-deps): update dev-dependencies group in [#429](https://github.com/AVGVSTVS96/astroSite/pull/429)
- chore(deps): update astro-icon to ^1.1.0 in [#427](https://github.com/AVGVSTVS96/astroSite/pull/427)
- chore(deps): update astro, integrations, and adapters in [#430](https://github.com/AVGVSTVS96/astroSite/pull/430)
- chore(deps): update components, icons, and styling libraries in [#431](https://github.com/AVGVSTVS96/astroSite/pull/431)
- chore(deps): update astro to ^4.11.0 in [#433](https://github.com/AVGVSTVS96/astroSite/pull/433)
- chore(deps): update @ai-sdk/openai to ^0.0.32 in [#434](https://github.com/AVGVSTVS96/astroSite/pull/434)
- Update `@avgvstvs96/remark-sectionize` to `2.0.1` in [#402](https://github.com/AVGVSTVS96/astroSite/pull/402)


**Full Changelog**: [v0.13.1...v0.13.2](https://github.com/AVGVSTVS96/astroSite/compare/v0.13.1...v0.13.2)


## v0.13.1

### Dependencies
* Bump the astro group across 1 directory with 4 updates by @dependabot in [#386](https://github.com/AVGVSTVS96/astroSite/pull/386)
* chore(deps): bump the tailwind group across 1 directory with 3 updates by @dependabot in [#292](https://github.com/AVGVSTVS96/astroSite/pull/292)
* chore(deps): bump the misc group across 1 directory with 5 updates by @dependabot in [#395](https://github.com/AVGVSTVS96/astroSite/pull/395)
* Bump the prettier group across 1 directory with 3 updates by @dependabot in [#390](https://github.com/AVGVSTVS96/astroSite/pull/390)
* Bump the react group across 1 directory with 6 updates by @dependabot in [#394](https://github.com/AVGVSTVS96/astroSite/pull/394)

**Full Changelog**: [v0.13.0...v0.13.1](https://github.com/AVGVSTVS96/astroSite/compare/v0.13.0...v0.13.1)


## v0.13.0

### Features
- Add Vercel AI SDK, create API route, implement in `ChatUI` in [#340](https://github.com/AVGVSTVS96/astroSite/pull/340)
  * Downgrade @astrojs/cloudflare to 9.0.0, fixes build and deploy errors in [#341](https://github.com/AVGVSTVS96/astroSite/pull/341)
  * Update `ChatUI` select styling, add more model options in [#343](https://github.com/AVGVSTVS96/astroSite/pull/343)
  * Add settings panel to `ChatUI` in [#347](https://github.com/AVGVSTVS96/astroSite/pull/347)
  * feat(`ChatUI`): Add `isLoading` state, improve code in [#354](https://github.com/AVGVSTVS96/astroSite/pull/354)
  * feat(`ChatUI`): Add new GPT-4o model in [#355](https://github.com/AVGVSTVS96/astroSite/pull/355)
  * feat(`ChatUI`): Add stop function to cancel GPT response in [#372](https://github.com/AVGVSTVS96/astroSite/pull/372)
* Add `react-markdown`, implement markdown rendering in `ChatUI` [#375](https://github.com/AVGVSTVS96/astroSite/pull/375)
* feat(`Messages.tsx`): Implement syntax highlighting with `react-syntax-highlighter` in [#381](https://github.com/AVGVSTVS96/astroSite/pull/381)
* feat: Use new `isActiveLink` utility function to highlight active page link in [#369](https://github.com/AVGVSTVS96/astroSite/pull/369)

### Refactor
* `Social.astro`: Refactor and improve component in [#333](https://github.com/AVGVSTVS96/astroSite/pull/333)
* Update blog page filename and path, refactor about page styling in [#332](https://github.com/AVGVSTVS96/astroSite/pull/332)
* Rename `chat.tsx` to `ChatUI.tsx` in [#334](https://github.com/AVGVSTVS96/astroSite/pull/334)
* refactor: Create `ChatUI` directory, separate components to their own files in [#356](https://github.com/AVGVSTVS96/astroSite/pull/356)
* refactor: make imports consistent, use import aliases in [#359](https://github.com/AVGVSTVS96/astroSite/pull/359)
* Refactor form submission logic, replace deprecated `onKeyPress` in [#352](https://github.com/AVGVSTVS96/astroSite/pull/352)
* `Card.astro`: Update, use `cn` function in [#342](https://github.com/AVGVSTVS96/astroSite/pull/342)
* Move TOC components to new TOC directory, export from `index.ts` file in [#364](https://github.com/AVGVSTVS96/astroSite/pull/364)

### Content
* Add new blog post `ResetWindowsPassword` and update existing post titles in [#283](https://github.com/AVGVSTVS96/astroSite/pull/283)

### Config
- Add cloudflare adapter, set to rendering mode to hybrid SSR in [#335](https://github.com/AVGVSTVS96/astroSite/pull/335)

### Style
* style(`Messages.tsx`): Add border radius to code blocks in [#383](https://github.com/AVGVSTVS96/astroSite/pull/383)
* style: Change about page paragraph spacing in [#360](https://github.com/AVGVSTVS96/astroSite/pull/360)
* style: Update `ModelSelector` styling in [#361](https://github.com/AVGVSTVS96/astroSite/pull/361)
* style(`global.css`): Update horizontal scrollbar thickness to match vertical scrollbars in [#382](https://github.com/AVGVSTVS96/astroSite/pull/382)
* style(`ChatBox.tsx`): Update `ChatBox` height, refactor styles in [#389](https://github.com/AVGVSTVS96/astroSite/pull/389)

### Misc
* Delete unused components, move to `ComponentArchive` repo in [#362](https://github.com/AVGVSTVS96/astroSite/pull/362)


**Full Changelog**: [v0.12.1...v0.13.0](https://github.com/AVGVSTVS96/astroSite/compare/v0.12.1...v0.13.0)


## v0.12.1
### Redesign
* Add 4x8 grid and new content to Minimal Typography in [#324](https://github.com/AVGVSTVS96/astroSite/pull/324)
  * Fix typo in Minimal Typography in [#325](https://github.com/AVGVSTVS96/astroSite/pull/325)
  * Use `BaseLayout` in Minimal Typography, add horizontal guidelines in [#326](https://github.com/AVGVSTVS96/astroSite/pull/326)

### Enhancements
* `BlogIndex.astro`, `index.astro`: Update font weights in [#327](https://github.com/AVGVSTVS96/astroSite/pull/327)
* Update blog subheading and prose-code text color to be consistent with rest of site in [#329](https://github.com/AVGVSTVS96/astroSite/pull/329)

**Full Changelog**: [v0.12.0...v0.12.1](https://github.com/AVGVSTVS96/astroSite/compare/v0.12.0...v0.12.1)


## v0.12.0
### Redesign
* Add slate accent color option in [#296](https://github.com/AVGVSTVS96/astroSite/pull/296)
* Add inter font via FontSource, extend Tailwind default theme in [#308](https://github.com/AVGVSTVS96/astroSite/pull/308)
* Update styling for hero, card, logo, projects, and about page in [#309](https://github.com/AVGVSTVS96/astroSite/pull/309)
* `BlogIndex.astro`: Update styling in [#310](https://github.com/AVGVSTVS96/astroSite/pull/310)
* Use `ReactHeader.astro` everywhere, update styling in [#314](https://github.com/AVGVSTVS96/astroSite/pull/314)
* Create new `BlogTimeline` component and `blogLine` page to replace `BlogIndex` in [#316](https://github.com/AVGVSTVS96/astroSite/pull/316)

### Enhancements
- Create `getSortedPosts.astro` util to sort blog posts by published date in [#284](https://github.com/AVGVSTVS96/astroSite/pull/284)
  * Replace `getCollection` in `BlogIndex.astro` with `sortedBlogPosts` function, update styling in [#285](https://github.com/AVGVSTVS96/astroSite/pull/285)
  * Convert `getSortedPosts` util from astro to TypeScript in [#288](https://github.com/AVGVSTVS96/astroSite/pull/288)
  * Refactor post sorting, update blog post link in [#295](https://github.com/AVGVSTVS96/astroSite/pull/295)
  * Remove direct `sortedBlogPosts` import from `CommandMenu.tsx` in [#299](https://github.com/AVGVSTVS96/astroSite/pull/299)

### Refactoring
* Move gpt chat files from utils to chat folder, update import in `gpt.astro` in [#286](https://github.com/AVGVSTVS96/astroSite/pull/286)
* Add type to `getCollection`, remove unused imports, update styles in [#293](https://github.com/AVGVSTVS96/astroSite/pull/293)
* Fix `formatDate.ts` typo in [#289](https://github.com/AVGVSTVS96/astroSite/pull/289)
* Optimize imports, update blog post content in [#304](https://github.com/AVGVSTVS96/astroSite/pull/304)
* `BaseLayout.astro`: Replace `ReactLayout.astro`, and fix BAS-102 in [#315](https://github.com/AVGVSTVS96/astroSite/pull/315)
* Remove date options, already defined in `Intl.DateTimeFormatOptions` in [#287](https://github.com/AVGVSTVS96/astroSite/pull/287)
  
### Content
* Add new blog post `ResetWindowsPassword` and update existing post titles in [#283](https://github.com/AVGVSTVS96/astroSite/pull/283)

**Full Changelog**: [v0.11.2...v0.12.0](https://github.com/AVGVSTVS96/astroSite/compare/v0.11.2...v0.12.0)


## v0.11.2
### Enhancements
* Disable CSS transitions when in dark mode in [#269](https://github.com/AVGVSTVS96/astroSite/pull/269)
* Create `useThemeToggle` hook in new hooks directory and add import alias in [#273](https://github.com/AVGVSTVS96/astroSite/pull/273)
  * Use `useThemeToggle` hook in `CommandMenu` and `ModeToggle` in [#274](https://github.com/AVGVSTVS96/astroSite/pull/274)
* Improve keyboard navigation in `SideMenu` in [#276](https://github.com/AVGVSTVS96/astroSite/pull/276)
* Add `font-smoothing` and `text-rendering` to improve text appearance in [#278](https://github.com/AVGVSTVS96/astroSite/pull/278)

### Refactor
* Refactor `DropdownMenu.tsx` to improve readability and code structure in [#265](https://github.com/AVGVSTVS96/astroSite/pull/265)
* Extract `formatDate` to its own file, add options to configure when called in [#267](https://github.com/AVGVSTVS96/astroSite/pull/267)
* Extract Sun and Moon icons to their own component in [#277](https://github.com/AVGVSTVS96/astroSite/pull/277)

**Full Changelog**: [v0.11.0...v0.11.2](https://github.com/AVGVSTVS96/astroSite/compare/v0.11.0...v0.11.2)


## v0.11.0

### Enhancements
* Convert blog to content collection in [#252](https://github.com/AVGVSTVS96/astroSite/pull/252)
  * Update date handling, use formatted `pubDate` for blog and `ISOString` for JSONLD in [#255](https://github.com/AVGVSTVS96/astroSite/pull/255)
  * Use relative import in `blog5` to fix BAS-84 in [#250](https://github.com/AVGVSTVS96/astroSite/pull/250)
  * Fixes #258 by formatting `pubDate` and updating `onSelect` to navigate to posts/slug in [#260](https://github.com/AVGVSTVS96/astroSite/pull/260)
  * Fixes #259 by updating `CommandMenu` date and title styling in [#261](https://github.com/AVGVSTVS96/astroSite/pull/261)

### Refactor
* Export `DropdownMenuItem` directly from `DropdownMenu` in [#251](https://github.com/AVGVSTVS96/astroSite/pull/251)

### Bug Fixes
* Fix styles not loading in `ReactLayout` in [#257](https://github.com/AVGVSTVS96/astroSite/pull/257)
  
### Content
* Fix blog typo + small update to `Projects component` section in [#247](https://github.com/AVGVSTVS96/astroSite/pull/247)
* Add new blog post about tailwind regex in [#248](https://github.com/AVGVSTVS96/astroSite/pull/248)

**Full Changelog**: [v0.10.6...v0.11.0](https://github.com/AVGVSTVS96/astroSite/compare/v0.10.6...v0.11.0)


## v0.10.6

### Refactor

- Add `Styles` suffix to `Prose.astro` tailwind variable names in [#211](https://github.com/AVGVSTVS96/astroSite/pull/211)
- Use LCH colors for better rainbow gradient in [#212](https://github.com/AVGVSTVS96/astroSite/pull/212)
- Remove DropdownMenuItem, items prop, and map from DropdownMenu.tsx in [#233](https://github.com/AVGVSTVS96/astroSite/pull/233)

### Enhancements

- Create accent color selector and use in react header in [#214](https://github.com/AVGVSTVS96/astroSite/pull/214)
  - Add button variant prop to dropdown menu in [#213](https://github.com/AVGVSTVS96/astroSite/pull/213)
  - Add `onSelect` prop to Dropdown component in [#215](https://github.com/AVGVSTVS96/astroSite/pull/215)
  - Change dropdown menu width, remove `w-24` in [#216](https://github.com/AVGVSTVS96/astroSite/pull/216)
  - Remove hidden class from `DropdownMenu`, hide buttons in `ReactHeader` in [#217](https://github.com/AVGVSTVS96/astroSite/pull/217)
  - Update accent color selector, first working version in [#218](https://github.com/AVGVSTVS96/astroSite/pull/218)
  - Use local storage to store and set the accent color in [#219](https://github.com/AVGVSTVS96/astroSite/pull/219)
  - Add `ariaLabel` prop to `Dropdown` component in [#220](https://github.com/AVGVSTVS96/astroSite/pull/220)

* Update AccentColorSelector logic to AccentColorSelector dropdown in [#223](https://github.com/AVGVSTVS96/astroSite/pull/223)
* Fix `AccentColorSelector` storage event listener not working, refactor code in [#231](https://github.com/AVGVSTVS96/astroSite/pull/231)

- Add shadcn tooltip component in [#226](https://github.com/AVGVSTVS96/astroSite/pull/226)
  - Use `index + 1` as key in `DropdownMenu` map function instead of `item.name` in [#224](https://github.com/AVGVSTVS96/astroSite/pull/224)
  - Update ThemeOptions array with colored circle elements in [#225](https://github.com/AVGVSTVS96/astroSite/pull/225)
  - Use tooltip components within `ThemeOptions` array in [#227](https://github.com/AVGVSTVS96/astroSite/pull/227)
  - Extract tooltip and circle element into `ThemeOptionItem` component in [#228](https://github.com/AVGVSTVS96/astroSite/pull/228)
- Install shadcn-ui navigation-menu component in [#235](https://github.com/AVGVSTVS96/astroSite/pull/235)
  - Use navLinks components built with shadcn `navigation-menu` in [#236](https://github.com/AVGVSTVS96/astroSite/pull/236)

### Miscellaneous

- Add tailwind settings to `settings.json` in [#210](https://github.com/AVGVSTVS96/astroSite/pull/210)
- Update dependabot workflow groups in [#205](https://github.com/AVGVSTVS96/astroSite/pull/205)
- Update `ReactHeader` padding, make responsive for smaller screens in [#229](https://github.com/AVGVSTVS96/astroSite/pull/229)
- Add tailwind attributes and functions to .prettierrc to sort tailwind classes in [#245](https://github.com/AVGVSTVS96/astroSite/pull/245)
- Remove unused import, add `tabindex={-1}` to buttons, add `rounded-md` in [#246](https://github.com/AVGVSTVS96/astroSite/pull/246)

### Dependencies

- bump astro to 4.6.1 and astro-expressive-code to 0.35.0 by @dependabot in [#208](https://github.com/AVGVSTVS96/astroSite/pull/208)
- bump the react group with 4 updates by @dependabot in [#209](https://github.com/AVGVSTVS96/astroSite/pull/209)
- bump the misc group with 3 updates by @dependabot in [#206](https://github.com/AVGVSTVS96/astroSite/pull/206)

**Full Changelog**: [v0.10.2...v0.10.6](https://github.com/AVGVSTVS96/astroSite/compare/v0.10.2...v0.10.6)

## v0.10.2

### New Features

- Create chat card component and use it in gptchat page in [#192](https://github.com/AVGVSTVS96/astroSite/pull/192)
  - Add shadcn card and input components in [#191](https://github.com/AVGVSTVS96/astroSite/pull/191)
  - Make chat card box scroll in [#193](https://github.com/AVGVSTVS96/astroSite/pull/193)
  - Scaffold chat.tsx, select component to chat.tsx, use selections in chat.js in [#194](https://github.com/AVGVSTVS96/astroSite/pull/194)
- Add PWA Manifest File in [#175](https://github.com/AVGVSTVS96/astroSite/pull/175)
- Add condition in `Button.astro` to highlight links based on active page in [#187](https://github.com/AVGVSTVS96/astroSite/pull/187)

### Enhancements

- Decrease blog post width, add margin to article tag in [#185](https://github.com/AVGVSTVS96/astroSite/pull/185)
- Import `global.css` adding tailwind to `gpt.astro`, update styles in [#182](https://github.com/AVGVSTVS96/astroSite/pull/182)
- Remove background blur when opening dialogs like command palette in [#186](https://github.com/AVGVSTVS96/astroSite/pull/186)
- Add `overflow-y-auto` to `SideMenu` so it scrolls when there's not enough vertical space in [#189](https://github.com/AVGVSTVS96/astroSite/pull/189)
- Update `ReactLayout` and `ReactHeader` to center main content in [#190](https://github.com/AVGVSTVS96/astroSite/pull/190)

### Refactor

- Create separate component for logo, adjust styling in [#176](https://github.com/AVGVSTVS96/astroSite/pull/176)
- Create Prose component for blog styling in [#179](https://github.com/AVGVSTVS96/astroSite/pull/179)
- Add `is:inline` to JSON-LD scripts in [#183](https://github.com/AVGVSTVS96/astroSite/pull/183)
- Use Tailwind `grow` instead of legacy `flex-grow` in [#196](https://github.com/AVGVSTVS96/astroSite/pull/196)
- Use href for `DropdownMenu.astro` links in [#197](https://github.com/AVGVSTVS96/astroSite/pull/197)

### Security and dependencies

- chore(meta-deps): override tar to 6.2.1 by @dependabot in [#174](https://github.com/AVGVSTVS96/astroSite/pull/174)
- Remove semantic release in [#188](https://github.com/AVGVSTVS96/astroSite/pull/188)

**Full Changelog**: [v0.10.0...v0.10.2](https://github.com/AVGVSTVS96/astroSite/compare/v0.10.0...v0.10.2)

## v0.10.0

### Enhancements

- Enable Astro prefetching, prefetch all links on load in [#150](https://github.com/AVGVSTVS96/astroSite/pull/150)
- Add title and description to react page in [#151](https://github.com/AVGVSTVS96/astroSite/pull/151)
- Create composable React `DropdownMenu` component, use for projects on react page in [#160](https://github.com/AVGVSTVS96/astroSite/pull/160)
  - Add padding to dropdown items, add rotate transition to chevron icon in [#166](https://github.com/AVGVSTVS96/astroSite/pull/166)
  - Update Dropdown button and icon CSS in [#167](https://github.com/AVGVSTVS96/astroSite/pull/167)
  - Add `margin-top` to icon to better align with text in [#170](https://github.com/AVGVSTVS96/astroSite/pull/170)
  - Set alignment for Dropdown and update `nav` margin-left in [#172](https://github.com/AVGVSTVS96/astroSite/pull/172)

### Refactor

- Refactor react `ModeToggle`, remove dropdown, fixes #128 in [#157](https://github.com/AVGVSTVS96/astroSite/pull/157)
- Refactor Dropdown in [#171](https://github.com/AVGVSTVS96/astroSite/pull/171)

### Security

- chore(meta-deps): Add overrides to resolve security vulnerabilities in [#149](https://github.com/AVGVSTVS96/astroSite/pull/149)

### Dependencies

- chore(deps): bump astro to 4.5.16, expressive-code to 0.34.1 by @dependabot in [#161](https://github.com/AVGVSTVS96/astroSite/pull/161)
- chore(deps): bump openai, wrangler, type-coverage, and typescript by @dependabot in [#162](https://github.com/AVGVSTVS96/astroSite/pull/162)
- chore(deps): bump lucide-react from 0.363.0 to 0.365.0 by @dependabot in [#163](https://github.com/AVGVSTVS96/astroSite/pull/163)
- chore(deps): bump @types/react-dom from 18.2.23 to 18.2.24 by @dependabot in [#164](https://github.com/AVGVSTVS96/astroSite/pull/164)

**Full Changelog**: [v0.9.7...v0.10.0](https://github.com/AVGVSTVS96/astroSite/compare/v0.9.7...v0.10.0)

## v0.9.7

### Enhancements

- Move navigation links to their own file, import where needed, closes #133 in [#139](https://github.com/AVGVSTVS96/astroSite/pull/139)
- Update `ReactLayout` theme script and remove unneeded CSS import in [#142](https://github.com/AVGVSTVS96/astroSite/pull/142)
- Use grid in `MDLayout` instead of flexbox to fix #130 in [#145](https://github.com/AVGVSTVS96/astroSite/pull/145)

### Refactor

- Refactor: base layout, KB shortcut script, and CSS in [#144](https://github.com/AVGVSTVS96/astroSite/pull/144)

### Dependencies

- chore(deps): bump astro to 4.5.14, @astrojs/check to 0.5.10, sharp to 0.33.3 by @dependabot in [#140](https://github.com/AVGVSTVS96/astroSite/pull/140)
- chore(deps-dev): bump tailwindcss to 3.4.3, @tailwindcss/typography to 0.5.12 by @dependabot in [#120](https://github.com/AVGVSTVS96/astroSite/pull/120)
- chore(deps): bump @types/react-dom to 18.2.23, @astrojs/react to 18.7.4, and @types/react to 18.2.74 by @dependabot in [#122](https://github.com/AVGVSTVS96/astroSite/pull/122)
- chore(deps): bump openai, typescript, type-coverage, and wrangler by @dependabot in [#141](https://github.com/AVGVSTVS96/astroSite/pull/141)
- chore(deps-dev): bump prettier-plugin-tailwindcss from 0.5.12 to 0.5.13 by @dependabot in [#121](https://github.com/AVGVSTVS96/astroSite/pull/121)

**Full Changelog**: [v0.9.6...v0.9.7](https://github.com/AVGVSTVS96/astroSite/compare/v0.9.6...v0.9.7)

## v0.9.6

### Bug Fixes

- Revert `NavBar` to sticky in [#126](https://github.com/AVGVSTVS96/astroSite/pull/126)

**Full Changelog**: [v0.9.5...v0.9.6](https://github.com/AVGVSTVS96/astroSite/compare/v0.9.5...

## v0.9.5

### Accessibility Improvements

- Wrap project cards in `<li>` tags to fix accessibility warning in [#113](https://github.com/AVGVSTVS96/astroSite/pull/113)
- Add navigation links to `ReactHeader` and add aria labels to buttons in [#124](https://github.com/AVGVSTVS96/astroSite/pull/124)

### Enhancements

- Add `buttonStyles` prop to `CommandMenu`, use prop in `NavBar` to make button height shorter in [#114](https://github.com/AVGVSTVS96/astroSite/pull/114)
- Update `CommandMenu` styling in [#115](https://github.com/AVGVSTVS96/astroSite/pull/115)
- List blog posts in `CommandMenu.tsx`, resolves BAS-22 in [#117](https://github.com/AVGVSTVS96/astroSite/pull/117)
- Update blog titles, resolves BAS-38 in [#118](https://github.com/AVGVSTVS96/astroSite/pull/118)
- List blog posts in `CommandMenu` in `ReactHeader` in [#119](https://github.com/AVGVSTVS96/astroSite/pull/119)

### Styling

- Update `NavBar` position to fixed in [#125](https://github.com/AVGVSTVS96/astroSite/pull/125)

**Full Changelog**: [v0.9.3...v0.9.5](https://github.com/AVGVSTVS96/astroSite/compare/v0.9.3...v0.9.5)

## v0.9.3

### Enhancements

- Create `CommandMenu` component, use in `react.astro` in [#111](https://github.com/AVGVSTVS96/astroSite/pull/111)
- Use `CommandMenu` and `SideMenu` in `NavBar.astro` in [#112](https://github.com/AVGVSTVS96/astroSite/pull/112)

**Full Changelog**: [v0.9.2...v0.9.3](https://github.com/AVGVSTVS96/astroSite/compare/v0.9.2...v0.9.3)

## v0.9.2

### Enhancements

- Update `DropdownMenu.astro` text and bg colors, decrease link border radius in [#105](https://github.com/AVGVSTVS96/astroSite/pull/105)

### Bug Fixes

- Updated the name of `ThemeToggle` local storage variable to fix #106 in [#107](https://github.com/AVGVSTVS96/astroSite/pull/107)
- Improve keyboard navigation accessibility by resolving tabindex in [#109](https://github.com/AVGVSTVS96/astroSite/pull/109)

### Refactor

- Re-organize components directory in [#108](https://github.com/AVGVSTVS96/astroSite/pull/108)

**Full Changelog**: [v0.9.0...v0.9.2](https://github.com/AVGVSTVS96/astroSite/compare/v0.9.0...v0.9.2)

## v0.9.0

### Enhancements

- Create rainbow ring around theme switcher icon in [#75](https://github.com/AVGVSTVS96/astroSite/pull/75)
- Add `mx-0.5` to dropdown menu items to fix #76 in [#78](https://github.com/AVGVSTVS96/astroSite/pull/78)
- Add `flex-grow` to fix #82, add gradient to color icon, improve ThemeSwitcher code in [#83](https://github.com/AVGVSTVS96/astroSite/pull/83)
- Add accent color gradient border to top of `NavBar` in [#88](https://github.com/AVGVSTVS96/astroSite/pull/88)
- Add React and shadcn/ui page, create header on react page, update config and css in [#89](https://github.com/AVGVSTVS96/astroSite/pull/89)
- Update nav, dropdown, and button styling in [#91](https://github.com/AVGVSTVS96/astroSite/pull/91)
- Create `Reactheader` component, use Astro Icon for logo, import into `ReactLayout` in [#92](https://github.com/AVGVSTVS96/astroSite/pull/92)
- Fix #93 - delete `border-card` css, use shadcn border color in `Card`, `BlogIndex`, and `Footer` in [#94](https://github.com/AVGVSTVS96/astroSite/pull/94)
- Styling: Update `NavBar`, `Footer`, and bg-color in `Baselayout` in [#95](https://github.com/AVGVSTVS96/astroSite/pull/95)
- Increase `NavBar` height with `py-1` in [#96](https://github.com/AVGVSTVS96/astroSite/pull/96)
- Eliminate FOUC by initializing and applying theme in BaseLayout in [#101](https://github.com/AVGVSTVS96/astroSite/pull/101)
- Create `SideMenu` sidebar nav menu with shadcn sheet component in [#102](https://github.com/AVGVSTVS96/astroSite/pull/102)

### Dependencies

- chore(deps): bump astro from 4.4.9 to 4.4.15 in [#74](https://github.com/AVGVSTVS96/astroSite/pull/74)
- chore(deps): bump `openai` to 4.29.1, `typescript` to 5.4.2, and `wrangler` to 3.34.2 by @dependabot in [#81](https://github.com/AVGVSTVS96/astroSite/pull/81)
- chore(deps): bump the astro group with 3 updates by @dependabot in [#86](https://github.com/AVGVSTVS96/astroSite/pull/86)
- chore(deps-dev): bump prettier-plugin-tailwindcss from 0.5.11 to 0.5.12 by @dependabot in [#79](https://github.com/AVGVSTVS96/astroSite/pull/79)

### Documentation

- Update README.md - Add `codespaces` link and update content in [#77](https://github.com/AVGVSTVS96/astroSite/pull/77)

**Full Changelog**: [v0.8.2...v0.9.0](https://github.com/AVGVSTVS96/astroSite/compare/v0.8.2...v0.9.0)

## v0.8.2

### Enhancements

- Update `flaskSite` content and fix margin top in [70](https://github.com/AVGVSTVS96/astroSite/pull/70)
- Create color icon SVG and use as `ThemeSwitcher` icon in [71](https://github.com/AVGVSTVS96/astroSite/pull/71)
- Add `items-center` to `Button` component in [73](https://github.com/AVGVSTVS96/astroSite/pull/73)

### Dependencies

- bump the misc group with 2 updates by @dependabot in [66](https://github.com/AVGVSTVS96/astroSite/pull/66)
- bump the astro group with 1 update by @dependabot in [68](https://github.com/AVGVSTVS96/astroSite/pull/68)
- bump astro from 4.4.8 to 4.4.9 by @dependabot in [72](https://github.com/AVGVSTVS96/astroSite/pull/72)

**Full Changelog**: [v0.8.1...v0.8.2](https://github.com/AVGVSTVS96/astroSite/compare/v.0.8.1...v0.8.2)

## v0.8.1

### Dependencies

- Use my published `remark-sectionize` fork in [#54](https://github.com/AVGVSTVS96/astroSite/pull/54)
- bump `ip` from 2.0.0 to 2.0.1 by @dependabot in [#55](https://github.com/AVGVSTVS96/astroSite/pull/55)
- bump `@astrojs/check` from 0.5.4 to 0.5.6 by @dependabot in [#58](https://github.com/AVGVSTVS96/astroSite/pull/58)
- bump the astro group with 2 updates by @dependabot in [#56](https://github.com/AVGVSTVS96/astroSite/pull/56)

### Bug Fixes

- fix: Add `overflow-x-hidden` to fix side scrolling in [#56](https://github.com/AVGVSTVS96/astroSite/pull/61)

**Full Changelog**: [v0.8.0...v0.8.1](https://github.com/AVGVSTVS96/astroSite/compare/v0.8.0...v.0.8.1)

## v0.8.0

### Bug fixes

- Stop scrollbar from shifting page layout and add GPT Chat link to mobile menu in https://github.com/AVGVSTVS96/astroSite/pull/51

### Dependencies

- bump Wrangler to 3.29.0 in https://github.com/AVGVSTVS96/astroSite/pull/53

**Full Changelog**:[v0.7.6...v0.8.0](https://github.com/AVGVSTVS96/astroSite/compare/v0.7.6...v0.8.0)

## v0.7.6

### Refactor

- Add aria-labels and update Button + SVG colors in [#47](https://github.com/AVGVSTVS96/astroSite/pull/47)
- implement class:list for better organization. of variable styles in [#48](https://github.com/AVGVSTVS96/astroSite/pull/48)
- add HTML attributes, fix typo, match button hover colors in [#50](https://github.com/AVGVSTVS96/astroSite/pull/50)

### Dependencies

- bump ip from 2.0.0 to 2.0.1 by @dependabot in [#49](https://github.com/AVGVSTVS96/astroSite/pull/49)

**Full Changelog**: [v0.7.5...v0.7.6](https://github.com/AVGVSTVS96/astroSite/compare/v0.7.5...v0.7.6)

## v0.7.5

### Refactor

- Use `Astro-icon` in `Button`, add `astro check` script, misc improvements in [#45](https://github.com/AVGVSTVS96/astroSite/pull/45)

### Style

- Update blog post line height and inline code styling in [#44](https://github.com/AVGVSTVS96/astroSite/pull/44)

### Dependencies

- Update astro to 4.4.0, wrangler to 3.28.3, openai to 4.28.0 in [#46](https://github.com/AVGVSTVS96/astroSite/pull/46)

**Full Changelog**: [v0.7.4...v0.7.5](https://github.com/AVGVSTVS96/astroSite/compare/v0.7.4...v0.7.5)

## v0.7.4

### Refactor

- Refactor and format code in [#42](https://github.com/AVGVSTVS96/astroSite/pull/42)

### Style

- Update code theme, button colors, blog post widths, breakpoints, and refactor in [#43](https://github.com/AVGVSTVS96/astroSite/pull/43)

**Full Changelog**: [v0.7.3...v0.7.4](https://github.com/AVGVSTVS96/astroSite/compare/v0.7.3...v0.7.4)

## v0.7.3

### Refactor

- Use recursive component for `TableOfContentsHeading` in [#38](https://github.com/AVGVSTVS96/astroSite/pull/38)
- Improve TOC Icon rendering, use `hidden` class instead of conditional rendering in [#39](https://github.com/AVGVSTVS96/astroSite/pull/39)

### Content

- Update blog content, update code block styling in [#41](https://github.com/AVGVSTVS96/astroSite/pull/41)

**Full Changelog**: [v0.7.2...v0.7.3](https://github.com/AVGVSTVS96/astroSite/compare/v0.7.2...v0.7.3)

## v0.7.2

### Features

- update to older gpt-4-0613 model [#36](https://github.com/AVGVSTVS96/astroSite/pull/36)

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

- Migrated and Converted Flask Website to Astro Page in [#3](https://github.com/AVGVSTVS96/astroSite/pull/3)
  - [Updated Favicon](https://github.com/AVGVSTVS96/astroSite/commit/5e95ebb1f99fa9b96d120ab2310395cf55ad1441) and [linked it in `flaskSite.astro`](https://github.com/AVGVSTVS96/astroSite/commit/90815ce73ec0e14df78c107608869b8b3b24e670)
  - [Add Home Button to `flaskSite.astro` page](https://github.com/AVGVSTVS96/astroSite/commit/f26ef4d3776c916925b3f105786e7eef3a916307)
  - [Added newly supported Chrome CSS scrollbar styles](https://github.com/AVGVSTVS96/astroSite/commit/a309dae62c9f8a4ff96cacc2e74409166bfc907b)
  - [Imported `global.css` in `flaskSite.astro`](https://github.com/AVGVSTVS96/astroSite/commit/98261e8dd4bb160ea976acd53631e09491a562df)
  - [Refactored styles, moved page specific styles to layout pages](https://github.com/AVGVSTVS96/astroSite/commit/157d76b2aea2e290a1f09fd0b64ac52fbecba004)
  - [Added TypeScript types to `flaskSite.astro` script](https://github.com/AVGVSTVS96/astroSite/commit/973fbcb762f8ef0cea51a03645bedda1122aadae)
