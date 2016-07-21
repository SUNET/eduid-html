import React, { Component } from 'react';

export default class TextSelect extends Component {
  render () {
    return (
        <div className="form-group" id="item-{name}">
          <label className="control-label" htmlFor={this.props.name}>
            {this.props.label}
          </label>
          <div className="controls">
            <select className="form-control"
                    name={this.props.name}
                    id={this.props.name}>
              {this.props.children}
            </select>
          </div>
        </div>
    );
  }
}
