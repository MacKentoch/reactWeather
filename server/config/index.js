const config = {
  server : {
    port  : 3000,
    ip    : 'localhost'
  },
  service: {
    url: 'http://wxdata.weather.com/wxdata/weather/local/UKXX0085?cc=*&unit=m&dayf='
  },
  eslasticsearch: {
    port  : 9200,
    ip    : 'localhost',
    log   : 'info'
  }
};

export default config;
