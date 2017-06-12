
import React, { PropTypes } from 'react';
import withUserAgent from 'react-useragent';

import i18n from 'i18n-messages';
import EduIDButton from 'components/EduIDButton';

//  XXX this interferes with the bootstrap in eduid-html
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'style/OpenidConnect.scss';


let OpenidConnectFreja = React.createClass({

  render: function () {
    const supportedDevices = ['AndroidOS', 'iOS'];
    const isMobile = supportedDevices.includes(this.props.ua.os);

    if (!isMobile) {
      return (
        <div id="openid-connect-freja-tip">
          <h4>{this.props.l10n('ocf.not_on_mobile_title')}</h4>
          <p>{this.props.l10n('ocf.not_on_mobile_message')}</p>
        </div>
      )
    }

    let spinning = false;
    if (this.props.is_fetching) spinning = true;

    if (this.props.iaRequestData) {
      return (
        <div>
          <form id="openid-connect-freja-form"
                className="form-horizontal"
                role="form">
            <fieldset id="openid-connect-freja">
              <span className="error-msg text-danger">{this.props.errorMsg}</span>
              <br />
              <EduIDButton bsStyle="primary"
                           spinning={spinning}
                           href={"frejaeid://identify?iaRequestData=" + this.props.iaRequestData}>
                {this.props.l10n('ocf.open_app')}
              </EduIDButton>
            </fieldset>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <form id="openid-connect-freja-form"
                className="form-horizontal"
                role="form">
            <fieldset id="openid-connect-freja">
              <span className="error-msg text-danger">{this.props.errorMsg}</span>
              <br />
              <EduIDButton bsStyle="primary"
                           spinning={spinning}
                           onClick={this.props.handleOpenFrejaApp}>
                {this.props.l10n('ocf.request_data')}
              </EduIDButton>
            </fieldset>
          </form>
        </div>
      );
    }
  }
});

OpenidConnectFreja.propTypes = {
  iaRequestData: PropTypes.string,
  errorMsg: PropTypes.string,
  is_fetching: PropTypes.bool,
  handleOpenFrejaApp: PropTypes.func
};

export default withUserAgent(i18n(OpenidConnectFreja));
