"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import logo from "@/public/lagalt_clean.png";
import usericon from "@/public/user-solid.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Link href="/">
          <button
            onClick={() => signOut()}
            className="w-24 h-8 bg-green-700 rounded-md"
          >
            {" "}
            Sign out
          </button>
        </Link>
      </>
    );
  }
  return (
    <>
      <button
        onClick={() => signIn()}
        className="w-24 h-8 bg-green-700 rounded-md"
      >
        Sign in
      </button>
    </>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="w-full h-24 relative bg-[#004080] flex flex-row justify-center gap-12 items-center">
      <Image
        src={logo}
        className="absolute left-0 ml-6 transition ease-in-out 1s p-2 rounded shadow-s hover:opacity-70"
        alt="explore"
        width="70"
        height="20"
      />
      <p className="mb-8">Friday 06. october 2023</p>

      <div
        id="pagesContainer"
        className="absolute bottom-0 flex flex-row w-3/5 justify-between"
      >
        <div
          className={`link transition-colors duration-300 ease-in-out ${
            pathname === "/explore"
              ? "bg-yellow-500 border border-transparent h-3/5 flex items-center rounded-t-md px-4 shadow-inner-md"
              : "bg-[#004080] border border-transparent h-3/5 flex items-center rounded-t-md px-4"
          }`}
        >
          <Link href="/explore">
            <h2 className="text-4xl font-lora font-bold">EXPLORE</h2>
          </Link>
        </div>

        <div
          className={`link transition-colors duration-300 ease-in-out ${
            pathname === "/projects"
              ? "bg-yellow-500 border border-transparent h-3/5 flex items-center rounded-t-md px-4 shadow-inner-md"
              : "bg-[#004080] border border-transparent h-3/5 flex items-center rounded-t-md px-4"
          }`}
        >
          <Link href="/projects">
            <h2 className="text-4xl font-lora font-bold">MY PROJECTS</h2>
          </Link>
        </div>

        <div
          className={`link transition-colors duration-300 ease-in-out ${
            pathname === "/profile"
              ? "bg-yellow-500 border border-transparent h-3/5 flex items-center rounded-t-md px-4 shadow-inner-md"
              : "bg-[#004080] border border-transparent h-3/5 flex items-center rounded-t-md px-4"
          }`}
        >
          <Link href="/profile">
            <h2 className="text-4xl font-lora font-bold">PROFILE</h2>
          </Link>
        </div>
      </div>

      <div className="flex flex-col absolute right-0 justify-center items-center gap-1 mr-6 text-white">
        {/* <Image
          src={usericon}
          className="absolute left-0 ml-6 transition ease-in-out 1s p-2 rounded shadow-s hover:opacity-70 text-white"
          alt="explore"
          width="70"
          height="20"
        /> */}
        <p className="">Logged in as:</p>
        <p className="font-bold">Name Lastname</p>
        <AuthButton />
      </div>
    </div>
  );
}