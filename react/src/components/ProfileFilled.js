import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import i18n from 'i18n-messages';

import 'style/ProfileFilled.scss';


class ProfileFilled extends Component{

  render(){
    return(
      <li id="profile-filled-li">
        <div className="profile-filled profile-filled-large">
          <meter max={this.props.max} value={this.props.cur}
                 id="profile-filled-meter"
                 ref="profileFilledMeter">
          </meter>
        </div>
      </li>);
  }
}

ProfileFilled.propTypes = {
    max: PropTypes.number,
    cur: PropTypes.number,
}

export default i18n(ProfileFilled);

