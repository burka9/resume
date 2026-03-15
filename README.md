# Biruk Ephrem's Portfolio Website

A modern, full-stack portfolio and resume platform built with Astro, featuring dark/light themes, smooth page transitions, contact form with Telegram notifications, and automatic PDF resume generation.

## Features

- **Responsive Design** - Mobile-first approach with fluid layouts
- **Dark/Light Theme** - Toggle with localStorage persistence
- **View Transitions** - Smooth page navigation animations
- **Dynamic Content** - SQLite-powered projects, experience, and skills
- **Contact Form** - Saves to database with Telegram bot notifications
- **PDF Resume Generation** - Automatic resume PDF creation from markdown and database
- **Server-Side Rendering** - Fast initial page loads with Astro SSR

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Astro 5.1.0 |
| **Styling** | TailwindCSS 3.4.0 |
| **Database** | SQLite (better-sqlite3) |
| **PDF Generation** | PDFKit |
| **Process Manager** | PM2 |
| **CI/CD** | GitHub Actions |
| **Web Server** | Nginx (reverse proxy) |

## Project Structure

```
├── src/
│   ├── components/        # Reusable Astro components
│   ├── pages/             # Routes and API endpoints
│   │   ├── api/           # Contact form API
│   │   └── projects/      # Dynamic project pages
│   ├── layouts/           # Base layout with header/footer
│   ├── lib/               # Database, PDF generator, utilities
│   └── styles/            # Global TailwindCSS styles
├── db/
│   ├── schema.sql         # Database schema
│   ├── seed.sql           # Initial data
│   ├── init.js            # Database initialization
│   └── update.js          # Update script (preserves contacts)
├── scripts/
│   └── generateResume.ts  # PDF resume generator
├── public/                # Static assets
├── .github/workflows/     # CI/CD pipeline
└── ecosystem.config.cjs   # PM2 configuration
```

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install

# Initialize the database
npm run db:init

# Start development server
npm run dev
```

The development server runs at `http://localhost:3000`

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run db:init` | Initialize database with seed data |
| `npm run db:update` | Update content (preserves contact messages) |
| `npm run build:resume` | Generate PDF resume |

## Database Schema

The SQLite database contains five tables:

- **projects** - Portfolio projects with tech stack, links, and descriptions
- **experiences** - Work history with roles, companies, and timelines
- **skills** - Technical skills organized by category
- **websites** - Built websites showcase
- **contact_messages** - Form submissions from visitors

## Deployment

### Production Build

```bash
# Build the project
npm run build

# The output is in the dist/ directory
```

### PM2 Deployment

```bash
# Install production dependencies
npm install --omit=dev

# Update database content
npm run db:update

# Start with PM2
pm2 start ecosystem.config.cjs --env production
```

### Nginx Configuration

A sample Nginx configuration is provided in `nginx.conf.sample`. Key features:

- Reverse proxy to Node.js server (port 4321)
- WebSocket upgrade support
- Real IP forwarding for logging

## API Endpoints

### POST /api/contact

Handles contact form submissions.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automates:

1. Build and test
2. Database initialization
3. Artifact creation and upload via SCP
4. Zero-downtime deployment with symlinks
5. PM2 restart
6. Cleanup of old releases (keeps 5 most recent)

## Customization

### Theme Colors

Edit `tailwind.config.mjs` to customize the color palette:

```js
colors: {
  accent: '#f97316',        // Orange accent
  'accent-hover': '#ea580c', // Darker orange on hover
  // ...
}
```

### Content Updates

1. Update database content in `db/seed.sql`
2. Run `npm run db:init` (fresh) or `npm run db:update` (preserve contacts)
3. For resume changes, edit `resume.md` and run `npm run build:resume`

## License

MIT License - feel free to use this as a template for your own portfolio.

## Author

**Biruk Ephrem** - DevOps Engineer & Full Stack Developer

- Website: [birukephrem.com](https://birukephrem.com)
- GitHub: [@burka](https://github.com/burka)
- Email: birukeph@gmail.com
