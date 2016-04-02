/* eslint camelcase:0 */
import elasticsearch  from 'elasticsearch';
import appConfig      from '../config';

const PORT  = appConfig.eslasticsearch.port;
const IP    = appConfig.eslasticsearch.ip;
const LOG   = appConfig.eslasticsearch.log;
const elasticClient = new elasticsearch.Client({
  host: `${IP}:${PORT}`,
  log: `${LOG}`
});


const indexName = 'weatherindex';

export const deleteIndex = () => {
  return elasticClient.indices.delete({
    index: indexName
  });
};

export const initIndex = () => {
  return elasticClient.indices.create({
    index: indexName
  });
};

export const indexExists = () => {
  return elasticClient.indices.exists({
    index: indexName
  });
};

export const initMapping = () => {
  return elasticClient.indices.putMapping({
    index: indexName,
    type: 'weatherData',
    body: {
      properties: {
        fullDate:     { type: 'string' },
        dayStr:       { type: 'string' },
        commentDay:   { type: 'string' },
        commentNight: { type: 'string' },
        high:         { type: 'string' },
        avgDeltaHigh: { type: 'string' },
        low:          { type: 'string' },
        avgDeltaLow:  { type: 'string' }
      }
    }
  });
};

export const addWeatherData = (weatherData) => {
  return elasticClient.index({
    index: indexName,
    type: 'weatherData',
    body: {
      fullDate:     weatherData.fullDate,
      dayStr:       weatherData.dayStr,
      commentDay:   weatherData.commentDay,
      commentNight: weatherData.commentNight,
      high:         weatherData.high,
      avgDeltaHigh: weatherData.avgDeltaHigh,
      low:          weatherData.low,
      avgDeltaLow : weatherData.avgDeltaLow
    }
  });
};

export const getThisDateWeatherData = (fullDate) => {
  // fullDate is a Date parsed : Date.parse('3/2/16')
  const query = {
    index: indexName,
    type: 'weatherData',
    body : {
      query: {
        match : { fullDate : fullDate }
      }
    }
  };
  return elasticClient.search(query);
};

export const getAllWeatherData = () => {
  return elasticClient.search({
    index: indexName,
    type: 'weatherData',
    'query': { 'match_all': {}},
    'size':  1000
  });
};
