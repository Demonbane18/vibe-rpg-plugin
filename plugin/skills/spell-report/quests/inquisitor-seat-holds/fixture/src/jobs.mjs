// Background jobs, started once by every API instance.
import { sweepExpiredHolds } from './holds.mjs';

const SWEEP_EVERY_MS = 60_000;

export function startJobs({ db, logger }) {
  const timer = setInterval(sweepAndLog, SWEEP_EVERY_MS, db, logger, Date.now());
  timer.unref();
  return () => clearInterval(timer);
}

async function sweepAndLog(db, logger, now) {
  try {
    const count = await sweepExpiredHolds(db, now);
    if (count > 0) logger.info({ count }, 'returned seats from expired holds');
  } catch (err) {
    logger.error({ err }, 'hold sweep failed');
  }
}
