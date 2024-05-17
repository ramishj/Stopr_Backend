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
app.use("/",(req,res)=>{res.json({message:"Welcome to the watchlist API"})});
app.use('/auth', authRoutes);
app.use('/watchlist', watchlistRoutes);

app.use(errorHandler as ErrorRequestHandler); // Type assertion

mongoose.Promise = global.Promise;
const mongoURL = process.env.MONGO_DB || 'mongodb+srv://ramishjamal:ramish2002@cluster0.xl7rkhg.mongodb.net/';

mongoose.connect(mongoURL, {
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
