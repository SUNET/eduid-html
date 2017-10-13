
const mock = require('jest-mock');
import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import expect, { createSpy } from "expect";
import { IntlProvider, addLocaleData } from 'react-intl';

import PendingActions from 'components/PendingActions';

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
        pending: ['surname', 'emails']
    };
    const wrapper = mount(<Provider store={ store }>
                              <IntlProvider locale={'en'} messages={messages}>
                                  <PendingActions {...props} />
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
              area = wrapper.find('ul.pending-actions'),
              pending = wrapper.find('li.pending-action-item');

        expect(area.contains(pending.get(0))).toBeTruthy();
        expect(area.contains(pending.get(1))).toBeTruthy();
    });
});



