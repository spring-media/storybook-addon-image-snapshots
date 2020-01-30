import initStoryShots from '@storybook/addon-storyshots';
import { Context, imageSnapshot } from '@storybook/addon-storyshots-puppeteer';
import puppeteer from 'puppeteer-core';
import { DEFAULT_CONFIG } from './config';
import { PARAM_KEY } from './constants';

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
// @ts-ignore
const getScreenshotOptions = ({ context: { id } }: ScreenshotOptions) => {
  if (!clipMap.has(id)) {
    return {};
  }

  return { clip: clipMap.get(id) };
};

const beforeScreenshot = async (page: puppeteer.Page, { context }: ScreenshotOptions) => {
  const {
    parameters: {
      viewport: { viewports, defaultViewport } = {
        viewports: {},
        defaultViewport: null,
      },
      [PARAM_KEY]: { selector } = { selector: null },
    },
    // @ts-ignore
    id,
  } = context;

  await page.setViewport(getDesiredViewport(viewports, defaultViewport));

  if (!selector) {
    return page;
  }

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

  clipMap.set(id, { x, y, width, height });

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
