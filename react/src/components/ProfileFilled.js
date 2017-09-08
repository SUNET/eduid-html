import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import i18n from 'i18n-messages';

import 'style/ProfileFilled.scss';


class ProfileFilled extends Component{

  render(){
    return(
      <div>
          <meter max="4"
                 id="profile-filled-meter"
                 ref="profileFilledMeter">
          </meter>
      </div>);
  }
}

ProfileFilled.propTypes = {
}

export default i18n(ProfileFilled);

