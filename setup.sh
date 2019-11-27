set -e

# Remember the root repository directory
root=$PWD
fluent=$root/fluent-ui-react
fluentReact=$root/fluent-ui-react/packages/react
craReact=$root/node_modules/react
craReactDom=$root/node_modules/react-dom
echo "Running in $root"

# Ensure the script is re-entrant this way
echo "Rename to Fluent if stayed Stardust"
cd $fluentReact
jq '.name = "@fluentui/react"' package.json > .package.json
rm package.json
mv .package.json package.json

echo "Switch to Node 8.16 for Fluent"
source ~/.bash_profile &> /dev/null
nvm use 8.16 &> /dev/null

echo "Install CRA dependencies"
cd $root
yarn &> /dev/null

echo "Link CRA's react"
cd $craReact
yarn unlink &> /dev/null || :
yarn link &> /dev/null

echo "Link CRA's react-dom"
cd $craReactDom
yarn unlink &> /dev/null || :
yarn link &> /dev/null

echo "Link Fluent's react"
cd $fluentReact
yarn unlink "react"
yarn link "react"

echo "Link Fluent's react-dom"
cd $fluentReact
yarn unlink "react-dom"
yarn link "react-dom"

echo "Install Fluent dependencies"
cd $fluent
yarn install --force

echo "Rebuild Fluent with linked packages"
cd $fluent
yarn build:bundle

echo "Rename Fluent's React package to Stardust"
cd $fluentReact
jq '.name = "@stardust-ui/react"' package.json > .package.json
rm package.json
mv .package.json package.json

echo "Link Fluent's React package as Stardust"
cd $fluentReact
yarn unlink
yarn link
cd $root
yarn link "@stardust-ui/react"

echo "Start the demo"
yarn start
