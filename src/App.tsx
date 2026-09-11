import { FormEvent, useMemo, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowUp,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  FileCheck2,
  Fingerprint,
  Globe2,
  ListFilter,
  LockKeyhole,
  Menu,
  Network,
  PanelRightOpen,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  UserCheck,
  Workflow,
  X,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  assets,
  challenges,
  chartData,
  discoverySources,
  findings,
  lifecycle,
  roleViews,
  timeline,
  type Asset,
  type Priority,
} from './data'
import './styles.css'

const priorityClass = (priority: string) => `pill priority-${priority.toLowerCase().replaceAll(' ', '-')}`
const ownershipClass = (ownership: string) => `pill ownership-${ownership.toLowerCase().replaceAll(' ', '-')}`

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <header className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </header>
  )
}

function Label() {
  return <span className="illustrative-label">Illustrative product data</span>
}

function Header() {
  const [open, setOpen] = useState(false)
  const links = [
    ['Overview', 'overview'],
    ['Discovery', 'discovery'],
    ['Asset Inventory', 'inventory'],
    ['Prioritization', 'prioritization'],
    ['Remediation', 'remediation'],
    ['Integrations', 'integrations'],
    ['Governance', 'governance'],
  ]
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="MTX Attack Surface Management home">
        <span className="brand-mark" aria-hidden="true"><Radar size={20} /></span>
        <span><strong>MTX</strong><small>Attack Surface Management</small></span>
      </a>
      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
        <span className="sr-only">Toggle navigation</span>
      </button>
      <nav id="primary-navigation" className={open ? 'nav-open' : ''} aria-label="Primary navigation">
        {links.map(([label, id]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a className="button button-small" href="#contact" onClick={() => setOpen(false)}>Request a Demo</a>
      </nav>
    </header>
  )
}

function HeroWorkspace() {
  const [view, setView] = useState<'surface' | 'exposure'>('surface')
  const metrics = view === 'surface'
    ? [
        ['Discovered assets', '159', '+8 this cadence'],
        ['Confirmed assets', '116', '73% reviewed'],
        ['Ownership under review', '29', '6 assigned today'],
        ['External dependencies', '14', '3 need context'],
      ]
    : [
        ['New exposures', '11', 'Since prior review'],
        ['Priority findings', '7', '2 critical review'],
        ['In remediation', '18', 'Across 5 teams'],
        ['Ready for verification', '4', 'Evidence received'],
      ]
  return (
    <div className="hero-workspace" aria-label="Illustrative MTX ASM interface">
      <div className="workspace-bar">
        <div><span className="status-dot" /> Illustrative MTX ASM interface</div>
        <span>Updated by configured cadence</span>
      </div>
      <div className="segmented" role="tablist" aria-label="Interface view">
        <button role="tab" aria-selected={view === 'surface'} onClick={() => setView('surface')}>Surface</button>
        <button role="tab" aria-selected={view === 'exposure'} onClick={() => setView('exposure')}>Exposure</button>
      </div>
      <div className="metric-grid">
        {metrics.map(([label, value, note]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{note}</small>
          </article>
        ))}
      </div>
      <div className="surface-preview">
        <div className="preview-header">
          <span>Surface changes</span>
          <span className="pill ownership-under-review">Review queue</span>
        </div>
        <svg viewBox="0 0 580 180" role="img" aria-labelledby="hero-map-title hero-map-desc">
          <title id="hero-map-title">Sample external asset relationship preview</title>
          <desc id="hero-map-desc">A confirmed root domain connects to applications, an API under review, a cloud endpoint, and a third-party dependency.</desc>
          <g className="preview-lines">
            <path d="M90 90 L225 38 M90 90 L225 90 M90 90 L225 142 M225 90 L380 60 M225 90 L380 125 M380 125 L520 125" />
          </g>
          <g className="preview-nodes">
            <circle cx="90" cy="90" r="30" className="node-root" />
            <circle cx="225" cy="38" r="18" className="node-confirmed" />
            <circle cx="225" cy="90" r="22" className="node-review" />
            <circle cx="225" cy="142" r="18" className="node-confirmed" />
            <circle cx="380" cy="60" r="18" className="node-elevated" />
            <circle cx="380" cy="125" r="22" className="node-review" />
            <circle cx="520" cy="125" r="18" className="node-third" />
          </g>
        </svg>
        <div className="surface-legend">
          <span><i className="legend-confirmed" /> Confirmed</span>
          <span><i className="legend-review" /> Requires validation</span>
          <span><i className="legend-elevated" /> Elevated exposure</span>
        </div>
      </div>
      <Label />
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" id="overview">
      <div className="hero-copy">
        <p className="eyebrow">External Attack Surface Management</p>
        <h1>Find what is exposed before it becomes an overlooked risk</h1>
        <p className="hero-lead">Discover internet-facing assets, validate ownership, assess observable exposure, and coordinate remediation through a workspace updated according to configured scan cadence.</p>
        <p>MTX Attack Surface Management provides an outside-in view of domains, cloud endpoints, web applications, APIs, certificates, and exposed services that may be connected to the organization. The platform combines discovery with ownership validation, risk context, remediation workflows, and verification.</p>
        <div className="button-row">
          <a className="button" href="#surface-map">Explore the Attack Surface <ArrowRight size={17} /></a>
          <a className="button button-secondary" href="#prioritization">Open the Exposure Workspace</a>
          <a className="text-link" href="#contact">Request a Product Demonstration <ChevronRight size={16} /></a>
        </div>
        <p className="scope-note"><ShieldCheck size={17} /> Based on authorized outside-in discovery. Ownership requires validation.</p>
      </div>
      <HeroWorkspace />
    </section>
  )
}

function Scope() {
  const measures = [
    ['6', 'asset categories', 'Domains, networks, cloud, web, APIs, certificates'],
    ['5', 'operating stages', 'Discover, validate, assess, remediate, verify'],
    ['3', 'ownership states', 'Confirmed, under review, unassociated'],
    ['1', 'connected exposure view', 'Discovery, context, workflow, and change'],
  ]
  return (
    <section className="scope-strip" aria-labelledby="scope-title">
      <div>
        <p className="eyebrow">Platform scope</p>
        <h2 id="scope-title">A defined outside-in operating model</h2>
      </div>
      <div className="scope-measures">
        {measures.map(([value, label, detail]) => (
          <article key={label}>
            <strong>{value}</strong>
            <div><b>{label}</b><small>{detail}</small></div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Challenges() {
  const [active, setActive] = useState(0)
  const item = challenges[active]
  return (
    <section className="section light" id="challenges">
      <SectionHeading
        eyebrow="Security operations"
        title="Turn external uncertainty into structured review"
        description="Select a challenge to see how the product supports evidence collection, context, and accountable action."
      />
      <div className="challenge-layout">
        <div className="challenge-list" role="tablist" aria-label="Attack-surface challenges">
          {challenges.map((challenge, index) => (
            <button key={challenge.title} role="tab" aria-selected={active === index} onClick={() => setActive(index)}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {challenge.title}
              <ChevronRight size={18} />
            </button>
          ))}
        </div>
        <article className="response-panel" role="tabpanel">
          <div className="panel-kicker"><Sparkles size={16} /> MTX product response</div>
          <h3>{item.title}</h3>
          <dl className="detail-list">
            <div><dt>Why it matters</dt><dd>{item.challenge}</dd></div>
            <div><dt>Observable evidence</dt><dd>{item.evidence}</dd></div>
            <div><dt>Context required</dt><dd>{item.context}</dd></div>
            <div><dt>MTX capability</dt><dd>{item.response}</dd></div>
            <div><dt>Suggested measure</dt><dd>{item.measure}</dd></div>
          </dl>
        </article>
      </div>
    </section>
  )
}

function Lifecycle() {
  const [active, setActive] = useState(0)
  return (
    <section className="section dark" id="discovery">
      <SectionHeading
        eyebrow="Operating lifecycle"
        title="Move from observation to verified action"
        description="The lifecycle keeps discovery evidence distinct from confirmed ownership and remediation records."
      />
      <div className="lifecycle-tabs" role="tablist" aria-label="Operating lifecycle">
        {lifecycle.map((stage, index) => (
          <button key={stage.name} role="tab" aria-selected={active === index} onClick={() => setActive(index)}>
            <span>{index + 1}</span>{stage.name}
          </button>
        ))}
      </div>
      <div className="lifecycle-workspace" role="tabpanel">
        <div>
          <p className="eyebrow">Stage {active + 1}</p>
          <h3>{lifecycle[active].name}</h3>
          <p>{lifecycle[active].description}</p>
          {active === 0 && <p className="callout"><LockKeyhole size={18} /> Discovery operates only within authorized scope and approved scanning rules.</p>}
          {active === 1 && <p className="callout">Possible dispositions include confirmed enterprise asset, likely associated, ownership under review, third-party dependency, unrelated asset, and approved exception.</p>}
          {active === 2 && <p className="callout"><AlertTriangle size={18} /> A finding is not described as exploitable without supporting evidence.</p>}
        </div>
        <div className="stage-interface">
          <div className="stage-interface-head"><Workflow size={20} /><span>{lifecycle[active].name} workspace</span><Label /></div>
          <ul className="check-grid">
            {lifecycle[active].items.map((item, index) => (
              <li key={item}><span>{index + 1}</span>{item}<Check size={16} /></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

const mapPositions: Record<string, [number, number]> = {
  'AST-1042': [285, 80],
  'AST-1047': [285, 170],
  'AST-1051': [470, 80],
  'AST-1055': [470, 170],
  'AST-1060': [285, 260],
  'AST-1064': [660, 170],
  'AST-1068': [660, 260],
  'AST-1072': [470, 260],
}

function AssetMap() {
  const [type, setType] = useState('Any')
  const [ownership, setOwnership] = useState('Any')
  const [priority, setPriority] = useState('Any')
  const [selected, setSelected] = useState<Asset>(assets[2])
  const [owner, setOwner] = useState(assets[2].owner)
  const [panel, setPanel] = useState<'evidence' | 'history' | 'finding'>('evidence')
  const visible = assets.filter((asset) =>
    (type === 'Any' || asset.type === type) &&
    (ownership === 'Any' || asset.ownership === ownership) &&
    (priority === 'Any' || asset.priority === priority)
  )
  return (
    <section className="section light" id="surface-map">
      <SectionHeading
        eyebrow="Relationship intelligence"
        title="Investigate the observable attack surface"
        description="Filter a fictional relationship map, select an asset, inspect evidence, and record a local workflow decision."
      />
      <div className="map-toolbar" aria-label="Asset map filters">
        <label>Asset type<select value={type} onChange={(event) => setType(event.target.value)}>
          <option>Any</option>{[...new Set(assets.map((item) => item.type))].map((value) => <option key={value}>{value}</option>)}
        </select></label>
        <label>Ownership<select value={ownership} onChange={(event) => setOwnership(event.target.value)}>
          <option>Any</option><option>Confirmed</option><option>Under review</option><option>Unassociated</option><option>Third-party</option>
        </select></label>
        <label>Priority<select value={priority} onChange={(event) => setPriority(event.target.value)}>
          <option>Any</option><option>Critical review</option><option>High priority</option><option>Elevated</option><option>Standard review</option><option>Informational</option>
        </select></label>
        <button className="button button-secondary button-small" onClick={() => { setType('Any'); setOwnership('Any'); setPriority('Any') }}>Reset filters</button>
      </div>
      <div className="map-layout">
        <div className="map-canvas">
          <svg viewBox="0 0 760 340" role="img" aria-labelledby="map-title map-description">
            <title id="map-title">Fictional asset relationship map</title>
            <desc id="map-description">The root domain northstar-services.example connects to selected subdomains, applications, APIs, cloud endpoints, documentation IP addresses, and third-party services. Use the table following the map for a text alternative.</desc>
            <g className="map-links">
              {visible.map((asset) => {
                const [x, y] = mapPositions[asset.id]
                return <line key={asset.id} x1="105" y1="170" x2={x} y2={y} />
              })}
            </g>
            <g>
              <circle cx="105" cy="170" r="55" className="map-root" />
              <text x="105" y="160" textAnchor="middle">Root domain</text>
              <text x="105" y="180" textAnchor="middle">northstar-services</text>
              <text x="105" y="198" textAnchor="middle">.example</text>
            </g>
            {visible.map((asset) => {
              const [x, y] = mapPositions[asset.id]
              return (
                <g
                  key={asset.id}
                  className={`map-node ${selected.id === asset.id ? 'selected' : ''}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${asset.name}, ${asset.type}, ${asset.ownership}`}
                  onClick={() => { setSelected(asset); setOwner(asset.owner) }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      setSelected(asset)
                      setOwner(asset.owner)
                    }
                  }}
                >
                  <circle cx={x} cy={y} r="36" className={`map-${asset.ownership.toLowerCase().replaceAll(' ', '-')}`} />
                  <text x={x} y={y - 3} textAnchor="middle">{asset.type === 'Web application' ? 'Web app' : asset.type}</text>
                  <text x={x} y={y + 16} textAnchor="middle">{asset.id}</text>
                </g>
              )
            })}
          </svg>
          <div className="surface-legend" aria-label="Map legend">
            <span><i className="legend-confirmed" /> Confirmed</span>
            <span><i className="legend-review" /> Under review</span>
            <span><i className="legend-third" /> Third-party</span>
            <span><i className="legend-unassociated" /> Unassociated</span>
          </div>
        </div>
        <aside className="asset-inspector" aria-live="polite">
          <div><span className={ownershipClass(selected.ownership)}>{selected.ownership}</span><span className={priorityClass(selected.priority)}>{selected.priority}</span></div>
          <h3>{selected.name}</h3>
          <p>{selected.type} · {selected.address}</p>
          <div className="inspector-tabs" role="tablist">
            {(['evidence', 'history', 'finding'] as const).map((value) => (
              <button key={value} role="tab" aria-selected={panel === value} onClick={() => setPanel(value)}>{value}</button>
            ))}
          </div>
          {panel === 'evidence' && <ul>{selected.evidence.map((item) => <li key={item}>{item}</li>)}</ul>}
          {panel === 'history' && <ul><li>First observed {selected.firstObserved}</li><li>{selected.change}</li><li>Last observed {selected.lastObserved}</li></ul>}
          {panel === 'finding' && <div><strong>{selected.findings} open finding{selected.findings === 1 ? '' : 's'}</strong><p>Observations require review with asset context before a response is selected.</p></div>}
          <label>Fictional owner<select value={owner} onChange={(event) => setOwner(event.target.value)}>
            <option>Unassigned</option><option>Attribution queue</option><option>Maya Chen</option><option>Avery Singh</option><option>Cloud Security</option>
          </select></label>
          <button className="button button-small" onClick={() => setPanel('finding')}>Open related finding</button>
        </aside>
      </div>
      <details className="table-alternative">
        <summary>Open text alternative for the relationship map</summary>
        <div className="table-scroll">
          <table>
            <caption>Visible fictional assets and their relationship to northstar-services.example</caption>
            <thead><tr><th>Asset</th><th>Type</th><th>Relationship</th><th>Ownership</th><th>Priority</th></tr></thead>
            <tbody>{visible.map((asset) => <tr key={asset.id}><td>{asset.name}</td><td>{asset.type}</td><td>Observable relationship to root domain</td><td>{asset.ownership}</td><td>{asset.priority}</td></tr>)}</tbody>
          </table>
        </div>
      </details>
      <Label />
    </section>
  )
}

function DiscoverySources() {
  const [active, setActive] = useState(0)
  const source = discoverySources[active]
  return (
    <section className="section slate">
      <SectionHeading
        eyebrow="Discovery evidence"
        title="Build the external view from observable evidence"
        description="External observations can support an investigation, but they do not establish ownership, purpose, or internal sensitivity by themselves."
      />
      <div className="source-explorer">
        <div role="tablist" className="source-tabs" aria-label="Discovery source categories">
          {discoverySources.map((item, index) => (
            <button key={item[0]} role="tab" aria-selected={active === index} onClick={() => setActive(index)}>{item[0]}<ChevronRight size={17} /></button>
          ))}
        </div>
        <article role="tabpanel" className="source-panel">
          <p className="eyebrow">Evidence category</p><h3>{source[0]}</h3>
          <dl className="detail-list compact">
            <div><dt>What it may reveal</dt><dd>{source[1]}</dd></div>
            <div><dt>What it cannot confirm by itself</dt><dd>{source[2]}</dd></div>
            <div><dt>Why validation matters</dt><dd>Association remains a hypothesis until evidence is reviewed and an accountable party records a disposition.</dd></div>
            <div><dt>Investigation contribution</dt><dd>{source[3]}</dd></div>
          </dl>
        </article>
      </div>
    </section>
  )
}

function AssetDrawer({ asset, onClose }: { asset: Asset; onClose: () => void }) {
  return (
    <div className="drawer-backdrop" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose() }}>
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="asset-drawer-title">
        <button className="icon-button drawer-close" onClick={onClose} aria-label="Close asset details"><X /></button>
        <p className="eyebrow">Fictional asset record · {asset.id}</p>
        <h2 id="asset-drawer-title">{asset.name}</h2>
        <div className="drawer-pills"><span className={ownershipClass(asset.ownership)}>{asset.ownership}</span><span className={priorityClass(asset.priority)}>{asset.priority}</span></div>
        <section><h3>Asset summary</h3><p>{asset.type} observed at {asset.address}. Purpose and sensitivity depend on validated internal context.</p></section>
        <section><h3>Attribution evidence</h3><ul>{asset.evidence.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><h3>Related assets</h3><p>northstar-services.example · {asset.address} · sample certificate relationship</p></section>
        <section><h3>Observed technologies</h3><div className="tag-row">{asset.technologies.map((item) => <span key={item}>{item}</span>)}</div></section>
        <section><h3>Open findings</h3><p>{asset.findings} observation{asset.findings === 1 ? '' : 's'} currently requires review.</p></section>
        <section><h3>Change timeline</h3><p>{asset.firstObserved}: first observed<br />{asset.lastObserved}: {asset.change.toLowerCase()}</p></section>
        <section><h3>Ownership history</h3><p>Current status: {asset.ownership}. Assigned to {asset.owner}.</p></section>
        <section><h3>Remediation activity</h3><p>Local prototype activity only. No information leaves this browser.</p></section>
      </aside>
    </div>
  )
}

function Inventory() {
  const tabs = ['Newly discovered', 'Ownership review', 'Confirmed inventory', 'Third-party dependencies', 'Archived', 'Exceptions']
  const [tab, setTab] = useState('Newly discovered')
  const [query, setQuery] = useState('')
  const [priority, setPriority] = useState('Any')
  const [sort, setSort] = useState<'name' | 'lastObserved'>('lastObserved')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Asset | null>(null)
  const filtered = useMemo(() => {
    let result = assets.filter((asset) => asset.name.toLowerCase().includes(query.toLowerCase()) && (priority === 'Any' || asset.priority === priority))
    if (tab === 'Ownership review') result = result.filter((asset) => asset.ownership === 'Under review')
    if (tab === 'Confirmed inventory') result = result.filter((asset) => asset.ownership === 'Confirmed')
    if (tab === 'Third-party dependencies') result = result.filter((asset) => asset.ownership === 'Third-party')
    if (tab === 'Archived') result = result.filter((asset) => asset.change === 'No longer observed')
    if (tab === 'Exceptions') result = result.filter((asset) => asset.owner === 'Exception authority')
    return result.sort((a, b) => sort === 'name' ? a.name.localeCompare(b.name) : b.lastObserved.localeCompare(a.lastObserved))
  }, [query, priority, sort, tab])
  const pageSize = 5
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize)
  const updateTab = (value: string) => { setTab(value); setPage(1) }
  return (
    <section className="section light" id="inventory">
      <SectionHeading
        eyebrow="Asset inventory workspace"
        title="Reconcile discoveries with accountable inventory"
        description="Search, filter, and inspect fictional records. Externally observed assets remain distinct from confirmed inventory until validation."
      />
      <div className="inventory-shell">
        <div className="scroll-tabs" role="tablist" aria-label="Inventory views">
          {tabs.map((value) => <button key={value} role="tab" aria-selected={tab === value} onClick={() => updateTab(value)}>{value}</button>)}
        </div>
        <div className="inventory-tools">
          <label className="search-field"><Search size={18} /><span className="sr-only">Search assets</span><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} placeholder="Search fictional assets" /></label>
          <label><span className="sr-only">Filter by priority</span><select value={priority} onChange={(event) => { setPriority(event.target.value); setPage(1) }}><option>Any</option><option>Critical review</option><option>High priority</option><option>Elevated</option><option>Standard review</option><option>Informational</option></select></label>
          <label><span className="sr-only">Sort assets</span><select value={sort} onChange={(event) => setSort(event.target.value as 'name' | 'lastObserved')}><option value="lastObserved">Last observed</option><option value="name">Asset name</option></select></label>
        </div>
        <div className="table-scroll inventory-table">
          <table>
            <caption>Fictional asset inventory: {tab}</caption>
            <thead><tr><th>Asset name</th><th>Type</th><th>Ownership</th><th>Business unit</th><th>Environment</th><th>First observed</th><th>Last observed</th><th>Priority</th><th>Findings</th><th>Change</th><th>Assigned owner</th></tr></thead>
            <tbody>
              {visible.map((asset) => (
                <tr key={asset.id} onClick={() => setSelected(asset)}>
                  <td><button className="asset-link" onClick={() => setSelected(asset)}>{asset.name}<PanelRightOpen size={15} /></button></td>
                  <td>{asset.type}</td><td><span className={ownershipClass(asset.ownership)}>{asset.ownership}</span></td>
                  <td>{asset.businessUnit}</td><td>{asset.environment}</td><td>{asset.firstObserved}</td><td>{asset.lastObserved}</td>
                  <td><span className={priorityClass(asset.priority)}>{asset.priority}</span></td><td>{asset.findings}</td><td>{asset.change}</td><td>{asset.owner}</td>
                </tr>
              ))}
              {visible.length === 0 && <tr><td colSpan={11}>No fictional records match this view.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <span>{filtered.length} records · Page {page} of {pageCount}</span>
          <div><button disabled={page === 1} onClick={() => setPage((value) => value - 1)}>Previous</button><button disabled={page === pageCount} onClick={() => setPage((value) => value + 1)}>Next</button></div>
        </div>
      </div>
      <Label />
      {selected && <AssetDrawer asset={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

function OwnershipWorkflow() {
  const steps = ['Asset discovered', 'Attribution evidence collected', 'Potential owner suggested', 'Owner review requested', 'Ownership confirmed or rejected', 'Asset classified', 'Monitoring scope updated']
  const [current, setCurrent] = useState(3)
  const [decision, setDecision] = useState('Awaiting owner review')
  const [owner, setOwner] = useState('Unassigned')
  const decide = (value: string, stage = 4) => { setDecision(value); setCurrent(stage) }
  return (
    <section className="section ownership-section">
      <SectionHeading
        eyebrow="Ownership validation"
        title="Turn discovery into accountable inventory"
        description="Use confidence and supporting evidence to guide a human decision. Attribution support is not a definitive ownership decision."
      />
      <div className="validation-layout">
        <ol className="validation-steps">
          {steps.map((step, index) => (
            <li key={step} className={index < current ? 'done' : index === current ? 'active' : ''}>
              <span>{index < current ? <Check size={17} /> : index + 1}</span><div><b>{step}</b><small>{index < current ? 'Recorded' : index === current ? 'Current step' : 'Pending'}</small></div>
            </li>
          ))}
        </ol>
        <div className="validation-card">
          <div className="confidence"><span>Association confidence</span><strong>72% · Moderate</strong><div><i style={{ width: '72%' }} /></div><small>Indicator, not a definitive ownership decision</small></div>
          <h3>api.northstar-services.example</h3>
          <ul className="evidence-list"><li><CheckCircle2 /> DNS relationship to approved root</li><li><CheckCircle2 /> Certificate includes related hostname</li><li><CircleDot /> No confirmed inventory match</li></ul>
          <label>Potential business owner<select value={owner} onChange={(event) => setOwner(event.target.value)}><option>Unassigned</option><option>Digital Platform</option><option>Citizen Services</option><option>Integration Services</option></select></label>
          <div className="decision-status" aria-live="polite"><span>Local decision</span><strong>{decision}</strong>{owner !== 'Unassigned' && <small>Assigned to {owner}</small>}</div>
          <div className="action-grid">
            <button onClick={() => decide('Ownership confirmed', 5)}>Confirm ownership</button>
            <button onClick={() => decide('Association rejected', 5)}>Reject association</button>
            <button onClick={() => decide('Classified as third-party', 5)}>Mark as third-party</button>
            <button onClick={() => decide('More evidence requested', 1)}>Request more evidence</button>
            <button onClick={() => decide('Exception recorded', 6)}>Record an exception</button>
          </div>
        </div>
      </div>
      <Label />
    </section>
  )
}

function Prioritization() {
  const [controls, setControls] = useState(true)
  const [sensitivity, setSensitivity] = useState('Unknown')
  const factors = [
    ['External reachability', 'Observed', 'Externally reachable during the latest authorized assessment'],
    ['Observable condition', 'Review needed', 'Administrative-interface pattern requires access-control review'],
    ['Exploitability evidence', 'Not established', 'No supported exploitability evidence is linked'],
    ['Asset criticality', 'High', 'From configured application-portfolio context'],
    ['Data sensitivity', sensitivity, sensitivity === 'Unknown' ? 'Internal context has not been confirmed' : 'Selected for this local simulation'],
    ['Trust relationship', 'Elevated', 'Service may connect to a privileged workflow'],
    ['Compensating controls', controls ? 'Recorded' : 'Not recorded', controls ? 'Access gateway evidence is linked' : 'No control evidence is linked'],
    ['Ownership confidence', 'Moderate', 'Owner review remains open'],
    ['Exposure age', '34 days', 'Based on first and current observation'],
    ['Remediation status', 'Validating', 'Finding has not entered owner remediation'],
  ]
  return (
    <section className="section dark" id="prioritization">
      <SectionHeading
        eyebrow="Exposure prioritization"
        title="Explain why an observation deserves attention"
        description="Prioritization supports analyst decisions and can be configured to the organization’s risk model. The workspace does not expose a proprietary scoring formula."
      />
      <div className="priority-layout">
        <article className="finding-summary">
          <div className="finding-top"><span className={priorityClass('High priority')}>High priority</span><Label /></div>
          <p className="eyebrow">Finding ASM-204</p>
          <h3>Externally reachable management interface</h3>
          <p>A management-interface pattern is observable on a likely associated API endpoint. Ownership and intended access require validation.</p>
          <div className="priority-rationale">
            <strong>Why this priority</strong>
            <p>External reachability, high asset criticality, and a possible trust relationship raise attention. Recorded controls reduce urgency, while moderate ownership confidence and absent exploitability evidence preserve analyst review.</p>
          </div>
          <label>Data sensitivity<select value={sensitivity} onChange={(event) => setSensitivity(event.target.value)}><option>Unknown</option><option>Internal</option><option>Restricted</option><option>Public</option></select></label>
          <label className="switch-row"><input type="checkbox" checked={controls} onChange={(event) => setControls(event.target.checked)} /><span>Compensating control evidence linked</span></label>
          <div className="priority-bands" aria-label="Priority band scale">
            {['Critical review', 'High priority', 'Elevated', 'Standard review', 'Informational'].map((value) => <span key={value} className={value === 'High priority' ? 'active' : ''}>{value}</span>)}
          </div>
        </article>
        <div className="factor-list">
          {factors.map(([name, value, note]) => <article key={name}><div><span>{name}</span><strong>{value}</strong></div><p>{note}</p></article>)}
        </div>
      </div>
    </section>
  )
}

function FindingExplorer() {
  const [active, setActive] = useState(0)
  const finding = findings[active]
  return (
    <section className="section light">
      <SectionHeading eyebrow="Finding explorer" title="Review observations without overstating certainty" description="Sample findings distinguish what was observed from what remains unknown and what context is needed next." />
      <div className="finding-explorer">
        <div className="finding-list" role="tablist" aria-label="Finding categories">
          {findings.map((item, index) => <button key={item.title} role="tab" aria-selected={active === index} onClick={() => setActive(index)}><AlertTriangle size={18} />{item.title}<span>{item.status}</span></button>)}
        </div>
        <article className="finding-detail" role="tabpanel">
          <div className="panel-kicker"><FileCheck2 size={17} /> Observation requiring review</div>
          <h3>{finding.title}</h3>
          <dl className="detail-list compact">
            <div><dt>What was observed</dt><dd>{finding.observation}</dd></div>
            <div><dt>What remains unknown</dt><dd>{finding.unknown}</dd></div>
            <div><dt>Why it deserves review</dt><dd>{finding.review}</dd></div>
            <div><dt>Potential business context</dt><dd>{finding.context}</dd></div>
            <div><dt>Suggested next step</dt><dd>{finding.next}</dd></div>
          </dl>
          <div className="finding-footer"><span>Assigned team<strong>{finding.team}</strong></span><span>Current status<strong>{finding.status}</strong></span></div>
          <Label />
        </article>
      </div>
    </section>
  )
}

function ChangeTimeline() {
  const [changeType, setChangeType] = useState('Any')
  const [priority, setPriority] = useState('Any')
  const [period, setPeriod] = useState('30 days')
  const filtered = timeline.filter((item) => (changeType === 'Any' || item[4] === changeType) && (priority === 'Any' || item[3] === priority))
  return (
    <section className="section slate">
      <SectionHeading eyebrow="Illustrative change timeline" title="See how the external footprint changes" description="Compare scheduled observations and workflow events to understand what appeared, changed, or was no longer visible." />
      <div className="timeline-tools">
        <label>Asset<select><option>Any fictional asset</option>{assets.slice(0, 5).map((asset) => <option key={asset.id}>{asset.name}</option>)}</select></label>
        <label>Business unit<select><option>Any business unit</option><option>Citizen Services</option><option>Digital Platform</option><option>Shared Services</option></select></label>
        <label>Change type<select value={changeType} onChange={(event) => setChangeType(event.target.value)}><option>Any</option><option>Discovery</option><option>Certificate</option><option>Exposure</option><option>Ownership</option><option>Finding</option><option>Remediation</option></select></label>
        <label>Priority<select value={priority} onChange={(event) => setPriority(event.target.value)}><option>Any</option><option>Critical review</option><option>High priority</option><option>Elevated</option><option>Standard review</option></select></label>
        <label>Time period<select value={period} onChange={(event) => setPeriod(event.target.value)}><option>7 days</option><option>30 days</option><option>90 days</option></select></label>
      </div>
      <div className="timeline">
        {filtered.map((item) => <article key={`${item[0]}${item[1]}`}><time>{item[0]}</time><span className="timeline-dot" /><div><div><span className={priorityClass(item[3])}>{item[3]}</span><small>{item[4]}</small></div><h3>{item[1]}</h3><p>{item[2]}</p></div></article>)}
        {filtered.length === 0 && <p>No illustrative changes match the selected filters.</p>}
      </div>
      <Label />
    </section>
  )
}

type WorkItem = { finding: string; asset: string; priority: Priority; owner: string; ticket: string; due: string; status: string; exception: string; verification: string; update: string }
const initialWork: WorkItem[] = [
  { finding: 'Forgotten public portal', asset: 'legacy-portal.northstar-services.example', priority: 'Critical review', owner: 'Attribution queue', ticket: 'Local-104', due: 'Sep 14', status: 'Validating', exception: 'None', verification: 'Not ready', update: '2h ago' },
  { finding: 'Management interface', asset: 'api.northstar-services.example', priority: 'High priority', owner: 'App Security', ticket: 'Local-108', due: 'Sep 18', status: 'Assigned', exception: 'None', verification: 'Not ready', update: '5h ago' },
  { finding: 'Certificate issue', asset: 'vendor-access.example', priority: 'Elevated', owner: 'Vendor Management', ticket: 'Local-112', due: 'Sep 22', status: 'In progress', exception: 'None', verification: 'Awaiting evidence', update: '1d ago' },
]

function Remediation() {
  const [items, setItems] = useState(initialWork)
  const [selected, setSelected] = useState(0)
  const [note, setNote] = useState('')
  const [message, setMessage] = useState('Select an action to update this local simulation.')
  const update = (patch: Partial<WorkItem>, text: string) => {
    setItems((current) => current.map((item, index) => index === selected ? { ...item, ...patch, update: 'Just now' } : item))
    setMessage(text)
  }
  return (
    <section className="section light" id="remediation">
      <SectionHeading eyebrow="Remediation command center" title="Connect observations to accountable workflows" description="Simulate assignment, evidence, exception, and verification steps. Prototype data stays in browser memory." />
      <div className="remediation-layout">
        <div className="table-scroll">
          <table className="remediation-table">
            <caption>Fictional remediation workflow</caption>
            <thead><tr><th>Finding</th><th>Asset</th><th>Priority</th><th>Owner</th><th>Ticket</th><th>Due</th><th>Status</th><th>Exception</th><th>Verification</th><th>Updated</th></tr></thead>
            <tbody>{items.map((item, index) => <tr key={item.finding} className={selected === index ? 'selected-row' : ''}><td><button className="asset-link" onClick={() => setSelected(index)}>{item.finding}</button></td><td>{item.asset}</td><td><span className={priorityClass(item.priority)}>{item.priority}</span></td><td>{item.owner}</td><td>{item.ticket}</td><td>{item.due}</td><td>{item.status}</td><td>{item.exception}</td><td>{item.verification}</td><td>{item.update}</td></tr>)}</tbody>
          </table>
        </div>
        <aside className="command-panel">
          <p className="eyebrow">Local workflow actions</p><h3>{items[selected].finding}</h3>
          <label>Assign owner<select value={items[selected].owner} onChange={(event) => update({ owner: event.target.value, status: 'Assigned' }, `Assigned to ${event.target.value}.`)}><option>Attribution queue</option><option>App Security</option><option>Cloud Security</option><option>Vendor Management</option></select></label>
          <label>Add note<textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Enter a fictional workflow note" /></label>
          <div className="action-grid">
            <button onClick={() => update({ ticket: `Local-${Math.floor(120 + selected)}` }, 'Local ticket created.')}>Create local ticket</button>
            <button onClick={() => { setNote(''); setMessage(note ? 'Note added in browser memory.' : 'Enter a note first.') }}>Add note</button>
            <button onClick={() => update({ exception: 'Requested', status: 'Exception requested' }, 'Exception request recorded.')}>Request exception</button>
            <button onClick={() => update({ verification: 'Evidence received', status: 'Awaiting evidence' }, 'Mock evidence attached.')}>Upload mock evidence</button>
            <button onClick={() => update({ status: 'Ready for verification', verification: 'Queued' }, 'Finding moved to verification.')}>Move to verification</button>
            <button onClick={() => update({ status: 'Closed', verification: 'No longer observed' }, 'Closed after simulated reassessment.')}>Close after reassessment</button>
          </div>
          <p className="local-message" aria-live="polite">{message}</p>
          <small>No data leaves the browser.</small>
        </aside>
      </div>
      <Label />
    </section>
  )
}

const architectureColumns = [
  ['External discovery', ['Authorized seed information', 'DNS and domain relationships', 'Certificates', 'Public endpoints', 'Web applications', 'APIs', 'Observable services', 'Approved external intelligence']],
  ['Enterprise context', ['CMDB', 'Cloud inventory', 'Vulnerability management', 'EDR or XDR', 'SIEM', 'Identity platform', 'SaaS-management platform', 'Procurement records', 'Vendor-management system', 'Application portfolio', 'Ticketing system']],
  ['MTX ASM platform', ['Asset discovery', 'Attribution support', 'Ownership validation', 'Exposure assessment', 'Contextual prioritization', 'Change monitoring', 'Remediation workflow', 'Verification', 'Reporting']],
  ['User experiences', ['Executive posture dashboard', 'Analyst workspace', 'Asset-owner queue', 'Remediation dashboard', 'Audit and reporting view']],
]

function Architecture() {
  const [active, setActive] = useState(2)
  return (
    <section className="section dark" id="integrations">
      <SectionHeading eyebrow="Integration architecture" title="Add enterprise context without replacing record systems" description="Configured integrations can contribute owner, criticality, control, inventory, and workflow context. Displayed system categories are potential connection points, not a supported-integration commitment." />
      <div className="architecture-flow">
        {architectureColumns.map(([title, items], index) => (
          <button key={title as string} className={active === index ? 'active' : ''} onClick={() => setActive(index)}>
            {index === 0 && <Globe2 />}{index === 1 && <Building2 />}{index === 2 && <Radar />}{index === 3 && <UserCheck />}
            <strong>{title}</strong><span>{(items as string[]).length} capability areas</span>{index < 3 && <ArrowRight className="flow-arrow" />}
          </button>
        ))}
      </div>
      <div className="architecture-detail" aria-live="polite">
        <div><p className="eyebrow">Selected layer</p><h3>{architectureColumns[active][0]}</h3></div>
        <div className="architecture-items">{(architectureColumns[active][1] as string[]).map((item) => <span key={item}><Check size={15} />{item}</span>)}</div>
      </div>
    </section>
  )
}

function RoleSelector() {
  const roleNames = Object.keys(roleViews) as (keyof typeof roleViews)[]
  const [role, setRole] = useState<(typeof roleNames)[number]>('CISO')
  return (
    <section className="section light">
      <SectionHeading eyebrow="Role-based experiences" title="Put role-specific decisions in view" description="Select a role to preview the tasks and decisions presented in its illustrative workspace." />
      <div className="role-layout">
        <div className="role-selector" role="tablist" aria-label="Security roles">{roleNames.map((name) => <button key={name} role="tab" aria-selected={role === name} onClick={() => setRole(name)}>{name}<ChevronRight /></button>)}</div>
        <div className="role-dashboard" role="tabpanel">
          <div className="role-dashboard-head"><div><Label /><h3>{role} workspace</h3></div><span className="avatar"><Fingerprint /></span></div>
          <div className="role-cards">{roleViews[role].map((item, index) => <article key={item}><span>{index + 1}</span><Network size={20} /><strong>{item}</strong><small>{index % 2 ? 'Review current queue' : 'Open decision view'}</small></article>)}</div>
        </div>
      </div>
    </section>
  )
}

function Analytics() {
  const [metric, setMetric] = useState<'Discovery' | 'Ownership' | 'Exposure' | 'Remediation' | 'Program health'>('Discovery')
  const summaries: Record<typeof metric, [string, string][]> = {
    Discovery: [['Assets observed', '159'], ['New assets', '8'], ['Changed assets', '17'], ['No longer observed', '5']],
    Ownership: [['Confirmed assets', '116'], ['Under review', '29'], ['Unassociated', '7'], ['Third-party', '14']],
    Exposure: [['Priority findings', '7'], ['Recurring findings', '3'], ['Observable services', '28'], ['Median age', '34d']],
    Remediation: [['Assigned', '24'], ['In progress', '18'], ['Overdue', '4'], ['Ready to verify', '4']],
    'Program health': [['Inventory coverage', '73%'], ['Integration health', '4 of 5'], ['Processing delay', '18m'], ['Reopened', '2']],
  }
  const pie = [{ name: 'Confirmed', value: 116 }, { name: 'Under review', value: 29 }, { name: 'Unassociated', value: 7 }, { name: 'Third-party', value: 14 }]
  return (
    <section className="section analytics-section">
      <SectionHeading eyebrow="Analytics and recommended measures" title="Measure the operating program, not marketing outcomes" description="Sample figures demonstrate product views and do not represent MTX or customer results." />
      <div className="analytics-tabs" role="tablist">{Object.keys(summaries).map((value) => <button key={value} role="tab" aria-selected={metric === value} onClick={() => setMetric(value as typeof metric)}>{value}</button>)}</div>
      <div className="analytics-grid">
        <div className="analytics-summary">{summaries[metric].map(([label, value]) => <article key={label}><Label /><span>{label}</span><strong>{value}</strong><small>Illustrative measure</small></article>)}</div>
        <article className="chart-card">
          <div><h3>Discovery by asset category</h3><Label /></div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData} margin={{ top: 18, right: 8, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ color: '#07111f' }} /><Legend />
              <Bar dataKey="observed" name="Observed" fill="#2f83ff" radius={[4, 4, 0, 0]} />
              <Bar dataKey="confirmed" name="Confirmed" fill="#24c78e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="chart-alt">Text summary: observed counts are higher than confirmed counts in each category because ownership validation remains in progress.</p>
        </article>
        <article className="chart-card pie-card">
          <div><h3>Ownership disposition</h3><Label /></div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart><Pie data={pie} dataKey="value" nameKey="name" innerRadius={54} outerRadius={84} fill="#8b7cff" label={({ name, value }) => `${name}: ${value}`} /><Tooltip contentStyle={{ color: '#07111f' }} /></PieChart>
          </ResponsiveContainer>
          <p className="chart-alt">Confirmed 116; under review 29; unassociated 7; third-party 14.</p>
        </article>
      </div>
    </section>
  )
}

const governance = [
  ['Discovery authorization', ['Approved domains', 'Approved address ranges', 'Approved subsidiaries', 'Excluded assets', 'Scan windows', 'Permitted techniques', 'Third-party restrictions']],
  ['Asset governance', ['Ownership definitions', 'Business criticality', 'Environment classification', 'Data sensitivity', 'Record authority', 'Review cadence']],
  ['Remediation governance', ['Priority thresholds', 'Due-date policies', 'Exception authority', 'Escalation', 'Evidence requirements', 'Closure approval']],
  ['Access and audit', ['Role-based access', 'Analyst permissions', 'Configuration history', 'Ownership changes', 'Finding history', 'User actions']],
]

function Governance() {
  const [active, setActive] = useState(0)
  const [enabled, setEnabled] = useState<Record<string, boolean>>({})
  return (
    <section className="section light" id="governance">
      <SectionHeading eyebrow="Authorized scope and governance" title="Keep discovery and decisions within established rules" description="Discovery activities must follow written authorization, applicable law, provider policies, and established rules of engagement." />
      <div className="governance-layout">
        <div className="governance-nav" role="tablist">{governance.map((item, index) => <button key={item[0] as string} role="tab" aria-selected={active === index} onClick={() => setActive(index)}>{item[0]}<ChevronRight /></button>)}</div>
        <div className="governance-panel" role="tabpanel">
          <div><p className="eyebrow">Control family</p><h3>{governance[active][0]}</h3><span className="pill ownership-confirmed">Configured per deployment</span></div>
          <div>{(governance[active][1] as string[]).map((item) => <label className="governance-control" key={item}><span><ShieldCheck />{item}</span><input type="checkbox" checked={enabled[item] ?? (active !== 0 || item !== 'Approved subsidiaries')} onChange={(event) => setEnabled((current) => ({ ...current, [item]: event.target.checked }))} /></label>)}</div>
        </div>
      </div>
    </section>
  )
}

const phases = [
  ['Define scope', ['Identify seed domains', 'Establish authorization', 'Define exclusions', 'Identify stakeholders', 'Agree on asset categories', 'Set initial measures']],
  ['Establish external discovery', ['Configure approved discovery', 'Review initial findings', 'Tune scope', 'Establish scan cadence', 'Validate data handling']],
  ['Validate ownership and context', ['Assign review teams', 'Confirm asset ownership', 'Connect selected inventory sources', 'Classify assets', 'Define business criticality']],
  ['Operationalize remediation', ['Configure priority rules', 'Integrate ticketing', 'Assign owners', 'Establish exceptions', 'Define verification procedures']],
  ['Expand and improve', ['Add business units', 'Add approved integrations', 'Review surface changes', 'Refine prioritization', 'Measure remediation performance']],
]

function Roadmap() {
  const [active, setActive] = useState(0)
  return (
    <section className="section slate">
      <SectionHeading eyebrow="Deployment and adoption roadmap" title="Adopt the operating model in controlled phases" description="The roadmap identifies decision points without prescribing a fixed implementation schedule." />
      <div className="roadmap">
        <div className="roadmap-rail" role="tablist">{phases.map((phase, index) => <button key={phase[0] as string} role="tab" aria-selected={active === index} onClick={() => setActive(index)}><span>{index + 1}</span><b>Phase {index + 1}</b><small>{phase[0]}</small></button>)}</div>
        <article className="roadmap-detail" role="tabpanel"><div><p className="eyebrow">Phase {active + 1}</p><h3>{phases[active][0]}</h3></div><ul>{(phases[active][1] as string[]).map((item) => <li key={item}><CheckCircle2 />{item}</li>)}</ul></article>
      </div>
    </section>
  )
}

function OfferingModel() {
  const columns = [
    ['ASM platform', 'Product capabilities', ['Authorized asset discovery', 'Asset relationships', 'Attribution evidence', 'Ownership validation', 'Exposure assessment', 'Contextual prioritization', 'Change monitoring', 'Remediation tracking', 'Verification', 'Reporting']],
    ['Implementation services', 'Potential deployment support', ['Scope definition', 'Authorization planning', 'Discovery configuration', 'Data-source integration', 'Inventory reconciliation', 'Workflow design', 'Prioritization configuration', 'Ticketing integration', 'Training', 'Deployment']],
    ['Managed ASM services', 'Requires validation before publication', ['Discovery review', 'Ownership research', 'Exposure triage', 'Analyst support', 'Remediation coordination', 'Reporting', 'Program reviews', 'Platform tuning']],
  ]
  return (
    <section className="section light">
      <SectionHeading eyebrow="Product and services model" title="Separate platform capability from delivery support" description="Service scope, analyst coverage, and operating hours require MTX confirmation before external publication." />
      <div className="offering-grid">{columns.map(([title, subtitle, items], index) => <article key={title as string} className={index === 2 ? 'requires-validation' : ''}><span className="offering-icon">{index === 0 ? <Radar /> : index === 1 ? <Workflow /> : <Activity />}</span><h3>{title}</h3><p>{subtitle}</p><ul>{(items as string[]).map((item) => <li key={item}><Check />{item}</li>)}</ul></article>)}</div>
    </section>
  )
}

function Maturity() {
  const [filter, setFilter] = useState('Any')
  const items = [
    ['Outside-in asset discovery', 'Available'],
    ['Ownership validation workflow', 'Available'],
    ['Contextual priority configuration', 'Configured per deployment'],
    ['Enterprise data-source connections', 'Requires validation'],
    ['Local remediation workflow', 'Available'],
    ['Managed analyst operations', 'Requires validation'],
    ['Expanded relationship analytics', 'Planned'],
    ['Reporting views', 'Configured per deployment'],
  ]
  return (
    <section className="section maturity-section">
      <SectionHeading eyebrow="Capability evidence" title="Product maturity and operating evidence" description="Status labels distinguish prototype capability, deployment configuration, roadmap intent, and items requiring MTX validation." />
      <div className="maturity-filter"><label>Status<select value={filter} onChange={(event) => setFilter(event.target.value)}><option>Any</option><option>Available</option><option>Configured per deployment</option><option>Planned</option><option>Requires validation</option></select></label></div>
      <div className="maturity-grid">{items.filter((item) => filter === 'Any' || item[1] === filter).map(([name, status]) => <article key={name}><span className={`maturity-dot ${status.toLowerCase().replaceAll(' ', '-')}`} /><strong>{name}</strong><span className="pill">{status}</span></article>)}</div>
    </section>
  )
}

function WhyMTX() {
  const items = [
    [Globe2, 'Outside-in discovery', 'Identify externally observable assets and relationships within an authorized scope.'],
    [UserCheck, 'Ownership validation', 'Help teams determine which assets belong to the enterprise and who is accountable for them.'],
    [ListFilter, 'Contextual prioritization', 'Combine exposure evidence with available business and security context to support review.'],
    [TicketCheck, 'Remediation accountability', 'Move validated findings into assigned workflows with status, evidence, exceptions, and verification.'],
  ]
  return (
    <section className="section why-section">
      <SectionHeading eyebrow="Why MTX Attack Surface Management" title="Connect discovery to decisions and follow-through" />
      <div className="why-grid">{items.map(([Icon, title, text]) => { const C = Icon as typeof Globe2; return <article key={title as string}><C /><h3>{title as string}</h3><p>{text as string}</p></article> })}</div>
    </section>
  )
}

function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true) }
  return (
    <section className="contact-section" id="contact">
      <div className="contact-copy">
        <p className="eyebrow">Explore MTX ASM</p>
        <h2>Build a clearer view of your external footprint</h2>
        <p>Explore how MTX Attack Surface Management can support asset discovery, ownership validation, exposure prioritization, and accountable remediation.</p>
        <div className="contact-options"><span><ArrowRight /> Request an ASM Demonstration</span><span><ArrowRight /> Schedule an Attack Surface Workshop</span><span><ArrowRight /> Discuss an External Exposure Assessment</span></div>
        <p className="scope-note"><LockKeyhole /> This prototype does not transmit form information.</p>
      </div>
      <form onSubmit={submit} className="contact-form">
        <div className="form-grid">
          <label>Name<input required name="name" autoComplete="name" /></label>
          <label>Organization<input required name="organization" autoComplete="organization" /></label>
          <label>Role<input required name="role" autoComplete="organization-title" /></label>
          <label>Email<input required name="email" type="email" autoComplete="email" /></label>
          <label>Estimated environment size<select required name="size" defaultValue=""><option value="" disabled>Select a range</option><option>Under 1,000 assets</option><option>1,000–10,000 assets</option><option>10,000–50,000 assets</option><option>More than 50,000 assets</option><option>Not yet known</option></select></label>
          <label>Current asset-inventory approach<select required name="inventory" defaultValue=""><option value="" disabled>Select an approach</option><option>CMDB or asset inventory</option><option>Cloud inventory</option><option>Multiple disconnected sources</option><option>Spreadsheet-based process</option><option>Evaluating options</option></select></label>
          <label className="full-field">Primary concern<select required name="concern" defaultValue=""><option value="" disabled>Select a concern</option><option>Unknown external assets</option><option>Ownership validation</option><option>Exposure prioritization</option><option>Remediation coordination</option><option>Governance and reporting</option></select></label>
          <label className="full-field">Message<textarea name="message" rows={4} placeholder="Describe what you would like to explore" /></label>
        </div>
        <button className="button" type="submit">Request a local demonstration <ArrowRight /></button>
        {submitted && <div className="form-confirmation" role="status"><BadgeCheck /><div><strong>Request recorded locally</strong><p>Thank you. This prototype did not transmit your information.</p></div></div>}
      </form>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="brand"><span className="brand-mark"><Radar size={20} /></span><span><strong>MTX</strong><small>Attack Surface Management</small></span></div>
      <p>Fictional product prototype. No live discovery, scanning, customer information, or network access.</p>
      <a href="#top">Back to top <ArrowUp size={16} /></a>
    </footer>
  )
}

function BackToTop() {
  return <a className="back-to-top" href="#top" aria-label="Back to top"><ArrowUp /></a>
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <div id="top" />
      <Header />
      <main id="main">
        <Hero />
        <Scope />
        <Challenges />
        <Lifecycle />
        <AssetMap />
        <DiscoverySources />
        <Inventory />
        <OwnershipWorkflow />
        <Prioritization />
        <FindingExplorer />
        <ChangeTimeline />
        <Remediation />
        <Architecture />
        <RoleSelector />
        <Analytics />
        <Governance />
        <Roadmap />
        <OfferingModel />
        <Maturity />
        <WhyMTX />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
