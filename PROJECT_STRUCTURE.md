# CryptoPayAI React Project Structure

## Complete Directory Tree

```
CryptoPayAI/
├── package.json                                    # Project dependencies and scripts
├── package-lock.json                              # Dependency lock file
├── index.html                                     # Main HTML entry point
├── .env                                           # Environment variables
├── jsconfig.json                                  # JavaScript configuration
├── tailwind.config.js                            # Tailwind CSS configuration
├── favicon.ico                                    # Website favicon
├── README.md                                      # Project documentation
├── postcss.config.js                             # PostCSS configuration
│
├── public/                                        # Static assets directory
│   ├── _redirects                                 # Redirect configuration
│   ├── robots.txt                                 # Search engine crawling rules
│   ├── favicon.ico                                # Public favicon
│   ├── manifest.json                              # PWA manifest
│   └── assets/
│       └── images/
│           └── no_image.png                       # Default placeholder image
│
└── src/                                           # Source code directory
    ├── App.jsx                                    # Main application component
    ├── index.jsx                                  # Application entry point
    ├── Routes.jsx                                 # Routing configuration
    │
    ├── styles/                                    # Styling files
    │   ├── index.css                              # Custom global styles
    │   └── tailwind.css                           # Tailwind CSS imports
    │
    ├── components/                                # Reusable UI components
    │   ├── AppImage.jsx                           # Image component
    │   ├── AppIcon.jsx                            # Icon component
    │   ├── ErrorBoundary.jsx                      # Error boundary wrapper
    │   ├── ScrollToTop.jsx                        # Scroll utility component
    │   └── ui/                                    # UI component library
    │       ├── Select.jsx                         # Select dropdown component
    │       ├── Checkbox.jsx                       # Checkbox component
    │       ├── Button.jsx                         # Button component
    │       ├── AIAssistantFloat.jsx               # Floating AI assistant
    │       ├── Input.jsx                          # Input field component
    │       ├── TransactionStatusIndicator.jsx     # Transaction status display
    │       ├── Sidebar.jsx                        # Navigation sidebar
    │       ├── Header.jsx                         # Page header component
    │       └── DashboardQuickActions.jsx          # Dashboard action buttons
    │
    ├── pages/                                     # Application pages
    │   ├── NotFound.jsx                           # 404 error page
    │   │
    │   ├── dashboard/                             # Dashboard module
    │   │   ├── index.jsx                          # Main dashboard page
    │   │   └── components/
    │   │       ├── ScheduledPaymentsCard.jsx      # Scheduled payments widget
    │   │       ├── AIAssistantToggle.jsx          # AI assistant toggle
    │   │       ├── ConnectedWalletCard.jsx        # Connected wallet display
    │   │       ├── TransactionSummaryCard.jsx     # Transaction summary widget
    │   │       ├── RecentTransactionsCard.jsx     # Recent transactions widget
    │   │       └── WalletBalanceCard.jsx          # Wallet balance display
    │   │
    │   ├── assistant/                             # AI Assistant module
    │   │   ├── index.jsx                          # Main assistant page
    │   │   └── components/
    │   │       ├── ConversationArea.jsx           # Chat conversation display
    │   │       ├── QuickSuggestions.jsx           # Quick action suggestions
    │   │       ├── ChatInput.jsx                  # Chat input field
    │   │       ├── AssistantHeader.jsx            # Assistant page header
    │   │       └── MessageBubble.jsx              # Individual message display
    │   │
    │   ├── transactions/                          # Transactions module
    │   │   ├── index.jsx                          # Main transactions page
    │   │   └── components/
    │   │       ├── TransactionFilters.jsx         # Transaction filtering options
    │   │       ├── BulkActions.jsx                # Bulk transaction actions
    │   │       ├── TransactionTable.jsx           # Transaction data table
    │   │       └── TransactionModal.jsx           # Transaction detail modal
    │   │
    │   ├── payments/                              # Payments module
    │   │   ├── index.jsx                          # Main payments page
    │   │   └── components/
    │   │       ├── PaymentConfirmationModal.jsx   # Payment confirmation dialog
    │   │       ├── SendPaymentForm.jsx            # Send payment form
    │   │       ├── ReceivePaymentForm.jsx         # Receive payment form
    │   │       ├── RecentTransactions.jsx         # Recent payments list
    │   │       └── SchedulePaymentForm.jsx        # Schedule payment form
    │   │
    │   ├── settings/                              # Settings module
    │   │   ├── index.jsx                          # Main settings page
    │   │   └── components/
    │   │       ├── ProfileSection.jsx             # User profile settings
    │   │       ├── PreferencesSection.jsx         # User preferences
    │   │       ├── SecuritySection.jsx            # Security settings
    │   │       ├── LogoutSection.jsx              # Logout functionality
    │   │       ├── NotificationSection.jsx        # Notification preferences
    │   │       └── WalletSection.jsx              # Wallet management
    │   │
    │   └── login/                                 # Authentication module
    │       ├── index.jsx                          # Main login page
    │       └── components/
    │           ├── DemoCredentials.jsx            # Demo login credentials
    │           ├── LoginForm.jsx                  # Login form component
    │           ├── SecurityBadges.jsx             # Security feature badges
    │           ├── CreateAccountLink.jsx          # Account creation link
    │           ├── LoginHeader.jsx                # Login page header
    │           └── GoogleAuthButton.jsx           # Google OAuth button
    │
    └── utils/                                     # Utility functions
        └── cn.js                                  # Class name utility
```

## Project Statistics

- **Total Files:** 69
- **Total Directories:** 14
- **Main Modules:** 6 (Dashboard, Assistant, Transactions, Payments, Settings, Login)
- **Reusable Components:** 13 (in components/ and components/ui/)
- **Page Components:** 40+ (across all modules)

## Architecture Overview

### Frontend Framework
- **React 18** with functional components and hooks
- **Vite** for fast development and building
- **Tailwind CSS** for responsive styling
- **React Router** for navigation

### Module Structure
Each main feature is organized as a self-contained module:
- **Dashboard:** Overview, wallets, and quick actions
- **Assistant:** AI-powered chat and transaction analysis
- **Transactions:** History, filtering, and bulk operations
- **Payments:** Send, receive, and schedule payments
- **Settings:** Profile, security, and preferences
- **Login:** Authentication with OAuth support

### Component Architecture
- **Reusable UI Components:** Shared components in `components/ui/`
- **Feature Components:** Module-specific components in respective `components/` folders
- **Page Components:** Main page exports in each module's `index.jsx`

### Key Features
- ✅ Responsive design with mobile-first approach
- ✅ AI-powered transaction analysis and chat
- ✅ Comprehensive payment system (send/receive/schedule)
- ✅ Advanced transaction filtering and bulk operations
- ✅ Secure authentication with OAuth integration
- ✅ Real-time updates and notifications
- ✅ Modern cryptocurrency payment processing

## Technology Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| Frontend | React 18 | UI framework |
| Build Tool | Vite | Development and building |
| Styling | Tailwind CSS | Utility-first CSS |
| Routing | React Router | Client-side navigation |
| State Management | Redux Toolkit | Application state |
| Icons | Lucide React | Icon library |
| Animation | Framer Motion | Smooth animations |
| Forms | React Hook Form | Form management |
| HTTP Client | Axios | API communication |
| Date Handling | date-fns | Date utilities |
| Charts | Recharts | Data visualization |