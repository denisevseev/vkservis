const childfunc = require('./mod1')
class owner {
    constructor() {
        this.name = 'owner'
    }
    ownerMethod() {
        const h = new childfunc('denis', 34)
        console.log(h.gf())
        // console.log(childfunc.parent1(45))
    }
}
let ownerInstance = new owner()
ownerInstance.ownerMethod()
module.exports = owner


