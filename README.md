# Poorab — Portfolio (React + Vite)

A lightweight, animated, and responsive developer portfolio built with React, Vite, Tailwind CSS, and Framer Motion (progressive enhancement). It features a hero section, about, projects, and a contact form powered via EmailJS.

## Features

- Responsive layout across 360px, 768px, 1024px, 1280px breakpoints
- Glassmorphism UI with subtle neon accents
- Progressive motion (disables gracefully when Framer Motion is unavailable or user prefers reduced motion)
- Projects list with contrast-preserving gradient overlays for readability
- Contact form with EmailJS (no backend) and India mobile validation
- Back-to-Top floating button
- Vercel-ready deployment configuration

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion (optional, dynamically imported)

## Project Structure

```
public/
  images/              # static assets (profile, project images)
  favicon.svg | images/profile.png as favicon
src/
  components/
    Nav.jsx            # fixed header with glass bg
    Hero.jsx           # hero intro + profile image
    About.jsx          # about card + skills
    Projects.jsx       # projects list with overlays
    Contact.jsx        # contact form (EmailJS)
    BackToTop.jsx      # floating arrow
  hooks/
    useScrollReveal.js # intersection-based reveal helper
```

## Getting Started

1) Install dependencies

```bash
npm install
```

2) Configure environment variables (EmailJS)

Create `.env` in the project root (do not commit it) and add:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Ensure your EmailJS template includes variables used by the app:
`{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{message}}`, `{{subject}}`.

3) Run the dev server

```bash
npm run dev
```

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

## Deployment (Vercel)

This project includes `vercel.json` configured for a Vite SPA.

Steps:

1. Push the repo to GitHub/GitLab/Bitbucket
2. Import the repo in Vercel
3. Set Environment Variables under Project Settings → Environment Variables:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy

EmailJS tip: Add your production domain to allowed origins in the EmailJS dashboard.

## Favicon

- `index.html` currently points to `/images/profile.png` as the favicon. You can replace it with your own PNG or `.ico`. For maximum compatibility you can add:

```html
<link rel="icon" type="image/png" sizes="32x32" href="/images/profile.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/images/profile.png" />
```

## Accessibility & UX notes

- Header is fixed; main content uses `pt-*` to avoid overlap.
- Reduced motion respected via `prefers-reduced-motion`.
- Buttons and links have focus rings.
- Phone input uses `inputMode="tel"` and India format validation.

## Troubleshooting

- React warnings about motion props: The code conditionally applies `framer-motion` props only when the library is available. If you add custom animations, ensure motion-only props are not passed to plain DOM elements.
- Noisy console logs (e.g., `CLEARLY`, `OverlayHighlighter`, `auth required`): These originate from browser extensions. Test in an incognito window or a clean profile to verify.
- Email not sending: Verify all three EmailJS env vars are set and that the template fields match the variables used in `Contact.jsx`.

## License

MIT — feel free to use and adapt.
