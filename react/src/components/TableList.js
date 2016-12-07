import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import EduIDButton from 'components/EduIDButton';


const TableList = React.createClass({

  render: function () {
    const primary = (
            <FormattedMessage
              id="tl.primary"
              defaultMessage={`PRIMARY`} />),

          makePrimary = (
            <FormattedMessage
              id="tl.make_primary"
              defaultMessage={`MAKE PRIMARY`} />),

          remove = (
            <FormattedMessage
              id="tl.remove"
              defaultMessage={`REMOVE`} />),

          pending = (
            <FormattedMessage
              id="tl.pending"
              defaultMessage={`PENDING CONFIRMATION`} />);

    let rows = [],
        spinning = false;

    if (this.props.entries) {
      rows = this.props.entries.map((entry, index) => {
          if (entry.primary) {
            return (<tr className="emailrow" data-identifier={index}>
                    <td className="identifier">{entry.email}</td>
                    <td className="non-identifier">
                        <span className="nobutton">{primary}</span>
                    </td>
                    <td className="non-identifier">
                        <span className="text-muted">{remove}</span>
                    </td>
                </tr>);
          } else if (entry.confirmed) {
            return (<tr className="emailrow" data-identifier={index}>
                    <td className="identifier">{entry.email}</td>
                    <td className="non-identifier">
                        <EduIDButton bsStyle="btn-link">
                            {makePrimary}
                        </EduIDButton>
                    </td>
                    <td className="non-identifier">
                        <EduIDButton bsStyle="btn-link">
                            {remove}
                        </EduIDButton>
                    </td>
                </tr>);
          } else {
            return (<tr className="emailrow" data-identifier={index}>
                    <td className="identifier">{entry.email}</td>
                    <td className="non-identifier">
                        <EduIDButton bsStyle="btn-link">
                            {pending}
                        </EduIDButton>
                    </td>
                    <td className="non-identifier">
                        <EduIDButton bsStyle="btn-link">
                            {remove}
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

TableList.PropTypes = {
    entries: PropTypes.array
}

export default TableList;
