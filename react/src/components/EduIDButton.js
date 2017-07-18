
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Glyphicon } from 'react-bootstrap';
import 'style/EduIDButton.scss';


class EduIDButton extends Component {

  render () {
    const { spinning, ...other } = this.props,
          classes = spinning && 'active has-spinner' || 'has-spinner',
          disabled = spinning ? true : false;
    return (
        <Button className={classes} disabled={disabled} {...other}>
            {this.props.children}
          <div className="spin-holder">
            <Glyphicon className="spinner" glyph="refresh" />
          </div>
        </Button>
    );
  }
}

EduIDButton.PropTypes = {
  spinning: PropTypes.string.bool
}

export default EduIDButton;

