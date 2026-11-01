export const projects = [
  {
    slug: 'property-platform', short: 'Property platform', title: 'The systems behind the listings.',
    eyebrow: 'Internship · production systems', type: 'internship', color: 'mint', symbol: 'house',
    description: 'A live property platform, a backend migration, and an AI pipeline that turns messy listing messages into useful data.',
    summary: 'Real estate runs on conversations, listings and a lot of moving parts. I worked on the systems connecting them, from the backend under a live website to the small decisions that make AI output usable.',
    challenge: 'The public website needed to keep working while its backend moved from PHP/Laravel to NestJS. At the same time, agents needed less manual work to turn informal property messages into structured listings.',
    contribution: 'My contributions included the backend migration, listing ingestion, validation and downstream publishing workflows. This page presents a sanitized view of that work.',
    decision: 'Preserve the existing MySQL schema and client contracts first. Use Prisma to bridge the old data model, then normalize incrementally. For listing extraction, let AI interpret language while deterministic code checks prices, contacts and required fields.',
    takeaway: 'A useful migration respects the system people already depend on. A useful AI feature also needs validation, retries and an understandable path when something goes wrong.',
    scope: 'Sanitized internship case study. The diagram reconstructs the product flow; it is not a screenshot of a private dashboard. Public code is a runnable extract, not the full production system.',
    role: 'Backend migration · full-stack workflows · applied AI', stack: ['NestJS', 'TypeScript', 'Prisma', 'MySQL', 'Redis'],
    steps: [
      { title: 'A messy listing', text: 'An agent shares a listing in everyday shorthand.', icon: 'note' },
      { title: 'Make it structured', text: 'AI interprets the text. Code validates the result.', icon: 'spark' },
      { title: 'Review & save', text: 'Structured fields fit the existing platform and its data contracts.', icon: 'check' },
      { title: 'Keep it connected', text: 'The website, admin and portal jobs use a consistent record.', icon: 'house' }
    ],
    links: [{ label: 'Public engineering extract', url: 'https://github.com/kaylaelishevaa/real-estate-ai-platform' }]
  },
  {
    slug: 'chat-to-crm', short: 'Chat → CRM', title: 'From conversations to a useful CRM.',
    eyebrow: 'Internship · agent workflows', type: 'internship', color: 'rose', symbol: 'chat',
    description: 'Keep the conversation where agents already work. Turn useful findings into proposed updates they can review.',
    summary: 'A CRM is only as useful as what makes it into the record. This workflow starts in WhatsApp, finds relevant business context, and brings proposed updates back to a person before they are committed.',
    challenge: 'Important details lived inside everyday chats. Asking busy agents to repeat all of that work in another interface created a gap between what was happening and what the CRM knew.',
    contribution: 'I contributed to the chat-to-CRM workflow, including staged findings, confirmation paths and operational debugging for incomplete or failed processing.',
    decision: 'Separate findings from writes. Group proposed changes into reviewable bundles and require confirmation. Monitor actual processing outcomes as well as scheduled jobs, and retain a retry path for work that did not finish.',
    takeaway: 'An agent workflow is a product with states, ownership and recovery. Its success is not just whether a model can produce a plausible answer.',
    scope: 'Sanitized reconstruction of an internship workflow. The visual is illustrative and contains no real customer conversations or records. It shows the intended review flow, not a claim that incidents never occurred.',
    role: 'Workflow design · backend · operational debugging', stack: ['AI workflows', 'CRM integration', 'Validation', 'Monitoring'],
    steps: [
      { title: 'A conversation', text: 'Business context starts in the chat people already use.', icon: 'chat' },
      { title: 'A proposed update', text: 'Relevant findings are staged together for review.', icon: 'note' },
      { title: 'A person confirms', text: 'The agent reviews the proposed changes before a write.', icon: 'check' },
      { title: 'A useful record', text: 'Confirmed information becomes structured CRM context.', icon: 'folder' }
    ], links: [{ label: 'Public case study', url: 'https://github.com/kaylaelishevaa/chat-to-crm' }]
  },
  {
    slug: 'pulse', short: 'Pulse', title: 'The right signal, in the right hands.',
    eyebrow: 'Internship · real-time systems', type: 'internship', color: 'blue', symbol: 'bell',
    description: 'A real-time oversight feed connecting message capture, triage and notifications across the web and mobile.',
    summary: 'Pulse brings live WhatsApp activity into one operational view. It connects the quiet backend work of capture and classification with the visible moment when someone needs to act.',
    challenge: 'An alert is only useful if the message was captured correctly, the context is understandable and the person who needs it actually receives it.',
    contribution: 'My work covered ingestion and delivery, the real-time web/PWA experience, and mobile handoff and authentication issues that surfaced in use.',
    decision: 'Make ingestion durable and fan-out idempotent. Separate storage from delivery so retrying a notification does not create a second event. Carry the same event into the live feed and mobile notification channels.',
    takeaway: 'The most interesting bugs often live between systems. A login problem between an in-app browser and the system browser became the standalone Latchkey demo.',
    scope: 'Sanitized production case study. This is a reconstructed system flow; production messages, identities and internal interfaces are not reproduced.',
    role: 'Full-stack · event delivery · PWA', stack: ['TypeScript', 'PostgreSQL', 'Redis', 'WebSocket', 'Next.js'],
    steps: [
      { title: 'Capture once', text: 'Incoming messages are normalized and stored durably.', icon: 'chat' },
      { title: 'Find the signal', text: 'Triage distinguishes urgent activity from routine updates.', icon: 'spark' },
      { title: 'Deliver the alert', text: 'WebSocket, push and messaging channels carry the event.', icon: 'bell' },
      { title: 'See the context', text: 'A person opens the feed with the information needed to respond.', icon: 'eye' }
    ], links: [{ label: 'Public case study', url: 'https://github.com/kaylaelishevaa/pulse-case-study' }]
  },
  {
    slug: 'mcp-connectors', short: 'MCP connectors', title: 'Give AI a door. And a set of keys.',
    eyebrow: 'Internship · controlled AI access', type: 'internship', color: 'lilac', symbol: 'key',
    description: 'A shared connector foundation for CRM and web APIs, with deliberate permissions for each backend.',
    summary: 'Connecting an assistant to a real business system means deciding what it can see, what it can change and how every action can be understood afterwards.',
    challenge: 'Two backends needed similar integration plumbing, but very different permissions. Treating them identically would hide the most important difference.',
    contribution: 'I worked on a common Python/FastAPI MCP-server foundation and its adapters for the Lark CRM and NestJS web backend, including authentication, audit logging and access controls.',
    decision: 'Reuse the server foundation while keeping permission policies distinct. The CRM connector supports controlled administrative writes; the REST connector is read-only, with dry-run and kill-switch controls around riskier paths.',
    takeaway: 'The boundary is part of the product. A smaller, explicit tool surface is easier to reason about than a connector that can do everything.',
    scope: 'Sanitized integration case study with a public implementation. Backend names describe architecture; no credentials, internal endpoints or customer data appear here.',
    role: 'Integration architecture · backend · permissions', stack: ['Python', 'FastAPI', 'MCP', 'JSON-RPC', 'Audit logs'],
    steps: [
      { title: 'An assistant asks', text: 'A request arrives through a defined tool interface.', icon: 'spark' },
      { title: 'Check the keys', text: 'Authentication and backend-specific permissions gate access.', icon: 'key' },
      { title: 'Use the right tool', text: 'The allowed operation reaches the CRM or web API.', icon: 'folder' },
      { title: 'Leave a trace', text: 'An audit trail makes the action inspectable.', icon: 'note' }
    ], links: [{ label: 'Explore the connector code', url: 'https://github.com/kaylaelishevaa/mcp-connector-factory' }]
  },
  {
    slug: 'earlyeye', short: 'EarlyEye', title: 'From a camera alert to a human response.',
    eyebrow: 'Team hackathon prototype · campus safety', type: 'experiment', color: 'blue', symbol: 'eye', image: 'earlyeye.jpg', imageAlt: 'EarlyEye demo showing the operator dashboard beside a guard mobile alert.', imageCaption: 'Actual project demo: operator dashboard + guard view.',
    brief: 'Team prototype connecting camera alerts, an operator dashboard and a guard PWA into one incident-response journey.',
    description: 'An operator dashboard, a guard’s phone and a 3D campus, connected into one incident-response journey.',
    summary: 'EarlyEye looks beyond the detection model. It asks what happens next: who sees the alert, who responds, and how that response becomes an incident record.',
    challenge: 'A detection on a camera feed is only one part of campus response. Operators and guards also need shared context, a handoff and a record of what happened.',
    contribution: 'My credited work covers the Next.js dashboard, guard PWA, Three.js campus, track-record page and Vercel deployment. Detection-model work belongs to other teammates.',
    decision: 'Design the desktop and guard experiences around the same incident. Make on-my-way, arrival and reporting explicit steps, then bring completed incidents into planning and reports.',
    takeaway: 'The interface between a system and the people responding to it matters as much as the initial alert.',
    scope: 'Team hackathon prototype. The project demonstrates rapid detection after a fight begins, not validated prediction. Demo views may use recorded footage and mock fallbacks; this is not a production security deployment.',
    role: 'Dashboard · guard PWA · 3D campus', stack: ['Next.js', 'Three.js', 'PWA', 'Vercel'],
    steps: [
      { title: 'Camera event', text: 'A suspected incident appears in the detection stream.', icon: 'eye' },
      { title: 'Desk decision', text: 'An operator sees context and assigns the response.', icon: 'note' },
      { title: 'Guard response', text: 'A guard receives the alert and updates their arrival state.', icon: 'bell' },
      { title: 'Close the loop', text: 'The response becomes an incident record and report.', icon: 'check' }
    ], links: [{ label: 'Live demo', url: 'https://earlyeye.vercel.app', kind: 'demo' }, { label: 'GitHub', url: 'https://github.com/ShariqNauman/taylors-hack', kind: 'github' }]
  },
  {
    slug: 'coupi', short: 'COUPI', title: 'A companion, before a catalog.',
    eyebrow: 'Collaborative prototype · AI + 3D', type: 'experiment', color: 'mint', symbol: 'heart', image: 'coupi.jpg', imageAlt: 'COUPI recorded demo showing the curated shopping-world landscape.', imageCaption: 'Recorded app demo showing curated worlds; live world generation did not succeed in this capture.',
    brief: 'An AI shopping companion with conversational memory, curated 3D product worlds and a simulated checkout.',
    description: 'Conversation becomes a personal shopping world, with product evidence and decisions the user controls.',
    summary: 'COUPI starts with a companion called Coopy and a conversation about your life. The broader product connects memory, exploration, comparison and explicit approvals into one shopping journey.',
    challenge: 'Shopping tools often begin with a search box or an endless catalog. COUPI explores what happens when the starting point is the person: their context, preferences and limits.',
    contribution: 'This is a collaborative product prototype in my project collection. The portfolio presents its end-to-end experience; it does not attribute every team component to one person.',
    decision: 'Have models compose bounded, validated world blueprints rather than executable code. Keep memory inspectable and deletable, and require explicit review of delegated plans and checkout decisions.',
    takeaway: 'A playful world still needs legible state: what the companion remembers, where product evidence comes from and what the user has actually approved.',
    scope: 'Local collaborative prototype. Orders and payments are simulated. Synthetic products are separated from sourced references. The recorded demo shown here uses curated worlds.',
    role: 'Collaborative product exploration', stack: ['Next.js', 'Three.js', 'Structured AI output', 'Memory'],
    steps: [
      { title: 'Meet Coopy', text: 'Hatch a companion and share context in a conversation.', icon: 'heart' },
      { title: 'Make it personal', text: 'Review preferences and what the companion remembers.', icon: 'note' },
      { title: 'Explore worlds', text: 'Discover products and compare the evidence behind them.', icon: 'spark' },
      { title: 'You decide', text: 'Review the delegated plan and approve the simulated checkout.', icon: 'check' }
    ], links: [{ label: 'Live demo', url: 'https://nook-shopping-companion-kr1024.satinycedar67.chatgpt.site', kind: 'demo' }, { label: 'Watch video', url: '/assets/demos/coupi-journey.mp4', kind: 'video' }, { label: 'GitHub', url: 'https://github.com/kaylaelishevaa/ai-grand-prix', kind: 'github' }]
  },
  {
    slug: 'lumi-world', published: false, short: 'Lumi World', title: 'Point at it. Lumi gets the context.',
    eyebrow: 'Team hackathon prototype · browser companion', type: 'experiment', color: 'lilac', symbol: 'spark', image: 'lumi.jpg', imageAlt: 'Lumi browser companion on the controlled demo shopping page.', imageCaption: 'Actual extension capture from the project’s controlled demo store.',
    brief: 'A browser companion for remembering page objects and exploring agent-assisted shopping in a controlled demo store.',
    description: 'A little on-page companion that follows attention, remembers objects and works within your limits.',
    summary: 'Lumi lives alongside the page instead of in a separate chat window. Pointing, remembering and setting a mandate become the start of an agent workflow.',
    challenge: 'The object a person means is often already on their screen. Copying it into a separate assistant loses context and interrupts the task.',
    contribution: 'A team hackathon build in my project collection, exploring contextual browser interaction, visible agent state and approval before execution.',
    decision: 'Use an explicit mandate and enforce its constraints in code. Preserve cross-tab context, preview final actions and restrict high-risk execution to the controlled demo origin.',
    takeaway: 'A companion can make an agent feel understandable, but its behavior still needs clear limits outside the character animation.',
    scope: 'Hackathon extension with a controlled demo store and scripted seller. It does not demonstrate unrestricted autonomous purchasing on live merchant sites.',
    role: 'Collaborative browser-agent prototype', stack: ['Chrome extension', '3D interaction', 'Agent constraints'],
    steps: [
      { title: 'Point & remember', text: 'Select an object on the page and preserve its context.', icon: 'eye' },
      { title: 'Set your limits', text: 'Describe the goal and a mandate the system can check.', icon: 'note' },
      { title: 'Compare & negotiate', text: 'Explore options within the controlled demo workflow.', icon: 'chat' },
      { title: 'Preview & approve', text: 'The final action stays visible to the person deciding.', icon: 'check' }
    ], links: [{ label: 'Run demo locally', url: 'https://github.com/SuYeeMyatMoe/Lumi_World#golden-path-2-minute-demo', kind: 'demo' }, { label: 'GitHub', url: 'https://github.com/SuYeeMyatMoe/Lumi_World', kind: 'github' }]
  },
  {
    slug: 'supplyswipe', short: 'SupplySwipe', title: 'Let the agents negotiate. Let people decide.',
    eyebrow: 'Product prototype · SME procurement', type: 'experiment', color: 'mint', symbol: 'chat',
    brief: 'A procurement prototype where buyer and supplier agents negotiate within private limits, then hand the terms back for approval.',
    description: 'Buyer and supplier agents negotiate within private limits, then hand the deal back to both owners.',
    summary: 'SupplySwipe explores a procurement journey for food-and-beverage SMEs, from matching a request to checking the invoice after a negotiated deal.',
    challenge: 'A useful negotiation tool needs to respect each side’s private limits and connect agreement to the paperwork that follows.',
    contribution: 'A prototype in my project collection, focused on the buyer/supplier journey and a customizable 3D companion called Wakil.',
    decision: 'Keep negotiation constraints sealed, require both owners’ approval and carry the agreed terms into invoice review and an audit trail.',
    takeaway: 'The interesting product extends beyond the conversation between agents. Agreement, approval and follow-through belong in the same journey.',
    scope: 'Frontend prototype with synthetic data and local storage. Backend integration is planned; no live supplier transactions are represented.',
    role: 'Product prototype', stack: ['Buyer/supplier flows', '3D companion', 'Local prototype'],
    steps: [{ title: 'Make a request', text: 'State the procurement need.', icon: 'note' }, { title: 'Agents negotiate', text: 'Each side works within its private limits.', icon: 'chat' }, { title: 'Owners approve', text: 'Both people review the proposed terms.', icon: 'check' }, { title: 'Check the invoice', text: 'Compare the paperwork with the agreement.', icon: 'folder' }], links: [{ label: 'Live demo', url: 'https://supply-swipe--shariqnaumann.replit.app/demo', kind: 'demo' }, { label: 'GitHub', url: 'https://github.com/kaylaelishevaa/supply-swipe', kind: 'github' }]
  },
  {
    slug: 'recapai', short: 'RecapAI', title: 'Keep the decisions. Lose the replay.',
    eyebrow: 'Personal project · meeting workflow', type: 'extra', color: 'rose', symbol: 'note',
    brief: 'Turn recordings or transcripts into meeting notes, decisions and action items. The public demo uses mock output.',
    description: 'Recordings and transcripts become structured notes, decisions and action items.',
    summary: 'RecapAI follows the full meeting-notes loop: bring in a recording or transcript, review structured output, revisit it in history and export what matters.',
    challenge: 'The useful output of a meeting is often scattered across a long recording. A summary alone is not enough if decisions and next steps are hard to retrieve.',
    contribution: 'A full-stack meeting-notes project with a React interface and a FastAPI/PostgreSQL backend, including a runnable demo mode.',
    decision: 'Support a predictable mock mode for the complete product flow while keeping a separate integration path for real transcription and model output.',
    takeaway: 'A demo can make the workflow easy to explore without disguising simulated output as live inference.',
    scope: 'The public demo can run with deterministic mock outputs. Real model-backed processing is optional and requires provider configuration.',
    role: 'Full-stack product', stack: ['React', 'FastAPI', 'PostgreSQL'],
    steps: [{ title: 'Bring a meeting', text: 'Start with a recording or transcript.', icon: 'chat' }, { title: 'Make it structured', text: 'Organize notes, decisions and action items.', icon: 'spark' }, { title: 'Review the details', text: 'Read the output in a focused workspace.', icon: 'eye' }, { title: 'Take it with you', text: 'Revisit history or export the notes.', icon: 'folder' }],
    links: [{ label: 'Live demo', url: 'https://recapai-web-production.up.railway.app', kind: 'demo' }, { label: 'GitHub', url: 'https://github.com/kaylaelishevaa/recap-ai', kind: 'github' }]
  },
  {
    slug: 'latchkey', short: 'Latchkey', title: 'A tiny bridge between two browsers.',
    eyebrow: 'Open-source demo · extracted from production', type: 'extra', color: 'blue', symbol: 'key',
    brief: 'A runnable demo of passwordless login across an in-app browser and the system browser.',
    description: 'Passwordless login that survives the jump from an in-app browser to the system browser.',
    summary: 'A production authentication bug from Pulse became a focused, runnable demo of a very specific handoff problem.',
    challenge: 'The browser that opens a magic link may not be the one that runs the app. Their isolated cookie stores mean a successful login can appear to disappear.',
    contribution: 'I isolated the problem and the handoff pattern into a public demo that makes the behavior reproducible.',
    decision: 'Use a short-lived, single-use handoff token. Let the destination browser establish its own session rather than assuming it can see another browser’s cookies.',
    takeaway: 'Small, well-defined problems make useful public engineering artifacts, especially when the original system cannot be shared.',
    scope: 'Public runnable demo extracted from a production issue. This page describes the pattern without exposing production authentication infrastructure.',
    role: 'Authentication · debugging · open source', stack: ['TypeScript', 'Fastify', 'Magic links'],
    steps: [{ title: 'Open the link', text: 'A magic link starts inside an in-app browser.', icon: 'note' }, { title: 'Issue a handoff', text: 'Create a short-lived, single-use token.', icon: 'key' }, { title: 'Switch browsers', text: 'Carry the handoff into the destination browser.', icon: 'folder' }, { title: 'Start the session', text: 'The destination establishes its own authenticated session.', icon: 'check' }],
    links: [{ label: 'Run demo locally', url: 'https://github.com/kaylaelishevaa/latchkey#run-it', kind: 'demo' }, { label: 'GitHub', url: 'https://github.com/kaylaelishevaa/latchkey', kind: 'github' }]
  },
  {
    slug: 'auctra', short: 'Auctra', title: 'Auctra', format: 'case-study',
    eyebrow: 'Concept case study · Fintech Ideathon 2026 · 2nd runner-up', type: 'extra', color: 'lilac', symbol: 'key',
    brief: 'A fintech case study proposing a permission layer for banks and wallets to check whether an AI agent’s payment is authorized. Identity, spending limits and an audit record make each decision traceable.',
    description: 'A fintech case study on permission checks for AI agent payments. Fintech Ideathon 2026 · 2nd runner-up.',
    flowNote: 'Proposed product flow · ideathon concept',
    steps: [
      { title: 'Agent ID', text: 'A payment request identifies an agent linked to a customer the bank has already verified.', icon: 'key' },
      { title: 'Mandate', text: 'Check the owner’s spending limit, permitted recipient, expiry and revocation status.', icon: 'note' },
      { title: 'Guard', text: 'Evaluate the request and return a decision: allow, ask for approval, or block.', icon: 'check' },
      { title: 'Ledger', text: 'Keep an append-only record of the decision and who authorized it.', icon: 'folder' }
    ], links: []
  }
].filter(project => project.published !== false);
