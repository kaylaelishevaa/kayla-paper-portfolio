export function renderAuctra({project, icon, stepper, navigation}) {
  return `<div class="wrap breadcrumb"><a href="/projects#margins">← all projects</a><span>Fintech Ideathon 2026 · 2nd runner-up</span></div>
  <article class="auctra-study">
    <header class="auctra-header">
      <span class="tiny">a product & technology case study</span>
      <h1>Auctra</h1>
      <p class="auctra-thesis hand"><span class="marker-highlight marker-lilac">Permission before payment.</span></p>
      <p class="auctra-lead">A proposed permission layer for banks and wallets to check what an AI agent is allowed to spend—and keep a record of the decision.</p>
      <div class="auctra-context"><span>Team ideathon concept</span><span>Technology lead</span><span>Bank & wallet infrastructure</span></div>
    </header>

    <nav class="auctra-index" aria-label="Auctra case study sections"><a href="#problem">the problem</a><a href="#solution">the idea</a><a href="#architecture">under the hood</a><a href="#pilot">the rollout</a><a href="#validation">what’s next</a></nav>

    <section class="auctra-section" id="problem">
      <span class="tiny">01 / the starting point</span>
      <h2>Who said it could spend?</h2>
      <div class="auctra-two-col"><p>Our starting question was how a bank should handle a payment initiated by an AI agent. Human behaviour signals may not fit an automated payer, and identifying the agent alone does not explain whether its owner permitted this particular payment.</p><div class="auctra-question-note"><span class="hand">the missing piece</span><p>Connect each request to <strong>a person, a permission, and a record.</strong></p></div></div>
      <p class="auctra-context-line">The concept focused on Malaysian banks and wallets, with DuitNow, FPX and e-wallet payment journeys as the intended integration context.</p>
    </section>

    <section class="auctra-section case-flow" id="solution">
      <span class="tiny">02 / the permission layer</span>
      <h2 class="hand">the whole journey, at a glance.</h2>
      <p>Place a permission check between the agent’s request and the bank’s payment decision. The bank keeps customer verification and money movement; Auctra checks the mandate and records the outcome.</p>
      ${stepper(project)}
      <div class="auctra-outcomes" aria-label="Three possible decisions">
        <div class="outcome-allow"><span class="hand">allow</span><p>The request meets the owner’s rules.</p></div>
        <div class="outcome-ask"><span class="hand">ask</span><p>Route the request for human approval.</p></div>
        <div class="outcome-block"><span class="hand">block</span><p>The request is outside its permission.</p></div>
      </div>
      <span class="auctra-caption">Proposed product flow · the bank remains the payment decision-maker</span>
    </section>

    <section class="auctra-section" id="architecture">
      <span class="tiny">03 / under the hood</span>
      <h2>A small API with a clear job.</h2>
      <p>The proposed architecture uses a REST API protected by mutual TLS, short-lived signed credentials, a Python scoring service and PostgreSQL. Each layer answers a different question.</p>
      <div class="auctra-architecture">
        <article>${icon('key')}<h3>Resolve the agent</h3><p>Map its signed credential to a verified customer. Check amount, recipient, expiry and whether the mandate has been revoked.</p></article>
        <article>${icon('check')}<h3>Evaluate the request</h3><p>Apply explicit rules first, then risk scoring. Return an allow, ask or block response to the bank or wallet.</p></article>
        <article>${icon('note')}<h3>Preserve the evidence</h3><p>Write an append-only, hash-chained audit record so decisions can be inspected and changes can be detected.</p></article>
      </div>
      <div class="auctra-design-note"><span class="hand">a deliberate choice</span><p>A conventional database with a tamper-evident log keeps the proposal focused on traceability. Blockchain is not required for this design.</p></div>
    </section>

    <section class="auctra-section" id="pilot">
      <span class="tiny">04 / earning trust</span>
      <h2>Observe first. Enforce after evidence.</h2>
      <p>The proposed pilot starts in shadow mode: run alongside a bank’s traffic, record what Auctra would decide, and compare the results before enabling enforcement.</p>
      <ol class="auctra-roadmap">
        <li><span class="tiny">months 0–3</span><h3>Identity & limits</h3><p>Register agents and store customer mandates.</p></li>
        <li><span class="tiny">months 3–6</span><h3>Guard & ledger</h3><p>Build the decision engine and test on historical payments.</p></li>
        <li><span class="tiny">months 6–9</span><h3>Shadow pilot</h3><p>Log proposed decisions without blocking payments.</p></li>
        <li><span class="tiny">months 9–18</span><h3>Controlled rollout</h3><p>Enable enforcement if pilot evidence supports it, then expand.</p></li>
      </ol>
      <span class="auctra-caption">Proposed roadmap · these are planning stages, not completed milestones</span>
    </section>

    <section class="auctra-section" id="business">
      <span class="tiny">05 / making it viable</span>
      <h2>Start with one institutional partner.</h2>
      <div class="auctra-two-col"><div><h3>A route into the market</h3><p>Begin with digital banks and large e-wallets, then commercial banks and gateways. Small businesses would access spending controls through those partners.</p></div><div><h3>A model tied to use</h3><p>The proposed business combines an institutional subscription with a fee per permission check, plus an optional small-business tier distributed through banks.</p></div></div>
    </section>

    <section class="auctra-section" id="validation">
      <span class="tiny">06 / the open questions</span>
      <h2>What still needs proving.</h2>
      <p>This is an ideathon concept. The next step would be to test its assumptions with a bank partner.</p>
      <div class="auctra-questions">
        <div><span>01</span><p><strong>Demand.</strong> How much agent-initiated payment activity exists on the target rails, and where is a permission check most useful?</p></div>
        <div><span>02</span><p><strong>Decision quality.</strong> How often should requests be allowed, escalated or blocked, and can the system meet the bank’s latency needs?</p></div>
        <div><span>03</span><p><strong>Evidence & obligations.</strong> Would the audit record be useful in a payment dispute, and what reviews would the integration require?</p></div>
        <div><span>04</span><p><strong>A changing ecosystem.</strong> How would payment-network standards, including any future PayNet standard, change the integration?</p></div>
      </div>
    </section>

    <footer class="auctra-outcome"><span class="hand">where it landed</span><h2>2nd runner-up</h2><p>Fintech Ideathon 2026 · FYLeaders · Monash University</p><p>I led the technology for our team’s concept and pitched it to fintech CEOs.</p><span class="auctra-takeaway hand">A delegated action needs a boundary—and a trail.</span></footer>
    ${navigation}
  </article>`;
}
