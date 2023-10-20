import { AuthButton } from "./components/Navbar";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="mb-4 text-3xl text-gray-800">Welcome!</h1>
      <p className="mb-2 text-lg text-gray-600">Please log in or register to continue</p>
      <AuthButton />
      <p className="mt-8 mb-2 text-gray-500">
        or browse as a guest with limited access
      </p>
      <Link href="/explore">
        <button className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
          Continue
        </button>
      </Link>
    </div>
  );
}
