export const siteMeta = {
  name: 'Biomass Resource Group',
  shortName: 'BRG',
  siteUrl: 'https://biomassresourcegroup.com',
  title: 'Biochar Carbon Removal Infrastructure',
  description:
    'Biomass Resource Group builds biochar carbon removal infrastructure from waste biomass in active emerging-market corridors.',
  email: 'info@biomassresourcegroup.com',
  domain: 'biomassresourcegroup.com',
  sameAs: [],
} as const;

export const pageMeta = {
  home: {
    title: 'Biochar Carbon Removal Infrastructure',
    description:
      'BRG builds operator-led biochar infrastructure across active biomass corridors.',
    path: '/',
  },
  platform: {
    title: 'Operating Platform',
    description:
      'How BRG connects feedstock, kiln deployment, buyer channels, and project documentation.',
    path: '/platform/',
  },
  markets: {
    title: 'Active Biochar Markets',
    description:
      'Active BRG operating corridors and additional regions under disciplined development.',
    path: '/markets/',
  },
  about: {
    title: 'About BRG',
    description:
      'The leadership, operating discipline, and verification posture behind Biomass Resource Group.',
    path: '/about/',
  },
  contact: {
    title: 'Contact BRG',
    description:
      'Contact BRG for investment, carbon offtake, project delivery, or general inquiries.',
    path: '/contact/',
  },
  company: {
    title: 'About BRG',
    description: 'The company page has moved to the BRG About page.',
    path: '/about/',
    noindex: true,
  },
  privacy: {
    title: 'Privacy',
    description:
      'How BRG handles inquiry information on this static website.',
    path: '/privacy/',
  },
  notFound: {
    title: 'Page not found',
    description:
      'The requested BRG page could not be found. Continue to the homepage, platform, markets, or contact page.',
    path: '/404.html',
    noindex: true,
  },
} as const;

export const navLinks = [
  { label: 'Platform', href: '/platform/' },
  { label: 'Markets', href: '/markets/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/', primary: true },
] as const;

export const glossary = {
  biochar:
    'Biochar is a stable carbon-rich material made by heating biomass with limited oxygen. It can improve soils and store carbon for long periods when produced and applied correctly.',
  pyrolysis:
    'Pyrolysis is thermal conversion of biomass in low-oxygen conditions. BRG uses mobile and fixed kiln systems selected for each feedstock and operating context.',
  mrv:
    'MRV means monitoring, reporting, and verification: the data and third-party review process used to support carbon removal claims.',
  carbonCredits:
    'Carbon removal credits are issued only after a project satisfies the relevant registry, monitoring, verification, issuance, and offtake requirements.',
  hCorg:
    'H/Corg is a laboratory ratio used in biochar standards as one indicator of carbon stability.',
  ebc:
    'EBC refers to the European Biochar Certificate standards and testing framework. BRG references it as an alignment pathway, not an endorsement.',
  puro:
    'Puro.earth is a carbon removal registry pathway that may apply to biochar projects subject to project approval and verification.',
  isometric:
    'Isometric is a carbon removal registry pathway that may apply to biochar projects subject to project approval and verification.',
  verra:
    'Verra VM0044 is a biochar methodology pathway. Project eligibility, validation, verification, and issuance are project-specific.',
} as const;

export const statusLegend = [
  {
    key: 'active',
    label: 'Active',
    description: 'Operating activity is underway in the corridor.',
  },
  {
    key: 'under-evaluation',
    label: 'In development',
    description: 'BRG is building the partner, feedstock, and buyer groundwork.',
  },
  {
    key: 'pipeline',
    label: 'Future corridor',
    description: 'A region being tracked separately from current operating corridors.',
  },
] as const;

export const claimStatus = {
  operational: 'Operational',
  tested: 'Tested',
  verificationReady: 'Prepared for review',
  underVerification: 'Review pathway',
  pipeline: 'Future development',
  planned: 'Planned',
  unverified: 'Unverified',
} as const;

export const home = {
  hero: {
    label: 'Biochar infrastructure',
    title: 'Operator-led biochar infrastructure for carbon removal.',
    summary:
      'BRG connects feedstock, kiln deployment, buyer channels, and carbon documentation across active biochar corridors.',
    primaryAction: { label: 'Discuss a project', href: '/contact/#inquiry-form' },
    secondaryAction: { label: 'See active corridors', href: '/markets/' },
    metrics: [
      {
        value: '2',
        label: 'active operating corridors',
        status: 'Operational today',
      },
      {
        value: '3',
        label: 'project output channels',
        status: 'Product, carbon, technology',
      },
      {
        value: '5',
        label: 'regional development markets',
        status: 'Earlier-stage work',
      },
      {
        value: '100+',
        label: 'year durability pathway',
        status: 'Testing-dependent',
      },
    ],
  },
  proofStrip: [
    {
      label: 'Active corridors',
      text: 'East Africa and Saudi Arabia operating work is separated from development regions.',
    },
    {
      label: 'Feedstock-to-buyer model',
      text: 'Projects connect biomass access, conversion, product use, and buyer channels.',
    },
    {
      label: 'Prepared for review',
      text: 'Project records, testing, and monitoring are prepared before carbon claims are made.',
    },
    {
      label: 'Project-specific outcomes',
      text: 'Approval, validation, verification, issuance, and delivery remain subject to review.',
    },
  ],
  whatWeDo: {
    label: 'What BRG does',
    title: 'One operating loop',
    intro:
      'Feedstock, conversion, product use, and verification stay in one operating path.',
    steps: [
      {
        title: 'Source biomass',
        description:
          'Secure local waste streams with workable collection and transport economics.',
        glossary: 'biochar',
      },
      {
        title: 'Convert by pyrolysis',
        description:
          'Match kiln systems to the feedstock, site conditions, and throughput need.',
        glossary: 'pyrolysis',
      },
      {
        title: 'Move biochar to buyers',
        description:
          'Route biochar into agricultural, waste, soil, or industrial channels.',
        glossary: 'biochar',
      },
      {
        title: 'Prepare verification',
        description:
          'Build monitoring, testing, and traceability into routine operations.',
        glossary: 'mrv',
      },
    ],
  },
  audienceIntro: {
    label: 'Who should contact BRG',
    title: 'Route the right conversation.',
    intro:
      'Investors, carbon buyers, and project partners each need a different first conversation.',
  },
  proof: {
    label: 'Active corridors',
    title: 'Operating corridors',
    intro:
      'Two active corridors show how the operating model adapts to local feedstock and infrastructure.',
  },
  scale: {
    label: 'Project model',
    title: 'Projects are designed around useful outputs.',
    intro:
      'Biochar products, carbon documentation, and deployment partnerships are planned together without implying credit issuance before review is complete.',
  },
  finalCta: {
    label: 'Contact',
    title: 'Start the right BRG conversation',
    intro:
      'Use one form for investment, carbon offtake, project delivery, or general questions.',
    primaryAction: { label: 'Start an inquiry', href: '/contact/#inquiry-form' },
    secondaryAction: { label: 'View markets', href: '/markets/', variant: 'secondary' },
  },
} as const;

export const audiencePaths = [
  {
    audience: 'Investors',
    title: 'Review project economics and operating risk.',
    description:
      'Discuss asset-level economics, project qualification, operating timelines, and risk controls.',
    href: '/contact/?type=investor#inquiry-form',
    cta: 'Investor inquiry',
    subject: 'Investor inquiry',
    recipient: 'invest@biomassresourcegroup.com',
  },
  {
    audience: 'Carbon buyers',
    title: 'Evaluate future biochar carbon removal supply.',
    description:
      'Discuss durability testing, MRV readiness, verification pathways, delivery timing, and offtake structure.',
    href: '/contact/?type=carbon#inquiry-form',
    cta: 'Carbon buyer inquiry',
    subject: 'Carbon removal offtake inquiry',
    recipient: 'carbon@biomassresourcegroup.com',
  },
  {
    audience: 'Project partners',
    title: 'Develop feedstock, deployment, or procurement channels.',
    description:
      'Discuss local feedstock streams, kiln deployment, infrastructure integration, and operating responsibilities.',
    href: '/contact/?type=partner#inquiry-form',
    cta: 'Project partner inquiry',
    subject: 'Project delivery partnership inquiry',
    recipient: 'partnerships@biomassresourcegroup.com',
  },
] as const;

export const platformPage = {
  hero: {
    label: 'Operating platform',
    title: 'How BRG turns corridors into operating projects.',
    intro:
      'BRG owns the operating path from feedstock access through kiln deployment, buyer channels, and project documentation.',
    primaryAction: { label: 'Request platform overview', href: '/contact/?type=general#inquiry-form' },
    secondaryAction: { label: 'Review active markets', href: '/markets/', variant: 'secondary' },
    meta: ['Owner-operated', 'MRV-ready workflows', 'Buyer channels'],
  },
  process: {
    label: 'Operating model',
    title: 'From feedstock to market',
    intro:
      'The same sequence repeats across suitable corridors.',
    steps: [
      {
        title: 'Origination',
        description:
          'Confirm feedstock, buyer demand, and local execution fit.',
      },
      {
        title: 'Feedstock and logistics',
        description:
          'Secure biomass access, collection routes, and transport economics.',
      },
      {
        title: 'Kiln deployment',
        description:
          'Match mobile or fixed kiln systems to site conditions.',
      },
      {
        title: 'MRV and verification',
        description:
          'Prepare traceability, testing, and verification records.',
      },
      {
        title: 'Product channels',
        description:
          'Route biochar products and eligible carbon credits to buyers.',
      },
    ],
  },
  ownership: {
    label: 'Owner-operated model',
    title: 'Infrastructure is built inside the operating boundary.',
    intro:
      'BRG forms local operating structures, controls field execution, and partners where local infrastructure or procurement channels require it.',
    layers: [
      {
        title: 'Entity formation',
        description:
          'Local operating vehicles create the structure for contracts, teams, procurement, and commercial accountability.',
      },
      {
        title: 'Feedstock control',
        description:
          'Field economics start with access to consistent waste biomass and logistics that work outside ideal conditions.',
      },
      {
        title: 'Technology deployment',
        description:
          'Mobile and fixed systems are matched to corridor constraints rather than forced into one universal format.',
      },
      {
        title: 'Buyer channels',
        description:
          'Biochar product demand, public-sector procurement, carbon offtake, and technology channels are developed together.',
      },
      {
        title: 'Verification workflows',
        description:
          'Monitoring and testing are built into operating routines so projects can move through verification pathways.',
      },
    ],
  },
  technology: {
    label: 'Technology approach',
    title: 'Kiln and documentation systems follow the corridor.',
    intro:
      'Mobile kilns, fixed kilns, feedstock logistics, testing, and registry readiness are selected for the operating context.',
    systems: [
      {
        title: 'Mobile kiln',
        status: 'active',
        statusLabel: 'Active',
        description:
          'Distributed pyrolysis units for rural or biomass-proximate operations where transport distance matters.',
        details: [
          { label: 'Best fit', value: 'Distributed biomass streams' },
          { label: 'Current context', value: 'East Africa corridor' },
          { label: 'Readiness', value: 'Operating context active' },
        ],
      },
      {
        title: 'Fixed kiln',
        status: 'active',
        statusLabel: 'Active',
        description:
          'Higher-throughput installations co-located with municipal, water, or industrial infrastructure.',
        details: [
          { label: 'Best fit', value: 'Industrial or municipal streams' },
          { label: 'Current context', value: 'Saudi Arabia corridor' },
          { label: 'Readiness', value: 'Operating context active' },
        ],
      },
      {
        title: 'Feedstock logistics',
        status: 'active',
        statusLabel: 'Active',
        description:
          'Collection, staging, transport, and local team routines that determine whether production can scale.',
        details: [
          { label: 'Best fit', value: 'Every corridor' },
          { label: 'Current context', value: 'Active corridors' },
          { label: 'Readiness', value: 'Operational discipline' },
        ],
      },
      {
        title: 'Testing and monitoring',
        status: 'verification-pathway',
        statusLabel: 'Prepared for review',
        description:
          'Production-run documentation, lab testing, traceability, and MRV records designed for third-party review.',
        details: [
          { label: 'Best fit', value: 'Credit-eligible output' },
          { label: 'Current context', value: 'Project-specific pathway' },
          { label: 'Readiness', value: 'Subject to review' },
        ],
      },
      {
        title: 'Registry readiness',
        status: 'verification-pathway',
        statusLabel: 'Prepared for review',
        description:
          'Alignment with applicable biochar methodologies without implying endorsement, approval, or issuance.',
        details: [
          { label: 'Best fit', value: 'Carbon removal projects' },
          { label: 'Current context', value: 'Puro.earth, Isometric, Verra pathways' },
          { label: 'Readiness', value: 'Subject to project approval' },
        ],
      },
    ],
  },
  standards: {
    label: 'Standards and verification',
    title: 'Carbon documentation stays project-specific.',
    intro:
      'Documentation is prepared for review before any credit is described as verified.',
    notes: [
      {
        title: 'Verification bodies',
        status: 'underVerification',
        text:
          'DNV and SGS are referenced as accredited verification bodies. This site does not claim endorsement or certification by either body.',
      },
      {
        title: 'Registry pathways',
        status: 'verificationReady',
        text:
          'Puro.earth, Isometric, and Verra VM0044 are treated as project-specific carbon methodology pathways, subject to approval, validation, verification, and issuance.',
      },
      {
        title: 'Testing alignment',
        status: 'tested',
        text:
          'EBC-aligned testing and H/Corg language describe a durability assessment pathway; they are not a universal guarantee for every tonne of output.',
      },
    ],
  },
  finalCta: {
    label: 'Contact',
    title: 'Request a platform overview',
    intro:
      'Use the contact form for operating model, ownership, or verification questions.',
    primaryAction: { label: 'Request platform overview', href: '/contact/?type=general#inquiry-form' },
    secondaryAction: { label: 'Review active markets', href: '/markets/', variant: 'secondary' },
  },
} as const;

export const projectModel = {
  label: 'Project outputs',
  title: 'What a project is designed to deliver',
  intro:
    'Biochar use, site fit, documentation, and delivery channels are planned together.',
  caveat:
    'Carbon removal claims depend on project approval, monitoring, verification, issuance, and delivery requirements.',
  lines: [
    {
      title: 'Biochar products',
      description:
        'Biochar can support soil, agriculture, waste, and industrial use cases where local demand exists.',
    },
    {
      title: 'Carbon removal documentation',
      description:
        'Eligible production is documented for registry and verifier review before any credit claim or delivery.',
    },
    {
      title: 'Deployment partnerships',
      description:
        'Kiln deployment and local operating partnerships help adapt the project model to each corridor.',
    },
  ],
} as const;

export const marketsPage = {
  hero: {
    label: 'Markets',
    title: 'Active corridors',
    intro:
      'BRG builds from active operating corridors while developing additional regional opportunities.',
    primaryAction: { label: 'Discuss a corridor', href: '/contact/?type=partner#inquiry-form' },
    secondaryAction: { label: 'Review platform', href: '/platform/', variant: 'secondary' },
    meta: ['Active corridors', 'Additional regions', 'Stage-specific review'],
  },
  activeIntro: {
    label: 'Active corridors',
    title: 'Active operating corridors',
    intro:
      'Operating activity is underway in these corridors. Verification and offtake work advance by project.',
  },
  corridorDetail: {
    label: 'Corridor detail',
    title: 'Current operations and next milestones.',
    intro:
      'Operating infrastructure, carbon documentation, and offtake activity advance on separate timelines.',
  },
  pipelineIntro: {
    label: 'Development regions',
    title: 'Additional regions',
    intro:
      'BRG is developing regional opportunities through feedstock, partner, and buyer work.',
  },
  finalCta: {
    label: 'Contact',
    title: 'Discuss an operating corridor',
    intro:
      'Use the contact form for geography, feedstock, buyer, or deployment questions.',
    primaryAction: { label: 'Contact BRG', href: '/contact/?type=partner#inquiry-form' },
    secondaryAction: { label: 'Review platform', href: '/platform/', variant: 'secondary' },
  },
} as const;

export const marketCorridors = [
  {
    name: 'East Africa',
    region: 'Regional corridor',
    operatingEntity: 'Riziki NBS',
    status: 'active',
    statusLabel: 'Active',
    feedstock: 'Invasive Prosopis mesquite',
    technology: 'Mobile kiln fleet',
    productChannel: 'Agricultural biochar for smallholder and soil channels',
    carbonPathway: 'Puro.earth methodology work',
    nextMilestone: 'Scale mobile kiln fleet and continue third-party verification',
    description:
      'Community-scale mobile kiln operations are active, with carbon removal work being prepared for third-party review.',
    evidenceNote:
      'Active operation and credit issuance are separate milestones.',
  },
  {
    name: 'Saudi Arabia',
    region: 'Saudi Arabia',
    operatingEntity: 'Saudi Biochar',
    status: 'active',
    statusLabel: 'Active',
    feedstock: 'Municipal sewage sludge',
    technology: 'Fixed kiln installation',
    productChannel: 'Soil amendment, waste infrastructure, and biogas-linked channels',
    carbonPathway: 'Project-specific MRV work',
    nextMilestone: 'Advance procurement and MRV integration with infrastructure partners',
    description:
      'Industrial fixed-kiln work is active. Verification and offtake work will depend on the project scope and review process.',
    evidenceNote:
      'Infrastructure integration and credit issuance are separate milestones.',
  },
] as const;

export const pipelineMarkets = [
  {
    name: 'Pakistan',
    status: 'under-evaluation',
    statusLabel: 'In development',
    description:
      'BRG is building the feedstock, partner, and commercial groundwork for a potential operating corridor.',
  },
  {
    name: 'MENA',
    status: 'under-evaluation',
    statusLabel: 'In development',
    description:
      'Regional opportunities are being developed around infrastructure fit, feedstock availability, and buyer channels.',
  },
  {
    name: 'Sub-Saharan Africa',
    status: 'pipeline',
    statusLabel: 'Future corridor',
    description:
      'Future corridor planning builds on BRG’s current East Africa operating footprint.',
  },
] as const;

export const aboutPage = {
  hero: {
    label: 'About BRG',
    title: 'Operator-led infrastructure.',
    intro:
      'BRG combines field execution, commercial partnerships, and project documentation for biochar carbon removal infrastructure.',
    primaryAction: { label: 'Contact leadership', href: '/contact/?type=general#inquiry-form' },
    secondaryAction: { label: 'See active markets', href: '/markets/', variant: 'secondary' },
    meta: ['Operator-led', 'Commercial discipline', 'Third-party review'],
  },
  story: {
    label: 'Operating story',
    title: 'Biochar infrastructure is built in the field.',
    intro:
      'Feedstock contracts, logistics, kiln operation, product buyers, and verification workflows have to work together before a corridor can scale.',
    paragraphs: [
      'BRG has built operating context across East Africa and the Middle East, with a focus on turning difficult waste streams into commercial biochar infrastructure.',
      'The company distinguishes active operating corridors from earlier-stage regional development so buyers, investors, and partners can quickly understand what is operating now.',
    ],
  },
  leadership: {
    label: 'Leadership',
    title: 'Leadership',
    intro:
      'BRG is led by operators focused on commercial partnerships, market execution, and field delivery.',
  },
  standards: {
    label: 'Verification',
    title: 'Carbon claims stay tied to project evidence.',
    intro:
      'Projects are structured around recognized biochar testing, registry, and verification requirements.',
  },
  evidence: {
    label: 'Evidence snapshot',
    title: 'Evidence is tied to operating stage.',
    intro:
      'The snapshot distinguishes current operations from earlier-stage market development.',
  },
  principles: {
    label: 'Operating principles',
    title: 'Operating discipline.',
    intro:
      'BRG evaluates each corridor around demand, logistics, repeatability, and local execution.',
  },
  finalCta: {
    label: 'Contact',
    title: 'Contact BRG leadership',
    intro:
      'Use the inquiry form for leadership, investor, buyer, or project conversations.',
    primaryAction: { label: 'Contact BRG', href: '/contact/?type=general#inquiry-form' },
    secondaryAction: { label: 'View markets', href: '/markets/', variant: 'secondary' },
  },
} as const;

export const leadership = [
  {
    name: 'Julie Brown',
    role: 'CEO',
    focus: ['Company strategy', 'Partnerships', 'Growth'],
    bio: [
      'Julie Brown leads BRG’s company strategy, partnerships, and growth agenda.',
      'She works with investors, buyers, procurement partners, and institutions to move operating corridors from field execution into scaled commercial infrastructure.',
    ],
    href: 'https://www.linkedin.com/in/julieajbrown/',
  },
  {
    name: 'Cody Danet',
    role: 'Co-Founder',
    focus: ['Market buildout', 'Feedstock logistics', 'Technology deployment'],
    bio: [
      'Cody Danet leads market buildout, feedstock logistics, and technology deployment.',
      'He carries forward operating knowledge from Riziki NBS field work, coordinating local teams, feedstock contracts, kiln deployment, and site execution.',
    ],
  },
] as const;

export const verification = {
  pathways: [
    {
      label: 'DNV and SGS',
      detail: 'BRG prepares project documentation for review by qualified independent verification bodies as projects advance.',
      status: 'underVerification',
      evidenceNote: 'Certification or verification statements are made only after the applicable review is complete.',
    },
    {
      label: 'Puro.earth, Isometric, and Verra VM0044',
      detail: 'BRG structures eligible biochar projects with reference to applicable registry and methodology requirements.',
      status: 'verificationReady',
      evidenceNote: 'Approval, validation, verification, issuance, and delivery remain project-specific.',
    },
    {
      label: 'EBC-aligned testing',
      detail: 'Testing and durability language aligned with European Biochar Certificate concepts.',
      status: 'tested',
      evidenceNote: 'Alignment language does not imply EBC endorsement or certification for every output.',
    },
    {
      label: 'H/Corg durability indicator',
      detail: 'Laboratory stability indicator used in biochar standards and project documentation.',
      status: 'tested',
      evidenceNote: 'Durability depends on tested material and applicable methodology requirements.',
    },
  ],
  claimLanguage:
    'Project data, monitoring records, and review steps advance before any carbon credit issuance or delivery.',
} as const;

export const evidenceMetrics = [
  {
    value: '100+',
    label: 'year durability pathway',
    status: 'tested',
    note:
      'Tied to EBC-aligned and H/Corg-style testing concepts; not presented as a universal guarantee for all output.',
  },
  {
    value: '2',
    label: 'kiln platform contexts',
    status: 'operational',
    note:
      'Mobile and fixed systems are active in distinct operating contexts.',
  },
  {
    value: '300+',
    label: 'future direct jobs potential',
    status: 'pipeline',
    note:
      'Presented as future employment potential, not current confirmed employment.',
  },
  {
    value: '5',
    label: 'regional development markets',
    status: 'pipeline',
    note:
      'Earlier-stage regional development is distinct from active operating corridors.',
  },
] as const;

export const operatingPrinciples = [
  {
    title: 'Demand before scale',
    description:
      'Projects are evaluated around product use, carbon documentation, and deployment fit before scale assumptions are made.',
  },
  {
    title: 'Logistics first',
    description:
      'Feedstock access, collection, transport, and buyer delivery determine whether a corridor can operate.',
  },
  {
    title: 'Replicable by design',
    description:
      'The operating backbone is repeatable, but each corridor still has local feedstock, infrastructure, and approval constraints.',
  },
  {
    title: 'Community integration',
    description:
      'Local teams, sourcing relationships, and agricultural co-benefits are part of operating durability.',
  },
] as const;

const contactDomain = siteMeta.domain;

export const contact = {
  label: 'Contact',
  hero: {
    title: 'Choose the right BRG conversation.',
    intro:
      'Select a route, prepare an inquiry, or email the relevant BRG address directly.',
    primaryAction: { label: 'Start an inquiry', href: '#inquiry-form' },
    secondaryAction: { label: 'Direct emails', href: '#direct-emails', variant: 'secondary' },
    meta: ['Investors', 'Carbon buyers', 'Project partners', 'General'],
  },
  form: {
    mode: 'mailto',
    endpoint: '',
    title: 'Inquiry form',
    intro:
      'This opens your email app with a prepared message.',
    actionLabel: 'Prepare email inquiry',
    copySummaryLabel: 'Copy inquiry summary',
    privacyNote:
      'The site does not store form data. Your email app handles delivery unless a form endpoint is configured later.',
    fields: {
      name: 'Name',
      organization: 'Organization',
      email: 'Email',
      role: 'Role',
      inquiryType: 'Inquiry type',
      geography: 'Geography',
      message: 'Message',
    },
  },
  routes: [
    {
      key: 'investor',
      label: 'Investor',
      title: 'Capital and project finance',
      description:
        'Use this route for equity, project-level finance, investor review, or operating economics.',
      recipient: `invest@${contactDomain}`,
      subject: 'Investor inquiry',
      bodyTemplate:
        'I am contacting BRG about an investor inquiry. Please share the relevant project, market, or review context.',
    },
    {
      key: 'carbon',
      label: 'Carbon buyer',
      title: 'Carbon removal offtake',
      description:
        'Use this route for future biochar carbon removal supply, MRV, delivery timing, or offtake structure.',
      recipient: `carbon@${contactDomain}`,
      subject: 'Carbon removal offtake inquiry',
      bodyTemplate:
        'I am contacting BRG about carbon removal offtake. Please share volume, timing, geography, and review requirements.',
    },
    {
      key: 'partner',
      label: 'Project partner',
      title: 'Feedstock, deployment, or infrastructure partnership',
      description:
        'Use this route for feedstock streams, local operations, kiln deployment, procurement, or project delivery.',
      recipient: `partnerships@${contactDomain}`,
      subject: 'Project delivery partnership inquiry',
      bodyTemplate:
        'I am contacting BRG about a project delivery partnership. Please share the feedstock, geography, infrastructure, or partner context.',
    },
    {
      key: 'general',
      label: 'General',
      title: 'General BRG inquiry',
      description:
        'Use this route for media, general company questions, or conversations that do not fit the other routes.',
      recipient: siteMeta.email,
      subject: 'General BRG inquiry',
      bodyTemplate:
        'I am contacting BRG with a general inquiry. Please share the context and the next decision or question.',
    },
  ],
  directEmails: [
    { label: 'General', address: `info@${contactDomain}` },
    { label: 'Investors', address: `invest@${contactDomain}` },
    { label: 'Carbon buyers', address: `carbon@${contactDomain}` },
    { label: 'Project partners', address: `partnerships@${contactDomain}` },
  ],
  reassurance:
    'BRG routes inquiries to the relevant team and aims to respond within two business days.',
} as const;

export const footer = {
  description:
    'BRG builds biochar carbon removal infrastructure from waste biomass.',
  groups: [
    {
      title: 'Explore',
      links: [
        { label: 'Platform', href: '/platform/' },
        { label: 'Markets', href: '/markets/' },
        { label: 'About', href: '/about/' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'Contact BRG', href: '/contact/' },
        { label: 'Privacy', href: '/privacy/' },
      ],
    },
  ],
} as const;

export const privacy = {
  hero: {
    label: 'Privacy',
    title: 'Privacy notice',
    intro:
      'This page explains how inquiry information is handled on the BRG static website.',
  },
  sections: [
    {
      title: 'Static site behavior',
      text:
        'This website does not store inquiry form data in mailto mode. When you prepare an inquiry, the site builds an email draft in your own email app.',
    },
    {
      title: 'Inquiry routing',
      text:
        'BRG uses inquiry information to respond to relevant investor, carbon buyer, project partner, or general conversations.',
    },
    {
      title: 'Future form endpoint',
      text:
        'If a form endpoint is configured later, that endpoint provider receives submitted form data and handles delivery to BRG.',
    },
    {
      title: 'No invented tracking claims',
      text:
        'This notice does not claim analytics, cookies, or tracking behavior that is not implemented in this repository.',
    },
  ],
} as const;
