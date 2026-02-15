module.exports = {
  apps: [
    {
      name: 'nickhong-dev',
      cwd: '/home/torestinbar/.openclaw/workspace/nickhong.xyz',
      script: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: 'development',
        PORT: 3020
      },
      watch: false,
      restart_delay: 3000,
      max_restarts: 5,
      min_uptime: '10s'
    },
    {
      name: 'nickhong-ngrok',
      script: 'ngrok',
      args: 'http 3020',
      restart_delay: 5000,
      max_restarts: 5,
      min_uptime: '10s'
    }
  ]
};