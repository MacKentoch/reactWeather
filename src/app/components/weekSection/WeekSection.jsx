'use strict';

import React            from 'react';
import { WhiteSection } from '../../components/backgrounds';
import DayWeatherBox    from './dayWeatherBox/DayWeatherBox.jsx';

class WeekSection extends React.Component {

  renderDayWeatherBoxes() {
    const nbDays = this.props.weatherData.length;

    let boxesColClass = 'col-sm-3';
    switch (nbDays) {
    case 2:
      boxesColClass = 'col-sm-6';
      break;
    case 3:
      boxesColClass = 'col-sm-4';
      break;
    case 4:
      boxesColClass = 'col-sm-3';
      break;
    default:
      boxesColClass = 'col-md-3';
    }

    const noDataAvailable = (
      <div className="row">
        <div className="col-xs-12">
          <h1>
            sorry no data available
          </h1>
        </div>
      </div>
      );
    const dayWeatherBoxes = this.props.weatherData.map((oneDayData, dayIndex) => {
      let dayAnimationClass = '';

      switch (dayIndex) {
      case 0:
        dayAnimationClass = this.props.dayZeroClass;
        break;

      case 1:
        dayAnimationClass = this.props.dayOneClass;
        break;

      case 2:
        dayAnimationClass = this.props.dayTwoClass;
        break;

      case 3:
        dayAnimationClass = this.props.dayThreeClass;
        break;

      default:
        dayAnimationClass = this.props.dayZeroClass;
      }
      return (
        <DayWeatherBox
          key={dayIndex}
          columnClass={boxesColClass}
          weather={oneDayData}
          triggerAnimation={this.props.triggerAnimation}
          animationDelay={this.props.triggerAnimation}
          animationClass={dayAnimationClass}
        />
      );
    });
    return nbDays > 0 ? dayWeatherBoxes : noDataAvailable;
  }

  render() {
    return (
      <WhiteSection id="weekSection">
        <div className="row titleWeatherBoxesSection">
          <div className="col-xs-12 ">
            <h1 className="text-center titleWeatherBoxesText">
              {this.props.title}
            </h1>
          </div>
        </div>
        <div className="row dayWeatherBoxeSection">
          {this.renderDayWeatherBoxes()}
        </div>
      </WhiteSection>
    );
  }
}

WeekSection.propTypes = {
  title:            React.PropTypes.string.isRequired,
  weatherData:      React.PropTypes.arrayOf(
    React.PropTypes.shape({
      dayName:      React.PropTypes.string,
      fullDate:     React.PropTypes.string,
      nowIsNight:   React.PropTypes.bool,
      commentDay:   React.PropTypes.string,
      commentNight: React.PropTypes.string,
      high:         React.PropTypes.string,
      avgDeltaHigh: React.PropTypes.string,
      low:          React.PropTypes.string,
      avgDeltaLow:  React.PropTypes.string
    })),
  triggerAnimation: React.PropTypes.bool,
  animationDelay:   React.PropTypes.number,
  dayZeroClass:     React.PropTypes.string,
  dayOneClass:      React.PropTypes.string,
  dayTwoClass:      React.PropTypes.string,
  dayThreeClass:    React.PropTypes.string
};

WeekSection.defaultProps = {
  title             : '',
  triggerAnimation  : false,
  animationDelay    : 1000
};

export default WeekSection;
