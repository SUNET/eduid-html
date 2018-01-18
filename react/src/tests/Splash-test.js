
const mock = require('jest-mock');
import React from 'react';
import { Provider } from 'react-intl-redux';
import { shallow, mount, render } from 'enzyme';
import expect, { createSpy } from "expect";
import { addLocaleData } from 'react-intl';
import { MemoryRouter } from "react-router-dom";

import SplashContainer from 'containers/Splash';

const messages = require('../../i18n/l10n/en');
addLocaleData('react-intl/locale-data/en');


const fakeStore = (state) => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
});

function setupComponent(loaded) {
    const store = fakeStore({
        config: {
            is_app_loaded: loaded
        }
    });
    const props = {
    };
    const wrapper = mount(<Provider store={ store }>
                              <SplashContainer {...props} />
                          </Provider>);
    return {
        props,
        wrapper
    };
}

describe("Main Component", () => {

    it("Renders", () => {
        const { wrapper, props } = setupComponent(false),
              splash = wrapper.find('div#eduid-splash-screen');

        expect(splash.length).toEqual(1);
    });

    it("Doesn't Renders", () => {
        const { wrapper, props } = setupComponent(true),
              splash = wrapper.find('div#eduid-splash-screen');

        expect(splash.length).toEqual(0);
    });
});

