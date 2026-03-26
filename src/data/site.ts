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
  { label: 'Economics', href: '#model' },
  { label: 'Markets', href: '#regions' },
  { label: 'Activity', href: '#updates' },
  { label: 'Contact', href: '#contact', primary: true },
] as const;

export const hero = {
  label: 'Biochar Carbon Removal Infrastructure',
  lead: 'Waste biomass into',
  emphasis: 'carbon removal assets',
  tail: '.',
  summary:
    'BRG builds and operates owner-led biochar systems that earn from waste processing, biochar product sales, and verified carbon removal credits.',
  primaryAction: {
    label: 'Start a conversation',
    href: '#contact',
  },
  secondaryAction: {
    label: 'See latest activity',
    href: '#updates',
  },
  metrics: [
    { value: '2', label: 'Active operating markets' },
    { value: '3', label: 'Revenue streams per asset' },
    { value: '100+', label: 'Years of carbon durability' },
    { value: '5', label: 'Country pipeline' },
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
  title: 'One operating platform from feedstock to offtake.',
  intro:
    'BRG controls sourcing, conversion, monitoring, and market access so each project launches on the same repeatable operating backbone.',
  narrative: [
    'BRG converts agricultural waste, invasive species, and municipal organics into durable biochar through an operating system designed for difficult markets.',
    'The moat is not a single kiln. It is the field layer: feedstock contracts, logistics, local teams, verification workflows, and buyer relationships that hold up under real operating conditions.',
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
  title: 'Each asset earns from waste, product, and carbon.',
  intro:
    'The same operating loop monetizes feedstock processing, biochar output, and carbon removal credits.',
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
      phase: 'Procurement',
      title: 'Waste processing contracts',
      description:
        'Municipal and industrial operators pay for waste diversion, creating recurring revenue independent of carbon pricing.',
      revenue: ['Government tenders', 'Municipal contracts', 'Industrial waste fees'],
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
  title: 'Two active operating markets with a wider pipeline underway.',
  intro:
    'Each region runs on the same backbone while adapting to local feedstock, policy, and buyer conditions.',
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
  label: 'Why BRG',
  title: 'Operational proof, not speculative narrative.',
  intro: 'Every metric is tied to production, permanence, or market execution. We report only what we can verify.',
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
  label: 'Contact',
  title: 'Start a partnership conversation with BRG.',
  intro:
    'Pick the fastest route to the right BRG team for capital, offtake, or operating partnerships.',
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
