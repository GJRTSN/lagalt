"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import logo from "@/public/lagalt_clean.png";
import Image from "next/image";
import Link from "next/link";

export function AuthButton() {
  const { data: session } = useSession();

  const handleRegister = () => {
    // Redirect to the registration page
    window.location.href = "/register";
  };

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
        className="py-1 px-2 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
      >
        Log out
      </button>
    );
  }
  return (
    <div className="flex space-x-2">
      <button
        onClick={handleSignIn}
        className="py-1 px-3 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
      >
        Sign in
      </button>
      <button
        onClick={handleRegister}
        className="py-1 px-3 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
      >
        Register
      </button>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const navStyle =
    "cursor-pointer transition-transform duration-200 transform hover:-translate-y-1 ease-in-out";

  return (
    <>
      {pathname === "/" || pathname === "/register" ? null : (
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
