
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import 'style/EduIDButton.scss';


class EduIDButton extends Component {

  render () {
    const { spinning, ...other } = this.props,
          classes = spinning && 'active has-spinner' || 'has-spinner';
    let spin_holder = '';
    if (spinning) {
        spin_holder = (<div className="spin-holder">
            <Glyphicon className="spinner" glyph="refresh" />
          </div>);
    }
    return (
        <Button className={classes} disabled={spinning} {...other}>
            {this.props.children}
            {spin_holder}
        </Button>
    );
  }
}

EduIDButton.PropTypes = {
  spinning: PropTypes.string.bool
}

export default EduIDButton;

