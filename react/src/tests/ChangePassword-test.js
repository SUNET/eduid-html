
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { put, select, call } from "redux-saga/effects";
import expect, { createSpy, spyOn, isSpy } from "expect";
import ChangePassword from 'components/ChangePassword';
import DeleteModal from 'components/DeleteModal';
import ChangePasswordContainer from 'containers/ChangePassword';
import * as actions from "actions/ChangePassword";
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import chpassReducer from "reducers/ChangePassword";
import { Provider } from 'react-redux';

import { requestSuggestedPassword, postPasswordChange,
         fetchSuggestedPassword, postPassword} from 'sagas/ChangePassword';

import { IntlProvider, addLocaleData } from 'react-intl';

const messages = require('../../i18n/l10n/en');
addLocaleData('react-intl/locale-data/en');


describe("ChangePassword Actions", () => {

   it("Should get a suggested password", () => {
       const expectedAction = {
           type: actions.GET_SUGGESTED_PASSWORD
       };
       expect(actions.getSuggestedPassword()).toEqual(expectedAction);
   });

   it("Should fail when trying to get a suggested password", () => {
    const err = 'Bad error';
    const expectedAction = {
      type: actions.GET_SUGGESTED_PASSWORD_FAIL,
      error: true,
      payload: {
        error: new Error(err),
        message: err
      }
    };
    expect(actions.getSuggestedPasswordFail(err)).toEqual(expectedAction);
  });

  it("Should choose the suggested password", () => {
     const passwd = '1234',
           expectedAction = {
             type: actions.CHOOSE_SUGGESTED_PASSWORD,
             payload: passwd
           };
     expect(actions.chooseSuggestedPassword(passwd)).toEqual(expectedAction);
  });

  it("Should choose a custom password", () => {
     const expectedAction = {
             type: actions.CHOOSE_CUSTOM_PASSWORD
           };
     expect(actions.chooseCustomPassword()).toEqual(expectedAction);
  });

  it("Valid custom password", () => {
     const passwd = '1234',
           expectedAction = {
             type: actions.VALID_CUSTOM_PASSWORD,
             payload: passwd
           };
     expect(actions.validCustomPassword(passwd)).toEqual(expectedAction);
  });

  it("Action password not ready", () => {
     const err = 'Error',
           expectedAction = {
              type: actions.PASSWORD_NOT_READY,
              error: true,
              payload: {
                error: new Error(err),
                message: err
              }
           };
     expect(actions.passwordNotReady(err)).toEqual(expectedAction);
  });

  it("Post password change (new and old)", () => {
    const passwd1 = '1234',
          passwd2 = '5678',
          expectedAction = {
            type: actions.POST_PASSWORD_CHANGE,
            payload: {
              old: passwd1,
              next: passwd2
            }
          };
    expect(actions.postPasswordChange(passwd1, passwd2)).toEqual(expectedAction);
  });

  it("Should start password change", () => {
     const expectedAction = {
         type: actions.START_PASSWORD_CHANGE
     };
     expect(actions.startPasswordChange()).toEqual(expectedAction);
  });

  it("Fail starting passwd change", () => {
     const err = 'Error',
           expectedAction = {
              type: actions.POST_SECURITY_CHANGE_PASSWORD_FAIL,
              error: true,
              payload: {
                error: new Error(err),
                message: err
              }
           };
     expect(actions.postPasswordChangeFail(err)).toEqual(expectedAction);
  });

});

describe("Reducers", () => {

  const mockState = {
    is_fetching: false,
    failed: false,
    error: '',
    message: '',
    csrf_token: '',
    suggested_password: '',
    old_password: '',
    new_password: '',
    choose_custom: false,
  };

  it("Receives a GET_SUGGESTED_PASSWORD action", () => {
    expect(
      chpassReducer(
        mockState,
        {
          type: actions.GET_SUGGESTED_PASSWORD
        }
      )
    ).toEqual(
      {
        is_fetching: true,
        failed: false,
        error: '',
        message: '',
        csrf_token: '',
        suggested_password: '',
        old_password: '',
        new_password: '',
        choose_custom: false,
      }
    );
  });

  it("Receives a GET_SUGGESTED_PASSWORD_SUCCESS action", () => {
    const suggested = '2345',
          csrf_token = 'csrf-token';
    expect(
      chpassReducer(
        mockState,
        {
          type: actions.GET_SUGGESTED_PASSWORD_SUCCESS,
          payload: {
            suggested_password: suggested,
            csrf_token: csrf_token
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        csrf_token: csrf_token,
        suggested_password: suggested,
        old_password: '',
        new_password: '',
        choose_custom: false,
      }
    );
  });

  it("Receives a GET_SUGGESTED_PASSWORD_FAIL action", () => {
    const err = 'Bad error';
    expect(
      chpassReducer(
        mockState,
        {
          type: actions.GET_SUGGESTED_PASSWORD_FAIL,
          error: true,
          payload: {
            error: new Error(err),
            message: err
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: true,
        error: '',
        message: '',
        csrf_token: '',
        suggested_password: '',
        old_password: '',
        new_password: '',
        choose_custom: false,
      }
    );
  });

  it("Receives a CHOOSE_SUGGESTED_PASSWORD action", () => {
    const passwd = '1234';
    expect(
      chpassReducer(
        mockState,
        {
          type: actions.CHOOSE_SUGGESTED_PASSWORD,
          payload: passwd
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        csrf_token: '',
        suggested_password: '',
        old_password: '',
        new_password: passwd,
        choose_custom: false,
      }
    );
  });

  it("Receives a CHOOSE_CUSTOM_PASSWORD action", () => {
    expect(
      chpassReducer(
        mockState,
        {
          type: actions.CHOOSE_CUSTOM_PASSWORD
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        csrf_token: '',
        suggested_password: '',
        old_password: '',
        new_password: '',
        choose_custom: true,
      }
    );
  });

  it("Receives a VALID_CUSTOM_PASSWORD action", () => {
    const passwd = '1234';
    expect(
      chpassReducer(
        mockState,
        {
          type: actions.VALID_CUSTOM_PASSWORD,
          payload: passwd
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        csrf_token: '',
        suggested_password: '',
        old_password: '',
        new_password: passwd,
        choose_custom: false,
      }
    );
  });

  it("Receives a POST_PASSWORD_CHANGE action", () => {
    const passwd1 = '1234',
          passwd2 = '5678';
    expect(
      chpassReducer(
        mockState,
        {
          type: actions.POST_PASSWORD_CHANGE,
          payload: {
            old: passwd1,
            next: passwd2
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        csrf_token: '',
        suggested_password: '',
        old_password: passwd1,
        new_password: passwd2,
        choose_custom: false,
      }
    );
  });

  it("Receives a START_PASSWORD_CHANGE action", () => {
    expect(
      chpassReducer(
        mockState,
        {
          type: actions.START_PASSWORD_CHANGE
        }
      )
    ).toEqual(
      {
        is_fetching: true,
        failed: false,
        error: '',
        message: '',
        csrf_token: '',
        suggested_password: '',
        old_password: '',
        new_password: '',
        choose_custom: false,
      }
    );
  });

  it("Receives a POST_SECURITY_CHANGE_PASSWORD_SUCCESS action", () => {
    const msg = 'message';
    expect(
      chpassReducer(
        mockState,
        {
          type: actions.POST_SECURITY_CHANGE_PASSWORD_SUCCESS,
          payload: {
            message: msg
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: msg,
        csrf_token: '',
        suggested_password: '',
        old_password: '',
        new_password: '',
        choose_custom: false,
      }
    );
  });

  it("Receives a POST_SECURITY_CHANGE_PASSWORD_FAIL action", () => {
    const err = 'Error';
    expect(
      chpassReducer(
        mockState,
        {
          type: actions.POST_SECURITY_CHANGE_PASSWORD_FAIL,
          error: true,
          payload: {
            error: new Error(err),
            message: err
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: true,
        error: err,
        message: '',
        csrf_token: '',
        suggested_password: '',
        old_password: '',
        new_password: '',
        choose_custom: false,
      }
    );
  });

});

const mockState = {
  chpass: {
    csrf_token: 'csrf-token',
    suggested_password: '',
    old_password: 'old-pw',
    new_password: 'new-pw',
    choose_custom: false,
  },
  config: {
    DASHBOARD_URL: '/dummy-dash-url',
    TOKEN_SERVICE_URL: '/dummy-tok-url',
    SECURITY_URL: '/dummy-sec-url'
  }
};

describe("Async component", () => {

  it("Sagas requestSuggestedPassword", () => {

    const generator = requestSuggestedPassword();

    let next = generator.next();
    expect(next.value).toEqual(put(actions.getSuggestedPassword()));

    next = generator.next();
    const config = state => state.config;
    const suggested = generator.next(config);
    expect(suggested.value).toEqual(call(fetchSuggestedPassword, config));

    const mockSuggested = {
      payload: {
        csrf_token: 'csrf-token',
        suggested_password: '1234'
      }
    };
    next = generator.next(mockSuggested);
    expect(next.value).toEqual(put(mockSuggested));
  });

  it("Sagas postPasswordChange", () => {

    const generator = postPasswordChange();

    let next = generator.next();
    expect(next.value).toEqual(put(actions.startPasswordChange()));

    next = generator.next();

    const data = {
      csrf_token: 'csrf-token',
      old_password: 'old-pw',
      new_password: 'new-pw'
    };
    next = generator.next(mockState);
    expect(next.value).toEqual(call(postPassword, mockState.config, data));

    const mockCredentials = {
      csrf_token: 'csrf-token',
      payload: {
        csrf_token: 'csrf-token',
        credentials: [
          {
            credential_type: 'password',
            created_ts: '',
            success_ts: ''
          }
        ]
      }
    };
    next = generator.next(mockCredentials);
    expect(next.value).toEqual(put(mockCredentials));
  });
});


function setupComponent(custom=false) {
  const props = {
    is_fetching: false,
    choose_custom: custom,
    user_input: '',
    errorMsg: '',
    password_entropy: 0,
    handlePassword: createSpy(),
    handleChoice: createSpy(),
    handleStartPasswordChange: createSpy()
  };

  const wrapper = shallow(<IntlProvider locale={'en'} messages={messages}>
                             <ChangePassword {...props} />
                          </IntlProvider>)
  return {
    props,
    wrapper,
  }
}

describe("ChangePassword Component suggested", () => {

    it("Renders", () => {
        const {wrapper, props} = setupComponent(),
            form = wrapper.find('form#passwordsview-form'),
            inputOldPassword = wrapper.find('TextControl[name="old_password"]'),
            checkBoxCustom = wrapper.find('CheckBox'),
            inputSuggested = wrapper.find('TextControl[name="suggested_password"]'),
            button = wrapper.find('EduIDButton');
    });
});

describe("ChangePassword Component custom", () => {

    it("Renders", () => {
        const {wrapper, props} = setupComponent(true),
            form = wrapper.find('form#passwordsview-form'),
            inputOldPassword = wrapper.find('TextControl[name="old_password"]'),
            checkBoxCustom = wrapper.find('CheckBox'),
            inputCustom = wrapper.find('PasswordField'),
            button = wrapper.find('EduIDButton');
    });
});


const fakeStore = (state) => ({
  default: () => {},
  dispatch: createSpy(),
  subscribe: createSpy(),
  getState: () => ({ ...state })
});


describe("ChangePassword Container", () => {
  let mockProps,
    fulldom,
    chooseCustom,
    getWrapper,
    dispatch;

  beforeEach(() => {
    const store = fakeStore({
        security: {
            is_fetching: false,
        },
        chpass: {
            is_fetching: false,
            failed: false,
            error: '',
            message: '',
            csrf_token: '',
            suggested_password: '',
            old_password: '',
            new_password: '',
            choose_custom: false,
        },
        config: {
            SECURITY_URL: '/dummy-sec-url',
            DASHBOARD_URL: '/dummy-dash-url',
            TOKEN_SERVICE_URL: '/dummy-tok-url'
        },
        personal_data: {
            given_name: 'given-name',
            surname: 'surname',
            display_name: 'display-name'
        },
        emails: {
            emails: []
        }
    });

    mockProps = {
        is_fetching: false,
        choose_custom: false,
        user_input: '',
        errorMsg: '',
        password_entropy: 0
    };

    getWrapper = function (props=mockProps) {
      const wrapper = mount(
          <IntlProvider locale={'en'} messages={messages}>
            <Provider store={store}>
              <ChangePasswordContainer {...props}/>
            </Provider>
          </IntlProvider>
      );
      return wrapper;
    };
    fulldom = getWrapper().find(ChangePasswordContainer);
    chooseCustom = getWrapper().find(ChangePasswordContainer).props().choose_custom;
    dispatch = store.dispatch;
  });


  afterEach(() => {
    fetchMock.restore()
  });

  it("Renders test", () => {
      expect(chooseCustom).toEqual(false);
  });

  it("Clicks change suggested", () => {
    const wrapper = getWrapper(),
          props = wrapper.find('ChangePassword').props();

    expect(dispatch.calls.length).toEqual(0);
    wrapper.find('#chpass-button').props().onClick();
    expect(dispatch.calls.length).toEqual(1);
  });

  it("Clicks change custom", () => {
    const newProps = {
            is_fetching: false,
            choose_custom: true,
            user_input: '',
            errorMsg: '',
            password_entropy: 0
          },
          wrapper = getWrapper(newProps),
          props = wrapper.find('ChangePassword').props();

    expect(dispatch.calls.length).toEqual(0);
    expect(props.handleStartPasswordChange.calls.length).toEqual(0);
    wrapper.find('#custom-password-field-one').value = '1234';
    wrapper.find('#custom-password-field-two').value = '5678';
    wrapper.find('#chpass-button').props().onClick();
    expect(dispatch.calls.length).toEqual(1);
    expect(props.handleStartPasswordChange.calls.length).toEqual(0);
  });

  it("Clicks change custom", () => {
    const newProps = {
            is_fetching: false,
            choose_custom: true,
            user_input: '',
            errorMsg: '',
            password_entropy: 0,
            handlePassword: createSpy(),
            handleChoice: createSpy(),
            handleStartPasswordChange: createSpy()
          },
          wrapper = getWrapper(newProps),
          props = wrapper.find('ChangePassword').props();

    expect(dispatch.calls.length).toEqual(0);
    expect(props.handleStartPasswordChange.calls.length).toEqual(0);
    wrapper.find('#custom-password-field-one').value = '1234';
    wrapper.find('#custom-password-field-two').value = '1234';
    wrapper.find('#chpass-button').props().onClick();
    expect(dispatch.calls.length).toEqual(1);
    expect(props.handleStartPasswordChange.calls.length).toEqual(1);
  });
});

