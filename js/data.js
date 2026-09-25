/**
 * ─────────────────────────────────────────────────────────────────────
 *  SITE CONTENT
 *  Edit this file to update the website. Everything below the hero
 *  (stats, experience, projects, skills, education, achievements,
 *  contact links) is rendered from this object.
 *
 *  Empty links ('') are hidden automatically, so you can fill them in
 *  whenever you're ready.
 * ─────────────────────────────────────────────────────────────────────
 */
window.SITE = {
  name: 'Hashim Mohamed Salim',
  email: 'hashimmohdsalim@gmail.com',
  location: 'Nottingham, UK',
  timezone: 'Europe/London',
  cv: 'assets/Hashim_Mohamed_Salim_CV.pdf',

  // Pill at the top of the hero. Set to '' to hide it.
  status: 'Open to new opportunities',

  // Your profiles. These show up in the contact section and the ⌘K menu.
  links: {
    linkedin: '', // e.g. 'https://www.linkedin.com/in/your-handle'
    github: '', // e.g. 'https://github.com/your-username'
  },

  stats: [
    { value: 50, suffix: 'K+', label: 'users on the platforms I build and maintain' },
    { value: 20, prefix: 'Top', label: 'out of 800,000 in an all-India hackathon' },
    { value: 92, suffix: '%', label: 'match accuracy from my audio-fingerprinting engine' },
    { value: 3, label: 'countries I’ve studied and worked in' },
  ],

  focus: [
    {
      icon: 'code',
      title: 'Software engineering',
      text: 'Django and .NET Core services, RESTful APIs, microservices and CI/CD pipelines in Azure DevOps.',
    },
    {
      icon: 'candles',
      title: 'Financial technology',
      text: 'Algorithmic trading, strategy backtesting, valuation models and market data analysis.',
    },
    {
      icon: 'cpu',
      title: 'Machine learning',
      text: 'Neural networks, GANs and ensemble models, applied to audio, vision and markets.',
    },
    {
      icon: 'link',
      title: 'Blockchain',
      text: 'Ethereum smart contracts in Solidity and Hyperledger reference architectures.',
    },
  ],

  // `type` controls the coloured dot: Engineering, Finance or Research.
  experience: [
    {
      role: 'Application Developer',
      org: 'University of Nottingham',
      location: 'Nottingham, UK',
      period: 'Present',
      current: true,
      type: 'Engineering',
      metric: { value: '50K+', label: 'users supported' },
      points: [
        'Develop and maintain scalable web applications with Django and .NET Core, implementing RESTful APIs and a microservices architecture that supports 50,000+ users.',
        'Designed and implemented CI/CD pipelines in Azure DevOps, automating build, test and deployment with YAML pipelines.',
        'Work in cross-functional Agile teams, from sprint planning and code reviews to continuous-integration workflows.',
        'Manage Git workflows, with branching strategies and pull-request processes that keep code quality high.',
      ],
      stack: ['Python', 'Django', '.NET Core', 'REST APIs', 'Microservices', 'Azure DevOps', 'CI/CD', 'Git', 'Agile'],
    },
    {
      role: 'Financial Analyst Intern',
      org: 'Cricket Archive',
      location: 'London, UK',
      period: 'Jun 2023 – Jul 2023',
      type: 'Finance',
      points: [
        'Reviewed financial models and pricing structures for the company’s software products.',
        'Recommended ways to optimise the monetisation strategy and expansion plan.',
        'Developed marketing strategies and sales projections for product launches targeting emerging markets.',
      ],
      stack: ['Financial Modelling', 'Pricing Strategy', 'Market Analysis'],
    },
    {
      role: 'Business Valuation Analyst',
      org: 'Eunoia',
      location: 'Doha, Qatar',
      period: 'Apr 2022 – Sep 2022',
      type: 'Finance',
      points: [
        'Performed financial modelling and valuation analysis on potential investment opportunities.',
        'Built DCF, comparable-trades and precedent-transaction models to set valuation ranges and surface risks and upsides.',
        'Synthesised company financials, market data and management projections to forecast performance and cash flows.',
      ],
      stack: ['Financial Modelling', 'DCF Valuation', 'Comparable Analysis', 'Forecasting'],
    },
    {
      role: 'Software Developer',
      org: 'Redlogik',
      location: 'Doha, Qatar',
      period: 'Dec 2020 – Dec 2021',
      type: 'Engineering',
      points: [
        'Developed and maintained Python API services with Django as part of an agile product team.',
        'Implemented RESTful APIs consumed by React front-ends for a logistics web platform.',
        'Gathered requirements with cross-functional teams in Jira and documented technical specs in Confluence.',
      ],
      stack: ['Python', 'Django', 'REST APIs', 'React', 'Jira', 'Confluence', 'Agile'],
    },
    {
      role: 'Machine Learning Intern',
      org: 'Qatar Computing Research Institute',
      location: 'Doha, Qatar',
      period: 'Sep 2019 – Oct 2019',
      type: 'Research',
      metric: { value: '76%', label: 'best accuracy' },
      points: [
        'Tested and evaluated neural-network and mutation-based algorithms for genetic imputation.',
        'Reached a best accuracy of 76% with a variational autoencoder model.',
      ],
      stack: ['Neural Networks', 'Variational Autoencoders', 'Genetic Algorithms'],
    },
  ],

  categories: [
    { id: 'ml', label: 'Machine learning' },
    { id: 'finance', label: 'Finance' },
    { id: 'blockchain', label: 'Blockchain' },
    { id: 'web', label: 'Web' },
  ],

  /**
   * Projects. Add your links here, e.g.
   *   links: { code: 'https://github.com/you/repo', live: 'https://demo.example.com' }
   * `visual` picks the illustration: spectrum, forecast, chain, pose,
   * candles, exchange, network or storefront.
   */
  projects: [
    {
      id: 'song-recognition',
      title: 'Song Recognition System',
      categories: ['ml'],
      visual: 'spectrum',
      metric: '92% accuracy',
      blurb:
        'An audio-fingerprinting engine that identifies songs from short clips. It extracts spectrogram peaks, hashes them with SHA-1 and matches the fingerprints against a library.',
      stack: ['Python', 'Signal Processing', 'Spectrograms', 'SHA-1'],
      links: { code: '', live: '' },
    },
    {
      id: 'financial-forecasting',
      title: 'Financial Forecasting',
      categories: ['ml', 'finance'],
      visual: 'forecast',
      blurb:
        'Stock-market prediction with Random Forests, SVMs and Gradient Boosting, using tuned hyperparameters and engineered features, with predictions plotted against real price movements.',
      stack: ['Python', 'scikit-learn', 'Random Forests', 'SVM', 'Gradient Boosting', 'pandas', 'matplotlib'],
      links: { code: '', live: '' },
    },
    {
      id: 'decentralised-insurance',
      title: 'Decentralised Insurance Platform',
      categories: ['blockchain', 'finance'],
      visual: 'chain',
      blurb:
        'A peer-to-peer insurance DApp on Ethereum, with policies and claim settlements enforced by smart contracts written in Solidity.',
      stack: ['Ethereum', 'Solidity', 'Smart Contracts', 'DApp'],
      links: { code: '', live: '' },
    },
    {
      id: 'pose-transfer',
      title: 'Pose Transfer',
      categories: ['ml'],
      visual: 'pose',
      blurb:
        'A tool that transfers the pose of a source subject onto a target subject, using generative adversarial networks and image processing.',
      stack: ['Python', 'TensorFlow', 'GANs', 'Computer Vision'],
      links: { code: '', live: '' },
    },
    {
      id: 'trading-strategies',
      title: 'Trading Strategy Performance Analysis',
      categories: ['finance'],
      visual: 'candles',
      blurb:
        'Backtested trading-strategy models such as CAPM in Python, analysing risk-return metrics to identify the best equity trading approach.',
      stack: ['Python', 'Backtesting', 'CAPM', 'Risk Analysis'],
      links: { code: '', live: '' },
    },
    {
      id: 'carbon-credits',
      title: 'Climate Change Blockchain App',
      categories: ['blockchain'],
      visual: 'exchange',
      blurb:
        'A prototype Ethereum application for trading carbon credits between corporations and individuals, with customer-driven incentives.',
      stack: ['Ethereum', 'Smart Contracts', 'Prototyping'],
      links: { code: '', live: '' },
    },
    {
      id: 'airline-blockchain',
      title: 'Blockchain Architecture for Airlines',
      categories: ['blockchain'],
      visual: 'network',
      blurb:
        'A Hyperledger reference architecture that lets airlines track and monitor the status of passenger luggage from end to end.',
      stack: ['Hyperledger', 'Solution Architecture', 'Asset Tracking'],
      links: { code: '', live: '' },
    },
    {
      id: 'e-commerce',
      title: 'E-Commerce Website',
      categories: ['web'],
      visual: 'storefront',
      blurb: 'A full-stack e-commerce website, built end to end with Python, Django, JavaScript, PHP and MySQL.',
      stack: ['Python', 'Django', 'JavaScript', 'PHP', 'MySQL'],
      links: { code: '', live: '' },
    },
  ],

  /**
   * Skills. Each skill links to every role, project and degree whose
   * `stack` mentions it. `aliases` catch alternative names, and `note`
   * is shown when there's nothing to link to.
   */
  skills: [
    {
      group: 'Languages',
      items: ['Python', { name: 'SQL', aliases: ['MySQL'] }, 'JavaScript', 'PHP', 'Solidity', 'C++', 'Java'],
    },
    {
      group: 'Frameworks & libraries',
      items: [
        'Django',
        '.NET Core',
        'React',
        'TensorFlow',
        'scikit-learn',
        'pandas',
        'matplotlib',
        { name: 'NumPy', note: 'Part of my everyday Python data toolkit.' },
        { name: 'BeautifulSoup', note: 'Part of my everyday Python toolkit for scraping and parsing web data.' },
      ],
    },
    {
      group: 'Engineering & DevOps',
      items: ['REST APIs', 'Microservices', 'Azure DevOps', 'CI/CD', 'Git', 'Agile', 'Jira', 'Confluence'],
    },
    {
      group: 'Machine learning',
      items: [
        'Neural Networks',
        'GANs',
        'Random Forests',
        'Gradient Boosting',
        'SVM',
        'Genetic Algorithms',
        'Computer Vision',
        'NLP',
      ],
    },
    {
      group: 'Finance & analytics',
      items: [
        'Financial Modelling',
        'DCF Valuation',
        { name: 'Algo-Trading', aliases: ['Backtesting'] },
        'Stata',
        'Statistical Modelling',
        'Pricing Strategy',
      ],
    },
    {
      group: 'Blockchain',
      items: ['Ethereum', 'Smart Contracts', 'Hyperledger'],
    },
  ],

  education: [
    {
      degree: 'MSc Financial Technology',
      honours: 'Distinction',
      school: 'University of Nottingham',
      location: 'Nottingham, UK',
      period: '2022 – 2023',
      modules: [
        'Algo-Trading with Python',
        'Data Analytics',
        'Blockchain & Cryptocurrency',
        'Financial Markets & Trading',
        'Advanced Statistical Modelling (Stata)',
      ],
      stack: ['Python', 'Algo-Trading', 'Data Analytics', 'Blockchain', 'Stata', 'Statistical Modelling'],
    },
    {
      degree: 'B.Tech Computer Science Engineering',
      school: 'Rajagiri School of Engineering & Technology',
      location: 'Kochi, India',
      period: '2016 – 2020',
      modules: [
        'SQL & Database Management',
        'Object-Oriented Programming',
        'C++ & Java',
        'Natural Language Processing',
        'Machine Learning',
        'Computer Vision',
      ],
      stack: ['SQL', 'OOP', 'C++', 'Java', 'NLP', 'Machine Learning', 'Computer Vision'],
    },
  ],

  achievements: {
    hackathon: {
      kicker: 'Hackathon finalist',
      rank: 20,
      of: 800000,
      text: 'Led a team of five to a top-20 finish in UST Global’s all-India hackathon.',
    },
    challenge: {
      kicker: 'Challenge winner',
      title: 'Company-based challenge',
      text: 'Developed the winning pricing strategy for UK firm Cricket Archive by analysing customer segments and benchmarking competitors.',
      meta: 'Cricket Archive · UK',
    },
    certifications: [
      {
        name: 'ITIL 4 Foundation',
        text: 'IT service management and the service value system, across strategy, design, transition and operation.',
      },
      {
        name: 'Six Sigma Yellow Belt',
        text: 'DMAIC-driven process improvement, backed by statistical tools and data analysis.',
      },
    ],
    leadership: [
      'Hosted local TEDx and Model United Nations chapters as an undergraduate',
      'Youth ambassador at a Model UN conference in New York',
      'Represented the university finance society at events and conferences',
    ],
    volunteering: [
      'Food bank volunteer with the Himmah organisation',
      'Flood relief volunteer during the 2018 Kerala floods',
    ],
  },
};
