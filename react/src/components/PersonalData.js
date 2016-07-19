import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import sv from 'react-intl/locale-data/sv';
import svMessages from '../../l10n/sv.json';

import TextEntry from 'components/TextEntry';
import TextSelect from 'components/TextSelect';

addLocaleData(sv);


export default class PersonalData extends Component {
  render () {
    return (
        <IntlProvider locale={ 'sv-SE' } messages={ svMessages }>
          <div id="personal-data-form" className="eduid-form">
            <TextEntry name="given_name" />
            <TextEntry name="surname" />
            <TextEntry name="display_name" />
            <TextSelect name="language" />
          </div>
        </IntlProvider>
    );
  }
}
