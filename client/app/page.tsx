"use client"
import { useState, useEffect } from 'react';

import Link from "next/link";
import keycloakInit from './keycloak/keycloak';

export default async function Home() {
  const [keycloak, setKeycloak] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const keycloakInstance = keycloakInit;
      setKeycloak(keycloakInstance);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="mb-4 text-3xl text-gray-800">Welcome!</h1>
      <p className="mb-2 text-lg text-gray-600">Please log in or register to continue</p>

      {keycloak && (
        <>
          <button 
            onClick={() => keycloak?.login()} 
            className="py-2 px-4 bg-blue-500 text-white rounded mr-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Login
          </button>
          <button 
            onClick={() => keycloak?.register()} 
            className="py-2 px-4 bg-red-500 text-white rounded ml-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
          >
            Register
          </button>
        </>
      )}

      <p className="mt-8 mb-2 text-gray-500">
      </p>
      <Link href="/explore">
        <button className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
          Continue
        </button>
      </Link>
    </div>
  );
}
}
