import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';

import { rateLimit } from 'express-rate-limit';
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20,
  });

import dotenv from 'dotenv';
dotenv.config();

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// IMPORT ROUTES //
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import apiRouter from './routes/api.js';

// SET UP MONGOOSE CONNECTION
import mongoose from 'mongoose';
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_CONNECTION_STRING;

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB, { dbName: 'chat' });
    console.log('connected to mongodb');
}

const app = express();

app.use(compression());
app.use(helmet.contentSecurityPolicy({
    directives: {
        "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
        },
    }),
);
app.use(limiter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);


export default app;