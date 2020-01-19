import initStoryShots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';
import puppeteer from 'puppeteer';
import kebabCase from 'lodash.kebabcase';

const {
  STORYBOOK_FRAMEWORK = 'vue',
  STORYBOOK_URL = 'http://host.docker.internal:9001',
  BROWSER_URL = 'http://localhost:9222',
  SNAPSHOTS_DIR = '.image-snapshots'
} = process.env;

let browser = null;

afterAll(async () => {
  await browser.close();
});

const getMatchOptions = () => ({
  customSnapshotsDir: SNAPSHOTS_DIR,
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
