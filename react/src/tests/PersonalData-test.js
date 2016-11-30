
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


describe("Personal Data Actions", () => {

  it("Should get the data user for personal data", () => {
    const expectedAction = {
          type: actions.GET_USERDATA,
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
    const data_error = {
      name: 'Pablo',
      language: 'en'
    };
    const expectedAction = {
      type: actions.CHANGE_USERDATA,
      payload: data_error
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


const middlewares = [ thunkMiddleware ];
const mockStore = configureStore(middlewares);

describe("Async Actions", () => {

  afterEach(() => {
    fetchMock.restore()
  });

  it("Fetch user data and dispatch action with result", (done) => {

    fetchMock.get('http://localhost/services/personal-data/user',
       {
        type: actions.GET_USERDATA,
        payload: {
          given_name: 'Pablo',
          surname: 'Iglesias',
          display_name: 'Pablo',
          language: 'en'
        }
       });

  const expectedActions = [
      {type: actions.GET_USERDATA},
      {type: actions.GET_USERDATA,
       payload: {
          given_name: 'Pablo',
          surname: 'Iglesias',
          display_name: 'Pablo',
          language: 'en'
       }
      }
    ];

    const store = mockStore({
      config: {PERSONAL_DATA_URL: 'http://localhost/services/personal-data/user'},
    });

    let debug = store.dispatch(actions.fetchUserdata());
      debug.then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it("Save user data and dispatch action with result", (done) => {
    fetchMock.post('http://localhost/services/personal-data/user',
       {
        type: actions.POST_USERDATA,
        payload: {
          given_name: 'Pablo',
          surname: 'Iglesias',
          display_name: 'Pablo',
          language: 'en'
        }
       });

  const expectedActions = [
      {type: actions.POST_USERDATA},
      {type: actions.POST_USERDATA_SUCCESS,
       payload: {
          given_name: 'Pablo',
          surname: 'Iglesias',
          display_name: 'Pablo',
          language: 'en'
       }
      }
    ];

    const store = mockStore({
      config: {
          PERSONAL_DATA_URL: 'http://localhost/services/personal-data/user'
      },
      personal_data: {given_name: '',
                      surname: '',
                      display_name: '',
                      language: ''}
    });
    let debug = store.dispatch(actions.saveUserdata())
      debug.then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

    it("Save user data and dispatch action with result fail", (done) => {
    fetchMock.post('http://localhost/services/personal-data/user',
       {
        type: actions.POST_USERDATA,
        payload: {
          given_name: 'Pablo',
          surname: 'Iglesias',
          display_name: 'Pablo',
          language: 'en'
        }
       });
  const err = 'Bad error';
  const expectedActions = [
      {type: actions.POST_USERDATA},
      {type: actions.POST_USERDATA_FAIL,
       error: true,
      }
    ];

    const store = mockStore({
      config: {
          PERSONAL_DATA_URL: 'http://localhost/services/personal-data/user'
      },
      personal_data: {given_name: '',
                      surname: '',
                      display_name: '',
                      language: ''}
    });
    let debug = store.dispatch(actions.saveUserdata())
      debug.then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });


  it("Fetch user data and dispatch action with result", (done) => {

      const errorResponse = {
          type: actions.GET_USERDATA_FAIL,
          error: true,
          payload: {
              error: 'Bad request',
              message: 'Bad request'
          }
      }

    fetchMock.get('http://localhost/services/personal-data/user',
       {
        type: actions.GET_USERDATA,
        payload: {
          given_name: 'Pablo',
          surname: 'Iglesias',
          display_name: 'Pablo',
          language: 'en'
        }
       });

  const expectedActions = [
      {type: actions.GET_USERDATA},
      errorResponse
    ];

    const store = mockStore({
      config: {PERSONAL_DATA_URL: 'http://localhost/services/personal-data/user'},
    });

    let debug = store.dispatch(actions.fetchUserdata());
      debug.then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});


describe("Reducers", () => {

  const mockState = {
    is_fetching: false,
    failed: false,
    given_name: '',
    surname: '',
    display_name: '',
    language: ''
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
        given_name: '',
        surname: '',
        display_name: '',
        language: ''
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
          type: actions.GET_USERDATA_FAIL
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: true,
        given_name: '',
        surname: '',
        display_name: '',
        language: ''
      }
    );
  });

it("Receives a CHANGE_USERDATA action", () => {
    expect(
      personalDataReducer(
        mockState,
        {
          type: actions.CHANGE_USERDATA
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        given_name: '',
        surname: '',
        display_name: '',
        language: ''
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
        given_name: '',
        surname: '',
        display_name: '',
        language: ''
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
        failed: false,
      }
    );
  });

it("Receives a POST_USERDATA_FAIL action", () => {
    expect(
      personalDataReducer(
        mockState,
        {
          type: actions.POST_USERDATA_FAIL
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: true,
        given_name: '',
        surname: '',
        display_name: '',
        language: ''
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
    handleChange: createSpy(),
  }

  const wrapper = shallow(<PersonalData {...props} />)

  return {
    props,
    wrapper,
  }
}

describe("PersonalData Component", () => {

  it("Renders", () => {
    const { wrapper, props } = setupComponent(),
          form = wrapper.find('form'),
          fieldset = wrapper.find('fieldset'),
          language = wrapper.find('TextControl[name="language"]'),
          surname = wrapper.find('TextControl[name="surname"]'),
          given_name = wrapper.find('TextControl[name="given_name"]'),
          display_name = wrapper.find('TextControl[name="display_name"]'),
          button = wrapper.find('#personal-data-button');

    expect(form.hasClass('form-horizontal')).toBeTruthy();
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




import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import PersonalDataContainer from "containers/PersonalData";

const messages = require('../../i18n/l10n/en');
addLocaleData('react-intl/locale-data/en');

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
        type: actions.POST_USERDATA_SUCCESS
      });
    expect(dispatch.calls.length).toEqual(0);
    wrapper.find('#personal-data-button').props().onClick();
    expect(dispatch.calls.length).toEqual(1);
  });


  it("Click and Save", () => {

    fetchMock.post('http://localhost/services/personal-data/user',
       {
        type: actions.POST_USERDATA_SUCCESS},
        {type: actions.POST_USERDATA_SUCCESS,
        payload: {language: 'en', given_name: 'Pablo'}
      });
    //       wrapper.find('#given_name').value = "Pablo";
    //   const test = wrapper.find('#given_name');
    //
    // test.props().onChange(test);

    expect(dispatch.calls.length).toEqual(0);
    wrapper.find('#personal-data-button').props().onClick();
    expect(dispatch.calls.length).toEqual(1);
  });
});

