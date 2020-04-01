import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import emoji from 'node-emoji';
import responseTime from 'response-time';
import favicon from 'serve-favicon';
import indexRouter from './routes/index';
import mongoose from 'mongoose';
import playerRouter from './routes/player';
import userRouter from './routes/userRoutes';

const app = express(),
  bodyParser = require('body-parser'),
  hostname = '0.0.0.0';

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// load .env
require('dotenv').config();

// secure the server by setting various HTTP headers
app.use(helmet());

// only parse JSON
app.use(express.json());

// only parse urlencoded bodies
app.use(express.urlencoded({ extended: false }));

// protect against HTTP parameter pollution attacks
app.use(hpp());

// gzip/deflate/br compression outgoing responses
app.use(compression());

// parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());

// allow AJAX requests to skip the Same-origin policy and access resources from remote hosts
app.use(cors());

// serve a visual favicon for the browser
app.use(favicon(__dirname + '/favicon.ico'));

// request logger | (dev) output are colored by response status
app.use(morgan('dev'));

// records the response time for HTTP requests
app.use(responseTime());

console.log(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
);

mongoose.Promise = global.Promise;
mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
  {
    useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true
  })
  .then(() => {
    console.log(emoji.get('white_check_mark'), ' MongoDB connection success !');
  })
  .catch(error => {
    console.log('MongoDB connection failed...' + error);
  });

// limit repeated requests to endpoints such as password reset
app.use(
  new rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 50 requests per windowMs
    message: 'Too many requests from this IP, please try again in 15 minutes'
  })
);

//models

// routes
app.use('/', indexRouter);
app.use('/players', playerRouter);
app.use('/users', userRouter);

const port = process.env.PORT || 3000;

// start express server
app.listen(port, hostname, function () {
  console.log(
    emoji.get('heart'),
    'The server is running @ ' + 'http://localhost/' + port,
    emoji.get('heart')
  );
});
