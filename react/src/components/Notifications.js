import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/lib/Alert';

import i18n from 'i18n-messages';
import 'style/Notifications.scss';


class Notifications extends Component {

  render () {
    let toShow = this.props.errors.map( (err, index) => {
        return (<Alert key={index}
                       bsStyle="danger"
                       data-level="errors"
                       data-index={index}
                       onDismiss={this.props.handleRMNotification}>
                   {this.props.l10n(err)}
                </Alert>);
    });

    if (toShow.length === 0) {
        toShow = this.props.messages.map( (msg, index) => {
            return (<Alert key={index}
                           bsStyle="success"
                           data-level="messages"
                           data-index={index}
                           onDismiss={this.props.handleRMNotification}>
                       {this.props.l10n(msg)}
                    </Alert>);
        });
        toShow.concat( this.props.warnings.map( (warning, index) => {
            return (<Alert key={index}
                           bsStyle="warning"
                           data-level="warnings"
                           data-index={index}
                           onDismiss={this.props.handleRMNotification}>
                       {this.props.l10n(warning)}
                    </Alert>);
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

