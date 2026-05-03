# Fruit Stories

Fruit Stories is a full-stack web application built with Next.js and MongoDB.  
It allows users to discover fruit stories, add new fruits, edit existing stories, delete stories, and save favorite fruits in a voted list.

## Features

- Display a list of fruit stories
- View the details of each fruit
- Add a new fruit story
- Edit an existing fruit story
- Delete a fruit story
- Select favorite fruits
- Save voted fruits in MongoDB
- Keep voted fruits after refreshing the page

## Technologies Used

- Next.js
- React
- TypeScript
- MongoDB
- Tailwind CSS

## Project Structure

```text
next-story/
├── app/
│   ├── api/
│   │   ├── stories/
│   │   └── votedStories/
│   ├── components/
│   ├── stories/
│   ├── votedStories/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── mongodb.ts
│   ├── stories.ts
│   └── votedStories.ts
├── public/
│   ├── 1.jpg
│   ├── 2.jpg
│   └── ...
├── package.json
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/devReact/next-story.git
cd next-story
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env.local` file in the root of the project:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=your_database_name
```

Do not commit `.env.local` to GitHub.

## Run the Development Server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Available Pages

```text
/                    Home page
/stories             Fruit stories list
/stories/new         Add a new story
/stories/[id]        Story details
/stories/[id]/edit   Edit a story
/votedStories        Favorite fruits selection
```

## API Routes

```text
POST   /api/stories
PATCH  /api/stories/[id]
DELETE /api/stories/[id]

GET    /api/votedStories
POST   /api/votedStories
DELETE /api/votedStories/[id]
```

## Author

Created by devReact.
