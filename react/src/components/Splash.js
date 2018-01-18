import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import {Spinner} from 'spin.js';

import 'style/Splash.scss';


const spinnerOpts = {
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    fps: 20, // Frames per second when using setTimeout() as a fallback in IE 9
};

class Splash extends Component {

    componentDidMount () {
        const splash = this.refs.eduidSplash;
        const spinner = new Spinner(spinnerOpts).spin();
        splash.appendChild(spinner.el);
    }

    render () {


        return (
            <div ref="eduidSplash" id="eduid-splash-screen" />
        );
    }
}

export default Splash;

