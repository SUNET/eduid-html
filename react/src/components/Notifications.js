import React, { Component } from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18n-messages';


class Notifications extends Component {

  render () {
    let toShow = this.props.errors.map( (err, index) => {
        return (<Alert key={index} bsStyle="danger">{err}</Alert>);
    });

    if (! toShow) {
        toShow = this.props.messages.map( (msg, index) => {
            return (<Alert key={index} bsStyle="success">{msg}</Alert>);
        });
        toShow.concat( this.props.warnings.map( (warning, index) => {
            return (<Alert key={index} bsStyle="warning">{warning}</Alert>);
        }));
    }

    return (
        <div id="notifications-area">
          {toShow}
        </div>
    );
  }
}

Notifications.propTypes = {
    messages: PropTypes.array,
    warnings: PropTypes.array,
    errors: PropTypes.array
}

export default i18n(Notifications);

