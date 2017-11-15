
const mock = require('jest-mock');
import React from 'react';
import { Provider } from 'react-intl-redux'
import { shallow, mount, render } from 'enzyme';
import expect, { createSpy } from "expect";
import { addLocaleData } from 'react-intl';
import { MemoryRouter } from "react-router-dom";

import FooterContainer from 'containers/Footer';

const messages = require('../../i18n/l10n/en');
addLocaleData('react-intl/locale-data/en');


const fakeStore = (state) => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
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
        },
        intl: {
            locale: 'en',
            messages: messages
        }
    });
    const props = {
      is_configured: true,
      language: 'en',
      languages: [
                ['en', 'English'],
                ['sv', 'Svenska']
            ],
      changeLanguage: mock.fn()
    };
    const wrapper = mount(<Provider store={ store }>
                                  <FooterContainer {...props} />
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

