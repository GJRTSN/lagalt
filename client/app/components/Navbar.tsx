"use client";
import {signIn, signOut, useSession } from "next-auth/react";

function AuthButton () {
    const { data: session } = useSession();

    if (session) {
        return (
            <>
                <button onClick={() => signOut()}> Sign out</button>
            </>
        );
    }
    return (
        <>
        <button onClick={() => signIn()}>Sign in</button>
        </>
    );
}

export default function Navbar() {
    return (
        <div>
            <AuthButton />
        </div>
    );
}