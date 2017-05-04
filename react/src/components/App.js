import React, { Component } from 'react';


class App extends Component {

  render () {
      return (
          <div>

            {/* add this */}
            {this.props.children}

          </div>
      );
  }
}

export default App;
