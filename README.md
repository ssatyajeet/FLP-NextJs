# Next.js Data Fetching Demo

This project demonstrates different data fetching strategies in Next.js 13+ with Server Components, Client Components, and API Routes.

## Features

- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Client-side data fetching with SWR
- API Routes
- CSS Modules
- Dark Mode Support
- TypeScript
- Responsive Design

## Data Fetching Implementations

1. **Server Components**
   - Server-side rendering
   - Automatic caching
   - Revalidation
   - SEO friendly

2. **Client Components**
   - Real-time updates with SWR
   - Loading states
   - Error handling
   - Optimistic UI

3. **Individual Blog Pages**
   - Dynamic routes
   - SSR with metadata
   - Author information
   - SEO optimization

## Getting Started

```bash
# Clone the repository
git clone https://github.com/ssatyajeet/FLP-NextJs.git

# Navigate to the project directory
cd FLP-NextJs

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── blog/
│   │   │   └── [id]/
│   │   ├── client/
│   │   ├── server/
│   │   ├── users/
│   │   └── page.tsx
│   ├── components/
│   │   ├── Navigation/
│   │   ├── Posts/
│   │   └── Users/
│   └── types/
│       └── blog.ts
├── public/
└── package.json
```

## Technologies Used

- Next.js 13+
- React
- TypeScript
- SWR
- CSS Modules
- Tailwind CSS

## API Integration

The project uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for demonstration purposes:
- Posts API
- Users API
- Comments API

## Contributing

Feel free to submit issues and enhancement requests.
