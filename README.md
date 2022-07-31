# Gilded Rose Refactoring Case

This is my approach on refactoring the Gilded Rose kata in TypeScript.

## Getting started

Clone the repository and navigate to the directory.

```sh
git clone git@github.com:obsfx/gilded-rose-refactoring-case.git && cd ./gilded-rose-refactoring-case
```

Install dependencies.

```sh
npm install
```

## Running app

```sh
npx ts-node test/golden-master-text-test.ts
```

Or with number of days as args:

```sh
npx ts-node test/golden-master-text-test.ts 10
```

## Running tests

To run all tests.

```sh
npm run test:jest
```

To run all tests in watch mode

```sh
npm run test:jest:watch
```

---

In this case study, I did not touch the initially created entry point of the app. I mainly focused on writing tests to ensure we were not breaking previous functionality while refactoring the code and adding the new feature. So most of the changes happened in the `./app` directory and the `./test/jest/gilded-rose.spec.ts` file.
