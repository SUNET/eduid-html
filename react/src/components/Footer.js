
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18n-messages';



class Footer extends Component {

  render () {
    let langElems;
    if (this.props.is_configured) {
        langElems = this.props.languages.map((lang, index) => {
            if (lang[0] === this.props.language) {
                return (<span className="langselector" key={index}>
                          <span>{lang[1]}</span>
                        </span>);
            } else {
                return (<span className="langselector"
                              data-lang={lang[0]}
                              key={index}>
                          <a onClick={this.props.changeLanguage}>{lang[1]}</a>
                        </span>);
            }
        });
    } else {
        langElems = (<span />);
    }

    return (<div id="footer">
                <div className="container">
                    <p>
                      {this.props.l10n('main.copyright')}
                      <span className="pull-right">
                        {langElems}
                      </span>
                    </p>
                </div>
            </div>);
  }
}

Footer.propTypes = {
  is_configured: PropTypes.bool,
  language: PropTypes.string,
  languages: PropTypes.array,
  changeLanguage: PropTypes.func
}

export default i18n(Footer);

