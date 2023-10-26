/** @type {import('next').NextConfig} */
import { startServer } from 'next-auth';

const nextConfig = {};

const expressSession = require('express-session');


module.exports = {
  async headers() {
    return [
      {
        source: "/api/auth",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: 'http://localhost:3000',
        },
        ],
      },
    ];
  },

  session: {
    store: new expressSession.MemoryStore(), // Use MemoryStore for server-side storage
    jwt: true,
  },

  nextConfig,

  
};

startServer({
    // ... other configurations
    express: (expressApp) => {
      // Use asyncStorageMiddleware
      expressApp.use(asyncStorageMiddleware);
      // ... other middleware and configurations
    },
  });