'use strict';

import React                from 'react';
import ViewContainer        from '../../containers/ViewContainer/ViewContainer.jsx';

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        id="homeView"
        key="homeView">
        <ViewContainer
          isAnimated={true}>
          <div className="row">
            <div className="col-xs-12">
              <div className="jumbotron about_view_jumbotron">
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
