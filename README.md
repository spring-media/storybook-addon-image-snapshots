## Intro

This plugin uses [@storybook/storyshots-puppeteer](https://github.com/storybookjs/storybook/tree/master/addons/storyshots/storyshots-puppeteer) to capture screenshots from your stories.
It provided some additional features like:
- capturing specific viewports (dependency on [@storybook/addon-viewport](https://github.com/storybookjs/storybook/tree/master/addons/viewport))
- capture only specific elements on the page
- adds a panel in the storybook ui to display the snapshots
However, the main purpose is to run the tests against a (chrome) browser that is running in a docker container, please see [Why docker?](#why-docker) for a detailed explanation.


## Table of contents
- [Installation](#installation)
- [Usage](#usage)
    - [Running storybook server](#testing-with-a-local-running-storybook-server)
    - [Static storybook build](#testing-with-a-local-static-storybook-build)
    - [Testing different viewports](#testing-different-viewports)
    - [Select a specific element](#select-a-specific-element-for-taking-a-snapshot)
    - [Custom configuration](#custom-configuration)
    - [Display snapshots in storybook](#display-snapshots-in-storybook)
- [Notes](#notes)
    - [Why Docker?](#why-docker)

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
  addons: ['@spring-media/storybook-addon-image-snapshots']
}
```

> This is optional if you don't want to display the snapshots within storybook

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

There are a few things that has to be changed in order to test a static build of storybook:

```sh
docker run -p 9222:3000 -d --rm --name chrome -v $(pwd)/storybook-static/:/opt/storybook-static browserless/chrome
```

> By default, storybook will create a storybook-static directory that contains all static files

> Since the tests are running in a docker container, we must mount the local static directory into the containers file system

Change the `storybookUrl` option (see [Custom Configuration](#custom-configuration)) to `file:///opt/storybook-static`.

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

### Disable image snapshots for specific stories

To disable specific stories from generating image snapshots, configure your story as follows:

```javascript
export const myStory = () => ({...});
myStory.story = {
  parameters: {
    storyshots: {
      disable: true,
    }
  }
};
```

### Custom Configuration

Since this plugin is only a wrapper around storyshots-puppeteer, the signature of `initImageSnapshots` is the same as [initStoryshots](https://github.com/storybookjs/storybook/tree/next/addons/storyshots/storyshots-puppeteer#imagesnapshots).
But, you should not customize `getCustomBrowser`, `beforeScreenshot` and `getScreenshotOptions` since there are used internally by this plugin.

**browserUrl**

This url should point to the running docker container (default: http://localhost:9222)

**storybookUrl**

This is the url to your storybook server that is called from within the docker container (default: http://host.docker.internal:9001)

> Make sure your storybook server run on port 9001

> You may ask what the heck is this host and where does it come from: host.docker.internal? Find more information here: [docker networking](https://docs.docker.com/docker-for-mac/networking/) why we need to set this host.

### Display snapshots in storybook

This plugin adds a panel in the storybook ui to display the image snapshot of a story.

First register the addon in the main.js file:

```javascript
module.exports = {
  addons: ['@spring-media/storybook-addon-image-snapshots']
}
```

Then you have to tell the panel where to find the image. You can do this by either add a global parameter in the preview.js file:
```javascript
import { addParameters } from '@storybook/vue';

addParameters({
  imageSnapshots: {
    snapshotFileName: ({ id }) => `storyshots-${id}-snap.png`,
  },
});
```
or in the configuration of a story:

```javascript
export const myStory = () => ({...});
myStory.story = {
  parameters: {
    imageSnapshots: {
      snapshotFileName: ({ id }) => `storyshots-${id}-snap.png`,
    }
  }
};
```

> You can customize the filename of the snapshot through [getMatchOptions](https://github.com/storybookjs/storybook/tree/master/addons/storyshots/storyshots-puppeteer#specifying-options-to-jest-image-snapshots)

The last thing is to add the directory of your image snapshots to the static-dir configuration of the storybook server:

```json
{
    "scripts": {
        "storybook": "start-storybook -p 8888 -s .image-snapshots"
    }
}
```

> The example above assumes, that the images are be located within the .image-snapshots directory.

## Notes

### Why Docker?

There are some challenges when it comes to capture screens from a browser as described [here](https://storybook.js.org/docs/testing/automated-visual-testing/#challenges).
Because of that, we need a way to create a result that is as much as possible independent of the host system. 
By using docker, we get an isolated system that is reliable enough to produce the same results on different host systems.

