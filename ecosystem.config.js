module.exports = {
  apps: [
    {
      name: "frontend",
      script: "npm",
      args: "run dev -- --port 3005",
      cwd: "./",
      watch: false,
      autorestart: true,
    },
    {
      name: "backend",
      script: "node",
      args: "backend/server.js",
      cwd: "./",
      watch: true,
      autorestart: true,
      env: {
        PORT: 8001,
      },
    },
  ],
};
