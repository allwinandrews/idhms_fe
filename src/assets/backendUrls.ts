const backendUrls = {
    auth: {
        login: "/login/",
        refreshToken: "/login/refresh/",
        register: "/register/",
        bulkRegister: "/register/bulk/",
    },
    secure: {
        secureView: "/secure/",
    },
    admin: {
        adminOnly: "/admin/",
    },
    patient: {
        data: "/patient/data/",
    },
    receptionist: {
        managePatients: "/receptionist/manage-patients/",
    },
    appointments: {
        listCreate: "/appointments/",
        detail: (id: number) => `/appointments/${id}/`, // Accepts an ID for dynamic URLs
    },
    users: {
        list: "/users/",
        detail: (id: number) => `/users/${id}/`, // Accepts an ID for dynamic URLs
        roles: (id: number) => `/users/${id}/roles/`, // Accepts an ID for dynamic URLs
    },
};

export default backendUrls;
