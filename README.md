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
