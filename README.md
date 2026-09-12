# PROVEN

> Every physical asset deserves a history.

PROVEN is a **B2B SaaS platform for businesses that manage physical assets**.

It gives every physical asset a **digital identity and a verifiable history**, allowing businesses to register assets, track their condition, attach evidence, record lifecycle events, and generate QR codes that open a public asset passport.

**Identity → Condition → Evidence → Timeline**

---

## 🚀 What is PROVEN?

Businesses that manage physical assets often lack a reliable record of what happened to an asset, when it happened, and what condition it was in.

PROVEN solves this by giving every asset its own **digital passport**.

For example, a camera rental company can register a **Canon EOS R6**, record its condition, upload inspection photos, track rental and return events, record servicing, and generate a QR code.

Anyone who scans the QR code can view the asset's public passport.

> **The QR code isn't the product. It's the doorway to the asset's history.**

---

## ✨ Core Features

### Asset Management

- Create physical assets
- Assign unique PROVEN IDs
- Categorize assets
- Track condition
- Track asset status
- Edit asset information
- Search and filter assets

### Digital Asset Passport

Every asset has a public passport containing:

- Asset identity
- PROVEN ID
- Category
- Current condition
- Current status
- Photo evidence
- Lifecycle history

The public passport can be viewed without requiring the visitor to log in.

### Lifecycle Timeline

Businesses can record events such as:

- Inspection
- Rental
- Return
- Servicing
- Maintenance
- Other events

Condition and status changes are also recorded in the asset history.

### Evidence

Businesses can upload photographs as evidence for an asset.

Evidence is securely stored using Supabase Storage and displayed in the asset's private workspace and public passport.

### QR Codes

Every asset can generate a QR code linking directly to its public passport.

```text
QR Code
   ↓
Public Asset Passport
   ↓
Identity + Condition + Evidence + Timeline
```

### Business Dashboard

The dashboard provides an overview of:

- Total assets
- Active assets
- Assets under maintenance
- Assets needing attention
- Recent activity
- Quick asset-management actions

---

## 🔄 Product Flow

The core PROVEN workflow is:

```text
CREATE ASSET
      ↓
RECORD CONDITION
      ↓
ADD EVIDENCE
      ↓
GENERATE QR
      ↓
SCAN QR
      ↓
VIEW PUBLIC PASSPORT
      ↓
ADD LIFECYCLE EVENT
      ↓
HISTORY UPDATES
```

---

## 🎯 Example Use Case

### Camera Rental Company

A camera rental company registers a **Canon EOS R6** in PROVEN.

The company can:

1. Register the camera
2. Assign a unique PROVEN ID
3. Record its initial condition
4. Upload inspection photographs
5. Record a rental event
6. Record the return
7. Record servicing or maintenance
8. Update the condition when necessary
9. Generate a QR code
10. Attach the QR code to the physical camera

A customer or staff member can scan the QR code and immediately view the asset's public passport.

The passport provides a clear record of:

**What the asset is → What condition it is in → What evidence exists → What happened to it**

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Web application framework |
| React | User interface |
| JavaScript | Application language |
| Tailwind CSS | Styling |
| Supabase PostgreSQL | Database |
| Supabase Auth | Authentication |
| Google OAuth | User sign-in |
| Supabase Storage | Evidence and photo storage |
| QRCode | QR code generation |
| Vercel | Deployment |

---

## 📁 Project Structure

```text
proven/
│
├── app/
│   ├── dashboard/
│   │   └── page.js
│   │
│   ├── assets/
│   │   ├── [id]/
│   │   │   ├── edit/
│   │   │   │   └── page.js
│   │   │   └── page.js
│   │   │
│   │   ├── new/
│   │   │   └── page.js
│   │   │
│   │   └── page.js
│   │
│   ├── login/
│   │   └── page.js
│   │
│   ├── passport/
│   │   └── [token]/
│   │       └── page.js
│   │
│   ├── globals.css
│   ├── layout.js
│   └── page.js
│
├── lib/
│   ├── supabase.js
│   └── supabaseAdmin.js
│
├── public/
├── .gitignore
├── package.json
└── README.md
```

---

## 🗄️ Data Architecture

PROVEN uses **Supabase PostgreSQL** for structured application data.

The main tables are:

### `assets`

Stores the identity and current state of each asset.

Includes information such as:

- Asset ID
- User ID
- PROVEN ID
- Name
- Category
- Condition
- Status
- Public token
- Creation and update timestamps

### `asset_events`

Stores the lifecycle history of assets.

Includes:

- Event type
- Event title
- Description
- Asset reference
- User reference
- Timestamp

### `asset_evidence`

Stores metadata for uploaded evidence.

Includes:

- Asset reference
- User reference
- File name
- File path
- File type
- Timestamp

---

## 🔐 Security

PROVEN uses Supabase's authentication, authorization, and storage capabilities to protect private business data.

Security measures include:

- Google OAuth authentication
- Supabase Row Level Security (RLS)
- User-specific database access
- Private evidence storage
- Signed URLs for evidence images
- Server-side access for public passport data

The Supabase secret key is kept server-side and must **never** be exposed in client-side code.

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
SUPABASE_SECRET_KEY=your_supabase_secret_key
```

**Never commit `.env.local` to GitHub.**

The project uses:

```text
.env*
```

in `.gitignore` to prevent environment files and secrets from being committed.

---

## 💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/bhrithiraina/proven.git
```

### 2. Enter the project

```bash
cd proven
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create:

```text
.env.local
```

and add the required Supabase environment variables.

### 5. Start the development server

```bash
npm run dev
```

The application will run at:

```text
http://localhost:3000
```

---

## 🧪 Production Build

To verify that the project can be built for production:

```bash
npm run build
```

To run the production build locally:

```bash
npm start
```

---

## 🌐 Deployment

PROVEN is designed to be deployed using **Vercel**.

The deployment flow is:

```text
GitHub
   ↓
Vercel
   ↓
Next.js Production Build
   ↓
PROVEN
```

The following environment variables must be configured in Vercel:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
SUPABASE_SECRET_KEY
```

After deployment, the production URL must be configured for:

- Supabase Authentication
- Google OAuth
- Authentication redirect URLs

---

## 💼 Business Model

PROVEN is designed as a **B2B SaaS product**.

Potential subscription plans can be based on:

- Number of assets
- Number of users
- Evidence storage
- Advanced reporting
- Analytics
- Automation
- Enterprise integrations

The core value is helping businesses maintain a **reliable, verifiable history of their physical assets**.

---

## 🔮 Future Roadmap

Potential future capabilities include:

- AI-assisted asset inspections
- Automated condition analysis
- Asset health scoring
- Maintenance reminders
- Advanced analytics
- Inspection reports
- Team and organization workspaces
- Asset transfer workflows
- Enterprise APIs
- IoT integrations
- Compliance and audit reports

These features are intentionally outside the current MVP.

---

## 🎯 MVP

The current MVP focuses on proving the core asset-history workflow.

### Included

- Google authentication
- Asset creation
- Asset editing
- Asset search and filtering
- Condition tracking
- Status tracking
- Lifecycle events
- Photo evidence
- Digital asset passports
- QR code generation
- Public passport access
- Business dashboard
- Supabase database
- Secure evidence storage

### Not part of the MVP

- Blockchain
- Cryptocurrency
- IoT hardware
- Complex AI systems
- Marketplace
- Integrated payments

The focus is on validating the core product before adding advanced capabilities.

---

## 🧭 Product Philosophy

PROVEN is built around four simple questions:

### Identity

**What is this asset?**

### Condition

**What state is it in?**

### Evidence

**What proves its condition?**

### Timeline

**What happened to it over time?**

Together:

```text
IDENTITY
    +
CONDITION
    +
EVIDENCE
    +
TIMELINE
    =
PROVEN
```

---

## 🚀 Vision

PROVEN aims to become the **digital identity and history layer for physical assets**.

From cameras and laptops to industrial equipment and rental inventory, every physical asset should have a trustworthy digital record.

> **Every physical asset deserves a history.**