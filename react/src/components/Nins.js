
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18n-messages';
import TextControl from 'components/TextControl';
import EduIDButton from 'components/EduIDButton';
import vettingRegistry from "vetting-registry";

import 'style/Nins.scss';


class Nins extends Component {

  render () {
    const creds_table = this.props.nins.map((nin, index) => {
            return (<tr key={index}>
                        <td>{nin.number}</td>
                        <td>{nin.verified}</td>
                        <td>{nin.primary}</td>
                    </tr>
            );
          }),
          vettingButtons = this.props.proofing_methods.map((key, index) => {
            return (<div key={index}>{vettingRegistry[key]}</div>);
          });

    return (
        <div>
          <div className="intro">
              <h4>{this.props.l10n('nins.main_title')}</h4>
                <p>{this.props.l10n('nins.justification')}</p>
                <p>{this.props.l10n('faq_link')}
                <a href="https://www.eduid.se/faq.html">FAQ</a></p>

                  <table className="table table-bordered table-form nins">
                      <tbody>
                        <tr>
                            <th>{this.props.l10n('nins.nin')}</th>
                            <th>{this.props.l10n('nins.verified')}</th>
                            <th>{this.props.l10n('nins.primary')}</th>
                        </tr>
                        {creds_table}
                      </tbody>
                  </table>

                <p>{this.props.l10n('nins.help_text')}</p>
          </div>
          <form id="nins-form"
                role="form">
            <fieldset id="nins-form" className="tabpane">
              <TextControl name="norEduPersonNin"
                           placeholder="yyyymmddnnnn"
                           initialValue={this.props.nin}
                           validation={this.props.validateNin}
                           componentClass="input"
                           type="text"
                           handleChange={this.props.handleChange} />
            </fieldset>
          </form>
          {vettingButtons}
        </div>
    );
  }
}

Nins.propTypes = {
  nin: PropTypes.string,
  nins: PropTypes.array,
  validateNin: PropTypes.func,
  handleChange: PropTypes.func,
  proofing_methods: PropTypes.array
}

export default i18n(Nins);
