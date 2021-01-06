let fs = require('fs');
let path = require('path');
const marked = require('marked');
const  jsdom  =  require ('jsdom'); 
const  {  JSDOM  }  =  jsdom ;

const createObjectLink = (nodeList, file)=>{
  let arrayInfoLinks =[]
  nodeList.forEach(element => {
    let foundLink = element.href
    let textLink = element.textContent
    let objectLink= {href:foundLink, text:textLink, file: file}
    arrayInfoLinks.push(objectLink)
  })
  return arrayInfoLinks;
}

const mdLinks = (namePath)=>{       
  const promise = new Promise((resolve, reject)=>{
    let extFile = path.extname(namePath); 
      if(extFile ==='.md'){
        fs.readFile(namePath, 'utf8',(err,data)=> {
          if(err){
            console.log(err)            
          }   
          let htmlFile = marked(data)
          let dom  =  new  JSDOM (htmlFile)
          let links = dom.window.document.querySelectorAll("a")
          //la anterior linea trae una nodeList de HTMLAnchorElement{}, 
          //implementa propiedades de HTMLHyperlinkElementUtils una de ellas es href
          const result = createObjectLink(links, namePath) 
          console.log(result) 
          resolve(data)
          }) 
      }else{
         reject('The path does not correspond to the markdown file')
      }        
  })
  return promise;  
}
  
mdLinks('./proofReadme.md')
  .then(res =>{
    
  })  

  .catch(err =>console.log(err))

  

