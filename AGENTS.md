# Site4Site

## Stack
- React + TypeScript
- TanStack Router
- TanStack Query
- Express
- MongoDB
- Mongoose
- Tailwind CSS
- shadcn/ui

## Commands
- npm run dev
- npm run lint
- npm test

## Code Style
- Prefer async/await
- Use TypeScript strict mode
- Do not use `any`
- Keep controllers focused

## Backend Rules
- Validate all inputs
- Return APIError for expected errors
- Protect private routes with requireAuth
- Use Mongoose models

## Frontend Rules
- Use TanStack Query for server state
- Don't fetch inside components with `fetch`
- Use existing UI components before adding new ones

## Never
- Commit `.env`
- Hardcode secrets
- Edit generated files