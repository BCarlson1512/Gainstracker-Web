# GainsTracker

## Roadmap (AKA: A long todo list)

- Design UI
  - ~~Create Workouts~~
  - ~~Log Workouts~~
  - ~~View Workouts~~
  - User Statistics
- ~~Design API~~
- ~~Settle on DB for project~~
- ~~Determine cloud deployment (Vercel)~~

## The Why

- I'm a huge fitness guru, and until now, i've been utilizing a mix of the old school pen and paper method and the notes app on my phone to track my progressive overload
- Instead of utilizing the notes app, which becomes really hard to manage, I thought why not build a better system

## The Stack

- The primary stack chosen for this project mirrors the T3 stack, created by Theo Browne. (https://create.t3.gg/)
- T3 Leverages the following technologies/languages

### Typescript

- It's 2023... not to bash the javascript devs, but if you haven't switched to ts it's time
- This is the primary lang used within this project

### TailwindCSS

- TLDR: Ease of use like a component library, styling freedom of CSS. This library aggregates css properties into groups which are processed using className

### NextJS

- A server-side framework for React.js, primarily used for the flexibility to use SSR and ability to build an API into our web application

### TRPC

- A middleware used primarily to ensure typesafe interactions from both the client and server side

### Prisma

- Similar to an ORM. When used with TRPC, ensures full type safety from the API to database

### ChartJS

- There's still not a great wrapper used for D3 and react, so for any sort of graphing/charting of data this is my go to library

### Clerk

- Authentication made simple

### MongoDB

- Prefer a flexible schema for a project like this, rather than making tons of RDBMS changes

## Contributions

- See an issue with the app? Make an issue on the respective project (Web/Mobile)
- Issues already exist and you want to jump in? Pick up an issue and make a PR
