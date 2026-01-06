import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly tell Turbopack the root of the project.
  // This is necessary to resolve the module path issue where Next.js
  // was incorrectly looking for node_modules in the parent directory.
  turbopack: {
    // Setting the root to the current directory (`.`) ensures
    // that module resolution starts from the project's actual root.
    root: '.',
  },
};

export default nextConfig;