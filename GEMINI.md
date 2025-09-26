# Gemini Code Assistant Context

This document provides context for the Gemini Code Assistant to understand the tdnewauthproject project.

## Project Overview

This is a web application built with Vite, React, TypeScript, and Tailwind CSS. It uses Supabase for the backend, including authentication and database storage. The core feature of the application is a "Link Work Area" that allows users to create and customize a public-facing links page, similar to Linktree or Carrd. The project is managed by a platform called "Lovable," which appears to be a service for building and deploying web applications.

The application has the following key features:

*   **User Authentication:** Users can sign up and log in using Supabase authentication.
*   **Link Work Area:** A protected area where authenticated users can customize their public-facing page. This includes:
    *   Choosing a unique handle for their page URL.
    *   Customizing the theme, fonts, colors, and button styles.
    *   Adding and managing a list of links.
    *   Adding other content like a booking email, image URL, shop URL, and custom text.
*   **Public Creator Pages:** The customized pages are publicly accessible at `/:handle`.
*   **Waitlist:** A pre-launch waitlist for users to sign up for early access.

## Building and Running

To build and run this project, you will need to have Node.js and pnpm installed.

1.  **Install Dependencies:**

    ```bash
    pnpm install
    ```

2.  **Set up Environment Variables:**

    Copy the `.env.local.sample` file to `.env.local` and fill in your Supabase project's URL and anon key.

    ```bash
    cp .env.local.sample .env.local
    ```

    ```
    # .env.local
    VITE_SUPABASE_URL=https://<your-ref>.supabase.co
    VITE_SUPABASE_ANON_KEY=<your-anon-key>
    ```

3.  **Set up the Database:**

    The database schema is defined in `DATABASE_SCHEMA.md`. You can use the SQL in this file to set up your Supabase database. The `supabase/migrations` directory also contains the database migrations.

4.  **Run the Development Server:**

    ```bash
    pnpm run dev
    ```

    The application will be available at `http://localhost:5192`.

## Development Conventions

*   **Frameworks and Libraries:**
    *   Vite for the build tool and development server.
    *   React for the UI library.
    *   TypeScript for static typing.
    *   Tailwind CSS for styling.
    *   Supabase for the backend.
    *   Vitest for testing.
*   **Directory Structure:**
    *   `src/`: Contains the main application source code.
    *   `src/pages/`: Contains the top-level page components.
    *   `src/components/`: Contains reusable UI components.
    *   `src/lib/`: Contains utility functions and the Supabase client initialization.
    *   `supabase/`: Contains database-related files, including migrations.
    *   `public/`: Contains static assets.
*   **Styling:** The project uses Tailwind CSS for styling. The configuration is in `tailwind.config.ts`. The theme is highly customized with brand colors, gradients, and shadows.
*   **State Management:** The `ThemeContext` is used to manage the theme state for the "Link Work Area" and the public-facing pages.
*   **Routing:** Routing is handled by `react-router-dom`. The routes are defined in `src/App.tsx`.
*   **Database:** The database schema is well-documented in `DATABASE_SCHEMA.md`. The project uses Supabase for the database, and the schema includes tables for a waitlist, signup requests, and user profiles.
*   **Testing:** The project uses Vitest for testing. Test files are located next to the files they are testing (e.g., `LinkButton.test.tsx`).
## Route Map

- / → Index
- /auth → Auth
- /work/link → WorkLink
- /creator-signup → CreatorSignup
- /customize/:handle → CustomizePage
- /:handle → CreatorPage
- * → NotFound
