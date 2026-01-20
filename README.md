# Front-end Gears of weapons

* Projet de site web: Armuerie en ligne
* Gestion des stock 
* Adminstation du site

### Deps
* VueJS3
* TailWind CSS
* PrimeVue
* TanStack
* Pinia
* Node > 20
* Vite > 7
* Vue I18N

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
npm i
```
### Cloner & installer le Back-end (node-js/nest-js)
```sh
git clone https://github.com/Nikotiine/gearsOfShootApi.git
```
### Serveur de  Developement (configurer du 5173) ViteJS

```sh
npm run dev
```

### Mise à jour des models depuis API (open-api)
```sh
npm run swagger:generate
npm run sw:gen
```

### Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/) / pas de test
#### Tester c'est douter
```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/) / pas de test
### Corriger c'est abdiquer
```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
# gearsOfShootApp

