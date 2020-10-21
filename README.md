# Hyperobjekt Core

This a monorepo containing core packages used for data visualization tools created by Hyperobjekt.

## Contributing

This project uses the following tools:

- lerna: for monorepo management and publishing
- yarn: for managing dependencies and workspaces
- storybook: for developing and documenting components
- jest: for unit testing

You can start development by running the following commands:

```
yarn install
yarn bootstrap
yarn dev
```

This will start the storybook interface where you may develop your components.

### Building a release

```
yarn build
```

## Attributions

This repository has been based on the article [Creating a Monorepo with Lerna & Yarn Workspaces](https://leerob.io/blog/monorepo-lerna-yarn-workspaces).
