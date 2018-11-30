
import React from 'react';
import OpenidConnectContainer from "containers/OpenidConnect";
import OpenidConnectFrejaContainer from "containers/OpenidConnectFreja";
import LetterProofingContainer from "containers/LetterProofing";
import LookupMobileProofingContainer from "containers/LookupMobileProofing";
import EidasContainer from "containers/Eidas";


let vettingRegistry = (disabled) => ({
  lookup_mobile: <LookupMobileProofingContainer disabled={disabled} />,
  letter: <LetterProofingContainer disabled={disabled} />,
  oidc: <OpenidConnectContainer disabled={disabled} />,
  oidc_freja: <OpenidConnectFrejaContainer disabled={disabled} />,
  eidas: <EidasContainer disabled={disabled} />
});

export default vettingRegistry
