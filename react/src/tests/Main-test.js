
import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import expect, { createSpy } from "expect";
import { IntlProvider, addLocaleData } from 'react-intl';
import { MemoryRouter } from "react-router-dom";

import Main from 'components/Main';

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
            window_size: 'lg',
            language: 'en'
        },
        personal_data: {
            eppn: 'test-eppn'
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
    const props = { language: 'en' };
    const wrapper = mount(<Provider store={ store }>
                              <IntlProvider locale={'en'} messages={messages}>
                                  <MemoryRouter>
                                      <Main {...props} />
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
              mainContent = wrapper.find('#main-content-block'),
              tabs = wrapper.find('ul.nav-tabs');

        expect(wrapper.contains(mainContent.get(0))).toBeTruthy();
        expect(wrapper.contains(tabs.get(0))).toBeTruthy();
    });
});
