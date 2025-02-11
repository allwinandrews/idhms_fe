# Intelligent Hospital Management System (IHMS) - Dental Practice Management

## Overview
The **Intelligent Hospital Management System (IHMS)** is a modular, scalable hospital management system. Currently, it is focused on **dental practice management**, featuring **role-based authentication**, **appointment scheduling**, **patient management**, **billing**, and **report generation**.

## Technologies Used

### **Frontend**
- React.js (with TypeScript)
- Material-UI (MUI) for UI components
- Redux Toolkit for state management
- React Hook Form for form validation
- React Router for navigation
- Axios for API requests

### **Backend**
- Django & Django REST Framework (DRF)
- PostgreSQL as the database
- JWT Authentication with HTTP-Only Cookies
- Role-based access control

### **Other Tools**
- Storybook (for UI components)
- Jest & React Testing Library (for frontend tests)
- Docker (for deployment)
- GitHub Actions (for CI/CD)

---

## Installation & Setup

### **Prerequisites**
Ensure you have the following installed:
- **Node.js & npm** - [Download Node.js](https://nodejs.org/)
- **Git** - [Download Git](https://git-scm.com/)
- **Python & pip** - [Download Python](https://www.python.org/)
- **PostgreSQL** - [Download PostgreSQL](https://www.postgresql.org/)

Check if installed:
```sh
node -v && npm -v  # Check Node.js and npm version
git --version       # Check Git version
python --version && pip --version  # Check Python & pip version
psql --version      # Check PostgreSQL version
```

---

## **Project Setup**

### **1. Clone the Repository**
```sh
git clone <your-repository-url>
cd <your-project-folder>
```

---

## **Frontend Setup**
### **2. Install Dependencies**
```sh
cd frontend
npm install
```

### **3. Set Up Environment Variables**
Create a `.env` file from the example:
```sh
cp .env.example .env
```
Update the `.env` file with your API base URL:
```env
REACT_APP_API_BASE_URL=http://127.0.0.1:8000/api
```

### **4. Start the Frontend**
```sh
npm start
```
This runs the React app in development mode at `http://localhost:3000/`.

---

## **Backend Setup**
### **5. Create a Virtual Environment & Install Dependencies**
```sh
cd ../backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### **6. Configure Environment Variables**
Create a `.env` file in the backend directory:
```sh
cp .env.example .env
```
Update the values:
```env
DJANGO_SECRET_KEY=your_secret_key
DATABASE_URL=postgres://username:password@localhost:5432/db_name
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### **7. Run Migrations & Create a Superuser**
```sh
python manage.py migrate
python manage.py createsuperuser  # Create an admin user
```

### **8. Start the Backend Server**
```sh
python manage.py runserver
```
Your backend should now be running at `http://127.0.0.1:8000/api/`.

---

## **Testing**

### **Frontend Tests**
Run tests using Jest & React Testing Library:
```sh
cd frontend
npm test
```

### **Backend Tests**
Run Django tests:
```sh
cd backend
python manage.py test
```

---

## **Deployment**

### **Docker Setup**
Ensure Docker is installed: [Download Docker](https://www.docker.com/)
1. **Build & Run Containers**:
```sh
docker-compose up --build
```
2. **Access the application**:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000/api/`

---

## **API Endpoints**
### **Authentication**
- `POST /api/login/` - User login
- `POST /api/register/` - User registration
- `POST /api/login/refresh/` - Refresh access token

### **User Management**
- `GET /api/users/` - Get all users
- `GET /api/users/?role=dentist` - Get users by role
- `GET /api/users/<id>/` - Get user details

### **Appointments**
- `GET /api/appointments/` - List all appointments
- `POST /api/appointments/` - Create a new appointment
- `PUT /api/appointments/<id>/` - Update an appointment
- `DELETE /api/appointments/<id>/` - Delete an appointment

---

## **Contributing**
### **Branching Strategy**
1. **Main** - Stable production branch.
2. **Develop** - Active development branch.
3. **Feature Branches** - Named as `feature/<feature-name>`.
4. **Bug Fix Branches** - Named as `fix/<bug-description>`.

### **Create a New Branch**
```sh
git checkout -b feature/<your-feature-name>
```

### **Commit and Push Changes**
```sh
git add .
git commit -m "Add new feature"
git push origin feature/<your-feature-name>
```

### **Submit a Pull Request**
- Open a PR to `develop` for new features.
- Open a PR to `main` for releases.

---

## **Troubleshooting**
### **Common Issues**
- **Backend not starting?** Run `python manage.py migrate` and ensure PostgreSQL is running.
- **Frontend not starting?** Run `npm install` before `npm start`.
- **CORS Errors?** Ensure `CORS_ALLOWED_ORIGINS` is set correctly in `.env`.

---

## **License**
This project is licensed under the **MIT License**.