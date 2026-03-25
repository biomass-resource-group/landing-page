export const siteMeta = {
  name: 'Biomass Resource Group',
  shortName: 'BRG',
  siteUrl: 'https://biomassresourcegroup.io',
  title: 'Biomass Resource Group | Biochar Carbon Removal Infrastructure',
  description:
    'Biomass Resource Group builds and operates biochar carbon removal infrastructure in emerging markets, converting waste biomass into verified carbon removal and agricultural biochar at industrial scale.',
  email: 'info@biomassresourcegroup.io',
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
    'Converting waste biomass into verified carbon removal and agricultural biochar at industrial scale across East Africa and the Middle East. Owner-operated. Revenue-generating. Designed for replication.',
  primaryAction: {
    label: 'Our Commercial Model',
    href: '#model',
  },
  secondaryAction: {
    label: 'Partner With Us',
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
    'We own the full value chain. The platform is designed to replicate across geographies, feedstock types, and regulatory environments.',
  narrative: [
    'Biomass Resource Group is a holding company operating a portfolio of biochar production and carbon removal businesses across emerging markets. Our operating entities deploy proven pyrolysis technologies to convert agricultural waste, invasive species, and municipal organics into high-quality biochar: a stable carbon sink with a permanence horizon measured in centuries.',
    'The challenge of biochar at scale has never been the science. It has been the logistics: securing feedstock supply, building reliable transport and processing chains, navigating local procurement structures, training operational teams, and establishing durable buyer relationships. We have spent years solving these constraints in the field, and the infrastructure we have built is replicable.',
    'Every project in the portfolio generates revenue from three sources: waste processing contracts, biochar product sales, and verified carbon removal credits. Operations are capitalized through project-level debt facilities, forward carbon offtake agreements, and strategic equity partnerships with regional industrial groups.',
  ],
  capabilities: [
    {
      title: 'Biomass Sourcing and Logistics',
      description:
        'In-country procurement relationships and supply-chain infrastructure for consistent feedstock at scale, designed to transfer into new geographies with minimal adaptation.',
    },
    {
      title: 'Pyrolysis Operations',
      description:
        'Mobile and fixed-kiln production systems validated in field conditions, each matched to distinct feedstock profiles and throughput requirements.',
    },
    {
      title: 'Carbon Monitoring and Verification',
      description:
        'Integrated measurement, reporting, and verification workflows for issuing high-integrity carbon removal credits.',
    },
    {
      title: 'Offtake and Market Access',
      description:
        'Established channels with biochar buyers, carbon credit purchasers, and government procurement authorities across active regions.',
    },
  ],
};

export const commercialModel = {
  label: 'Commercial Model',
  title: 'Three revenue streams from a single operational process.',
  intro:
    'Each project generates income through production, offtake, and procurement. These are parallel revenue lines from the same physical operations, not separate business units.',
  lines: [
    {
      phase: 'Production',
      title: 'Biomass-to-biochar conversion',
      description:
        'Fixed and mobile pyrolysis systems process agricultural waste, invasive species, and municipal organics into high-quality biochar. Throughput is configurable to local feedstock availability and market demand.',
      revenue: ['Biochar product sales', 'Agricultural amendments', 'Energy co-products'],
    },
    {
      phase: 'Offtake',
      title: 'Carbon removal credits',
      description:
        'Each production run generates verified, durable carbon removal credits backed by physical biochar output and third-party monitoring. Forward offtake agreements provide revenue visibility and pre-capitalize new deployments.',
      revenue: ['Spot carbon sales', 'Forward offtake agreements'],
    },
    {
      phase: 'Procurement',
      title: 'Waste processing contracts',
      description:
        'Municipal and industrial operators pay for waste diversion and processing. Government tenders and contracted waste infrastructure create recurring revenue independent of carbon market pricing.',
      revenue: ['Government tenders', 'Municipal contracts', 'Industrial waste fees'],
    },
  ],
};

export const technology = {
  label: 'Technology',
  title: 'Two validated kiln platforms, optimized for distinct operating contexts.',
  intro:
    'Technology selection is driven by feedstock characteristics, throughput requirements, and deployment constraints in each region.',
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
    'Each new region leverages shared technology, carbon infrastructure, and institutional knowledge while adapting to local feedstock, policy, and buyer conditions.',
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
      'The operating model and supply chain infrastructure are being assessed for deployment in additional markets where feedstock availability, carbon market access, and local partnerships align.',
    regions: ['Pakistan', 'MENA', 'Sub-Saharan Africa'],
  },
};

export const impact = {
  label: 'Impact',
  title: 'Measurable outcomes across carbon, employment, and waste diversion.',
  intro: 'Every metric is tied to operational output. We report what we can verify.',
  narrative: [
    'Carbon removal that cannot demonstrate permanence, additionality, and co-benefits will not survive increasing buyer scrutiny. Every tonne of biochar we produce is traceable to a specific production run and aligned with third-party verification.',
    'Carbon is only one dimension of what our projects deliver. In Kenya, operations create employment in communities where the economics are transformative. In Saudi Arabia, waste is diverted from landfill while generating value for national infrastructure. These co-benefits are part of the commercial model, not incidental to it.',
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
    'The company has spent years building the operational infrastructure that makes biochar work at scale in challenging environments.',
  narrative: [
    'Biomass Resource Group is built on the conviction that durable carbon removal will come from operational infrastructure deployed where waste biomass is abundant, labor markets are underserved, and the economics of conversion are viable.',
    'The team operates on the ground in East Africa and the Middle East. It has built logistics networks, trained local teams, negotiated contracts, and navigated the complexity of operating across jurisdictions. That operating depth is the differentiator.',
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
    'We partner with institutional investors, carbon credit buyers, government procurement authorities, and waste-management operators.',
  audiences: [
    {
      audience: 'Investors',
      title: 'Deploy capital into physical carbon removal infrastructure',
      description:
        'Equity and project-level investment opportunities in biochar production infrastructure across operating and pipeline regions.',
      href: 'mailto:invest@biomassresourcegroup.io',
      action: 'Investor inquiries',
    },
    {
      audience: 'Carbon Buyers',
      title: 'Purchase high-permanence carbon removal credits',
      description:
        'Verified biochar carbon removal credits with 100+ year permanence, backed by physical production and third-party monitoring.',
      href: 'mailto:carbon@biomassresourcegroup.io',
      action: 'Buy carbon removal',
    },
    {
      audience: 'Governments and Operators',
      title: 'Partner on waste processing and biochar infrastructure',
      description:
        'Contract waste processing, biogas co-production, and biochar supply for municipalities, water authorities, and industrial operators.',
      href: 'mailto:partnerships@biomassresourcegroup.io',
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
