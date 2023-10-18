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
        className="w-16 h-8 bg-green-700 rounded-md text-sm"
      >
        Log out
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
  const navStyle =
    "cursor-pointer transition-transform duration-200 transform hover:-translate-y-1 ease-in-out";

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
          <div
            id="pagesContainer"
            className="absolute bottom-0 flex flex-row w-3/5 justify-between"
          >
            <div
              className={`link transition-colors duration-300 ease-in-out ${
                pathname.startsWith("/explore")
                  ? "bg-[#8cb669] border border-transparent h-3/5 flex items-center rounded-t-md px-4"
                  : "bg-[#CCCCCC] border border-transparent h-3/5 flex items-center rounded-t-md px-4 text-gray-700"
              }`}
            >
              <Link href="/explore">
                <h2 className={`text-2xl font-roboto ${navStyle}`}>EXPLORE</h2>
              </Link>
            </div>

            {session && (
              <>
                <div
                  className={`link transition-colors duration-300 ease-in-out ${
                    pathname.startsWith("/projects")
                      ? "bg-[#8cb669] border border-transparent h-3/5 flex items-center rounded-t-md px-4"
                      : "bg-[#CCCCCC] border border-transparent h-3/5 flex items-center rounded-t-md px-4 text-gray-700"
                  }`}
                >
                  <Link href="/projects">
                    <h2 className={`text-2xl font-roboto ${navStyle}`}>
                      PROJECTS
                    </h2>
                  </Link>
                </div>

                <div
                  className={`link transition-colors duration-300 ease-in-out ${
                    pathname.startsWith("/profile")
                      ? "bg-[#8cb669] border border-transparent h-3/5 flex items-center rounded-t-md px-4"
                      : "bg-[#CCCCCC] border border-transparent h-3/5 flex items-center rounded-t-md px-4  text-gray-700"
                  }`}
                >
                  <Link href="/profile">
                    <h2 className={`text-2xl font-roboto ${navStyle}`}>
                      PROFILE
                    </h2>
                  </Link>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col absolute right-0 justify-center items-center gap-1 mr-6 text-white">
            <div className="flex items-center space-x-4">
              {session?.user ? (
                <span className="text-gray-700 font-semibold text-sm">
                  {session.user.name}
                </span>
              ) : (
                <span className="text-gray-500">Want to join?</span>
              )}
              <AuthButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
