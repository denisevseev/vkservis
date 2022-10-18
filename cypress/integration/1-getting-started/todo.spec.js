//
// describe('Post Resource', () => {
//   it('Creating a New Post', () => {
//     cy.visit('https://oauth.vk.com/authorize?client_id=51405187&display=page&scope=wall,photos,friends,video,market,email,offline&response_type=token&v=5.131') // 1.
//         .then(()=>result())
//     //
//     // cy.get('input[name="email"]') // 2.
//     //     .type('447572403085') // 3.
//     //
//     // cy.get('input[name="pass"]') // 4.
//     //     .type('wss81lv9') // 5.
//     //
//     // cy.get('#install_allow') // 6.
//     //     .click() // 7.
//
//
//   })
// })

// const someFunc = require('./test')
// describe(`testing custom method run`, () => {
//
//   it(`should run custom method`, () => {
//
//     cy.visit('https://vk.com')
//     cy.window().then( win => {
//
//
//     })
//   })
// })
const result = () => {
  return "window.location.href";
};
module.exports = result;
