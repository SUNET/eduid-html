
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import expect, { createSpy } from "expect";
import EduIDButton from 'components/EduIDButton'


function setupComponent(spinning=false) {
  const props = {
    spinning: spinning
  }

  const wrapper = shallow(<EduIDButton {...props} />)

  return {
    props,
    wrapper
  }
}

describe("EduIDButton Component should mount", () => {

  it("Renders without spinner", () => {
    const { wrapper, props } = setupComponent(),
          button = wrapper.find('Button'),
          divEl = button.find('div.spin-holder'),
          divEl = wrapper.find('Glyphicon');

    expect(button.hasClass('has-spinner')).toBe(true);
    expect(button.hasClass('active')).toBe(false);
    expect(button.props['disabled']).toBe(undefined);
    expect(divEl.hasClass('spin-holder')).toBe(true);
    expect(glyph.hasClass('spinner')).toBe(true);
  });

  it("Renders with spinner", () => {
    const { wrapper, props } = setupComponent(true),
          button = wrapper.find('Button'),
          divEl = wrapper.find('div.spin-holder'),
          glyph = wrapper.find('Glyphicon');

    expect(button.hasClass('has-spinner')).toBe(true);
    expect(button.hasClass('active')).toBe(true);
    expect(button.props['disabled']).toBe(true);
    expect(divEl.hasClass('spin-holder')).toBe(true);
    expect(glyph.hasClass('spinner')).toBe(true);
  });
});

