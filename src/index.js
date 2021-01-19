
let path = require("path");
const functions = require("./functions.js");

const mdLinks = (namePath, options = { validate: false }) => {
  const promise = new Promise((resolve, reject) => {
    let extFile = path.extname(namePath);
    if (extFile === ".md") {
      functions.readMyFile(namePath)
        .then((res) => {
          let links = functions.extractLinks(res);
          const result = functions.createObjectLink(links, namePath);
          const newResponse = [];
          if ((options.validate)) {console.log('estoy validando links')
              result.forEach((element) => {
              const myPromiseStatus = functions.validateLinkStatus(element);
              newResponse.push(myPromiseStatus);
            });
            resolve(Promise.all(newResponse));
            /* Promise.all(newResponse).then((values) => {
                console.log(values)
               });*/
          } else {
            console.log('NOOOO...!!!estoy validando links')
            resolve(result);
          }
        })
        .catch((err) => reject(err));
    } else {
      reject("The path does not correspond to the markdown file");
    }
  });
  return promise;
};

/* mdLinks("./proofReadme.md", { validate: false })
  .then((res) => {
    const response = res;
    console.log(response);
  })
  .catch((err) => console.log(err));  */

  module.exports={
    mdLinks
  }
