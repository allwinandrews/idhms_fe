const backendUrls = {
  auth: {
    login: '/login/',
    refreshToken: '/login/refresh/',
    register: '/register/',
    bulkRegister: '/register/bulk/',
  },
  secure: {
    secureView: '/secure/',
  },
  admin: {
    adminOnly: '/admin/',
    analytics: '/admin/analytics/',
  },
  patient: {
    data: '/patient/data/',
  },
  receptionist: {
    managePatients: '/receptionist/manage-patients/',
  },
  appointments: {
    list: '/appointments/', // Fetch all or create a new appointment
    getById: (id: number) => `/appointments/${id}/`, // Fetch, update, or delete an appointment
  },
  users: {
    list: '/users/', // Fetch all users
    getById: (id: number) => `/users/${id}/`, // Fetch, update, or delete a user
    roles: (id: number) => `/users/${id}/roles/`, // Manage roles
  },
};

export default backendUrls;
