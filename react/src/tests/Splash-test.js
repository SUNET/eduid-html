
const mock = require('jest-mock');
import React from 'react';
import { Provider } from 'react-intl-redux';
import { mount } from 'enzyme';
import expect from "expect";

import SplashContainer from 'containers/Splash';


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

describe("Splash Component", () => {

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

