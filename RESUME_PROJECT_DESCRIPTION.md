# Rental Property Management System

## Project Overview

A comprehensive full-stack rental property management system designed for Ethiopian commercial real estate. The platform digitalizes the complete rental lifecycle—from tenant onboarding and lease management to payment processing and automated notifications—while incorporating the Ethiopian calendar system for culturally appropriate date handling.

---

## Technical Stack

### Backend
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js with express-async-errors
- **ORM:** TypeORM with MySQL database
- **Authentication:** JWT-based authentication with bcrypt password hashing
- **Real-time:** Socket.IO for live notifications and SMS gateway communication
- **Security:** Helmet.js, CORS, rate limiting
- **Logging:** Winston for structured logging, Morgan for HTTP request logging
- **Task Scheduling:** node-cron for automated jobs
- **File Handling:** Multer for multipart uploads

### Frontend
- **Framework:** Next.js 15 with React 19
- **Styling:** TailwindCSS with shadcn/ui component library
- **State Management:** Zustand for global state
- **Forms:** React Hook Form with Zod validation
- **Data Tables:** TanStack Table for advanced data grids
- **HTTP Client:** Axios with interceptors
- **Animations:** Framer Motion
- **Real-time:** Socket.IO client for live updates

### Infrastructure
- **Database:** MySQL/MariaDB with UTF-8 support for Ethiopian characters
- **Process Manager:** PM2 for production deployment
- **Web Server:** Nginx as reverse proxy with SSL termination
- **Deployment:** Shell scripts for automated deployment

---

## Key Features

### Property Management
- Multi-building portfolio management with floor/room hierarchy
- Room tracking with occupancy status monitoring
- Building configuration (floors, basements, room assignments)
- Vacancy and occupancy analytics

### Tenant & Lease Management
- Comprehensive tenant profiles with shareholder classification
- Lease agreement creation with customizable terms
- Document attachment support for contracts and agreements
- Configurable payment schedules (prepaid/postpaid)
- Late fee management (fixed amount or percentage-based)
- Grace period configuration

### Payment Processing
- Bank transfer integration with multiple bank support
- Payment verification workflow with bank slip uploads
- Invoice generation with unique reference numbers
- Automated payment schedule generation and tracking
- Payment reconciliation system
- Duplicate payment prevention via unique reference constraints

### Ethiopian Calendar Integration
- Full 13-month Ethiopian calendar support
- Automatic Gregorian-to-Ethiopian date conversion throughout the system
- Special handling for Pagume (13th month with 5-6 days)
- Payment schedule generation that respects Ethiopian calendar conventions
- Date display in both calendar systems

### SMS Notification System
- Custom SMS gateway architecture using Socket.IO
- Queue-based message processing with retry logic
- Real-time delivery status tracking
- Payment reminder notifications
- Payment confirmation messages
- Configurable SMS templates
- Gateway health monitoring and status broadcasting

### Reporting & Analytics
- PDF report generation with Ethiopian font support (Noto Sans Ethiopic)
- Payment tracking and verification reports
- Occupancy and financial overview dashboards
- Export capabilities (Excel/XLSX support)
- Multiple dashboard layouts (Task-oriented, Data-driven, Minimalist, Executive)

### Security Features
- Role-based access control (SUPERADMIN, ADMIN)
- JWT authentication with HTTP-only cookies
- Login rate limiting (5 attempts per 15 minutes)
- Password hashing with bcrypt
- CORS protection with configurable origins
- HTTPS enforcement in production

---

## Architecture Highlights

### RESTful API Design
```
/auth        - Authentication endpoints
/building    - Property management
/room        - Room operations
/tenant      - Tenant management
/lease       - Lease agreements
/payment     - Payment processing
/report      - Report generation
/users       - User management
/notification - SMS and notification management
/settings    - System configuration
```

### Database Schema (Key Entities)
- **Building:** Properties with floors and room relationships
- **Room:** Individual rental units linked to buildings
- **Tenant:** Renters with contact info and shareholder classification
- **Lease:** Rental agreements with payment terms, dates, and document attachments
- **Payment:** Transaction records with verification status and bank references
- **PaymentSchedule:** Automated payment tracking tied to leases
- **Bank:** Banking information for payment processing
- **User:** System users with role-based access
- **Notification:** SMS queue with delivery tracking

### Real-time Communication
- WebSocket connections via Socket.IO
- Live payment status updates
- SMS gateway heartbeat monitoring
- Notification status broadcasting

---

## Technical Achievements

1. **Ethiopian Calendar System:** Implemented complex date calculations accounting for the 13-month calendar, including special handling for Pagume where tenants receive a "free" period during the 5-6 day 13th month.

2. **Custom SMS Gateway Integration:** Designed and implemented a Socket.IO-based SMS gateway system that communicates with a companion Flutter mobile app to send SMS messages, complete with queue processing, retry logic, and delivery confirmation.

3. **Payment Schedule Automation:** Built intelligent payment schedule generation that automatically calculates due dates, handles payment intervals (monthly, quarterly, semi-annual), and reconciles payments against schedules.

4. **Multi-currency Display:** Implemented Ethiopian Birr (ETB) formatting with proper localization.

5. **PDF Generation:** Integrated jsPDF with custom Ethiopian font embedding for generating professional reports and invoices.

6. **Multiple Dashboard Layouts:** Created four distinct dashboard experiences to cater to different user preferences and workflows.

---

## Development Practices

- **TypeScript:** End-to-end type safety across frontend and backend
- **Error Handling:** Centralized error handling middleware with structured error responses
- **Logging:** Comprehensive logging with Winston for debugging and audit trails
- **Activity Tracking:** System-wide activity logging for user actions
- **Code Organization:** Clear separation of concerns (entities, controllers, routes, services)
- **Environment Configuration:** Secure environment variable management with validation

---

## Deployment

- Production-ready with PM2 process management
- Nginx reverse proxy configuration with SSL support
- Automated deployment scripts
- Database backup strategies
- Health monitoring and log management

---

## Impact

This system transforms manual rental management processes into a streamlined digital workflow, reducing administrative overhead, improving payment tracking accuracy, and providing real-time visibility into property portfolio performance—all while respecting local business practices through Ethiopian calendar integration.
