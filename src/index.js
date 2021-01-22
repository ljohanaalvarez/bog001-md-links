const path = require('path');
const functions = require('./functions.js');


const mdLinks = (namePath, options = { validate: false }) => {
  const promise = new Promise((resolve, reject) => {
  const extFile = path.extname(namePath);
    if (extFile !== '.md') {
      reject(new Error('The path does not correspond to the markdown file'));
    }
    functions
      .readMyFile(namePath)
      .then((res) => {
        const links = functions.extractLinks(res);
        const result = functions.createObjectLink(links, namePath);
        const newResponse = [];
        if (options.validate) {
          result.forEach((element) => {
            const myPromiseStatus = functions.validateLinkStatus(element);
            newResponse.push(myPromiseStatus);
          });
          resolve(Promise.all(newResponse));
          /* Promise.all(newResponse).then((values) => {
                console.log(values)
               }); */
        } else {
          resolve(result);
        }
      })
      .catch((err) => reject(err));
  });
  return promise;
};

module.exports = {
  mdLinks,
};
