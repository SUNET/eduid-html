import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/lib/Alert';

import 'style/Notifications.scss';


class Notifications extends Component {

  render () {
    let toShow = this.props.errors.map( (err, index) => {
        let err_msg = this.props.l10n(err.msg);
        if (err.vals !== null) {
            err_msg = err_msg(err.vals);
        }
        if (!this.props.debug && err_msg.indexOf('UNKNOWN MESSAGE ID (') === 0) {
            err_msg = this.props.l10n('unexpected-problem');
        }
        return (<Alert key={index}
                       bsStyle="danger"
                       data-level="errors"
                       data-index={index}
                       onDismiss={this.props.handleRMNotification}>
                   {err_msg}
                </Alert>);
    });

    if (toShow.length === 0) {
        toShow = this.props.messages.map( (msg, index) => {
            let success_msg = this.props.l10n(msg.msg);
            if (msg.vals !== null) {
                success_msg = success_msg(msg.vals);
            }
            if (!this.props.debug && success_msg.indexOf('UNKNOWN MESSAGE ID (') === 0) {
                success_msg = this.props.l10n('unexpected-success');
            }
            return (<Alert key={index}
                           bsStyle="success"
                           data-level="messages"
                           data-index={index}
                           onDismiss={this.props.handleRMNotification}>
                       {success_msg}
                    </Alert>);
        });
        toShow.concat( this.props.warnings.map( (warning, index) => {
            let warn = this.props.l10n(warning.msg);
            if (warning.vals !== null) {
                warn = warn(warning.vals);
            }
            if (!this.props.debug && warn.indexOf('UNKNOWN MESSAGE ID (') === 0) {
                return '';
            }
            return (<Alert key={index}
                           bsStyle="warning"
                           data-level="warnings"
                           data-index={index}
                           onDismiss={this.props.handleRMNotification}>
                       {warn}
                    </Alert>);
        }));
    }

    return (
        <div className="notifications-area">
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

export default Notifications;
