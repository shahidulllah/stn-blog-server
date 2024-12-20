import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();
import cors from 'cors';
import router from './app/routes';

//perser
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

//application routes
app.use('/api', router);

//checking
app.get('/', (req, res) => {
  res.send('Hello, Welcome to the STN blog Server!');
});

export default app;
