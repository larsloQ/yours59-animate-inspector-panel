readme.md

css containing a subset of the ones you find at 
https://animate.style/

sorry no nice build process.
actually its just a concat of some css files.
take a look rollup.config.js and package-lock.json

for minification
npx html-minifier-terser animate-core-blocks.css -o animate-core-blocks.min.css --collapse-whitespace --remove-comments --minify-css true
