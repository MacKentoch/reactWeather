import * as elastic from '../elasticsearch';
import weatherAPI   from '../weatherAPI';

const initMockHisto = () => {
  return elastic
    .indexExists()
    .then((exists) => {
      if (exists) {
        return elastic.deleteIndex();
      }
    })
    .then(() => {
      return elastic
            .initIndex()
            .then(elastic.initMapping)
            .then(() => {
              const promises = weatherAPI.fakeHistoData.map(
                (weatherData) => {
                  return elastic.addWeatherData({
                    fullDate:     weatherData.fullDate,
                    dayStr:       weatherData.dayStr,
                    commentDay:   weatherData.commentDay,
                    commentNight: weatherData.commentNight,
                    high:         weatherData.high,
                    avgDeltaHigh: '',
                    low:          weatherData.low,
                    avgDeltaLow:  ''
                  });
                });
              return Promise.all(promises);
            });
    });
};

export default initMockHisto;
