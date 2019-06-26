let role = (JSON.parse(localStorage.getItem('user'))) ? JSON.parse(localStorage.getItem('user')).role : '';
let loggedAsAdmin = (JSON.parse(localStorage.getItem('admin'))) ? JSON.parse(localStorage.getItem('admin')).logged : false;

export const menus = (role == 'admin' && loggedAsAdmin == true) ?  [
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
