import pino from 'pino';
import * as path from 'path';
import * as fs from 'fs';

const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
  },
  pino.multistream([
    { stream: pino.transport({ target: 'pino-pretty' }) },
    { stream: pino.destination(path.join(logsDir, 'app.log')) },
  ]),
);

export default logger;
