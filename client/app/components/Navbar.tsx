"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import logo from "@/public/lagalt_clean.png";
import Image from "next/image";
import Link from "next/link";

export function AuthButton() {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const handleSignIn = () => {
    signIn(undefined, { callbackUrl: "/explore" });
  };

  if (session) {
    return (
      <button
        onClick={handleSignOut}
        className="w-24 h-8 bg-green-700 rounded-md"
      >
        Sign out
      </button>
    );
  }
  return (
    <button onClick={handleSignIn} className="w-24 h-8 bg-green-700 rounded-md">
      Sign in
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <>
      {pathname === "/" ? null : (
        <div className="w-full h-16 relative bg-[#CCCCCC] flex flex-row justify-center gap-12 items-center">
          <Image
            src={logo}
            className="absolute left-0 ml-6 transition ease-in-out 1s p-2 rounded shadow-s hover:opacity-70"
            alt="explore"
            width="50"
            height="20"
          />
          {/* <p className="mb-8">Friday 06. October 2023</p> */}

          <div
            id="pagesContainer"
            className="absolute bottom-0 flex flex-row w-3/5 justify-between"
          >
            <div
              className={`link transition-colors duration-300 ease-in-out ${
                pathname.startsWith("/explore")
                  ? "bg-[#8cb669] border border-transparent h-3/5 flex items-center rounded-t-md px-4 shadow-inner-md"
                  : "bg-[#CCCCCC] border border-transparent h-3/5 flex items-center rounded-t-md px-4"
              }`}
            >
              <Link href="/explore">
                <h2 className="text-2xl font-roboto font-bold">EXPLORE</h2>
              </Link>
            </div>

            {session && (
              <>
                <div
                  className={`link transition-colors duration-300 ease-in-out ${
                    pathname.startsWith("/projects")
                      ? "bg-[#8cb669] border border-transparent h-3/5 flex items-center rounded-t-md px-4 shadow-inner-md"
                      : "bg-[#CCCCCC] border border-transparent h-3/5 flex items-center rounded-t-md px-4"
                  }`}
                >
                  <Link href="/projects">
                    <h2 className="text-2xl font-roboto font-bold">
                      MY PROJECTS
                    </h2>
                  </Link>
                </div>

                <div
                  className={`link transition-colors duration-300 ease-in-out ${
                    pathname.startsWith("/profile")
                      ? "bg-[#8cb669] border border-transparent h-3/5 flex items-center rounded-t-md px-4 shadow-inner-md"
                      : "bg-[#CCCCCC] border border-transparent h-3/5 flex items-center rounded-t-md px-4"
                  }`}
                >
                  <Link href="/profile">
                    <h2 className="text-2xl font-roboto font-bold">PROFILE</h2>
                  </Link>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col absolute right-0 justify-center items-center gap-1 mr-6 text-white">
            {session?.user ? (
              <>
                {/* <p className="">Logged in as:</p> */}
                <p className="font-bold">{session.user.name}</p>
              </>
            ) : (
              <>
                <p>Want to join?</p>
              </>
            )}
            <AuthButton />
          </div>
        </div>
      )}
    </>
  );
}
