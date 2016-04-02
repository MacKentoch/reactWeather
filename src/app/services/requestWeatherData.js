'use strict';

const DEFAULT_API_BASE_URL = 'http://localhost:3000/api/weatherdata/';

class ClassRequestWeatherData {
  constructor() {
    this.init();
  }

  init() {
    this.baseUrl = DEFAULT_API_BASE_URL;
  }

  ajax(url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(this.responseText);
      };
      xhr.onerror = reject;
      xhr.open('GET', url);
      xhr.send();
    });
  }

  shapeResponseObject(rawData, dayN) {
    if (rawData) {
      if (!rawData[0]) {
        return this.getNoDataObject();
      }
      const data = rawData[0];
      const weatherData = {
        dayName:      dayN === 1 ? 'Today' : data._source.dayStr,
        fullDate:     new Date(data._source.fullDate) + '',
        nowIsNight:   this.isNowNightTime(), // to show day or night comment depending current time
        commentDay:   data._source.commentDay,
        commentNight: data._source.commentNight,
        high:         data._source.high,
        avgDeltaHigh: data._source.avgDeltaHigh ? data._source.avgDeltaHigh + '' : '',
        low:          data._source.low,
        avgDeltaLow:  data._source.avgDeltaLow ? data._source.avgDeltaLow + '' : ''
      };
      return weatherData;
    }
    return this.getNoDataObject();
  }

  getNoDataObject() {
    return {
      dayName:      '---',
      fullDate:     null,
      nowIsNight:   this.isNowNightTime(), // to show day or night comment depending current time
      commentDay:   'sorry no data available',
      commentNight: 'sorry no data available',
      high:         '-',
      avgDeltaHigh: '',
      low:          '-',
      avgDeltaLow:  ''
    };
  }

  isNowNightTime() {
    let isNightTime     = true;
    const currentHours  = new Date().getHours();
    // let's say day time is between 6am and 6pm (going nearer equator is even more true all year long)
    if ((currentHours < 18) &&
        (currentHours > 6)) {
      isNightTime = false;
    }
    return isNightTime;
  }
}

export default new ClassRequestWeatherData();
