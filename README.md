# 🏥 Appointment UI

## ✨ Overview

Appointment UI is the beautiful, intuitive frontend application that connects patients with healthcare providers. Designed with user experience at its core, it transforms the complex process of medical appointment booking into a simple, enjoyable journey.

## 🚀 Key Features

### 🔍 **Doctor Discovery**

| Feature                   | Description                                                          |
| ------------------------- | -------------------------------------------------------------------- |
| 🏥 **Browse Specialties** | Explore doctors by medical specialty (Cardiology, Dermatology, etc.) |
| 🔍 **Advanced Search**    | Find doctors by name, location, or specialty                         |
| ⭐ **Ratings & Reviews**  | Real patient reviews and doctor ratings                              |
| 📋 **Detailed Profiles**  | Comprehensive doctor information including experience and education  |

### 📅 **Smart Appointment Booking**

| Feature                       | Description                                         |
| ----------------------------- | --------------------------------------------------- |
| 📆 **Real-Time Availability** | Live calendar showing available time slots          |
| ⏰ **Flexible Scheduling**    | Book appointments for preferred dates and times     |
| 💳 **Secure Payments**        | Integrated payment processing with multiple options |
| 📱 **Instant Confirmation**   | Immediate booking confirmation with all details     |

### 🔐 **Secure User Experience**

| Feature                      | Description                                  |
| ---------------------------- | -------------------------------------------- |
| 🔒 **Secure Authentication** | Safe login with JWT token management         |
| 🛡️ **Data Privacy**          | HIPAA-compliant data handling and storage    |
| 🔐 **Two-Factor Auth**       | Optional 2FA for enhanced security           |
| 📱 **Session Management**    | Automatic logout and secure session handling |

---

## 🛠️ Tech Stack

| Technology       | Version | Purpose                                       |
| ---------------- | ------- | --------------------------------------------- |
| **React**        | 19.1.1  | UI Framework & Component Library              |
| **Vite**         | 7.1.2   | Lightning-fast build tool & dev server        |
| **Tailwind CSS** | 4.1.12  | Utility-first CSS framework for rapid styling |
| **React Router** | 7.8.0   | Client-side routing and navigation            |
| **Axios**        | 1.11.0  | Promise-based HTTP client for API calls       |
| **Toastify**     | 11.0.5  | Beautiful notification system                 |

---

## 🚀 Quick Start

### 📋 Prerequisites

- Node.js 18+ installed
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Backend API server running (Appointment Server)

## 📁 Project Structure

```
Appointment_UI/
├── public/                 # Static assets and icons
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/        # Shared components (Header, Footer, etc.)
│   │   ├── doctors/       # Doctor-related components
│   │   ├── appointments/  # Appointment booking components
│   │   ├── auth/          # Authentication components
│   │   └── ui/            # Basic UI elements (Button, Input, etc.)
│   ├── pages/             # Main page components
│   │   ├── HomePage.jsx
│   │   ├── DoctorsPage.jsx
│   │   ├── AppointmentPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── LoginPage.jsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useAppointments.js
│   │   └── useDoctors.js
│   ├── services/          # API service functions
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── appointmentService.js
│   ├── context/           # React context providers
│   │   ├── AuthContext.js
│   │   └── ThemeContext.js
│   ├── utils/             # Utility functions
│   │   ├── helpers.js
│   │   ├── constants.js
│   │   └── validators.js
│   ├── styles/            # Global styles and Tailwind config
│   │   ├── globals.css
│   │   └── components.css
│   └── assets/            # Images, icons, and other static files
├── package.json
└── README.md
```
## 🤝 Contributing

We welcome contributions to improve the Appointment UI!

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run lint
   npm test
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
6. **Push and create a Pull Request**

## 🆘 Support & Documentation

- 📧 **Email Support**: khatibjunior7@gmail.com
- 💬 **Phone**: +255 673 273 032

---

## 🌟 Star History

<div align="center">

**Made with ❤️ for Patients Worldwide**

</div>
