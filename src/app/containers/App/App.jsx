'use strict';

import React            from 'react';
import NavigationBar    from '../../components/navigation/NavigationBar.jsx';
import navigationModel  from '../../models/navigation.model.json';
import classNames       from 'classnames';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navModel: navigationModel
    };
  }

  render() {
    const navigationClasses       = classNames({
      'navbar'            : true,
      'navbar-default'    : false,
      'navbar-fixed-top'  : true,
      'navbar-inverse'    : true
    });

    return (
      <div>
        <NavigationBar
          brand={this.state.navModel.brand}
          navModel={this.state.navModel}
          cssClass={navigationClasses}
        />
      <div className="app_container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

// statics :
App.propTypes = {
  children  : React.PropTypes.node,
  history   : React.PropTypes.object,
  location  : React.PropTypes.object
};

export default App;
