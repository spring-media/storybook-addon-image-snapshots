import initStoryShots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';
import puppeteer from 'puppeteer-core';
import kebabCase from 'lodash.kebabcase';
import { existsSync } from 'fs';

const defaultConfig = {
  STORYBOOK_FRAMEWORK: 'vue',
  STORYBOOK_URL: 'http://host.docker.internal:9001',
  BROWSER_URL: 'http://localhost:9222',
  SNAPSHOTS_CONFIG_DIR: '.image-snapshots',
  SNAPSHOTS_IMAGE_DIR: 'snapshots',
};

const getConfig = () => {
  let config = defaultConfig;
  const configPath = `${process.cwd()}/image-snapshots.config.js`;

  if (existsSync(configPath)) {
    config = require(configPath);
  }

  return { ...defaultConfig, ...config };
};

const config = getConfig();

let browser = null;

afterAll(async () => {
  await browser.close();
});

const getMatchOptions = () => ({
  customSnapshotsDir: `${config.SNAPSHOTS_CONFIG_DIR}/${config.SNAPSHOTS_IMAGE_DIR}`,
  customSnapshotIdentifier: ({ currentTestName }) => kebabCase(currentTestName),
});

const getScreenshotOptions = ({ context: { clip } }) => ({ clip });

const beforeScreenshot = async (page, { context }) => {
  const {
    parameters: {
      viewport: { viewports, defaultViewport } = {
        viewports: {},
        defaultViewport: null,
      },
      imageSnapshot: { selector } = { selector: '#root' },
    },
  } = context;

  await page.setViewport(getDesiredViewport(viewports, defaultViewport));

  await page.waitForSelector(selector);

  const { x, y, width, height } = await page.evaluate(
    ({ selector }) => {
      const element = document.querySelector(selector);
      const { x, y, width, height } = element.getBoundingClientRect();
      return { x, y, width, height };
    },
    { selector }
  );

  const viewport = page.viewport();

  if (viewport.height < height) {
    await page.setViewport({ ...viewport, ...{ height } });
  }

  context.clip = { x, y, width, height };

  return page;
};

const getDesiredViewport = (viewports, defaultViewport) => {
  if (!viewports[defaultViewport]) {
    return { width: 1920, height: 1080, deviceScaleFactor: 2 };
  }

  const {
    styles: { width, height },
  } = viewports[defaultViewport];

  return {
    width: parseInt(width, 10),
    height: parseInt(height, 10),
    deviceScaleFactor: 2,
  };
};

initStoryShots({
  framework: config.STORYBOOK_FRAMEWORK,
  test: imageSnapshot({
    storybookUrl: config.STORYBOOK_URL,
    getCustomBrowser: async () => {
      browser = await puppeteer.connect({
        browserURL: config.BROWSER_URL,
      });
      return browser;
    },
    beforeScreenshot,
    getMatchOptions,
    getScreenshotOptions,
  }),
});
