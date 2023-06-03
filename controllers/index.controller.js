const {redis} = require('../database/redis')
const {UserService} = require('../services/user.service')
const bcryt = require('bcrypt')
const index = async (req, res) => {
    try{
        const data = await redis.hGetAll('user:20')
        return res.status(200).json({message:'Hello World!',data:data})
    }catch (e) {
        console.log(e)
    }
}

const register = async (req,res)=>{
    try{
        req.body.password = await bcryt.hash(req.body.password,10)
        const user = await UserService.userRepository.create(req.body)
        return res.status(201).json(user.rows[0])
    }catch (e){
        console.log(e)
    }
}

const login = async (req,res) =>{
    try{
        const token = await UserService.login(req.body)
        return res.json({
            token:token,
        })
    }catch (e) {
        return res.json({
            error:e.message
        })
    }
}

module.exports={
    index,
    register,
    login
}