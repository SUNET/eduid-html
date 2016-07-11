var React = require('react');
var ReactDOM = require('react-dom');

var TextEntry = React.createClass({
  render: function () {
    return (
        <div className="text-entry">
          <input type="text" name={this.props.name} />
        </div>
    );
  }
});

var TextSelect = React.createClass({
  render: function () {
    return (
        <div className="text-entry">
          <select name={this.props.name}>
          </select>
        </div>
    );
  }
});

var PersonalData = React.createClass({
  render: function () {
    return (
        <div id="personal-data-form">
          <TextEntry name="given_name" />
          <TextEntry name="surname" />
          <TextEntry name="display_name" />
          <TextSelect name="language" />
        </div>
    );
  }
});

ReactDOM.render(<PersonalData />, document.getElementById('root'));
