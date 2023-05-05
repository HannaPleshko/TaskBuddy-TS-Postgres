import { config } from 'dotenv';

config();

export const { PORT, USER_DB, HOST_DB, DATABASE, PASSWORD_DB, PORT_DB } = process.env;
