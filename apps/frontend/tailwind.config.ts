import type { Config } from 'tailwindcss';
import baseTailwindConfig from './tailwind.config.base';

const config: Config = {
  ...baseTailwindConfig,
  content: ['./src/**/*.{ts,tsx,mdx}'],
  safelist: [
    {
      pattern: /.*/,
    },
  ],
};

export default config;
