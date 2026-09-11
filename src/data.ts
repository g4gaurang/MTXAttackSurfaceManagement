export type Priority = 'Critical review' | 'High priority' | 'Elevated' | 'Standard review' | 'Informational'
export type Ownership = 'Confirmed' | 'Under review' | 'Unassociated' | 'Third-party'

export type Asset = {
  id: string
  name: string
  type: string
  ownership: Ownership
  businessUnit: string
  environment: string
  firstObserved: string
  lastObserved: string
  priority: Priority
  findings: number
  change: string
  owner: string
  address: string
  technologies: string[]
  evidence: string[]
}

export const challenges = [
  {
    title: 'Incomplete asset inventory',
    challenge: 'Internet-facing assets may be created outside established inventory and change-management processes.',
    response: 'Use authorized outside-in discovery to identify observable assets and compare them with confirmed inventory.',
    evidence: 'DNS relationships, certificates, hosting context, and externally reachable services.',
    context: 'CMDB records, application portfolios, and owner confirmation.',
    measure: 'Observed assets awaiting inventory reconciliation',
  },
  {
    title: 'Unclear asset ownership',
    challenge: 'Security teams may identify an exposed service without knowing which application team, vendor, or business unit owns it.',
    response: 'Support attribution research, ownership review, evidence collection, assignment, and validation.',
    evidence: 'Domain relationships, certificate subjects, registration context, and linked applications.',
    context: 'Business ownership, procurement records, and application records.',
    measure: 'Median time to an ownership decision',
  },
  {
    title: 'Cloud and application sprawl',
    challenge: 'Short-term environments, project portals, test systems, acquisitions, and vendor-hosted services can expand the external footprint.',
    response: 'Monitor changes in externally observable infrastructure and highlight assets requiring review.',
    evidence: 'New hostnames, hosting changes, certificates, and public application metadata.',
    context: 'Cloud account, environment, project, and lifecycle status.',
    measure: 'New or changed assets reviewed by disposition',
  },
  {
    title: 'Findings without business context',
    challenge: 'A large list of exposed assets provides limited guidance about which items matter most.',
    response: 'Combine observable exposure with ownership, criticality, data sensitivity, exploitability evidence, control coverage, and remediation status where those inputs are available.',
    evidence: 'Reachability, service type, technology indicators, and observed security conditions.',
    context: 'Criticality, sensitivity, controls, and supported exploitability evidence.',
    measure: 'Priority findings with validated business context',
  },
  {
    title: 'Slow remediation coordination',
    challenge: 'Findings may move through email and spreadsheets before reaching the responsible team.',
    response: 'Assign findings, establish due dates, connect tickets, track exceptions, and preserve remediation history.',
    evidence: 'Finding observation, asset relationship, and reassessment history.',
    context: 'Accountable owner, service target, exception authority, and ticket status.',
    measure: 'Assigned findings by workflow status and age',
  },
  {
    title: 'Surface changes after remediation',
    challenge: 'New endpoints and configuration changes can reintroduce exposure.',
    response: 'Perform scheduled reassessment and record whether the observed condition remains, changes, or is no longer visible.',
    evidence: 'Current observation compared with prior authorized assessments.',
    context: 'Change records, remediation evidence, and accepted residual exposure.',
    measure: 'Findings reopened after reassessment',
  },
]

export const lifecycle = [
  {
    name: 'Discover',
    description: 'Collect externally observable evidence within written authorization and approved scanning rules.',
    items: ['Seed and related domains', 'Subdomains and IP addresses', 'Cloud endpoints', 'Web applications and APIs', 'Certificates', 'Exposed services', 'External relationships'],
  },
  {
    name: 'Validate',
    description: 'Review attribution evidence before a discovered asset enters confirmed inventory.',
    items: ['Ownership evidence', 'Business-unit review', 'Application owner', 'Hosting provider', 'Environment classification', 'Confidence level', 'Disposition'],
  },
  {
    name: 'Assess',
    description: 'Evaluate observable conditions alongside business and security context when available.',
    items: ['Internet exposure', 'Security condition', 'Service type', 'Certificate condition', 'Technology information', 'Criticality', 'Sensitivity', 'Exploitability evidence', 'Controls', 'Potential impact'],
  },
  {
    name: 'Remediate',
    description: 'Move reviewed findings into accountable workflows without replacing ticketing systems.',
    items: ['Assigned owner', 'Recommended action', 'Ticket status', 'Due date', 'Exception request', 'Compensating control', 'Validation evidence', 'Escalation status'],
  },
  {
    name: 'Verify',
    description: 'Reassess the observation and preserve evidence for closure or reopening decisions.',
    items: ['Reassessment', 'Current observation', 'Remediation evidence', 'Residual exposure', 'Closure review', 'Reopened finding', 'Change history', 'Reporting'],
  },
]

export const assets: Asset[] = [
  {
    id: 'AST-1042',
    name: 'citizen.northstar-services.example',
    type: 'Web application',
    ownership: 'Confirmed',
    businessUnit: 'Citizen Services',
    environment: 'Production',
    firstObserved: '2026-05-14',
    lastObserved: '2026-09-10',
    priority: 'Elevated',
    findings: 1,
    change: 'Certificate changed',
    owner: 'Maya Chen',
    address: '192.0.2.18',
    technologies: ['HTTPS', 'Content delivery', 'Web application'],
    evidence: ['Matches approved root domain', 'Owner confirmed on 2026-05-17', 'Application record APP-204 linked'],
  },
  {
    id: 'AST-1047',
    name: 'permits.northstar-services.example',
    type: 'Web application',
    ownership: 'Confirmed',
    businessUnit: 'Permitting',
    environment: 'Production',
    firstObserved: '2026-05-16',
    lastObserved: '2026-09-10',
    priority: 'Standard review',
    findings: 0,
    change: 'No material change',
    owner: 'Leo Hart',
    address: '192.0.2.32',
    technologies: ['HTTPS', 'Web portal'],
    evidence: ['Certificate relationship', 'CMDB match from configured integration', 'Owner confirmation recorded'],
  },
  {
    id: 'AST-1051',
    name: 'api.northstar-services.example',
    type: 'API',
    ownership: 'Under review',
    businessUnit: 'Digital Platform',
    environment: 'Unknown',
    firstObserved: '2026-08-21',
    lastObserved: '2026-09-10',
    priority: 'High priority',
    findings: 2,
    change: 'New service observed',
    owner: 'Unassigned',
    address: '198.51.100.44',
    technologies: ['HTTPS', 'API indicator'],
    evidence: ['DNS relationship to approved root', 'Certificate includes related hostname', 'No confirmed inventory match'],
  },
  {
    id: 'AST-1055',
    name: 'legacy-portal.northstar-services.example',
    type: 'Web application',
    ownership: 'Under review',
    businessUnit: 'Unknown',
    environment: 'Unknown',
    firstObserved: '2026-07-02',
    lastObserved: '2026-09-09',
    priority: 'Critical review',
    findings: 2,
    change: 'Service became reachable',
    owner: 'Attribution queue',
    address: '203.0.113.81',
    technologies: ['HTTPS', 'Administrative path indicator'],
    evidence: ['Subdomain of approved root', 'Older certificate lineage', 'Purpose and owner not confirmed'],
  },
  {
    id: 'AST-1060',
    name: 'files.northstar-services.example',
    type: 'Cloud endpoint',
    ownership: 'Confirmed',
    businessUnit: 'Shared Services',
    environment: 'Production',
    firstObserved: '2026-06-11',
    lastObserved: '2026-09-10',
    priority: 'Elevated',
    findings: 1,
    change: 'Hosting context changed',
    owner: 'Avery Singh',
    address: '198.51.100.90',
    technologies: ['HTTPS', 'File transfer indicator'],
    evidence: ['Approved domain relationship', 'Cloud inventory match', 'Service owner confirmed'],
  },
  {
    id: 'AST-1064',
    name: 'vendor-access.example',
    type: 'Third-party service',
    ownership: 'Third-party',
    businessUnit: 'Procurement',
    environment: 'Vendor hosted',
    firstObserved: '2026-06-23',
    lastObserved: '2026-09-10',
    priority: 'Standard review',
    findings: 1,
    change: 'Certificate nearing expiry',
    owner: 'Vendor Management',
    address: '203.0.113.119',
    technologies: ['HTTPS', 'Federated access indicator'],
    evidence: ['Linked from confirmed portal', 'Procurement record matched', 'Third-party disposition recorded'],
  },
  {
    id: 'AST-1068',
    name: 'test-api.example',
    type: 'API',
    ownership: 'Unassociated',
    businessUnit: 'Unknown',
    environment: 'Test indicator',
    firstObserved: '2026-09-01',
    lastObserved: '2026-09-08',
    priority: 'Informational',
    findings: 0,
    change: 'No longer observed',
    owner: 'Unassigned',
    address: '192.0.2.201',
    technologies: ['HTTPS', 'API indicator'],
    evidence: ['Shared hosting context', 'No approved-domain link', 'Association rejected pending new evidence'],
  },
  {
    id: 'AST-1072',
    name: 'status.northstar-services.example',
    type: 'Digital service',
    ownership: 'Confirmed',
    businessUnit: 'IT Operations',
    environment: 'Production',
    firstObserved: '2026-08-02',
    lastObserved: '2026-09-10',
    priority: 'Standard review',
    findings: 0,
    change: 'Newly confirmed',
    owner: 'Jordan Bell',
    address: '203.0.113.14',
    technologies: ['HTTPS', 'Status application'],
    evidence: ['Approved root-domain relationship', 'Application portfolio match', 'Owner confirmed'],
  },
]

export const findings = [
  {
    title: 'Forgotten public portal',
    observation: 'An older portal remains internet-accessible after the related program changed.',
    unknown: 'Current business purpose, data handling, and intended access model remain unconfirmed.',
    review: 'The service is reachable and its ownership is under review.',
    context: 'May relate to a retired citizen-services program.',
    next: 'Confirm ownership and intended availability before selecting a response.',
    team: 'Attribution queue',
    status: 'Validating',
  },
  {
    title: 'Exposed administrative interface',
    observation: 'A management-interface pattern is externally reachable.',
    unknown: 'Access controls, intended audience, and owner require validation.',
    review: 'Administrative interfaces can carry elevated potential impact when access controls are weak.',
    context: 'Business criticality is not yet available.',
    next: 'Request owner review and validate access-control evidence.',
    team: 'Application Security',
    status: 'Assigned',
  },
  {
    title: 'Certificate issue',
    observation: 'A third-party service certificate is nearing expiration.',
    unknown: 'The vendor renewal plan is not recorded in this illustrative workspace.',
    review: 'Expiration could affect service availability if no renewal occurs.',
    context: 'Supports a procurement access workflow.',
    next: 'Contact the service owner and vendor manager.',
    team: 'Vendor Management',
    status: 'In progress',
  },
  {
    title: 'Unexpected network service',
    observation: 'A service became reachable on a documentation-range address.',
    unknown: 'Purpose, authorization, and control configuration remain unconfirmed.',
    review: 'The change differs from the prior observation and warrants owner review.',
    context: 'Potential relationship to the digital platform team.',
    next: 'Validate association and compare with approved service records.',
    team: 'Network Security',
    status: 'New',
  },
  {
    title: 'Untracked cloud endpoint',
    observation: 'A cloud-hosted endpoint appears related through certificate and DNS evidence.',
    unknown: 'Cloud account, environment, and accountable owner are not confirmed.',
    review: 'The endpoint is absent from the confirmed illustrative inventory.',
    context: 'May support an API integration.',
    next: 'Reconcile with configured cloud inventory and request ownership review.',
    team: 'Cloud Security',
    status: 'Awaiting evidence',
  },
  {
    title: 'Public development environment',
    observation: 'A hostname and application metadata indicate a possible test environment.',
    unknown: 'Association, data content, and intended reachability remain unknown.',
    review: 'Externally accessible development systems require validation against policy.',
    context: 'No internal project context is currently linked.',
    next: 'Collect more attribution evidence before assignment.',
    team: 'Attribution queue',
    status: 'Validating',
  },
  {
    title: 'Third-party service dependency',
    observation: 'A confirmed portal links to an externally hosted service.',
    unknown: 'Vendor control status requires context from vendor management.',
    review: 'The dependency supports an enterprise function and should have accountable oversight.',
    context: 'Procurement record is linked in this illustrative scenario.',
    next: 'Review vendor ownership, service criticality, and exception status.',
    team: 'Third-Party Risk',
    status: 'Assigned',
  },
]

export const discoverySources = [
  ['DNS relationships', 'Related names and infrastructure patterns.', 'Ownership, business purpose, or authorization.', 'Connects candidate assets for analyst investigation.'],
  ['Certificate information', 'Hostnames, validity windows, and certificate relationships.', 'Asset ownership or whether a service is approved.', 'Supports relationship evidence and certificate-condition review.'],
  ['Registration and hosting context', 'Registration patterns, network ranges, and hosting changes.', 'The responsible internal team or data sensitivity.', 'Adds attribution context without proving association.'],
  ['Externally reachable services', 'Observable service types and changes in reachability.', 'Whether the service is vulnerable or intentionally exposed.', 'Supports exposure review and reassessment.'],
  ['Web application metadata', 'Page titles, headers, and public technology indicators.', 'Application purpose, owner, or internal data flows.', 'Helps classify candidate applications and portals.'],
  ['Cloud and content-delivery indicators', 'Hosting and delivery patterns visible from the internet.', 'Cloud account, tenant, configuration, or workload owner.', 'Guides reconciliation with configured cloud sources.'],
  ['Approved threat intelligence', 'Relevant external context from approved sources.', 'Exploitability of a specific observation without supporting evidence.', 'Adds review context under established data-use rules.'],
  ['Configured internal integrations', 'Inventory, owner, criticality, ticket, or control context.', 'Accuracy beyond the connected source and its update cadence.', 'Reconciles outside-in observations with enterprise records.'],
]

export const timeline = [
  ['Sep 10', 'Exposure no longer observed', 'citizen.northstar-services.example', 'Elevated', 'Remediation'],
  ['Sep 09', 'Finding reopened after reassessment', 'legacy-portal.northstar-services.example', 'Critical review', 'Finding'],
  ['Sep 07', 'Remediation recorded', 'files.northstar-services.example', 'Elevated', 'Remediation'],
  ['Sep 04', 'Finding assigned', 'api.northstar-services.example', 'High priority', 'Finding'],
  ['Aug 30', 'Asset ownership confirmed', 'status.northstar-services.example', 'Standard review', 'Ownership'],
  ['Aug 27', 'Service became reachable', 'legacy-portal.northstar-services.example', 'Critical review', 'Exposure'],
  ['Aug 21', 'New subdomain first observed', 'api.northstar-services.example', 'High priority', 'Discovery'],
  ['Aug 18', 'Hosting provider changed', 'files.northstar-services.example', 'Elevated', 'Hosting'],
  ['Aug 12', 'Certificate changed', 'citizen.northstar-services.example', 'Standard review', 'Certificate'],
]

export const roleViews = {
  CISO: ['External-footprint trends', 'Priority exposure', 'Unknown ownership', 'Aging findings', 'Business-unit accountability', 'Remediation progress'],
  'Attack-surface analyst': ['New discoveries', 'Attribution evidence', 'Asset relationships', 'Exposure findings', 'Change history', 'Validation queue'],
  'Vulnerability-management lead': ['Priority findings', 'Asset context', 'Remediation status', 'Exceptions', 'Verification results', 'Aging trends'],
  'Cloud-security lead': ['Cloud endpoints', 'Untracked environments', 'Public services', 'Ownership status', 'Configuration indicators', 'Account context from approved integrations'],
  'Application owner': ['Assigned assets', 'Open findings', 'Supporting evidence', 'Due dates', 'Exception process', 'Verification status'],
  'Risk and oversight leader': ['Ownership coverage', 'Finding trends', 'Exceptions', 'Remediation performance', 'Audit history', 'Policy measures'],
}

export const chartData = [
  { name: 'Domains', observed: 42, confirmed: 31 },
  { name: 'Services', observed: 28, confirmed: 19 },
  { name: 'Cloud', observed: 24, confirmed: 14 },
  { name: 'Web apps', observed: 18, confirmed: 15 },
  { name: 'APIs', observed: 12, confirmed: 7 },
  { name: 'Certificates', observed: 35, confirmed: 27 },
]
