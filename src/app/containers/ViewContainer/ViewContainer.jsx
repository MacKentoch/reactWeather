'use strict';

import React         from 'react';
import classNames    from 'classnames';


class ViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.state = {
      animated    : true,
      viewEnters  : false
    };
  }

  componentWillMount() {
    this.setState({
      viewEnters  : true
    });
  }

  processViewAnimationClasses() {
    const homeViewClasses = classNames({
      'animatedViews'    : this.state.animated,
      'invisible'        : !this.state.viewEnters,
      'view-enter'       : this.state.viewEnters
    });
    return homeViewClasses;
  }

  render() {
    return (
      <div
        className={this.processViewAnimationClasses()}>
        {this.props.children}
      </div>
    );
  }
}

ViewContainer.propTypes = {
  children    : React.PropTypes.node,
  isAnimated  : React.PropTypes.bool
};

ViewContainer.defaultProps = {
  isAnimated  : true
};

export default ViewContainer;
