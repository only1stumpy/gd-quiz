# GD Quiz

A fun and interactive quiz game where players test their knowledge of Geometry Dash's hardest levels by ranking them from most difficult to easiest.

## About

GD Quiz challenges players to rank the most legendary and brutal levels from the Geometry Dash demon list. Watch YouTube showcases of incredible gameplay, then drag and drop levels to create your own difficulty ranking. Compare your rankings with the official demon list to see how well you know the game!

## Features

- **1300+ Hardest Levels** from the official Geometry Dash demon list
- **Interactive Drag & Drop** interface for ranking levels
- **YouTube Integration** - Watch level showcases before ranking
- **Multiple Game Modes** - Easy, Normal, Hard, and Custom difficulties
- **Bilingual Support** - Full support for English and Russian
- **Real-time Scoring** - Compare your rankings with official difficulty ratings
- **Responsive Design** - Works great on desktop and mobile devices
- **Share Your Quiz** - Generate unique links to share custom quizzes with friends

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Drag & Drop:** @dnd-kit
- **Animations:** @formkit/auto-animate
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics & Speed Insights

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database (or use Vercel Postgres)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gd-quiz-update.git
cd gd-quiz-update
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your database credentials:
```env
DATABASE_URL="your_postgres_connection_string"
POSTGRES_URL="your_postgres_connection_string"
PRISMA_DATABASE_URL="your_prisma_accelerate_url"
NEXT_PUBLIC_ADSENSE_ID="your_adsense_id" # Optional
```

4. Generate Prisma Client and push schema:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
gd-quiz-update/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # API routes
│   │   ├── quiz/         # Quiz pages
│   │   └── privacy/      # Privacy policy
│   ├── components/       # React components
│   ├── functions/        # Utility functions
│   ├── hooks/           # Custom React hooks
│   ├── store/           # Zustand state management
│   ├── types/           # TypeScript types
│   └── lib/             # Libraries (Prisma client)
├── prisma/              # Prisma schema
└── public/              # Static assets
```

## API Routes

- `GET /api/levels` - Fetch all embeddable levels from demon list
- `POST /api/seed` - Create a new quiz seed
- `GET /api/seed/get` - Retrieve quiz by seed and mode

## Environment Variables

See `.env.example` for all available environment variables:

- **DATABASE_URL** - PostgreSQL connection string
- **PRISMA_DATABASE_URL** - Prisma Accelerate connection URL
- **NEXT_PUBLIC_ADSENSE_ID** - Google AdSense Publisher ID (optional)
- **NEXT_PUBLIC_SITE_URL** - Your site URL (for production CORS)

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Manual Deployment

```bash
npm run build
npm start
```

## Security

Please review [SECURITY.md](SECURITY.md) for important security guidelines, especially regarding:
- Environment variable management
- Database security
- API security measures

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Community

Join our community:
- [Discord Server](https://discord.gg/H4EU4KvSkR)
- [Telegram](https://t.me/only1stumpyy)

## License

This project is open source and available under the MIT License.

## Credits

- Level data from [Geometry Dash Demon List](https://api.demonlist.org)
- Built with [Next.js](https://nextjs.org)
- Deployed on [Vercel](https://vercel.com)

---

Made with by [only1stumpy](https://github.com/yourusername)
