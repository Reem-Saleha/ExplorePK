# ExplorePK — Pakistan Tourism & Events Portal
## Web Technologies Project Report

**Submitted by:** Reem Saleha  
**Course:** Web Technologies  
**Date:** May 2026  
**Technology Stack:** MERN (MongoDB · Express.js · React · Node.js) + Google Gemini AI

---

---

# Table of Contents

1. Introduction and Motivation
2. GitHub Repository
3. Description of the Website
4. Description of the Website Layout & Responsiveness
5. Page-by-Page Screenshots & Descriptions
6. Functional Requirements
7. Non-Functional Requirements
8. System Architecture
9. Database Design
10. Security Implementation
11. Conclusion

---

---

# 1. Introduction and Motivation

## 1.1 Background

Pakistan is a country of extraordinary natural, historical, and cultural richness. From the towering peaks of the Karakoram mountain range in the north to the ancient archaeological ruins of Mohenjo-daro in the south, from the grandeur of Mughal architecture in Lahore to the azure glacial lakes of Kaghan Valley — Pakistan offers some of the most breathtaking tourism destinations in the world. Yet, despite this abundance, the country's tourism industry remains significantly underrepresented in the digital space. Travelers, both domestic and international, often struggle to find a centralized, modern, and reliable source of information about Pakistani attractions and events.

Existing tourism websites for Pakistan are frequently outdated, fragmented, or limited in functionality. Most focus solely on static directory listings with no user interaction, no community feedback mechanism, and no way to discover or register for local events. There is a clear and pressing gap for a full-featured, modern, and interactive tourism platform tailored specifically for Pakistan.

## 1.2 Motivation

The motivation behind **ExplorePK** stems directly from this gap. The goal was to build a platform that does not merely list destinations but creates a living, community-driven ecosystem for Pakistani tourism. The following pain points drove the design decisions:

- **Lack of centralization:** Information about Pakistani attractions is scattered across dozens of websites, travel blogs, and social media pages. A single authoritative source was needed.
- **No community voice:** Travelers have no organized platform to leave reviews, rate attractions, or share experiences within the Pakistani tourism context.
- **Event discovery problem:** Local cultural, food, music, and sports events — like the Shandur Polo Festival or Lahore Literary Festival — are poorly advertised online, with no centralized RSVP or registration system.
- **Outdated technology:** Most Pakistan tourism websites use outdated HTML/CSS-only approaches with no dynamic data or user interaction.
- **No AI-powered trip planning:** Travelers must manually piece together itineraries from multiple sources. No Pakistan-specific intelligent travel assistant existed to provide personalized, contextual guidance.

## 1.3 Objectives

ExplorePK was developed with the following objectives:

1. Provide a **curated, searchable directory** of Pakistan's top tourist attractions categorized by type (historical, natural, religious, adventure, cultural).
2. Enable a **live events platform** where users can discover upcoming Pakistani events and register (RSVP) online.
3. Build a **user authentication system** supporting both regular visitors and platform administrators.
4. Allow authenticated users to **write and manage reviews** with star ratings for attractions.
5. Provide administrators with a **full content management system (CMS)** to add, edit, and delete attractions and events.
6. Display **real-time statistics** about the platform's content and user engagement.
7. Ensure the platform is **fully responsive** — usable on mobile phones, tablets, and desktops alike.
8. Integrate a **Gemini AI-powered travel assistant (TravelBot)** that provides personalized trip planning, itinerary suggestions, and travel advice for Pakistan — available to all visitors on every page.
9. Display **bookable nearby hotel information** on each attraction detail page, linking directly to accommodation booking platforms.

## 1.4 Target Audience

- **Domestic tourists** looking to discover new places within Pakistan.
- **International travelers** planning a visit to Pakistan.
- **Event organizers** wanting to publicize Pakistani cultural and recreational events.
- **Students and researchers** interested in Pakistan's cultural and historical heritage.

---

# 2. GitHub Repository

**Repository URL:** [https://github.com/Reem-Saleha/ExplorePK](https://github.com/Reem-Saleha/ExplorePK)

The repository contains the full source code for both the frontend (React client) and backend (Node.js/Express server) of the ExplorePK platform.

### Repository Structure

```
ExplorePK/
├── client/                  # React frontend application
│   ├── public/              # Static assets and index.html
│   ├── src/
│   │   ├── components/      # Reusable UI components (incl. TravelBot)
│   │   ├── context/         # React Context (Auth)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page-level components
│   │   ├── styles/          # CSS stylesheets (incl. travelbot.css)
│   │   └── utils/           # Axios instance and helpers
│   └── package.json
├── server/                  # Node.js/Express backend API
│   ├── config/              # Database connection
│   ├── controllers/         # Route handler logic (incl. aiController)
│   ├── middleware/          # Auth and error middleware
│   ├── models/              # Mongoose data models
│   ├── routes/              # Express API routes (incl. aiRoutes)
│   ├── seeder.js            # Database seed script
│   └── server.js            # Application entry point
├── .gitignore
└── README.md
```

---

# 3. Description of the Website

## 3.1 Overview

ExplorePK is a **full-stack, single-page web application** built on the MERN stack with Google Gemini AI integration. It is organized around two primary content domains — **Attractions** and **Events** — and provides a complete user experience from discovery through engagement (reviews, RSVPs) to AI-assisted trip planning and administration (content management).

The website is structured into the following major sections:

| Section | Type | Access |
|---|---|---|
| Home / Landing Page | Public | All visitors |
| Attractions Directory | Public | All visitors |
| Attraction Detail | Public | All visitors |
| Events Directory | Public | All visitors |
| Event Detail | Public | All visitors |
| User Registration & Login | Public | Unauthenticated users |
| User Dashboard | Protected | Logged-in users |
| Admin Dashboard | Protected | Admin users only |
| Add / Edit Attraction | Protected | Admin users only |
| Add / Edit Event | Protected | Admin users only |
| TravelBot AI Chat | Public | All visitors (floating widget) |

## 3.2 Content Organization

### 3.2.1 Home Page

The home page serves as the primary entry point and marketing surface for the platform. It is organized into five distinct sections:

1. **Hero Section** — A full-viewport animated image carousel featuring five stunning photographs of Pakistan (Lahore's iconic Pakistan Monument, mountain landscapes, folk art, Faisal Mosque, and scenic valleys). Images auto-rotate every 5 seconds with smooth crossfade transitions. A Ken Burns (slow zoom) animation plays on each active slide. The hero contains the platform tagline, a global search bar, and primary call-to-action buttons. Slide dot indicators allow manual navigation between images. A "Scroll to explore" animated arrow indicator appears at the bottom.

2. **Statistics Strip** — A dynamic data strip displaying four live platform metrics fetched from the API: total attractions, total events, registered users, and total event RSVPs. These numbers are not hardcoded — they reflect real database state.

3. **Featured Attractions** — A responsive grid of six attraction cards pulled from the database, each displaying an image, category badge, city, name, description excerpt, and star rating.

4. **Upcoming Events** — A responsive grid of four event cards showing upcoming Pakistani events, each with event image, category, pricing, date, and seat availability.

5. **Explore by Category** — Five category pills (Historical, Natural, Religious, Adventure, Cultural) that act as filter shortcuts, navigating directly to the attractions page with the selected category pre-applied.

### 3.2.2 Attractions Section

The attractions section consists of two pages:

**Attractions Listing Page** — Features a left-side filter panel and a right-side paginated grid. Users can filter by:
- **Text search** (name or description)
- **City** (dropdown populated from available data)
- **Category** (Historical, Natural, Religious, Adventure, Cultural)

Results are paginated at six per page with Previous/Next navigation. A result count is shown at all times.

**Attraction Detail Page** — A full-detail view with:
- **Image gallery** with main image and clickable thumbnail strip
- **Google Maps embed** showing the exact location coordinates
- **Information panel** with category, name, city, average star rating, full description, timings, and a **Nearby Hotels section** showing hotel cards with name, price range badge, star rating, and a "Book Now" button linking to Booking.com
- **Reviews section** with a write-review form (for authenticated users) and all submitted community reviews displayed as cards

### 3.2.3 Events Section

The events section also consists of two pages:

**Events Listing Page** — Features tabbed category filters at the top and a filter bar with:
- **City dropdown** (Filter Cities label)
- **Date range** (FROM date and TO date pickers with clear labels)
- **Clear Filters** button (appears only when filters are active)

**Event Detail Page** — Displays:
- Event image, title, and category badge
- Metadata: date, time, venue, city
- A real-time **seat availability progress bar** showing remaining seats vs. total capacity
- **RSVP / Register button** for authenticated users (disabled when fully booked)
- **View on Map** button that opens a Google Maps modal showing the event venue location
- Pricing information (Free or PKR amount)

### 3.2.4 TravelBot AI Assistant

**TravelBot** is a floating chat widget that appears on every page of ExplorePK. It is powered by the **Google Gemini API (gemini-2.5-flash model)** and called securely from the Express backend — the API key is never exposed to the client.

Key features:
- **Floating toggle button** — fixed bottom-right, always accessible without interrupting page content
- **Multi-turn conversation** — maintains full conversation history so follow-up questions work correctly
- **Quick suggestion pills** — four pre-set prompts ("Plan a 3-day trip to Lahore", "Best places in northern Pakistan", etc.) shown on first open to guide new users
- **Typing indicator** — three animated bouncing dots while the AI generates a response
- **Pakistan-specific system prompt** — TravelBot is constrained to Pakistan tourism only; it never suggests non-Pakistani destinations
- **Markdown formatting** — bold text from AI responses is rendered correctly in the chat bubble
- **Mobile responsive** — expands to near-fullscreen on small devices

### 3.2.5 User Account System

**Registration Page** — Collects name, email, password, and password confirmation. Client-side validation checks password length (minimum 6 characters) and confirms both password fields match before submission.

**Login Page** — Standard email/password login with JWT-based authentication. Demo credentials are displayed on the page for testing purposes.

**User Dashboard** — A tabbed personal dashboard with:
- **My Registrations tab** — Table listing all events the user has registered for, with status badges and clickable event links
- **My Reviews tab** — List of all reviews the user has written, with the attraction name, star rating, comment, and date

### 3.2.6 Admin Panel

The admin panel is accessible only to users with the `admin` role and provides full content management:

**Admin Dashboard** — Shows four platform-wide statistics cards, quick-action buttons for content creation, a recent registrations table, and a full user management interface with the ability to delete user accounts.

**Add/Edit Attraction Form** — Full-featured form with fields for name, city, category, description, timings, nearby hotels (comma-separated), image URLs, and geographic coordinates (latitude/longitude) for map integration.

**Add/Edit Event Form** — Full-featured form with fields for title, description, category, city, venue, latitude, longitude, date, time, total seats, image URLs, and a free/paid toggle with price input.

---

# 4. Description of the Website Layout & Responsiveness

## 4.1 Overall Layout Philosophy

ExplorePK follows a **component-based layout architecture** enabled by React. The entire application is wrapped in a persistent shell consisting of:

- **Navbar** (always visible at top)
- **Main content area** (page-specific content rendered by React Router)
- **Footer** (always visible at bottom)
- **TravelBot widget** (floating, always mounted outside the route tree — persists across all page navigations without re-mounting)

This creates a consistent visual frame across all pages while allowing the central content to change dynamically without full page reloads.

## 4.2 Grid System

The layout relies on **Bootstrap 5's 12-column responsive grid system**. Column widths are defined using Bootstrap's responsive breakpoint classes:

| Breakpoint | Class Prefix | Screen Width |
|---|---|---|
| Extra Small (mobile) | `col-` | < 576px |
| Small | `col-sm-` | ≥ 576px |
| Medium (tablet) | `col-md-` | ≥ 768px |
| Large (desktop) | `col-lg-` | ≥ 992px |

A typical example from the attractions grid:
```jsx
<div className="col-md-6 col-lg-4">
  <AttractionCard attraction={a} />
</div>
```
This renders as a single column on mobile, two columns on tablet, and three columns on desktop — automatically.

## 4.3 Design System & Theming

All visual styling is driven by a centralized set of **CSS custom properties (variables)** defined in `main.css`:

```css
:root {
  --primary:      #1B6CA8;   /* Ocean Blue  — brand primary */
  --primary-dark: #0F4C81;   /* Dark Blue   — hover states  */
  --accent:       #E8A838;   /* Gold/Amber  — highlights    */
  --dark:         #0F2940;   /* Navy        — headings      */
  --light-bg:     #F5F7FA;   /* Off-white   — backgrounds   */
  --text:         #2C3E50;   /* Dark grey   — body text     */
  --radius:       12px;      /* Rounded corners             */
  --shadow:       0 4px 20px rgba(0,0,0,0.08);
}
```

This means changing a single variable updates the entire application's color scheme consistently. The TravelBot widget also consumes these same CSS variables — it matches the platform's visual identity perfectly without duplicating any color values.

**Typography** uses two Google Fonts:
- **Playfair Display** (serif) for headings and titles — evoking elegance and cultural richness
- **Nunito** (sans-serif) for body text and UI elements — ensuring readability

Font sizes use the CSS `clamp()` function for fluid typography that scales smoothly between screen sizes:
```css
font-size: clamp(2.8rem, 7vw, 5.5rem);
```

## 4.4 Navbar Responsiveness

The Navbar uses Bootstrap's `navbar-expand-lg` class, which:
- Displays a **full horizontal menu** on large screens (desktop)
- Collapses to a **hamburger menu icon** on smaller screens
- The hamburger expands to a vertical dropdown menu when tapped on mobile

On mobile, the Login and Register buttons are wrapped in a dedicated `.epk-auth-btns` flex container with `flex-wrap: nowrap` — this ensures they always appear side by side and never overlap or merge, even on the smallest screens.

The navbar is **auth-aware**: it displays different links based on the user's authentication state and role, switching between Login/Register buttons and a user dropdown menu.

## 4.5 Hero Section Layout

The hero section is entirely `position: relative` with `height: 100vh` (full viewport height). All child elements are `position: absolute`, allowing:
- The background image slides to stack freely
- The content to be centered with flexbox
- The scroll indicator and dot controls to anchor to specific positions

On mobile, the CTA buttons stack vertically and center-align (max-width 280px each) so they never crowd the screen horizontally.

## 4.6 Card Grid Responsiveness

All card grids (Attractions, Events, Categories) use Bootstrap's responsive column classes. On a mobile device, cards stack to a single column. On tablets they form two columns. On desktops they form three or four columns depending on the section.

## 4.7 Form Layouts

Both the Add/Edit Attraction and Add/Edit Event forms use Bootstrap's `row g-3` grid inside the form, creating a two-column layout on larger screens and collapsing to single-column on mobile. Labels, inputs, and buttons all use Bootstrap form classes styled with custom CSS for consistent appearance.

## 4.8 Detail Page Layout

Both Attraction Detail and Event Detail use Bootstrap's two-column layout (`col-lg-7` / `col-lg-5`) which stacks vertically on small screens. This ensures:
- On desktop: Image gallery/map on the left, info card on the right
- On mobile: Image first, then info card below — natural reading order

## 4.9 TravelBot Widget Layout

The TravelBot widget uses `position: fixed` throughout — it floats independently of page scroll. On desktop it is 380×520px. On mobile (max-width 480px) it expands to `100vw` width and `75vh` height, providing a near-fullscreen chat experience. Open/close is animated with CSS `transform: translateY` and `opacity` transitions for smooth appearance.

---

# 5. Page-by-Page Screenshots & Descriptions

## 5.1 Home Page — Hero Section

**Description:** The first thing a visitor sees is a full-viewport hero featuring a cinematic slideshow of five Pakistan photographs. The hero text "Discover the / Soul of Pakistan" is rendered in a large serif font with the second line in gold accent color. A "Pakistan Tourism" pill badge sits above the title. Below the title is the global search bar (a white pill-shaped input with blue search button), followed by two CTA buttons: "Explore Attractions" (gold) and "Browse Events" (outlined white). At the bottom of the hero, five dot indicators show the current slide, and a bouncing arrow invites scrolling. As the user scrolls, the hero content fades out and the image subtly parallax-scrolls.

**Key interactive elements:**
- Auto-rotating image slideshow (5 slides, 5-second interval)
- Ken Burns slow zoom on each active slide
- Scroll-based parallax and content fade
- Clickable slide dot indicators
- Functional global search bar

## 5.2 Home Page — Statistics Strip

**Description:** Immediately below the hero, a deep blue strip displays four real-time statistics fetched from `/api/stats`. The numbers are displayed in large gold text (2.5rem, bold) with white labels beneath. The four metrics shown are: total number of attractions in the database, total events, total registered users, and total event RSVPs. This section establishes credibility and communicates platform scale to new visitors.

## 5.3 Home Page — Featured Attractions

**Description:** A section with the heading "Featured Attractions" and subtitle "Handpicked gems from across Pakistan." Six attraction cards are displayed in a responsive 3-column grid (desktop) / 2-column (tablet) / 1-column (mobile) layout. Each card shows the attraction's photograph, a color-coded category badge, the city name with a map pin icon, the attraction title, a 100-character description excerpt, and a star rating with review count. A "View All Attractions" button at the bottom links to the full listing page.

## 5.4 Home Page — Upcoming Events

**Description:** Similarly structured to the attractions section but displaying four upcoming events in a 4-column grid (desktop). Each event card shows the event image, a free/paid badge, the category badge, the event date, city, title, and a compact seat availability progress bar showing how many seats remain. A "View All Events" button links to the full events listing.

## 5.5 Home Page — Category Pills

**Description:** Five rounded category pills in a row, each color-coded and containing an icon above a label: Historical (yellow, bank icon), Natural (green, tree icon), Religious (blue, moon-stars icon), Adventure (red, activity icon), Cultural (purple, music note icon). Clicking any pill navigates to the attractions page with that category pre-selected as a filter.

## 5.6 Attractions Listing Page

**Description:** A two-panel layout — a left sidebar with filter controls (text search input, city dropdown, category buttons) and a right main area with the attractions grid. The total result count ("X attractions found") is displayed above the grid. If no results match the filters, an empty state is shown with an icon and helpful message. Pagination controls at the bottom allow navigation through results (6 per page). The URL updates with filter parameters, making filtered views bookmarkable.

## 5.7 Attraction Detail Page

**Description:** A rich detail page in two-column layout. The left column features the image gallery: a large main image at top with smaller thumbnail images below that update the main image on click. Below the gallery, a Google Maps iframe is embedded showing the attraction's precise geographic location. The right column contains the info card: category badge, attraction name, city (with map pin), star rating display with numeric score and review count, full description, opening timings, and a **Nearby Hotels section** displaying hotel cards — each showing the hotel name, a gold price range badge (e.g. "PKR 1,500–2,500/night"), star rating, and a "Book Now" button that opens Booking.com in a new tab. Below both columns, the reviews section shows all community reviews and — for logged-in users — a write-review form.

## 5.8 Events Listing Page

**Description:** At the top, horizontal tab buttons allow filtering by category (All, Cultural, Music, Sports, Youth, Food, Other). Below is a filter row with three labeled inputs: "Filter Cities" (dropdown), "FROM" (date picker), and "TO" (date picker). The FROM/TO labels are styled in the same uppercase, small, bold, primary-blue font for visual consistency. A "Clear Filters" button appears when any filter is active. The event grid below shows cards with images, badges, titles, seat availability bars, and view buttons.

## 5.9 Event Detail Page

**Description:** Similar two-column layout to attraction detail. The left column shows the event's primary image and an "About This Event" description. The right column's info card includes the category badge, event title, and a metadata list: calendar date (formatted in full — e.g., "Monday, 7 July 2026"), clock time, venue name, city, and a "View on Map" button (shown only when coordinates are stored). A color-coded seat availability progress bar shows fill percentage (green when available, red when nearly full). Below the bar, the RSVP button allows logged-in users to register. Logged-out users see a "Login to Register" prompt. Clicking "View on Map" opens a Bootstrap modal containing a Google Maps iframe of the venue, with a footer link to open the full Google Maps page.

## 5.10 Login Page

**Description:** A centered card layout with the ExplorePK branding, email and password inputs styled with the custom `.epk-input` class, a "Login" button, a link to the register page, and demo credential hints displayed in a info box (for testing purposes). Form validation provides inline error messages for incorrect credentials.

## 5.11 Register Page

**Description:** Similar card layout to login, with four fields: Full Name, Email, Password, and Confirm Password. Client-side validation ensures passwords are at least 6 characters and match before the form is submitted. On successful registration, the user is automatically logged in and redirected to the home page.

## 5.12 User Dashboard

**Description:** A personalized dashboard greeting the user by name with a large avatar circle showing their name initial. Two tabs are shown: "My Registrations" and "My Reviews." The Registrations tab shows a table of all events the user has registered for, with event name (clickable link), registration date, and status badge (Confirmed/Cancelled). The Reviews tab lists all reviews the user has written, each showing the attraction name link, star rating, comment text, and date.

## 5.13 Admin Dashboard

**Description:** Four statistics cards at the top (matching the home page stats strip), followed by quick-action buttons (Add Attraction, Add Event, View Attractions, View Events). Two tabs below: "Recent Registrations" showing a full table of all RSVPs across all events, and "Manage Users" showing a table of all registered users with name, email, role badge (Admin/User), and a red Delete button for each non-admin user.

## 5.14 Add / Edit Attraction Form

**Description:** A full form card with the title "Add New Attraction" or "Edit Attraction." Fields are organized in a responsive grid: Name (8 cols) and Category (4 cols) on the first row, City (6 cols) and Timings (6 cols) on the second row, Description (full width) as a textarea, Images as a comma-separated URL input, Nearby Hotels as a comma-separated text input, and Latitude/Longitude as paired number inputs for map integration. A submit button and a Cancel button are at the bottom.

## 5.15 Add / Edit Event Form

**Description:** Similar structure to the attraction form. Fields include: Event Title and Category in the first row, City and Venue in the second row, Latitude/Longitude/Date/Time in a four-column row, Description textarea, Image URLs, a Free Event checkbox, and a conditional Price field that appears only when the event is marked as paid.

## 5.16 TravelBot AI Chat Widget

**Description:** A floating blue circle button (robot icon) sits at the bottom-right corner of every page. Clicking it opens the TravelBot chat panel — a 380×520px card with a dark-blue header ("TravelBot" with a green online indicator), a scrollable messages area, and an input row at the bottom. On first open, four quick-suggestion pills are displayed below the welcome message: "Plan a 3-day trip to Lahore", "Best places in northern Pakistan", "Upcoming events in Islamabad", and "Budget travel tips for Pakistan." Users can click a pill or type freely. While the AI generates a response, three animated bouncing dots (typing indicator) appear. The AI's responses support **bold text** formatting and structured Day 1/Day 2 itinerary layouts. On mobile the panel expands to near-fullscreen for comfortable reading.

---

# 6. Functional Requirements

Functional requirements describe what the system **does** — the specific behaviors and features it must provide.

## 6.1 User Management

| ID | Requirement | Implementation |
|---|---|---|
| FR-01 | Users shall be able to register with name, email, and password | `POST /api/auth/register` with bcrypt password hashing |
| FR-02 | Users shall be able to log in with email and password | `POST /api/auth/login` returning a signed JWT |
| FR-03 | The system shall maintain user sessions using JWT tokens | Token stored in `localStorage`, sent as `Authorization: Bearer` header |
| FR-04 | Users shall have one of two roles: `user` or `admin` | Role field in User model, enforced by `roleMiddleware` |
| FR-05 | Admins shall be able to delete user accounts | `DELETE /api/admin/users/:id` with `adminOnly` middleware |
| FR-06 | Users shall be able to view their own registrations and reviews | `GET /api/users/my-registrations`, `GET /api/users/my-reviews` |

## 6.2 Attractions

| ID | Requirement | Implementation |
|---|---|---|
| FR-07 | All visitors shall be able to browse attractions | `GET /api/attractions` — public endpoint |
| FR-08 | Attractions shall be filterable by search text, city, and category | Query parameters processed in `attractionController` |
| FR-09 | Each attraction shall have a dedicated detail page | `GET /api/attractions/:id` returns attraction + reviews |
| FR-10 | Attraction detail shall show the location on Google Maps | `location.lat` + `location.lng` used in Google Maps embed iframe |
| FR-11 | Admins shall be able to create, update, and delete attractions | `POST`, `PUT`, `DELETE /api/attractions` with `adminOnly` |
| FR-12 | Attractions shall display average rating and total review count | Recalculated automatically on every review add/delete |
| FR-13 | Attraction detail shall show bookable nearby hotels with pricing | `hostels[]` array in Attraction model; rendered as cards with Booking.com links |

## 6.3 Events

| ID | Requirement | Implementation |
|---|---|---|
| FR-14 | All visitors shall be able to browse events | `GET /api/events` — public endpoint |
| FR-15 | Events shall be filterable by category, city, and date range | Query parameters: `category`, `city`, `dateFrom`, `dateTo` |
| FR-16 | Each event shall have a dedicated detail page | `GET /api/events/:id` |
| FR-17 | Authenticated users shall be able to RSVP to events | `POST /api/events/:id/register` with duplicate prevention |
| FR-18 | Events shall enforce seat capacity limits | `registeredCount` checked against `totalSeats` before registration |
| FR-19 | Event location shall be viewable on Google Maps in a modal | Google Maps embed modal triggered by "View on Map" button |
| FR-20 | Admins shall be able to create, update, and delete events | `POST`, `PUT`, `DELETE /api/events` with `adminOnly` |

## 6.4 Reviews

| ID | Requirement | Implementation |
|---|---|---|
| FR-21 | Authenticated users shall be able to write one review per attraction | Unique compound index on `(user, attraction)` in Review model |
| FR-22 | Reviews shall include a star rating (1–5) and optional comment | `rating` (required), `comment` (optional) fields |
| FR-23 | The attraction's average rating shall update on every review change | Recalculated in `addReview` and `deleteReview` controllers |
| FR-24 | Review authors and admins shall be able to delete reviews | Ownership check: `review.user === req.user._id \|\| req.user.role === 'admin'` |
| FR-25 | All visitors shall be able to read reviews on attraction pages | `GET /api/reviews/attraction/:id` — public endpoint |

## 6.5 AI Trip Planning (TravelBot)

| ID | Requirement | Implementation |
|---|---|---|
| FR-26 | All visitors shall be able to access the AI travel assistant | `POST /api/ai/chat` — public endpoint, no authentication required |
| FR-27 | TravelBot shall maintain multi-turn conversation context | Last 10 messages sent as `conversationHistory` on every request |
| FR-28 | TravelBot shall be constrained to Pakistan tourism topics | Detailed system prompt embedded in `aiController.js` at the backend |
| FR-29 | TravelBot shall provide itinerary suggestions and travel tips | Gemini gemini-2.5-flash model called via Google Generative Language API |

## 6.6 Search & Navigation

| ID | Requirement | Implementation |
|---|---|---|
| FR-30 | A global search bar shall navigate to attractions with query applied | `SearchBar` component navigates to `/attractions?search=query` |
| FR-31 | Attraction list shall support text search | Server-side MongoDB regex query on `name` and `description` fields |
| FR-32 | The system shall provide breadcrumb navigation on detail pages | Breadcrumb `<nav>` with links to Home and listing pages |
| FR-33 | Category pills on the home page shall deep-link to filtered attraction lists | Links to `/attractions?category=X` |

## 6.7 Platform Statistics

| ID | Requirement | Implementation |
|---|---|---|
| FR-34 | The home page shall display real-time platform statistics | `GET /api/stats` — public endpoint, no authentication required |
| FR-35 | Statistics shall include total attractions, events, users, and RSVPs | Aggregated with `Model.countDocuments()` |

---

# 7. Non-Functional Requirements

Non-functional requirements describe **how** the system behaves — its quality attributes.

## 7.1 Performance

| ID | Requirement | Implementation |
|---|---|---|
| NFR-01 | API responses shall be returned within 2 seconds under normal load | Express async handlers with efficient Mongoose queries |
| NFR-02 | The frontend shall avoid unnecessary re-renders | React `useState` / `useEffect` with correct dependency arrays |
| NFR-03 | Scroll event listeners shall not block the main thread | `{ passive: true }` flag on `addEventListener('scroll', ...)` |
| NFR-04 | Image-heavy components shall lazy-load where possible | Native browser lazy-loading via `loading="lazy"` on images |
| NFR-05 | Hero image transitions shall remain smooth (60fps) | CSS `will-change: transform, opacity` declared on slide elements |
| NFR-06 | TravelBot conversation history shall be capped to avoid token overuse | Last 10 messages only sent to Gemini API per request |

## 7.2 Security

| ID | Requirement | Implementation |
|---|---|---|
| NFR-07 | Passwords shall never be stored in plain text | bcryptjs with salt rounds for hashing |
| NFR-08 | API routes shall be protected with JWT authentication | `protect` middleware verifies token on every protected request |
| NFR-09 | Admin-only operations shall require role verification | `adminOnly` middleware checks `req.user.role === 'admin'` |
| NFR-10 | Environment secrets shall not be committed to version control | `.env` listed in `.gitignore`; credentials loaded via `dotenv` |
| NFR-11 | CORS shall restrict API access to known origins | CORS configured with explicit `origin` allowlist |
| NFR-12 | Users shall only be able to delete their own reviews | Ownership enforced in `deleteReview` controller before deletion |
| NFR-13 | JWT tokens shall expire after a defined period | `JWT_EXPIRE=7d` configured in environment variables |
| NFR-14 | Gemini API key shall never be exposed to the client | All Gemini calls made server-side in `aiController.js`; key stored in `.env` only |

## 7.3 Usability

| ID | Requirement | Implementation |
|---|---|---|
| NFR-15 | The application shall be fully usable on mobile, tablet, and desktop | Bootstrap 5 responsive grid throughout all pages |
| NFR-16 | All interactive elements shall provide visual feedback on hover/focus | CSS `transition` on all buttons, cards, inputs, and links |
| NFR-17 | Loading states shall be clearly communicated to the user | `<Spinner />` component shown during all API fetch operations |
| NFR-18 | Error messages shall be displayed inline and be descriptive | `alert alert-danger` blocks with API error messages passed through |
| NFR-19 | The navigation bar shall always indicate the user's authentication state | Auth-aware Navbar switches between Login/Register and user dropdown |
| NFR-20 | Empty states shall provide guidance rather than blank pages | Custom empty-state UI with icons and actionable messages |
| NFR-21 | Form validation feedback shall appear before API calls where possible | Client-side validation in Register, AddEditAttraction, AddEditEvent |
| NFR-22 | TravelBot shall display a typing indicator while AI response loads | Three CSS-animated bouncing dots shown during API call |
| NFR-23 | Navbar Login/Register buttons shall never overlap on any screen size | `.epk-auth-btns` flex container with `flex-wrap: nowrap` enforced in CSS |

## 7.4 Reliability

| ID | Requirement | Implementation |
|---|---|---|
| NFR-24 | All asynchronous API operations shall handle errors gracefully | `try/catch` in all `useEffect` hooks; server uses `express-async-handler` |
| NFR-25 | The database shall prevent duplicate registrations and reviews | Unique compound indexes in MongoDB models |
| NFR-26 | The seat booking system shall prevent over-registration | Server-side count check before accepting new RSVP |
| NFR-27 | Global error handler shall catch unhandled exceptions | `errorMiddleware.js` mounted as last Express middleware |
| NFR-28 | TravelBot shall display a friendly error message on API failure | Catch block in `TravelBot.jsx` shows "Sorry, I'm having trouble connecting" |

## 7.5 Maintainability

| ID | Requirement | Implementation |
|---|---|---|
| NFR-29 | Styling shall use a centralized design token system | CSS custom properties in `main.css` used across all stylesheets including `travelbot.css` |
| NFR-30 | Repeated UI patterns shall be extracted into reusable components | `AttractionCard`, `EventCard`, `ReviewCard`, `Spinner`, `SearchBar`, `TravelBot` |
| NFR-31 | All HTTP requests shall go through a single configured Axios instance | `client/src/utils/api.js` — single instance with `baseURL` and interceptors |
| NFR-32 | Authentication logic shall be centralized | `AuthContext.jsx` + `useAuth` hook used consistently across components |
| NFR-33 | Environment-specific configuration shall be externalized | `dotenv` for server; `REACT_APP_` env vars pattern for client |

## 7.6 Scalability

| ID | Requirement | Implementation |
|---|---|---|
| NFR-34 | Database queries shall support filtering to avoid fetching all records | Query parameters applied at Mongoose level, not filtered in JavaScript |
| NFR-35 | Attraction listing shall paginate results | Server-side `skip()` and `limit()` with page parameter |
| NFR-36 | The system shall support multiple concurrent users | Stateless JWT authentication — no server-side sessions |

---

# 8. System Architecture

## 8.1 Architecture Overview

ExplorePK follows the **MERN stack architecture** — a three-tier architecture consisting of:

1. **Presentation Tier** — React Single Page Application (SPA)
2. **Application Tier** — Node.js + Express.js RESTful API
3. **Data Tier** — MongoDB hosted on MongoDB Atlas (cloud)
4. **AI Layer** — Google Gemini API called from the application tier

```
┌─────────────────────────────────────────┐
│           CLIENT (Browser)              │
│   React SPA (port 3000 in dev)          │
│   ┌─────────┐  ┌─────────┐             │
│   │  Pages  │  │Components│            │
│   └────┬────┘  └────┬────┘             │
│        └─────┬───────┘                 │
│         Axios HTTP                      │
└──────────────┼──────────────────────────┘
               │ HTTP/JSON (REST API)
┌──────────────┼──────────────────────────┐
│    SERVER (Node.js + Express, port 5000)│
│   ┌────────┐ ┌────────┐ ┌───────────┐  │
│   │ Routes │→│Contrlrs│→│ Middleware │  │
│   └────────┘ └────┬───┘ └───────────┘  │
│              aiController               │
│                   │ Mongoose ODM        │
└──────┬────────────┼─────────────────────┘
       │            │ MongoDB Wire Protocol
       │ HTTPS  ┌───┼─────────────────────┐
       │        │  MongoDB Atlas (Cloud)  │
       ↓        │  users, attractions,    │
  Google Gemini │  events, reviews,       │
  API (v1beta)  │  registrations          │
                └─────────────────────────┘
```

## 8.2 API Design

The backend follows RESTful conventions consistently:

- `GET` — Read / list resources
- `POST` — Create new resources
- `PUT` — Update existing resources
- `DELETE` — Remove resources

All API responses use JSON format. Error responses include a `message` field. Authentication is passed as `Authorization: Bearer <token>` in HTTP headers.

The AI endpoint (`POST /api/ai/chat`) is a public endpoint that accepts `{ message, conversationHistory }` and proxies the request to Google Gemini, keeping the API key server-side only.

## 8.3 State Management

The frontend uses **React's built-in state management** without external libraries:

- **Local state** (`useState`) — per-component UI state (form values, loading flags, active tab)
- **Context API** (`AuthContext`) — global authentication state shared across all components
- **URL state** (`useSearchParams`) — filter state on listing pages, making filters bookmarkable and shareable

---

# 9. Database Design

## 9.1 Collections and Schemas

ExplorePK uses **5 MongoDB collections** managed through Mongoose ODM schemas.

### Users Collection
Stores all registered users. Passwords are hashed before storage using bcryptjs.

```
users {
  _id:       ObjectId (auto)
  name:      String (required)
  email:     String (required, unique)
  password:  String (hashed, required)
  role:      "user" | "admin"
  createdAt: Date
}
```

### Attractions Collection
Stores all tourist attraction entries with geographic coordinates and bookable hotel data.

```
attractions {
  _id:           ObjectId (auto)
  name:          String (required)
  city:          String (required)
  category:      "historical"|"natural"|"religious"|"adventure"|"cultural"
  description:   String (required)
  images:        [String]  (array of URLs)
  location:      { lat: Number, lng: Number }
  timings:       String
  nearbyHotels:  [String]
  hostels:       [{ name, bookingUrl, priceRange, rating }]
  averageRating: Number (recalculated dynamically)
  totalReviews:  Number (recalculated dynamically)
  createdBy:     ObjectId → users
  createdAt:     Date
}
```

### Events Collection
Stores all event entries including seat tracking fields.

```
events {
  _id:             ObjectId (auto)
  title:           String (required)
  description:     String
  category:        "cultural"|"music"|"sports"|"youth"|"food"|"other"
  city:            String
  venue:           String
  date:            Date (required)
  time:            String
  images:          [String]
  totalSeats:      Number
  registeredCount: Number (incremented on each RSVP)
  isFree:          Boolean
  price:           Number
  location:        { lat: Number, lng: Number }
  createdBy:       ObjectId → users
  createdAt:       Date
}
```

### Reviews Collection
Stores user reviews. A **unique compound index** on `(user, attraction)` enforces the one-review-per-user-per-attraction rule at the database level.

```
reviews {
  _id:        ObjectId (auto)
  user:       ObjectId → users (required)
  attraction: ObjectId → attractions (required)
  rating:     Number 1–5 (required)
  comment:    String
  createdAt:  Date
}
Unique Index: { user: 1, attraction: 1 }
```

### Registrations Collection
Tracks event RSVPs. A **unique compound index** on `(user, event)` prevents duplicate registrations.

```
registrations {
  _id:          ObjectId (auto)
  user:         ObjectId → users (required)
  event:        ObjectId → events (required)
  registeredAt: Date
  status:       "confirmed" | "cancelled"
}
Unique Index: { user: 1, event: 1 }
```

## 9.2 Relationships

```
users ──────────────────< reviews
users ──────────────────< registrations
attractions ────────────< reviews
events ─────────────────< registrations
```

All relationships use MongoDB ObjectId references and are resolved via Mongoose's `.populate()` method when needed.

---

# 10. Security Implementation

## 10.1 Authentication Flow

ExplorePK uses **JSON Web Token (JWT)** based authentication:

1. User submits credentials to `POST /api/auth/login`
2. Server validates email and password (bcrypt comparison)
3. Server issues a signed JWT with the user's ID and role embedded
4. Client stores the JWT in `localStorage` under key `epk_token`
5. All subsequent protected requests include the token in the `Authorization: Bearer <token>` header
6. The `protect` middleware verifies the token signature using `JWT_SECRET` and attaches the user object to `req.user`

## 10.2 Role-Based Access Control (RBAC)

Two middleware functions enforce access control:

```javascript
// protect — any authenticated user
const protect = asyncHandler(async (req, res, next) => {
  // Verifies JWT, attaches req.user
});

// adminOnly — administrators only
const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    res.status(403);
    throw new Error('Admin access required');
  }
  next();
};
```

Routes are composed: `router.post('/', protect, adminOnly, handler)` — a request must pass both middleware before reaching the handler.

## 10.3 Password Security

- Passwords are hashed using **bcryptjs** before storage
- The salt is generated per-user using bcrypt's built-in salt generation
- Password comparison uses bcrypt's constant-time `compare()` function (prevents timing attacks)
- Raw passwords are never stored, logged, or returned in API responses

## 10.4 Review Deletion Authorization

The delete review endpoint implements **ownership verification** at the controller level:

```javascript
const isOwner = review.user.toString() === req.user._id.toString();
const isAdmin = req.user.role === 'admin';
if (!isOwner && !isAdmin) {
  res.status(403);
  throw new Error('Not authorised to delete this review');
}
```

## 10.5 AI API Key Security

The Google Gemini API key is stored exclusively in the server-side `.env` file and accessed only within `aiController.js`. It is never sent to or accessible by the React client. All AI requests flow through the Express backend:

```
Client → POST /api/ai/chat → aiController.js → Gemini API (key from process.env)
```

This means even if a user inspects network traffic, they only see requests to `localhost:5000/api/ai/chat` — never the Gemini API key.

---

# 11. Conclusion

## 11.1 Summary of Achievements

ExplorePK represents a complete, production-ready web application that successfully addresses the identified gap in Pakistan's digital tourism landscape. Over the course of its development, the following was achieved:

- **A full-stack MERN application** with 11 pages, 9 reusable components, 7 API route modules, and 5 database models
- **A complete authentication and authorization system** using JWT and role-based access control
- **A dynamic content management system** allowing administrators to fully manage all platform content
- **A community review system** where visitors can share experiences and ratings, with proper ownership controls
- **An event registration platform** with real-time seat tracking and capacity enforcement
- **Google Maps integration** on both attraction and event detail pages for geographic context
- **A Gemini AI-powered TravelBot** floating chat assistant — the platform's most innovative feature — providing Pakistan-specific trip planning, itinerary generation, and travel advice to all visitors on every page
- **Bookable nearby hotel cards** on attraction detail pages with real pricing data and direct Booking.com links
- **A cinematic hero section** with a 5-image parallax slideshow, Ken Burns animation, and smooth scroll interactions
- **Full mobile responsiveness** across all 11 pages using Bootstrap 5's grid system, fluid typography, and carefully tested mobile breakpoints
- **Real-time platform statistics** displayed on the home page, fetched live from the database

## 11.2 Technical Highlights

Several technical decisions are worth highlighting as particularly strong:

1. **Stateless architecture** — Using JWT instead of server-side sessions makes the backend horizontally scalable and simplifies deployment.

2. **CSS custom properties** — The centralized design token system in `main.css` means the entire application's visual theme — including the TravelBot widget — can be updated by changing a handful of variables. The TravelBot consumes the same `--primary`, `--accent`, and `--dark` variables as the rest of the platform.

3. **URL-driven filter state** — Using `useSearchParams` (React Router) for filter state on listing pages means filtered views are bookmarkable, shareable, and work correctly with the browser Back button.

4. **Automatic rating recalculation** — Rather than storing ratings on reviews and aggregating at query time, the attraction's `averageRating` and `totalReviews` are recalculated on every review add or delete, keeping the listing pages fast.

5. **Database-level uniqueness enforcement** — Using MongoDB's unique compound indexes (not just application-level checks) for reviews and registrations ensures data integrity even under concurrent requests.

6. **Hero slideshow performance** — Rather than switching a single background image (which doesn't animate), all 5 slide divs are rendered stacked in the DOM with CSS `opacity` transitions between them, achieving a smooth crossfade without JavaScript-triggered style recalculations.

7. **Server-side AI proxy** — Rather than calling the Gemini API directly from React (which would expose the API key in the browser), all AI requests are proxied through the Express backend. The `aiController.js` constructs the full Gemini payload including the system prompt and conversation history, keeping sensitive configuration entirely server-side.

8. **TravelBot conversation history cap** — Only the last 10 messages are sent to Gemini per request. This prevents token-limit errors on long conversations while maintaining sufficient context for coherent multi-turn dialogue.

## 11.3 Future Enhancements

Given more development time, the following features would further strengthen ExplorePK:

- **Full-text search with Elasticsearch** for more powerful search across attractions and events
- **Image upload directly to Cloudinary** rather than URL-based input
- **Email notifications** for event registration confirmation using Nodemailer
- **Travel itinerary builder** allowing users to plan multi-day trips combining multiple attractions — TravelBot could generate these and save them to the user's dashboard
- **Multi-language support** (Urdu / English) to serve Pakistan's domestic audience
- **Payment gateway integration** (JazzCash, EasyPaisa) for paid event ticket purchases
- **Progressive Web App (PWA)** support for offline browsing and home screen installation
- **Admin analytics dashboard** with charts showing user growth and registration trends over time
- **TravelBot memory** — saving conversation context to the user's profile so TravelBot remembers past preferences across sessions

## 11.4 Closing Remarks

ExplorePK demonstrates the practical application of modern full-stack web development principles: component-based frontend architecture, RESTful API design, NoSQL database modeling, token-based authentication, AI integration, and responsive UI design — all applied to a meaningful real-world problem. The platform not only meets the technical requirements of the course project but delivers genuine value as a concept product that could serve Pakistan's tourism industry.

The project reflects thoughtful design decisions at every layer: from database schema constraints that enforce business rules, to CSS animations that create emotional impact, to role-based middleware that enforces security boundaries, to a server-side AI proxy that keeps credentials safe. The result is a platform that is simultaneously technically sound, visually compelling, and intelligently assisted — a portal worthy of Pakistan's extraordinary attractions.

---

---

*Report prepared for Web Technologies course — ExplorePK Pakistan Tourism Portal*  
*Full source code available at the GitHub repository linked in Section 2*

---
