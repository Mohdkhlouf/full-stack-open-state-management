# Anecdotes App — Full Stack Open, Part 6: State Management

A React application for creating, voting on, and filtering anecdotes, built while completing [Part 6 — State Management](https://fullstackopen.com/en/part6) of the [Full Stack Open](https://fullstackopen.com/en) course (University of Helsinki).

This part of the course focuses on moving state management out of individual components and into dedicated, testable layers — first with Redux, then Zustand, and finally combining client state with server state via TanStack Query.

## What this project covers

- **Global client state** managed with [Zustand](https://github.com/pmndrs/zustand), including the `devtools` middleware for inspecting state changes
- **Server state** (fetching, caching, and mutating anecdotes) managed with [TanStack Query](https://tanstack.com/query/latest), replacing manual `fetch`/`useEffect` data-fetching patterns
- **Cross-cutting notifications** implemented with the React **Context API**, decoupled from both the Zustand store and the query cache
- **Automated testing** at multiple levels:
  - Unit tests for the Zustand store (Vitest + React Testing Library, using `renderHook`/`act`)
  - End-to-end tests with **Playwright**, run against an isolated `json-server` test database to avoid polluting development data
- **Continuous Integration** via GitHub Actions, running lint and test checks on every push

## Architecture

The app follows a strict separation of concerns:

```
components/   → render UI and trigger actions only
store/        → Zustand store: coordinates logic, calls services
requests.js   → service layer: handles HTTP requests only
```

Each layer only knows about the layer directly below it — components never call the service layer directly, and the service layer never touches state.

## Tech stack

| Layer            | Tools |
|-------------------|-------|
| Frontend          | React, Vite |
| Client state       | Zustand |
| Server state       | TanStack Query |
| Cross-cutting state | React Context API |
| Backend (dev)      | json-server |
| Unit testing       | Vitest, React Testing Library |
| E2E testing        | Playwright |
| CI/CD              | GitHub Actions |

## Running the app locally

```bash
# install dependencies
npm install

# start the mock backend
npx json-server --port 3001 --watch db.json

# start the frontend
npm run dev
```

## Running tests

```bash
# unit tests
npm test

# end-to-end tests (Playwright)
npm run test:e2e
```

The Playwright suite serves a separate `db-test.json` via json-server on its own port, so end-to-end runs never interfere with local development data.

## Key concepts practiced

- Replacing prop-drilling with selector hooks (`useAnecdotes`, `useFilter`, `useNotification`, `useAnecdoteActions`)
- Avoiding mutating state directly (using `concat`/spread instead of `push`) to preserve React's reference-equality checks
- Handling async errors correctly with TanStack Query's `onError` callback, rather than relying on `try/catch` around `.mutate()` (which does not throw)
- Managing timers (auto-dismissing notifications) safely with `useEffect` and `useRef`, avoiding side effects during render

## Course

Part of the [Full Stack Open](https://fullstackopen.com/en) curriculum from the University of Helsinki — a free, open online course covering modern web development with JavaScript, React, Node.js, and related technologies.
