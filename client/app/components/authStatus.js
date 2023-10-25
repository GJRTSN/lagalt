"use client";

import { useSession, signIn, signOut } from "next-auth/react";

async function keycloakSessionLogout(){
  try{
    await fetch(`api/auth/logout`, { method: "GET" });
  } catch (err) {
    console.error(err);
  }
}

export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (status == "loading") {
    return <div className="my-3">Loading...</div>;
  } else if (session) {
    return (
      <div className="my-3">
        Logged in: <span className="text-yellow-100">{session.user.name}</span>{" "}
        <button
          className="bg-green-500 font-bold text-white py-1 px-2 rounded"
          onClick={() => {
            keycloakSessionLogout().then(() => signOut({ callbackUrl: "/" }));
          }}
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="my-3">
      Not logged in.{" "}
      <button
        className="bg-green-500 font-bold text-white py-1 px-2 rounded"
        onClick={() => signIn("keycloak", { callbackUrl: "/explore" })}
        >
        Log in
      </button>
    </div>
  );
}
