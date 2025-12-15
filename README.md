# BirdiSkool - Healthcare Practice Growth Platform

## Overview

BirdiSkool is a marketing and business education platform designed specifically for healthcare professionals building private practices. The platform offers a three-tier product structure:
- Foundation: £5,000 + VAT upfront or £500/month for 12 months (£6,000 total) for £0-£100K earners
- Implementer: £5,500 + VAT upfront or £2,000/month for 3 months (£6,000 total) for £100K-£250K earners
- Conclave: £24,000 + VAT upfront or £2,400/month for 12 months (£28,800 total) invite-only for £250K+ earners
- BirdiSkool Core (CRM): £295/month (coming soon)

Built with Next.js 14 App Router, the site features a marketing-focused architecture with integrated form submissions to GoHighLevel, MDX-based blog content, and comprehensive SEO optimization.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: Next.js 14 with App Router
- **Rationale**: Provides server-side rendering for optimal SEO, built-in routing, and excellent performance. The App Router enables modern React patterns with server components.
- **Pros**: Superior SEO capabilities critical for marketing site, fast page loads, built-in optimization features
- **Cons**: Learning curve for App Router patterns, server/client component boundaries require careful planning

**UI Component System**: shadcn/ui + Radix UI primitives
- **Rationale**: shadcn/ui provides a comprehensive set of accessible, customizable components built on Radix UI primitives. Components are owned by the project (not a dependency), allowing full customization.
- **Styling**: Tailwind CSS with custom brand color variables
- **Brand Identity**: Custom color palette (Deep Indigo, Royal Blue, Emerald Green, Bright Gold) and typography (Playfair Display for headings, Inter for body, Montserrat for UI accents)

**State Management**: React Query (@tanstack/react-query)
- **Rationale**: Handles server state, caching, and data synchronization efficiently
- **Use Cases**: Form submissions, potential future API integrations

**Client-Side Routing**: Next.js built-in navigation (next/navigation)
- **Note**: The repository contains remnants of a previous Vite/React setup (wouter router in client/src/App.tsx) but the active architecture is Next.js App Router with pages in the `/app` directory

### Backend Architecture

**Server Framework**: Express.js (development server setup)
- **Current State**: Minimal backend implementation - server routes are stubbed in `server/routes.ts`
- **Purpose**: Development server wrapper for Vite middleware in development mode
- **Production**: Next.js handles server-side rendering and API routes

**API Routes**: Next.js API Routes (App Router pattern)
- **Implementation**: `/app/api/submit/route.ts` - handles form submissions
- **Pattern**: Route handlers using Next.js 14 conventions (GET, POST exported functions)

**Form Processing Pipeline**:
1. Client-side validation (Zod via react-hook-form)
2. Honeypot spam protection
3. Server-side validation in API route
4. Rate limiting checks (IP-based)
5. Forward to GoHighLevel webhook
6. Return success/error response

### Content Management

**Blog System**: MDX (Markdown + JSX)
- **Rationale**: Allows rich content with embedded React components while maintaining simplicity of Markdown authoring
- **Implementation**: `@next/mdx` with gray-matter for frontmatter parsing
- **Storage**: File-based in `/content/blog` directory (not created yet, but referenced in code)
- **Dynamic Routes**: `app/blog/[slug]/page.tsx` generates pages from MDX files

**Static Content**: Next.js page components in `/app` directory
- **Structure**: 
  - `/` - Homepage with hero, problem section, free scorecard CTA, three-tier product cards with payment toggles, and CRM section
  - `/foundation` - Foundation program (£5,000 upfront or £500/month × 12 for £0-£100K earners)
  - `/implementer` - Implementer program (£5,500 upfront or £2,000/month × 3 for £100K-£250K earners)
  - `/conclave` - Conclave elite mastermind (£24,000 upfront or £2,400/month × 12 invite-only for £250K+ earners)
  - `/crm` - CRM waitlist (£295/month coming soon)
  - Scorecard - External link to ScoreApp (https://inder-oatroyqt.scoreapp.com/)
  - `/about` - Founder story and authority
  - `/contact` - Contact form
  - `/blog` - Blog index and individual posts
  - `/privacy`, `/terms` - Legal pages

### Data Layer

**Database ORM**: Drizzle ORM configured for PostgreSQL
- **Current State**: Basic setup with minimal schema (users table only in `shared/schema.ts`)
- **Configuration**: `drizzle.config.ts` configured but database not actively used in current implementation
- **Database Provider**: Configured for Neon Database (`@neondatabase/serverless`)
- **Future Use**: Schema exists but the platform currently operates statelessly - designed for future user authentication and data persistence

**Session Management**: Placeholder for connect-pg-simple (dependency installed but not implemented)

**Storage Pattern**: 
- **In-Memory Storage**: `server/storage.ts` implements basic CRUD operations in memory (MemStorage class)
- **Interface-Based Design**: IStorage interface allows swapping between in-memory and database implementations
- **Current Reality**: Forms submit directly to GoHighLevel; no persistent storage actively used

### SEO & Analytics

**SEO Strategy**:
- **Metadata**: Next.js Metadata API for page-level SEO
- **Sitemap**: Dynamic XML sitemap at `/sitemap.xml/route.ts`
- **Robots.txt**: Dynamic robots.txt at `/robots.txt/route.ts`
- **Open Graph**: Configured OG images and tags for social sharing
- **Structured Data**: Metadata includes proper titles, descriptions, keywords per page

**Analytics Implementation**:
- **Provider**: Google Analytics 4 (GA4)
- **Setup**: Custom analytics library (`lib/analytics.ts`) with client-side initialization
- **Event Tracking**: trackEvent() and trackPageView() functions
- **Privacy**: GA4 measurement ID stored in environment variable (NEXT_PUBLIC_GA_ID)
- **Hook**: useAnalytics hook for automatic page view tracking on route changes

### Build & Deployment

**Build Process**:
- **Frontend**: Vite builds client assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Production Mode**: Next.js standalone output configured
- **Development**: Vite dev server with HMR

**Environment Configuration**:
- `GHL_WEBHOOK_URL` - GoHighLevel form submission endpoint
- `NEXT_PUBLIC_SITE_URL` - Base URL for sitemap/SEO
- `NEXT_PUBLIC_GA_ID` - Google Analytics tracking ID
- `DATABASE_URL` - PostgreSQL connection (configured but not actively used)

**Deployment Target**: Vercel-optimized (next.config.js includes `output: 'standalone'`)

## External Dependencies

### Third-Party Services

**GoHighLevel (GHL)**:
- **Purpose**: CRM and marketing automation platform
- **Integration**: Webhook-based form submission
- **Data Flow**: Contact forms → API route → GHL webhook
- **Forms Integrated**: Contact, Foundation application, Implementer application, Conclave application, CRM waitlist
- **Configuration**: Environment variable `GHL_WEBHOOK_URL`
- **Current Webhook**: https://services.leadconnectorhq.com/hooks/RtoqPxPep53XZGzzFCwS/webhook-trigger/1dde7c86-3f41-43d0-95b6-98c20b9d3d8c

**Google Analytics 4**:
- **Purpose**: Website analytics and user behavior tracking
- **Implementation**: Custom client-side library with gtag.js
- **Events Tracked**: Page views, CTA clicks, form submissions
- **Configuration**: `NEXT_PUBLIC_GA_ID` environment variable

**Neon Database** (Configured but inactive):
- **Type**: Serverless PostgreSQL
- **Package**: `@neondatabase/serverless`
- **Status**: Infrastructure configured but not actively used in current implementation
- **Future Use**: Designed for user accounts, session management, and data persistence

### Font Services

**Google Fonts**:
- **Fonts**: Playfair Display, Inter, Montserrat
- **Loading Strategy**: next/font/google with display: 'swap' for performance
- **CSS Variables**: Exposed via custom properties for consistent usage

### Development Tools

**Replit Integration**:
- **Cartographer**: Development navigation plugin
- **Dev Banner**: Development environment indicator
- **Error Modal**: Runtime error overlay for development
- **Condition**: Only loaded in development mode when REPL_ID exists

### UI Component Libraries

**Radix UI**: Headless component primitives (accordion, dialog, dropdown, toast, etc.)
- **Rationale**: Accessibility-first components with full styling control
- **Coverage**: ~30 component primitives installed

**shadcn/ui**: Component system built on Radix
- **Configuration**: `components.json` defines structure and conventions
- **Style**: "new-york" variant with neutral base color
- **Path Aliases**: Configured for clean imports (@/components, @/lib, @/hooks)

### Additional Libraries

- **react-hook-form** + **@hookform/resolvers**: Form state management and validation
- **zod**: Schema validation (via Drizzle and form validation)
- **date-fns**: Date manipulation and formatting
- **lucide-react**: Icon system
- **clsx** + **tailwind-merge**: Utility for conditional CSS classes
- **gray-matter**: Frontmatter parsing for MDX blog posts
- **next-mdx-remote**: MDX rendering for blog content
