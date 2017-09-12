import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import i18n from 'i18n-messages';

import 'style/ProfileFilled.scss';


class ProfileFilled extends Component{

  render(){
    return(
      <div>
          <meter max={this.props.max} value={this.props.cur}
                 id="profile-filled-meter"
                 ref="profileFilledMeter">
          </meter>
      </div>);
  }
}

ProfileFilled.propTypes = {
    max: PropTypes.number,
    cur: PropTypes.number,
}

export default i18n(ProfileFilled);

