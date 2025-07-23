# AMNote Website Frontend

A modern web application built with Vite, React, TypeScript, and TailwindCSS.

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js (version 18 or higher) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd amnote-website-fe
   ```

2. Navigate to the frontend directory:
   ```bash
   cd fe
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

This will start the Vite development server, typically at `http://localhost:5173`.

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be generated in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

### Linting

To run ESLint:

```bash
npm run lint
```

## 🛠️ Tech Stack

- **Vite** - Build tool and development server
- **React 19** - UI library
- **TypeScript** - Type safety
- **TailwindCSS 4** - Utility-first CSS framework
- **Lucide React** - Icon library
- **ESLint** - Code linting

## 📁 Project Structure

```
fe/
├── public/          # Static assets
├── src/            # Source code
│   ├── assets/     # Project assets
│   ├── lib/        # Utility functions
│   └── ...         # React components and other files
├── package.json    # Dependencies and scripts
└── vite.config.ts  # Vite configuration
```