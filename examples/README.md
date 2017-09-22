# Examples

This is a sample example of usage of CssChunkHashPlugin. We have 4 `.js` and `.css` files.
The entry `a.js` file on button click dynamically imports `b.js` which in turn dynamically loads `c.js` and the last dynamically loads `d.js`

The result of the build is 8 chunks for each file `.js` and `.css` file.

To run the build:

```bash
npm install
../node_modules/.bin/webpack --config webpack.config.js
```
