import NextAuth from "next-auth"

// import { CredentialsProvider } from "next-auth/providers"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'

import db from "../../../utils/db"
import User from "../../../models/user"


export default NextAuth({
    session:{
        strategy: 'jwt' //json web token // یک ابزاری است برای مدیریت احراز هویت بر اساس مقدار توکن
    },
    callbacks:{
        async jwt({ token, user }){
            if(user?._id) token._id = user._id

            if(user?.isAdmin) token.isAdmin = user.isAdmin

            return token
        },
        async session({ session, token }){  //session va token ro hamahang mikone
            if(token?._id) session.user._id = token._id  //یعنی توکن رو میریزیم تو کاربری که سشن ش داره ساخته میشه
            if(token?.isAdmin) session.user.isAdmin = token.isAdmin

            return session
        }
    },
    providers:[
        CredentialsProvider({
            async authorize(credentials){
                await db.connect()

                const user = await User.findOne({
                    email: credentials.email,
                })

                if(user && bcrypt.compareSync(credentials.password, user.password)){
                    return{ 
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        image: 'f',
                        isAdmin: user.isAdmin
                    }
                }

                throw new Error('invalid email or password')
            }
        })
    ]
})