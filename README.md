# Pattern Decoder Game

A puzzle game where players decode hidden patterns from flashing visual signals.

URL: mindmatrix-pb.vercel.app

## How to Run Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Game Instructions

- Observe the 5x5 grid as squares flash for 10 seconds
- Decode the hidden pattern behind the flashing squares
- Select the squares you believe were flashing
- Progress through 7 increasingly complex levels
- Each level follows a different mathematical rule

## Tech Stack

- Next.js 14 with App Router
- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons

## Build for Production

```bash
npm run build
npm start
```

The built application will be optimized and ready for deployment.

## Deploy

This Next.js app can be easily deployed to:
- Vercel (recommended)
- Netlify
- Any platform that supports Node.js applications