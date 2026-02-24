# Next.js Supabase Notes App

This project is a simple Notes application built with **Next.js 14**, **Shadcn UI**, and **Supabase**. It demonstrates a clean architecture separating the User Interface (UX), the Backend Service Layer, and the Database interaction.

## Project Structure & Architecture

This application strictly follows the **UX -> Backend Layer -> Database** pattern requested in the assignment.

### 1. UX Layer (Frontend)

- **File:** `app/page.tsx`
- **Role:** Handles user interaction and display.
- **Responsibility:**
  - Displays the input form and the list of notes.
  - Captures user input (typing a note) and events (clicking "Submit" or "Load").
  - **Does NOT** fetch data directly. It calls functions from the Backend Service Layer.
  - Updates local state (`notes`, `loading`) based on results from the service layer.

### 2. Backend Service Layer (Client-Side Logic)

- **File:** `lib/api/notes.ts`
- **Role:** Intermediary between the UI and the API.
- **Responsibility:**
  - Contains helper functions like `fetchNotes()` and `createNote()`.
  - Abstracts the `fetch` API calls (`GET`, `POST`) away from React components.
  - Handles network errors and response parsing, passing clean data back to the UI.

### 3. Database Layer (Server-Side API)

- **File:** `app/api/notes/route.ts`
- **Role:** Securely interacts with the database.
- **Responsibility:**
  - Receives requests from the Service Layer.
  - Securely connects to **Supabase** using server-side credentials.
  - Executes SQL queries (Select, Insert) on the `notes` table.
  - Returns data (or errors) as JSON responses.

---

## How It Works (Data Flow)

### Loading Notes

1. **UX**: User clicks "Load Notes" in `app/page.tsx`.
2. **Service**: `handleLoad` calls `fetchNotes()` from `lib/api/notes.ts`.
3. **API**: `fetchNotes()` sends a `GET` request to `/api/notes`.
4. **Database**: `app/api/notes/route.ts` queries Supabase for all notes.
5. **Display**: The data flows back up: `Database -> API -> Service -> UX`, and the UI updates state to display the list.

### Submitting a Note

1. **UX**: User types a note and clicks "Submit" in `app/page.tsx`.
2. **Service**: `handleSubmit` calls `createNote(text)` from `lib/api/notes.ts`.
3. **API**: `createNote()` sends a `POST` request to `/api/notes` with note content.
4. **Database**: `app/api/notes/route.ts` inserts the new note into Supabase.
5. **Update**: On success, the UI clears input and automatically triggers a reload.

## Getting Started

1. **Clone the repository.**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up Environment Variables:**
   Create a `.env.local` file with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Shadcn UI
- **Attributes**: Black background theme
- **Backend/DB**: Supabase
