
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import EduIDButton from 'components/EduIDButton';

import 'style/AccountLinking.scss';


class Orcid extends Component {

  render () {
    let spinning = false;
    if (this.props.is_fetching) spinning = true;

    const orcidIntro = (
        <div className="orcid-intro">
            <h4>{this.props.l10n('orc.title')}</h4>
            <p>{this.props.l10n('orc.long_description')}</p>
            <p>{this.props.l10n('orc.about_link')}</p>
          </div>
    );
    let orcidData;

    if (this.props.orcid !== undefined) {
      orcidData = (
        <div className="orcid-data">
          <p>{this.props.orcid.id}</p>
        </div>
      )
    } else {
      orcidData = (
        <div className="orcid-data">
          a button
        </div>
      )
    }
    return (
        <div>
          {orcidIntro}
          {orcidData}
        </div>
    );
  }
}

Orcid.propTypes = {
  orcid: PropTypes.object,
  langs: PropTypes.array,
  is_fetching: PropTypes.bool,
};

export default Orcid;
