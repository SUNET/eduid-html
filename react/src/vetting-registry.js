
import React from 'react';
import OpenidConnectContainer from "containers/OpenidConnect";
import OpenidConnectFrejaContainer from "containers/OpenidConnectFreja";
import LetterProofingContainer from "containers/LetterProofing";
import LookupMobileProofingContainer from "containers/LookupMobileProofing";


let vettingRegistry = {
  lookup_mobile: <LookupMobileProofingContainer />,
  letter: <LetterProofingContainer />,
  oidc: <OpenidConnectContainer />,
  oidc_freja: <OpenidConnectFrejaContainer />
};

export default vettingRegistry
