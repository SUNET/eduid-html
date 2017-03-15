
import React, { PropTypes } from 'react';

import i18n from 'i18n-messages';
import EduIDButton from 'components/EduIDButton';
import DeleteModal from 'components/DeleteModal';

//  XXX this interferes with the bootstrap in eduid-html
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'style/Security.scss';


let Security = React.createClass({

  render: function () {
    let spinning = false;
    if (this.props.is_fetching) spinning = true;
    return (
        <div>
          <div className="intro">
              <h4>{this.props.l10n('security.main_title')}</h4>
              <p>{this.props.l10n('security.long_description')}</p>
          </div>
          <table className="table table-bordered table-form passwords">
              <tbody>
                <tr>
                    <th>{this.props.l10n('security.credential')}</th>
                    <th>{this.props.l10n('security.creation_date')}</th>
                    <th>{this.props.l10n('security.last_used')}</th>
                </tr>
                <tr>
                    <td>{this.props.credential}</td>
                    <td>{this.props.creation_date}</td>
                    <td>{this.props.last_used}</td>
                </tr>
              </tbody>
          </table>
          <EduIDButton bsStyle="primary"
                      id="security-change-button"
                      spinning={spinning}
                      onClick={this.props.handleSave}>
                    {this.props.l10n('security.change_password')}
          </EduIDButton>
          <div className="second-block">
              <div className="intro">
                 <h4>{this.props.l10n('security.account_title')}</h4>
                 <p>{this.props.l10n('security.account_description')}</p>
              </div>
              <EduIDButton className="btn btn-danger"
                           id="delete-button"
                           spinning={spinning}
                           onClick={this.props.handleStartConfirmation}>
                        {this.props.l10n('security.delete_account')}
              </EduIDButton>
          </div>
          <DeleteModal
                title={this.props.l10n('security.confirm_title')}
                showModal={this.props.confirming}
                closeModal={this.props.handleStopConfirmation}
                handleConfirm={this.props.handleConfirm}
                resending={this.props.resending}
                confirming={this.props.confirming} />
        </div>
    );
  }
});

Security.propTypes = {
  credential: PropTypes.string,
  creation_date: PropTypes.string,
  last_used: PropTypes.string,
  language: PropTypes.string,
  langs: PropTypes.array,
  errorMsg: PropTypes.string,
  is_fetching: PropTypes.bool
}

export default i18n(Security);
