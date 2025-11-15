import { spawn } from 'child_process';

const port = process.env.PORT || '5000';
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  console.log(`Starting Next.js production server on port ${port}...`);
  
  const nextStart = spawn('npx', ['next', 'start', '-p', port], {
    stdio: 'inherit',
    env: { ...process.env, PORT: port }
  });

  nextStart.on('error', (error) => {
    console.error('Failed to start Next.js:', error);
    process.exit(1);
  });

  nextStart.on('exit', (code) => {
    console.log(`Next.js exited with code ${code}`);
    process.exit(code || 0);
  });
} else {
  console.log(`Starting Next.js development server on port ${port}...`);
  
  const nextDev = spawn('npx', ['next', 'dev', '-p', port], {
    stdio: 'inherit',
    env: { ...process.env, PORT: port }
  });

  nextDev.on('error', (error) => {
    console.error('Failed to start Next.js:', error);
    process.exit(1);
  });

  nextDev.on('exit', (code) => {
    console.log(`Next.js exited with code ${code}`);
    process.exit(code || 0);
  });
}
