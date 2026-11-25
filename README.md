# Goutham Dev S — Creative Portfolio

A React 18 + Vite 6 portfolio starter. The landing page now uses a hand-drawn space environment around a stylized 3D-style rotating Earth, with animated stars, orbital paths, a satellite, and a responsive “Explore my world” cue.

## Run locally

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
```

## Landing page files

- `src/components/SpaceHero.tsx` — hero composition and interactive visual elements
- `src/styles/index.css` — space scene, Earth treatment, animation and responsive rules
- `public/assets/space/world-map.svg` — custom vector landmass texture used by the rotating globe

## Replaceable assets

The hero globe is currently CSS/SVG-built so it works without an external image or 3D runtime. It can later be replaced with a higher-fidelity WebGL/Three.js Earth if desired. Existing project media placeholders remain in place for screenshots and gameplay videos.
