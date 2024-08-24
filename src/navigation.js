import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Examples',
      links: [
        {
          text: 'Basic Form',
          href: getPermalink('/examples/basic')
        },
        {
          text: 'Custom Server-side Validation',
          href: getPermalink('/examples/custom'),
        },
        {
          text: 'Testing Server-side Validation',
          href: getPermalink('/examples/servertest'),
        },
        {
          text: 'Filling in Default Values',
          href: getPermalink('/examples/defaults'),
        },
        {
          text: 'Password Reveal Button',
          href: getPermalink('/examples/password'),
        },
        {
          text: 'Internationalization',
          href: getPermalink('/examples/i18n'),
        },
      ]
    },
    {
      text: 'CruddyForms Source Code',
      href: 'https://github.com/IndependentCreator/cruddy-forms',
    },
  ],
};

export const footerData = {
  secondaryLinks: [
    { text: 'License', href: "https://github.com/IndependentCreator/cruddy-forms/blob/main/LICENSE.md" },
  ],
  socialLinks: [
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/IndependentCreator/cruddy-forms' },
  ],
};
