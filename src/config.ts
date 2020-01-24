import { SupportedFramework } from '@storybook/addon-storyshots';

export interface Config {
  framework?: SupportedFramework;
  storybookUrl?: string;
  browserUrl?: string;
  imageSnapshotsDir?: string;
}

export const DEFAULT_CONFIG: Config = {
  framework: 'vue',
  storybookUrl: 'http://host.docker.internal:9001',
  browserUrl: 'http://localhost:9222',
  imageSnapshotsDir: '.image-snapshots',
};
