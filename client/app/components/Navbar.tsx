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
                      MY PROJECTS
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

// ("use client");
// import { signIn, signOut, useSession } from "next-auth/react";
// import { usePathname } from "next/navigation";
// import logo from "@/public/lagalt_clean.png";
// import Image from "next/image";
// import Link from "next/link";

// export function AuthButton() {
//   const { data: session } = useSession();
//   const buttonStyle = "w-20 h-8 text-gray-400 text-sm rounded-lg shadow-md ";

//   const handleSignOut = () => {
//     signOut({ callbackUrl: "/" });
//   };

//   const handleSignIn = () => {
//     signIn(undefined, { callbackUrl: "/explore" });
//   };

//   if (session) {
//     return (
//       <button
//         onClick={handleSignOut}
//         className={`${buttonStyle} bg-[#FDFDFD] transition-colors duration-300 ease-in-out hover:bg-[#f3dc98] hover:text-white `}
//       >
//         Sign out
//       </button>
//     );
//   }
//   return (
//     <button
//       onClick={handleSignIn}
//       className={`${buttonStyle} bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 hover:to-green-400`}
//     >
//       Sign in
//     </button>
//   );
// }

// export default function Navbar() {
//   const pathname = usePathname();
//   const { data: session } = useSession();
//   const navStyle =
//     "cursor-pointer transition-transform duration-200 transform hover:-translate-y-1 ease-in-out py-2 px-4 text-lg font-semibold rounded-t-lg text-gray-700";

//   return (
//     <>
//       {pathname === "/" ? null : (
//         <nav className="w-full h-16 bg-[#CCCCCC] shadow-md flex items-center justify-between px-8">
//           <div
//             className="cursor-pointer"
//             onClick={() => (window.location.href = "/")}
//           >
//             <Image
//               src={logo}
//               alt="company-logo"
//               width={50}
//               height={20}
//               className="transition-transform duration-200 transform hover:scale-105"
//             />
//           </div>
//           <div className="flex space-x-4">
//             <div
//               onClick={() => (window.location.href = "/explore")}
//               className={`${navStyle} ${
//                 pathname.startsWith("/explore") && "text-[#FDFDFD]"
//               }`}
//             >
//               EXPLORE
//             </div>
//             {session && (
//               <>
//                 <div
//                   onClick={() => (window.location.href = "/projects")}
//                   className={`${navStyle} ${
//                     pathname.startsWith("/projects") && "text-[#FDFDFD]"
//                   }`}
//                 >
//                   MY PROJECTS
//                 </div>
//                 <div
//                   onClick={() => (window.location.href = "/profile")}
//                   className={`${navStyle} ${
//                     pathname.startsWith("/profile") && "text-[#FDFDFD]"
//                   }`}
//                 >
//                   PROFILE
//                 </div>
//               </>
//             )}
//           </div>
//           <div className="flex items-center space-x-4">
//             {session?.user ? (
//               <span className="text-gray-700 font-semibold text-sm">
//                 {session.user.name}
//               </span>
//             ) : (
//               <span className="text-gray-500">Want to join?</span>
//             )}
//             <AuthButton />
//           </div>
//         </nav>
//       )}
//     </>
//   );
// }
