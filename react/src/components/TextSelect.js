import React, { Component } from 'react';

export default class TextSelect extends Component {
  render () {
    return (
        <div className="text-entry">
          <select name={this.props.name}>
          </select>
        </div>
    );
  }
}
