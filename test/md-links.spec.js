const mdLinks = require('../src/index');
const mocks = require('../__mocks__/mock');

describe('mdLinks', () => {

  test('Should be a function', () => {
    expect(typeof mdLinks.mdLinks).toBe('function');
  });

  test('Should resolve to an array that contents a object list ', () => {
    const namePath = 'proofReadme.md'
    return mdLinks.mdLinks(namePath).then(res => {
      expect(res).toEqual(mocks.mdLinksResolve);
    });
  }); 

  test('mdLinks should fail with the error `The path does not correspond to the markdown file`, for extensions other than .md', () => {
    const namePath = 'proof.html' 
    return expect(mdLinks.mdLinks(namePath).catch(new Error()))
    .rejects.toThrow('The path does not correspond to the markdown file');
  });
})


