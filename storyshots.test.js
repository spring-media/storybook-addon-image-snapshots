import initStoryShots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';
import puppeteer from 'puppeteer';
import kebabCase from 'lodash.kebabcase';

const {
  STORYBOOK_FRAMEWORK = 'vue',
  STORYBOOK_URL = 'http://host.docker.internal:9001',
  BROWSER_URL = 'http://localhost:9222',
} = process.env;

let browser = null;

afterAll(async () => {
  await browser.close();
});

const getMatchOptions = () => ({
  customSnapshotsDir: `${process.cwd()}/image_snapshots`,
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
      imageSnapshot: { selector } = {
        selector: '#root',
      },
    },
  } = context;

  await page.setViewport(getDesiredViewport(viewports, defaultViewport));

  await page.waitForSelector(selector);

  const { x, y, width, height } = await page.evaluate(() => {
    const element = document.querySelector(selector);
    const rect = element.getBoundingClientRect();
    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
  });

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
  framework: STORYBOOK_FRAMEWORK,
  test: imageSnapshot({
    storybookUrl: STORYBOOK_URL,
    getCustomBrowser: async () => {
      browser = await puppeteer.connect({
        browserURL: BROWSER_URL,
      });
      return browser;
    },
    beforeScreenshot,
    getMatchOptions,
    getScreenshotOptions,
  }),
});
