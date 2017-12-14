
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EduIDButton from 'components/EduIDButton';

import 'style/OpenidConnect.scss';


class OpenidConnect extends Component {

  render () {
    let spinning = false;

    if (this.props.is_fetching) spinning = true;

    return (
        <div>
          <form id="openid-connect-form"
                className="form-horizontal"
                role="form">
            <fieldset id="openid-connect">
              <EduIDButton bsStyle="primary"
                      spinning={spinning}
                      disabled={this.props.disabled}
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
}

OpenidConnect.propTypes = {
  disabled: PropTypes.bool,
  qr_img: PropTypes.string,
  qr_code: PropTypes.string,
  is_fetching: PropTypes.bool,
  handleGetQRCode: PropTypes.func
}

export default OpenidConnect;
