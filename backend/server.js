import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import morgan from 'morgan';
import Player from './models/playerModel';
import emoji from 'node-emoji';
import responseTime from 'response-time';
import favicon from 'serve-favicon';
import indexRouter from './routes/index';
import { playerRoute } from './routes/player';

const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// load .env
dotenv.config();

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

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// SWAGGER
const swaggerSpec = require('./src/config/swagger.config').spec();

const swaggerOptions = {
  customSiteTitle: 'Mern Api mongodb Documentation',
  customCss: '.topbar { display: none }',
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(swaggerSpec);
});

console.log(
  `mongodb://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`
);

mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}',
  {
    useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true
  })
  .then(() => {
    console.log(emoji.get('white_check_mark'), ' MongoSB connection success !');
  });

// limit repeated requests to endpoints such as password reset
app.use(
  new rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 50 requests per windowMs
    message: 'Too many requests from this IP, please try again in 15 minutes'
  })
);

// routes
app.use('/', indexRouter);
const routes = require('./routes/player');
routes(app);

// setup ip address and port number
app.set('port', port);
app.set('ipaddr', '0.0.0.0');

// start express server
app.listen(app.get('port'), app.get('ipaddr'), function () {
  console.log(
    emoji.get('heart'),
    'The server is running @ ' + 'http://localhost/' + app.get('port'),
    emoji.get('heart')
  );
});
