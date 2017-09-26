import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

import i18n from 'i18n-messages';
import 'style/PendingActions.scss';


class PendingActions extends Component {

  render () {
    let pdataMissing = true,
        toShow = this.props.pending.map( (missing, index) => {
        if (['given_name', 'surname', 'display_name', 'language'].indexOf(missing) >= 0) {
            if (pdataMissing) {
                pdataMissing = false;
                return (
                  <div key={index} className="pending-action">
                    <a href="/profile/personal_data">
                      {this.props.l10n('pending.pdata')}
                    </a>
                  </div>);
            }
        } else {
            return (
                <div key={index} className="pending-action">
                  <a href={'/profile/' + missing}>
                   {this.props.l10n('pending.' + missing)}
                  </a>
                </div>
            );
        }
    });

    return (
        <div id="pending-actions-area">
          {toShow}
        </div>
    );
  }
}

PendingActions.propTypes = {
    pending: PropTypes.array
}

export default i18n(PendingActions);


