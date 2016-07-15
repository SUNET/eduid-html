import React, { Component } from 'react';
import {FormattedMessage, FormattedNumber, FormattedRelative} from 'react-intl';


export default class TextEntry extends Component {
  render () {
    return (
        <div className="text-entry">
          <span>
            <FormattedMessage
                    id="greeting.welcome_message"
                    defaultMessage={`
                        Welcome {name}, you have received {unreadCount, plural,
                            =0 {no new messages}
                            one {{formattedUnreadCount} new message}
                            other {{formattedUnreadCount} new messages}
                        }.
                    `}
                    values={{
                        name: <b>uno</b>,
                        unreadCount: 2,
                        formattedUnreadCount: (
                            <b><FormattedNumber value={2} /></b>
                        ),
                    }}
            />
          </span>
          <input type="text" name={this.props.name} />
        </div>
    );
  }
}
