# ☕ But First, Coffee

A visually rich, scroll-driven coffee shop website built with **Next.js**, **GSAP**, **Framer Motion**, and **Lenis** smooth scrolling. The site features a scrollytelling coffee-sequence animation, smooth transitions, a custom cursor, and a polished dark aesthetic.

## ✨ Features

- **Scrollytelling Canvas** — A 240-frame coffee image sequence that plays as you scroll, powered by GSAP ScrollTrigger.
- **Smooth Scrolling** — Buttery smooth scroll experience using Lenis.
- **Intro Loader** — Animated loading screen before the main content reveals.
- **Custom Cursor** — A bespoke cursor component for a premium feel.
- **Sections** — Features, Testimonials, and a Final CTA section with scroll-based animations.
- **Dark Theme** — A sleek `#0A0A0A` dark background throughout.

## 🛠 Tech Stack

| Technology                                     | Purpose                                  |
| ---------------------------------------------- | ---------------------------------------- |
| [Next.js 16](https://nextjs.org)               | React framework (App Router)             |
| [React 19](https://react.dev)                  | UI library                               |
| [GSAP](https://gsap.com)                       | Scroll-driven animations & ScrollTrigger |
| [Framer Motion](https://www.framer.com/motion) | Component animations                     |
| [Lenis](https://lenis.darkroom.engineering)    | Smooth scrolling                         |
| [Tailwind CSS 4](https://tailwindcss.com)      | Utility-first styling                    |
| [Lucide React](https://lucide.dev)             | Icons                                    |
| TypeScript                                     | Type safety                              |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/Moncito/but-first-coffee.git
cd but-first-coffee

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with fonts & smooth scroll
│   └── page.tsx           # Home page
├── components/
│   ├── CoffeeCanvas.tsx   # Scrollytelling image sequence
│   ├── Cursor.tsx         # Custom cursor
│   ├── Features.tsx       # Features section
│   ├── FinalCTA.tsx       # Call to action section
│   ├── Footer.tsx         # Footer
│   ├── IntroLoader.tsx    # Loading animation
│   ├── Navbar.tsx         # Navigation bar
│   ├── SmoothScroll.tsx   # Lenis smooth scroll wrapper
│   └── Testimonials.tsx   # Testimonials section
public/
└── assets/
    └── coffee-sequence/   # Image frames for scroll animation
```

## 📜 License

This project is for personal/educational use.
