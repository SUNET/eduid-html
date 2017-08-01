
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow, mount, render } from 'enzyme';
import expect, { createSpy, spyOn, isSpy } from "expect";
import fetch from "whatwg-fetch";
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import * as actions from "actions/LetterProofing";
import letterProofingReducer from "reducers/LetterProofing";
import LetterProofing from 'components/LetterProofing'

import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import LetterProofingContainer from "containers/LetterProofing";

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
