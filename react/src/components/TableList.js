import React, { PropTypes } from 'react';

import i18n from 'i18n-messages';
import EduIDButton from 'components/EduIDButton';
import EduiDAlert from 'components/EduIDAlert';


const TableList = React.createClass({

  render: function () {
    let rows = [],
         alertElem, msg,
         key;
    if (this.props.errorMsg) {
        if (this.props.errorMsg.number) {
            msg = this.props.l10n(this.props.errorMsg.number);
        } else if (this.props.errorMsg.email) {
            msg = this.props.l10n(this.props.errorMsg.email);
        } else {
            msg = this.props.l10n(this.props.errorMsg.form);
        }
      alertElem = ( <EduiDAlert className="help-block" levelMessage="warning" Msg={msg}></EduiDAlert>);
    }
    if (this.props.entries) {
      rows = this.props.entries.map((entry, index) => {
          if (entry.number) {
            key = entry.number
          } else {
            key = entry.email
          }
          if (entry.primary) {
            return (<tr className="emailrow"
                        data-identifier={index}
                        data-object={key}
                        key={entry.email}>
                    <td className="identifier">{key}</td>
                    <td className="non-identifier">
                        <span className="nobutton">{this.props.l10n('tl.primary')}</span>
                    </td>
                    <td className="non-identifier">
                    <EduIDButton className="text-muted" bsStyle="link"
                        onClick={this.props.handleRemove}>
                            {this.props.l10n('tl.remove')}
                        </EduIDButton>
                    </td>
                </tr>);
          } else if (entry.verified) {
            return (<tr className="emailrow"
                        data-identifier={index}
                        data-object={key}
                        key={key}>
                    <td className="identifier">{key}</td>
                    <td className="non-identifier">
                        <EduIDButton bsStyle="link"
                        onClick={this.props.handleMakePrimary}>
                                    {this.props.l10n('tl.make_primary')}
                        </EduIDButton>
                    </td>
                    <td className="non-identifier">
                        <EduIDButton bsStyle="link"
                        onClick={this.props.handleRemove}>
                            {this.props.l10n('tl.remove')}
                        </EduIDButton>
                    </td>
                </tr>);
          } else {
            return (<tr className="emailrow"
                        data-identifier={index}
                        data-object={key}
                        key={key}>
                    <td className="identifier">{key}</td>
                    <td className="non-identifier">
                        <EduIDButton bsStyle="link"
                                     onClick={this.props.handleStartConfirmation}>
                            {this.props.l10n('tl.pending')}
                        </EduIDButton>
                    </td>
                    <td className="non-identifier">
                        <EduIDButton bsStyle="link"
                                     onClick={this.props.handleRemove}>
                            {this.props.l10n('tl.remove')}
                        </EduIDButton>
                    </td>
                </tr>);
          }
      }, this);
    }
    return (
        <div className="table-responsive">
              <span className="help-block" id="alert">
                         {alertElem}
              </span>
            <table className="table table-striped table-form">
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );
  }
});

TableList.propTypes = {
    entries: PropTypes.array,
    handleStartConfirmation: PropTypes.func,
    handleRemove: PropTypes.func,
    handleMakePrimary: PropTypes.func,
    errorMsg: PropTypes.object,
}

export default i18n(TableList);
