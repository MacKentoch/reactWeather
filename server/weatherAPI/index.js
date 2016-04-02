import xml2js       from 'xml2js';
import request      from 'request';
// import dateTools    from './date-tools';
import * as elastic from '../elasticsearch';

const parseString = xml2js.parseString;

class ClassWeatherAPI {
  constructor() {
    this.parseString          = parseString;
    this.highMAX              = 15;
    this.highMIN              = 25;
    this.minMAX               = 5;
    this.minMIN               = 15;
    this.maxHistoPreviousDays = 28;
    this.fakeHistoData        = this.generate28LowHighDownwardFromToday();
  }

  getJsonFromXmlString(xmlString) {
    let json = '';
    if (xmlString) {
      parseString(xmlString, (err, result) => {
        json = JSON.stringify(result);
      });
    }
    return json;
  }

  getRandomHigh() {
    const rndHigh = Math.floor(
      Math.random() * (this.highMAX - this.highMIN + 1)
    ) + this.highMIN;
    return rndHigh;
  }

  getRandomLow() {
    const rndLow = Math.floor(
      Math.random() * (this.minMAX - this.minMIN + 1)
    ) + this.minMIN;
    return rndLow;
  }

  getJsonFromXmlService(url, callback) {
    let body = '';
    const option = {
      headers: {
        connection: 'keep-alive'
      }
    };
    request
      .get(url, option)
      .on('data', (data) => {
        body += data;
      })
      .on('end', () => {
        this.parseString(body, (err, result) => {
          callback(result);
        });
      });
  }

  generate28LowHighDownwardFromToday() {
    let histoModel = [];
    for (let i = 1; i <= this.maxHistoPreviousDays; i++) {
      const day       = new Date(Date.now() - (i*24*60*60*1000));
      const dayDay    = day.getDate();
      const dayMonth  = day.getMonth() + 1;
      const dayYear   = day.getFullYear().toString().substring(2,4);
      const shortDate = `${dayMonth}/${dayDay}/${dayYear}`;
      const dayParsed = Date.parse(shortDate);

      const previousDay = {
        fullDate:     dayParsed,
        dayStr:       'fakeData',
        commentDay:   'fakeData',
        commentNight: 'fakeData',
        high:         this.getRandomHigh(),
        avgDeltaHigh: '',
        low:          this.getRandomLow(),
        avgDeltaLow:  ''
      };
      histoModel.push(previousDay);
    }
    return histoModel;
  }

  processAverageHighAndLow(fakeHistoArray, oneDayWeatherData) {
    let avgHigh = 0;
    let avgLow  = 0;
    let nbData  = fakeHistoArray.length;

    fakeHistoArray.forEach((fakeWeather) => {
      avgHigh = (Number(avgHigh)  + Number(fakeWeather.high)) ;
      avgLow  = (Number(avgLow)   + Number(fakeWeather.low));
    });

    avgHigh = avgHigh / nbData;
    avgLow  = avgLow  / nbData;

    oneDayWeatherData.avgDeltaHigh  = Math.round((Number(oneDayWeatherData.high) - avgHigh)  === 0 ? '' : Number(oneDayWeatherData.high) - avgHigh);
    oneDayWeatherData.avgDeltaLow   = Math.round((Number(oneDayWeatherData.low)  - avgLow)   === 0 ? '' : Number(oneDayWeatherData.low)  - avgLow);
    return Object.assign({}, oneDayWeatherData);
  }

  getAndStoreFoursDaysWeatherData() {
    const nbDaysToRetrieve = 4;

    this.getJsonFromXmlService(
      `http://wxdata.weather.com/wxdata/weather/local/UKXX0085?cc=*&unit=m&dayf=${nbDaysToRetrieve}`,
      (data) => {
        if (data) {
          data.weather.dayf[0].day.forEach((oneDayData, index) => {
            const dayN        = new Date(Date.now() + ((index)*24*60*60*1000));

            const dayNDay     = dayN.getDate();
            const dayNMonth   = dayN.getMonth() + 1;
            const dayNYear    = dayN.getFullYear().toString().substring(2,4);
            const shortDate   = `${dayNMonth}/${dayNDay}/${dayNYear}`;
            const dayNParsed  = Date.parse(shortDate);

            let fullDate     = dayNParsed;
            let dayStr       = oneDayData['$'].t;
            let high         = oneDayData.hi[0];
            let low          = oneDayData.low[0];
            let commentDay   = oneDayData.part[0].t[0];
            let commentNight = oneDayData.part[1].t[0];

            let weatherData = {
              fullDate:     fullDate,
              dayStr:       dayStr,
              commentDay:   commentDay,
              commentNight: commentNight,
              high:         high,
              avgDeltaHigh: '',
              low:          low,
              avgDeltaLow:  ''
            };
            // add avg high and low temp.
            const dataWeather = this.processAverageHighAndLow(this.fakeHistoData, weatherData);
            // save to elasticsearch
            elastic.addWeatherData(dataWeather);
          })
        }
      }
    );
  }

}

export default new ClassWeatherAPI();
