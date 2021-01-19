const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const marked = require("marked");
const http = require("http");
const https = require("https");

const readMyFile = (onePath) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(onePath, "utf8", (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
  return promise
}

const extractLinks = (readedFile) => {
  let htmlFile = marked(readedFile);
  let dom = new JSDOM(htmlFile);
  let links = dom.window.document.querySelectorAll("a");
  //la anterior linea trae una nodeList de HTMLAnchorElement{},
  //implementa propiedades de HTMLHyperlinkElementUtils una de ellas es href
  return links;
}

const createObjectLink = (nodeList, file) => {
  let arrayInfoLinks = [];
  nodeList.forEach((element) => {
    let foundLink = element.href;
    let textLink = element.textContent;
    let objectLink = { href: foundLink, text: textLink, file: file };
    arrayInfoLinks.push(objectLink);
  });
  return arrayInfoLinks;
}

const getProtocol = (link)=>{
  const url = new URL(link);
  let protocol = url.protocol;
  protocol === "https:" ? (protocol = https) : (protocol = http);
  return protocol;
}

const validateLinkStatus = (object) => {
  const stringLink = object.href;
  const protocol= getProtocol(stringLink);  
  const promise = new Promise((resolve) => {
    protocol.get(stringLink, (res) => {
      const { statusCode } = res;
      if (statusCode !== 200 && statusCode !== 301) {
        resolve({ ...object, status: "FAIL", status_code: statusCode });
      } else {
        resolve({ ...object, status: "OK", status_code: statusCode });
      }
    });
  });
  return promise;
};

module.exports = {
  readMyFile,
  extractLinks,
  createObjectLink,
  validateLinkStatus
};
