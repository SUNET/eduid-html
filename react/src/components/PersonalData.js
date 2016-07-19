import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';

import TextEntry from 'components/TextEntry';
import TextSelect from 'components/TextSelect';

const language = navigator.languages
                   ? navigator.languages[0]
                   : (navigator.language || navigator.userLanguage);

const lang_code = language.substring(0,2);

// XXX Horrible hack: we can only import from literal strings,
// not from a string in a var, neither from a string built on the spot.
// So we have to import all locales :(
import enLocale from 'react-intl/locale-data/en';
const enMessages = {};
import svLocale from 'react-intl/locale-data/sv';
import svMessages from '../../l10n/sv.json';
import esLocale from 'react-intl/locale-data/es';
import esMessages from '../../l10n/es.json';

if (lang_code === 'en') {
  var locale = enLocale,
      messages = enMessages;
} else if (lang_code === 'sv') {
  var locale = svLocale,
      messages = svMessages;
} else if (lang_code === 'es') {
  var locale = esLocale,
      messages = esMessages;
}
// XXX end horrible hack

addLocaleData(locale);


export default class PersonalData extends Component {
  render () {
    return (
        <IntlProvider locale={ lang_code } messages={ messages }>
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
