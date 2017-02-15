import React, { PropTypes } from 'react';

import i18n from 'i18n-messages';
import EduIDButton from 'components/EduIDButton';
import EduiDAlert from 'components/EduIDAlert';


const TableList = React.createClass({

  render: function () {
    let rows = [],
         alertElem, msg;

    if (this.props.errorMsg) {
      msg = this.props.l10n(this.props.errorMsg);
      alertElem = ( <EduiDAlert levelMessage="warning" Msg={msg}></EduiDAlert>);
    }
      
    if (this.props.entries) {
      rows = this.props.entries.map((entry, index) => {
          if (entry.primary) {
            return (<tr className="emailrow"
                        data-identifier={index}
                        data-object={entry.email}
                        key={entry.email}>
                    <td className="identifier">{entry.email}</td>
                    <td className="non-identifier">
                        <span className="nobutton">{this.props.l10n('tl.primary')}</span>
                    </td>
                    <td className="non-identifier">
                    <EduIDButton className="text-muted" bsStyle="link"
                        onClick={this.props.handleRemoveEmail}>
                            {this.props.l10n('tl.remove')}
                        </EduIDButton>
                    </td>
                </tr>);
          } else if (entry.verified) {
            return (<tr className="emailrow"
                        data-identifier={index}
                        data-object={entry.email}
                        key={entry.email}>
                    <td className="identifier">{entry.email}</td>
                    <td className="non-identifier">
                        <EduIDButton bsStyle="link"
                        onClick={this.props.handleMakePrimaryEmail}>
                                    {this.props.l10n('tl.make_primary')}
                        </EduIDButton>
                    </td>
                    <td className="non-identifier">
                        <EduIDButton bsStyle="link" >
                            {this.props.l10n('tl.remove')}
                        </EduIDButton>
                    </td>
                </tr>);
          } else {
            return (<tr className="emailrow"
                        data-identifier={index}
                        data-object={entry.email}
                        key={entry.email}>
                    <td className="identifier">{entry.email}</td>
                    <td className="non-identifier">
                        <EduIDButton bsStyle="link"
                                     onClick={this.props.handleStartConfirmation}>
                            {this.props.l10n('tl.pending')}
                        </EduIDButton>
                    </td>
                    <td className="non-identifier">
                        <EduIDButton bsStyle="link"
                                     onClick={this.props.handleRemoveEmail}>
                            {this.props.l10n('tl.remove')}
                        </EduIDButton>
                    </td>
                </tr>);
          }
      }, this);
    }
    return (
        <div className="table-responsive">
              <div id="alert">
                         {alertElem}
                    </div>
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
    handleRemoveEmail: PropTypes.func,
    handleMakePrimaryEmail: PropTypes.func,
    errorMsg: PropTypes.string,
}

export default i18n(TableList);
