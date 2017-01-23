import React, { PropTypes } from 'react';

import i18n from 'i18n-messages';
import EduIDButton from 'components/EduIDButton';


const TableList = React.createClass({

  render: function () {

    let rows = [],
    spinning = false;
    if (this.props.entries) {
      rows = this.props.entries.map((entry, index) => {
          if (entry.primary) {
            return (<tr className="emailrow"
                        key={entry.email}>
                    <td className="identifier">{entry.email}</td>
                    <td className="non-identifier">
                        <span className="nobutton">{this.props.l10n('tl.primary')}</span>
                    </td>
                    <td className="non-identifier">
                        <span className="text-muted">{this.props.l10n('tl.remove')}</span>
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
                        <EduIDButton bsStyle="link"
                        onClick={this.props.handleRemoveEmail}>
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
    handleMakePrimaryEmail: PropTypes.func
}

export default i18n(TableList);
