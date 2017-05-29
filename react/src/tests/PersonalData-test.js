
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow, mount, render } from 'enzyme';
import expect, { createSpy, spyOn, isSpy } from "expect";
import PersonalData from 'components/PersonalData';
import * as actions from "actions/PersonalData";
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import personalDataReducer from "reducers/PersonalData";

import {requestPersonalData, savePersonalData, fetchPersonalData, sendPersonalData} from '../sagas/PersonalData';
import { put, call, select } from "redux-saga/effects";

import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import PersonalDataContainer from "containers/PersonalData";

const messages = require('../../i18n/l10n/en');
addLocaleData('react-intl/locale-data/en');


const mockState = {
  personal_data: {
      is_fetching: false,
      failed: false,
      given_name: '',
      surname: '',
      display_name: '',
      language: ''
  },
  config : {
      is_configured : true,
      is_fetching: false,
      failed: false,
      PERSONAL_DATA_URL: 'http://localhost/services/personal-data/user'
  }
};


describe("Personal Data Actions", () => {

  it("Should get the data user for personal data", () => {
    const expectedAction = {
          type: actions.GET_USERDATA
    };
    expect(actions.getUserdata()).toEqual(expectedAction);
  });

  it("Should fail when getting the data user for personal data", () => {
    const err = 'Bad error';
    const expectedAction = {
      type: actions.GET_USERDATA_FAIL,
      error: true,
      payload: new Error(err)
    };
    expect(actions.getUserdataFail(err)).toEqual(expectedAction);
  });

  it("shouldn't update personal data user", () => {
    const data = {
      name: 'Pablo'
    };
    const data_error = {
      name: 'Pablo',
      language: 'en'
    };
    const expectedAction = {
      type: actions.CHANGE_USERDATA,
      payload: data_error
    };
    expect(actions.changeUserdata(data)).toNotEqual(expectedAction);
  });

  it("should update personal data user", () => {
    const data = {
      name: 'Pablo',
      language: 'en'
    };

    const expectedAction = {
      type: actions.CHANGE_USERDATA,
      payload: data
    };
    expect(actions.changeUserdata(data)).toEqual(expectedAction);
  });

  it("Should post the data for personal data", () => {
    const expectedAction = {
          type: actions.POST_USERDATA,
    };
    expect(actions.postUserdata()).toEqual(expectedAction);
  });

  it("Should fail when post the data for personal data", () => {
    const err = 'Bad error';

    const expectedAction = {
        type: actions.POST_USERDATA_FAIL,
        error: true,
        payload: new Error(err)
    };
    expect(actions.postUserdataFail(err)).toEqual(expectedAction);
  });

});

describe("Reducers", () => {

  const mockState = {
    is_fetching: false,
    failed: false,
    given_name: 'John',
    surname: 'Smith',
    display_name: 'John',
    language: 'en',
  };

    it("Receives a GET_USERDATA action", () => {
    expect(
      personalDataReducer(
        mockState,
        {
          type: actions.GET_USERDATA
        }
      )
    ).toEqual(
      {
        is_fetching: true,
        failed: false,
        given_name: 'John',
        surname: 'Smith',
        display_name: 'John',
        language: 'en'
      }
    );
  });

    it("Receives a GET_USERDATA_SUCCESS action", () => {
    expect(
      personalDataReducer(
        mockState,
        {
          type: actions.GET_USERDATA_SUCCESS
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false
      }
    );
  });

it("Receives a GET_USERDATA_FAIL action", () => {
    expect(
      personalDataReducer(
        mockState,
        {
          type: actions.GET_USERDATA_FAIL,
          payload: {
          error: "Bad error",
          message: "Bad error"
         }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: true,
        given_name: 'John',
        surname: 'Smith',
        display_name: 'John',
        language: 'en',
        error: 'Bad error'
      }
    );
  });

it("Receives a CHANGE_USERDATA action", () => {
    expect(
      personalDataReducer(
        mockState,
        {
          type: actions.CHANGE_USERDATA,
          payload: {
              given_name: 'Jonna',
              display_name: 'Jonna'
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        given_name: 'Jonna',
        surname: 'Smith',
        display_name: 'Jonna',
        language: 'en'
      }
    );
  });

it("Receives a POST_USERDATA action", () => {
    expect(
      personalDataReducer(
        mockState,
        {
          type: actions.POST_USERDATA
        }
      )
    ).toEqual(
      {
        is_fetching: true,
        failed: false,
        given_name: 'John',
        surname: 'Smith',
        display_name: 'John',
        language: 'en'
      }
    );
  });

it("Receives a POST_USERDATA_SUCCESS action", () => {
    expect(
      personalDataReducer(
        mockState,
        {
          type: actions.POST_USERDATA_SUCCESS
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false
      }
    );
  });

it("Receives a POST_USERDATA_FAIL action", () => {
    expect(
      personalDataReducer(
        mockState,
        {
          type: actions.POST_USERDATA_FAIL,
          payload: {
            error: "Bad error",
            message: "Bad error"
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: true,
        given_name: 'John',
        surname: 'Smith',
        display_name: 'John',
        language: 'en',
        error: "Bad error"
      }
    );
  });

});

function setupComponent() {
  const props = {
    given_name: '',
    surname: '',
    display_name: '',
    language: '',
    handleSave: createSpy(),
    handleChange: createSpy()
  };

  const wrapper = mount(<IntlProvider locale={'en'} messages={messages}>
                              <PersonalData {...props} />
                          </IntlProvider>);

  return {
    props,
    wrapper
  };
}

const getState = () => mockState;

describe("Async component", () => {

    it("Sagas requestPersonalData", () => {

       const generator = requestPersonalData();

       let next = generator.next();
       expect(next.value).toEqual(put(actions.getUserdata()));

       const config = {
           PERSONAL_DATA_URL: 'http://localhost/services/personal-data/user'
       };
       next = generator.next();

       next = generator.next(config);
       expect(next.value).toEqual(call(fetchPersonalData, config));

       const userdata = call(fetchPersonalData, config);
       next = generator.next(userdata);
       expect(next.value).toEqual(put(userdata));
    });

    it("Sagas savePersonalData", () => {

       const generator = savePersonalData();

       let next = generator.next();

       // const config = next.value;
       next = generator.next(mockState.config);

       const data = mockState.personal_data;
       const config = mockState.config;

       // expect(data).toEqual(select(mockState => mockState.config));

       next = generator.next(data);

       var result = next;
       expect(next.value).toEqual(call(sendPersonalData, config, data));

       next = generator.next(next);
       expect(next.value).toEqual(put(result))

    });

});

describe("PersonalData Component", () => {

  it("Renders", () => {
    const { wrapper, props } = setupComponent(),
          form = wrapper.find('form'),
          fieldset = wrapper.find('fieldset'),
          language = wrapper.find("#language"),
          surname = wrapper.find("#surname"'),
          given_name = wrapper.find("#given_name"),
          display_name = wrapper.find("#display_name"),
          button = wrapper.find('#personal-data-button');

    expect(form.contains(fieldset.get(0))).toBeTruthy();
    expect(fieldset.hasClass('tabpane')).toBeTruthy();
    expect(fieldset.contains(language.get(0))).toBeTruthy();
    expect(fieldset.contains(surname.get(0))).toBeTruthy();
    expect(fieldset.contains(given_name.get(0))).toBeTruthy();
    expect(fieldset.contains(display_name.get(0))).toBeTruthy();

    expect(form.props()).toContain({role: 'form'});
    expect(fieldset.props()).toContain({id: 'personal-data-form'});

    expect(props.handleSave.calls.length).toEqual(0);
    button.props().onClick();
    expect(props.handleSave.calls.length).toEqual(1);

  });

});

const fakeStore = (state) => ({
  default: () => {},
  dispatch: createSpy(),
  subscribe: createSpy(),
  getState: () => ({ ...state })
});

describe("PersonalData Container", () => {
  let fulltext,
    given_name,
    fulldom,
    surname,
    display_name,
    language,
    mockProps,
    wrapper,
    dispatch;

  beforeEach(() => {
    const store = fakeStore({
      personal_data: {
        is_fetching: false,
        failed: false,
        given_name: '',
        surname: '',
        display_name: '',
        language: '',
      },
      config: {PERSONAL_DATA_URL: 'http://localhost/services/personal-data/user'},
    });

    mockProps = {
        given_name: 'Pablo',
        surname: 'Iglesias',
        display_name: 'Pablo',
        language: 'en'
    };


    wrapper = mount(
        <IntlProvider locale={'en'} messages={messages}>
          <Provider store={store}>
            <PersonalDataContainer {...mockProps}/>
          </Provider>
        </IntlProvider>
    );
    fulldom = wrapper.find(PersonalDataContainer);
    fulltext = wrapper.find(PersonalDataContainer).text();
    given_name = wrapper.find(PersonalDataContainer).props().given_name;
    surname = wrapper.find(PersonalDataContainer).props().surname;
    display_name = wrapper.find(PersonalDataContainer).props().display_name;
    language = wrapper.find(PersonalDataContainer).props().language;
    dispatch = store.dispatch;
  });


  afterEach(() => {
    fetchMock.restore()
  });

  it("Renders", () => {
      expect(language).toEqual('en');
      expect(given_name).toEqual('Pablo');
      expect(surname).toEqual('Iglesias');
      expect(display_name).toEqual('Pablo');
  });

  it("Clicks", () => {

    fetchMock.post('http://localhost/services/personal-data/user',
       {
        type: actions.POST_USERDATA_SUCCESS,
      });
    expect(dispatch.calls.length).toEqual(0);
    wrapper.find('#personal-data-button').props().onClick();
    expect(dispatch.calls.length).toEqual(1);
  });

});

