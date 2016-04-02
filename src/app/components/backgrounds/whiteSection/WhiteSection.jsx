'use strict';

import React from 'react';

const WhiteSection = (props) => {
  return (
    <div className="white-section">
      <div className="containersCustom">
        {props.children}
      </div>
    </div>
  );
};

WhiteSection.propTypes = {
  children : React.PropTypes.node
};

export default WhiteSection;
