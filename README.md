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
CJS/ESM/UMD this way is just a pain in the ass. It could work though and as submodules get
cloned at their default branch as normal repositories, we'd be at `master` and have Table.
