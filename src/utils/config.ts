import merge from 'lodash.merge';
import type { MetaData } from '~/types';

export interface SiteConfig {
  name: string;
  site?: string;
  base?: string;
  trailingSlash?: boolean;
  googleSiteVerificationId?: string;
}
export interface MetaDataConfig extends Omit<MetaData, 'title'> {
  title?: {
    default: string;
    template: string;
  };
}
export interface I18NConfig {
  language: string;
  textDirection: string;
  dateFormatter?: Intl.DateTimeFormat;
}
export interface AppBlogConfig {
  isEnabled: boolean;
  postsPerPage: number;
  post: {
    isEnabled: boolean;
    permalink: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  list: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  category: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  tag: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
}
export interface AnalyticsConfig {
  vendors: {
    googleAnalytics: {
      id?: string;
      partytown?: boolean;
    };
  };
}

// Replace the yaml.load(fs.readFileSync()) call with a static configuration object
const config: {
  site?: SiteConfig;
  metadata?: MetaDataConfig;
  i18n?: I18NConfig;
  apps?: {
    blog?: AppBlogConfig;
  };
  ui?: unknown;
  analytics?: unknown;
} = {
  site: {
    name: 'CruddyForms',
    site: 'https://cruddyforms.com',
    base: '/',
    trailingSlash: false,
    googleSiteVerificationId: '',
  },
  metadata: {
    title: {
      default: 'CruddyForms',
      template: '%s | CruddyForms',
    },
    description: 'Demonstration of cruddy-forms, a TypeScript library for generating HTML forms with TypeBox validation.',
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      site_name: 'CruddyForms',
      images: [
        {
          url: 'https://cruddyforms.com/default-og.png',
          width: 1200,
          height: 628,
        },
      ],
      type: 'website',
    },
  },
  i18n: {
    language: 'en',
    textDirection: 'ltr',
  },
  apps: {
    blog: {
      isEnabled: false,
      postsPerPage: 6,
      post: {
        isEnabled: true,
        permalink: '/blog/%slug%',
        robots: {
          index: true,
          follow: true,
        },
      },
      list: {
        isEnabled: true,
        pathname: 'blog',
        robots: {
          index: true,
          follow: true,
        },
      },
      category: {
        isEnabled: true,
        pathname: 'category',
        robots: {
          index: true,
          follow: true,
        },
      },
      tag: {
        isEnabled: true,
        pathname: 'tag',
        robots: {
          index: false,
          follow: true,
        },
      },
    },
  },
  analytics: {
    vendors: {
      googleAnalytics: {
        id: undefined,
        partytown: true,
      },
    },
  },
};

const DEFAULT_SITE_NAME = 'CruddyForms';

const getSite = () => {
  const _default = {
    name: DEFAULT_SITE_NAME,
    site: undefined,
    base: '/',
    trailingSlash: false,
    googleSiteVerificationId: '',
  };

  return merge({}, _default, config?.site ?? {}) as SiteConfig;
};

const getMetadata = () => {
  const siteConfig = getSite();

  const _default = {
    title: {
      default: siteConfig?.name || DEFAULT_SITE_NAME,
      template: '%s',
    },
    description: '',
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      type: 'website',
    },
  };

  return merge({}, _default, config?.metadata ?? {}) as MetaDataConfig;
};

const getI18N = () => {
  const _default = {
    language: 'en',
    textDirection: 'ltr',
  };

  const value = merge({}, _default, config?.i18n ?? {});

  return Object.assign(value, {
    dateFormatter: new Intl.DateTimeFormat(value.language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    }),
  }) as I18NConfig;
};

const getAppBlog = () => {
  const _default = {
    isEnabled: false,
    postsPerPage: 6,
    post: {
      isEnabled: true,
      permalink: '/blog/%slug%',
      robots: {
        index: true,
        follow: true,
      },
    },
    list: {
      isEnabled: true,
      pathname: 'blog',
      robots: {
        index: true,
        follow: true,
      },
    },
    category: {
      isEnabled: true,
      pathname: 'category',
      robots: {
        index: true,
        follow: true,
      },
    },
    tag: {
      isEnabled: true,
      pathname: 'tag',
      robots: {
        index: false,
        follow: true,
      },
    },
  };

  return merge({}, _default, config?.apps?.blog ?? {}) as AppBlogConfig;
};

const getUI = () => {
  const _default = {
    theme: 'system',
    classes: {},
    tokens: {},
  };

  return merge({}, _default, config?.ui ?? {});
};

const getAnalytics = () => {
  const _default = {
    vendors: {
      googleAnalytics: {
        id: undefined,
        partytown: true,
      },
    },
  };

  return merge({}, _default, config?.analytics ?? {}) as AnalyticsConfig;
};

export const SITE = getSite();
export const I18N = getI18N();
export const METADATA = getMetadata();
export const APP_BLOG = getAppBlog();
export const UI = getUI();
export const ANALYTICS = getAnalytics();
