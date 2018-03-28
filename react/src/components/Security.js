
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import EduIDButton from 'components/EduIDButton';
import DeleteModal from 'components/DeleteModal';
import GenericConfirmModal from 'components/GenericConfirmModal';

import 'style/Security.scss';


class Security extends Component {

  render () {
    if (this.props.redirect_to !== '') {
        window.location.href = this.props.redirect_to;
        return null
    }
    if (this.props.deleted) {
        window.location.href = 'https://eduid.se';
        return null
    }
    let spinning = false,
        creds_table = this.props.credentials.map((cred, index) => {
            let btnRm = '';
            if (cred.credential_type === 'security.u2f_credential_type') {
                btnRm = (<div className="btn-group btn-group-xs" role="group">
                           <button className="btn btn-danger btn-remove-u2f"
                                   onClick={this.props.handleRemoveU2FToken}>
                             <Glyphicon className="trash" glyph="trash" />
                           </button>
                         </div>);
            }
            return (<tr key={index} className="u2f-token-holder" data-token={cred.key}>
                        <td>{this.props.l10n(cred.credential_type)}</td>
                        <td data-toggle="tooltip" data-placement="top" title={new Date(cred.created_ts).toString()}>{new Date(cred.created_ts).toDateString()}</td>
                        <td data-toggle="tooltip" data-placement="top" title={new Date(cred.success_ts).toString()}>{new Date(cred.success_ts).toDateString()}</td>
                        <td>{cred.description}</td>
                        <td>{btnRm}</td>
                    </tr>
            );
        }, this);

    if (this.props.is_fetching || this.props.u2f_is_fetching) spinning = true;
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
                    <th>{this.props.l10n('security.description')}</th>
                    <th>{this.props.l10n('security.remove')}</th>
                </tr>
                {creds_table}
              </tbody>
          </table>
          <div id="change-password">
            <EduIDButton bsStyle="primary"
                        id="security-change-button"
                        spinning={spinning}
                        onClick={this.props.handleStartConfirmationPassword}>
                      {this.props.l10n('security.change_password')}
            </EduIDButton>
          </div>
          <div id="add-u2f-token">
            <EduIDButton bsStyle="primary"
                        id="security-u2f-button"
                        spinning={spinning}
                        onClick={this.props.handleStartU2fRegistration}>
                      {this.props.l10n('security.add_u2f_token')}
            </EduIDButton>
          </div>
          <div className="second-block">
              <div className="intro">
                 <h4>{this.props.l10n('security.account_title')}</h4>
                 <p>{this.props.l10n('security.account_description')}</p>
              </div>
              <EduIDButton className="btn btn-danger"
                           id="delete-button"
                           spinning={spinning}
                           onClick={this.props.handleStartConfirmationDeletion}>
                        {this.props.l10n('security.delete_account')}
              </EduIDButton>
          </div>
          <GenericConfirmModal
                modalId="securityConfirmDialog"
                title={this.props.l10n('security.confirm_title_chpass')}
                mainText={this.props.l10n('security.change_info')}
                showModal={this.props.confirming_change}
                closeModal={this.props.handleStopConfirmationPassword}
                acceptModal={this.props.handleConfirmationPassword}
          />
          <DeleteModal
                title={this.props.l10n('security.confirm_title_deletion')}
                showModal={this.props.confirming_deletion}
                closeModal={this.props.handleStopConfirmationDeletion}
                handleConfirm={this.props.handleConfirmationDeletion}
          />

          <Modal show={this.props.u2f_is_enrolled}>
              <Modal.Header>
                  <Modal.Title>{this.props.l10n('u2f.action-required')}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                  <p>{this.props.l10n('u2f.push-the-button')}</p>
              </Modal.Body>

              <Modal.Footer>
                  <EduIDButton className="cancel-button"
                          id="cancel-u2f"
                          onClick={this.props.handleCloseU2fModal} >
                       {this.props.l10n('cm.cancel')}
                  </EduIDButton>
              </Modal.Footer>
          </Modal>
        </div>
    );
  }
}

Security.propTypes = {
  credentials: PropTypes.array,
  creation_date: PropTypes.string,
  last_used: PropTypes.string,
  langs: PropTypes.array,
  is_fetching: PropTypes.bool,
  u2f_is_fetching: PropTypes.bool,
  confirming_change: PropTypes.bool,
  deleted: PropTypes.bool,
  handleStartConfirmationPassword: PropTypes.func,
  handleStopConfirmationPassword: PropTypes.func,
  handleConfirmationPassword: PropTypes.func,
  confirming_deletion: PropTypes.bool,
  handleStartConfirmationDeletion: PropTypes.func,
  handleStopConfirmationDeletion: PropTypes.func,
  handleConfirmationDeletion: PropTypes.func,
  handleStartU2fRegistration: PropTypes.func,
  handleCloseU2fModal: PropTypes.func
}

export default Security;
