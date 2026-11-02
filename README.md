# Kayla’s scrapbook

A static portfolio built for Vercel. The concept is **a scrapbook, still in the making**: a bound book on a grid-paper desk, pastel folder chapters, collected education tickets, work notes, and project pockets. The front cover introduces Kayla Elisheva Siwi; its “open my scrapbook” button leads to Education. The inner pages keep the owner label compact and use selective highlighter marks and pencil underlines.

## Run locally

Requires Node.js 20 or newer. There are no npm dependencies to install.

```sh
npm run dev
```

Open http://127.0.0.1:4173. To use another port: `PORT=4174 npm run dev`.

After editing, run `npm run build` and refresh the browser. The local preview server does not automatically rebuild files.

## Deploy to Vercel

From this project folder:

```sh
npx vercel
```

Sign in when prompted and create a new Vercel project for this portfolio. The included `vercel.json` selects **Other**, runs `npm run build`, and publishes `dist`. `npx vercel` creates a preview deployment. Use `npx vercel --prod` when you are ready to publish the reviewed version.

Alternatively, push this folder to your own Git repository and import that repository into Vercel. The same configuration applies. No API keys or environment variables are needed.

Production: https://kaylasiwi.com (Vercel project `kayla-portfolio`, Git-connected to this repo, so pushes to `main` deploy). Old `/projects/*` URLs from the previous site redirect to `/work/*` via `vercel.json`.

## Edit content

- `content/projects.mjs`: internship stories and other product case studies.
- `content/experience.mjs`: work, research, community experience and education.
- `content/posts.json`: blog posts. Currently empty, so the notebook shows an animated “upcoming” message.
- `scripts/build.mjs`: static builder, case studies, About, Play and Blog templates.
- `scripts/contact.mjs` and `src/assets/contact.css`: contact postcard with selectable email and LinkedIn.
- `scripts/auctra.mjs` and `src/assets/auctra.css`: full Auctra case study; its CSS loads only on that page.
- `scripts/doodle-face.mjs`: lightweight 2D Kayla wordmark, with expressions selected by chapter or project.
- `scripts/scrapbook.mjs`: book shell, author cover, folder navigation, Education, Experience and Projects chapters. Auctra sits in the margins pocket.
- `src/assets/style.css`: shared type, diagrams, avatar animation and motion preferences.
- `src/assets/scrapbook.css`: scrapbook materials, chapter layouts and responsive styles.
- `src/assets/cover.css`: dedicated front cover, compact inner-page identity and highlight/underline accents.
- `src/assets/app.js`: greeting, finite card springs, draggable note, project tabs, flow steps and pen animation.
- `src/assets/`: avatar and actual product-demo images.

Generated files in `dist/` are replaced by the build. Edit the sources above.

### Publish a first blog post

Add an object to `content/posts.json`, then build:

```json
[
  {
    "slug": "a-small-beginning",
    "title": "A small beginning",
    "description": "Your actual introduction goes here.",
    "date": "2026-11-15",
    "published": true,
    "paragraphs": ["Your first paragraph.", "Your next paragraph."]
  }
]
```

The build generates `/blog/a-small-beginning` and lists it on `/blog`. Posts with `published: false` are not generated. Titles, descriptions and paragraphs are escaped as plain text. This example has not been published.

## Included pages

19 pages: Cover (`/`), Education (`/education`), Experience (`/experience`), Projects (`/projects`), Play, Blog, About, Contact, four internship case studies, five short project pages, one full Auctra case study, and a custom 404.

The front cover opens first. The chapter order after it is **Education → Experience → Projects → Play → Blog**. Inner chapters have a compact author strip on desktop and a short identity header on mobile. Each chapter scrolls normally and has ribbon-shaped bookmarks for previous/next navigation. Case studies use the same bookmarks. All “let’s talk” links open `/contact`, where the email address is selectable, a copy button reports whether copying succeeded, and a LinkedIn link offers another contact channel. No contact action depends on a `mailto:` handler. The copy button appears only when JavaScript is available; the cover and sticky note carry “do all things in love”.

Projects leads with sanitized internship work. EarlyEye, COUPI and SupplySwipe share the playful-project collection. A compact “Java (OOP) project — upcoming” note appears beneath them, without an invented case study or deadline. Auctra sits alongside RecapAI and Latchkey in the expandable “margins” envelope, without a separate highlight. Lumi World, Lumé Shade Lab, KaylaStudy and dance content are excluded. Lumi World remains in the source data with `published: false`, so it can be revisited without appearing in generated pages or project navigation.

Community entries show role, organization and a short category/date label, without descriptions or expandable panels. Work and research retain their short descriptions. Campus naming is “Monash University”.

The research entry is explicitly upcoming: Monash IT Student Research on Unitree Go2, November 2026 to February 2027. No research outcomes or responsibilities have been invented. Auctra has a full authored case study covering the problem, permission flow, proposed architecture, adoption roadmap, business model and open validation questions. It describes a proposed product, without presenting forecasts, legal claims or latency targets as achieved results. The source pitch deck is private: its PDF is excluded from the website source, generated assets and ZIP.

Apart from the full Auctra case study, the experiments and margins pages contain a short explanation, available demo/video and GitHub links, and an interactive “the whole journey, at a glance” diagram. They omit the long contribution, decision and lesson sections. Internship pages retain their case studies, with contribution wording that does not imply sole authorship.

EarlyEye, SupplySwipe and RecapAI link to their public demos and repositories. COUPI links to the supplied live concept demo, the actual-app walkthrough video and the public `kaylaelishevaa/ai-grand-prix` repository. Latchkey links to its repository and local-demo instructions. Auctra has no deck download, demo or GitHub placeholders. Add confirmed resources in `content/projects.mjs` with `kind: 'demo'`, `'video'` or `'github'`.

## Interaction and performance

- The avatar uses an aligned **3D-rendered animation atlas**. On hover, focus or tap, the hand lifts and waves, the character gives a small bounce, and a chat bubble appears. It then returns to the laptop. This is a pre-rendered character animation, not a rotatable 3D mesh.
- The browser-tab favicon is a blush heart with an ink-green K, drawn as a compact SVG.
- The header logo is an inline SVG doodle inspired by Kayla’s portrait, with long centre-parted hair and a different expression by chapter or project. A short greeting bounce plays once on entry and respects reduced motion.
- Folder tabs, education tickets, work cards, project cards and flow buttons use short spring reactions on hover, focus or tap. The hero stars and merit stamp can be tapped for a bigger bounce. Essential controls work with tap and keyboard; none require hover.
- Chapter pages unfold subtly on arrival; paper items settle into place. The folder strip remains available while scrolling and can scroll horizontally on phones.
- The sticky note can be dragged and springs back when released. A regular tap still flips it. On touch screens, vertical gestures keep scrolling the page; horizontal pulls move the note. Reduced-motion mode keeps the note accessible by tap without dragging animation.
- Tabs support arrow keys, Home and End. Flow steps have readable live descriptions.
- Motion follows the device’s reduced-motion preference automatically. There is no visible motion toggle or stored custom motion setting.
- Decorative motion pauses offscreen and when the tab is hidden. There is no persistent rendering loop, WebGL engine, video background, analytics or client framework.
- Product screenshots load lazily on their case-study pages. The homepage prioritizes the avatar.
- The COUPI video in `src/assets/demos/coupi-journey.mp4` is about 9.5 MB and only loads when its link is opened; it is not embedded or preloaded on the portfolio.
- Fonts load from Google Fonts with `display=swap` and system fallbacks. No other external service is required at runtime.

## Checks

```sh
npm run build
npm run check
node --check src/assets/app.js
```

The check verifies page headings, internal routes, assets, anchors and required/excluded content. Browser verification covers desktop and 320px/390px/768px layout widths, chapter navigation, avatar greeting, keyboard project tabs, flow steps, the margins pocket, notebook replay, note flip, bookmark navigation and case-study navigation. Phone-width checks use a same-origin iframe viewport; they are not a physical-device performance benchmark.

The initial homepage HTML, shared CSS and JS total approximately 36 KiB gzip, excluding fonts and images. The avatar poster and wave atlas together are approximately 208 KiB. The 1600×800 atlas is shared by all wave poses; animation only runs during the short greeting. These are artifact-size checks, not a guarantee of frame rate on every device.

## Content and assets

Case studies are summarized from the supplied project sources and portfolio. Private internship interfaces are represented with explicitly reconstructed workflow illustrations. Product captures are labeled with their actual prototype/demo context. Team prototypes do not claim sole ownership.

The avatar was generated from the portrait supplied for this portfolio using the built-in imagegen tool. The wave update preserves the established avatar’s face and outfit. The final assets are `src/assets/avatar-wave-atlas.webp` and `src/assets/avatar-wave-rest.webp`. The original generated sheet is `design/avatar-wave-source.png`; the exact prompt and revision are saved in `design/avatar-generation.txt`. Technical export resized the atlas and cropped its idle poster; unsuitable intermediate poses are skipped by the animation. The Coopy mascot and demo captures came from the supplied local project files. Doodle icons and diagrams are code-native artwork.
