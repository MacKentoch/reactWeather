'use strict';

import React              from 'react';
import TemperatureBox     from './temperatureBox/TemperatureBox.jsx';

const DayWeatherBox = (props) => {
  const containerBoxClasses   = `${props.columnClass} ${props.animationClass}`;
  const sundayStyle           = {color: '#F1A9A0'};
  const saturdayStyle         = {color: '#CCCCCC'};

  return (
    <div className={containerBoxClasses}>
      <div className="thumbnail day_weather__box_container">
        <div className="caption">
          <h3
            className="day_weather__box_text day_weather__box_day_name"
            style={props.weather.dayName === 'Sunday' ? sundayStyle : (props.weather.dayName === 'Saturday' ? saturdayStyle: {}) }>
            {props.weather.dayName}
          </h3>
          <h4 className="day_weather__box_text day_weather__box_state">
            {props.weather.nowIsNight? props.weather.commentNight: props.weather.commentDay}
          </h4>
          <div className="day_weather__box_temperature_container">
            <TemperatureBox
              labelLowHigh="High"
              temperature={props.weather.high}
              diffTemperature={props.weather.avgDeltaHigh}
            />
            <TemperatureBox
              labelLowHigh="Low"
              temperature={props.weather.low}
              diffTemperature={props.weather.avgDeltaLow}
            />
          </div>
        </div>
      </div>

    </div>
  );
};

DayWeatherBox.propTypes = {
  columnClass:    React.PropTypes.string.isRequired,
  animationClass: React.PropTypes.string,
  weather:        React.PropTypes.shape({
    dayName:      React.PropTypes.string,
    fullDate:     React.PropTypes.date,
    nowIsNight:   React.PropTypes.bool,
    commentDay:   React.PropTypes.string,
    commentNight: React.PropTypes.string,
    high:         React.PropTypes.string,
    avgDeltaHigh: React.PropTypes.string,
    low:          React.PropTypes.string,
    avgDeltaLow:  React.PropTypes.string
  })
};

DayWeatherBox.defaultProps = {
  animationClass: '',
  weather: {
    dayName:      'Saturday',
    fullDate:     '----',
    nowIsNight:   false,
    commentDay:   '',
    commentNight: '',
    high:         '--',
    avgDeltaHigh: '',
    low:          '--',
    avgDeltaLow:  ''
  }

};
export default DayWeatherBox;
