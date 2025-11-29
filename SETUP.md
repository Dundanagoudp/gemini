# Next.js Setup Guide

This project has been migrated to **Next.js 15** with **TypeScript** and **Tailwind CSS**.

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Copy Assets

Copy all image assets from `src/assets/` to `public/assets/`:

```bash
# On Windows (PowerShell)
New-Item -ItemType Directory -Force -Path public/assets
Copy-Item -Path "src/assets/*.png" -Destination "public/assets/" -Force
Copy-Item -Path "src/assets/*.svg" -Destination "public/assets/" -Force
```

Or manually copy:
- All `.png` files from `src/assets/` to `public/assets/`
- All `.svg` files from `src/assets/` to `public/assets/`

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
gemini/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── gemini/        # Gemini API endpoint
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Main/             # Main chat component
│   └── Sidebar/          # Sidebar component
├── context/               # React Context
│   └── Context.tsx       # App context provider
├── assets/                # Asset paths configuration
│   └── assets.ts         # Asset exports
└── public/                # Static files
    └── assets/           # Image assets
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔄 Migration Notes

- **Vite** → **Next.js 15** (App Router)
- **JavaScript** → **TypeScript**
- **CSS Modules** → **Tailwind CSS**
- **Client-side Gemini API** → **Next.js API Route** (server-side)

## 📝 Key Changes

1. All components are now TypeScript (`.tsx`)
2. Styling uses Tailwind CSS utility classes
3. Gemini API calls are made through `/api/gemini` route
4. Uses Next.js Image component for optimized images
5. Client components marked with `'use client'` directive

