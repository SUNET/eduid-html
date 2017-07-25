
import React from 'react';
import OpenidConnectContainer from "containers/OpenidConnect";
import OpenidConnectFrejaContainer from "containers/OpenidConnectFreja";


let vettingRegistry = {
  oidc: <OpenidConnectContainer />,
  oidc_freja: <OpenidConnectFrejaContainer />
};

export default vettingRegistry
