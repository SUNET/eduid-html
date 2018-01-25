import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/lib/Button';

import i18n from 'i18n-messages';

import 'style/CancelButton.scss';


const CancelButton = (props) => (
    <Button className="cancel-button eduid-cancel-button"
            onClick={() => props.history.push(props.new_location)} >
         {props.l10n('cm.cancel')}
    </Button>
);


CancelButton.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    new_location: PropTypes.string
};

export default i18n(withRouter(CancelButton));
