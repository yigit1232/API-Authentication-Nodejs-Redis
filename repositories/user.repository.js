const {Repository} = require('./generic.repository')


class UserRepository extends Repository{
    constructor() {
        super("users");
    }
}

module.exports={UserRepository}