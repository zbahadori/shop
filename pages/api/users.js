import db from "../../utils/db"
import users from '../../data/users'
import User from "../../models/user"

async function handler(req, res){
    await db.connect()

    await User.deleteMany() //مقادیری که از قبل وجود داشت رو حذف میکنه

    await User.insertMany(users)

    res.send({ message: 'user added!' })
}

export default handler