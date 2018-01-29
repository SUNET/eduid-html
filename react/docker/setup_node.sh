#!/bin/bash
#
# Install nodejs
#

set -e
set -x

NVM_VERSION=v0.33.8

# Install nvm for easy node installation
git clone https://github.com/creationix/nvm.git $HOME/.nvm
cd $HOME/.nvm
git checkout $NVM_VERSION
. nvm.sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
nvm install 'lts/*'

echo 'export NVM_DIR="$HOME/.nvm"' >> $HOME/.bashrc
# This loads nvm
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> $HOME/.bashrc
# This loads nvm bash_completion
echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> $HOME/.bashrc
