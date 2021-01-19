#! / usr / bin / env nodo
const mdLinks = require('../src/index.js').mdLinks
const process = require('process')

const fileRoute = process.argv[2];
const validate = process.argv[3];
const options = { validate: false }

validate ? options.validate = true : options.validate

mdLinks(fileRoute, options)
.then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err)); 