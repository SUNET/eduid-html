
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from 'react-bootstrap';
import Spinner from "react-spinkit";

//  XXX this interferes with the bootstrap in eduid-html
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'style/OpenidConnect.scss';


let OpenidConnect = React.createClass({

  render: function () {
    // i18n messages
    const get_qrcode_button = (
            <FormattedMessage
              id="oc.get_qrcode"
              defaultMessage={`CONFIRM USING SE-LEG`} />);
    let spinner = '';

    if (this.props.is_fetching) spinner = <Spinner spinnerName="three-bounce" />;

    return (
        <div>
          {spinner}
          <form id="openid-connect-form"
                className="form-horizontal"
                role="form">
            <fieldset id="openid-connect">
              <span className="error-msg text-danger">{this.props.errorMsg}</span>
              <br />
              <Button bsStyle="primary"
                      onClick={this.props.handleGetQRCode}>
                    {get_qrcode_button}
              </Button>
            </fieldset>
          </form>
          <div id="qrcode">
            <figure>
              <img src={this.props.qrcode} />
              <figcaption>{this.props.nonce}</figcaption>
            </figure>
          </div>
        </div>
    );
  }
});

OpenidConnect.propTypes = {
  qrcode: PropTypes.string,
  nonce: PropTypes.string,
  errorMsg: PropTypes.string,
  is_fetching: PropTypes.bool,
  handleGetQRCode: PropTypes.func
}

export default OpenidConnect;

