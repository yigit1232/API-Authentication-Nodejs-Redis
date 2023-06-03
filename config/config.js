const {redis} = require('../database/redis')
const {client} = require('../database/pgsql')
const dotenv = require('dotenv')

async function config(){
    dotenv.config()
    client.connect()
    await redis.connect()
}

module.exports={config}
