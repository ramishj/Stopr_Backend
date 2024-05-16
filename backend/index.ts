import express, { ErrorRequestHandler } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config';
import authRoutes from './routes/authRoutes';
import watchlistRoutes from './routes/watchlistRoutes';

// Import errorHandler with TypeScript type definitions
import errorHandler from './utils/errorHandler';

const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/watchlist', watchlistRoutes);

app.use(errorHandler as ErrorRequestHandler); // Type assertion

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://ramishjamal:ramish2002@cluster0.xl7rkhg.mongodb.net/stopr', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
})
.catch((err) => { // TypeScript will infer the type of 'err' from the catch block
  console.error(err);
});
