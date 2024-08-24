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
  links: [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: '#' },
        { text: 'Security', href: '#' },
        { text: 'Team', href: '#' },
        { text: 'Enterprise', href: '#' },
        { text: 'Customer stories', href: '#' },
        { text: 'Pricing', href: '#' },
        { text: 'Resources', href: '#' },
      ],
    },
    {
      title: 'Platform',
      links: [
        { text: 'Developer API', href: '#' },
        { text: 'Partners', href: '#' },
        { text: 'Atom', href: '#' },
        { text: 'Electron', href: '#' },
        { text: 'AstroWind Desktop', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Docs', href: '#' },
        { text: 'Community Forum', href: '#' },
        { text: 'Professional Services', href: '#' },
        { text: 'Skills', href: '#' },
        { text: 'Status', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: '#' },
        { text: 'Blog', href: '#' },
        { text: 'Careers', href: '#' },
        { text: 'Press', href: '#' },
        { text: 'Inclusion', href: '#' },
        { text: 'Social Impact', href: '#' },
        { text: 'Shop', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/IndependentCreator/cruddy-forms' },
  ],
};
