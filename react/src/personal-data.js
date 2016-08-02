import React from 'react';
import ReactDOM from 'react-dom';

import PersonalData from 'components/PersonalData';

ReactDOM.render(<PersonalData langs_src="http://personal-data.eduid.docker:8080/available-languages" />, document.getElementById('root'));
