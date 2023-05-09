import { config } from 'dotenv';

config();

export const { PORT, LOG_DIR, LOG_FORMAT } = process.env;
