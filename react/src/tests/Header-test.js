
const mock = require('jest-mock');
import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import expect, { createSpy } from "expect";
import { IntlProvider, addLocaleData } from 'react-intl';

import Header from 'components/Header';

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
    });
    const props = {
        email: 'fake@fake.fake',
        confirmed: 'main.confirmed'
    };
    const wrapper = mount(<Provider store={ store }>
                              <IntlProvider locale={'en'} messages={messages}>
                                  <Header {...props} />
                              </IntlProvider>
                          </Provider>);
    return {
        props,
        wrapper
    };
}

describe("Header Component", () => {

    it("Renders", () => {
        const { wrapper, props } = setupComponent(),
              header = wrapper.find('header#header'),
              logo = wrapper.find('div#eduid-logo-small'),
              menu = wrapper.find('div#eduid-menu'),
              button = wrapper.find('button#logout-button');

        expect(header.contains(logo.get(0))).toBeTruthy();
        expect(header.contains(menu.get(0))).toBeTruthy();
        expect(header.contains(button.get(0))).toBeTruthy();
    });
});
