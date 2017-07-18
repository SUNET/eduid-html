
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18n-messages';
import TextControl from 'components/TextControl';
import EduIDButton from 'components/EduIDButton';
import vettingRegistry from "vetting-registry";

import 'style/Nins.scss';


class Nins extends Component {

  render () {
    let ninStatus = 'nonin',
        credsTable = '',
        vettingButtons = this.props.proofing_methods.map((key, index) => {
            return (<div key={index}>{vettingRegistry[key]}</div>);
        }),
        invalidNinText = '',
        ninInput = '',
        spinning = false;
    if (this.props.nins.length) {
        if (this.props.nins[0].verified) {
            ninStatus = 'verified';
        } else {
            ninStatus = 'unverified';
        }
    }
    if (ninStatus === 'nonin') {
        ninInput = (
            <div>
              <p>{this.props.l10n('nins.help_text')}</p>
              <form id="nins-form"
                    role="form">
                <fieldset id="nins-form" className="tabpane">
                  <TextControl name="norEduPersonNin"
                               placeholder="yyyymmddnnnn"
                               initialValue={this.props.nin}
                               validation={this.props.validateNin}
                               componentClass="input"
                               type="text"
                               help={invalidNinText}
                               handleChange={this.props.handleChange} />
                </fieldset>
              </form>
            </div>
        );
        invalidNinText = (this.props.valid_nin) ? this.props.l10n('nins.valid_nin') : this.props.l10n('nins.invalid_nin');
    } else if (ninStatus === 'unverified') {
        credsTable = (
            <div>
              <p><strong>{this.props.l10n('nins.unconfirmed_nin')}</strong></p>
              <p>
                <span>{this.props.nins[0].number}</span>
                  <EduIDButton bsStyle="primary"
                               id="email-button"
                               spinning={spinning}
                               onClick={this.props.handleDelete}>
                      {this.props.l10n('nins.button_delete')}
                  </EduIDButton>
              </p>
            </div>
        );
    } else if (ninStatus === 'verified') {
        credsTable = (
            <div>
              <p><strong>{this.props.l10n('nins.confirmed_nin')}</strong></p>
              <p>
                <span>{this.props.nins[0].number}</span>
              </p>
            </div>
        );
        vettingButtons = '';
    }

    return (
        <div>
          <div className="intro">
              <h4>{this.props.l10n('nins.main_title')}</h4>
                <p>{this.props.l10n('nins.justification')}</p>
                <p>{this.props.l10n('faq_link')}
                <a href="https://www.eduid.se/faq.html">FAQ</a></p>
                {credsTable}
          </div>
          {ninInput}
          {vettingButtons}
        </div>
    );
  }
}

Nins.propTypes = {
  nin: PropTypes.string,
  nins: PropTypes.array,
  valid_nin: PropTypes.bool,
  validateNin: PropTypes.func,
  handleChange: PropTypes.func,
  handleDelete: PropTypes.func,
  proofing_methods: PropTypes.array
}

export default i18n(Nins);
