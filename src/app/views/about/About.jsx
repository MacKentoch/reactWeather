'use strict';

import React                from 'react';
import ViewContainer        from '../../containers/ViewContainer/ViewContainer.jsx';
import classNames           from 'classnames';
import { PromisedTimeout }  from '../../services/PromisedTimeout';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.state = {
      animated:         true,
      jumbotronAnimate: false
    };
  }

  componentDidMount() {
    PromisedTimeout
      .delay(500)
      .then(() => {
        this.setState({
          jumbotronAnimate: true
        });
      });
  }

  render() {
    const jumbotronClass = classNames({
      'animated':             this.state.animated,
      'invisible':            !this.state.jumbotronAnimate,
      'zoomIn':               this.state.jumbotronAnimate,
      'jumbotron':            true,
      'about_view_jumbotron': true
    });

    return (
      <div
        id="homeView"
        key="homeView">
        <ViewContainer
          isAnimated={true}>
          <div className="row">
            <div className="col-xs-12">
              <div className={jumbotronClass}>
                <h1>
                  Why this view?
                </h1>
                <p>
                  A single page application without client side routing would not be a single page.
                </p>
                <p>
                  So this View is just an excuse to use react-router.
                </p>
                <p>
                  <a
                    className="btn btn-primary btn-lg"
                    href="https://github.com/MacKentoch">
                    See more in my github
                    &nbsp;
                    <i className="fa fa-github"></i>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </ViewContainer>
      </div>
    );
  }
}
export default About;
