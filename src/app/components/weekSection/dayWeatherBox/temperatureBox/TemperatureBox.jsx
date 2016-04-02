'use strict';

import React from 'react';

const TemperatureBox = (props) => {
  return (
    <div className="row temperature_box_text__container">
      <div className="col-xs-3">
        <span className="text-left temperature_box_text">
          {props.labelLowHigh}:
        </span>
      </div>
      <div className="col-xs-2">
        <span className="text-left temperature_box_text">
          {props.temperature}°
        </span>
      </div>
      <div className="col-xs-2">
        <span className="text-left temperature_box_text">
          {props.diffTemperature ? props.diffTemperature : ''}
        </span>
      </div>
    </div>
  );
};

TemperatureBox.propTypes = {
  labelLowHigh:     React.PropTypes.string.isRequired,
  temperature:      React.PropTypes.string.isRequired,
  diffTemperature:  React.PropTypes.string.isRequired
};

export default TemperatureBox;
