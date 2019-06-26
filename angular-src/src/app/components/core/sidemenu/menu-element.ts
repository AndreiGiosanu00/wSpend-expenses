export const menus = (JSON.parse(localStorage.getItem('user')).role == 'admin') ? [
    {
        'name': 'Admin Dashboard',
        'icon': 'dashboard',
        'link': '/auth/admin',
        'open': true,
    },
    {
        'name': 'Dashboard',
        'icon': 'dashboard',
        'link': '/auth/dashboard',
        'open': false,
    },
    {
        'name': 'Expenses',
        'icon': 'view_module',
        'link': '/auth/expenses',
        'open': false,
    },
    {
        'name': 'Wishlist',
        'icon': 'view_module',
        'link': '/auth/goals',
        'open': false,
    },
] : [
    {
        'name': 'Dashboard',
        'icon': 'dashboard',
        'link': '/auth/dashboard',
        'open': true,
    },
    {
        'name': 'Expenses',
        'icon': 'view_module',
        'link': '/auth/expenses',
        'open': false,
    },
    {
        'name': 'Wishlist',
        'icon': 'view_module',
        'link': '/auth/goals',
        'open': false,
    },
];
