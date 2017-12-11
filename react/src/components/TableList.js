import React, { Component } from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18n-messages';
import EduIDButton from 'components/EduIDButton';


class TableList extends Component {

  render () {
    let rows = [],
         key;
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
                        key={key}>
                    <td className="identifier">{key}</td>
                    <td className="non-identifier">
                        <span className="nobutton">{this.props.l10n('tl.primary')}</span>
                    </td>
                    <td className="non-identifier">
                    <EduIDButton className="text-muted" bsStyle="link">
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
            <table className="table table-striped table-form">
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );
  }
}

TableList.propTypes = {
    entries: PropTypes.array,
    handleStartConfirmation: PropTypes.func,
    handleRemove: PropTypes.func,
    handleMakePrimary: PropTypes.func,
}

export default i18n(TableList);
