import { setupFastify, startFastify } from '@/modules/fastify';
import { setupMetrics } from '@/modules/metrics';
import { setupMikroORM } from '@/modules/mikro';
import { scopedLogger } from '@/services/logger';

const log = scopedLogger('mw-backend');

async function bootstrap(): Promise<void> {
  log.info(`App booting...`, {
    evt: 'setup',
  });

  const app = await setupFastify();
  await setupMikroORM();
  await setupMetrics(app);

  await startFastify(app);

  log.info(`App setup, ready to accept connections`, {
    evt: 'success',
  });
  log.info(`--------------------------------------`);
}

bootstrap().catch((err) => {
  log.error(err, {
    evt: 'setup-error',
  });
  process.exit(1);
});
