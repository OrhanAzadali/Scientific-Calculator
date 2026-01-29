# Scientific Calculator Application

## Overview

This project is a **Scientific Calculator web application** designed to demonstrate strong front-end engineering practices using **React**, **TypeScript**, and modern tooling. Beyond standard calculator functionality, the application includes multiple **unit and data converters**, persistent state handling via **LocalStorage**, and a **Currency Converter** powered by a real external API.

The project is intentionally structured to reflect real-world front-end architecture, emphasizing separation of concerns, scalability, and maintainability. It is suitable for production-style review and inclusion in a professional portfolio or CV.

---

## Key Features

* Scientific calculator with advanced operations
* Built-in converters:
  * Time
  * Date
  * Area
  * Power
  * Weight & Mass
  * Data units
    
* Currency converter with live exchange rates
* API data caching using browser LocalStorage
* Fully typed with TypeScript
* Modular, reusable React components
* Centralized service layer for data fetching
* Responsive and consistent UI styled with Tailwind CSS
* Client-side routing with React Router v6
* Dedicated error handling using `errorElement`

---

## Technology Stack

* **React** (functional components)
* **TypeScript** (strict typing)
* **React Router v6** (modern routing with error boundaries)
* **Tailwind CSS** (utility-first styling)
* **LocalStorage API** (persistent data caching)
* **External Currency Exchange API**
* **Vite / CRA** (depending on setup)

---

## Application Architecture

The project is structured to reflect best practices commonly used in professional React applications.

### High-Level Design Principles

* **Separation of concerns**: UI, logic, and data fetching are isolated
* **Reusability**: Shared components are abstracted and reused
* **Scalability**: Folder structure allows easy extension
* **Maintainability**: Clear responsibilities per module

---

## Project Structure

```
src/
├─ components/        # Reusable Button component for UI
├─ pages/             # Route-level views (Calculator, Converters, Error page)
├─ services/          # API logic (currency fetching)
├─ utils/             # Helper and conversion utilities 
├─ types/             # Global TypeScript type definitions
├─ router/            # React Router v6 configuration
├─ store/             # LocalStorage interaction logic //to be added
├─ App.tsx            # Root application component
└─ index.tsx           # Application entry point
```

---

## Routing (React Router v6)

The application uses **React Router v6** with a centralized routing configuration. Error handling is implemented using the `errorElement` API, allowing graceful handling of unknown routes and runtime routing errors.

### Routing Highlights

* Declarative route configuration
* Dedicated error page
* Error boundary behavior via `errorElement`
* Clean separation of routing logic from UI components

---

## Currency Converter & API Handling

The currency converter integrates with a third-party exchange-rate API.

### Data Flow Strategy

1. Fetch currency data via a dedicated **service module**
2. Store results in **LocalStorage** with timestamps
3. Reuse cached data on subsequent app loads
4. Refresh data only when necessary

This approach reduces unnecessary network requests and improves performance while keeping data reasonably fresh.

---

## LocalStorage Usage

LocalStorage is used as a lightweight client-side persistence layer:

* Stores fetched currency rates
* Allows reuse of previously fetched data
* Improves perceived performance
* Demonstrates practical browser API usage

All LocalStorage interactions are abstracted into a dedicated module to avoid direct access from UI components.

---

## Styling Approach

The application uses **Tailwind CSS** for styling:

* Utility-first approach
* Consistent spacing and typography
* Responsive layout support
* Clean, maintainable styling without large CSS files

---

## Component Design

* Button logic is encapsulated in a reusable `Button` component
* Calculator operations are separated from presentation
* Converter logic is isolated from UI rendering
* Services handle data fetching exclusively

This design ensures that components remain predictable, testable, and easy to extend.

---

## Installation & Setup

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

---

## Purpose of the Project

This project was built to:

* Demonstrate real-world React application structure
* Showcase TypeScript usage beyond basics
* Illustrate API integration and caching strategies
* Highlight clean component and service separation
* Serve as a professional portfolio project

---

## Notes for Reviewers

* The architecture intentionally mirrors production-ready patterns
* Emphasis is placed on clarity, structure, and maintainability
* The project is designed to be easily extendable

---

## Author

Orhan Azadali

---

## License

This project is provided for educational and portfolio purposes.
---
