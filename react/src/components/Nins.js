
import React, { PropTypes } from 'react';

import i18n from 'i18n-messages';
import EduIDButton from 'components/EduIDButton';
import TextControl from 'components/TextControl';
import TableList from 'components/TableList';
import ConfirmModal from 'components/ConfirmModal';
import OpenidConnect from 'components/OpenidConnect';

import 'style/Nins.scss';


let Nins = React.createClass({

  render: function () {

    return (
        <div className="ninsview-form-container ">
          <div className="intro">
              <h4>{this.props.l10n('nins.main_title')}</h4>
                <p>{this.props.l10n('nins.long_description')}</p>
                <p>{this.props.l10n('faq_link')}
                   <a href="https://www.eduid.se/faq.html">FAQ</a>
          </p>
                <p>{this.props.l10n('nins.instructions')}</p>

          </div>
          <fieldset id="nins-form" className="tabpane nins-fieldset">
            <TextControl name="nin"
                         componentClass="input"
                         type="text"
                         placeholder="yyyymmddnnnn"
                         handleChange={this.props.handleChange} />
          </fieldset>
          <OpenidConnect />
          <EduIDButton bsStyle="primary"
                               id="mobile-suscription-button"
                               onClick={this.props.handlePhoneSuscription}>
                      {this.props.l10n('nins.mobile_suscription')}
          </EduIDButton><br/><br/>

          <EduIDButton bsStyle="primary"
                               id="letter-suscription-button"
                               onClick={this.props.handleLetter}>
                      {this.props.l10n('nins.letter')}
          </EduIDButton>
        </div>
    );
  }
});

Nins.propTypes = {
    handlePhoneSuscription: PropTypes.func,
    handleLetter: PropTypes.func,
}

export default i18n(Nins);
