import type {NextAuthOptions} from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { 
                    label: "Username:",
                    type: "text",
                    placeholder: "admin"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "admin"
                }
            },
            async authorize(credentials) {
                console.log("Authorize function called with credentials:", credentials);
                const user = {id: "0", name: "admin", password: "admin"}

                console.log("User authenticated:", user);

                if(credentials?.username === user.name && credentials?.password === user.password) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
}