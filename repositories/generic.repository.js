const {client} = require('../database/pgsql');

class Repository{
    constructor(table) {
        this.table = table;
    }
    async read(options){
        const query =
            `
            SELECT ${options.column?options.column:'*'}
            FROM ${this.table}
            ${options.where?`WHERE ${Object.keys(options.where)} = '${Object.values(options.where)}' `:''}
            ${options.order?`ORDER BY ${options.order}`:''}
            ${options.limit?`LIMIT ${options.limit}`:''}
            
            `
        return await client.query(query);
    }
    async create(data){
        const keys = Object.keys(data);
        const values = Object.values(data);
        const placeholders = values.map((value,index)=>{
            return `$${index+1}`
        })
        const query =
            `
            INSERT INTO ${this.table} (${keys})
            VALUES (${placeholders})
            RETURNING *
            `
        return await client.query(query,values)
    }

    async update(option){
        const setKeys = Object.keys(option.set)
        const setValues = Object.values(option.set)
        const whereKeys = Object.keys(option.where)
        const whereValues = Object.values(option.where)

        const key = setKeys.map((key,index)=>{
          return `${key} = '${setValues[index]}'`
        })

        const query =
            `
            UPDATE ${this.table}
            SET ${key}
            WHERE ${whereKeys} = '${whereValues}'
            `
        return await client.query(query)


    }

    async delete(option){
        const keys = Object.keys(option)
        const values = Object.values(option)
        const query =
            `
            DELETE FROM ${this.table}
            WHERE ${keys}='${values}'
            `
        return await client.query(query)
    }
}

module.exports={Repository}
