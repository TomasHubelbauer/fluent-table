# Fluent Table Tools

This repository demonstrates how to implement filtering, sorting, searching and loading on
top of the Table component from
[Microsoft's Fluent UI library](https://github.com/microsoft/fluent-ui-react).

Since the `Table` component has not been released yet and is only available in the `master`,
I am using linking to depend on it.

I _would_ add it as a Git dependency, but NPM only supports Git dependencies from the root
directory of the repository and Fluent uses Yarn workspaces, meaning the package is at
`packages/react`, not the root. This is a glaring flaw of NPM (shocker), so I've opened up
a ticket to revive a discussion from years back, which they never contributed to (gasp):
https://github.com/npm/cli/issues/528

I _could_ add it as a submodule and then try to build the submodule first and import Fluent
as local files from the submodule's `dist`, but I tried that and it didn't work, importing
CJS/ESM/UMD this way is just a pain in the ass.

I am still using submodules, but instead of importing locally, I am using linking. Fluent
is still named Stardust at the package level as we're in the midst of a name transition and
the linking might be iffy when mixing NPM and Yarn so I switched to using Yarn for both the
CRA app and Fluent.

I went to `fluent-ui-react` and ran `yarn` to install its dependencies. Then `yarn start` to
verify it was building correctly and see that the Table component has its component page at
http://localhost:8080. Next I link CRA's `react` and `react-dom` to Fluent's so that we avoid
dealing with two versions of either. Then I ran `yarn build` to build all the packages.

Next I went to `fluent-ui-react/packages/react` and renamed it to `@stardust-ui/react`. This
is because it would otherwise use its new name which is already in `master` but not yet live.
We need the live name because we installed `@stardust-ui/react` in the CRA app because that's
what the currently live package is named. To replace it with the link, we need the link to be
called the same.

I ran `yarn link` and then went back to the root and ran `yarn link @stardust-ui/react`. This
ensured that I am not using the version from the NPM registry but instead the one built locally,
which includes the Table component.

This process is formalized in `setup.sh`.
To run, run `yarn start` and visit http://localhost:3000.

## To-Do

### Implement searching

Embed a search input atop the table which when changed reloads the table with filtered data.

### Implement loading

Add a switch for demonstrating faux-async loading state to demonstrate a loading indicator.

### Implement resizing

Use cells rich content to embed resizing handles and generate stylesheet affecting columns
changing their ratio in response to the resizing.

### Implement theming

Demonstrate using variables to control the theming.

### Implement selecting

Demonstrates check box rich content

### Implement actioning

Demonstrates button rich content

### Extend filtering

Demonstrate filtering on a value which is rendered using a dropdown in its cell
and updating the filter (by removing the row) when the dropdown changes.
