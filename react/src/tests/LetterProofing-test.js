
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import expect, { createSpy, spyOn, isSpy } from "expect";
import fetch from "whatwg-fetch";
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import { put, call, select } from "redux-saga/effects";

import * as actions from "actions/LetterProofing";
import letterProofingReducer from "reducers/LetterProofing";
import LetterProofingButton from 'components/LetterProofing'
import LetterProofingContainer from "containers/LetterProofing";
import {sendLetterProofing, fetchLetterProofing,
        sendLetterCode, fetchLetterCode } from '../sagas/LetterProofing';

const messages = require('../../i18n/l10n/en');
addLocaleData('react-intl/locale-data/en');


describe("Letter proofing Actions", () => {

  it("should create an action to open the modal for the letter-sent code", () => {
    const expectedAction = {
      type: actions.START_LETTER_PROOFING
    };
    expect(actions.startPostLetterProofing()).toEqual(expectedAction);
  });
  it("should create an action to close the modal for the letter-sent code", () => {
    const expectedAction = {
      type: actions.STOP_LETTER_PROOFING
    };
    expect(actions.stopPostLetterProofing()).toEqual(expectedAction);
  });

  it("should create an action to trigger sending a letter with the code", () => {
    const expectedAction = {
      type: actions.POST_LETTER_PROOFING_CODE
    };
    expect(actions.postSendLetterProofing()).toEqual(expectedAction);
  });

  it("should create an action to POST the entered code", () => {
    const data = {code: 'dummy-code'},
          expectedAction = {
              type: actions.POST_LETTER_PROOFING_PROOFING,
              payload: {
                code: data.code
              }
    };
    expect(actions.postLetterProofing(data)).toEqual(expectedAction);
  });

  it("should create an action to wait on sending the code", () => {
    const expectedAction = {
      type: actions.WAIT_LETTER_PROOFING_PROOFING
    };
    expect(actions.waitLetterProofing()).toEqual(expectedAction);
  });

  it("should create an action to signal an error sending the letter", () => {
    const err = new Error('Bad error');
    const expectedAction = {
      type: actions.POST_LETTER_PROOFING_PROOFING_FAIL,
      error: true,
      payload: {
        error: err,
        message: err.toString()
      }
    };
    expect(actions.postLetterProofingFail(err)).toEqual(expectedAction);
  });
  it("should create an action to signal an error verifying the code", () => {
    const err = new Error('Bad error');
    const expectedAction = {
      type: actions.POST_LETTER_PROOFING_CODE_FAIL,
      error: true,
      payload: {
        error: err,
        message: err.toString()
      }
    };
    expect(actions.postLetterCodeFail(err)).toEqual(expectedAction);
  });
});

describe("Reducers", () => {

  const mockState = {
    confirmingLetter: false,
    code: '',
    letter_sent: '',
    letter_expires: '',
    letter_expired: false,
    is_fetching: false,
    failed: false,
    error: "",
    message: '',
    resending: {
      is_fetching: false,
      failed: false,
      error: {},
      message: ''
    },
  };

  it("Receives a START_LETTER_PROOFING action", () => {
    expect(
      letterProofingReducer(
        mockState,
        {
          type: actions.START_LETTER_PROOFING
        }
      )
    ).toEqual(
      {
          ...mockState,
          confirmingLetter: true
      }
    );
  });

  it("Receives a STOP_LETTER_PROOFING action", () => {
    expect(
      letterProofingReducer(
        mockState,
        {
          type: actions.STOP_LETTER_PROOFING
        }
      )
    ).toEqual(
      {
          ...mockState,
          confirmingLetter: false
      }
    );
  });

  it("Receives a POST_LETTER_PROOFING_CODE action", () => {
    expect(
      letterProofingReducer(
        mockState,
        {
          type: actions.STOP_LETTER_PROOFING
        }
      )
    ).toEqual(
      {
          ...mockState
      }
    );
  });

  it("Receives a WAIT_LETTER_PROOFING_PROOFING action", () => {
    expect(
      letterProofingReducer(
        mockState,
        {
          type: actions.WAIT_LETTER_PROOFING_PROOFING
        }
      )
    ).toEqual(
      {
          ...mockState,
          resending: {
              ...mockState.resending,
              is_fetching: true
          }
      }
    );
  });

  it("Receives a POST_LETTER_PROOFING_PROOFING_SUCCESS action", () => {
    expect(
      letterProofingReducer(
        mockState,
        {
          type: actions.POST_LETTER_PROOFING_PROOFING_SUCCESS,
          payload: {
              message: 'success'
          }
        }
      )
    ).toEqual(
      {
          ...mockState,
          message: 'success'
      }
    );
  });

  it("Receives a POST_LETTER_PROOFING_PROOFING_FAIL action", () => {
    expect(
      letterProofingReducer(
        mockState,
        {
          type: actions.POST_LETTER_PROOFING_PROOFING_FAIL,
          error: true,
          payload: {
              error: new Error('err'),
              message: 'err'
          }
        }
      )
    ).toEqual(
      {
          ...mockState,
          resending: {
              ...mockState.resending,
              failed: true,
              message: 'err'
          }
      }
    );
  });

  it("Receives a POST_LETTER_PROOFING_PROOFING action", () => {
    expect(
      letterProofingReducer(
        mockState,
        {
          type: actions.POST_LETTER_PROOFING_PROOFING,
          payload: {
              code: 'dummy-code'
          }
        }
      )
    ).toEqual(
      {
          ...mockState,
          code: 'dummy-code',
          resending: {
              ...mockState.resending,
              is_fetching: true,
              failed: false
          }
      }
    );
  });

  it("Receives a POST_LETTER_PROOFING_CODE_SUCCESS action", () => {
    expect(
      letterProofingReducer(
        mockState,
        {
          type: actions.POST_LETTER_PROOFING_CODE_SUCCESS,
          payload: {
              success: true,
              message: 'success'
          }
        }
      )
    ).toEqual(
      {
          ...mockState,
          message: 'success'
      }
    );
  });

  it("Receives a POST_LETTER_PROOFING_CODE_FAIL action", () => {
    expect(
      letterProofingReducer(
        mockState,
        {
          type: actions.POST_LETTER_PROOFING_CODE_FAIL,
          error: true,
          payload: {
              error: new Error('err'),
              message: 'err'
          }
        }
      )
    ).toEqual(
      {
          ...mockState,
          failed: true,
          resending: {
              ...mockState.resending,
              failed: true,
              message: 'err'
          }
      }
    );
  });

});


function setupComponent() {
  const props = {
    handleLetterProofing: createSpy(),
    sendConfirmationLetter: createSpy(),
    handleConfirmationLetter: createSpy(),
    handleStopConfirmationLetter: createSpy(),
    resending: {
        is_fetching: false,
        failed: false
    }
  };
  const wrapper = mount(<IntlProvider locale={'en'} messages={messages}>
                              <LetterProofingButton {...props} />
                          </IntlProvider>);
  return {
    props,
    wrapper
  };
}

describe("LetterProofingButton Component", () => {

  it("Renders", () => {
    const { wrapper, props } = setupComponent(),
          form = wrapper.find('form'),
          fieldset = wrapper.find('fieldset'),
          button = wrapper.find('EduIDButton');

    expect(form.hasClass('form-horizontal')).toBeTruthy();
    expect(form.contains(fieldset.get(0))).toBeTruthy();
    expect(fieldset.contains(button.get(0))).toBeTruthy();

    expect(form.props()).toContain({role: 'form'});
    expect(fieldset.props()).toContain({id: 'letter-proofing'});

    expect(props.handleLetterProofing.calls.length).toEqual(0);
    button.props().onClick();
    expect(props.handleLetterProofing.calls.length).toEqual(1);
  })
});

const fakeStore = (state) => ({
  default: () => {},
  dispatch: createSpy(),
  subscribe: createSpy(),
  getState: () => ({ ...state })
});

describe("LetterProofing Container", () => {
  let mockProps,
      wrapper,
      buttontext,
      dispatch;

  beforeEach(() => {
    const store = fakeStore({
      letter_proofing: {
        is_fetching: false,
        failed: false,
        message: '',
        errMsg: '',
        letter_sent: '',
        resending: {
            is_fetching: false,
            failed: false
        }
      },
      config: {LETTER_PROOFING_URL: 'http://localhost/letter'},
      nins: {
          valid_nin: false,
          nin: 'dummy-nin'
      }
    });

    mockProps = {
        resending: {}
    };

    wrapper = mount(
        <IntlProvider locale={'en'} messages={messages}>
          <Provider store={store}>
            <LetterProofingContainer {...mockProps}/>
          </Provider>
        </IntlProvider>
    );

    buttontext = wrapper.find('EduIDButton').text();
    dispatch = store.dispatch;
  });


  afterEach(() => {
    fetchMock.restore()
  });

  it("Renders", () => {
    expect(buttontext).toEqual('Confirm using letter');
  });

  it("Clicks", () => {

    fetchMock.post('http://localhost/letter',
       {
        type: actions.POST_LETTER_PROOFING_PROOFING_SUCCESS,
        payload: {message: 'success'}
      });

    expect(dispatch.calls.length).toEqual(0);
    wrapper.find('Button').props().onClick();
    expect(dispatch.calls.length).toEqual(1);
  });

});


const state = {
    config : {
        LETTER_PROOFING_URL: 'http://localhost/letter',
        csrf_token: 'csrf-token'
    },
    nins: {
        nin: 'dummy-nin'
    },
    letter_proofing: {
        code: 'dummy-code'
    }
};

describe("Async component", () => {

    it("Sagas sendLetterProfing", () => {

        const generator = sendLetterProofing();

        let next = generator.next();
        expect(next.value).toEqual(put(actions.waitLetterProofing()));

        next = generator.next();

        const mockGetState = function (state) {
            return state.config;
        };
        const data = {
            nin: 'dummy-nin',
            csrf_token: 'csrf-token'
        };

        const resp = generator.next(state);
        expect(resp.value).toEqual(call(fetchLetterProofing, state.config, data));

        const action = {
          type: 'POST_LETTER_PROOFING_PROOFING_SUCCESS',
          payload: {
            csrf_token: 'csrf-token',
            message: 'success'
          }
        }
        next = generator.next(action);
        expect(next.value.PUT.action.type).toEqual('NEW_CSRF_TOKEN');
        next = generator.next();
        delete(action.payload.csrf_token);
        expect(next.value).toEqual(put(action));
    });

    it("Sagas sendLetterCode", () => {

        const generator = sendLetterCode();

        let next = generator.next();

        const mockGetState = function (state) {
            return state.config;
        };
        const data = {
            code: 'dummy-code',
            csrf_token: 'csrf-token'
        };

        const resp = generator.next(state);
        expect(resp.value).toEqual(call(fetchLetterCode, state.config, data));

        const action = {
          type: 'POST_LETTER_PROOFING_CODE_SUCCESS',
          payload: {
            csrf_token: 'csrf-token',
            message: 'success'
          }
        }
        next = generator.next(action);
        expect(next.value.PUT.action.type).toEqual('NEW_CSRF_TOKEN');
        next = generator.next();
        delete(action.payload.csrf_token);
        expect(next.value).toEqual(put(action));
    });
});

