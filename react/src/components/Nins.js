
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import i18n from 'i18n-messages';
import TextInput from 'components/EduIDTextInput';
import EduIDButton from 'components/EduIDButton';
import vettingRegistry from "vetting-registry";

import 'style/Nins.scss';


const validate = values => {
  const errors = {};
  let value  = values.norEduPersonNin;
  // taken from https://gist.github.com/DiegoSalazar/4075533/
  // accept only digits, dashes or spaces
	if (/[^0-9-\s]+/.test(value)) return false;
	// The Luhn Algorithm. It's so pretty.
	var nCheck = 0, nDigit = 0, bEven = false;
	value = value.replace(/\D/g, "");

	for (var n = value.length - 1; n >= 0; n--) {
		var cDigit = value.charAt(n),
			  nDigit = parseInt(cDigit, 10);
		if (bEven) {
			if ((nDigit *= 2) > 9) nDigit -= 9;
		}
		nCheck += nDigit;
		bEven = !bEven;
	}
	if ( (nCheck % 10) !== 0) {
    errors.norEduPersonNin = 'nins.invalid_nin';
  }
  return errors
}


let NinForm = props => {
    return (
      <form id="nins-form"
            role="form">
        <fieldset id="nins-form" className="tabpane">
          <Field component="TextInput"
                 componentClass="input"
                 type="text"
                 name="norEduPersonNin"
                 placeholder="yyyymmddnnnn" />
        </fieldset>
      </form>
    )
};

NinForm = reduxForm({
  form: 'nins',
  validate
})(NinForm)

NinForm = connect(
  state => ({
    initialValues: {norEduPersonNin: state.nins.nin},
    enableReinitialize: true
  })
)(NinForm)


class Nins extends Component {

  render () {
    let ninStatus = 'nonin',
        credsTable = '',
        vettingButtons = this.props.proofing_methods.map((key, index) => {
            return (<div key={index}>{vettingRegistry[key]}</div>);
        }),
        invalidNinText = '',
        ninInput = '',
        spinning = false,
        verifiedNin = '';
    if (this.props.nins.length) {
        ninStatus = 'unverified';
        const nins = this.props.nins.filter((nin) => nin.verified);
        if (nins.length === 1) {
            ninStatus = 'verified';
            verifiedNin = nins[0].number;
        }
    }
    if (ninStatus === 'nonin') {
        invalidNinText = (this.props.valid_nin) ?
                           '' :
                           this.props.l10n('nins.invalid_nin');
        ninInput = (
            <div>
              <p>{this.props.l10n('nins.help_text')}</p>
              <NinForm {...this.props} />
            </div>
        );
        vettingButtons = (this.props.nin && this.props.valid_nin) ? vettingButtons : '';
    } else if (ninStatus === 'unverified') {
        const ninList = (this.props.nins.map( (nin, index) => {
            return (
               <div className="nin-holder" key={index} data-ninnumber={nin.number}>
                  <strong>{nin.number}</strong>
                  <EduIDButton bsStyle="danger"
                               id={'button-rm-nin-'+nin.number}
                               className="btn-xs"
                               spinning={spinning}
                               onClick={this.props.handleDelete}>
                      {this.props.l10n('nins.button_delete')}
                  </EduIDButton>
               </div>
            );
        }));
        credsTable = (
            <div>
              <p><strong>{this.props.l10n('nins.unconfirmed_nin')}</strong></p>
              {ninList}
            </div>
        );
        if (this.props.nins.length > 1) {
            vettingButtons = this.props.l10n('nins.only_one_to_verify');
        }

    } else if (ninStatus === 'verified') {
        credsTable = (
            <div>
              <p><strong>{this.props.l10n('nins.confirmed_nin')}</strong></p>
              <p>
                <span>{verifiedNin}</span>
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
  handleDelete: PropTypes.func,
  proofing_methods: PropTypes.array
}

export default i18n(Nins);
