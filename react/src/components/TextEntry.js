import React, { Component } from 'react';


export default class TextEntry extends Component {
  render () {
    return (
        <div className="form-group" id="item-{name}">
          <label className="control-label" htmlFor={this.props.name}>
            {this.props.label}
          </label>
          <div className="controls">
            <input className="form-control"
                   type="text"
                   name={this.props.name}
                   id={this.props.name} />
          </div>
        </div>
    );
  }
}
