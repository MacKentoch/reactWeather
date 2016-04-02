'use strict';

import React                from 'react';
import classNames           from 'classnames';
import ViewContainer        from '../../containers/ViewContainer/ViewContainer.jsx';
import WeekSection          from '../../components/weekSection/WeekSection.jsx';
import { PromisedTimeout }  from '../../services/PromisedTimeout';
import requestWeatherData   from '../../services/requestWeatherData';


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
    let weatherData = [];
    // fetch weather data
    requestWeatherData
      .ajax(`${requestWeatherData.baseUrl}${1}`)
      .then((data) => {
        let response = JSON.parse(data);
        weatherData.push(requestWeatherData.shapeResponseObject(response.hits.hits, 1));
        return requestWeatherData.ajax(`${requestWeatherData.baseUrl}${2}`);
      })
      .then((data) => {
        let response = JSON.parse(data);
        weatherData.push(requestWeatherData.shapeResponseObject(response.hits.hits, 2));
        return requestWeatherData.ajax(`${requestWeatherData.baseUrl}${3}`);
      })
      .then((data) => {
        let response = JSON.parse(data);
        weatherData.push(requestWeatherData.shapeResponseObject(response.hits.hits, 3));
        return requestWeatherData.ajax(`${requestWeatherData.baseUrl}${4}`);
      })
      .then((data) => {
        let response = JSON.parse(data);
        weatherData.push(requestWeatherData.shapeResponseObject(response.hits.hits, 4));
        this.setState({
          weatherData: [].concat(weatherData)
        });
      });
    // launch delayed animations for weekBoxes components
    this.processWeekBoxesAnimationState();
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
