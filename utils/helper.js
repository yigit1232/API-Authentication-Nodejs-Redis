const slugify = require('slugify')
const jwt = require('jsonwebtoken')

const slug = (data) => {
    return slugify(data,{
        lower:true
    })
}

const generateToken = async (data) =>{
    try{
        return jwt.sign(data,process.env.SECRET_KEY,{expiresIn: '2h'})
    }catch (e) {
        console.log(e)
    }

}

module.exports={
    slug,
    generateToken
}