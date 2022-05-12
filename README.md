# Image Processing API

This is a **NodeJS** API to resize images created for project: `Image Processing API` in the `FullStack JavaScript Developer Nanodegree` by [Udacity](http://www.udacity.com).

---

## Scripts

First run `npm i` to installl all `node_modules`.

### Run local environment (refreshes automatically on save)
* `npm run start`

### Unit Tests
* `npm run test`

### Apply Prettier
* `npm run prettier-ts`

### Build app
* `npm run build`

### Run linter to check code
* `npm run lint`

---

## Using local environment

After running `npm run start` the app will be available on `localhost:3000`. To test the image resizing api go to `localhost:3000/api/images?filename=<IMAGE_NAME>&width=<NUMBER>&height=<NUMBER>`.

`<FILENAME>` can be any image inside the `images/full` folder and feel free to add your own images but make sure they are `.jpg` format.

Also, while hitting the endpoint just use the `filename` without the `.jpg`.

---

## Using prod environment

After running `npm run build` a `build` folder will be created on your root file. To test that everything is working as expected run `node ./build/index.js` to start a server and then do exactly the same as if you were on a local env.