// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import NextAuth from "next-auth"
// import GithubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google"
// import prisma from "@/lib/prisma"

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID || "",
//       clientSecret: process.env.GITHUB_SECRET || "",
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//     }),
//   ],
//   pages: {
//     signIn: "/auth/signin",
//   },
//   callbacks: {
//     async session({ session, user }) {
//       session.user.id = user.id
//       return session
//     },
//   },
// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }







// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import GithubProvider from "next-auth/providers/github"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import prisma from "@/lib/prisma"
// import bcrypt from "bcryptjs"

// export const authOptions = {
//   adapter: PrismaAdapter(prisma), // ✅ MAKE SURE prisma is not undefined
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         })

//         if (!user || !user.hashedPassword) return null

//         const isValid = await bcrypt.compare(credentials.password, user.hashedPassword)
//         if (!isValid) return null

//         return user
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/auth/signin",
//   },
//   callbacks: {
//     async session({ session, token, user }) {
//       if (token?.sub) session.user.id = token.sub
//       return session
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET, // ✅ This should not be empty
// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }











import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.hashedPassword) return null

        const isValid = await bcrypt.compare(credentials.password, user.hashedPassword)
        if (!isValid) return null

        return user
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async jwt({ token, user }) {
      // On sign-in, attach full user data to token
      if (user) {
        const fullUser = await prisma.user.findUnique({
          where: { id: user.id },
        })

        if (fullUser) {
          token.id = fullUser.id
          token.email = fullUser.email
          token.firstName = fullUser.firstName
          token.lastName = fullUser.lastName
          token.avatarUrl = fullUser.avatarUrl
          token.createdAt = fullUser.createdAt
        }
      }
      return token
    },

    async session({ session, token }) {
      // Copy token data into session.user
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          firstName: token.firstName,
          lastName: token.lastName,
          avatarUrl: token.avatarUrl,
          createdAt: token.createdAt,
        }
      }
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
