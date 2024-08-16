import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import nodejs from '@astrojs/node';
import partytown from '@astrojs/partytown';
import compress from 'astro-compress';
import icon from 'astro-icon';
import tasks from './src/utils/tasks';
import { readingTimeRemarkPlugin } from './src/utils/frontmatter.mjs';
import { ANALYTICS, SITE } from './src/utils/config.ts';
import node from "@astrojs/node";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const whenExternalScripts = (items = []) => ANALYTICS.vendors.googleAnalytics.id && ANALYTICS.vendors.googleAnalytics.partytown ? Array.isArray(items) ? items.map(item => item()) : [items()] : [];

// https://astro.build/config
export default defineConfig({
  site: SITE.site,
  base: SITE.base,
  trailingSlash: SITE.trailingSlash ? 'always' : 'ignore',
  adapter: nodejs({
     mode: 'middleware' // or 'standalone'
   }),
  output: 'server',
  integrations: [tailwind({
    applyBaseStyles: false
  }), sitemap(), mdx(), icon({
    include: {
      tabler: ['*'],
      'flat-color-icons': ['template', 'gallery', 'approval', 'document', 'advertising', 'currency-exchange', 'voice-presentation', 'business-contact', 'database']
    }
  }), ...whenExternalScripts(() => partytown({
    config: {
      forward: ['dataLayer.push']
    }
  })), tasks(), compress({
    CSS: true,
    HTML: {
      removeAttributeQuotes: false
    },
    Image: false,
    JavaScript: true,
    SVG: true,
    Logger: 1
  })],
  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    shikiConfig: {
        // Choose from Shiki's built-in themes (or add your own)
        // https://github.com/shikijs/shiki/blob/main/docs/themes.md
        theme: 'light-plus',
        // Add custom languages
        // Note: Shiki has countless langs built-in, including .astro!
        // https://github.com/shikijs/shiki/blob/main/docs/languages.md
        langs: [],
        wrap: true,
    },
  },
  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src')
      }
    }
  },
  adapter: node({
    mode: "standalone"
  })
});
