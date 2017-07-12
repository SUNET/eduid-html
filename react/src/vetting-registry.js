
import React from 'react';
import OpenidConnectContainer from "containers/OpenidConnect";
import OpenidConnectFrejaContainer from "containers/OpenidConnectFreja";
import LetterProofingContainer from "containers/LetterProofing";


let vettingRegistry = [
    <LetterProofingContainer />,
    <OpenidConnectContainer />,
    <OpenidConnectFrejaContainer />
];

export default vettingRegistry
