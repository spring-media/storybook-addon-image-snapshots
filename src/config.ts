export interface Config {
  storybookUrl?: string;
  browserUrl?: string;
}

export const DEFAULT_CONFIG: Config = {
  storybookUrl: 'http://host.docker.internal:9001',
  browserUrl: 'http://localhost:9222',
};
