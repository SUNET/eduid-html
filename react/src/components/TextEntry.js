import React, { Component } from 'react';

export default class TextEntry extends Component {
  render () {
    return (
        <div className="text-entry">
          <input type="text" name={this.props.name} />
        </div>
    );
  }
}
