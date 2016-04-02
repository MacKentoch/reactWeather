/* eslint no-console:0 */
/* eslint no-unused-vars:0 */
import express          from 'express';
import path             from 'path';
import logger           from 'morgan';
import cookieParser     from 'cookie-parser';
import bodyParser       from 'body-parser';
import engine           from 'ejs-mate';
import weatherAPI       from './server/weatherAPI';
import * as elastic     from './server/elasticsearch';
import DateTools        from './server/weatherAPI/date-tools';
// configs
import appConfig        from './server/config';
// init mock histo weather data
import initMockHisto    from './server/initMockHisto';
// routes
import indexRoute       from './server/routes';
import weatherDataRoute from './server/routes/weatherdata';

const app           = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api', weatherDataRoute);
app.use('*',    indexRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// each server start :
// - reset data
// - add to db 28 days anterior to today of temperature high and low
initMockHisto();
// get from webservice (xml) and store today + 4 following days in DB
weatherAPI.getAndStoreFoursDaysWeatherData();


// set port, ippaddr
app.set('port',   appConfig.server.port);
app.set('ipaddr', appConfig.server.ip);
// lets run sever :
const server = app.listen(app.get('port'), app.get('ipaddr'), () => {
  console.info('NodeJS Express server listening on port ' + server.address().port);
});

export default app;
