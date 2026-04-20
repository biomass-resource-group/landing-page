export const siteMeta = {
  name: 'Biomass Resource Group',
  shortName: 'BRG',
  siteUrl: 'https://biomassresourcegroup.com',
  title: 'Biomass Resource Group | Biochar Carbon Removal Infrastructure',
  description:
    'Biomass Resource Group builds and operates biochar carbon removal infrastructure in emerging markets, converting waste biomass into verified carbon removal and agricultural biochar at industrial scale.',
  email: 'info@biomassresourcegroup.com',
};

export const navLinks = [
  { label: 'Platform', href: '/platform/' },
  { label: 'Markets', href: '/markets/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/', primary: true },
] as const;

export const hero = {
  label: 'Biochar Carbon Removal Infrastructure',
  title: 'We build and operate carbon removal infrastructure in emerging markets.',
  summary:
    'BRG converts waste biomass into verified carbon removal and agricultural biochar at industrial scale across East Africa and the Middle East.',
  primaryAction: {
    label: 'Explore the platform',
    href: '/platform/',
  },
  secondaryAction: {
    label: 'See active markets',
    href: '/markets/',
  },
  metrics: [
    { value: '2', label: 'Active markets: East Africa and Saudi Arabia' },
    { value: '3', label: 'Revenue streams: product, carbon, technology' },
    { value: '100+', label: 'Years of biochar carbon stability' },
    { value: '5', label: 'Countries under evaluation' },
  ],
  flywheel: [
    'Feedstock sourcing',
    'Pyrolysis operations',
    'Carbon monitoring',
    'Market access',
  ],
};

export const affiliations = [
  { label: 'Verification', detail: 'DNV and SGS accredited verification bodies' },
  { label: 'Carbon Registry', detail: 'Puro.earth, Isometric, and Verra VM0044 pathways' },
  { label: 'Kiln Technology', detail: 'Field-validated mobile and fixed platforms' },
  { label: 'Government Procurement', detail: 'Municipal and industrial procurement channels' },
  { label: 'Research', detail: 'European Biochar Certificate (EBC) aligned testing' },
] as const;

export const exploreLinks = [
  {
    label: 'Platform',
    href: '/platform/',
    title: 'Understand the operating model.',
    description:
      'Sourcing, conversion, verification, and offtake organized as one repeatable system.',
  },
  {
    label: 'Markets',
    href: '/markets/',
    title: 'See where BRG operates now.',
    description:
      'Current operating markets, local entities, and the expansion pipeline in view.',
  },
  {
    label: 'About',
    href: '/about/',
    title: 'Meet the leadership team.',
    description:
      'Leadership, company background, and operating context behind the platform.',
  },
  {
    label: 'Contact',
    href: '/contact/',
    title: 'Choose the right BRG conversation.',
    description:
      'Capital, carbon offtake, or project delivery — each routes to the team that can act.',
  },
] as const;

export const audiencePaths = [
  {
    audience: 'Investors',
    title: 'Review the operating and commercialization model.',
    description:
      'Understand how BRG structures feedstock access, project ramp, and three-layer monetization in active markets.',
    href: '/platform/',
    cta: 'See platform model',
  },
  {
    audience: 'Carbon Buyers',
    title: 'Evaluate durability, monitoring, and delivery pathways.',
    description:
      'Assess biochar permanence, verification readiness, and the corridors currently positioned for offtake.',
    href: '/markets/',
    cta: 'Review active markets',
  },
  {
    audience: 'Operating Partners',
    title: 'Engage on deployment, procurement, and local execution.',
    description:
      'Connect with the BRG team on corridor buildout, kiln deployment, and in-country operating partnerships.',
    href: '/contact/',
    cta: 'Start a conversation',
  },
] as const;

export const trustSignals = [
  {
    label: 'Operating footprint',
    value: 'East Africa + Saudi Arabia',
  },
  {
    label: 'Durability profile',
    value: '100+ year carbon storage',
  },
  {
    label: 'Commercial model',
    value: 'Product + carbon + technology',
  },
  {
    label: 'Expansion pipeline',
    value: '5 additional countries',
  },
] as const;

export const about = {
  label: 'About BRG',
  title: 'Leadership, operations, and proof.',
  intro:
    'The people behind the operating platform — leadership, operating history, and the principles driving how BRG executes.',
  narrative: [
    'BRG has built local entities, logistics systems, feedstock relationships, and buyer channels in East Africa and the Middle East.',
    'That operating base supports technology deployment, commercialization, and verification as the platform expands into new markets.',
  ],
  highlights: [
    {
      title: 'Executive leadership',
      description:
        'Julie Brown leads company strategy, partnerships, and growth across BRG.',
    },
    {
      title: 'Founder experience',
      description:
        "Cody Danet brings founding operating context to BRG's platform and market buildout.",
    },
    {
      title: 'Operating discipline',
      description:
        'BRG combines active corridors, commercial channels, and verification readiness in one model.',
    },
  ],
  team: [
    {
      name: 'Julie Brown',
      role: 'CEO',
      focus: 'Executive leadership',
      summary:
        'Company direction, partner relationships, and growth leadership for BRG.',
      bio: 'Julie leads BRG as CEO, setting company direction across strategy, partnerships, and growth. She brings deep experience working across capital markets, government procurement, and commercial channels in emerging-market infrastructure contexts. Her background spans the deal and partnership structures that underpin BRG\u2019s three revenue lines\u2014product, carbon, and technology. That cross-channel fluency is what connects BRG\u2019s operating proof in East Africa and Saudi Arabia to the buyers, investors, and institutional partners the platform depends on.',
      href: 'https://www.linkedin.com/in/julieajbrown/',
      featured: true,
    },
    {
      name: 'Cody Danet',
      role: 'Co-Founder',
      focus: 'Platform and markets',
      summary:
        'Operator-led platform development and market footprint continuity across BRG.',
      bio: 'Cody is the founding operator behind BRG\u2019s platform, with direct operating continuity from the original Riziki NBS field work in East Africa through to the Saudi Biochar corridor. He brings hands-on experience in feedstock logistics, mobile kiln deployment, and local team development across markets where infrastructure is built from the ground up rather than adapted from established systems. That field depth\u2014operating kilns, negotiating feedstock contracts, building local entities\u2014gives BRG an operational foundation that is difficult to replicate without having run it. He leads market buildout, technology deployment, and day-to-day execution across BRG\u2019s active corridors.',
      href: undefined,
      featured: false,
    },
  ],
} as const;

export const platform = {
  label: 'Our Platform',
  title: 'One operating platform from feedstock to offtake.',
  intro:
    'The operating mechanism: how feedstock becomes verified biochar and three revenue streams across every deployment.',
  sequence: [
    {
      title: 'Secure feedstock',
      detail: 'Local sourcing agreements, collection logistics, and operating entities in market.',
    },
    {
      title: 'Run conversion',
      detail: 'Mobile or fixed-kiln systems selected for the market, feedstock, and throughput.',
    },
    {
      title: 'Verify output',
      detail: 'Monitoring, traceability, and registry-aligned verification built into operations.',
    },
    {
      title: 'Clear revenue',
      detail: 'Biochar offtake and carbon buyers connected from launch.',
    },
  ],
  narrative: [
    'BRG converts agricultural waste, invasive species, and municipal organics into durable biochar through an operating system designed for difficult markets.',
    'The moat is not a single kiln. It is the field layer: feedstock contracts, logistics, local teams, verification workflows, and buyer relationships that hold up under real operating conditions.',
  ],
  signals: [
    {
      label: 'Owner-operated entities',
      detail: 'Local execution teams and operating vehicles already in-market.',
    },
    {
      label: 'Verification-ready output',
      detail: 'MRV workflows aligned with Puro.earth, Isometric, and Verra VM0044 biochar methodologies.',
    },
    {
      label: 'Buyer and contract access',
      detail: 'Offtake, procurement, and market channels connected from launch.',
    },
  ],
  capabilities: [
    {
      title: 'Biomass Sourcing and Logistics',
      description:
        'In-country procurement and logistics systems that secure consistent feedstock at scale.',
    },
    {
      title: 'Pyrolysis Operations',
      description:
        'Mobile and fixed-kiln systems matched to the feedstock and throughput of each market.',
    },
    {
      title: 'Carbon Monitoring and Verification',
      description:
        'MRV workflows aligned with ICVCM-approved biochar methodologies for third-party verification and high-integrity credit issuance.',
    },
    {
      title: 'Offtake and Market Access',
      description:
        'Channels to biochar buyers, carbon purchasers, and public-sector procurement programs.',
    },
  ],
};

export const ownership = {
  label: 'Ownership model',
  title: 'What BRG owns, operates, licenses, and partners on.',
  intro: 'A single operating system with clearly defined ownership boundaries across the biochar carbon removal stack.',
  layers: [
    {
      layer: 'BRG owns',
      detail: 'Operating entities, feedstock contracts, local teams, verification workflows, and buyer relationships in active markets.',
    },
    {
      layer: 'BRG operates',
      detail: 'Mobile and fixed kiln systems, logistics networks, monitoring infrastructure, and commercial channels across East Africa and Saudi Arabia.',
    },
    {
      layer: 'BRG licenses',
      detail: 'Proprietary mobile kiln technology to third-party operators as a capital-efficient expansion pathway.',
    },
    {
      layer: 'BRG partners',
      detail: 'Governments, municipal utilities, industrial operators, carbon registries, and research institutions that enable market access and verification.',
    },
  ],
};

export const commercialModel = {
  label: 'Commercial Model',
  title: 'Each asset supports product, carbon, and technology revenue.',
  intro:
    'The operating platform earns from biochar product output, carbon removal, and kiln technology sales and licensing.',
  lines: [
    {
      phase: 'Production',
      title: 'Biomass-to-biochar conversion',
      description:
        'Mobile and fixed systems turn locally available waste streams into saleable biochar.',
      revenue: ['Biochar product sales', 'Agricultural amendments', 'Energy co-products'],
    },
    {
      phase: 'Offtake',
      title: 'Carbon removal credits',
      description:
        'Each production run can generate verified credits backed by physical output and third-party monitoring.',
      revenue: ['Spot carbon sales', 'Forward offtake agreements'],
    },
    {
      phase: 'Technology',
      title: 'Kiln technology',
      description:
        "Riziki's proprietary mobile kilns are available for purchase and licensing by third-party operators, generating capital revenue and expanding the platform's geographic reach without direct operating overhead.",
      revenue: ['Kiln unit sales', 'Licensing agreements', 'Third-party operator support'],
    },
  ],
};

export const technology = {
  label: 'Technology',
  title: 'Validated systems for distributed and industrial deployment.',
  intro:
    'Technology choice follows feedstock, throughput, and deployment constraints in each market.',
  systems: [
    {
      title: 'Mobile kiln systems',
      summary:
        'Transportable pyrolysis units deployed directly to biomass sources in distributed, rural settings. They reduce feedstock transport costs and enable community-level operation with minimal infrastructure.',
      tag: 'Field deployment',
      specs: [
        { label: 'Deployment', value: 'Distributed / rural' },
        { label: 'Feedstock', value: 'Invasive species, ag waste' },
        { label: 'Operation', value: 'Community-operated' },
        { label: 'Active in', value: 'East Africa' },
      ],
      theme: 'mobile',
    },
    {
      title: 'Fixed kiln installations',
      summary:
        'Permanent, higher-throughput pyrolysis installations integrated with municipal waste infrastructure. Co-located systems enable continuous operation and biogas energy recovery.',
      tag: 'Industrial installation',
      specs: [
        { label: 'Deployment', value: 'Industrial / co-located' },
        { label: 'Feedstock', value: 'Sewage sludge, organics' },
        { label: 'Operation', value: 'Dedicated engineering team' },
        { label: 'Active in', value: 'Saudi Arabia' },
      ],
      theme: 'fixed',
    },
  ],
};

export const regions = {
  label: 'Where We Operate',
  title: 'Two active markets, with a wider pipeline underway.',
  intro:
    'Proof per corridor: named entities, feedstock sources, kiln platforms, verification pathways, and current operating status.',
  markets: [
    {
      name: 'East Africa',
      status: 'Active',
      description:
        'Community-scale mobile kiln operations converting invasive Prosopis mesquite into agricultural biochar and Puro.earth-pathway carbon removal credits. Full operating team, logistics infrastructure, and buyer relationships are in place.',
      detail: [
        { label: 'Entity', value: 'Riziki NBS' },
        { label: 'Technology', value: 'Mobile kilns' },
        { label: 'Feedstock', value: 'Invasive species' },
        { label: 'Verification', value: 'Puro.earth methodology pathway' },
        { label: 'End use', value: 'Smallholder agriculture' },
        { label: 'Milestone', value: 'Scaling mobile kiln fleet' },
      ],
      metrics: [
        { label: 'Active kilns', value: 'Mobile fleet' },
        { label: 'Carbon stability', value: '100+ years' },
        { label: 'Stage', value: 'Production' },
      ],
      theme: 'kenya',
    },
    {
      name: 'Kingdom of Saudi Arabia',
      status: 'Active',
      description:
        'Industrial-scale fixed-kiln biochar and biogas production integrated with national water and waste infrastructure through strategic industrial and government partnerships.',
      detail: [
        { label: 'Entity', value: 'Saudi Biochar' },
        { label: 'Technology', value: 'Fixed kilns' },
        { label: 'Feedstock', value: 'Sewage sludge' },
        { label: 'Verification', value: 'Industrial MRV integration' },
        { label: 'End use', value: 'Soil amendment + biogas' },
        { label: 'Milestone', value: 'Government procurement channel' },
      ],
      metrics: [
        { label: 'Throughput', value: 'Industrial scale' },
        { label: 'Co-product', value: 'Biogas recovery' },
        { label: 'Stage', value: 'Production' },
      ],
      theme: 'saudi',
    },
  ],
  expansion: {
    title: 'Expansion pipeline under active evaluation',
    description:
      'The model is being assessed for markets where feedstock, demand, and local partners line up.',
    regions: ['Pakistan', 'MENA', 'Sub-Saharan Africa'],
  },
};

export const impact = {
  label: 'Why BRG',
  title: 'Operational proof, not speculative narrative.',
  intro: 'Every metric is tied to production, permanence, or market execution. We report only what we can verify.',
  evidenceLabel: 'Measured in the field',
  narrative: [
    'Every tonne of BRG biochar is traceable to a specific production run, tested against European Biochar Certificate standards, and aligned with Puro.earth, Isometric, or Verra VM0044 verification pathways. In parallel, operations create jobs, divert waste, and support agricultural productivity in the markets where they run.',
  ],
  stats: [
    {
      value: '100+',
      label: 'Years of carbon stability',
      description:
        'Biochar permanence validated by H/Corg molar ratio testing (≤0.70 threshold) against European Biochar Certificate standards.',
    },
    {
      value: '2',
      label: 'Proven kiln platforms',
      description:
        'Mobile and fixed pyrolysis systems validated for distinct operational contexts.',
    },
    {
      value: '300+',
      label: 'Direct jobs pipeline',
      description:
        'Roles across biomass sourcing, kiln operation, logistics, and monitoring.',
    },
    {
      value: '5',
      label: 'Country pipeline',
      description:
        'Active operations and expansion opportunities across East Africa, MENA, and South Asia.',
    },
  ],
};

export const leadership = {
  label: 'Leadership',
  title: 'Built by operators, not observers.',
  intro:
    'BRG has spent years building the operating infrastructure that makes biochar work at scale in difficult environments.',
  narrative: [
    'The team operates on the ground in East Africa and the Middle East. It has built logistics networks, trained local teams, negotiated contracts, and operated across jurisdictions. That operating depth is the differentiator.',
  ],
  principles: [
    {
      title: 'Revenue before scale',
      description:
        'Every project is structured to generate revenue across three commercial channels\u2014biochar product sales, carbon removal credits, and kiln technology\u2014before the platform scales. Both active corridors, East Africa and Saudi Arabia, run on this multi-stream model from day one. The model does not depend on grant funding.',
    },
    {
      title: 'Logistics first',
      description:
        'The hardest problem in biochar is not chemistry. It is moving feedstock to the kiln and product to the buyer reliably and at cost. In East Africa, that means Prosopis mesquite collection and transport to distributed mobile kilns across rural corridors. In Saudi Arabia, it means integrating municipal sewage sludge into fixed-kiln operations tied to national water infrastructure. We solve logistics before scaling.',
    },
    {
      title: 'Replicable by design',
      description:
        'The same operating backbone\u2014feedstock contracting, kiln deployment, verification workflows, and offtake channels\u2014runs across both the East Africa and Saudi Arabia corridors. Operational systems, contract structures, and monitoring protocols are designed to transfer into new markets with minimal adaptation.',
    },
    {
      title: 'Community integration',
      description:
        'We build with local teams, not around them. In East Africa, Riziki NBS operates community-scale mobile kilns with local feedstock collectors and field staff. In Saudi Arabia, Saudi Biochar integrates with national infrastructure and local industrial partners. Employment, community feedstock sourcing, and agricultural co-benefits create long-term operating durability.',
    },
  ],
};

export const contact = {
  label: 'Contact',
  title: 'Start a partnership conversation with BRG.',
  intro:
    'Pick the fastest route to the right BRG team for capital, offtake, or operating partnerships.',
  signal:
    'Direct routes for capital deployment, carbon offtake, and project delivery conversations.',
  summaryChips: ['Capital', 'Carbon offtake', 'Project delivery'],
  routeSteps: [
    {
      title: 'Choose the route',
      detail: 'Capital, carbon offtake, or project delivery each open a different BRG path.',
    },
    {
      title: 'Share the scope',
      detail: 'Include market, mandate, timeline, and the decision you need to make next.',
    },
    {
      title: 'Reach the right team',
      detail: 'BRG routes the message to the operator, buyer, or capital contact who can act on it.',
    },
  ],
  reassurance: 'BRG routes every inquiry to the relevant capital, carbon, or project team. Expect a response within two business days.',
  audiences: [
    {
      audience: 'Investors',
      title: 'Deploy capital into physical carbon removal infrastructure',
      description:
        'Equity and project-level opportunities across operating and pipeline regions.',
      diligence: [
        'Unit economics per asset across product, carbon, and technology revenue.',
        'Pipeline qualification criteria for new market evaluation.',
        'Operating timeline from market entry to first carbon credit issuance.',
        'Risk controls across feedstock, verification, and offtake.',
      ],
      href: 'mailto:invest@biomassresourcegroup.com',
      action: 'Investor inquiries',
    },
    {
      audience: 'Carbon Buyers',
      title: 'Purchase high-permanence carbon removal credits',
      description:
        'Verified biochar credits with 100+ year permanence and third-party monitoring.',
      diligence: [
        'H/Corg molar ratio testing and EBC-aligned permanence validation.',
        'Puro.earth, Isometric, or Verra VM0044 verification pathway per project.',
        'Delivery timing from production run to credit issuance.',
        'Forward offtake structure and credit volume by corridor.',
      ],
      href: 'mailto:carbon@biomassresourcegroup.com',
      action: 'Buy carbon removal',
    },
    {
      audience: 'Governments and Operators',
      title: 'Partner on biochar and biomass infrastructure',
      description:
        'Biochar deployment, biogas co-production, feedstock sourcing, and supply partnerships for municipalities and industrial operators.',
      diligence: [
        'Procurement model for kiln deployment and feedstock partnerships.',
        'Local job creation and community feedstock sourcing.',
        'Integration with municipal waste, water, or industrial infrastructure.',
        'Operating responsibilities split between BRG and local partner.',
      ],
      href: 'mailto:partnerships@biomassresourcegroup.com',
      action: 'Partnership inquiries',
    },
  ],
  form: {
    title: 'Tell us about your inquiry.',
    intro: 'Every field helps BRG route your message to the right team.',
    // The form is hidden until a real Formspree form ID is set here.
    // When this value is FORM_ID_PLACEHOLDER, contact.astro renders the
    // mailto fallback cards as the primary path instead of the form.
    action: 'https://formspree.io/f/FORM_ID_PLACEHOLDER',
    actionLabel: 'Send inquiry',
    fallbackLabel: 'Or email directly',
    fields: {
      name: 'Your name',
      organization: 'Organization',
      email: 'Email address',
      role: 'Role or title',
      geography: 'Country or region',
      route: 'What brings you to BRG?',
      routeOptions: ['Capital', 'Carbon offtake', 'Project delivery'],
      mandate: 'Mandate type',
      timeline: 'Timeline',
      timelineOptions: ['Under 3 months', '3\u20136 months', '6\u201312 months', '12+ months'],
      message: 'Your message',
    },
  },
};

export const operatingProof = {
  label: 'Operating proof',
  title: 'Active infrastructure in two markets.',
  corridors: [
    {
      name: 'East Africa',
      entity: 'Riziki NBS',
      feedstock: 'Invasive Prosopis mesquite',
      technology: 'Mobile kiln fleet',
      status: 'Producing biochar and carbon removal credits',
      verification: 'Third-party verification pathway in progress',
    },
    {
      name: 'Saudi Arabia',
      entity: 'Saudi Biochar',
      feedstock: 'Municipal sewage sludge',
      technology: 'Fixed kiln installation',
      status: 'Industrial biochar and biogas production',
      verification: 'Integrated with national waste infrastructure',
    },
  ],
};

export const footerGroups = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Platform', href: '/platform/' },
      { label: 'Markets', href: '/markets/' },
      { label: 'About', href: '/about/' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Contact', href: '/contact/' },
    ],
  },
] as const;
