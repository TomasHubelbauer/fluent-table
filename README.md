# Fluent Table Tools

This repository demonstrates how to implement filtering, sorting, searching and loading on
top of the Table component from
[Microsoft's Fluent UI library](https://github.com/microsoft/fluent-ui-react).

Since the `Table` component has not been released yet and is only available in the `master`,
Fluent is added as a submodule in this repository.

I _would_ add it as a Git dependency, but NPM only supports Git dependencies from the root
directory of the repository and Fluent uses Yarn workspaces, meaning the package is at
`packages/react`, not the root. This is a glaring flaw of NPM (shocker), so I've opened up
a ticket to revive a discussion from years back, which they never contributed to (gasp):
https://github.com/npm/cli/issues/528

Since submodules gets added at its default branch and for Fluent that's `master`, there is
no need to do anything extra aside from the usual `git submodule init` and then
`git submodule update`.

To run, first build Fluent in the submodule. Fluent uses Yarn and Node 8.16.

```sh
cd fluent-ui-react
yarn
yarn build
```
