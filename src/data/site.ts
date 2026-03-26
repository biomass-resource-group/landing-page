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
  { label: 'Platform', href: '#platform' },
  { label: 'Model', href: '#model' },
  { label: 'Technology', href: '#technology' },
  { label: 'Regions', href: '#regions' },
  { label: 'Impact', href: '#impact' },
  { label: 'Updates', href: '#updates' },
  { label: 'Contact', href: '#contact', primary: true },
] as const;

export const hero = {
  label: 'Biochar Carbon Removal Infrastructure',
  emphasis: 'carbon removal infrastructure',
  summary:
    'BRG turns waste biomass into verified carbon removal and agricultural biochar through owner-operated assets in East Africa and the Middle East.',
  primaryAction: {
    label: 'See the Operating Model',
    href: '#model',
  },
  secondaryAction: {
    label: 'Partner with BRG',
    href: '#contact',
  },
  metrics: [
    { value: '3.5+', label: 'Years of field operations' },
    { value: '5', label: 'Country pipeline' },
    { value: '2', label: 'Kiln platforms validated' },
    { value: '3', label: 'Parallel revenue streams' },
  ],
  flywheel: [
    'Feedstock sourcing',
    'Pyrolysis operations',
    'Carbon monitoring',
    'Market access',
  ],
};

export const affiliations = [
  { label: 'Verification', detail: 'Project verification infrastructure' },
  { label: 'Carbon Registry', detail: 'Registry-aligned issuance pathways' },
  { label: 'Kiln Technology', detail: 'Field-validated platform partners' },
  { label: 'Government Procurement', detail: 'Tender and contract channels' },
  { label: 'Research', detail: 'Agronomy and permanence testing' },
] as const;

export const platform = {
  label: 'Our Platform',
  title: 'End-to-end biochar infrastructure, from feedstock to carbon credit.',
  intro:
    'BRG owns the value chain from feedstock to credit issuance in a format designed to transfer across regions, feedstocks, and regulatory environments.',
  narrative: [
    'BRG operates biochar production and carbon removal businesses across emerging markets, converting agricultural waste, invasive species, and municipal organics into durable biochar.',
    'The real moat is the operating layer: feedstock contracts, logistics, local teams, verification workflows, and buyer relationships that hold up in the field.',
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
        'Integrated monitoring and verification workflows for high-integrity carbon credit issuance.',
    },
    {
      title: 'Offtake and Market Access',
      description:
        'Channels to biochar buyers, carbon purchasers, and public-sector procurement programs.',
    },
  ],
};

export const commercialModel = {
  label: 'Commercial Model',
  title: 'Three revenue streams from a single operational process.',
  intro:
    'One operating loop supports product sales, carbon offtake, and contracted waste processing.',
  lines: [
    {
      phase: 'Production',
      title: 'Biomass-to-biochar conversion',
      description:
        'Mobile and fixed systems convert locally available waste streams into marketable biochar products.',
      revenue: ['Biochar product sales', 'Agricultural amendments', 'Energy co-products'],
    },
    {
      phase: 'Offtake',
      title: 'Carbon removal credits',
      description:
        'Each production run yields verified credits backed by physical output and third-party monitoring.',
      revenue: ['Spot carbon sales', 'Forward offtake agreements'],
    },
    {
      phase: 'Procurement',
      title: 'Waste processing contracts',
      description:
        'Municipal and industrial operators pay for waste diversion, creating recurring revenue outside carbon pricing.',
      revenue: ['Government tenders', 'Municipal contracts', 'Industrial waste fees'],
    },
  ],
};

export const technology = {
  label: 'Technology',
  title: 'Two validated kiln platforms, optimized for distinct operating contexts.',
  intro:
    'Technology selection follows feedstock, throughput, and deployment constraints in each market.',
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
  title: 'Active operations and a global pipeline built for replication.',
  intro:
    'Each region uses the same operating backbone while adapting to local feedstock, policy, and buyer conditions.',
  markets: [
    {
      name: 'East Africa',
      status: 'Active',
      description:
        'Community-scale mobile kiln operations converting invasive Prosopis mesquite into agricultural biochar and verified carbon removal credits. Full operating team, logistics infrastructure, and buyer relationships are in place.',
      detail: [
        { label: 'Entity', value: 'Riziki NBS' },
        { label: 'Technology', value: 'Mobile kilns' },
        { label: 'Feedstock', value: 'Invasive species' },
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
      ],
      theme: 'saudi',
    },
  ],
  expansion: {
    title: 'Expansion pipeline under active evaluation',
    description:
      'The model is being assessed for markets where feedstock, carbon demand, and local partners line up.',
    regions: ['Pakistan', 'MENA', 'Sub-Saharan Africa'],
  },
};

export const impact = {
  label: 'Impact',
  title: 'Measurable outcomes across carbon, employment, and waste diversion.',
  intro: 'Every metric is tied to operating output. We report only what we can verify.',
  narrative: [
    'Every tonne of BRG biochar is traceable to a specific production run and aligned with third-party verification. In parallel, operations create jobs, divert waste, and support agricultural productivity in the markets where they run.',
  ],
  stats: [
    {
      value: '100+',
      label: 'Years of carbon stability',
      description:
        'Biochar permanence supported by standardized testing and third-party verification pathways.',
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
        'Every project is structured to generate revenue from day one through waste processing contracts, biochar sales, and carbon credits. The model does not depend on grant funding.',
    },
    {
      title: 'Logistics first',
      description:
        'The hardest problem in biochar is not chemistry. It is moving feedstock to the kiln and product to the buyer reliably and at cost. We solve that before scaling.',
    },
    {
      title: 'Replicable by design',
      description:
        'Operational systems, contract structures, and monitoring protocols are designed to transfer into new markets with minimal adaptation.',
    },
    {
      title: 'Community integration',
      description:
        'We build with local teams, not around them. Employment, community feedstock sourcing, and agricultural co-benefits create long-term operating durability.',
    },
  ],
};

export const contact = {
  label: 'Work With Us',
  title: 'Investing in durable carbon removal infrastructure.',
  intro:
    'We partner with investors, carbon buyers, public-sector procurement teams, and waste-management operators.',
  audiences: [
    {
      audience: 'Investors',
      title: 'Deploy capital into physical carbon removal infrastructure',
      description:
        'Equity and project-level opportunities across operating and pipeline regions.',
      href: 'mailto:invest@biomassresourcegroup.com',
      action: 'Investor inquiries',
    },
    {
      audience: 'Carbon Buyers',
      title: 'Purchase high-permanence carbon removal credits',
      description:
        'Verified biochar credits with 100+ year permanence and third-party monitoring.',
      href: 'mailto:carbon@biomassresourcegroup.com',
      action: 'Buy carbon removal',
    },
    {
      audience: 'Governments and Operators',
      title: 'Partner on waste processing and biochar infrastructure',
      description:
        'Contract waste processing, biogas co-production, and biochar supply for municipalities and industrial operators.',
      href: 'mailto:partnerships@biomassresourcegroup.com',
      action: 'Partnership inquiries',
    },
  ],
};

export const footerGroups = [
  {
    title: 'Company',
    links: [
      { label: 'Platform', href: '#platform' },
      { label: 'Commercial Model', href: '#model' },
      { label: 'Technology', href: '#technology' },
      { label: 'Where We Operate', href: '#regions' },
      { label: 'Impact', href: '#impact' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Updates', href: '/updates/' },
      { label: 'Contact', href: '#contact' },
      { label: siteMeta.email, href: `mailto:${siteMeta.email}` },
    ],
  },
] as const;
