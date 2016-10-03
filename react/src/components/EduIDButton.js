import React, { PropTypes } from 'react';

import { Button, Glyphicon } from 'react-bootstrap';
import 'style/EduIDButton.scss';


const EduIDButton = React.createClass({

  render:  function () {
    const { spinning, ...other } = this.props,
          classes = spinning && 'active has-spinner' || 'has-spinner',
          disabled = spinning && true || false;
        
    return (
        <Button className={classes} disabled={disabled} {...other}>
            {this.props.children}
          <div className="spin-holder">
            <Glyphicon className="spinner" glyph="refresh" />
          </div>
        </Button>
    );
  }
});

EduIDButton.PropTypes = {
  spinning: PropTypes.string.bool
}

export default EduIDButton;

