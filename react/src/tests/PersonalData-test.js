
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow, mount, render } from 'enzyme';
import { assert, expect } from "chai";
import PersonalData from 'components/PersonalData';

describe("A suite", function() {
  
  it("contains spec with an expectation", function() {
    expect(shallow(<PersonalData />).find(".eduid-form")).to.have.length(1);
  });
  
  it("should be equal", function (){
    assert.equal(2, 2);
  });
});
