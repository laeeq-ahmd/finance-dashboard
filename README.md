# FinanceDash

A clean, responsive, and data-driven finance dashboard built with React, demonstrating frontend architecture, state management, and modern UX patterns.

## Overview of Approach

The core goal of this project was to build an interface that feels genuinely **realistic and thoughtful**—not overly engineered, but incredibly robust, accessible, and ready to scale.

1. **Modern Stack**: Developed using a modern **React + Vite** stack for optimal build speeds and modularity.
2. **State Management**: Implemented **Zustand** instead of Redux or raw Context API. This significantly reduced boilerplate and natively solved persistence by utilizing the `persist` middleware, automatically caching user transactions and dark-mode preferences directly into `localStorage`.
3. **Responsive Architecture**: The UI is intensely modular. Utilizing **Tailwind CSS**, bloated legacy CSS files were abandoned in favor of unified frontend utility classes. Advanced flexible mechanics ensure the dashboard gracefully cascades into highly functional mobile layouts.
4. **Resilient UX**: Real-world edge cases were proactively addressed. A custom layout `ErrorBoundary` wraps the highest application root to gracefully catch hypothetical render failures seamlessly, preventing traditional "White Screen" React crashes. 

## Explanation of Features

* **Visual Overview**: Dynamic *Recharts* implementations (Line & Pie charts) map balance trends and expenditure categorizations locally, utilizing explicit dark mode logic to automatically adapt their tooltip elements based on the global theme.
* **Transaction Table**: An interactive data grid featuring live text search string-matching, integrated Type/Category dropdown filtering logic, and bidirectional temporal column sorting.
* **Role-Based Access Control**: Toggling the application role to "Admin" exclusively enables a tightly validated "+ Add Transaction" routing module globally and conditionally exposes granular "Delete" functionalities across historic records.
* **CSV Data Exporting**: Highly robust spreadsheet exporting logic guaranteeing strict string injection to proactively prevent native Microsoft Excel data-corruption/date-overflow glitches.
* **Deep Dark Mode Integration**: A flawlessly integrated toggleable Dark Mode. Advanced engineering configurations include intercepting Tailwind's explicit `v4` styling engine using `@custom-variant` mapping, and globally injecting `color-scheme: dark` to forcibly instruct native Operating Systems to render native calendar UI popups correctly.
* **Headless Dropdowns**: To guarantee pixel-perfect UI/UX consistency, generic Native OS `<select>` HTML behaviors were abandoned. They were rewritten from the ground up as custom dynamic React interactive layers utilizing absolute DOM positioning and explicit outside-click window listeners.
* **Auto-Scrolling Sticky Navigation**: An intelligent mobile-responsive "pill menu" securely acts as the primary layout anchor navigating through logical application zones, seamlessly calculating native DOM `scroll-margin-top` boundaries so the sticky header never clips content.

## Setup Instructions

1. Ensure you have Node.js (v16+) installed.
2. Clone or extract the repository directly to your local machine.
3. Open a terminal and navigate to the base directory of the project.
4. Install all the core ecosystem dependencies:
   ```bash
   npm install
   ```
5. Boot up the Vite hot-module-reloading development server:
   ```bash
   npm run dev
   ```
6. Open your terminal-provided URL loopback (typically `http://localhost:5173`) in any modern browser!

**Note:** The application securely utilizes local environment storage. If you add records, swap to Dark Mode, or change security Roles, your unique visual configurations will automatically persist flawlessly across browser shutdowns and hard reloads!
