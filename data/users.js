import bcrypt from 'bcryptjs'

const users = [
    {
        name: "User 1",
        email: "user1@gmail.com",
        password: bcrypt.hashSync('12345'),
        isAdmin: true
    },
    {
        name: "User 2",
        email: "user2@gmail.com",
        password: bcrypt.hashSync('12345'),
        isAdmin: false
    }
]

export default users