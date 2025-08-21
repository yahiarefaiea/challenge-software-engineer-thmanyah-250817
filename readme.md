# A Take-Home Challenge at Thmanyah as a Software Engineer

This repo contains a small full‑stack implementation (frontend, backend, and a dedicated component library via Storybook). Below you'll find how to run **Storybook** first, then the **frontend**, then the **backend**, plus technologies and requirements.

## Requirements

* **Node.js v20.18.1**
* **NPM v10.8.2**
* **Rename** `.env.sample` **files**
   * Backend: `.env.sample` ⇒ `.env`
   * Frontend: `.env.sample` ⇒ `.env.local`

If a different Node or npm version is used, installation or running may fail because engines are enforced:

```json
{
  "engines": {
    "node": "20.18.1",
    "npm": "10.8.2"
  }
}
```

## Technologies

* **Design:** Figma *([Link](https://www.figma.com/design/YgnA4a0IlQTcsVuHNPs0DG/Untitled?node-id=0-1&t=PnnwuaXFXSuXhisd-1))*
* **Frontend:** Next.js / React / Typescript / HeadlessUI / Axios
* **State management:** Basic context from React
* **Design System:** Storybook / React / Tailwind CSS / Sass / CSS variables
* **Icons:** `@iconify/react` — custom implementation for my custom icons set
* **Animations:** GSAP
* **Backend:** Express.js / MongoDB (Mongoose)

## Storybook

A component‑driven UI library with stories for primitives, layout, and project‑specific components. (Runs on **http://localhost:6006**.)

### Component groups

* **Low‑level components**
   * `<Icon />`
   * `<HeadlessButton />`
   * `<Button />`
   * `<Dropdown />`
   * `<Input />`
   * `<SearchField />`

* **Project‑specific components**
   * `<Thumbnail />`
   * `<EpisodeCard />`
   * `<PodcastCard />`

* **Layout components**
   * `<Aside />`
   * `<Header />`

* **Minor components**
   * `<Advertisement />`
   * `<Divider />`
   * `<Noise />` *(Same as in https://yahiarefaiea.com)*
   * `<Signature />` *(Same as in https://yahiarefaiea.com)*

### Install & run (Storybook)

```bash
# Clone repo
git clone https://github.com/yahiarefaiea/challenge-software-engineer-thmanyah-250817.git
cd challenge-software-engineer-thmanyah-250817/apps/frontend

# Install & launch Storybook (port 6006)
npm install
npm run storybook
```

## Frontend (Next.js + React)

Runs on **http://localhost:3000**.

### Install & run (Frontend)

```bash
cd ../apps/frontend

# Install dependencies & start dev server (port 3000)
npm install
npm run dev
```

## Backend (Express.js + MongoDB)

Runs on **http://localhost:3001**.

**Why Express + MongoDB?** I chose Express.js with MongoDB (Mongoose) to deliver quickly and keep iteration fast. If I had extra time to work on this, I’d consider NestJS with PostgreSQL for more opinionated structure and relational guarantees, but for this challenge the current stack provides a lean solution.

### Features

* **30‑minute search caching** for subsequent, identical queries → reduces load, memory usage, and cost.
* **Search history persistence** (query, metadata, timing, cache hit) stored in DB.
* **Podcast & episode persistence** (normalized iTunes results upserted into MongoDB).
* **Flexible fetching**: podcasts only, episodes only, or both (combined search).

### Install & run (Backend)

```bash
cd ../apps/backend

# Install dependencies & start dev server (port 3001)
npm install
npm run dev
```

### API — example requests

```bash
# Combined search: podcasts + episodes
curl "http://localhost:3001/api/search?q=فنجان"

# Podcasts only
curl "http://localhost:3001/api/search/podcasts?q=فنجان"

# Episodes only
curl "http://localhost:3001/api/search/episodes?q=فنجان"
```

## Note

Backend connects to MongoDB via `MONGODB_URI`. You may need to have Mongo installed and running on your machine.
