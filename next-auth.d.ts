import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
    interface Session {
        expires: string
        user: {
            address: string
        } & DefaultSession['user']
    }
}
declare module 'next-auth/jwt' {
    interface JWT {
        idToken?: string
    }
}
