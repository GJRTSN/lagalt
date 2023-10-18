import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import KeycloakProvider from "next-auth/providers/keycloak";

export const options: NextAuthOptions = {
  providers: [
    KeycloakProvider({
        clientId: process.env.KEYCLOAK_CLIENT_ID as string,
        clientSecret: process.env.KEYCLOAK_SECRET as string,
        issuer: process.env.KEYCLOAK_ISSUER as string,
    }),
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
          placeholder: "your-username",
        },
        password: {
          label: "Password:",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }
        const response = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        const data = await response.json();

        if (response.status === 200) {
          // Optionally, you could include tokens from your backend in the session here
          return { id: data.id, name: data.name };
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  
}