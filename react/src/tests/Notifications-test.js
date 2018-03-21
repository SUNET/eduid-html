
const mock = require('jest-mock');
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import expect, { createSpy, spyOn, isSpy } from "expect";
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import { put, call, select } from "redux-saga/effects";
import { Provider } from 'react-intl-redux';
import { IntlProvider, addLocaleData } from 'react-intl';

import Notifications from 'components/Notifications';
import NotificationsContainer from "containers/Notifications";
import * as actions from "actions/Notifications";
import notificationsReducer from "reducers/Notifications";

const messages = require('../../i18n/l10n/en');
addLocaleData('react-intl/locale-data/en');


const mockState = {
  notifications: {
      is_fetching: false,
      failed: false,
      messages: [],
      warnings: [],
      errors: []
  },
  intl: {
      locale: 'en',
      messages: messages
  },
  config: {
      DEBUG: true
  }
};


describe("Notifications Actions", () => {

    it("Should show a new notification", () => {
        const msg = 'message',
            level = 'success',
            expectedAction = {
                type: actions.NEW_NOTIFICATION,
                payload: {
                    message: msg,
                    level: level,
                    values: null
                }
            };
        expect(actions.eduidNotify(msg, level)).toEqual(expectedAction);
    });

    it("Should remove notification from the state", () => {
        const level = 'message',
            index = 0,
            expectedAction = {
                type: actions.RM_NOTIFICATION,
                payload: {
                    level: level,
                    index: index
                }
            };
        expect(actions.eduidRMNotify(level, index)).toEqual(expectedAction);
    });

});

describe("Reducers", () => {

    const msg = 'message',
        level = 'errors',
        index = 0,
        mockState = {
            is_fetching: false,
            failed: false,
            messages: [],
            warnings: [],
            errors: []
        };
        
    it("Receives a NEW_NOTIFICATION action", () => {
        expect(
            notificationsReducer(
                mockState,
                {
                    type: actions.NEW_NOTIFICATION,
                    payload: {
                        message: msg,
                        level: level,
                        values: null
                    }
                }
            )
        ).toEqual(
            {
            messages: [],
            warnings: [],
            errors: [{msg: msg, vals: null}]
            }
        );
    });

    it("Receives a RM_NOTIFICATION action", () => {
        mockState.errors = [msg];
        expect(
            notificationsReducer(
                mockState,
                {
                    type: actions.RM_NOTIFICATION,
                    payload: {
                        level: level,
                        index: index
                    }
                }
            )
        ).toEqual(
            {
            is_fetching: false,
            failed: false,
            messages: [],
            warnings: [],
            errors: []
            }
        );
    });
});

const fakeStore = (state) => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
});

function setupComponent() {

    const props = {
        messages: [{msg: 'message', vals: null}],
        warnings: [],
        errors: []
    };
    const state = {...mockState};
    state.notifications.messages.push({msg: 'message-2', vals: null});
    const wrapper = mount(<Provider store={fakeStore(state)}>
                              <NotificationsContainer {...props} />
                          </Provider>);
    return {
        props,
        wrapper
    };
}

describe("Notifications Component", () => {

    it("Renders", () => {
        const { wrapper, props } = setupComponent(),
              area = wrapper.find('div.notifications-area'),
              msg = wrapper.find('Alert');

        expect(area.contains(msg.get(0))).toBeTruthy();
    });
});


describe("Notifications Container", () => {
  let fulltext,
    fulldom,
    mockProps,
    wrapper,
    dispatch,
    msgs,
    wrns,
    errs;

    beforeEach(() => {
        const store = fakeStore({
            notifications: {
                is_fetching: false,
                failed: false,
                messages: [],
                warnings: [],
                errors: [{msg: 't-error', vals: null}]
            },
            intl: {
                locale: 'en',
                messages: messages
            },
            config: {
                DEBUG: true
            }
        });

        mockProps = {
            messages: [],
            warnings: [],
            errors: [{msg: 't-error', vals: null}]
        };

        wrapper = mount(
            <Provider store={store}>
                <NotificationsContainer {...mockProps}/>
            </Provider>
        );
        fulldom = wrapper.find(NotificationsContainer);
        fulltext = wrapper.find(NotificationsContainer).text();
        msgs = wrapper.find(NotificationsContainer).props().messages;
        wrns = wrapper.find(NotificationsContainer).props().warnings;
        errs = wrapper.find(NotificationsContainer).props().errors;
        dispatch = store.dispatch;
    });

    afterEach(() => {
        fetchMock.restore()
    });

    it("Renders", () => {
        expect(msgs).toEqual([]);
        expect(wrns).toEqual([]);
        expect(errs).toEqual([{msg: 't-error', vals: null}]);
    });
});
