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
      'BRG builds biochar carbon removal infrastructure from waste biomass in emerging markets.',
    path: '/',
  },
  platform: {
    title: 'Operating Platform',
    description:
      'How BRG turns feedstock, kiln deployment, monitoring, and buyers into operating biochar projects.',
    path: '/platform/',
  },
  markets: {
    title: 'Active Biochar Markets',
    description:
      'The BRG corridors currently active and the markets still under evaluation.',
    path: '/markets/',
  },
  about: {
    title: 'About BRG',
    description:
      'Leadership and verification posture behind Biomass Resource Group.',
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
    description: 'Operating activity is underway in market.',
  },
  {
    key: 'verification-pathway',
    label: 'Verification pathway in progress',
    description: 'Monitoring and methodology alignment are underway; issuance is not implied.',
  },
  {
    key: 'commercial-pipeline',
    label: 'Commercial offtake in progress',
    description: 'Buyer or procurement discussions are advancing, subject to agreement and delivery.',
  },
  {
    key: 'under-evaluation',
    label: 'Under evaluation',
    description: 'Market fit is being assessed before operating claims are made.',
  },
  {
    key: 'pipeline',
    label: 'Pipeline',
    description: 'A future market or milestone, distinct from active operations.',
  },
] as const;

export const claimStatus = {
  operational: 'Operational',
  tested: 'Tested',
  verificationReady: 'Verification-ready',
  underVerification: 'Under verification',
  pipeline: 'Pipeline',
  planned: 'Planned',
  unverified: 'Unverified',
} as const;

export const home = {
  hero: {
    label: 'Biochar infrastructure',
    title: 'Biochar infrastructure for carbon removal.',
    summary:
      'BRG turns waste biomass into durable biochar products and carbon removal projects in active corridors.',
    primaryAction: { label: 'Discuss a project', href: '/contact/#inquiry-form' },
    secondaryAction: { label: 'View markets', href: '/markets/' },
    metrics: [
      {
        value: '2',
        label: 'active operating corridors',
        status: 'Operational today',
      },
      {
        value: '3',
        label: 'commercial revenue channels',
        status: 'Product, carbon, technology',
      },
      {
        value: '5',
        label: 'pipeline markets under evaluation',
        status: 'Not active operations',
      },
      {
        value: '100+',
        label: 'year durability pathway',
        status: 'Subject to testing and verification',
      },
    ],
  },
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
    label: 'Choose your pathway',
    title: 'Start with the conversation that matches your mandate.',
    intro:
      'Each route preselects the right inquiry type on the contact page and keeps the homepage focused.',
  },
  proof: {
    label: 'Active corridors',
    title: 'Where work is active now',
    intro:
      'Current corridors are kept separate from pipeline markets and future evaluation.',
  },
  scale: {
    label: 'Why the platform scales',
    title: 'Project economics are designed around more than one revenue line.',
    intro:
      'Carbon revenue depends on successful project approval, monitoring, verification, issuance, and offtake. BRG designs each asset so product and technology channels matter too.',
  },
  finalCta: {
    label: 'Contact',
    title: 'Start a focused conversation',
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
      'Discuss asset-level economics, pipeline qualification, operating timelines, and risk controls.',
    href: '/contact/?type=investor#inquiry-form',
    cta: 'Start investor inquiry',
    subject: 'Investor inquiry',
    recipient: 'invest@biomassresourcegroup.com',
  },
  {
    audience: 'Carbon buyers',
    title: 'Evaluate future biochar carbon removal supply.',
    description:
      'Discuss durability testing, MRV readiness, verification pathways, delivery timing, and offtake structure.',
    href: '/contact/?type=carbon#inquiry-form',
    cta: 'Start offtake inquiry',
    subject: 'Carbon removal offtake inquiry',
    recipient: 'carbon@biomassresourcegroup.com',
  },
  {
    audience: 'Project partners',
    title: 'Develop feedstock, deployment, or procurement channels.',
    description:
      'Discuss local feedstock streams, kiln deployment, infrastructure integration, and operating responsibilities.',
    href: '/contact/?type=partner#inquiry-form',
    cta: 'Start partnership inquiry',
    subject: 'Project delivery partnership inquiry',
    recipient: 'partnerships@biomassresourcegroup.com',
  },
] as const;

export const platformPage = {
  hero: {
    label: 'Operating platform',
    title: 'Biochar projects, built end to end.',
    intro:
      'BRG combines feedstock access, kiln deployment, monitoring, and buyer channels in one operating model.',
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
          'Route biochar products and future credits to buyers.',
      },
    ],
  },
  ownership: {
    label: 'Ownership model',
    title: 'BRG owns and operates infrastructure, not just advice.',
    intro:
      'The operating boundary is explicit: BRG builds local vehicles, controls field execution, and partners where local infrastructure or procurement channels require it.',
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
    label: 'Technology matrix',
    title: 'Deployment choices follow the corridor.',
    intro:
      'The technology layer is shown by operating function and status, with careful separation between active use and readiness pathways.',
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
        statusLabel: 'Verification pathway in progress',
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
        statusLabel: 'Verification pathway in progress',
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
    title: 'Verification claims stay narrow',
    intro:
      'The site distinguishes active operations from verification pathways and future credit issuance.',
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

export const commercialModel = {
  label: 'Revenue stack',
  title: 'Three revenue lines',
  intro:
    'Product sales, carbon removal credits, and technology channels are evaluated together.',
  caveat:
    'Carbon removal credits are not represented as issued or verified unless a project has completed the relevant approval, monitoring, verification, issuance, and offtake steps.',
  lines: [
    {
      title: 'Biochar product sales',
      description:
        'Agricultural, soil, waste, and industrial product channels create non-credit revenue potential.',
    },
    {
      title: 'Carbon removal credits',
      description:
        'Eligible production can move through registry and verifier pathways before any credit issuance or delivery claim.',
    },
    {
      title: 'Technology and deployment channels',
      description:
        'Mobile kiln technology, deployment support, and local operating partnerships can extend the platform selectively.',
    },
  ],
} as const;

export const marketsPage = {
  hero: {
    label: 'Markets',
    title: 'Active corridors',
    intro:
      'BRG separates current operating work from markets still under evaluation.',
    primaryAction: { label: 'Discuss a corridor', href: '/contact/?type=partner#inquiry-form' },
    secondaryAction: { label: 'Review platform', href: '/platform/', variant: 'secondary' },
    meta: ['Active corridors', 'Pipeline separated', 'Status-led review'],
  },
  activeIntro: {
    label: 'Active corridors',
    title: 'Operating work underway',
    intro:
      'These corridors have operating activity. Verification and offtake milestones remain project-specific.',
  },
  corridorDetail: {
    label: 'Corridor detail',
    title: 'What is active versus still in progress.',
    intro:
      'Active operating infrastructure does not automatically mean every carbon credit, registry, or offtake step is complete.',
  },
  pipelineIntro: {
    label: 'Pipeline',
    title: 'Markets under evaluation',
    intro:
      'Pipeline markets are not presented as active projects.',
  },
  finalCta: {
    label: 'Contact',
    title: 'Discuss a corridor',
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
    carbonPathway: 'Puro.earth pathway in progress',
    nextMilestone: 'Scale mobile kiln fleet and continue third-party verification',
    description:
      'Community-scale mobile kiln operations are active. Carbon removal language is framed as a verification pathway rather than completed credit issuance.',
    evidenceNote:
      'Active operation and verification readiness are distinct; this site does not claim completed registry issuance for the corridor.',
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
    carbonPathway: 'Project-specific MRV pathway',
    nextMilestone: 'Advance procurement and MRV integration with infrastructure partners',
    description:
      'Industrial fixed-kiln work is active. Verification and offtake claims remain project-specific and subject to approval.',
    evidenceNote:
      'Integration with infrastructure partners is not the same as registry approval or third-party credit issuance.',
  },
] as const;

export const pipelineMarkets = [
  {
    name: 'Pakistan',
    status: 'under-evaluation',
    statusLabel: 'Under evaluation',
    description:
      'Potential market fit is being assessed against feedstock access, local partners, and commercial channels.',
  },
  {
    name: 'MENA',
    status: 'under-evaluation',
    statusLabel: 'Under evaluation',
    description:
      'Regional opportunities are being evaluated; no active operating claim is made from this label alone.',
  },
  {
    name: 'Sub-Saharan Africa',
    status: 'pipeline',
    statusLabel: 'Pipeline',
    description:
      'Pipeline review for future corridors beyond the current active East Africa operating footprint.',
  },
] as const;

export const aboutPage = {
  hero: {
    label: 'About BRG',
    title: 'Operator-led infrastructure.',
    intro:
      'BRG is built around field execution, commercial channels, and careful verification language.',
    primaryAction: { label: 'Contact leadership', href: '/contact/?type=general#inquiry-form' },
    secondaryAction: { label: 'See active markets', href: '/markets/', variant: 'secondary' },
    meta: ['Operator-led', 'Evidence-aware', 'Pipeline separated'],
  },
  story: {
    label: 'Operating story',
    title: 'Operating history matters because biochar is a field problem.',
    intro:
      'Feedstock contracts, logistics, kiln operation, product buyers, and verification workflows have to work together before a corridor can scale.',
    paragraphs: [
      'BRG has built operating context across East Africa and the Middle East, with a focus on turning difficult waste streams into commercial biochar infrastructure.',
      'The company presents active operating corridors separately from pipeline markets so buyers, investors, and partners can judge what is operating now and what remains under evaluation.',
    ],
  },
  leadership: {
    label: 'Leadership',
    title: 'Leadership',
    intro:
      'A concise view of who leads the company and where each person focuses.',
  },
  standards: {
    label: 'Standards and verification pathways',
    title: 'Pathways, not endorsements',
    intro:
      'Referenced organizations are treated as standards, testing, methodology, or verification pathways.',
  },
  evidence: {
    label: 'Evidence snapshot',
    title: 'Metrics are labeled by status.',
    intro:
      'The snapshot distinguishes operational signals from pipeline signals and verification-ready claims.',
  },
  principles: {
    label: 'Operating principles',
    title: 'How BRG decides what to build.',
    intro:
      'The principles are deliberately short so they can be scanned by investors, buyers, and operating partners.',
  },
  finalCta: {
    label: 'Contact',
    title: 'Contact BRG',
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
      'Julie leads BRG as CEO, setting company direction across strategy, partnerships, and growth.',
      'Her work connects BRG operating proof to capital, procurement, buyer, and institutional conversations.',
    ],
    href: 'https://www.linkedin.com/in/julieajbrown/',
  },
  {
    name: 'Cody Danet',
    role: 'Co-Founder',
    focus: ['Market buildout', 'Feedstock logistics', 'Technology deployment'],
    bio: [
      'Cody brings operating continuity from the original Riziki NBS field work through BRG corridor buildout.',
      'His work centers on local teams, feedstock contracts, kiln deployment, and day-to-day execution.',
    ],
  },
] as const;

export const verification = {
  pathways: [
    {
      label: 'DNV and SGS',
      detail: 'Accredited verification bodies referenced as potential review pathways.',
      status: 'underVerification',
      evidenceNote: 'No endorsement, certification, or affiliation is claimed on this site.',
    },
    {
      label: 'Puro.earth, Isometric, and Verra VM0044',
      detail: 'Biochar carbon removal methodology or registry pathways, subject to project approval.',
      status: 'verificationReady',
      evidenceNote: 'Project approval, validation, verification, issuance, and delivery are project-specific.',
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
    'BRG uses "verification-ready" for prepared project data, "verification pathway in progress" for projects moving through review, and "verified carbon removal" only after the relevant third-party process is complete.',
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
    label: 'Direct jobs pipeline',
    status: 'pipeline',
    note:
      'Presented as pipeline employment potential, not current confirmed employment.',
  },
  {
    value: '5',
    label: 'country pipeline',
    status: 'pipeline',
    note:
      'Pipeline and under-evaluation markets are distinct from active operations.',
  },
] as const;

export const operatingPrinciples = [
  {
    title: 'Revenue before scale',
    description:
      'Projects are evaluated around product, carbon, and technology channels before scale assumptions are made.',
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
    title: 'Contact BRG',
    intro:
      'Send an inquiry or use the visible direct email addresses below.',
    primaryAction: { label: 'Start an inquiry', href: '#inquiry-form' },
    secondaryAction: { label: 'Direct emails', href: '#direct-emails', variant: 'secondary' },
    meta: ['Investors', 'Carbon buyers', 'Project partners', 'General'],
  },
  form: {
    mode: 'mailto',
    endpoint: '',
    title: 'Inquiry form',
    intro:
      'The form builds a prefilled email when no form endpoint is configured.',
    actionLabel: 'Prepare email inquiry',
    copySummaryLabel: 'Copy inquiry summary',
    privacyNote:
      'This static site does not store inquiry data. If no form endpoint is configured, your email app handles delivery; if an endpoint is configured later, the configured form service handles submission.',
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
        'Use this route for equity, project-level finance, diligence, or operating economics.',
      recipient: `invest@${contactDomain}`,
      subject: 'Investor inquiry',
      bodyTemplate:
        'I am contacting BRG about an investor inquiry. Please share the relevant project, market, or diligence context.',
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
        'I am contacting BRG about carbon removal offtake. Please share volume, timing, geography, and diligence requirements.',
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
      ],
    },
  ],
} as const;
