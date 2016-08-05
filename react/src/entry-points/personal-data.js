
import React from 'react'
import init_app from '../init-app';
import PersonalDataContainer from 'containers/PersonalData';

const app = (
  <PersonalDataContainer
    langs_src="http://personal-data.eduid.docker:8080/available-languages" // this has to come from config
  />
);

init_app(app, document.getElementById('root'));
