module.exports = {
  apps: [
    {
      name: "dashboard-tech-frontend",
      script: "npm",
      args: "run preview",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      watch: false,
      autorestart: true,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "dashboard-tech-backend",
      script: "node",
      args: "backend/server.js",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      watch: false,
      autorestart: true,
      env: {
        NODE_ENV: "development",
        PORT: 8001,
        HOST: "127.0.0.1",
        MONGO_URI:
          "mongodb+srv://anikgo:CtNjTIxe12acTT0p@guardex.cb67k9p.mongodb.net/guardex?retryWrites=true&w=majority&appName=Guardex",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8001,
        HOST: "127.0.0.1",
        MONGO_URI:
          "mongodb+srv://anikgo:CtNjTIxe12acTT0p@guardex.cb67k9p.mongodb.net/guardex?retryWrites=true&w=majority&appName=Guardex",
      },
    },
  ],
};
