'use strict';

import React                from 'react';
import classNames           from 'classnames';
import _                    from 'lodash';
import ViewContainer        from '../../containers/ViewContainer/ViewContainer.jsx';
import WeekSection          from '../../components/weekSection/WeekSection.jsx';
import { PromisedTimeout }  from '../../services/PromisedTimeout';
import requestWeatherData   from '../../services/requestWeatherData';

const DAYS_TO_FETCH  =[1, 2, 3, 4];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.state = {
      weatherData:      [],
      animated:         true,
      dayZeroAnimate:   false,
      dayOneAnimate:    false,
      dayTwoAnimate:    false,
      dayThreeAnimate:  false
    };
  }

  componentDidMount() {
    // fetch weather data
    DAYS_TO_FETCH.map((dayNum) => {
      requestWeatherData.loadWeatherData(
        dayNum,
        (data) => this.addOneDayToWeatherDataState(data, dayNum),
        (error) => console.dir(error)
      );
    });
    // launch delayed animations for weekBoxes components
    this.processWeekBoxesAnimationState();
  }

  addOneDayToWeatherDataState(oneDayData, dayNum) {
    let newWeatherDataState = [].concat(this.state.weatherData);
    newWeatherDataState.push(oneDayData);

    newWeatherDataState.sort((a, b) => a.rawDate - b.rawDate);
    
    newWeatherDataState = this.reorderData(newWeatherDataState);
    this.setState({
      weatherData: [].concat(newWeatherDataState)
    });
  }

  reorderData(arrayData) {
    let sortedArray = [].concat(arrayData);
    _.sortBy(sortedArray, (o) => {
      return o.rawDate;
    });
    return sortedArray;
  }

  processWeekBoxesAnimationState() {
    PromisedTimeout
      .delay(800)
      .then(() => {
        this.setState({
          dayZeroAnimate: true
        });
        return PromisedTimeout.delay(400);
      })
      .then(() => {
        this.setState({
          dayOneAnimate : true
        });
        return PromisedTimeout.delay(400);
      })
      .then(() => {
        this.setState({
          dayTwoAnimate : true
        });
        return PromisedTimeout.delay(400);
      })
      .then(() => {
        this.setState({
          dayThreeAnimate: true
        });
      });
  }

  getDayZeroClass() {
    let dayZeroClasses = classNames({
      'animated':   this.state.animated,
      'invisible':  !this.state.dayZeroAnimate,
      'fadeIn':     this.state.dayZeroAnimate
    });
    return dayZeroClasses;
  }

  getDayOneClass() {
    let dayOneClasses = classNames({
      'animated':   this.state.animated,
      'invisible':  !this.state.dayOneAnimate,
      'fadeIn':     this.state.dayOneAnimate
    });
    return dayOneClasses;
  }

  getDayTwoClass() {
    let dayOneClasses = classNames({
      'animated':   this.state.animated,
      'invisible':  !this.state.dayTwoAnimate,
      'fadeIn':     this.state.dayTwoAnimate
    });
    return dayOneClasses;
  }

  getDayThreeClass() {
    let dayOneClasses = classNames({
      'animated':   this.state.animated,
      'invisible':  !this.state.dayThreeAnimate,
      'fadeIn':     this.state.dayThreeAnimate
    });
    return dayOneClasses;
  }

  render() {
    return(
      <div
        id="homeView"
        key="homeView">
        <ViewContainer
          isAnimated={true}>
          <WeekSection
            title={'London'}
            weatherData={this.state.weatherData}
            triggerAnimation={this.state.animHomeCarousel}
            animationDelay={1500}
            dayZeroClass={this.getDayZeroClass()}
            dayOneClass={this.getDayOneClass()}
            dayTwoClass={this.getDayTwoClass()}
            dayThreeClass={this.getDayThreeClass()}
          />
        </ViewContainer>
      </div>
    );
  }
}

export default Home;
