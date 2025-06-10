import icon1 from '@src/assets/img/spot-illustrations/13.png';
import icon1Dark from '@src/assets/img/spot-illustrations/dark_13.png';
import icon2 from '@src/assets/img/spot-illustrations/14.png';
import icon2Dark from '@src/assets/img/spot-illustrations/dark_14.png';
import icon3 from '@src/assets/img/spot-illustrations/15.png';
import icon3Dark from '@src/assets/img/spot-illustrations/dark_15.png';
import icon4 from '@src/assets/img/spot-illustrations/16.png';
import icon4Dark from '@src/assets/img/spot-illustrations/dark_16.png';
import bg8 from '@src/assets/img/bg/8.png';
import darkBg8 from '@src/assets/img/bg/8-dark.png';
import bg9 from '@src/assets/img/bg/9.png';
import darkBg9 from '@src/assets/img/bg/9-dark.png';
import bg10 from '@src/assets/img/bg/10.png';
import darkBg10 from '@src/assets/img/bg/10-dark.png';
import bg11 from '@src/assets/img/bg/bg-11.png';
import darkBg11 from '@src/assets/img/bg/bg-11-dark.png';
import rocket from '@src/assets/img/spot-illustrations/rocket.png';
import rocketDark from '@src/assets/img/spot-illustrations/rocket-dark.png';
import bag from '@src/assets/img/spot-illustrations/bag-2.png';
import bagDark from '@src/assets/img/spot-illustrations/bag-2-dark.png';
import star from '@src/assets/img/spot-illustrations/star.png';
import starDark from '@src/assets/img/spot-illustrations/star-dark.png';
import shield from '@src/assets/img/spot-illustrations/shield-2.png';
import shieldDark from '@src/assets/img/spot-illustrations/shield-2-dark.png';
export const pricingBreadcrumbItems = [
  {
    label: 'Pages',
    url: '#!'
  },
  {
    label: 'Pricing',
    url: '#!',
    active: true
  }
];
export const pricingColumnFeatures = [
  {
    id: 'advanced_search',
    label: 'Advanced Search'
  },
  {
    id: 'custom_fields',
    label: 'Custom fields',
    new: true
  },
  {
    id: 'task_dependencies',
    label: 'Task dependencies'
  },
  {
    id: 'private_teams',
    label: 'Private teams & projects'
  }
];
export const pricingGridFeatures = [
  {
    id: 'timeline',
    label: 'Timeline'
  },
  {
    id: 'advanced_search',
    label: 'Advanced Search'
  },
  {
    id: 'custom_fields',
    label: 'Custom fields',
    new: true
  },
  {
    id: 'task_dependencies',
    label: 'Task dependencies'
  },
  {
    id: 'additional-space',
    label: '20TB of additional space'
  },
  {
    id: 'bandwidth',
    label: 'Bandwidth of  Upto 1 Gbps'
  },
  {
    id: 'private_teams',
    label: 'Private teams & projects'
  },
  {
    id: 'early-access',
    label: 'Early Access / Beta Features'
  }
];
export const pricingColumnItems = [
  {
    id: 1,
    title: 'Learner',
    icon: icon1,
    iconDark: icon1Dark,
    description:
      'For individuals who are interested in giving it a shot first.',
    price: 0,
    features: ['timeline']
  },
  {
    id: 2,
    title: 'Starter',
    icon: icon2,
    iconDark: icon2Dark,
    description: 'For teams that need to create project plans with confidence.',
    price: 14.99,
    features: ['timeline', 'advanced_search']
  },
  {
    id: 3,
    title: 'Team',
    icon: icon3,
    iconDark: icon3Dark,
    description: 'For teams that need to manage work across initiatives.',
    price: 49.99,
    selected: true,
    features: ['timeline', 'advanced_search', 'custom_fields']
  },
  {
    id: 4,
    title: 'Industry',
    icon: icon4,
    iconDark: icon4Dark,
    description: 'For organizations that need additional security and support.',
    price: 149.99,
    features: [
      'timeline',
      'advanced_search',
      'custom_fields',
      'task_dependencies',
      'private_teams'
    ]
  }
];
export const pricingGridItems = [
  {
    id: 1,
    title: 'Startup',
    description: `For individuals who are interested <br/> in giving it a shot first.`,
    img: rocket,
    imgDark: rocketDark,
    bg: bg8,
    darkBg: darkBg8,
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: ['Up to 4 Members', '3 Collaboration projects'],
    selected: true
  },
  {
    id: 2,
    title: 'Standard',
    description:
      'For teams that need to create <br/> project plans with confidence.',
    img: bag,
    imgDark: bagDark,
    bg: bg9,
    darkBg: darkBg9,
    monthlyPrice: 14.99,
    yearlyPrice: 179.88,
    features: [
      'Up to 8 Members',
      'Create & Share libraries',
      '10 Collaboration projects'
    ]
  },
  {
    id: 3,
    title: 'Business Plus',
    description: 'For teams that need to manage <br/> work across initiatives.',
    img: star,
    imgDark: starDark,
    bg: bg11,
    darkBg: darkBg11,
    monthlyPrice: 49.99,
    yearlyPrice: 599.88,
    badge: {
      label: 'recommended',
      badgeBg: 'warning'
    },
    features: [
      'Technical Supports',
      'Up to 20 Members',
      'Create & Share libraries',
      '<span class="fw-bold">Unlimited</span> Collaboration'
    ]
  },
  {
    id: 4,
    title: 'Enterprise',
    description:
      'For organizations that need <br/> additional security and support.',
    img: shield,
    imgDark: shieldDark,
    bg: bg10,
    darkBg: darkBg10,
    monthlyPrice: 149.99,
    yearlyPrice: 1799.88,
    features: [
      '24/7 VIP Support',
      'Automated analytics',
      '<span class="fw-bold">Unlimited</span> Members*',
      'Create & Share libraries',
      'Centralized billing'
    ]
  }
];
