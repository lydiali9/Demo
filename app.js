const express = require("express");
const config = require("config-lite");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const connectMongo = require("connect-mongo");
const winston = require("winston");
const expressWinston = require("express-winston");
const history = require("connect-history-api-fallback");
const chalk = require("chalk");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const constant = require('./utils/constant');
const db = require("./mongodb/db.js");
const router = require("./routes/index.js");

const app = express();

app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, x-access-token, UserId");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
    res.header("Content-Type", "application/json;charset=utf-8");
	res.header("X-Powered-By", '3.2.1');
	if (req.method == 'OPTIONS') {
	  	res.send(200);
	} else {
	    next();
	}
});

app.set('superSecret', constant.TOKEN_SECRET);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// app.use(Statistic.apiRecord)
const MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(session({
	name: config.session.name,
	secret: config.session.secret,
	resave: false,
	saveUninitialized: true,
	cookie: config.session.cookie,
	store: new MongoStore({
	  	url: config.url
	})
}))

/*app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
          json: true,
          colorize: true
        }),
        new winston.transports.File({
          filename: 'logs/success.log'
        })
    ]
}));*/

//router(app);
app.use(router);

/*app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        }),
        new winston.transports.File({
          filename: 'logs/error.log'
        })
    ]
}));*/

app.use(history());
app.listen(config.port, () => {
	console.log(
		chalk.green(`成功监听端口：${config.port}`)
	)
});