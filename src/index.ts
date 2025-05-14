import { startServer } from './server';
import 'dotenv/config';

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

async function main() {
  await startServer();
}

main();
