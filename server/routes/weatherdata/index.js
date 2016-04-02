/* eslint no-unused-vars:0 */
import express      from 'express';
import * as elastic from '../../elasticsearch';
import weatherAPI   from '../../weatherAPI';

const router = express.Router();

router.get('/weatherdata/:day', (req, res, next) => {
  console.info(`request for day: ${req.params.day}`);

  if (req.params.day === '1') {
    // gives data weather for today
    const day0        = new Date(Date.now());
    const day0Day     = day0.getDate();
    const day0Month   = day0.getMonth() + 1;
    const day0Year    = day0.getFullYear().toString().substring(2, 4);
    const day0Parsed  = Date.parse(`${day0Month}/${day0Day}/${day0Year}`);
    elastic
      .getThisDateWeatherData(day0Parsed)
      .then((result) => res.json(result));
  }

  if (req.params.day === '2') {
    // gives data weather for today +1
    const day1        = new Date(Date.now() + (1*24*60*60*1000));
    const day1Day     = day1.getDate();
    const day1Month   = day1.getMonth() + 1;
    const day1Year    = day1.getFullYear().toString().substring(2, 4);
    const day1Parsed  = Date.parse(`${day1Month}/${day1Day}/${day1Year}`);
    elastic
      .getThisDateWeatherData(day1Parsed)
      .then((result) => res.json(result));
  }

  if (req.params.day === '3') {
    // gives data weather for today +2
    const day2        = new Date(Date.now() + (2*24*60*60*1000));
    const day2Day     = day2.getDate();
    const day2Month   = day2.getMonth() + 1;
    const day2Year    = day2.getFullYear().toString().substring(2, 4);
    const day2Parsed  = Date.parse(`${day2Month}/${day2Day}/${day2Year}`);
    elastic
      .getThisDateWeatherData(day2Parsed)
      .then((result) => res.json(result));
  }

  if (req.params.day === '4') {
    // gives data weather for today +3
    const day3        = new Date(Date.now() + (3*24*60*60*1000));
    const day3Day     = day3.getDate();
    const day3Month   = day3.getMonth() + 1;
    const day3Year    = day3.getFullYear().toString().substring(2, 4);
    const day3Parsed  = Date.parse(`${day3Month}/${day3Day}/${day3Year}`);
    elastic
      .getThisDateWeatherData(day3Parsed)
      .then((result) => res.json(result));
  }
});

  // gives all histo weather data (for development)
  router.get('/weatherdata', (req, res, next) => {
    elastic
      .getAllWeatherData()
      .then((result) => res.json(result));
  });

export default router;
