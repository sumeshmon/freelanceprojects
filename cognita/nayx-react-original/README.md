# Nayx – React Conversion

Converted from the original HTML5 + SCSS + vanilla JS site to **Vite + React**.

## Stack

- Vite 8 + React 19
- SCSS (your original styles, adapted for Vite)
- Bootstrap 5 + Bootstrap Icons
- Custom Instrument Sans fonts

## Getting started

```bash
cd nayx-react
npm install --legacy-peer-deps
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Project structure

```
src/
  assets/
    fonts/          # Instrument Sans
    images/         # logos, hero, section images
  components/
    Header.jsx      # Fixed nav + scroll state + mobile menu
    Hero.jsx        # Hero banner + animated fill-rate counter
    ChatButton.jsx  # Floating chat CTA
  styles/           # Your original SCSS modules
    main.scss       # Entry – imports Bootstrap + all partials
    vars.scss, fonts.scss, nav.scss, hero.scss, ...
  App.jsx
  main.jsx
```

## What was converted

| Original            | React                          |
|---------------------|--------------------------------|
| Header + mobile menu| `Header.jsx` (useState/useEffect) |
| Hero + ring counter | `Hero.jsx`                     |
| Chat button         | `ChatButton.jsx`               |
| All SCSS            | `src/styles/` (paths fixed)    |
| Fonts & images      | `src/assets/`                  |

## Remaining sections to convert

The original page also has these sections (still in `nayx_v6/index.html`).  
Convert each to a component under `src/components/` and import in `App.jsx`:

1. **AboutSection** – Who we are + counters (`about-section`, `#statsSection`)
2. **FacilityBanner** – Enterprise metrics (`enterprise-hero`)
3. **WhyChoose** – Feature cards (`why-choose-section`)
4. **Benefits** – Benefits grid (`benefits-section`)
5. **RequestDemo** – CTA banner (`hero-banner`)
6. **HowItWorks** – Steps timeline (`how-it-works-section`)
7. **PlatformCard** – Audience split (`hero-feature`)
8. **Footer** – Full footer + year (`footer-card`)

### Pattern for each section

```jsx
// src/components/AboutSection.jsx
import teamImg from '../assets/images/path-to-team-image.jpg'
// ... other images

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      {/* paste markup from index.html, change class → className,
          for → htmlFor, self-close tags, import images */}
    </section>
  )
}
```

Then in `App.jsx`:

```jsx
import AboutSection from './components/AboutSection'
// ...
<main>
  <Hero />
  <AboutSection />
  ...
</main>
```

### Counters (stats section)

Reuse the IntersectionObserver pattern from the original `js/app.js` inside a `useEffect` + `useRef` (or a small custom hook).

## Notes

- Bootstrap JS is **not** required – mobile menu is handled in React.
- Image paths in SCSS (e.g. hero background) use `../assets/images/...` relative to `src/styles/`.
- Prefer importing images in JS so Vite can hash them for production.
