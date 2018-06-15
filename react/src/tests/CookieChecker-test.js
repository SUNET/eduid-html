
import React from 'react';
import { mount } from 'enzyme';
import expect from "expect";
import Cookies from "js-cookie";

import CookieChecker from 'components/CookieChecker';


function setupComponent(props={}) {
    const comp = mount(<CookieChecker {...props}>
                           <div id="test-cookie-checker">TEST</div>
                       </CookieChecker>);
    return comp;
}

describe("Test CookieChecker Component", () => {

    it("Should render: no cookie", () => {
        const comp = setupComponent({cookieName: 'test'}),
              test = comp.find('div#test-cookie-checker');

        expect(test.length).toEqual(1);
    });

    it("Should not render: cookie present", () => {
        Cookies.set('test', 'noshow');
        const comp = setupComponent({cookieName: 'test'}),
              test = comp.find('div#test-cookie-checker');

        expect(test.length).toEqual(0);
    });

    it("Should not render: cookie present and matching pattern", () => {
        Cookies.set('test', 'noshow');
        const comp = setupComponent({cookieName: "test", cookiePattern: "noshow"}),
              test = comp.find('div#test-cookie-checker');

        expect(test.length).toEqual(0);
    });

    it("Should render: unknown cookie name", () => {
        Cookies.set('test', 'noshow');
        const comp = setupComponent({cookieName: "bad-name", cookiePattern: "noshow"}),
              test = comp.find('div#test-cookie-checker');

        expect(test.length).toEqual(1);
    });

    it("Should render: not matching pattern", () => {
        Cookies.set('test', 'noshow');
        const comp = setupComponent({cookieName: "test", cookiePattern: "bad-pattern"}),
              test = comp.find('div#test-cookie-checker');

        expect(test.length).toEqual(1);
    });
});
