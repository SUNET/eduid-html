
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

import 'style/Footer.scss';


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

    const tooltip = (<Tooltip id="dashboard-version-tooltip">
                         {this.props.l10n('foot.change-version-tip')}
                     </Tooltip>);

    return (<div id="footer">
                <div className="container">
                    <p>
                      &copy;{this.props.l10n('main.copyright')}
                      <span className="pull-right">
                        {langElems}
                      </span>
                    </p>
                    <p id="go-to-old-dashboard">
                      <OverlayTrigger placement="top" overlay={tooltip}>
                          <a onClick={this.props.changeDashboardSession(this.props.reload_to)}>
                            {this.props.l10n('foot.change-version')}
                          </a>
                      </OverlayTrigger>
                    </p>
                </div>
            </div>);
  }
}

Footer.propTypes = {
  is_configured: PropTypes.bool,
  language: PropTypes.string,
  languages: PropTypes.array,
  changeLanguage: PropTypes.func,
  reload_to: PropTypes.bool,
  changeDashboardSession: PropTypes.func
}

export default Footer;

