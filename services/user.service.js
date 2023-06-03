const {UserRepository} = require('../repositories/user.repository')
const bcrypt = require('bcrypt')
const helper = require('../utils/helper')
const {generateToken} = require("../utils/helper");
const {redis} = require("../database/redis");
class UserService{
    constructor() {
        this.userRepository = new UserRepository()
    }
    async login(data){
        try{
            const {username,password} = data
            const user = await this.userRepository.read({
                where:{username:username}
            })
            if(user.rows.length){
                const match = await bcrypt.compare(password,user.rows[0].password)
                if(match){
                    await redis.hSet(`user:${user.rows[0].id}`,{
                        id:user.rows[0].id,
                        name:user.rows[0].name,
                        username:user.rows[0].username
                    })
                    await redis.expire(`user:${user.rows[0].id}`,7200)
                    return generateToken({
                        id:user.rows[0].id,
                        name:user.rows[0].name,
                        username:user.rows[0].username
                    })
                }else{
                    throw new Error("Kullancı adı veya şifre hatalı.")
                }
            }else{
                throw new Error("Kullancı adı veya şifre hatalı.")
            }
        }catch (e) {
            throw new Error(e.message)
        }

    }

}
UserService = new UserService()

module.exports={UserService}