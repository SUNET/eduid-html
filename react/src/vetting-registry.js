
import React from 'react';
import OpenidConnectContainer from "containers/OpenidConnect";
import OpenidConnectFrejaContainer from "containers/OpenidConnectFreja";
import LetterProofingContainer from "containers/LetterProofing";


let vettingRegistry = {
  letter: <LetterProofingContainer />,
  oidc: <OpenidConnectContainer />,
  oidc_freja: <OpenidConnectFrejaContainer />
};

export default vettingRegistry
