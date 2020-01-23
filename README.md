# Work in progress, not meant to be used yet.

## Intro

*TODO*

## Table of contents
- [Installation](#installation)
- [Usage](#usage)
    - [Running storybook server](#testing-with-a-local-running-storybook-server)
    - [Static storybook build](#testing-with-a-local-static-storybook-build)
    - [Testing different viewports](#testing-different-viewports)
    - [Select a specific element](#select-a-specific-element-for-taking-a-snapshot)
    - [Custom configuration](#custom-configuration)
- [Notes](#notes)
    - [Why Docker?](#why-docker)
- [Examples](#examples)

## Getting Started

### Installation

Install the following package:

```sh
npm i @spring-media/storybook-addon-image-snapshots -D
```

> After a successfully installation, a postinstall script will try to add a folder `.image-snapshots` in your project root which contains the actual test file.

## Usage

Within the `.storybook/main.js` add the package to the plugins list:

```javascript
module.exports = {
  addons: ['@spring-media/storybook-addon-image-snapshots/register']
}
```

Add the following entry to the script section of your package.json:
```
"scripts": {
  "image-snapshots": "jest --config your-specific-jest.config.js .image-snapshots/image-snapshots.test.js"
}
```

### Testing with a local running storybook server

By default, the plugin expects that a local storybook server is running on the port `9001`.

Start the docker container with the following arguments:
```sh
docker run -p 9222:3000 --rm -d --name chrome browserless/chrome
```

Then run the previously added script:
```sh
npm run image-snapshots
```

### Testing with a local static storybook build

*TODO*

### Testing different viewports

Testing different viewports requires the official [@storybook/addon-viewport](https://github.com/storybookjs/storybook/tree/master/addons/viewport) to be installed and activated.

Below is an example how to configure your story with the viewport configuration:

```javascript
export const myStory = () => ({...});
myStory.story = {
  parameters: {
    viewport: {
      defaultViewport: 'small'
    }
  }
};
```

> This example assumes, that a viewport plugin has a configuration entry with a key "small".

### Select a specific element for taking a snapshot

You can configure the story to take a snapshot only of a certain element by providing a selector.

```javascript
export const myStory = () => ({...});
myStory.story = {
  parameters: {
    imageSnapshot: {
      selector: '.my-element'
    }
  }
};
```

### Custom Configuration

*TODO*

## Notes

### Why Docker?

*TODO

## Examples

*TODO*
