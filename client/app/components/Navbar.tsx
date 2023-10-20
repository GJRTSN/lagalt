"use client";
import { usePathname } from "next/navigation";
import logo from "@/public/lagalt_clean.png";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/app/contexts/userContext";

export default function Navbar() {
  const { user, logout } = useContext(UserContext);
  const pathname = usePathname();
  const navStyle =
    "cursor-pointer transition-transform duration-200 transform hover:-translate-y-1 ease-in-out";

  const handleLogout = () => {
    logout();
  };

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

            <div
              className={`link transition-colors duration-300 ease-in-out ${
                pathname.startsWith("/projects")
                  ? "bg-[#8cb669] border border-transparent h-3/5 flex items-center rounded-t-md px-4"
                  : "bg-[#CCCCCC] border border-transparent h-3/5 flex items-center rounded-t-md px-4 text-gray-700"
              }`}
            >
              <Link href="/projects">
                <h2 className={`text-2xl font-roboto ${navStyle}`}>PROJECTS</h2>
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
                <h2 className={`text-2xl font-roboto ${navStyle}`}>PROFILE</h2>
              </Link>
            </div>
          </div>

          <div className="flex flex-col absolute right-0 justify-center items-center gap-1 mr-6 text-white">
            <div className="flex items-center space-x-4">
              <h4>{user ? `${user.forName} ${user.lastName}` : "Guest"}</h4>
              {user ? (
                <button onClick={handleLogout} className="btn">
                  Logout
                </button>
              ) : (
                <Link href="/login">
                  <button className="btn">Login</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
