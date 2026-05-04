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
      'BRG develops feedstock, kiln deployment, buyer channels, and carbon documentation across active biochar corridors in East Africa and Saudi Arabia.',
    primaryAction: { label: 'Start a conversation', href: '/contact/#inquiry-form' },
    secondaryAction: { label: 'See active corridors', href: '/markets/' },
  },
  statusRail: [
    {
      label: 'Active corridors',
      text: 'East Africa and Saudi Arabia.',
    },
    {
      label: 'Operating model',
      text: 'Feedstock, kiln deployment, buyers, documentation.',
    },
    {
      label: 'Review posture',
      text: 'Outcomes subject to approval, validation, verification, issuance, and delivery.',
    },
  ],
  proof: {
    label: 'Active corridors',
    title: 'Operating corridors',
    intro:
      'Two corridors are operating. Each adapts kiln choice, feedstock, and buyer channels to local infrastructure.',
  },
  finalCta: {
    label: 'Contact',
    title: 'Start the right BRG conversation',
    intro:
      'One inquiry routes to investor, carbon buyer, project partner, or general — pick a route on contact.',
    primaryAction: { label: 'Start an inquiry', href: '/contact/#inquiry-form' },
    secondaryAction: { label: 'View platform', href: '/platform/', variant: 'secondary' },
  },
} as const;

export const audiencePaths = [
  {
    audience: 'Investors',
    title: 'Review project economics and operating risk.',
    description:
      'Asset-level economics, qualification, operating timelines, and risk controls.',
    href: '/contact/?type=investor#inquiry-form',
    cta: 'Investor inquiry',
    subject: 'Investor inquiry',
    recipient: 'invest@biomassresourcegroup.com',
  },
  {
    audience: 'Carbon buyers',
    title: 'Evaluate future biochar carbon removal supply.',
    description:
      'Durability testing, MRV readiness, registry pathway, delivery timing, and offtake structure.',
    href: '/contact/?type=carbon#inquiry-form',
    cta: 'Carbon buyer inquiry',
    subject: 'Carbon removal offtake inquiry',
    recipient: 'carbon@biomassresourcegroup.com',
  },
  {
    audience: 'Project partners',
    title: 'Develop feedstock, deployment, or procurement channels.',
    description:
      'Local feedstock streams, kiln deployment, infrastructure integration, operating responsibilities.',
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
      'BRG coordinates feedstock access, kiln deployment, buyer channels, and project documentation inside each operating corridor.',
    primaryAction: { label: 'Request platform overview', href: '/contact/?type=general#inquiry-form' },
    secondaryAction: { label: 'View active markets', href: '/markets/', variant: 'secondary' },
  },
  process: {
    label: 'Operating model',
    title: 'Operating model',
    intro:
      'The same sequence repeats across suitable corridors.',
    steps: [
      {
        title: 'Feedstock access',
        description: 'Secure consistent waste biomass and workable collection economics.',
      },
      {
        title: 'Kiln deployment',
        description: 'Match mobile or fixed kiln systems to site, throughput, and feedstock.',
      },
      {
        title: 'Buyer channels',
        description: 'Develop biochar product, public procurement, and offtake conversations together.',
      },
      {
        title: 'Project documentation',
        description: 'Build monitoring, lab testing, and traceability into routine operations.',
      },
      {
        title: 'Review pathway',
        description: 'Prepare records for third-party review before any credit claim or delivery.',
      },
    ],
  },
  technology: {
    label: 'Technology fit',
    title: 'Technology fit',
    intro:
      'Kiln choice and documentation systems are selected for the operating context.',
    items: [
      {
        title: 'Mobile kilns',
        text: 'Distributed biomass streams.',
      },
      {
        title: 'Fixed kilns',
        text: 'Industrial or municipal streams.',
      },
      {
        title: 'Documentation systems',
        text: 'Testing, traceability, and project review.',
      },
    ],
  },
  reviewPosture: {
    label: 'Review posture',
    title: 'Review posture',
    text:
      'Project records, testing, traceability, and monitoring are prepared before any credit claim or delivery. Approval, validation, verification, issuance, and delivery remain project-specific.',
  },
  finalCta: {
    label: 'Contact',
    title: 'Request a platform overview',
    intro:
      'Use the contact form for operating model or review questions.',
    primaryAction: { label: 'Request platform overview', href: '/contact/?type=general#inquiry-form' },
    secondaryAction: { label: 'View active markets', href: '/markets/', variant: 'secondary' },
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
    secondaryAction: { label: 'View platform', href: '/platform/', variant: 'secondary' },
    meta: ['Active corridors', 'Additional regions', 'Stage-specific review'],
  },
  activeIntro: {
    label: 'Active corridors',
    title: 'Active operating corridors',
    intro:
      'Field operations are underway. Verification and offtake work advance on a per-project timeline.',
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
    secondaryAction: { label: 'View platform', href: '/platform/', variant: 'secondary' },
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
      'Feedstock contracts, logistics, kiln operation, product buyers, and review have to work together before a corridor can scale.',
    paragraphs: [
      'BRG has built operating context across East Africa and the Middle East, with a focus on turning difficult waste streams into commercial biochar infrastructure.',
      'Active operating corridors are kept distinct from earlier-stage development so buyers, investors, and partners can see what is operating now.',
    ],
    context: [
      { label: 'Active operations', value: 'East Africa, Saudi Arabia' },
      { label: 'Field execution', value: 'Local entities, owned operations' },
      { label: 'Review posture', value: 'Prepared for third-party review' },
    ],
  },
  claimsDiscipline: {
    label: 'Claims discipline',
    title: 'Claims discipline',
    text:
      'BRG references recognized testing, registry, and verification pathways as project-specific review routes. Certification, validation, verification, issuance, and delivery are claimed only after the applicable review is complete.',
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
      'This opens your email app with a prepared message. If your email app does not open, copy the inquiry summary and email the relevant address below.',
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
      description: 'Capital, project finance, and operating economics.',
      cta: 'Start investor inquiry',
      recipient: `invest@${contactDomain}`,
      subject: 'Investor inquiry',
      bodyTemplate:
        'I am contacting BRG about an investor inquiry. Please share the relevant project, market, or review context.',
    },
    {
      key: 'carbon',
      label: 'Carbon buyer',
      title: 'Future biochar carbon removal supply',
      description: 'Future supply, MRV readiness, and offtake structure.',
      cta: 'Start carbon buyer inquiry',
      recipient: `carbon@${contactDomain}`,
      subject: 'Carbon removal offtake inquiry',
      bodyTemplate:
        'I am contacting BRG about carbon removal offtake. Please share volume, timing, geography, and review requirements.',
    },
    {
      key: 'partner',
      label: 'Project partner',
      title: 'Feedstock, deployment, and infrastructure partnerships',
      description: 'Feedstock streams, kiln deployment, and procurement.',
      cta: 'Start partner inquiry',
      recipient: `partnerships@${contactDomain}`,
      subject: 'Project delivery partnership inquiry',
      bodyTemplate:
        'I am contacting BRG about a project delivery partnership. Please share the feedstock, geography, infrastructure, or partner context.',
    },
    {
      key: 'general',
      label: 'General',
      title: 'Company, media, and uncategorized questions',
      description: 'Company, media, or uncategorized questions.',
      cta: 'Start general inquiry',
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
    'BRG reviews each inquiry by route and responds where there is a relevant fit.',
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
      title: 'Inquiry information',
      text:
        'BRG uses the name, organization, email, role, geography, and message you provide to route the inquiry to the relevant team.',
    },
    {
      title: 'Mailto mode',
      text:
        'This website does not store inquiry form data in mailto mode. The site builds an email draft in your email application; delivery is handled by your email provider.',
    },
    {
      title: 'Future form endpoint',
      text:
        'If a form endpoint is configured later, that endpoint provider will receive submitted form data and forward it to BRG. This notice will be updated to describe the processor.',
    },
    {
      title: 'Analytics and cookies',
      text:
        'This site does not set analytics or marketing cookies. If analytics is added later, this notice will be updated.',
    },
    {
      title: 'Contact',
      text:
        'For questions about this notice, email info@biomassresourcegroup.com or use the contact page.',
    },
  ],
} as const;
