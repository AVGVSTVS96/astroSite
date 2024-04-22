---
title: 'Set up TailwindCSS intellisense for JavaScript and TypeScript'
description: "Tailwind's VS Code extension doesn't detect utility classes in JavaScript or TypeScript declarations by default. But it can be configured to do so, we can add support for data types like strings, arrays, and objects using Regex. In this post, I'll show you how to configure Tailwind intellisense and autocomplete suggestions for Javascript and Typescript variables in VS Code."
pubDate: 'April 22, 2024'
image: ''
author: 'Bassim Shahidy'
tags: ['TailwindCSS', 'VS Code', 'Intellisense', JavaScript', 'TypeScript', 'types', 'variables']
layout: '@layouts/MDLayout.astro'
---

---

A common pattern in web development is setting CSS in Javascript for more control over dynamic styling. However, some custom Regex and configuration is required for Tailwind's VS Code extension to detect utility classes in Javascript and Typescript. 

![Example image showing an array declaration called `variableStyles` with typescript types, strings, and conditional class assignments.](/src/images/variableStylesExample.png)

## Open your VS Code `settings.json` file
This setting is accessed and edited through the `settings.json` file in VS Code. To open it, press `Ctrl + Shift + P` or `Cmd + Shift + P` open the command palette and type `Preferences: Open User Settings (JSON)` and press enter. This will open the JSON file containing all global settings for VS Code.

Alternatively, you can search for `Preferences: Open Workspace Settings (JSON)` to create a local `settings.json` file in your current directory that only applies settings to your project. This is helpful for setting up specific settings like tailwind regex for a project, without affecting VS Code's global settings.

### Add the Tailwind classRegex setting
Add the following JSON object to your `settings.json` file.

```json
"tailwindCSS.experimental.classRegex": []
```

I like using a special name for all my utility class variables. I typically suffix these declarations with `Styles`, this way I can easily configure my regex to identify them in my code. This keyword can be whatever you want, though.

#### TypeScript and JavaScript Regex 

```json
"tailwindCSS.experimental.classRegex": [
    ["Styles\\s*(?::\\s*[^=]+)?\\s*=\\s*([^;]*);", "['\"`]([^'\"`]*)['\"`]"]
]
```

This regex is a combination of several options I've found through searching online.

**It'll capture tailwind classes within:**
 - Variables ending with a "Styles" suffix and with or without TypeScript types
 - Strings, arrays, or objects
 - Single quotes, double quotes, or backticks

### Regex for tailwind libraries like cva and clsx

You also have to add custom regex if you use libraries like `cva` and `clsx` to detect utility classes in these functions.

```json
"tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["clsx\\(.*?\\)(?!\\])", "(?:'|\"|`)([^\"'`]*)(?:'|\"|`)"],
]
```
You can find all this regex along with a host of other options for different libraries and use cases on  [tailwind-intellisense-regex-list](https://github.com/paolotiu/tailwind-intellisense-regex-list) on GitHub. Thanks to [Paulo Tiu](https://www.paolotiu.com) for putting the resource together!

## Another essential VS Code setting for working with TailwindCSS
In your `settings.json` file, add the following JSON object to improve autocomplete suggestions for tailwind classes. This triggers autocomplete suggestions while typing strings, while the default relies on whitespace to trigger suggestions.

```json
"editor.quickSuggestions": {
  "strings": "on"
}
```

I learned about this neat trick while reading Sixian Li's' [blog post](https://www.sixian.li/writing/tailwind-autocomplete-done-right), who originally credited it to this [tweet](https://twitter.com/zuozizhen/status/1614519138420150272?s=20).

## Resources
- https://www.sixian.li/writing/tailwind-autocomplete-done-right
- https://github.com/paolotiu/tailwind-intellisense-regex-list
- https://www.paolotiu.com/blog/get-tailwind-intellisense-anywhere