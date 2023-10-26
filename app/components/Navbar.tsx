"use client";
import { usePathname } from "next/navigation";
import logo from "@/public/lagalt_clean.png";
import Image from "next/image";
import Link from "next/link";
import { useUserContext } from "@/app/contexts/userContext";

export default function Navbar() {
  const { user, logout } = useUserContext();
  const userId = user?.userId;
  const pathname = usePathname();
  const navStyle =
    "cursor-pointer transition-transform duration-200 transform hover:-translate-y-1 ease-in-out";

  // Function to handle user logout
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {pathname === "/" || pathname === "/register" ? null : (
        <div className="w-full h-16 relative bg-[#FDFDFD] flex flex-row justify-center gap-12 items-center">
          <Image
            src={logo}
            className="absolute left-0 ml-6 transition ease-in-out 1s p-2 rounded shadow-s hover:opacity-70"
            alt="explore"
            width="50"
            height="20"
          />
          <div
            id="pagesContainer"
            className="absolute bottom-0 flex flex-row w-3/5 justify-center space-x-8"
          >
            <div
              className={`link transition-colors duration-300 ease-in-out ${
                pathname.startsWith("/explore")
                  ? "bg-[#67864e] border border-transparent h-3/5 flex items-center rounded-t-md px-4"
                  : "bg-[#FDFDFD] border border-transparent h-3/5 flex items-center rounded-t-md px-4 text-gray-700"
              }`}
            >
              <Link href="/explore">
                <h2 className={`text-2xl ${navStyle}`}>EXPLORE</h2>
              </Link>
            </div>
            {user ? (
              <>
                <div
                  className={`link transition-colors duration-300 ease-in-out ${
                    pathname.startsWith("/projects")
                      ? "bg-[#67864e] border border-transparent h-3/5 flex items-center rounded-t-md px-4"
                      : "bg-[#FDFDFD] border border-transparent h-3/5 flex items-center rounded-t-md px-4 text-gray-700"
                  }`}
                >
                  <Link href="/projects">
                    <h2 className={`text-2xl ${navStyle}`}>PROJECTS</h2>
                  </Link>
                </div>

                <div
                  className={`link transition-colors duration-300 ease-in-out ${
                    pathname.startsWith("/profile")
                      ? "bg-[#67864e] border border-transparent h-3/5 flex items-center rounded-t-md px-4"
                      : "bg-[#FDFDFD] border border-transparent h-3/5 flex items-center rounded-t-md px-4  text-gray-700"
                  }`}
                >
                  <Link href="/profile">
                    <h2 className={`text-2xl  ${navStyle}`}>PROFILE</h2>
                  </Link>
                </div>
              </>
            ) : null}
          </div>
          <div className="flex flex-col absolute right-0 justify-center items-center gap-1 mr-6 text-white">
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <div className="flex flex-col  text-black p-2 ">
                    <h4 className="text-md font-semibold">{`${user.forName} ${user.lastName}`}</h4>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn py-1 px-2 text-black border-2 border-gray-700  rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/">
                  <button className="btn py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
