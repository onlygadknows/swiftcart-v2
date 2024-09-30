import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('12356', 10),
        isAdmin: true,
    },
    {
        name: 'Gad Ashell',
        email: 'gad@email.com',
        password: bcrypt.hashSync('12356', 10),
        isAdmin: false,
    },
    {
        name: 'Reah May',
        email: 'reah@email.com',
        password: bcrypt.hashSync('12356', 10),
        isAdmin: false,
    },
];

export default users;