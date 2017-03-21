import React from 'react';
import * as actions from "actions/Nins";
import expect, { createSpy, spyOn, isSpy } from "expect";
import NinsReducer from "reducers/Nins";


describe("Nins Actions", () => {
   it("Should start mobile suscription ", () => {
        const data = {
            'nins': '123456789'
        }
       const expectedAction = {
           type: actions.POST_MOBILE_SUSCRIPTION,
           payload: data
       };
       expect(actions.postmobilesuscription(data)).toEqual(expectedAction);
   });

    it("Should failed mobile suscription ", () => {
        const err = 'Bad error';

        const data = {
           'error':  new Error(err),
           'message': err
       };
       const expectedAction = {
          type: actions.POST_MOBILE_SUSCRIPTION_FAIL,
           error: true,
          payload: data
       };
       expect(actions.postmobilesuscriptionFail(err)).toEqual(expectedAction);
   });

    it("Should start letter suscription ", () => {
        const data = {
            'nins': '123456789'
        }
       const expectedAction = {
           type: actions.POST_LETTER,
           payload: data
       };
       expect(actions.postLetter(data)).toEqual(expectedAction);
   });

    it("Should failed letter suscription ", () => {
        const err = 'Bad error';

        const data = {
           'error':  new Error(err),
           'message': err
       };
       const expectedAction = {
          type: actions.POST_LETTER_FAIL,
           error: true,
          payload: data
       };
       expect(actions.postLetterFail(err)).toEqual(expectedAction);
   });
});

describe("Reducers", () => {
    const mockState = {
        is_fetching: false,
        failed: false,
        error: "",
        nin: '',
    };

    it("Receives a POST_MOBILE_SUSCRIPTION action", () => {
    expect(
      NinsReducer(
        mockState,
        {
          type: actions.POST_MOBILE_SUSCRIPTION,
          is_fetching: true
        }
      )
    ).toEqual(
      {
        is_fetching: true,
        failed: false,
        error: "",
        nin: '',
      }
    );
  });

    it("Receives a POST_MOBILE_SUSCRIPTION_FAIL action", () => {
    expect(
      NinsReducer(
        mockState,
        {
          type: actions.POST_MOBILE_SUSCRIPTION_FAIL,
          payload:{
            message:'Bad request'
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: true,
        error: 'Bad request',
        nin: '',
      }
    );
  });

    it("Receives a POST_MOBILE_SUSCRIPTION_SUCCESS action", () => {
    expect(
      NinsReducer(
        mockState,
        {
          type: actions.POST_MOBILE_SUSCRIPTION_SUCCESS,
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: "",
        nin: '',
      }
    );
  });

    it("Receives a POST_LETTER action", () => {
    expect(
      NinsReducer(
        mockState,
        {
          type: actions.POST_LETTER,
          is_fetching: true
        }
      )
    ).toEqual(
      {
        is_fetching: true,
        failed: false,
        error: "",
        nin: '',
      }
    );
  });

    it("Receives a POST_LETTER_FAIL action", () => {
    expect(
      NinsReducer(
        mockState,
        {
          type: actions.POST_LETTER_FAIL,
          payload:{
            message:'Bad request'
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: true,
        error: 'Bad request',
        nin: '',
      }
    );
  });

    it("Receives a POST_LETTER_SUCCESS action", () => {
    expect(
      NinsReducer(
        mockState,
        {
          type: actions.POST_LETTER_SUCCESS,
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: "",
        nin: '',
      }
    );
  });

it("Receives a DUMMY action", () => {
    expect(
      NinsReducer(
        mockState,
        {
          type: "DUMMY_ACTION",
          payload: "dummy payload"
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: "",
        nin: '',
      }
    );
  });

});
