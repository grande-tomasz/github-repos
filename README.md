# GitHub Repos Search & Replace

Script included in this repository searches for any `repos` tags in main `index.html` file and looks for data attributes with `name` of GitHub user and `update` date after which the repositories should be shown. 

After getting all required data the script replaces the `repos` elements with `div`s containing GitHub user name and the list of its repositories which have been updated after the provided date.

If `user` name is not provided or it is not a GitHub user that `repos` element is skipped.
If `update` attribute is not provided then all user repositories will be shown.

The main JavaScipt file is located in:
```
./js/script.js
```

The main SCSS file is located in:
```
./scss/style.scss
```
All mentioned files are being compiled, minified and moved to `build` directory:
```
./build/script.js
./build/style.css
```
JSDoc documentation is located in:
```
./out/index.html
```
