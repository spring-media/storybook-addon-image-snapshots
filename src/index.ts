import initStoryShots from '@storybook/addon-storyshots';
import { Context, imageSnapshot } from '@storybook/addon-storyshots-puppeteer';
import puppeteer from 'puppeteer-core';
import { DEFAULT_CONFIG } from './config';

interface ScreenshotOptions {
  context: Context;
  url: string;
}

export interface Viewport {
  styles: {
    width: string;
    height: string;
  };
}

export interface Viewports {
  [key: string]: Viewport;
}

const getDesiredViewport = (viewports: Viewports, defaultViewport: string): puppeteer.Viewport => {
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

const clipMap = new Map();

const getScreenshotOptions = ({ context }: ScreenshotOptions) => ({ clip: clipMap.get(context.story) });

const beforeScreenshot = async (page: puppeteer.Page, { context }: ScreenshotOptions) => {
  const {
    parameters: {
      viewport: { viewports, defaultViewport } = {
        viewports: {},
        defaultViewport: null,
      },
      imageSnapshot: { selector } = { selector: '#root' },
    },
    story,
  } = context;

  await page.setViewport(getDesiredViewport(viewports, defaultViewport));

  await page.waitForSelector(selector);

  const { x, y, width, height } = await page.evaluate(
    ({ selector }) => {
      const element = document.querySelector(selector);
      const { x, y, width, height } = element.getBoundingClientRect();
      return { x, y, width: Math.ceil(width), height: Math.ceil(height) };
    },
    { selector },
  );

  const viewport = page.viewport();

  if (viewport.height < height) {
    await page.setViewport({ ...viewport, ...{ height } });
  }

  clipMap.set(story, { x, y, width, height });

  return page;
};

export const initImageSnapshots = (config = {}): void => {
  let browser: puppeteer.Browser;

  const getCustomBrowser = async () => {
    browser = await puppeteer.connect({
      browserURL: browserUrl,
    });
    return browser;
  };

  const imageSnapshotConfig = { getCustomBrowser, beforeScreenshot, getScreenshotOptions };
  const storyShotsConfig = { ...DEFAULT_CONFIG, ...imageSnapshotConfig, ...config };
  const { browserUrl } = storyShotsConfig;

  afterAll(async () => {
    await browser.close();
  });

  return initStoryShots({
    ...storyShotsConfig,
    // @ts-ignore
    test: imageSnapshot({ ...storyShotsConfig }),
  });
};
