import React, { Component } from 'react';

import TextEntry from 'components/TextEntry';
import TextSelect from 'components/TextSelect';


export default class PersonalData extends Component {
  render () {
    return (
        <div id="personal-data-form" className="eduid-form">
          <TextEntry name="given_name" />
          <TextEntry name="surname" />
          <TextEntry name="display_name" />
          <TextSelect name="language" />
        </div>
    );
  }
}
