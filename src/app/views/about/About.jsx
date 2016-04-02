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
          <h1>
            About view
          </h1>
        </ViewContainer>
      </div>
    );
  }
}
export default About;
