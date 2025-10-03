# Birthday Celebration App

## Overview
An interactive birthday celebration web application built with React, TypeScript, Vite, and shadcn/ui. Features animated balloons, confetti, mini-games, and photo placeholders for a fun birthday experience.

## Project Structure
This is a frontend-only Vite + React + TypeScript application with the following structure:

- `src/` - Main application source code
  - `components/` - React components including UI components from shadcn/ui
  - `pages/` - Page components (Index, NotFound)
  - `hooks/` - Custom React hooks
  - `lib/` - Utility functions
- `public/` - Static assets
- `vite.config.ts` - Vite configuration (configured for Replit environment)

## Technologies Used
- **Framework**: React 18.3
- **Build Tool**: Vite 5.4
- **Language**: TypeScript 5.8
- **UI Library**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 6.30
- **State Management**: TanStack Query 5.83
- **Form Handling**: React Hook Form 7.61

## Development
The application is configured to run on port 5000 with the following settings:
- Host: 0.0.0.0 (for Replit proxy compatibility)
- Port: 5000
- HMR configured for Replit's WebSocket proxy

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment
The project is configured for Replit Autoscale deployment:
- Build command: `npm run build`
- Run command: `npm run start`

## Features
- Animated gradient background with floating particles
- Interactive balloons that can be popped
- Birthday cake with celebration trigger
- Confetti animations
- Photo placeholder gallery
- Mini-games:
  - Balloon Pop Game
  - Memory Game
  - Confetti Cannon
- Score tracking system
- Smooth scrolling sections
- Responsive design

## Recent Changes
- 2025-10-03: Initial setup for Replit environment
  - Configured Vite for port 5000 and 0.0.0.0 host
  - Set up HMR for Replit's proxy environment
  - Added start script for production
  - Configured deployment settings
