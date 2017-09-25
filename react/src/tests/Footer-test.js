
import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import expect, { createSpy } from "expect";
import { IntlProvider, addLocaleData } from 'react-intl';
import { MemoryRouter } from "react-router-dom";

import Footer from 'components/Footer';

const messages = require('../../i18n/l10n/en');
addLocaleData('react-intl/locale-data/en');


const fakeStore = (state) => ({
    default: () => {},
    dispatch: createSpy(),
    subscribe: createSpy(),
    getState: () => ({ ...state })
});

function setupComponent() {
    const store = fakeStore({
        config: {
            is_configured: true,
            language: 'en',
            AVAILABLE_LANGUAGES: [
                ['en', 'English'],
                ['sv', 'Svenska']
            ]
        }
    });
    const props = {
      is_configured: true,
      language: 'en',
      languages: [
                ['en', 'English'],
                ['sv', 'Svenska']
            ],
      changeLanguage: createSpy()
    };
    const wrapper = mount(<Provider store={ store }>
                              <IntlProvider locale={'en'} messages={messages}>
                                  <Footer {...props} />
                              </IntlProvider>
                          </Provider>);
    return {
        props,
        wrapper
    };
}

describe("Footer Component", () => {

    it("Renders", () => {
        const { wrapper, props } = setupComponent(),
              container = wrapper.find('div.container'),
              selector = wrapper.find('span.langselector');

        expect(container.contains(selector.get(0))).toBeTruthy();
    });
});

