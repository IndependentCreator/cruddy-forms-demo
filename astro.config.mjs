import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import tasks from './src/utils/tasks';
import { readingTimeRemarkPlugin } from './src/utils/frontmatter.mjs';
import { SITE } from './src/utils/config.ts';
import cloudflare from '@astrojs/cloudflare';
import compress from 'astro-compress';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const whenExternalScripts = (items = []) => false ? Array.isArray(items) ? items.map(item => item()) : [items()] : [];

export default defineConfig({
  site: SITE.site,
  base: SITE.base,
  trailingSlash: SITE.trailingSlash ? 'always' : 'ignore',
  output: 'server',
  adapter: cloudflare({
    mode: 'directory',
    runtime: {
      mode: 'local',
      persistTo: './persisted',
    },
    assets: 'preset',
  }),
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    compress({
    CSS: true,
    HTML: {
      removeAttributeQuotes: false
     },
    Image: false,
    JavaScript: true,
    SVG: true,
    Logger: 1
    }),
    sitemap(),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': ['template', 'gallery', 'approval', 'document', 'advertising', 'currency-exchange', 'voice-presentation', 'business-contact', 'database']
      }
    }),
    ...whenExternalScripts(() => partytown({
      config: {
        forward: ['dataLayer.push']
      }
    })),
    tasks(),
  ],
  markdown: {
    syntaxHighlight: false
  },
  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src')
      }
    },
    build: {
      assetsInlineLimit: 0,
    },
  },
});
