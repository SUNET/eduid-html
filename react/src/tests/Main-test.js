
const mock = require('jest-mock');
import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import expect, { createSpy } from "expect";
import { IntlProvider, addLocaleData } from 'react-intl';
import { MemoryRouter } from "react-router-dom";

import { SubMainContainer } from 'components/Main';

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
            window_size: 'lg',
            language: 'en'
        },
        personal_data: {
            eppn: 'test-eppn'
        },
        emails: {
            emails: []
        },
        nins: {
            nins: []
        },
        phones: {
            phones: []
        },
        profile: {
            pending: []
        },
        notifications: {
            messages: [],
            warnings: [],
            errors: []
        }
    });
    const props = { window_size: 'lg', testing: true };
    const wrapper = mount(<Provider store={ store }>
                              <IntlProvider locale={'en'} messages={messages}>
                                  <MemoryRouter>
                                      <SubMainContainer {...props} />
                                  </MemoryRouter>
                              </IntlProvider>
                          </Provider>);
    return {
        props,
        wrapper
    };
}

describe("Main Component", () => {

    it("Renders", () => {
        const { wrapper, props } = setupComponent(),
              mainContent = wrapper.find('div#content-block'),
              tabs = wrapper.find('ul.nav-tabs');

        expect(wrapper.contains(mainContent.get(0))).toBeTruthy();
        expect(wrapper.contains(tabs.get(0))).toBeTruthy();
        expect(mainContent.contains(tabs.get(0))).toBeTruthy();
    });
});
