
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18n-messages';



class Footer extends Component {

  render () {

    return (<div id="footer">
                <div className="container">
                    <p>
                      {"&copy; SUNET 2013-2017"}
                      <span className="pull-right">
                        
                            <span className="langselector">
                                
                                    <span></span>
                                
                            </span>
                        
                            <span className="langselector">
                                
                                    <span></span>
                                
                            </span>
                        
                      </span>
                    </p>
                </div>
            </div>);
  }
}

Footer.propTypes = {
}

export default i18n(Footer);

