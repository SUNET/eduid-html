
import React, { PropTypes } from 'react';

import i18n from 'i18n-messages';
import EduIDButton from 'components/EduIDButton';

//  XXX this interferes with the bootstrap in eduid-html
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'style/OpenidConnect.scss';


let OpenidConnect = React.createClass({

  render: function () {
    let spinning = false;

    if (this.props.is_fetching) spinning = true;

    return (
        <div>
          <form id="openid-connect-form"
                className="form-horizontal"
                role="form">
            <fieldset id="openid-connect">
              <span className="error-msg text-danger">{this.props.errorMsg}</span>
              <br />
              <EduIDButton bsStyle="primary"
                      spinning={spinning}
                      onClick={this.props.handleGetQRCode}>
                    {this.props.l10n('oc.get_qrcode')}
              </EduIDButton>
            </fieldset>
          </form>
          <div id="qrcode">
            <figure>
              <img src={this.props.qr_img} />
              <figcaption>{this.props.qr_code}</figcaption>
            </figure>
          </div>
        </div>
    );
  }
});

OpenidConnect.propTypes = {
  qr_img: PropTypes.string,
  qr_code: PropTypes.string,
  errorMsg: PropTypes.string,
  is_fetching: PropTypes.bool,
  handleGetQRCode: PropTypes.func
}

export default i18n(OpenidConnect);
