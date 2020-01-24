# Work in progress, not meant to be used yet.

## Intro

This plugin uses [@storybook/storyshots-puppeteer](https://github.com/storybookjs/storybook/tree/master/addons/storyshots/storyshots-puppeteer) to capture screenshots from your stories.
It provides some additional features on top but the main purpose is to run the tests against a (chrome) browser that is running in a docker container.
See [Why docker?](#why-docker) for a detailed explanation.

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

## Usage

Within the `.storybook/main.js` add the package to the plugins list:

```javascript
module.exports = {
  addons: ['@spring-media/storybook-addon-image-snapshots/register']
}
```

Create a file `image-snapshots.runner.js` with the following content:

> The file should not be suffixed with '.test.js' to avoid being run with all other test files

```javascript
import { initImageSnapshots } from '@spring-media/storybook-addon-image-snapshots';

initImageSnapshots();
```

Add the following entry to the script section of your package.json:
```
"scripts": {
  "image-snapshots": "jest --config your-specific-jest.config.js image-snapshots.runner.js"
}
```

> Do not forget to add a rule for the 'runner.js' suffix in jest's testMatch option.

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


## Notes

### Why Docker?

There are some challenges when it comes to capture screens from a browser as described [here](https://storybook.js.org/docs/testing/automated-visual-testing/#challenges).
Because of that, we need a way to create a result that is as much as possible independent from the host system. 
By using docker, we get an isolated system that is reliable enough to produce the same results on different host systems.

## Examples

*TODO*
