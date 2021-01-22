
const mdLinksResolve = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',     
    text: 'Información Markdown',
    file: 'proofReadme.md'
  },
  {
    href: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ',
    text: 'Video sobre recursión',
    file: 'proofReadme.md'
  },
  {
    href: 'https://docs.npmjs.com/files/package.jso',   
    text: 'Link roto de prueba',
    file: 'proofReadme.md'
  },
];

const mdLinksResolveValidate = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Información Markdown',
    file: 'proofReadme.md',
    status: 'OK',
    status_code: 200
  },
  {
    href: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ',
    text: 'Video sobre recursión',
    file: 'proofReadme.md',
    status: 'OK',
    status_code: 200
  },
  {
    href: 'https://docs.npmjs.com/files/package.jso',
    text: 'Link roto de prueba',
    file: 'proofReadme.md',
    status: 'FAIL',
    status_code: 404
  },
]; 

module.exports = {
    mdLinksResolve,
    mdLinksResolveValidate

}
