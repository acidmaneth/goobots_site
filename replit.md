# Project Architecture Documentation

## Overview

This is a full-stack web application built with React (frontend) and Express.js (backend), featuring a modern TypeScript-based architecture. The application appears to be for a game called "Attack of the Goobots" with a landing page and game demo functionality. It uses shadcn/ui for the component library, Drizzle ORM for database operations, and PostgreSQL as the database.

## User Preferences

Preferred communication style: Simple, everyday language.
Custom domain: goobots.xyz (user-owned domain for deployment)

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: shadcn/ui (built on Radix UI primitives)
- **Styling**: Tailwind CSS with custom design tokens
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful API structure

### Development Environment
- **Package Manager**: npm
- **Type Checking**: TypeScript with strict configuration
- **Hot Reloading**: Vite dev server with HMR
- **Build Process**: Vite for frontend, esbuild for backend

## Key Components

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` for shared type definitions
- **Migration System**: Drizzle Kit for database migrations
- **Current Schema**: User table with id, username, and password fields

### Storage Interface
- **Abstraction**: `IStorage` interface for database operations
- **Implementation**: Currently using in-memory storage (`MemStorage`) for development
- **CRUD Operations**: User creation, retrieval by ID and username

### Frontend Components
- **UI Components**: Comprehensive shadcn/ui component library
- **Page Structure**: Home page with game demo and FAQ section
- **Asset Management**: Static assets stored in `attached_assets` directory
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### API Layer
- **Route Registration**: Centralized in `server/routes.ts`
- **Error Handling**: Global error middleware for consistent error responses
- **Logging**: Request/response logging for API endpoints
- **CORS**: Configured for cross-origin requests

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **API Processing**: Express server handles requests through registered routes
3. **Data Access**: Storage interface abstracts database operations
4. **Database Operations**: Drizzle ORM executes SQL queries against PostgreSQL
5. **Response Handling**: Structured JSON responses sent back to client
6. **State Management**: TanStack Query manages caching and synchronization

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **wouter**: Client-side routing
- **react-hook-form**: Form state management
- **zod**: Runtime type validation

### UI Dependencies
- **@radix-ui/***: Headless UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type checking
- **drizzle-kit**: Database toolkit

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized React application to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Assets**: Static assets copied to build directory

### Environment Configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **Node Environment**: Development/production mode switching
- **Replit Integration**: Special handling for Replit development environment

### Database Setup
- **Schema Management**: Drizzle migrations in `./migrations` directory
- **Push Command**: `npm run db:push` for schema synchronization
- **Connection**: Serverless PostgreSQL through Neon Database

### Production Considerations
- **Static Serving**: Express serves built React application
- **API Prefix**: All API routes prefixed with `/api`
- **Error Boundaries**: Global error handling for production stability
- **Session Storage**: PostgreSQL-backed sessions for scalability

The architecture follows modern full-stack patterns with clear separation of concerns, type safety throughout the stack, and scalable database design. The current implementation uses in-memory storage for development but is structured to easily switch to PostgreSQL for production.