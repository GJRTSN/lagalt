import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="mb-4 text-3xl text-gray-800">Welcome to Lagalt!</h1>
      <div className="flex w-3/4 justify-between">
        <div className="w-1/2 bg-white p-8 rounded-lg text-black">
          <h2 className="text-2xl mb-4">Login</h2>
          <form>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="w-full p-2 border rounded-lg"
                type="text"
                id="username"
                name="username"
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full p-2 border rounded-lg"
                type="password"
                id="password"
                name="password"
              />
            </div>
            <button className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
              Login
            </button>
          </form>
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center">
          <p className="mb-4 text-lg text-gray-600">New to Lagalt?</p>
          <Link href="/register">
            <button className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
              Register
            </button>
          </Link>
        </div>
      </div>
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
